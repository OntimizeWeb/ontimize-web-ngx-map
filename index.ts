import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { DndModule } from '@churchs19/ng2-dnd';
import { OCustomMaterialModule } from 'ontimize-web-ngx';

import { OMAP_DIRECTIVES } from './src/components';
import { OMAP_PROVIDERS } from './src/services';

export * from './src/interfaces';
export * from './src/services';
export * from './src/models';
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
