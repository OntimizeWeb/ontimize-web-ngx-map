import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { OCustomMaterialModule } from 'ontimize-web-ngx';

import { OMAP_DIRECTIVES } from '../components';
import { OMAP_PROVIDERS } from '../services';

// import { DndModule } from '@churchs19/ng2-dnd';
export * from '../interfaces';
export * from '../services';
export * from '../models';
export * from '../components';
export * from '../types';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OCustomMaterialModule,
    FlexLayoutModule,
    // DndModule
  ],
  declarations: OMAP_DIRECTIVES,
  exports: OMAP_DIRECTIVES,
  providers: OMAP_PROVIDERS,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OMapModule { }

