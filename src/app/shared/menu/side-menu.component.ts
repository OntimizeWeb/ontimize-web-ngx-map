import {Component, OnInit, NgZone, Inject, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {DialogService, OSideMenuComponent} from 'ontimize-web-ng2/ontimize';

@Component({
  moduleId: module.id,
  selector: 'side-menu',
  templateUrl: 'side-menu.component.html',
  styleUrls: ['side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  protected dialogService: DialogService;

  @ViewChild('oSideMenu')
  protected sideMenu: OSideMenuComponent;

  public showVersionCallback: Function;

  constructor(private router: Router, private actRoute: ActivatedRoute,
      private zone: NgZone, @Inject(DialogService) dialogService: DialogService) {
    this.dialogService = dialogService;
    this.showVersionCallback = this.showVersion.bind(this);
  }

  public ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.sideMenu) {
      this.sideMenu.showSidenav();
    }
  }

  public showVersion() {
    this.dialogService.alert('VERSION', '0.0.1');
  }

}
