import {
    MdSidenav
} from '@angular/material';
import {
    OMapWEvents
} from './o-map-w-events.class';

export class OMapWSidenav extends OMapWEvents {
    sideNavCmp: MdSidenav;

    private isSidenavVisible: boolean = false;

    toggleSidenav() {
        if (this.sideNavCmp) {
            if (this.isSidenavVisible) {
                setTimeout(() => {
                    this.sideNavCmp.close();
                    this.getMapService().map.invalidateSize(true);
                }, 0);
            } else {
                setTimeout(() => {
                    this.sideNavCmp.open();
                    this.getMapService().map.invalidateSize(true);
                }, 0);
            }
        }
        this.isSidenavVisible = !this.isSidenavVisible;
    }

}
