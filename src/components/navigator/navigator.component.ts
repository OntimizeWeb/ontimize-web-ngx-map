import {
    Component,
    Inject,
    forwardRef
} from '@angular/core';
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

@Component({
    selector: 'navigator',
    moduleId: module.id,
    templateUrl: '/navigator/navigator.component.html',
    styleUrls: ['/navigator/navigator.component.css']
})
export class NavigatorComponent {
    address: string;

    private geocoder: GeocodingService;
    private map: Map;
    private mapService: MapService;

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
        this.mapService.disableMouseEvent('goto');
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

    toggleSidenav() {
        this.oMap.toggleSidenav();
    }
}
