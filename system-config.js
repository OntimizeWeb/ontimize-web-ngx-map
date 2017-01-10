/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
var map = {
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
var packages = {};
////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
var barrels = [
    // App specific barrels.
    'app',
    'app/shared',
    'app/+main/+home',
    'app/+main/+basic',
    'app/+main/+marker-layer',
    'app/+main/+geojson-layer',
    'app/+main/+wms-layer',
    'app/+main'
];
var cliSystemConfigPackages = {};
// add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
barrels.forEach(function (barrelName) {
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
System.config({ map: map, packages: packages });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzdGVtLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0ZW0tY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztnR0FFZ0c7QUFDaEcsa0NBQWtDO0FBQ2xDLElBQU0sR0FBRyxHQUFRO0lBQ2YsTUFBTSxFQUFFLFNBQVM7SUFFakIsZUFBZSxFQUFFLDBDQUEwQztJQUMzRCxpQkFBaUIsRUFBRSw4Q0FBOEM7SUFDakUsbUJBQW1CLEVBQUUsa0RBQWtEO0lBQ3ZFLDJCQUEyQixFQUFFLGtFQUFrRTtJQUMvRixtQ0FBbUMsRUFBRSxrRkFBa0Y7SUFDdkgsZUFBZSxFQUFFLDBDQUEwQztJQUMzRCxpQkFBaUIsRUFBRSw4Q0FBOEM7SUFDakUsZ0JBQWdCLEVBQUUsNENBQTRDO0lBRTlELG1CQUFtQixFQUFFLDBDQUEwQztDQUVoRSxDQUFDO0FBRUYsbUNBQW1DO0FBQ25DLElBQU0sUUFBUSxHQUFRLEVBQ3JCLENBQUM7QUFFRixnR0FBZ0c7QUFDaEc7O2dHQUVnRztBQUNoRyxJQUFNLE9BQU8sR0FBYTtJQUN4Qix3QkFBd0I7SUFDeEIsS0FBSztJQUNMLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QiwwQkFBMEI7SUFDMUIsc0JBQXNCO0lBQ3RCLFdBQVc7Q0FFWixDQUFDO0FBRUYsSUFBTSx1QkFBdUIsR0FBUSxFQUNwQyxDQUFDO0FBRUYsdUhBQXVIO0FBQ3ZILE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFrQjtJQUNqQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDbEYsQ0FBQyxDQUFDLENBQUM7QUFHSCx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDO0FBQzdELHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxHQUFH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L0MsY0FBYyxFQUFFLHFCQUFxQjtRQUNyQyxRQUFRLEVBQUUsZUFBZTtRQUN6QixXQUFXLEVBQUUsa0JBQWtCO1FBQy9CLGdCQUFnQixFQUFFLHVCQUF1QjtRQUN6Qyx3QkFBd0IsRUFBRSwrQkFBK0I7UUFDekQsMkJBQTJCLEVBQUUsa0NBQWtDO1FBQy9ELHVCQUF1QixFQUFFLDhCQUE4QjtRQUN2RCxjQUFjLEVBQUUscUJBQXFCO1FBQ3JDLFNBQVMsRUFBRSxnQkFBZ0I7UUFDM0IsZUFBZSxFQUFFLHNCQUFzQjtRQUN2QyxrQkFBa0IsRUFBRSx5QkFBeUI7UUFDN0Msc0JBQXNCLEVBQUUsNkJBQTZCO1FBQ3JELHVCQUF1QixFQUFFLGtDQUFrQztRQUMzRCxhQUFhLEVBQUUsb0JBQW9CO1FBQ25DLFNBQVMsRUFBRSxnQkFBZ0I7UUFDM0IsUUFBUSxFQUFFLGVBQWU7UUFDekIsTUFBTSxFQUFFLGFBQWE7UUFDckIsT0FBTyxFQUFFLGNBQWM7UUFDdkIsV0FBVyxFQUFFLHNCQUFzQjtRQUNuQyxjQUFjLEVBQUUscUJBQXFCO0tBQ3RDO0lBQ0QsUUFBUSxFQUFFLHVCQUF1QjtDQUNsQyxDQUFDLENBQUM7QUFFSCxrQ0FBa0M7QUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUEsR0FBRyxFQUFFLFVBQUEsUUFBUSxFQUFFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBVc2VyIENvbmZpZ3VyYXRpb24uXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4vKiogTWFwIHJlbGF0aXZlIHBhdGhzIHRvIFVSTHMuICovXHJcbmNvbnN0IG1hcDogYW55ID0ge1xyXG4gICdtYWluJzogJ21haW4uanMnLFxyXG5cclxuICAnQGFuZ3VsYXIvY29yZSc6ICd2ZW5kb3IvQGFuZ3VsYXIvY29yZS9idW5kbGVzL2NvcmUudW1kLmpzJyxcclxuICAnQGFuZ3VsYXIvY29tbW9uJzogJ3ZlbmRvci9AYW5ndWxhci9jb21tb24vYnVuZGxlcy9jb21tb24udW1kLmpzJyxcclxuICAnQGFuZ3VsYXIvY29tcGlsZXInOiAndmVuZG9yL0Bhbmd1bGFyL2NvbXBpbGVyL2J1bmRsZXMvY29tcGlsZXIudW1kLmpzJyxcclxuICAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic6ICd2ZW5kb3IvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9idW5kbGVzL3BsYXRmb3JtLWJyb3dzZXIudW1kLmpzJyxcclxuICAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljJzogJ3ZlbmRvci9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMvYnVuZGxlcy9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMudW1kLmpzJyxcclxuICAnQGFuZ3VsYXIvaHR0cCc6ICd2ZW5kb3IvQGFuZ3VsYXIvaHR0cC9idW5kbGVzL2h0dHAudW1kLmpzJyxcclxuICAnQGFuZ3VsYXIvcm91dGVyJzogJ3ZlbmRvci9AYW5ndWxhci9yb3V0ZXIvYnVuZGxlcy9yb3V0ZXIudW1kLmpzJyxcclxuICAnQGFuZ3VsYXIvZm9ybXMnOiAndmVuZG9yL0Bhbmd1bGFyL2Zvcm1zL2J1bmRsZXMvZm9ybXMudW1kLmpzJyxcclxuXHJcbiAgJ0Bhbmd1bGFyL21hdGVyaWFsJzogJ3ZlbmRvci9AYW5ndWxhci9tYXRlcmlhbC9tYXRlcmlhbC51bWQuanMnXHJcblxyXG59O1xyXG5cclxuLyoqIFVzZXIgcGFja2FnZXMgY29uZmlndXJhdGlvbi4gKi9cclxuY29uc3QgcGFja2FnZXM6IGFueSA9IHtcclxufTtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogRXZlcnl0aGluZyB1bmRlcm5lYXRoIHRoaXMgbGluZSBpcyBtYW5hZ2VkIGJ5IHRoZSBDTEkuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5jb25zdCBiYXJyZWxzOiBzdHJpbmdbXSA9IFtcclxuICAvLyBBcHAgc3BlY2lmaWMgYmFycmVscy5cclxuICAnYXBwJyxcclxuICAnYXBwL3NoYXJlZCcsXHJcbiAgJ2FwcC8rbWFpbi8raG9tZScsXHJcbiAgJ2FwcC8rbWFpbi8rYmFzaWMnLFxyXG4gICdhcHAvK21haW4vK21hcmtlci1sYXllcicsXHJcbiAgJ2FwcC8rbWFpbi8rZ2VvanNvbi1sYXllcicsXHJcbiAgJ2FwcC8rbWFpbi8rd21zLWxheWVyJyxcclxuICAnYXBwLyttYWluJ1xyXG4gIC8qKiBAY2xpLWJhcnJlbCAqL1xyXG5dO1xyXG5cclxuY29uc3QgY2xpU3lzdGVtQ29uZmlnUGFja2FnZXM6IGFueSA9IHtcclxufTtcclxuXHJcbi8vIGFkZCBwYWNrYWdlIGVudHJpZXMgZm9yIGFuZ3VsYXIgcGFja2FnZXMgaW4gdGhlIGZvcm0gJ0Bhbmd1bGFyL2NvbW1vbic6IHsgbWFpbjogJ2luZGV4LmpzJywgZGVmYXVsdEV4dGVuc2lvbjogJ2pzJyB9XHJcbmJhcnJlbHMuZm9yRWFjaCgoYmFycmVsTmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbYmFycmVsTmFtZV0gPSB7IG1haW46ICdpbmRleCcsIGRlZmF1bHRFeHRlbnNpb246ICdqcycgfTtcclxufSk7XHJcblxyXG5cclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ3J4anMnXSA9IHsgZGVmYXVsdEV4dGVuc2lvbjogJ2pzJyB9O1xyXG5jbGlTeXN0ZW1Db25maWdQYWNrYWdlc1snbW9tZW50J10gPSB7IG1haW46ICdtb21lbnQnIH07XHJcbmNsaVN5c3RlbUNvbmZpZ1BhY2thZ2VzWydqcXVlcnknXSA9IHsgbWFpbjogJ2Rpc3QvanF1ZXJ5Lm1pbicgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ2pxdWVyeS11aSddID0geyBtYWluOiAndWkvd2lkZ2V0cy9kYXRlcGlja2VyJyB9O1xyXG5jbGlTeXN0ZW1Db25maWdQYWNrYWdlc1snZGF0YXRhYmxlcy5uZXQnXSA9IHsgbWFpbjogJ2pzL2pxdWVyeS5kYXRhVGFibGVzJyB9O1xyXG5jbGlTeXN0ZW1Db25maWdQYWNrYWdlc1snZGF0YXRhYmxlcy5uZXQtYnV0dG9ucyddID0geyBtYWluOiAnanMvZGF0YVRhYmxlcy5idXR0b25zJyB9O1xyXG5jbGlTeXN0ZW1Db25maWdQYWNrYWdlc1snZGF0YXRhYmxlcy5uZXQtY29scmVvcmRlciddID0geyBtYWluOiAnanMvZGF0YVRhYmxlcy5jb2xSZW9yZGVyJyB9O1xyXG5jbGlTeXN0ZW1Db25maWdQYWNrYWdlc1snZGF0YXRhYmxlcy5uZXQtc2VsZWN0J10gPSB7IG1haW46ICdqcy9kYXRhVGFibGVzLnNlbGVjdCcgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ2NvbHJlc2l6YWJsZSddID0geyBtYWluOiAnY29sUmVzaXphYmxlLTEuNi5taW4nIH07XHJcbmNsaVN5c3RlbUNvbmZpZ1BhY2thZ2VzWydwZGZtYWtlJ10gPSB7IG1haW46ICdidWlsZC9wZGZtYWtlLm1pbicgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ25nMi10cmFuc2xhdGUnXSA9IHsgbWFpbjogJ25nMi10cmFuc2xhdGUnIH07XHJcbmNsaVN5c3RlbUNvbmZpZ1BhY2thZ2VzWydvbnRpbWl6ZS13ZWItbmcyJ10gPSB7IG1haW46ICdvbnRpbWl6ZScgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ29udGltaXplLXdlYi1uZzItbWFwJ10gPSB7IG1haW46ICdvLW1hcCcgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ2FuZ3VsYXIyLWhpZ2hsaWdodC1qcyddID1cclxuICB7IG1haW46ICdoaWdobGlnaHQtanMubW9kdWxlJywgZGVmYXVsdEV4dGVuc2lvbjogJ2pzJyB9O1xyXG5jbGlTeXN0ZW1Db25maWdQYWNrYWdlc1snbGVhZmxldCddID0geyBtYWluOiAnZGlzdC9sZWFmbGV0JyB9O1xyXG5jbGlTeXN0ZW1Db25maWdQYWNrYWdlc1snbGVhZmxldC1wcm92aWRlcnMnXSA9IHsgbWFpbjogJ2xlYWZsZXQtcHJvdmlkZXJzJywgZGVmYXVsdEV4dGVuc2lvbjogJ2pzJyB9O1xyXG5jbGlTeXN0ZW1Db25maWdQYWNrYWdlc1snbGVhZmxldC1kcmF3J10gPSB7IG1haW46ICdkaXN0L2xlYWZsZXQuZHJhdycgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ25nMi1kcmFndWxhJ10gPSB7IG1haW46ICduZzItZHJhZ3VsYScsIGRlZmF1bHRFeHRlbnNpb246ICdqcycgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ2RyYWd1bGEnXSA9IHsgbWFpbjogJ2RyYWd1bGEnLCBkZWZhdWx0RXh0ZW5zaW9uOiAnanMnIH07XHJcbmNsaVN5c3RlbUNvbmZpZ1BhY2thZ2VzWydjb250cmEnXSA9IHsgbWFpbjogJ2NvbnRyYScsIGRlZmF1bHRFeHRlbnNpb246ICdqcycgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ2F0b2EnXSA9IHsgbWFpbjogJ2F0b2EnLCBkZWZhdWx0RXh0ZW5zaW9uOiAnanMnIH07XHJcbmNsaVN5c3RlbUNvbmZpZ1BhY2thZ2VzWyd0aWNreSddID0geyBtYWluOiAndGlja3knLCBkZWZhdWx0RXh0ZW5zaW9uOiAnanMnIH07XHJcbmNsaVN5c3RlbUNvbmZpZ1BhY2thZ2VzWydjcm9zc3ZlbnQnXSA9IHsgbWFpbjogJ2Nyb3NzdmVudCcsIGRlZmF1bHRFeHRlbnNpb246ICdqcycgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ2N1c3RvbS1ldmVudCddID0geyBtYWluOiAnaW5kZXgnLCBkZWZhdWx0RXh0ZW5zaW9uOiAnanMnIH07XHJcblxyXG4vKiogVHlwZSBkZWNsYXJhdGlvbiBmb3IgYW1iaWVudCBTeXN0ZW0uICovXHJcbmRlY2xhcmUgdmFyIFN5c3RlbTogYW55O1xyXG5cclxuLy8gQXBwbHkgdGhlIENMSSBTeXN0ZW1KUyBjb25maWd1cmF0aW9uLlxyXG5TeXN0ZW0uY29uZmlnKHtcclxuICBtYXA6IHtcclxuICAgICdyeGpzJzogJ3ZlbmRvci9yeGpzJyxcclxuICAgICdtb21lbnQnOiAndmVuZG9yL21vbWVudCcsXHJcbiAgICAnbGVhZmxldCc6ICd2ZW5kb3IvbGVhZmxldCcsXHJcbiAgICAnbGVhZmxldC1wcm92aWRlcnMnOiAndmVuZG9yL2xlYWZsZXQtcHJvdmlkZXJzJyxcclxuICAgICdsZWFmbGV0LWRyYXcnOiAndmVuZG9yL2xlYWZsZXQtZHJhdycsXHJcbiAgICAnanF1ZXJ5JzogJ3ZlbmRvci9qcXVlcnknLFxyXG4gICAgJ2pxdWVyeS11aSc6ICd2ZW5kb3IvanF1ZXJ5LXVpJyxcclxuICAgICdkYXRhdGFibGVzLm5ldCc6ICd2ZW5kb3IvZGF0YXRhYmxlcy5uZXQnLFxyXG4gICAgJ2RhdGF0YWJsZXMubmV0LWJ1dHRvbnMnOiAndmVuZG9yL2RhdGF0YWJsZXMubmV0LWJ1dHRvbnMnLFxyXG4gICAgJ2RhdGF0YWJsZXMubmV0LWNvbHJlb3JkZXInOiAndmVuZG9yL2RhdGF0YWJsZXMubmV0LWNvbHJlb3JkZXInLFxyXG4gICAgJ2RhdGF0YWJsZXMubmV0LXNlbGVjdCc6ICd2ZW5kb3IvZGF0YXRhYmxlcy5uZXQtc2VsZWN0JyxcclxuICAgICdjb2xyZXNpemFibGUnOiAndmVuZG9yL2NvbHJlc2l6YWJsZScsXHJcbiAgICAncGRmbWFrZSc6ICd2ZW5kb3IvcGRmbWFrZScsXHJcbiAgICAnbmcyLXRyYW5zbGF0ZSc6ICd2ZW5kb3IvbmcyLXRyYW5zbGF0ZScsXHJcbiAgICAnb250aW1pemUtd2ViLW5nMic6ICd2ZW5kb3Ivb250aW1pemUtd2ViLW5nMicsXHJcbiAgICAnb250aW1pemUtd2ViLW5nMi1tYXAnOiAndmVuZG9yL29udGltaXplLXdlYi1uZzItbWFwJyxcclxuICAgICdhbmd1bGFyMi1oaWdobGlnaHQtanMnOiAndmVuZG9yL2FuZ3VsYXIyLWhpZ2hsaWdodC1qcy9saWInLFxyXG4gICAgJ25nMi1kcmFndWxhJzogJ3ZlbmRvci9uZzItZHJhZ3VsYScsXHJcbiAgICAnZHJhZ3VsYSc6ICd2ZW5kb3IvZHJhZ3VsYScsXHJcbiAgICAnY29udHJhJzogJ3ZlbmRvci9jb250cmEnLFxyXG4gICAgJ2F0b2EnOiAndmVuZG9yL2F0b2EnLFxyXG4gICAgJ3RpY2t5JzogJ3ZlbmRvci90aWNreScsXHJcbiAgICAnY3Jvc3N2ZW50JzogJ3ZlbmRvci9jcm9zc3ZlbnQvc3JjJyxcclxuICAgICdjdXN0b20tZXZlbnQnOiAndmVuZG9yL2N1c3RvbS1ldmVudCdcclxuICB9LFxyXG4gIHBhY2thZ2VzOiBjbGlTeXN0ZW1Db25maWdQYWNrYWdlc1xyXG59KTtcclxuXHJcbi8vIEFwcGx5IHRoZSB1c2VyJ3MgY29uZmlndXJhdGlvbi5cclxuU3lzdGVtLmNvbmZpZyh7IG1hcCwgcGFja2FnZXMgfSk7XHJcbiJdfQ==