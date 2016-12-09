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

    private actionButtons: Array<OSearchResultAction> = new Array<OSearchResultAction>();

    get actions() {
        if (this.actionButtons.length !== this.searchResult.buttons.length) {
            this.actionButtons = this.searchResult.buttons;
        }
        return this.actionButtons;
    }

    trueStatusIcon(button: OSearchResultAction): string {
        // The first string in the array
        return (!button.icon || !button.icon.length)? '' : button.icon.slice(0, 1)[0];
    }
    falseStatusIcon(button: OSearchResultAction): string {
        // The last string in the array
        return (!button.icon || !button.icon.length)? '' : button.icon.slice(-1, button.icon.length)[0];
    }
}
