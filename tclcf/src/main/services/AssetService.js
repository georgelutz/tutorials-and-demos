module.exports = class AssetService {
    /* @ngInject */
    constructor($log, mapWebSocketService) {
        this.$log = $log
        this.mapWebSocketService = mapWebSocketService
        this.init()
    }

    init() {
        this.mapWebSocketService.connect()
    }

    addAssetUpdatedHandler(fn) {
        this.mapWebSocketService.socket.on('assetUpdated', fn)
    }

    subscribeAssetsAdded(fn) {
        this.$log.info('Assets added')  
        this.mapWebSocketService.socket.on('assetsAdded', fn)
    }
 
    subscribeAssetsRemoved(fn) {   
        this.$log.info('Assets removed')        
        this.mapWebSocketService.socket.on('assetsRemoved', fn)
    }

    //TODO: Consider converting to use stack web services
    getAllAssets() {
        this.$log.info('Getting all assets')
        this.mapWebSocketService.socket.emit('getAllAssetsRequest', null)
    }

    addGetAllAssetsResponseHandler(fn) {
        this.mapWebSocketService.socket.on('getAllAssetsResponse', fn)
    }
}
