import { Component, Inject, forwardRef, EventEmitter } from '@angular/core';
import { OMapLayerComponent, OMapWorkspaceComponent } from '../../components';
import { OSearchable, OSearchResult } from '../../interfaces';

@Component({
  selector: 'o-map-workspace-layer',
  providers: [],
  inputs: [
    'selected : layer-selected',
    'visible : layer-visible',
    'inWS : layer-in-ws',
    'menuLabel : layer-menu-label',
    'menuLabelSecondary : layer-menu-label-secondary',
    'refLayer : layer-ref'
  ],
  outputs: [
    'onToggleSelected',
    'onToggleVisibility',
    'onToggleInWS'
  ],
  templateUrl: './o-map-workspace-layer.component.html',
  styleUrls: ['./o-map-workspace-layer.component.scss']
})
export class OMapWorkspaceLayerComponent implements OSearchable {
  protected _selected: boolean = false;
  protected _visible: boolean = false;
  protected _inWS: boolean = false;
  protected _menuLabel: string;
  protected _menuLabelSecondary: string;
  refLayer: OMapLayerComponent;

  public oSearchKeys: Array<string> = ['menuLabel', 'menuLabelSecondary'];
  onToggleSelected: EventEmitter<Object> = new EventEmitter<Object>();
  onToggleVisibility: EventEmitter<Object> = new EventEmitter<Object>();
  onToggleInWS: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(
    @Inject(forwardRef(() => OMapWorkspaceComponent)) private refWorkspace: OMapWorkspaceComponent
  ) { }

  get oSearchResult(): OSearchResult {
    return {
      label: this.menuLabel,
      sublabel: this.menuLabelSecondary,
      icon: 'layer',
      buttons: []
    };
  }

  public toggleSelected(status?: boolean) {
    let select = (status !== undefined && !!status) || (!!this.visible && !!this.inWS);
    let unselect = (status !== undefined && !status) || !this.selected;
    if (select) {
      this.refWorkspace.oSearchableCollection.forEach(l => l.setSelected(false));
      this.selected = this.refLayer.toggleSelected();
    } else if (unselect) {
      this.selected = this.refLayer.setSelected(false);
    }
    this.onToggleSelected.emit(this);
  }

  public toggleVisible(status?: boolean, evt?: Event, avoidEvent?: boolean) {
    if (evt) {
      evt.stopPropagation();
    }
    this.visible = this.refLayer.toggleVisible(status);
    if (!this.visible && !!this.selected) {
      this.toggleSelected(false);
    }
    if (!avoidEvent) {
      this.onToggleVisibility.emit(this);
    }
  }

  public toggleInWS(status?: boolean) {
    this.inWS = this.refLayer.toggleInWS(status);
    if (!this.inWS && !!this.visible) {
      this.toggleVisible(false, undefined, true);
    }
    this.onToggleInWS.emit(this);
  }

  get selected(): boolean {
    return this._selected;
  }

  set selected(val: boolean) {
    this._selected = val;
  }

  get visible(): boolean {
    return this._visible;
  }

  set visible(val: boolean) {
    this._visible = val;
  }

  get inWS(): boolean {
    return this._inWS;
  }

  set inWS(val: boolean) {
    this._inWS = val;
  }

  get menuLabel(): string {
    return this._menuLabel;
  }

  set menuLabel(val: string) {
    this._menuLabel = val;
  }

  get menuLabelSecondary(): string {
    return this._menuLabelSecondary;
  }

  set menuLabelSecondary(val: string) {
    this._menuLabelSecondary = val;
  }
}