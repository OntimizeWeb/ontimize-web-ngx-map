import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { BooleanInputConverter } from 'ontimize-web-ngx';

export interface IFiles {
  html?: any;
  scss?: any;
  typescript?: any;
  files?: any[];
}

@Component({
  selector: 'example-comp',
  styleUrls: ['example.component.scss'],
  templateUrl: 'example.component.html',
  inputs: [
    'compName: comp-name',
    'compDesc: comp-desc',
    'compNote:comp-note',
    'files',
    'collapsible',
    'collapsed',
    'tabHeight: tab-height'
  ],
  outputs: [
    'onShowSource : showSource'
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.example-comp]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {

  aditionalTabs: any[];
  _showSource = false;
  compName = '';
  compNote;
  compDesc: string;
  _files: IFiles = {};
  tabHeight: string = '350px';

  @BooleanInputConverter()
  collapsible: boolean = false;
  @BooleanInputConverter()
  collapsed: boolean = false;

  onShowSource: EventEmitter<any> = new EventEmitter<any>();

  private tplData: Object;

  constructor(
    protected cd: ChangeDetectorRef
  ) {
    this.tplData = {};
  }

  toggleShowSource() {
    this.showSource = !this.showSource;
    if (this.showSource) {
      this.onShowSource.emit();
    }
  }

  ngAfterViewInit() {
    this.aditionalTabs = this.files.files;
  }

  get showSource(): boolean {
    return this._showSource;
  }

  set showSource(val: boolean) {
    this._showSource = val;
  }

  set files(val: IFiles) {
    if (val.html && val.html.data) {
      this._files.html = val.html;
    }
    this._files.scss = val.scss;
    this._files.typescript = val.typescript;
    this._files.files = val.files;
  }

  get files(): IFiles {
    return this._files;
  }

  set html(val: any) {
    this.files.html = {
      data: val
    };
  }

  get html(): any {
    return this.files && this.files.html && this.files.html.data ? this.files.html.data : undefined;
  }

}
