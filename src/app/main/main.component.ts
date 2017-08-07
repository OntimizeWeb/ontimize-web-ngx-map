import { ViewEncapsulation, Component, OnInit, Injector } from '@angular/core';

import { NavigationBarService } from '../shared';

@Component({
  selector: 'app-main',
  template: require('./main.component.html'),
  styles: [require('./main.component.scss')],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {

  protected sectionTitle = '';
  protected version = 'v1.0.0';

  constructor(protected navigationService: NavigationBarService) { }

  ngOnInit() {
    this.navigationService.onTitleChange((title) => {
      this.sectionTitle = title;
    });
  }

}
