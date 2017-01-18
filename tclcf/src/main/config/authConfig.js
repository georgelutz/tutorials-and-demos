require('../images/login_logo.gif')
require('../images/nav_logo.png')

module.exports = /* @ngInject */
    function(authConfigProvider) {
        authConfigProvider.config.requireLogin = false
        authConfigProvider.config.clientId = 'TemplatePortal'
        authConfigProvider.config.adminOrgs.Pnet = {orgKey: 'template', orgName: 'Template'}
        authConfigProvider.config.loginImageUrl = 'images/login_logo.gif'
        authConfigProvider.config.navImageUrl = 'images/nav_logo.png'
    }
