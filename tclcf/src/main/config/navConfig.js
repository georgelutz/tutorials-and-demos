module.exports = /* @ngInject */
    function(navigationProvider) {
        var menuItems = navigationProvider.getMenuItems()

        //remove users nav item
        menuItems.pop()

        //Sample Nav
        menuItems.push({
            name: 'common.nav_parent',
            icon: 'web',    
            type: 'toggle',            
            pages: [
                // navigationProvider.createMenuItem(type, name, icon, url, sort, permissions, activeStates)
                navigationProvider.createMenuItem('link', 'common.nav_child', 'filter_list',
                    '#/nav/welcome', 'Welcome', [], ['nav.welcome'])
            ]
        })

    }
