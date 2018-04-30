import { Component, Inject, forwardRef, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { OMapComponent, OMapLayerComponent } from '../../components';
import { OSearcher, OSearchable } from '../../interfaces';

@Component({
  selector: 'o-map-workspace',
  inputs: [],
  outputs: [
    'onToggleWSLayerSelected',
    'onToggleWSLayerVisibility',
    'onToggleWSLayerInWS'
  ],
  templateUrl: './o-map-workspace.component.html',
  styleUrls: ['./o-map-workspace.component.scss']
})
export class OMapWorkspaceComponent implements OSearcher {

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
    @Inject(forwardRef(() => OMapComponent)) private map: OMapComponent
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
    let subject = new Subject<Array<OSearchable>>();
    setTimeout(() => subject.next(this.oSearchableCollection), 1);
    return subject.asObservable();
  }

  public updateMapLayer(l: OMapLayerComponent) {
    let p: number = this.wsMapLayers.indexOf(l);
    let inML = p > -1;
    let inWS = l.inWS === true;

    if (inWS && !inML) {
      this.wsMapLayers.push(l);
      this.updateMapLayersPosition();
    } else if (!inWS && inML) {
      this.wsMapLayers.splice(p, 1);
    }
  }

  public updateMapLayers() {
    this.map.getOMapLayers().forEach(l => this.updateMapLayer(l));
    return this.wsMapLayers;
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
    var zMax = this.wsMapLayers.length;
    this.wsMapLayers.forEach((l, i) => {
      l.setZIndex(zMax - i + 2);
    });
  }
}
