import { Component, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'example-comp',
  moduleId: module.id,
  styleUrls: ['example.component.css'],
  templateUrl: 'example.component.html',
  inputs: [
    'compName: comp-name',
    'orderedFiles: files'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ExampleComponent {

  public showSource: boolean = false;
  protected compName: string = '';
  protected orderedFiles: Array<string>;

  constructor(protected elRef: ElementRef) {
  }

}
