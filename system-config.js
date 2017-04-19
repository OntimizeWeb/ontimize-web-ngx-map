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
    '@angular/material': 'vendor/@angular/material/bundles/material.umd.js'
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
cliSystemConfigPackages['ng2-translate'] = {
    main: 'bundles/ng2-translate.umd.js',
    defaultExtension: 'js'
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzdGVtLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0ZW0tY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztnR0FFZ0c7QUFDaEcsa0NBQWtDO0FBQ2xDLElBQU0sR0FBRyxHQUFRO0lBQ2YsTUFBTSxFQUFFLFNBQVM7SUFFakIsZUFBZSxFQUFFLDBDQUEwQztJQUMzRCxpQkFBaUIsRUFBRSw4Q0FBOEM7SUFDakUsbUJBQW1CLEVBQUUsa0RBQWtEO0lBQ3ZFLDJCQUEyQixFQUFFLGtFQUFrRTtJQUMvRixtQ0FBbUMsRUFBRSxrRkFBa0Y7SUFDdkgsZUFBZSxFQUFFLDBDQUEwQztJQUMzRCxpQkFBaUIsRUFBRSw4Q0FBOEM7SUFDakUsZ0JBQWdCLEVBQUUsNENBQTRDO0lBRTlELG1CQUFtQixFQUFFLGtEQUFrRDtDQUV4RSxDQUFDO0FBRUYsbUNBQW1DO0FBQ25DLElBQU0sUUFBUSxHQUFRLEVBQ3JCLENBQUM7QUFFRixnR0FBZ0c7QUFDaEc7O2dHQUVnRztBQUNoRyxJQUFNLE9BQU8sR0FBYTtJQUN4Qix3QkFBd0I7SUFDeEIsS0FBSztJQUNMLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QiwwQkFBMEI7SUFDMUIsc0JBQXNCO0lBQ3RCLFdBQVc7Q0FFWixDQUFDO0FBRUYsSUFBTSx1QkFBdUIsR0FBUSxFQUNwQyxDQUFDO0FBRUYsdUhBQXVIO0FBQ3ZILE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFrQjtJQUNqQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDbEYsQ0FBQyxDQUFDLENBQUM7QUFHSCx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDO0FBQzdELHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO0FBQ3ZELHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUM7QUFDaEUsdUJBQXVCLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQztBQUN6RSx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLENBQUM7QUFDN0UsdUJBQXVCLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRSxDQUFDO0FBQ3RGLHVCQUF1QixDQUFDLDJCQUEyQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQztBQUM1Rix1QkFBdUIsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLENBQUM7QUFDcEYsdUJBQXVCLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQztBQUMzRSx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxDQUFDO0FBQ25FLHVCQUF1QixDQUFDLGVBQWUsQ0FBQyxHQUFHO0lBQ3pDLElBQUksRUFBRSw4QkFBOEI7SUFDcEMsZ0JBQWdCLEVBQUUsSUFBSTtDQUN2QixDQUFDO0FBQ0YsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztBQUNuRSx1QkFBdUIsQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO0FBQ3BFLHVCQUF1QixDQUFDLHVCQUF1QixDQUFDO0lBQzlDLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDO0FBQzFELHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDO0FBQzlELHVCQUF1QixDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDckcsdUJBQXVCLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztBQUN4RSx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDekYsdUJBQXVCLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDO0FBQ2pGLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUMvRSx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDM0UsdUJBQXVCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDO0FBQzdFLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUNyRix1QkFBdUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFLcEYsd0NBQXdDO0FBQ3hDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDWixHQUFHLEVBQUU7UUFDSCxNQUFNLEVBQUUsYUFBYTtRQUNyQixRQUFRLEVBQUUsZUFBZTtRQUN6QixTQUFTLEVBQUUsZ0JBQWdCO1FBQzNCLG1CQUFtQixFQUFFLDBCQUEwQjtRQUMvQyxjQUFjLEVBQUUscUJBQXFCO1FBQ3JDLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFdBQVcsRUFBRSxrQkFBa0I7UUFDL0IsZ0JBQWdCLEVBQUUsdUJBQXVCO1FBQ3pDLHdCQUF3QixFQUFFLCtCQUErQjtRQUN6RCwyQkFBMkIsRUFBRSxrQ0FBa0M7UUFDL0QsdUJBQXVCLEVBQUUsOEJBQThCO1FBQ3ZELGNBQWMsRUFBRSxxQkFBcUI7UUFDckMsU0FBUyxFQUFFLGdCQUFnQjtRQUMzQixlQUFlLEVBQUUsc0JBQXNCO1FBQ3ZDLGtCQUFrQixFQUFFLHlCQUF5QjtRQUM3QyxzQkFBc0IsRUFBRSw2QkFBNkI7UUFDckQsdUJBQXVCLEVBQUUsa0NBQWtDO1FBQzNELGFBQWEsRUFBRSxvQkFBb0I7UUFDbkMsU0FBUyxFQUFFLGdCQUFnQjtRQUMzQixRQUFRLEVBQUUsZUFBZTtRQUN6QixNQUFNLEVBQUUsYUFBYTtRQUNyQixPQUFPLEVBQUUsY0FBYztRQUN2QixXQUFXLEVBQUUsc0JBQXNCO1FBQ25DLGNBQWMsRUFBRSxxQkFBcUI7S0FDdEM7SUFDRCxRQUFRLEVBQUUsdUJBQXVCO0NBQ2xDLENBQUMsQ0FBQztBQUVILGtDQUFrQztBQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBQSxHQUFHLEVBQUUsVUFBQSxRQUFRLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFVzZXIgQ29uZmlndXJhdGlvbi5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbi8qKiBNYXAgcmVsYXRpdmUgcGF0aHMgdG8gVVJMcy4gKi9cclxuY29uc3QgbWFwOiBhbnkgPSB7XHJcbiAgJ21haW4nOiAnbWFpbi5qcycsXHJcblxyXG4gICdAYW5ndWxhci9jb3JlJzogJ3ZlbmRvci9AYW5ndWxhci9jb3JlL2J1bmRsZXMvY29yZS51bWQuanMnLFxyXG4gICdAYW5ndWxhci9jb21tb24nOiAndmVuZG9yL0Bhbmd1bGFyL2NvbW1vbi9idW5kbGVzL2NvbW1vbi51bWQuanMnLFxyXG4gICdAYW5ndWxhci9jb21waWxlcic6ICd2ZW5kb3IvQGFuZ3VsYXIvY29tcGlsZXIvYnVuZGxlcy9jb21waWxlci51bWQuanMnLFxyXG4gICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJzogJ3ZlbmRvci9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2J1bmRsZXMvcGxhdGZvcm0tYnJvd3Nlci51bWQuanMnLFxyXG4gICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnOiAndmVuZG9yL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYy9idW5kbGVzL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYy51bWQuanMnLFxyXG4gICdAYW5ndWxhci9odHRwJzogJ3ZlbmRvci9AYW5ndWxhci9odHRwL2J1bmRsZXMvaHR0cC51bWQuanMnLFxyXG4gICdAYW5ndWxhci9yb3V0ZXInOiAndmVuZG9yL0Bhbmd1bGFyL3JvdXRlci9idW5kbGVzL3JvdXRlci51bWQuanMnLFxyXG4gICdAYW5ndWxhci9mb3Jtcyc6ICd2ZW5kb3IvQGFuZ3VsYXIvZm9ybXMvYnVuZGxlcy9mb3Jtcy51bWQuanMnLFxyXG5cclxuICAnQGFuZ3VsYXIvbWF0ZXJpYWwnOiAndmVuZG9yL0Bhbmd1bGFyL21hdGVyaWFsL2J1bmRsZXMvbWF0ZXJpYWwudW1kLmpzJ1xyXG5cclxufTtcclxuXHJcbi8qKiBVc2VyIHBhY2thZ2VzIGNvbmZpZ3VyYXRpb24uICovXHJcbmNvbnN0IHBhY2thZ2VzOiBhbnkgPSB7XHJcbn07XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIEV2ZXJ5dGhpbmcgdW5kZXJuZWF0aCB0aGlzIGxpbmUgaXMgbWFuYWdlZCBieSB0aGUgQ0xJLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuY29uc3QgYmFycmVsczogc3RyaW5nW10gPSBbXHJcbiAgLy8gQXBwIHNwZWNpZmljIGJhcnJlbHMuXHJcbiAgJ2FwcCcsXHJcbiAgJ2FwcC9zaGFyZWQnLFxyXG4gICdhcHAvK21haW4vK2hvbWUnLFxyXG4gICdhcHAvK21haW4vK2Jhc2ljJyxcclxuICAnYXBwLyttYWluLyttYXJrZXItbGF5ZXInLFxyXG4gICdhcHAvK21haW4vK2dlb2pzb24tbGF5ZXInLFxyXG4gICdhcHAvK21haW4vK3dtcy1sYXllcicsXHJcbiAgJ2FwcC8rbWFpbidcclxuICAvKiogQGNsaS1iYXJyZWwgKi9cclxuXTtcclxuXHJcbmNvbnN0IGNsaVN5c3RlbUNvbmZpZ1BhY2thZ2VzOiBhbnkgPSB7XHJcbn07XHJcblxyXG4vLyBhZGQgcGFja2FnZSBlbnRyaWVzIGZvciBhbmd1bGFyIHBhY2thZ2VzIGluIHRoZSBmb3JtICdAYW5ndWxhci9jb21tb24nOiB7IG1haW46ICdpbmRleC5qcycsIGRlZmF1bHRFeHRlbnNpb246ICdqcycgfVxyXG5iYXJyZWxzLmZvckVhY2goKGJhcnJlbE5hbWU6IHN0cmluZykgPT4ge1xyXG4gIGNsaVN5c3RlbUNvbmZpZ1BhY2thZ2VzW2JhcnJlbE5hbWVdID0geyBtYWluOiAnaW5kZXgnLCBkZWZhdWx0RXh0ZW5zaW9uOiAnanMnIH07XHJcbn0pO1xyXG5cclxuXHJcbmNsaVN5c3RlbUNvbmZpZ1BhY2thZ2VzWydyeGpzJ10gPSB7IGRlZmF1bHRFeHRlbnNpb246ICdqcycgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ21vbWVudCddID0geyBtYWluOiAnbW9tZW50JyB9O1xyXG5jbGlTeXN0ZW1Db25maWdQYWNrYWdlc1snanF1ZXJ5J10gPSB7IG1haW46ICdkaXN0L2pxdWVyeS5taW4nIH07XHJcbmNsaVN5c3RlbUNvbmZpZ1BhY2thZ2VzWydqcXVlcnktdWknXSA9IHsgbWFpbjogJ3VpL3dpZGdldHMvZGF0ZXBpY2tlcicgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ2RhdGF0YWJsZXMubmV0J10gPSB7IG1haW46ICdqcy9qcXVlcnkuZGF0YVRhYmxlcycgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ2RhdGF0YWJsZXMubmV0LWJ1dHRvbnMnXSA9IHsgbWFpbjogJ2pzL2RhdGFUYWJsZXMuYnV0dG9ucycgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ2RhdGF0YWJsZXMubmV0LWNvbHJlb3JkZXInXSA9IHsgbWFpbjogJ2pzL2RhdGFUYWJsZXMuY29sUmVvcmRlcicgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ2RhdGF0YWJsZXMubmV0LXNlbGVjdCddID0geyBtYWluOiAnanMvZGF0YVRhYmxlcy5zZWxlY3QnIH07XHJcbmNsaVN5c3RlbUNvbmZpZ1BhY2thZ2VzWydjb2xyZXNpemFibGUnXSA9IHsgbWFpbjogJ2NvbFJlc2l6YWJsZS0xLjYubWluJyB9O1xyXG5jbGlTeXN0ZW1Db25maWdQYWNrYWdlc1sncGRmbWFrZSddID0geyBtYWluOiAnYnVpbGQvcGRmbWFrZS5taW4nIH07XHJcbmNsaVN5c3RlbUNvbmZpZ1BhY2thZ2VzWyduZzItdHJhbnNsYXRlJ10gPSB7XHJcbiAgbWFpbjogJ2J1bmRsZXMvbmcyLXRyYW5zbGF0ZS51bWQuanMnLFxyXG4gIGRlZmF1bHRFeHRlbnNpb246ICdqcydcclxufTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ29udGltaXplLXdlYi1uZzInXSA9IHsgbWFpbjogJ29udGltaXplJyB9O1xyXG5jbGlTeXN0ZW1Db25maWdQYWNrYWdlc1snb250aW1pemUtd2ViLW5nMi1tYXAnXSA9IHsgbWFpbjogJ28tbWFwJyB9O1xyXG5jbGlTeXN0ZW1Db25maWdQYWNrYWdlc1snYW5ndWxhcjItaGlnaGxpZ2h0LWpzJ10gPVxyXG4gIHsgbWFpbjogJ2hpZ2hsaWdodC1qcy5tb2R1bGUnLCBkZWZhdWx0RXh0ZW5zaW9uOiAnanMnIH07XHJcbmNsaVN5c3RlbUNvbmZpZ1BhY2thZ2VzWydsZWFmbGV0J10gPSB7IG1haW46ICdkaXN0L2xlYWZsZXQnIH07XHJcbmNsaVN5c3RlbUNvbmZpZ1BhY2thZ2VzWydsZWFmbGV0LXByb3ZpZGVycyddID0geyBtYWluOiAnbGVhZmxldC1wcm92aWRlcnMnLCBkZWZhdWx0RXh0ZW5zaW9uOiAnanMnIH07XHJcbmNsaVN5c3RlbUNvbmZpZ1BhY2thZ2VzWydsZWFmbGV0LWRyYXcnXSA9IHsgbWFpbjogJ2Rpc3QvbGVhZmxldC5kcmF3JyB9O1xyXG5jbGlTeXN0ZW1Db25maWdQYWNrYWdlc1snbmcyLWRyYWd1bGEnXSA9IHsgbWFpbjogJ25nMi1kcmFndWxhJywgZGVmYXVsdEV4dGVuc2lvbjogJ2pzJyB9O1xyXG5jbGlTeXN0ZW1Db25maWdQYWNrYWdlc1snZHJhZ3VsYSddID0geyBtYWluOiAnZHJhZ3VsYScsIGRlZmF1bHRFeHRlbnNpb246ICdqcycgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ2NvbnRyYSddID0geyBtYWluOiAnY29udHJhJywgZGVmYXVsdEV4dGVuc2lvbjogJ2pzJyB9O1xyXG5jbGlTeXN0ZW1Db25maWdQYWNrYWdlc1snYXRvYSddID0geyBtYWluOiAnYXRvYScsIGRlZmF1bHRFeHRlbnNpb246ICdqcycgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ3RpY2t5J10gPSB7IG1haW46ICd0aWNreScsIGRlZmF1bHRFeHRlbnNpb246ICdqcycgfTtcclxuY2xpU3lzdGVtQ29uZmlnUGFja2FnZXNbJ2Nyb3NzdmVudCddID0geyBtYWluOiAnY3Jvc3N2ZW50JywgZGVmYXVsdEV4dGVuc2lvbjogJ2pzJyB9O1xyXG5jbGlTeXN0ZW1Db25maWdQYWNrYWdlc1snY3VzdG9tLWV2ZW50J10gPSB7IG1haW46ICdpbmRleCcsIGRlZmF1bHRFeHRlbnNpb246ICdqcycgfTtcclxuXHJcbi8qKiBUeXBlIGRlY2xhcmF0aW9uIGZvciBhbWJpZW50IFN5c3RlbS4gKi9cclxuZGVjbGFyZSB2YXIgU3lzdGVtOiBhbnk7XHJcblxyXG4vLyBBcHBseSB0aGUgQ0xJIFN5c3RlbUpTIGNvbmZpZ3VyYXRpb24uXHJcblN5c3RlbS5jb25maWcoe1xyXG4gIG1hcDoge1xyXG4gICAgJ3J4anMnOiAndmVuZG9yL3J4anMnLFxyXG4gICAgJ21vbWVudCc6ICd2ZW5kb3IvbW9tZW50JyxcclxuICAgICdsZWFmbGV0JzogJ3ZlbmRvci9sZWFmbGV0JyxcclxuICAgICdsZWFmbGV0LXByb3ZpZGVycyc6ICd2ZW5kb3IvbGVhZmxldC1wcm92aWRlcnMnLFxyXG4gICAgJ2xlYWZsZXQtZHJhdyc6ICd2ZW5kb3IvbGVhZmxldC1kcmF3JyxcclxuICAgICdqcXVlcnknOiAndmVuZG9yL2pxdWVyeScsXHJcbiAgICAnanF1ZXJ5LXVpJzogJ3ZlbmRvci9qcXVlcnktdWknLFxyXG4gICAgJ2RhdGF0YWJsZXMubmV0JzogJ3ZlbmRvci9kYXRhdGFibGVzLm5ldCcsXHJcbiAgICAnZGF0YXRhYmxlcy5uZXQtYnV0dG9ucyc6ICd2ZW5kb3IvZGF0YXRhYmxlcy5uZXQtYnV0dG9ucycsXHJcbiAgICAnZGF0YXRhYmxlcy5uZXQtY29scmVvcmRlcic6ICd2ZW5kb3IvZGF0YXRhYmxlcy5uZXQtY29scmVvcmRlcicsXHJcbiAgICAnZGF0YXRhYmxlcy5uZXQtc2VsZWN0JzogJ3ZlbmRvci9kYXRhdGFibGVzLm5ldC1zZWxlY3QnLFxyXG4gICAgJ2NvbHJlc2l6YWJsZSc6ICd2ZW5kb3IvY29scmVzaXphYmxlJyxcclxuICAgICdwZGZtYWtlJzogJ3ZlbmRvci9wZGZtYWtlJyxcclxuICAgICduZzItdHJhbnNsYXRlJzogJ3ZlbmRvci9uZzItdHJhbnNsYXRlJyxcclxuICAgICdvbnRpbWl6ZS13ZWItbmcyJzogJ3ZlbmRvci9vbnRpbWl6ZS13ZWItbmcyJyxcclxuICAgICdvbnRpbWl6ZS13ZWItbmcyLW1hcCc6ICd2ZW5kb3Ivb250aW1pemUtd2ViLW5nMi1tYXAnLFxyXG4gICAgJ2FuZ3VsYXIyLWhpZ2hsaWdodC1qcyc6ICd2ZW5kb3IvYW5ndWxhcjItaGlnaGxpZ2h0LWpzL2xpYicsXHJcbiAgICAnbmcyLWRyYWd1bGEnOiAndmVuZG9yL25nMi1kcmFndWxhJyxcclxuICAgICdkcmFndWxhJzogJ3ZlbmRvci9kcmFndWxhJyxcclxuICAgICdjb250cmEnOiAndmVuZG9yL2NvbnRyYScsXHJcbiAgICAnYXRvYSc6ICd2ZW5kb3IvYXRvYScsXHJcbiAgICAndGlja3knOiAndmVuZG9yL3RpY2t5JyxcclxuICAgICdjcm9zc3ZlbnQnOiAndmVuZG9yL2Nyb3NzdmVudC9zcmMnLFxyXG4gICAgJ2N1c3RvbS1ldmVudCc6ICd2ZW5kb3IvY3VzdG9tLWV2ZW50J1xyXG4gIH0sXHJcbiAgcGFja2FnZXM6IGNsaVN5c3RlbUNvbmZpZ1BhY2thZ2VzXHJcbn0pO1xyXG5cclxuLy8gQXBwbHkgdGhlIHVzZXIncyBjb25maWd1cmF0aW9uLlxyXG5TeXN0ZW0uY29uZmlnKHsgbWFwLCBwYWNrYWdlcyB9KTtcclxuIl19