import { EventEmitter } from '@angular/core';

export interface OMapEvents {
  onClick: EventEmitter<any>;
  onDrag: EventEmitter<any>;
  onMove: EventEmitter<any>;
  onMoveEnd: EventEmitter<any>;
  onZoomLevelsChange: EventEmitter<any>;

  onDrawEvent: EventEmitter<any>;

  onDrawCreated: EventEmitter<any>;
  onDrawEdited: EventEmitter<any>;
  onDrawDeleted: EventEmitter<any>;
  onDrawDrawStart: EventEmitter<any>;
  onDrawDrawstop: EventEmitter<any>;
  onDrawvertex: EventEmitter<any>;
  onDrawEditStart: EventEmitter<any>;
  onDrawEditMove: EventEmitter<any>;
  onDrawEditResize: EventEmitter<any>;
  onDrawEditvertex: EventEmitter<any>;
  onDrawEditStop: EventEmitter<any>;
  onDrawDeleteStart: EventEmitter<any>;
  onDrawDeleteStop: EventEmitter<any>;
}
