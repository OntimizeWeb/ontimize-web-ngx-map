import { MatSidenav } from '@angular/material';
import { OMapWEvents } from './o-map-w-events.class';

export class OMapWSidenav extends OMapWEvents {
  sideNavCmp: MatSidenav;
  protected _isSidenavVisible: boolean = false;

  /**
	 * Changes Sidebar state
	 */
  toggleSidenav(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (this.sideNavCmp) {
      if (this.isSidenavVisible) {
        this.sideNavCmp.close();
      } else {
        this.sideNavCmp.open();
      }
      setTimeout(() => {
        this.getMapService().map.invalidateSize(true);
        if (!this.sideNavCmp.opened) {
          var evt = window.document.createEvent('UIEvents');
          evt.initUIEvent('resize', true, false, window, 0);
          window.dispatchEvent(evt);
        }
      }, 0);
    }
    this.isSidenavVisible = !this.isSidenavVisible;
  }

  get isSidenavVisible(): boolean {
    return this._isSidenavVisible;
  }

  set isSidenavVisible(val: boolean) {
    this._isSidenavVisible = val;
  }
}
