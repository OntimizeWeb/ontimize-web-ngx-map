import { Component } from '@angular/core';
import { OSearchResult, OSearchResultAction } from '../../interfaces';

@Component({
  selector: 'o-navigator-item',
  inputs: [
    'searchResult : search-result'
  ],
  templateUrl: './o-navigator-item.component.html',
  styleUrls: ['./o-navigator-item.component.scss']
})
export class ONavigatorItemComponent {
  protected _searchResult: OSearchResult;

  private actionButtons: Array<OSearchResultAction> = new Array<OSearchResultAction>();

	/**
	 * Updates or return the list of buttons in this search result
	 * @return {Array<OSearchResultAction>} Current list of buttons
	 */
  get actions(): Array<OSearchResultAction> {
    if (this.actionButtons.length !== this.searchResult.buttons.length) {
      this.actionButtons = this.searchResult.buttons;
    }
    return this.actionButtons;
  }

	/**
	 * Extracts the true status icon, if any
	 * @param {OSearchResultAction} button - The button to extract the icon from
	 * @return {string} The first string in the array
	 */
  trueStatusIcon(button: OSearchResultAction): string {
    return (!button.icon || !button.icon.length) ? '' : button.icon.slice(0, 1)[0];
  }
	/**
	 * Extracts the false status icon, if any
	 * @param {OSearchResultAction} button - The button to extract the icon from
	 * @return {string} The last string in the array
	 */
  falseStatusIcon(button: OSearchResultAction): string {
    return (!button.icon || !button.icon.length) ? '' : button.icon.slice(-1, button.icon.length)[0];
  }

  getIcon(button: OSearchResultAction): string {
    return button.status() ? this.trueStatusIcon(button) : this.falseStatusIcon(button);
  }

  get searchResult(): OSearchResult {
    return this._searchResult;
  }

  set searchResult(val: OSearchResult) {
    this._searchResult = val;
  }
}
