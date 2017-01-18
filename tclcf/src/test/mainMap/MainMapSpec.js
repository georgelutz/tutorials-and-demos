const expect = require('chai').expect
const _ = require('lodash')

describe('MainMap', () => {
    let mainMap
    let $log
    let $stateParams
    let mapService
    
    beforeEach(() => {
        $log = {}
        $stateParams = {}
        mapService = {}

        let component = require('../../main/mainMap/MainMap')
        mainMap = new component.controller($log, $stateParams, mapService)
    })

    it('should instantiate', () => {
        mainMap.should.exist
    })

    describe('when the map has loaded', () => {
        beforeEach(() => {
            mainMap.initializeVehicleLayer = sinon.stub()
        })

        it('should set the map property and initialize the vehicle layer', () => {            
            let map = {}
            mainMap.mapLoaded(map)
            expect(mainMap.map).to.equal(map)
            mainMap.initializeVehicleLayer.should.have.been.callCount(1)
        })
    })

    describe('when initializing the vehicle layer', () => {
        it('should disable clustering on the vehicle layer', () => {
            mainMap.assetService = {}
            mainMap.assetService.addGetAllAssetsResponseHandler = sinon.stub()
            mainMap.assetService.addAssetUpdatedHandler = sinon.stub()
            mainMap.assetService.getAllAssets = sinon.stub()
            mainMap.assetService.subscribeAssetsAdded = sinon.stub()
            mainMap.assetService.subscribeAssetsRemoved = sinon.stub()
            mainMap.map = {} 
            mainMap.map.addLayer = sinon.stub()
            mainMap.initializeVehicleLayer()
            mainMap.map.addLayer.getCall(0).args[0].should.equal('vehicle')
            mainMap.map.addLayer.getCall(0).args[1].should.equal('VehicleLayer')
            expect(mainMap.map.addLayer.getCall(0).args[2].disableClustering).to.equal(true)
        })
    })

    describe('when handling the getAllAssetsResponse', () => {
        it('should set the assets array to the provided value and refresh the map', () => {
            let expectedA = {
                id: 'a',
                heading: 'N'                
            }
            let expectedB = {
                id: 'b',
                heading: 'S'
            }
            let expected = []
            expected.push(expectedA)
            expected.push(expectedB)

            mainMap.refreshMap = sinon.stub()
            mainMap.getAllAssetsResponseHandler(expected)
            expect(mainMap.assets).to.deep.equal(expected)
            mainMap.refreshMap.should.have.been.callCount(1)
        })
    })

    describe('when refreshing the map', () => {
        it('should update the vehicle layer with all the assets', () => {
            mainMap.map = {}
            mainMap.map.removePoints = sinon.stub()
            mainMap.map.plotPoints = sinon.stub()            
            let expectedA = {
                id: 'a',
                heading: 'N'                
            }
            let expectedB = {
                id: 'b',
                heading: 'S'
            }
            let expected = []
            expected.push(expectedA)
            expected.push(expectedB)
            mainMap.assets = expected

            mainMap.refreshMap()
            mainMap.map.removePoints.should.have.been.calledWith('VehicleLayer')
            mainMap.map.plotPoints.should.have.been.calledWith('VehicleLayer', expected)
        })
    })

    describe('when updating assets', () => {
        it('should add assets when show is true', () => {
            let expectedA = {
                id: 'a',
                heading: 'N'                
            }
            let expectedB = {
                id: 'b',
                heading: 'S'
            }
            let expected = []
            expected.push(expectedA)
            expected.push(expectedB)
            mainMap.assets = []
            mainMap.refreshMap = sinon.stub()
            mainMap.assetUpdated(true, expectedA)
            mainMap.assetUpdated(true, expectedB)
            mainMap.refreshMap.should.have.been.callCount(2)

            expect(_.find(mainMap.assets, {id: 'a'})).to.equal(expectedA)
            expect(_.find(mainMap.assets, {id: 'b'})).to.equal(expectedB)
        })

        it('should not add existing assets when show is true', () => {
            let expectedA = {
                id: 'a',
                heading: 'N'                
            }
            let expectedB = {
                id: 'b',
                heading: 'S'
            }
            let expected = []
            expected.push(expectedA)
            expected.push(expectedB)
            mainMap.assets = []
            mainMap.refreshMap = sinon.stub()
            mainMap.assetUpdated(true, expectedA)
            mainMap.assetUpdated(true, expectedB)
            mainMap.assetUpdated(true, expectedB)
            expect(_.find(mainMap.assets, {id: 'a'})).to.equal(expectedA)
            expect(_.find(mainMap.assets, {id: 'b'})).to.equal(expectedB)
            expect(mainMap.assets.length).to.equal(2)
        })

        it('should remove assets when show is false', () => {
            let expectedA = {
                id: 'a',
                heading: 'N'                
            }
            let expectedB = {
                id: 'b',
                heading: 'S'
            }
            let expectedC = {
                id: 'c',
                heading: 'S'
            }
            let expected = []
            expected.push(expectedA)
            expected.push(expectedB)
            mainMap.assets = []
            mainMap.refreshMap = sinon.stub()
            mainMap.assetUpdated(true, expectedA)
            mainMap.assetUpdated(true, expectedB)
            mainMap.assetUpdated(true, expectedC)
            expect(_.find(mainMap.assets, {id: 'a'})).to.equal(expectedA)
            expect(_.find(mainMap.assets, {id: 'b'})).to.equal(expectedB)
            expect(_.find(mainMap.assets, {id: 'c'})).to.equal(expectedC)
            mainMap.assetUpdated(false, expectedB)
            expect(_.find(mainMap.assets, {id: 'b'})).to.not.exist
            mainMap.assetUpdated(false, expectedC)
            expect(_.find(mainMap.assets, {id: 'c'})).to.not.exist
            mainMap.assetUpdated(false, expectedA)
            expect(_.find(mainMap.assets, {id: 'a'})).to.not.exist
        })
    })

    describe('when adding assets', () => {
        it('should not do anything if input value is null or 0',  () => {  
            let expected = []                       
            mainMap.assets = []
            mainMap.refreshMap = sinon.stub()
            mainMap.assetsAdded(expected) 
            expect(mainMap.assets.length).to.equal(0)            
            mainMap.refreshMap.should.have.been.callCount(0)
        })    
        it('should add assets if asset array is already defined and not null',  () => {            
            let expectedA = {
                id: 'a',
                heading: 'N'                
            }
            let expectedB = {
                id: 'b',
                heading: 'S'
            }
            let expected = []
            expected.push(expectedA)
            expected.push(expectedB)
            mainMap.assets = []
            mainMap.refreshMap = sinon.stub()
            mainMap.assets = expected
            expect(_.find(mainMap.assets, {id: 'a'})).to.equal(expectedA)
            expect(_.find(mainMap.assets, {id: 'b'})).to.equal(expectedB)
            expect(mainMap.assets).to.deep.equal(expected)

            let expectedC = {
                id: 'c',
                heading: 'S'
            }
            let expectedc = []
            expectedc.push(expectedC)
            mainMap.assetsAdded(expectedc) 
            expect(_.find(mainMap.assets, {id: 'c'})).to.equal(expectedC)
            expect(mainMap.assets.length).to.equal(3)
            mainMap.refreshMap.should.have.been.callCount(1)
        })
        it('should set the assets array to the provided value and refresh the map if assets array is null', () => {
            let expectedA = {
                id: 'a',
                heading: 'N'                
            }
            let expectedB = {
                id: 'b',
                heading: 'S'
            }
            let expected = []
            expected.push(expectedA)           
            expected.push(expectedB)

            mainMap.assets = []
            mainMap.refreshMap = sinon.stub()
            mainMap.assetsAdded(expected)               
            expect(_.find(mainMap.assets, {id: 'a'})).to.equal(expectedA)
            expect(_.find(mainMap.assets, {id: 'b'})).to.equal(expectedB)

            expect(mainMap.assets).to.deep.equal(expected)
            mainMap.refreshMap.should.have.been.callCount(1)           
        })
        it('should not add exsisting assets',  () => {            
            let expectedA = {
                id: 'a',
                heading: 'N'                
            }
            let expectedB = {
                id: 'b',
                heading: 'S'
            }
            let expected = []
            expected.push(expectedA)
            expected.push(expectedB)
            mainMap.assets = []
            mainMap.refreshMap = sinon.stub()
            mainMap.assets = expected
            expect(_.find(mainMap.assets, {id: 'a'})).to.equal(expectedA)
            expect(_.find(mainMap.assets, {id: 'b'})).to.equal(expectedB)
            expect(mainMap.assets).to.deep.equal(expected)
            let expectedA2 = {
                id: 'a',
                heading: 'N'  
            }
            let expectedc = []
            expectedc.push(expectedA2)             
            mainMap.assetsAdded(expectedc)
            expect(mainMap.assets.length).to.equal(2)            
        })
       
    })

    describe('when removing assets', () => {
        it('should not do anything if input value is null or 0',  () => {  
            let expected = []                       
            mainMap.assets = []
            mainMap.refreshMap = sinon.stub()
            mainMap.assetsRemoved(expected) 
            mainMap.refreshMap.should.have.been.callCount(0)
        })
        it('should remove assets if asset array is defined and having values',  () => {           
            let expectedA = {
                id: 'a',
                heading: 'N'                
            }          
            let expected = []
            expected.push(expectedA)           
            mainMap.assets = []
            mainMap.refreshMap = sinon.stub()         
            mainMap.assetsAdded(expected)            
            expect(_.find(mainMap.assets, {id: 'a'})).to.equal(expectedA)          

            mainMap.assetsRemoved(expected)           
            expect(_.find(mainMap.assets, {id: 'a'})).to.not.exist
            mainMap.refreshMap.should.have.been.callCount(2)                              
        })
        it('should remove assets if asset array is defined and having values and removing only given value', () => {           
            let expectedA = {
                id: 'a',
                heading: 'N'                
            }         
            let expectedB = {
                id: 'b',
                heading: 'S'
            } 
            let expectedC = {
                id: 'c',
                heading: 'S'
            }
            let expected = []
            expected.push(expectedA)   
            expected.push(expectedB)  
            expected.push(expectedC)         
            mainMap.assets = []
            mainMap.refreshMap = sinon.stub() 
            mainMap.assetsAdded(expected) 
            let removeA = []
            removeA.push(expectedA) 
            mainMap.assetsRemoved(removeA)
                 
            expect(_.find(mainMap.assets, {id: 'a'})).to.not.exist
            expect(_.find(mainMap.assets, {id: 'b'})).to.equal(expectedB)
            expect(_.find(mainMap.assets, {id: 'c'})).to.equal(expectedC)
            mainMap.refreshMap.should.have.been.callCount(2)                   
                              
        })
        it('should not do anything if asset array is undefined',  () => {           
            let expectedA = {
                id: 'a',
                heading: 'N'                
            }          
            let expected = []
            expected.push(expectedA)           
            mainMap.assets = []
            mainMap.refreshMap = sinon.stub()
            mainMap.assetsRemoved(expected)
            expect(mainMap.assets.length).to.equal(0)                
            mainMap.refreshMap.should.have.been.callCount(0)
        })       
    })
})
