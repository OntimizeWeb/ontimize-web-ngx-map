import { Observable, Subject } from 'rxjs';

import { OMapWBaseLayer } from './o-map-w-baselayer.class';
import { OSearcher } from '../../interfaces/search/searcher.interface';
import { SearcherDefault } from '../../models/Searcher.class';
import { OSearchable } from '../../interfaces/search/searchable.interface';

export class OMapWSearch extends OMapWBaseLayer implements OSearcher {
  /**
   * OSearcher implementation
   */
  oSearchTitle: string = '';
  oSearchableCollection = null;
  get oSearcherCollection(): Array<OSearcher> {
    return this.mapSearchers;
  }

  protected _searchControl: boolean = true;
  get searchControl(): boolean {
    return this._searchControl;
  }

  set searchControl(val: boolean) {
    this._searchControl = val;
  }

  public mapSearchers: Array<OSearcher> = [
    new SearcherDefault('Capas Base', () => this.mapBaseLayerGroup),
    new SearcherDefault('Capas', () => this.mapLayers)
  ];

  /**
   * OSearcher implementation
   */
  search(oSearchValue: string): Observable<Array<OSearchable>> {
    const subject = new Subject<Array<OSearchable>>();
    this.oSearcherCollection.forEach(s => s.search(oSearchValue).subscribe(r => {
      if (r.length > 0) {
        subject.next(r);
      }
    }));
    return subject.asObservable();
  }

}
