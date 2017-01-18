<a name="11.0.0"></a>
# [11.0.0](https://github.com/PeopleNet/portal-core/compare/10.1.1...11.0.0) (2016-08-19)


### Bug Fixes

* **coreApp:** modalActionComponent should be modalActionIcons([03d5373](https://github.com/PeopleNet/portal-core/commit/03d5373))
* fixed a few issues with the latest List changes([d2b3857](https://github.com/PeopleNet/portal-core/commit/d2b3857))
* **Login:** Cancel of login should not hang loading bar.([ce1dd24](https://github.com/PeopleNet/portal-core/commit/ce1dd24))
* added !important to .pass and .fail([b605e93](https://github.com/PeopleNet/portal-core/commit/b605e93))
* card actions on list pages([4ad7fbb](https://github.com/PeopleNet/portal-core/commit/4ad7fbb))
* clearing chips should do nothing if there are no chips([79b87b4](https://github.com/PeopleNet/portal-core/commit/79b87b4))
* Link style should match primary color.([0fe38cd](https://github.com/PeopleNet/portal-core/commit/0fe38cd))
* Login should show again after error.([e00140a](https://github.com/PeopleNet/portal-core/commit/e00140a))
* Misc fixes due to recent style changes.([65350c2](https://github.com/PeopleNet/portal-core/commit/65350c2))
* page header css([7d7ed81](https://github.com/PeopleNet/portal-core/commit/7d7ed81))
* Remove deprecated module for googleAnalytics.([cdd638a](https://github.com/PeopleNet/portal-core/commit/cdd638a))
* **ReleaseNotes:** Release notes should have padding.([fc849da](https://github.com/PeopleNet/portal-core/commit/fc849da))
* Remove empty test files/folders.([5fd43ff](https://github.com/PeopleNet/portal-core/commit/5fd43ff))
* Remove some one-time binding expressions.([ae5dfbb](https://github.com/PeopleNet/portal-core/commit/ae5dfbb))


### Features

* add back button to page header([2feb533](https://github.com/PeopleNet/portal-core/commit/2feb533))
* Add placeholder new Permission components.([6697ffe](https://github.com/PeopleNet/portal-core/commit/6697ffe))
* Add placeholder new Role components.([b63c00d](https://github.com/PeopleNet/portal-core/commit/b63c00d))
* Add simple word to core common translations.([d3a4fe4](https://github.com/PeopleNet/portal-core/commit/d3a4fe4))
* Add userNew module.([b7a4501](https://github.com/PeopleNet/portal-core/commit/b7a4501))
* added CRUD screens for roles and permissions([dd83cd8](https://github.com/PeopleNet/portal-core/commit/dd83cd8))
* Bump alk-maps to latest.([bb1fbd3](https://github.com/PeopleNet/portal-core/commit/bb1fbd3))
* **styles:** added .pass and .fail color classes for md-icons([6744fe1](https://github.com/PeopleNet/portal-core/commit/6744fe1))
* Create new standard-card component.([558f634](https://github.com/PeopleNet/portal-core/commit/558f634))
* DateTimePicker should send value to onChanges too.([bf8f0f5](https://github.com/PeopleNet/portal-core/commit/bf8f0f5))
* make chip filter appear if chips exist([aa49de2](https://github.com/PeopleNet/portal-core/commit/aa49de2))
* make list component modular([cdeaf2c](https://github.com/PeopleNet/portal-core/commit/cdeaf2c))
* new user edit profile page and dialogs([c22a408](https://github.com/PeopleNet/portal-core/commit/c22a408))
* Remove pnet api keys from portal-core.([47ff867](https://github.com/PeopleNet/portal-core/commit/47ff867))
* Update dependencies to latest.([faf6711](https://github.com/PeopleNet/portal-core/commit/faf6711))
* Update external dependencies to latest.([29ab27e](https://github.com/PeopleNet/portal-core/commit/29ab27e))
* **core:** Begin deprecating module-base.html usage.([8257c48](https://github.com/PeopleNet/portal-core/commit/8257c48))
* **ListToolbar:** Chip filter should be focused when shown.([46c9b9b](https://github.com/PeopleNet/portal-core/commit/46c9b9b))
* **newUserProfile:** connect modals to profile page([531fcda](https://github.com/PeopleNet/portal-core/commit/531fcda))
* **userNew:** Add user list, user add, details page([294cc04](https://github.com/PeopleNet/portal-core/commit/294cc04))


### BREAKING CHANGES

* **package.json** Dependencies updated, update portal-modules and portal dependencies to match portalcore and **make sure to regression test**.
* **alk-maps** If you use maps, provide a mapConfig that provides api keys for alk.
```javascript
module.exports = /* @ngInject */ function(mapConfigProvider) {
    mapConfigProvider.config.apiKeys = {
        dev: 'devMapApiKey',
        qa: 'qaMapApiKey',
        staging: 'stagingMapApiKey',
        prod: 'prodMapApiKey'
    }
}
```
* **core**: Any usages of moduleBase.html, module-base-content css class,
tab-content css class have been deprecated. All pages should be within a card. Use the new `standard-card` component
instead to help pages look more like UX recommendations. See [developer-portal](http://developer-portal-dev.connectedfleet.io/) for
examples on what pages should look like, and any additional questions should be directed
to the UX team.
* **List components**: The entire list has been reworked from scratch to be more flexible with custom 
features needed by several teams. See the examples in [developer-portal](http://developer-portal-dev.connectedfleet.io/#/nav/demo/list).
* **auth0Login**: Module has been renamed to `loginNew`. Beware though, this hybrid between old (OEM) login and auth0 
will be deprecated sometime between 11 and 12, so if you need a stable login pattern, use `login`. This new module will
be set up to use the new `user-profile-service` for portal-core 12.
* There are several new modules in `portal-core` related to the upcoming `user-profile-service`. These modules are 
`organization`, `permissionNew`, `roleNew`, `userNew`, `loginNew`. Do not begin using these yet until version 12, as 
they are very early release, and most of them are not fully functional.


<a name="10.1.1"></a>
## [10.1.1](https://github.com/PeopleNet/portal-core/compare/10.1.0...10.1.1) (2016-07-15)


### Bug Fixes

* **Login:** Login background should only show on login.([18f2a27](https://github.com/PeopleNet/portal-core/commit/18f2a27))



<a name="10.1.0"></a>
# [10.1.0](https://github.com/PeopleNet/portal-core/compare/10.0.1...10.1.0) (2016-07-15)


### Bug Fixes

* md-select z-index so that it appears on top of modals([03ac89a](https://github.com/PeopleNet/portal-core/commit/03ac89a))
* **chipFIlter:** Allow svg chip icons([f3ee6d3](https://github.com/PeopleNet/portal-core/commit/f3ee6d3))
* **user:** Only warn about ROLE_SERVER_ADMIN once.([d333443](https://github.com/PeopleNet/portal-core/commit/d333443))


### Features

* **build:** Re-enable hot reloading of CSS.([240522f](https://github.com/PeopleNet/portal-core/commit/240522f))
* **Login:** Auth0 login now with pnet theme.([aa3da53](https://github.com/PeopleNet/portal-core/commit/aa3da53))
* **portal-core:** removing deprecated ROLE_SERVER_ADMIN([40bcb93](https://github.com/PeopleNet/portal-core/commit/40bcb93))
* **ReleaseNotes:** Add release notes feature.([e6a8738](https://github.com/PeopleNet/portal-core/commit/e6a8738))
* Bump alk-maps version.([cf14045](https://github.com/PeopleNet/portal-core/commit/cf14045))
* Bump version of alk-maps.([08787ae](https://github.com/PeopleNet/portal-core/commit/08787ae))



<a name="10.0.1"></a>
## [10.0.1](https://github.com/PeopleNet/portal-core/compare/10.0.0...10.0.1) (2016-07-12)


### Bug Fixes

* **List:** clear selected rows upon leaving list component([5723458](https://github.com/PeopleNet/portal-core/commit/5723458))
* Remove unused configs.([93c34b6](https://github.com/PeopleNet/portal-core/commit/93c34b6))


### Features

* **loadingService:** Support async loading bar.([fa334ee](https://github.com/PeopleNet/portal-core/commit/fa334ee))
* Add JSON loader([f729960](https://github.com/PeopleNet/portal-core/commit/f729960))
* **portal-core:** UTC Date/Time([a0fa395](https://github.com/PeopleNet/portal-core/commit/a0fa395))
* Bump alk-maps version.([da36559](https://github.com/PeopleNet/portal-core/commit/da36559))
* Support svg icons([0237b76](https://github.com/PeopleNet/portal-core/commit/0237b76))



<a name="10.0.0"></a>
# [10.0.0](https://github.com/PeopleNet/portal-core/compare/9.0.0...10.0.0) (2016-06-28)


### Bug Fixes

* all ng-messages form in portal-core([37f8276](https://github.com/PeopleNet/portal-core/commit/37f8276))
* Remove unused attributes on tab pages.([e78136b](https://github.com/PeopleNet/portal-core/commit/e78136b))
* Disable style lint for now.([ac23952](https://github.com/PeopleNet/portal-core/commit/ac23952))
* fixed issue with deselecting rows([3e232ac](https://github.com/PeopleNet/portal-core/commit/3e232ac))
* fixed issue with selecting multiple rows([8399927](https://github.com/PeopleNet/portal-core/commit/8399927))
* removed row from callbacks([6606d1a](https://github.com/PeopleNet/portal-core/commit/6606d1a))
* **dataTable:** fixed issue with alternate toolbar on old lists([42d2502](https://github.com/PeopleNet/portal-core/commit/42d2502))
* **ga:** Move google analytics module to core.([7dbe81c](https://github.com/PeopleNet/portal-core/commit/7dbe81c))
* **index.html:** changing auth0 to SSL([bbd1657](https://github.com/PeopleNet/portal-core/commit/bbd1657))
* **Nav:** Address potential null safety issue.([b817178](https://github.com/PeopleNet/portal-core/commit/b817178))
* **UrlConfig:** Default to dev when unknown.([c0cbe3a](https://github.com/PeopleNet/portal-core/commit/c0cbe3a))


### Features

* **core:** added List component and related services/providers([96db004](https://github.com/PeopleNet/portal-core/commit/96db004))
* **List:** added density toggle and other improvements([378bd3c](https://github.com/PeopleNet/portal-core/commit/378bd3c))
* **List:** added restangular for callbacks([616b8f9](https://github.com/PeopleNet/portal-core/commit/616b8f9))
* **List:** added support for multiple lists([44ad640](https://github.com/PeopleNet/portal-core/commit/44ad640))
* **List:** added the ability to specify svg for icon buttons([6ec9ea0](https://github.com/PeopleNet/portal-core/commit/6ec9ea0))
* **Nav:** Allow hiding sidenav and login per portal.([11d89a5](https://github.com/PeopleNet/portal-core/commit/11d89a5))
* Significant build system improvements.([912ae7b](https://github.com/PeopleNet/portal-core/commit/912ae7b))

#### New List Component

A new component has been made that should make List pages easier to build and maintain. See the [example](https://github.com/PeopleNet/developer-portal/blob/master/src/main/components/ListDemo.js) in developer portal.

### BREAKING CHANGES

#### Build System Changes
The build system has had significant changes and improvements. Please see the [upgrade guide](https://github.com/PeopleNet/portal-core/wiki/New-Build-System-(6-24-2016)) for more information.

### Google Analytics
The former Google Analytics module has been removed and combined into portal-core. This is due to portal-core requiring some of those features. If you previously depended on this module, just remove that dependency and everything should continue to function properly.
