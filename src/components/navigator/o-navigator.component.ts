import { Component, Inject, forwardRef } from '@angular/core';
import { OMapComponent } from '../../components';
import { GeocodingService, TranslateMapService } from '../../services';
import { ONavigatorDefault } from './o-navigator.class';

@Component({
  selector: 'o-navigator',
  templateUrl: './o-navigator.component.html',
  styleUrls: ['./o-navigator.component.scss']
})
export class ONavigatorComponent extends ONavigatorDefault {
  protected _rendered: boolean = false;

  constructor(
    @Inject(GeocodingService) geocoder: GeocodingService,
    @Inject(TranslateMapService) translateMapService: TranslateMapService,
    @Inject(forwardRef(() => OMapComponent)) oMap: OMapComponent
  ) {
    super(geocoder, translateMapService, oMap);
  }

  ngOnInit() {
    //this.oMap.getMapService().disableMouseEvent('goto');
    this.oMap.getMapService().disableMouseEvent('place-input');
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
    //this.goto();
  }

	/**
	 * Toggle OMap sidebar state
	 */
  public toggleSidenav() {
    this.oMap.toggleSidenav();
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
}
