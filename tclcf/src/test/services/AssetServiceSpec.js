/* eslint-disable */
AssetService = require('../../main/services/AssetService')

describe('AssetService', () => {
    let assetService
    let $log
    let $stateParams
    let wss

    beforeEach(() => {
            $log = {}
            mapWebSocketService = {}
            socket = {}
            mapWebSocketService.socket = socket
            mapWebSocketService.connect = sinon.stub()
            socket.connect = sinon.stub()
            socket.on = sinon.stub()
            socket.emit = sinon.stub()
            $log.info = sinon.stub()
            assetService = null
    })

    describe('initialization', () => {
        it('should instantiate', () => {
            assetService = new AssetService($log, mapWebSocketService)
            assetService.should.exist
            mapWebSocketService.connect.should.have.been.called
        })
    })

    describe('getting all assets', () =>{
        beforeEach(() => {
            assetService = new AssetService($log, mapWebSocketService)
        })

        it('should set the asset response handler', () => {
          let expectedFn = () => {} // empty function, I don't care
          let expectedCommand = 'getAllAssetsResponse'
          assetService.addGetAllAssetsResponseHandler(expectedFn)
          socket.on.should.have.been.calledWith(expectedCommand, expectedFn)            
        })

        it('should issue the correct command', () => {
            let expectedCommand = 'getAllAssetsRequest'
            assetService.getAllAssets()
            socket.emit.should.have.been.calledWith(expectedCommand, null)
        })
    })

    describe('listening for asset updates', () => {
        beforeEach(() => {
            assetService = new AssetService($log, mapWebSocketService)
        })

        it('should listen to the correct command', () => {
            let expectedCommand = 'assetUpdated'
            let expectedFn = {}
            assetService.addAssetUpdatedHandler(expectedFn)
            socket.on.should.have.been.calledWith(expectedCommand, expectedFn)
        })
    })

    describe('listening for assets added', () =>{
        beforeEach(() => {
            assetService = new AssetService($log, mapWebSocketService)
        })

        it('should listen to the correct command', () => {           
          let expectedCommand = 'assetsAdded'
          let expectedFn = () => {}
          assetService.subscribeAssetsAdded(expectedFn)
          socket.on.should.have.been.calledWith(expectedCommand, expectedFn)            
        })       
    })
   
    describe('listening for assets removed', () =>{
        beforeEach(() => {
            assetService = new AssetService($log, mapWebSocketService)
        })

        it('should listen to the correct command', () => {         
          let expectedCommand = 'assetsRemoved'
           let expectedFn = () => {} 
          assetService.subscribeAssetsRemoved(expectedFn)
          socket.on.should.have.been.calledWith(expectedCommand, expectedFn)            
        })       
    })
})
