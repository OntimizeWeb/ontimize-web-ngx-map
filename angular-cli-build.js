/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'core-js/client/**/*.+(js|js.map)',
      'reflect-metadata/**/*.+(js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      '@angular/material/**/*.+(js|js.map|css|css.map|scss)',

      'ontimize-web-ng2/*.js',
      'ontimize-web-ng2/ontimize/**/*.js',

      'ontimize-web-ng2-map/*.js',
      'ontimize-web-ng2-map/src/**/*.js',

      'leaflet/**/*.js',
      'leaflet-providers/**/*.js',
      'leaflet-draw/**/*.js',
      'ng2-dragula/**/*.js',
      'dragula/*.js',
      'contra/*.js',
      'atoa/*.js',
      'ticky/*.js',
      'crossvent/src/*.js',
      'custom-event/*.js',

      'ng2-translate/**/*.js',
      'moment/**/*.js',
      'jquery/dist/jquery.min.js',
      'jquery-ui/ui/**/*.js',
      'pdfmake/build/*.js',
      'datatables.net/js/jquery.dataTables.js',
      'datatables.net-buttons/js/*.js',
      'datatables.net-colreorder/js/dataTables.colReorder.js',
      'datatables.net-select/js/dataTables.select.js',
      'colresizable/*.js',

      'angular2-highlight-js/lib/**/*.+(js|js.map|css|css.map|scss)',

      'ontimize-web-ng2/**/*.css',
      'ontimize-web-ng2-map/**/*.css',
      'leaflet/**/*.css',
      'leaflet/dist/images/*.*',
      'leaflet-draw/**/*.css'
    ]
  });
};
