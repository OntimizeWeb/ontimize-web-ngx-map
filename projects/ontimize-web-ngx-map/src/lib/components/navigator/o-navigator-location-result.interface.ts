import { OSearchable } from '../../interfaces/search/searchable.interface';

export interface LocationResult extends OSearchable {
  searchTerm: string;
  resultAddress: string;
}
