module.exports = /* @ngInject */
    function(candyBarConfigProvider, $mdThemingProvider) {

        var myPrimary = $mdThemingProvider.extendPalette('grey', {
            500: '#737373',
            contrastDefaultColor: 'light'
        })
        $mdThemingProvider.definePalette('myPrimary', myPrimary)

        var myAccent = $mdThemingProvider.extendPalette('orange', {
            500: '#ff6600',
            contrastDefaultColor: 'light'
        })
        $mdThemingProvider.definePalette('myAccent', myAccent)

        $mdThemingProvider.theme('default')
            .primaryPalette('myPrimary', {
                default: '500'
            })
            .accentPalette('myAccent', {
                default: '500',
                'hue-1': '500'
            })

    }
