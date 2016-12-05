import { Observable } from 'rxjs/Observable';
import { OSearchable } from './searchable.interface';

export interface OSearcher {

    /**
     * Collection to make the search over it
     */
    getSearchableCollection(): Array<OSearchable>;

    /**
     * Collection of another searchers to search
     */
    getSearcherCollection(): Array<OSearcher>;

    /**
     * Method to do the search
     * @param searchValue - Value to match 
     */
    search(oSearchValue: string): Observable<Array<OSearchable>>;

}
