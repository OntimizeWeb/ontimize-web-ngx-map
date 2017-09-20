import { MdSidenav } from '@angular/material';
import { OMapWEvents } from './o-map-w-events.class';

export class OMapWSidenav extends OMapWEvents {
  sideNavCmp: MdSidenav;
  protected _isSidenavVisible: boolean = false;

	/**
	 * Changes Sidebar state
	 */
  toggleSidenav() {
    if (this.sideNavCmp) {
      if (this.isSidenavVisible) {
        this.sideNavCmp.close();
      } else {
        this.sideNavCmp.open();
      }
      setTimeout(() => this.getMapService().map.invalidateSize(true), 0);
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
