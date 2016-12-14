import { Observable } from 'rxjs/Observable';
import { OSearchable } from './searchable.interface';

export interface OSearcher {
    /**
     * Title to display in the search results
     */
    oSearchTitle: string;

    /**
     * Collection to make the search over it
     */
    oSearchableCollection: Array<OSearchable>;

    /**
     * Collection of another searchers to search
     */
    oSearcherCollection: Array<OSearcher>;

    /**
     * Method to do the search
     * @param searchValue - Value to match 
     */
    search(oSearchValue: string): Observable<Array<OSearchable>>;

}
