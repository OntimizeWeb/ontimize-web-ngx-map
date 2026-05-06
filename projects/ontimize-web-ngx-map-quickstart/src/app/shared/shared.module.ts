import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OMapModule } from 'ontimize-web-ngx-map';

import { ExampleComponent } from './example/example.component';
import { HighlightComponent } from './highlight/highlight.component';
import { SwitchModeThemeComponent } from './switch-mode-theme/switch-mode-theme.component';

@NgModule({
  imports: [
    CommonModule,
    OntimizeWebModule,
    OMapModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    ClipboardModule
  ],
  declarations: [
    ExampleComponent,
    HighlightComponent,
    SwitchModeThemeComponent
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    ExampleComponent,
    HighlightComponent,
    SwitchModeThemeComponent
  ]
})
export class SharedModule { }
