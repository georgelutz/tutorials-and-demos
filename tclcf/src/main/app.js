const angular = require('portal-core/src/main/core/coreApp')
require('portal-core/src/main/loginNew/loginNewApp')
require('portal-core/src/main/user/userApp')

angular.module('application', [
    'portal-core',
    'portal-core-login',
    'portal-core-user'
])

    //config
    .config(require('./config/authConfig'))
    .config(require('./config/indexConfig'))
    .config(require('./config/mdThemeConfig'))
    .config(require('./config/navConfig'))
    .config(require('./config/routeConfig'))
    .config(require('./config/mapConfig'))

    //components
    .component('mainMap', require('./mainMap/MainMap'))

    //services
    .service('mapWebSocketService', require('./services/MapWebSocketService'))
    .service('assetService', require('./services/AssetService'))
