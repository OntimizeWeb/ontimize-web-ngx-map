import { EventEmitter } from '@angular/core';

export interface OMapEvents {
	onClick: EventEmitter<any>;
	onDrag: EventEmitter<any>;
	onMove: EventEmitter<any>;
	onMoveEnd: EventEmitter<any>;
	onZoomLevelsChange: EventEmitter<any>;
}
