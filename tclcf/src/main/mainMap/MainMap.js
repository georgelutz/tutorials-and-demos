const _ = require('lodash')
require('./mainMap.scss')

module.exports = {
    template: require('./mainMap.html'),
    controller: class MapViewDemo {
        /* @ngInject */
        constructor(assetService, mapWebSocketService) {
            this.assetService = assetService
            this.mapWebSocketService = mapWebSocketService
        }

        getAllAssetsResponseHandler(event) {
            this.assets = event
            this.refreshMap()
        }

        //TODO: don't do this, probably a better way to do this in alk
        refreshMap() {
            this.map.removePoints('VehicleLayer')
            this.map.plotPoints('VehicleLayer', this.assets)
        }

        assetUpdated(show, event) {
            if (show) {
                if (!_.find(this.assets, {id: event.id})) {
                    this.assets.push(event)
                }
            } else {
                _.remove(this.assets, {id: event.id})
            }
            this.refreshMap()
        }
               
        assetsAdded(event) { 
            if (!event || event.length <= 0) {
                return 
            } 
            if (_.size(this.assets) > 0) {
                event.forEach(item => {                      
                    if (!_.find(this.assets, {id: item.id})) {
                        this.assets.push(item) 
                    } 
                }) 
                this.refreshMap()
            } else {              
                this.assets = event                    
                this.refreshMap()
            }
        }
                    
        assetsRemoved(event) { 
            if (!event || event.length <= 0) {
                return
            } 
            if (_.size(this.assets) > 0) {                   
                event.forEach(item => {  
                    _.pull(this.assets, _.find(this.assets, { id : item.id}))
                }) 
                this.refreshMap()
            }
        }

        mapLoaded(map) {           
            this.map = map
            this.initializeVehicleLayer()

            // For testing, push the port number to someplace that a WebDriver can get at to confirm we're using the right port
            this.port = this.mapWebSocketService.port
        }

        initializeVehicleLayer() {            
            this.map.addLayer('vehicle', 'VehicleLayer',  {
                disableClustering: true,
                colorCode: '#666666'                
            })
            
            this.assetService.addGetAllAssetsResponseHandler(event => this.getAllAssetsResponseHandler(event))                        
            this.assetService.getAllAssets()
            this.assetService.subscribeAssetsAdded(event => this.assetsAdded(event))
            this.assetService.subscribeAssetsRemoved(event => this.assetsRemoved(event))

            // For testing, push the port number to someplace that a WebDriver can get at to confirm we're using the right port
            this.port = this.mapWebSocketService.port
        }
    }
}
