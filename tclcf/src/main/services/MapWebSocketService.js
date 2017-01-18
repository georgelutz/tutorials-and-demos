let WebSocketService = require('./WebSocketService.js') 

module.exports = class MapWebSocketService {
    /* @ngInject */
    constructor($log, $stateParams) {
        this.$log = $log
        this.$stateParams = $stateParams
        this.connecting = false
        this.socket = null
        this.init()
    }

    init() {
        this.socket = new WebSocketService(this.$log)
    }

    //TODO: We probably should have some sort of way of handling an inability to connect to the server
    connect() {
        if (!this.connecting) {
            this.connecting = true
            this.port = this.$stateParams.port || 9999
            let socketUrl = `ws://localhost:${this.port}/map`
            this.socket.connect(socketUrl)
        }
    }
}
