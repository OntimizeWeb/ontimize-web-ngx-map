import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OCustomMaterialModule } from 'ontimize-web-ngx';
import { DndModule } from '@churchs19/ng2-dnd';

import { OMAP_DIRECTIVES } from './src/components';
import { OMAP_PROVIDERS } from './src/services';

export * from './src/interfaces';
export * from './src/services';
export * from './src/core';
export * from './src/components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OCustomMaterialModule,
    FlexLayoutModule,
    DndModule
  ],
  declarations: OMAP_DIRECTIVES,
  exports: OMAP_DIRECTIVES,
  providers: OMAP_PROVIDERS,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OMapModule { }
