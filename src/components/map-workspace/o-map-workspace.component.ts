import {
  Component,
  Inject,
  forwardRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
  DragulaService
} from 'ng2-dragula/ng2-dragula';
import {
  OMapComponent,
  OMapLayerComponent,
  OMapLayerGroupComponent
} from '../../components';
import {
  OSearcher,
  OSearchable
} from '../../interfaces';


@Component({
  selector: 'o-map-workspace',
  moduleId: module.id,
  providers: [],
  inputs: [],
  templateUrl: '/map-workspace/o-map-workspace.component.html',
  styleUrls: ['/map-workspace/o-map-workspace.component.css']
})
export class OMapWorkspaceComponent implements OnInit, OnDestroy, OSearcher {
  public wsMapLayers: Array<OMapLayerComponent> = new Array<OMapLayerComponent>();

  public oSearchTitle: string = 'Capas del Espacio de Trabajo';

  constructor(
    @Inject(forwardRef(() => OMapComponent)) private map: OMapComponent,
    private dragulaService: DragulaService) {
    dragulaService.over.subscribe(value => this.onOver(value.slice(1)));
    dragulaService.out.subscribe(value => this.onOut(value.slice(1)));
  }

  ngOnInit() {
    if (this.dragulaService.find('layer-bag')) {
      this.dragulaService.destroy('layer-bag');
    }
    this.dragulaService.setOptions('layer-bag', {
      moves: function (el, container, handle) {
        let iconClicked = handle.tagName === 'MD-ICON' && handle.parentNode.parentNode.classList.contains('drag-handle');
        let buttonClicked = handle.tagName === 'BUTTON' && handle.parentNode.classList.contains('drag-handle');
        return iconClicked || buttonClicked;
      }
    });
  }

  ngOnDestroy() {
    this.dragulaService.destroy('layer-bag');
  }

  getSearchableCollection(): Array<OMapLayerComponent> {
    return this.wsMapLayers;
  }

  getSearcherCollection(): Array<OSearcher> {
    return [];
  }

  search(oSearchValue: string): Observable<Array<OSearchable>> {
    let subject = new Subject<Array<OSearchable>>();
    setTimeout(() => subject.next(this.getSearchableCollection()), 1);
    this.getSearcherCollection().forEach(s => s.search(oSearchValue).subscribe(r => r.length > 0 && subject.next(r)));
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

  private updateMapLayersPosition() {
    var zMax = this.wsMapLayers.length;
    this.wsMapLayers.forEach((l, i) => {
      l.setZIndex(zMax - i + 2);
    });
  }

  private onOver(args) {
    let [e, el, container] = args;
    e.classList.add('layer-on-movement');
  }

  private onOut(args) {
    let [e, el, container] = args;
    e.classList.remove('layer-on-movement');
    this.updateMapLayersPosition();
  }

}
