import { OSearchable } from '../../interfaces';

export interface LocationResult extends OSearchable {
	searchTerm: string;
	resultAddress: string;
}
