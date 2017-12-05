#2.0.3

### Features

* **o-map**: adding default draw contrlos if '*draw-controls*' input is true and no there is no inner '*o-map-draw-controls*' component ([4f0fafe](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit4f0fafe/))

* **o-map-draw-controls**: new component ([#25](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/25)) ([4f0fafe](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit4f0fafe/))

* **o-map**: new outputs '*onClick*', '*onDrag*', '*onMove*', '*onMoveEnd*' and '*onZoomLevelsChange*' ([4f0fafe](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit4f0fafe/))
* **o-map**: new draw events outputs ([4f0fafe](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit4f0fafe/))
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

#2.0.2

### Features

* **o-map**: adding '*search-control-button-visible*' (default value = true) ([22#](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/22)) ([10e88bc](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/10e88bc))

### Bug Fixes
* **TranslateMapService**: fixing initial language bug ([#18](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/18)) ([b3eca7d](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/b3eca7d))
* **ontimize-web-ngx-map**: fixing bugs in '*ontimize-web-ngx-map/styles.scss*' and '*ontimize-web-ngx-map/assets*' ([#21](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/21)) ([643831b](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/643831b))
* **o-map-workspace**: dragging bugs fixed ([20#](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/20)) ([f545586](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/f545586))


#2.0.1

### Features
* **ontimize-web-ngx-map**: leafleat styles and some neccesary assets are now included in '*ontimize-web-ngx-map/styles.scss*' and '*ontimize-web-ngx-map/assets*' ([#14](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/14)) ([a200c74](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/a200c74)).

##2.0.0

### DEV-DEPENDENCY UPDATES ###
* **Updated**:  ontimize-web-ngx@2.0.0
* **Updated**:  @angular/cli@1.3.2
* **Updated**:  @ngx-translate/core@8.0.0
* **Updated**:  @angular@4.3.6
* **Updated**:  @angular/material@2.0.0-beta.10
* **Updated**:  @angular/cdk@2.0.0-beta.10
* **Updated**:  @angular/flex-layout@2.0.0-beta.9

### BREAKING CHANGES
* **OMapModule**: '*ontimize-web-ng2-map*' is now called '*ontimize-web-ngx-map*'.

**IMPORTANT: you must update your imports for changing '*ontimize-web-ng2-map*' for '*ontimize-web-ngx-map*'. This includes module and components import and '*styles.scss*' reference.

##2.0.0-rc.2

### Features
* **ontimize-web-ng2-map**: '*OMapModule*' is now AoT compatible.

### DEPENDENCY UPDATES ###
* **Added**:  leaflet.heat@0.2.0


### Bug Fixes
* **o-map**: fixing errors when '*o-map*' is inside a tab ([#12](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/12)) ([4ae8fbd](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/4ae8fbd))
* **o-navigator-item**: fixing search results alignment bug ([#13](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/13)) ([370c0ab](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/370c0ab))
* **o-map**: fixing styles bugs ([#13](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/13)) ([72c6f82](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/72c6f82))
* **o-map-layer-group**: fixing display problems ([#10](https://github.com/OntimizeWeb/ontimize-web-ng2-map/issues/10)) ([52a3cec](https://github.com/OntimizeWeb/ontimize-web-ng2-map/commit/52a3cec))

## 1.0.2
### Features
* **o-map**: adding '*onToggleWSLayerSelected*', '*onToggleWSLayerVisibility*' and '*onToggleWSLayerInWS*' outputs.
* **o-map-workspace**: adding '*onToggleWSLayerSelected*', '*onToggleWSLayerVisibility*' and '*onToggleWSLayerInWS*' outputs.
* **o-map-workspace-layer**: adding '*onToggleSelected*', '*onToggleVisibility*' and '*onToggleInWS*' outputs.

## 1.0.1

### PEER-DEPENDENCY UPDATES ###
* **Updated**:   ontimize-web-ng2@1.2.3
* **Updated**:   @angular@2.4.2
* **Updated**:   @angular/router@3.4.2
* **Updated**:   @angular/material@2.0.0-beta.1
* **Updated**:   rxjs@5.0.1
* **Updated**:   zone.js@0.7.4
* **Updated**:   moment@2.17.1
* **Updated**:   ng2-translate@5.0.0

## 1.0.0

### Features

* **angular2:** version 2.1.2.
* **angular2 router:** version 3.0.0-rc.2.
* **angular2 material:** version v2.0.0-alpha.10.

---

## 1.0.0-rc.0

### Features

* **build:** first release candidate


