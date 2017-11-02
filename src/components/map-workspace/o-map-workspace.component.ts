import { Component, Inject, forwardRef, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { OMapComponent, OMapLayerComponent } from '../../components';
import { OSearcher, OSearchable } from '../../interfaces';

@Component({
  selector: 'o-map-workspace',
  providers: [{ provide: 'DragulaService', useClass: DragulaService }],
  inputs: [],
  outputs: [
    'onToggleWSLayerSelected',
    'onToggleWSLayerVisibility',
    'onToggleWSLayerInWS'
  ],
  templateUrl: './o-map-workspace.component.html',
  styleUrls: ['./o-map-workspace.component.scss']
})
export class OMapWorkspaceComponent implements OnInit, OnDestroy, OSearcher {

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
    @Inject(forwardRef(() => OMapComponent)) private map: OMapComponent,
    private dragulaService: DragulaService
  ) {
    dragulaService.over.subscribe(value => this.onOver(value.slice(1)));
    dragulaService.out.subscribe(value => this.onOut(value.slice(1)));
  }

  ngOnInit() {
    if (this.dragulaService.find('layer-bag')) {
      this.dragulaService.destroy('layer-bag');
    }
    const self = this;
    this.dragulaService.setOptions('layer-bag', {
      moves: function (el, container, handle) {
        let iconClicked = handle.tagName === 'MD-ICON' && self.parentHasDragHandle(handle);
        let buttonClicked = handle.tagName === 'BUTTON' && self.parentHasDragHandle(handle);
        return iconClicked || buttonClicked;
      }
    });
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

  ngOnDestroy() {
    if (this.dragulaService.find('layer-bag')) {
      this.dragulaService.destroy('layer-bag');
    }
  }

	/**
	 * OSearcher implementation
	 */
  search(oSearchValue: string): Observable<Array<OSearchable>> {
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

  private updateMapLayersPosition() {
    var zMax = this.wsMapLayers.length;
    this.wsMapLayers.forEach((l, i) => {
      l.setZIndex(zMax - i + 2);
    });
  }

  private onOver(args) {
    // let [e, el, container] = args;
    let e = args[0];
    e.classList.add('layer-on-movement');
  }

  private onOut(args) {
    let e = args[0];
    // let [e, el, container] = args;
    e.classList.remove('layer-on-movement');
    this.updateMapLayersPosition();
  }
}