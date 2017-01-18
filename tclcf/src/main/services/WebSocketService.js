module.exports = class WebSocketService {
    /* @ngInject */
    constructor($log) {
        this.$log = $log
        this.sendStack = []
        this.commandListeners = []
        this.connected = false
        this.webSocket = {}
    }

    // I'm using '_' to denote PRIVATE, is this OK, is there a better way?
    onConnect() {          
        this.$log.info('WebSocket connected, running off queued messages')
        this.connected = true
        this.sendStack.forEach(e => this.send(e))
        this.sendStack = []
    }

    connect(url) {
        this.webSocket = this.initWebSocket(url)
        this.webSocket.onopen = () => this.onConnect()
        this.webSocket.onmessage = event => this.onMessage(event)
    }

    // This is needed so we can stub the socket to facilitate unit testing
    initWebSocket(url) {
        return new WebSocket(url)     //eslint-disable-line no-undef
    }

    onMessage(event) {        
        this.$log.info(`Message received: ${event.data}`)
        let command = JSON.parse(event.data)
        if (this.commandListeners[command.command]) {
            this.$log.info('Listener found')
            let payload = JSON.parse(command.json)
            this.commandListeners[command.command].forEach(fn => fn(payload))
        }
    }

    on(command, fn) {
        this.$log.info(`Listening for: ${command}`)
        if (!this.commandListeners[command]) {
            this.commandListeners[command] = []
        }

        this.commandListeners[command].push(fn)
    }

    emit(command, dataObj) {
        this.send(this.generateCommand(command, dataObj))
    }

    send(data) {
        if (this.connected) {
            this.$log.info(`Sending: ${data}`)
            this.webSocket.send(data)
        } else {
            this.$log.info(`Queuing: ${data}`)
            this.sendStack.push(data)
        }
    }

    generateCommand(command, data) {
        return JSON.stringify({
            command: command,
            json: JSON.stringify(data)
        })
    }
}
