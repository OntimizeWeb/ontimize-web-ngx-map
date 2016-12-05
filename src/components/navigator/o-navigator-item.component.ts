import {
    Component
} from '@angular/core';
import {
    OSearchResult,
    OSearchResultAction
} from '../../interfaces';

@Component({
    moduleId: module.id,
    selector: 'o-navigator-item',
    inputs: [
        'searchResult : search-result'
    ],
    templateUrl: '/navigator/o-navigator-item.component.html',
    styleUrls: ['/navigator/o-navigator-item.component.css']
})
export class ONavigatorItemComponent {
    searchResult: OSearchResult;

    callback() {
        console.log('yey');
        // console.log(button);
        // button.callback();
    }
}
