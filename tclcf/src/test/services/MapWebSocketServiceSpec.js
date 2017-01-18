/* eslint-disable */
MapWebSocketService = require('../../main/services/MapWebSocketService')
const expect = require('chai').expect;

describe('MapWebSocketService', () => {
    let $log
    let $stateParams
    let wss

    beforeEach(() => {
            $log = { }
            $log.info = sinon.stub()            
            $stateParams = {}
            this.mapWss = null
    })

    describe('initialization', () => {
        it('should instantiate', () => {
            mapWss = new MapWebSocketService($log, $stateParams)
            mapWss.should.exist
        })
    })

    describe('connect', () => {
        it('should connect using the correct url when given a port', () => {
            mapWss = new MapWebSocketService($log, $stateParams)
            mapWss.socket = {}
            mapWss.socket.connect = sinon.stub().returns()

            let expectedUrl = 'ws://localhost:9875/map'
            let expectedPort = 9875
            $stateParams.port = expectedPort
            mapWss.connect()
            mapWss.socket.connect.should.have.been.calledWith(expectedUrl)
        })

        it('should connect using the correct url by default', () => {
            mapWss = new MapWebSocketService($log, $stateParams)
            mapWss.socket = {}
            mapWss.socket.connect = sinon.stub().returns()

            let expectedUrl = 'ws://localhost:9999/map'
            let expectedPort = null
            $stateParams.port = expectedPort
            mapWss.connect()
            mapWss.socket.connect.should.have.been.calledWith(expectedUrl)
        })    

        it('should not attempt multiple connections if a connection has already taken place', () => {
            mapWss = new MapWebSocketService($log, $stateParams)
            mapWss.socket = {}
            mapWss.socket.connect = sinon.stub().returns()

            let expectedUrl = 'ws://localhost:9875/map'
            let expectedPort = 9875
            $stateParams.port = expectedPort
            mapWss.connect()
            mapWss.connect()
            mapWss.socket.connect.should.have.been.callCount(1)
        })
    })
})
