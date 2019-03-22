## 4.0.1 (2019-xx-xx)
### Features
* **Controls**: added new variables to show/hide controls in navigator control ([2b2d775](https://github.com/OntimizeWeb/ontimize-web-ngx-map/commit/2b2d775))
* **DrawControl**: exposing `editableLayers` of drawControl ([edf8510](https://github.com/OntimizeWeb/ontimize-web-ngx-map/commit/edf8510))
* **DrawControl**: make `drawControlComponent` public ([0e2b1b3](https://github.com/OntimizeWeb/ontimize-web-ngx-map/commit/0e2b1b3))

### Bug Fixes
* **o-layer-options**: fixing bugs on merging layer options ([97ba9d0](https://github.com/OntimizeWeb/ontimize-web-ngx-map/commit/97ba9d0))
* **o-map**: fixing bug initializing map when it is inside a tab ([ab633e1](https://github.com/OntimizeWeb/ontimize-web-ngx-map/commit/ab633e1))

## 4.0.0 (2018-02-22)
### DEPENDENCY UPDATES
* **Updated**: ontimize-web-ngx@4.0.0 (This change does not affect to user)

## 4.0.0-rc.1 (2018-01-17)
### DEPENDENCY UPDATES
* **Updated**: ontimize-web-ngx@4.0.0-rc.1 (This change does not affect to user)

## 4.0.0-rc.0 (2018-11-19)
### DEPENDENCY UPDATES
* **Updated**: ontimize-web-ngx@4.0.0-rc.0 (This change does not affect to user)

## 3.0.0 (2018-09-14)
### DEV-DEPENDENCY UPDATES ###
* ontimize-web-ngx@3.0.1

## 3.0.0-rc.1 (2018-07-02)
### Bug Fixes
* **ontimize-web-ngx**: fixing bugs for updating to '*ontimize-web-ngx@3.0.0-rc.1*'

##3.0.0-rc.0 (2018-04-30)
### DEPENDENCY UPDATES ###
* **Removed**: dragula@^3.7.2
* **Removed**: ng2-dragula@1.3.1
* **Added**: ng2-dnd@5.0.2

### PEER-DEPENDENCY UPDATES ###
* **Updated**: core-js@2.5.3
* **Updated**: rxjs@5.5.6
* **Updated**: zone.js@0.8.20
* **Removed**: lodash@4.17.4

### Features
* **OntimizeWeb**: using '*ontimize-web-ngx@3.0.0-rc.0*' ([8ab87f6](https://github.com/OntimizeWeb/ontimize-web-ngx/commit/8ab87f6))
* **Angular and Angular Material**: updating versions ([8ab87f6](https://github.com/OntimizeWeb/ontimize-web-ngx/commit/8ab87f6))

### BREAKING CHANGES
* **devDependencies**: updating and removing unnecesary dependencies ([1aae84b](https://github.com/OntimizeWeb/ontimize-web-ngx/commit/1aae84b))
* **ng2-dnd**: Using '*ng2-dnd'* for draggable workspace layer components (change should be transparent to user) ([3e7ccc8](https://github.com/OntimizeWeb/ontimize-web-ngx/commit/3e7ccc8))

## 2.0.4 (2017-12-21)
### Bug Fixes
* **o-map-layer**: fixing initialization bug ([#29](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/29)) ([95dd56d](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/95dd56d))

## 2.0.3 (2017-12-20)
### Features
* **o-map-crs**: new '*o-map-crs*' component ([#24](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/24)) ([e43a2fc](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/e43a2fc))
  * **o-map-layer**: new '*crs*' and '*crs-configuration*' inputs.
* **o-map-draw-controls**: new '*o-map-draw-controls*' component ([#25](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/25)) ([4f0fafe](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/4f0fafe)) ([f084589](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/f084589))
  * **o-map**: adding default draw controls if '*draw-controls*' input is true and no there is no inner '*o-map-draw-controls*' component.
* **o-map**: new '*onClick*', '*onDrag*', '*onMove*', '*onMoveEnd*' and '*onZoomLevelsChange*' outputs ([4f0fafe](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/4f0fafe))
* **o-map**: new draw events outputs ([4f0fafe](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/4f0fafe))
  * '*onDrawEvent*': triggered on each map draw control event.
  * draw:created     => '*onDrawCreated*'
  * draw:edited      => '*onDrawEdited*'
  * draw:deleted     => '*onDrawDeleted*'
  * draw:drawstart   => '*onDrawDrawStart*'
  * draw:drawstop    => '*onDrawDrawstop*'
  * draw:drawvertex  => '*onDrawvertex*'
  * draw:editstart   => '*onDrawEditStart*'
  * draw:editmove    => '*onDrawEditMove*'
  * draw:editresize  => '*onDrawEditResize*'
  * draw:editvertex  => '*onDrawEditvertex*'
  * draw:editstop    => '*onDrawEditStop*'
  * draw:deletestart => '*onDrawDeleteStart*'
  * draw:deletestop  => '*onDrawDeleteStop*'

### BREAKING CHANGES
* **o-map**: '*events*' property no longer exists. All events now are declared in the '*OMapComponent*' ([4f0fafe](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit4f0fafe/))

## 2.0.2 (2017-10-27)
### Features
* **o-map**: adding '*search-control-button-visible*' (default value = true) ([22#](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/22)) ([10e88bc](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/10e88bc))

### Bug Fixes
* **TranslateMapService**: fixing initial language bug ([#18](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/18)) ([b3eca7d](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/b3eca7d))
* **ontimize-web-ngx-map**: fixing bugs in '*ontimize-web-ngx-map/styles.scss*' and '*ontimize-web-ngx-map/assets*' ([#21](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/21)) ([643831b](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/643831b))
* **o-map-workspace**: dragging bugs fixed ([20#](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/20)) ([f545586](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/f545586))

## 2.0.1 (2017-10-20)
### Features
* **ontimize-web-ngx-map**: leafleat styles and some neccesary assets are now included in '*ontimize-web-ngx-map/styles.scss*' and '*ontimize-web-ngx-map/assets*' ([#14](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/14)) ([a200c74](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/a200c74)).

## 2.0.0 (2017-09-27)
### DEV-DEPENDENCY UPDATES ###
* **Updated**: ontimize-web-ngx@2.0.0
* **Updated**: @angular/cli@1.3.2
* **Updated**: @ngx-translate/core@8.0.0
* **Updated**: @angular@4.3.6
* **Updated**: @angular/material@2.0.0-beta.10
* **Updated**: @angular/cdk@2.0.0-beta.10
* **Updated**: @angular/flex-layout@2.0.0-beta.9

### BREAKING CHANGES
* **OMapModule**: '*ontimize-web-ng2-map*' is now called '*ontimize-web-ngx-map*'.

**IMPORTANT: you must update your imports for changing '*ontimize-web-ng2-map*' for '*ontimize-web-ngx-map*'. This includes module and components import and '*styles.scss*' reference.

## 2.0.0-rc.2 (2017-09-20)
### Features
* **ontimize-web-ng2-map**: '*OMapModule*' is now AoT compatible.

### DEPENDENCY UPDATES ###
* **Added**: leaflet.heat@0.2.0

### Bug Fixes
* **o-map**: fixing errors when '*o-map*' is inside a tab ([#12](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/12)) ([4ae8fbd](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/4ae8fbd))
* **o-navigator-item**: fixing search results alignment bug ([#13](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/13)) ([370c0ab](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/370c0ab))
* **o-map**: fixing styles bugs ([#13](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/13)) ([72c6f82](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/72c6f82))
* **o-map-layer-group**: fixing display problems ([#10](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/10)) ([52a3cec](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/52a3cec))

## 1.0.2 (2017-06-20)
### Features
* **o-map**: adding '*onToggleWSLayerSelected*', '*onToggleWSLayerVisibility*' and '*onToggleWSLayerInWS*' outputs.
* **o-map-workspace**: adding '*onToggleWSLayerSelected*', '*onToggleWSLayerVisibility*' and '*onToggleWSLayerInWS*' outputs.
* **o-map-workspace-layer**: adding '*onToggleSelected*', '*onToggleVisibility*' and '*onToggleInWS*' outputs.

## 1.0.1 (2017-04-18)
### PEER-DEPENDENCY UPDATES ###
* **Updated**: ontimize-web-ng2@1.2.3
* **Updated**: @angular@2.4.2
* **Updated**: @angular/router@3.4.2
* **Updated**: @angular/material@2.0.0-beta.1
* **Updated**: rxjs@5.0.1
* **Updated**: zone.js@0.7.4
* **Updated**: moment@2.17.1
* **Updated**: ng2-translate@5.0.0

## 1.0.0 (2017-01-24)
### Features
* **angular2:** version 2.1.2.
* **angular2 router:** version 3.0.0-rc.2.
* **angular2 material:** version v2.0.0-alpha.10.

## 1.0.0-rc.0 (2016-10-13)
### Features
* **build:** first release candidate
