const proxyquire = require('proxyquire').noCallThru()

describe('app', () => {
    let angular

    beforeEach(() => {
        angular = {}
        angular.module = sinon.stub().returnsThis()
        angular.component = sinon.stub().returnsThis()
        angular.config = sinon.stub().returnsThis()
        angular.constant = sinon.stub().returnsThis()
        angular.directive = sinon.stub().returnsThis()
        angular.factory = sinon.stub().returnsThis()
        angular.filter = sinon.stub().returnsThis()
        angular.provider = sinon.stub().returnsThis()
        angular.run = sinon.stub().returnsThis()
        angular.service = sinon.stub().returnsThis()
    })

    it('should load', () => {
        proxyquire('../main/app', {
            'portal-core/src/main/core/coreApp': angular,
            'portal-core/src/main/loginNew/loginNewApp': {},
            'portal-core/src/main/user/userApp': {}
        })

        angular.module.should.have.been.calledWith('application', sinon.match.array)
    })
})
