// Configuration for the search results
export interface OSearchResultAction {
    icon: Array<string>;
    status: () => boolean;
    callback: () => boolean;
}

export interface OSearchResult {
    label: string;
    sublabel?: string;
    icon?: string;
    buttons: Array<OSearchResultAction>;
}

// Object avaliable for search
export interface OSearchable {

    // Keys to scan on search
    oSearchKeys: Array<string>;

    // Configuration
    oSearchResult: OSearchResult;
}
