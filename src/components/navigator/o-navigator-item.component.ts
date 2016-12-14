import { Component } from '@angular/core';
import { OSearchResult, OSearchResultAction } from '../../interfaces';

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
}
