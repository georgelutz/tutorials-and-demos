module.exports = /* @ngInject */
    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when('/nav/welcome', '/nav/main-map')
        
        $stateProvider
            .state('nav.mainMap', {
                url: '/main-map?port',
                template: '<main-map></main-map>'
            })

            .state('mainMap', {
                url: '/main-map?port',
                template: '<main-map></main-map>'
            })
    }
