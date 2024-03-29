import { MatSidenav } from '@angular/material/sidenav';

import { OMapWEvents } from './o-map-w-events.class';

export class OMapWSidenav extends OMapWEvents {

  public sideNavCmp: MatSidenav;
  protected _isSidenavVisible: boolean = false;

  /**
   * Changes Sidebar state
   */
  public toggleSidenav(e?: MouseEvent): void {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (this.sideNavCmp) {
      if (this.isSidenavVisible) {
        this.sideNavCmp.close();
      } else {
        this.sideNavCmp.open();
      }
      setTimeout(() => {
        this.getMapService().map.invalidateSize(true);
        if (!this.sideNavCmp.opened) {
          const evt = new UIEvent('resize');
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
