import {
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'highlight-comp',
  styleUrls: ['./highlight.component.scss'],
  templateUrl: './highlight.component.html',
  inputs: [
    'templateContent: template-content',
    'templateType: template-type'
  ],
  encapsulation: ViewEncapsulation.None
})
export class HighlightComponent {

  templateContent: any;
  templateType: any;
  templateTypeArray: Array<string>;

  constructor() {
  }

  ngOnInit(): void {
    this.templateTypeArray = this.parseTemplateType();
  }

  parseTemplateType() {
    return [this.templateType === 'scss' ? 'css' : this.templateType];
  }

  showTooltip() {
    // TODO show tooltip (solve problem of repainting that does not show tooltip)
    alert('Copied!');
  }


}
