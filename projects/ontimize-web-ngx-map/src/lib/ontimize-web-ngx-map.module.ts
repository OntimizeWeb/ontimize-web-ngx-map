import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { OCustomMaterialModule } from 'ontimize-web-ngx';

import { OMAP_COMPONENTS } from './components/export';
import { OMAP_PROVIDERS } from './services/providers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OCustomMaterialModule,
    FlexLayoutModule,
    DragDropModule
  ],
  declarations: OMAP_COMPONENTS,
  exports: OMAP_COMPONENTS,
  providers: OMAP_PROVIDERS,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OMapModule { }

