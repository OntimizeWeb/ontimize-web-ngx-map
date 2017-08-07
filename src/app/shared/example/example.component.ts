import { Component, ElementRef, ViewEncapsulation, EventEmitter, OnInit } from '@angular/core';
import { InputConverter } from 'ontimize-web-ng2';

@Component({
  selector: 'example-comp',
  styles: [require('./example.component.scss')],
  template: require('./example.component.html'),
  inputs: [
    'compName: comp-name',
    'orderedFiles: files',
    'collapsible',
    'collapsed'
  ],
  outputs: [
    'onShowSource : showSource'
  ],
  host: {
    '[class.example-comp]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class ExampleComponent {
  public showSource = false;
  protected compName = '';
  protected orderedFiles: Array<string>;
  @InputConverter()
  collapsible: boolean = false;
  @InputConverter()
  collapsed: boolean = false;
  protected html: string = undefined;

  onShowSource: EventEmitter<any> = new EventEmitter<any>();

  private tplData: Object;

  constructor(protected elRef: ElementRef) {
    this.tplData = {};
  }

  toggleShowSource() {
    this.showSource = !this.showSource;
    if (this.showSource) {
      this.onShowSource.emit();
    }
  }

  ngOnInit() {
    this.tplData['html'] = this.initializeData('html');
    this.tplData['scss'] = this.initializeData('scss');
    this.tplData['typescript'] = this.initializeData('typescript');
  }

  initializeData(type: string) {
    let tpl = '';
    if (this.orderedFiles && this.orderedFiles.length > -1) {
      this.orderedFiles.forEach((item) => {
        if (item['type'] === type) {
          tpl = item['data'];
        }
      });
    }
    return tpl;
  }

  hasTplData(type: string) {
    const tpl = this.tplData[type];
    if (type === 'html' && this.html !== undefined) {
      return true;
    }
    return tpl ? tpl.length > 0 : false;
  }

  getTplData(type: string) {
    const tpl = this.tplData[type];
    return tpl ? tpl : '';
  }

}
