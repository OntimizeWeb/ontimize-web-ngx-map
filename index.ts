import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatSidenavModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OCustomMaterialModule } from 'ontimize-web-ngx';
import { DndModule } from 'ng2-dnd';

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
    MatIconModule,
    MatSidenavModule,
    OCustomMaterialModule,
    FlexLayoutModule,
    DndModule.forRoot()
  ],
  declarations: OMAP_DIRECTIVES,
  exports: OMAP_DIRECTIVES,
  providers: OMAP_PROVIDERS,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OMapModule { }
