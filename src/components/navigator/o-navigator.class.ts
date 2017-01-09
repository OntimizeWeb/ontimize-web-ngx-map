import { Subscription } from 'rxjs/Subscription';
import { OSearcher, OSearchable } from '../../interfaces';
import { OMapComponent } from '../../components';
import { GeocodingService, TranslateMapService } from '../../services';
import { SearcherDefault, Location } from '../../core';
import { Util } from '../../utils';
import { LocationResult } from './o-navigator-location-result.interface';

export class ONavigatorDefault {
	public searchResults: Array<OSearchable> = new Array<OSearchable>();
	protected cachedAddress: string = '';
	private searchObserver: Subscription;
	private locationSearcher: OSearcher = new SearcherDefault('Lugares', () => this.locationResults);
	private locationResults: Array<LocationResult> = new Array<LocationResult>();

	constructor(
		protected geocoder: GeocodingService,
		protected translateMapService: TranslateMapService,
		protected oMap: OMapComponent
	) {
		// Register location searcher on OMap as first searcher
		oMap.mapSearchers.splice(0, 0, this.locationSearcher);
	}

	get address(): string {
		return this.cachedAddress;
	};
	set address(address: string) {
		this.cachedAddress = address;
	};

	goto() {
		if (!this.address) return;

		this.geocoder.geocode(this.address).subscribe((locations: Array<Location>) => {
			locations.forEach(l => {
				let callback = () => {
					this.oMap.getMapService().map.panTo([l.latitude, l.longitude]);
					this.address = l.address;
					return true;
				};
				this.locationResults.push({
					searchTerm: this.address,
					resultAddress: l.address,
					oSearchKeys: ['searchTerm', 'resultAddress'],
					oSearchResult: {
						label: l.address,
						icon: 'location_on',
						buttons: [{
							icon: ['directions'],
							status: () => true,
							callback: callback
						}]
					}
				});
			});
			this.address = this.address;
		}, error => console.error(error));
	}

	search(): boolean {
		// Interrupt last search result
		this.closeSearch();

		// Check if empty
		if (Util.isBlank(this.address)) return false;

		// Add default result
		this.searchResults = [{
			oSearchKeys: [],
			oSearchResult: {
				label: this.address,
				icon: 'location_on',
				buttons: [{
					icon: ['search'],
					status: () => true,
					callback: () => (this.goto(), true)
				}]
			}
		}];

		// Search
		this.searchObserver = this.oMap.search(this.address).subscribe(a => {
			this.searchResults = this.searchResults.concat(a);
		});

		return true;
	}

	closeSearch() {
		// Interrupt last search result
		this.searchResults.splice(0, this.searchResults.length);
		if (!!this.searchObserver) {
			this.searchObserver.unsubscribe();
			this.searchObserver.closed = true;
		}
	}

}
