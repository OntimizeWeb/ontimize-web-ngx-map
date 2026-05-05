import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, forwardRef, Inject, ViewEncapsulation } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { OMapWorkspace } from '../../interfaces/o-map-workspace.interface';
import { OSearchable } from '../../interfaces/search/searchable.interface';
import { OSearcher } from '../../interfaces/search/searcher.interface';
import { OMapLayerComponent } from '../map-layer/o-map-layer.component';
import { OMapBase } from '../map/o-map-base.class';
import { OMapWorkspaceBase } from './o-map-workspace-base.class';

@Component({
  selector: 'o-map-workspace',
  inputs: [],
  outputs: [
    'onToggleWSLayerSelected',
    'onToggleWSLayerVisibility',
    'onToggleWSLayerInWS'
  ],
  templateUrl: './o-map-workspace.component.html',
  styleUrls: ['./o-map-workspace.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.o-map-workspace]': 'true'
  },
  providers: [
    { provide: OMapWorkspaceBase, useExisting: forwardRef(() => OMapWorkspaceComponent) }
  ]
})
export class OMapWorkspaceComponent implements OSearcher, OMapWorkspace {

  protected wsMapLayers: Array<OMapLayerComponent> = new Array<OMapLayerComponent>();

  /**
   * OSearcher implementation
   */
  oSearchTitle: string = 'Capas del Espacio de Trabajo';
  get oSearchableCollection(): Array<OMapLayerComponent> {
    return this.wsMapLayers;
  }
  oSearcherCollection = null;

  onToggleWSLayerSelected: EventEmitter<Object> = new EventEmitter<Object>();
  onToggleWSLayerVisibility: EventEmitter<Object> = new EventEmitter<Object>();
  onToggleWSLayerInWS: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(
    @Inject(forwardRef(() => OMapBase)) private map: OMapBase
  ) {
  }

  private parentHasDragHandle(element: any): boolean {
    let result = false;
    let parent = element.parentNode;
    let i = 0;
    while (i <= 2) {
      i++;
      result = parent && parent.classList.contains('drag-handle');
      if (result) {
        break;
      }
      parent = parent.parentNode;
    }
    return result;
  }

  /**
   * OSearcher implementation
   */
  search(_oSearchValue: string): Observable<Array<OSearchable>> {
    const subject = new Subject<Array<OSearchable>>();
    setTimeout(() => subject.next(this.oSearchableCollection), 1);
    return subject.asObservable();
  }

  public updateMapLayer(l: OMapLayerComponent) {
    const p: number = this.wsMapLayers.indexOf(l);
    const inML = p > -1;
    const inWS = l.inWS === true;

    if (inWS && !inML) {
      this.wsMapLayers.push(l);
      this.updateMapLayersPosition();
    } else if (!inWS && inML) {
      this.wsMapLayers.splice(p, 1);
    }
  }

  onListitemDragDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.oSearchableCollection, event.previousIndex, event.currentIndex);
    this.updateMapLayersPosition();
  }

  public updateMapLayers() {
    this.map.getOMapLayers().forEach(l => this.updateMapLayer(l));
  }

  public getSelectedMapLayer(): OMapLayerComponent {
    return this.wsMapLayers.filter(l => l.selected === true)[0];
  }

  public getMapLayers(): Array<OMapLayerComponent> {
    return this.wsMapLayers;
  }

  public onWSLayerSelected(event) {
    this.onToggleWSLayerSelected.emit(event);
  }

  public onWSLayerVisibilityToggled(event) {
    this.onToggleWSLayerVisibility.emit(event);
  }

  public onWSLayerInWSToggled(event) {
    this.onToggleWSLayerInWS.emit(event);
  }

  updateMapLayersPosition() {
    const zMax = this.wsMapLayers.length;
    this.wsMapLayers.forEach((l, i) => {
      l.setZIndex(zMax - i + 2);
    });
  }
}
