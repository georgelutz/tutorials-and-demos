/* eslint-disable */
WebSocketService = require('../../main/services/WebSocketService')
const expect = require('chai').expect;

describe('WebSocketService', () => {
    let $log
    let $stateParams
    let wss

    beforeEach(() => {
            $log = { }
            $log.info = sinon.stub()
            $stateParams = {}
            wss = null
    })

    describe('initialization', () => {
        it('should instantiate', () => {
            wss = new WebSocketService($log)
            wss.should.exist
        })
    })

    describe('connection', () => {
        it('can be stubbed', () => {
            let expected = { }
            wss = new WebSocketService($log)
            wss.initWebSocket = sinon.stub().returns(expected)
            let actual = wss.initWebSocket('foo')
            expect(actual).to.equal(expected)
        })

        it('should execute onConnect when server connects', () => {
            let expected = { onopen: null }
            wss = new WebSocketService($log)
            wss.initWebSocket = sinon.stub().returns(expected)
            wss.connect('foo')
            expect(wss.connected).to.equal(false)
            expected.onopen()
            expect(wss.connected).to.equal(true)
        })

        describe('queuing', () => {
            let webSocket = { }
            beforeEach(() => {                
                wss = new WebSocketService($log)
                wss.initWebSocket = sinon.stub().returns(webSocket)
            })

            it('should not send anything if nothing is queued', () => {
                webSocket.send = sinon.stub()
                wss.connect('foo')
                webSocket.onopen()
                webSocket.send.should.have.been.callCount(0)
            })

            it('should send messages if nothing is queued', () => {
                webSocket.send = sinon.stub()
                wss.connect('foo')
                wss.emit('something', null)
                wss.emit('something', null)
                wss.emit('something', null)
                webSocket.onopen()
                webSocket.send.should.have.been.callCount(3)
            })
        })
    })

    describe('onMessage', () => {
        let simpleMessage
        let callbackAResult = null
        let callbackA = event => callbackAResult = event
        let callbackBResult = null
        let callbackB = event => callbackBResult = event
        let expected = { val: 'x' }
        let webSocket = { }

        beforeEach(() => {
            callbackAResult = null
            callbackBResult = null
            simpleMessage = {
                command: 'simple',
                json: JSON.stringify(expected)
            }        
            wss = new WebSocketService($log)
            wss.initWebSocket = sinon.stub().returns(webSocket)
        })

        it('should call the appropriate listener when a message comes in', () => {
            wss.connect('foo')
            wss.on('simple', event => callbackA(event))
            wss.on('simple', event => callbackB(event))
            let event = {
                data: JSON.stringify(simpleMessage)
            }
            webSocket.onmessage(event)
            expect(callbackAResult.val).to.equal(expected.val)
            expect(callbackBResult.val).to.equal(expected.val)
        })

        it('should do nothing when a message comes in if no listeners are wired up', () => {
            wss.connect('foo')
            let event = {
                data: JSON.stringify(simpleMessage)
            }
            webSocket.onmessage(event)
            expect(callbackAResult).to.not.exist
            expect(callbackBResult).to.not.exist
        })
    })
})
