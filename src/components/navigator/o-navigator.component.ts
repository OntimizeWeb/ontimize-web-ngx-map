import {
    Component,
    Inject,
    forwardRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {
    Map
} from 'leaflet';
import {
    OMapComponent
} from '../../components';
import {
    MapService,
    GeocodingService
} from '../../services';
import {
    OSearchable
} from '../../interfaces';
import {
    Util
} from '../../utils';

@Component({
    selector: 'o-navigator',
    moduleId: module.id,
    templateUrl: '/navigator/o-navigator.component.html',
    styleUrls: ['/navigator/o-navigator.component.css']
})
export class ONavigatorComponent {
    address: string;

    private geocoder: GeocodingService;
    private map: Map;
    private mapService: MapService;

    private searchObserver: Subscription;
    private searchResults: Array<OSearchable> = new Array<OSearchable>();

    private rendered: boolean = false;

    constructor(
        @Inject(MapService) mapService: MapService,
        @Inject(GeocodingService) geocoder: GeocodingService,
        @Inject(forwardRef(() => OMapComponent)) protected oMap: OMapComponent,
    ) {
        this.address = '';
        this.geocoder = geocoder;
        this.mapService = mapService;
    }

    ngOnInit() {
        //this.mapService.disableMouseEvent('goto');
        this.mapService.disableMouseEvent('place-input');
        this.map = this.mapService.map;
    }

    goto() {
        if (!this.address) { return; }

        this.geocoder.geocode(this.address)
            .subscribe(location => {
                this.map.panTo([location.latitude, location.longitude]);
                this.address = location.address;
            }, error => console.error(error));
    }

    search() {
        // Interrupt last search result
        this.closeSearch();

        // Check if empty
        if (Util.isBlank(this.address)) {
            return;
        }

        // Add default result
        this.searchResults = [{
            oSearchKeys: [],
            oSearchResult: {
                label: this.address,
                icon: 'location_on',
                buttons: [{
                    icon: ['directions'],
                    status: () => true,
                    callback: () => (this.goto(), true)
                }]
            }
        }];
        this.rendered = true;

        // Search
        this.searchObserver = this.oMap.search(this.address).subscribe(a => this.searchResults = this.searchResults.concat(a));
    }

    toggleSidenav() {
        this.oMap.toggleSidenav();
    }

    closeSearch() {
        // Interrupt last search result
        this.searchResults.splice(0, this.searchResults.length);
        if (!!this.searchObserver) {
            this.searchObserver.unsubscribe();
            this.searchObserver.closed = true;
        }
    }

    private onBlur() {
        this.rendered = false;
        setTimeout(() => {
            if (this.rendered === false) {
                this.closeSearch();
            }
        }, 350);
    }

    private onFocus() {
        if (this.rendered === false) {
            this.search();
        }
    }
}
