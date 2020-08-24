import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  public vCore: string = environment.versions.core;
  public vMap: string = environment.versions.map;
  public vTheming: string = environment.versions.theming;
}
