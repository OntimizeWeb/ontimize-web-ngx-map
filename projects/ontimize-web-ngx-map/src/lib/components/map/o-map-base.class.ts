import { EventEmitter, Injector } from "@angular/core";
import type { OMapCrsComponent } from "../map-crs/o-map-crs.component";
import { Observable, Subject } from "rxjs";
import * as L from 'leaflet';
import type { OMapLayerComponent } from "../map-layer/o-map-layer.component";
import { OSearcher } from "../../interfaces/search/searcher.interface";
import { OSearchable } from "../../interfaces/search/searchable.interface";
import type { OMapWorkspace } from "../../interfaces/o-map-workspace.interface";
export abstract class OMapBase {


  abstract setCenter(center: string): void;

  abstract onMapAfterViewInit(): EventEmitter<any>;

  abstract onMapReady(): Subject<any>;

  abstract onMapConfigured(): EventEmitter<boolean>;

  abstract onWSLayerSelected(event): void;

  abstract onWSLayerVisibilityToggled(event): void;

  abstract onWSLayerInWSToggled(event): void;

  abstract getText(text: string): string;

  abstract configureDefaultDrawControl(map): void;

  abstract configureMap(): void;

  abstract getMapService(): any;

  abstract getCenter(): any;

  abstract initialize(): void;

  abstract registerTabGroupListener(): void;

  abstract registerCRSComponent(crsComp: OMapCrsComponent): void;

  abstract setContextmenu(val: any): void;

  abstract searchControl(val: boolean): void;

  abstract getInjector(): Injector;

  abstract isSearchControlButtonVisible(val: boolean): void;
  abstract unselectBaseLayers();
  abstract getLMap(): L.Map;
  abstract getOMapLayers(): Array<OMapLayerComponent>;
  abstract toggleSidenav(e?: MouseEvent): void;
  abstract mapSearchers: Array<OSearcher>;
  abstract search(oSearchValue: string): Observable<Array<OSearchable>>;
  abstract addOMapLayer(layer: OMapLayerComponent);
  abstract mapWorkspace: OMapWorkspace;
  abstract queryFeaturesInBounds: boolean;

}