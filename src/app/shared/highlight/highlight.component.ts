import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'highlight-comp',
  moduleId: module.id,
  styleUrls: ['highlight.component.css'],
  templateUrl: 'highlight.component.html',
  inputs: [
    'templateContent: template-content',
    'templateType: template-type'
  ]
})
export class HighlightComponent {

  protected clipboard: any;

  constructor(protected elRef: ElementRef) {
  }

  ngOnInit() {
    if (window['Clipboard'] && !this.clipboard) {
      let copyBtn = this.elRef.nativeElement.querySelectorAll('button#copy-btn');
      if (copyBtn.length) {
        var self = this;
        let element = copyBtn[0];
        this.clipboard = new window['Clipboard'](element);
        this.clipboard.on('success', function(e) {
          self.showTooltip(e.trigger, 'Copied!');
        });
        // this.clipboard.on('error', function(e) {
        //     console.log(e);
        // });
      }

    }
  }

  showTooltip(elem, msg) {
    // TODO show tooltip (solve problem of repainting that does not show tooltip)
    alert('Copied!');
  }

  ngOnDestroy() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }

}
