import { Component, forwardRef, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { OMapComponent } from '../../components';
import { GeocodingService, TranslateMapService } from '../../services';
import { ONavigatorDefault } from './o-navigator.class';

const DEFAULT_INPUTS = [
  'showSidenavButton: show-sidenav-button',
  'showSearchInput: show-search-input'
];

@Component({
  moduleId: module.id,
  selector: 'o-navigator',
  templateUrl: './o-navigator.component.html',
  styleUrls: ['./o-navigator.component.scss'],
  inputs: DEFAULT_INPUTS
})
export class ONavigatorComponent extends ONavigatorDefault {

  public static DEFAULT_INPUTS = DEFAULT_INPUTS;

  public showSidenavButton: boolean = true;
  public showSearchInput: boolean = true;

  protected _rendered: boolean = false;
  protected oMapConfigurationSubscription: Subscription;

  constructor(
    @Inject(GeocodingService) geocoder: GeocodingService,
    @Inject(TranslateMapService) translateMapService: TranslateMapService,
    @Inject(forwardRef(() => OMapComponent)) oMap: OMapComponent
  ) {
    super(geocoder, translateMapService, oMap);
    this.oMapConfigurationSubscription = this.oMap.onMapConfigured().subscribe(() => {
      if (this.isSearchInputVisible) {
        this.oMap.getMapService().disableMouseEvent('place-input');
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.oMapConfigurationSubscription) {
      this.oMapConfigurationSubscription.unsubscribe();
    }
  }

  public getText(text: string): string {
    if (this.translateMapService) {
      return this.translateMapService.get(text);
    }
    return text;
  }

  /**
   * Update search results using the new value of address
   */
  get address(): string {
    return this.cachedAddress;
  }

  set address(address: string) {
    this.cachedAddress = address;
    this.rendered = this.search();
    // this.goto();
  }

  /**
	 * Toggle OMap sidebar state
	 */
  public toggleSidenav(e: MouseEvent) {
    this.oMap.toggleSidenav(e);
  }

  /**
	 * Hide search results when cursor goes out
	 */
  public onBlur() {
    this.rendered = false;
    setTimeout(() => {
      if (this.rendered === false) {
        this.closeSearch();
      }
    }, 350);
  }

  /**
	 * Load search results when cursor goes in
	 */
  public onFocus() {
    if (this.rendered === false) {
      this.rendered = this.search();
    }
  }

  get rendered(): boolean {
    return this._rendered;
  }

  set rendered(val: boolean) {
    this._rendered = val;
  }

  get isSearchInputVisible(): boolean {
    return this.showSearchInput;
  }

  set isSearchInputVisible(val: boolean) {
    this.showSearchInput = val;
  }

  get isSidenavButtonVisible(): boolean {
    return this.showSidenavButton;
  }

  set isSidenavButtonVisible(val: boolean) {
    this.showSidenavButton = val;
  }

}
