import { Component, Inject, forwardRef } from '@angular/core';
import { OMapComponent } from '../../components';
import { GeocodingService } from '../../services';
import { ONavigatorDefault } from './o-navigator.class';

@Component({
	selector: 'o-navigator',
	moduleId: module.id,
	templateUrl: '/navigator/o-navigator.component.html',
	styleUrls: ['/navigator/o-navigator.component.css']
})
export class ONavigatorComponent extends ONavigatorDefault {
	private rendered: boolean = false;

	constructor(
		@Inject(GeocodingService) geocoder: GeocodingService,
		@Inject(forwardRef(() => OMapComponent)) oMap: OMapComponent
	) {
		super(geocoder, oMap);
	}

	ngOnInit() {
		//this.oMap.getMapService().disableMouseEvent('goto');
		this.oMap.getMapService().disableMouseEvent('place-input');
	}

	/**
	 * Update search results using the new value of address
	 */
	get address(): string {
		return this.cachedAddress;
	};
	set address(address: string) {
		this.cachedAddress = address;
		this.rendered = this.search();
		//this.goto();
	};

	/**
	 * Toggle OMap sidebar state
	 */
	private toggleSidenav() {
		this.oMap.toggleSidenav();
	}

	/**
	 * Hide search results when cursor goes out
	 */
	private onBlur() {
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
	private onFocus() {
		if (this.rendered === false) {
			this.rendered = this.search();
		}
	}
}
