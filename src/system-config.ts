/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'main': 'main.js',

  '@angular/core': 'vendor/@angular/core/bundles/core.umd.js',
  '@angular/common': 'vendor/@angular/common/bundles/common.umd.js',
  '@angular/compiler': 'vendor/@angular/compiler/bundles/compiler.umd.js',
  '@angular/platform-browser': 'vendor/@angular/platform-browser/bundles/platform-browser.umd.js',
  '@angular/platform-browser-dynamic': 'vendor/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
  '@angular/http': 'vendor/@angular/http/bundles/http.umd.js',
  '@angular/router': 'vendor/@angular/router/bundles/router.umd.js',
  '@angular/forms': 'vendor/@angular/forms/bundles/forms.umd.js',

  '@angular/material': 'vendor/@angular/material/material.umd.js'

};

/** User packages configuration. */
const packages: any = {
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // App specific barrels.
  'app',
  'app/shared',
  'app/+main/+home',
  'app/+main/+basic',
  'app/+main/+marker-layer',
  'app/+main/+geojson-layer',
  'app/+main/+wms-layer',
  'app/+main'
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {
};

// add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index', defaultExtension: 'js' };
});


cliSystemConfigPackages['rxjs'] = { defaultExtension: 'js' };
cliSystemConfigPackages['moment'] = { main: 'moment' };
cliSystemConfigPackages['jquery'] = { main: 'dist/jquery.min' };
cliSystemConfigPackages['jquery-ui'] = { main: 'ui/widgets/datepicker' };
cliSystemConfigPackages['datatables.net'] = { main: 'js/jquery.dataTables' };
cliSystemConfigPackages['datatables.net-buttons'] = { main: 'js/dataTables.buttons' };
cliSystemConfigPackages['datatables.net-colreorder'] = { main: 'js/dataTables.colReorder' };
cliSystemConfigPackages['datatables.net-select'] = { main: 'js/dataTables.select' };
cliSystemConfigPackages['colresizable'] = { main: 'colResizable-1.6.min' };
cliSystemConfigPackages['pdfmake'] = { main: 'build/pdfmake.min' };
cliSystemConfigPackages['ng2-translate'] = { main: 'ng2-translate' };
cliSystemConfigPackages['ontimize-web-ng2'] = { main: 'ontimize' };
cliSystemConfigPackages['ontimize-web-ng2-map'] = { main: 'o-map' };
cliSystemConfigPackages['angular2-highlight-js'] =
  { main: 'highlight-js.module', defaultExtension: 'js' };
cliSystemConfigPackages['leaflet'] = { main: 'dist/leaflet' };
cliSystemConfigPackages['leaflet-providers'] = { main: 'leaflet-providers', defaultExtension: 'js' };
cliSystemConfigPackages['leaflet-draw'] = { main: 'dist/leaflet.draw' };
cliSystemConfigPackages['ng2-dragula'] = { main: 'ng2-dragula', defaultExtension: 'js' };
cliSystemConfigPackages['dragula'] = { main: 'dragula', defaultExtension: 'js' };
cliSystemConfigPackages['contra'] = { main: 'contra', defaultExtension: 'js' };
cliSystemConfigPackages['atoa'] = { main: 'atoa', defaultExtension: 'js' };
cliSystemConfigPackages['ticky'] = { main: 'ticky', defaultExtension: 'js' };
cliSystemConfigPackages['crossvent'] = { main: 'crossvent', defaultExtension: 'js' };
cliSystemConfigPackages['custom-event'] = { main: 'index', defaultExtension: 'js' };

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    'rxjs': 'vendor/rxjs',
    'moment': 'vendor/moment',
    'leaflet': 'vendor/leaflet',
    'leaflet-providers': 'vendor/leaflet-providers',
    'leaflet-draw': 'vendor/leaflet-draw',
    'jquery': 'vendor/jquery',
    'jquery-ui': 'vendor/jquery-ui',
    'datatables.net': 'vendor/datatables.net',
    'datatables.net-buttons': 'vendor/datatables.net-buttons',
    'datatables.net-colreorder': 'vendor/datatables.net-colreorder',
    'datatables.net-select': 'vendor/datatables.net-select',
    'colresizable': 'vendor/colresizable',
    'pdfmake': 'vendor/pdfmake',
    'ng2-translate': 'vendor/ng2-translate',
    'ontimize-web-ng2': 'vendor/ontimize-web-ng2',
    'ontimize-web-ng2-map': 'vendor/ontimize-web-ng2-map',
    'angular2-highlight-js': 'vendor/angular2-highlight-js/lib',
    'ng2-dragula': 'vendor/ng2-dragula',
    'dragula': 'vendor/dragula',
    'contra': 'vendor/contra',
    'atoa': 'vendor/atoa',
    'ticky': 'vendor/ticky',
    'crossvent': 'vendor/crossvent/src',
    'custom-event': 'vendor/custom-event'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
