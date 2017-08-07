import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'highlight-comp',
  styles: [require('./highlight.component.scss')],
  template: require('./highlight.component.html'),
  inputs: [
    'templateContent: template-content',
    'templateType: template-type'
  ],
  encapsulation: ViewEncapsulation.None
})
export class HighlightComponent implements OnInit, OnDestroy {

  protected clipboard: any;

  constructor(protected elRef: ElementRef) {
  }

  ngOnInit() {
    if (window['Clipboard'] && !this.clipboard) {
      const copyBtn = this.elRef.nativeElement.querySelectorAll('button#copy-btn');
      if (copyBtn.length) {
        const self = this;
        const element = copyBtn[0];
        this.clipboard = new window['Clipboard'](element);
        this.clipboard.on('success', function (e) {
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
