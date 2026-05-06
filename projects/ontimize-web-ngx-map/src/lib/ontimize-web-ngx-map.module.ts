import { NgModule } from '@angular/core';

import { OMAP_COMPONENTS } from './components/export';
import { OMAP_PROVIDERS } from './services/providers';

@NgModule({
  imports: OMAP_COMPONENTS,
  exports: OMAP_COMPONENTS,
  providers: OMAP_PROVIDERS,
})
export class OMapModule { }
