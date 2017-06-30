import { Component } from '@angular/core';
import { Util } from '../../utils';

@Component({
  selector: 'o-toggle-icon-button',
  providers: [],
  inputs: [
    'buttonActive: button-active',
    'iconDark: icon-dark',
    'iconName: icon-name',
    'bgColor: bg-color',
    'clickable',
    'noInk: no-ink'
  ],
  template: require('./o-toggle-icon-button.component.html'),
  styles: [require('./o-toggle-icon-button.component.scss')]
})
export class OToggleIconButtonComponent {
  buttonActive: boolean = false;
  iconDark: boolean;
  iconName: string;
  bgColor: string;
  clickable: boolean;
  noInk: boolean = false;

  ngOnInit() {
    this.clickable = Util.parseBoolean(this.clickable ? this.clickable.toString() : 'yes', true);
    this.noInk = Util.parseBoolean(this.noInk ? this.noInk.toString() : 'no', false);
    this.noInk = !this.clickable ? true : this.noInk;
    if (this.iconDark === undefined || this.iconDark === null) {
      if (!!this.bgColor) {
        let rgb = this.bgColor.replace(/rgb.*\(/g, '').replace(/[\)\s]/g, '').split(',');
        if (rgb.length >= 3) {
          this.iconDark = rgb.map(d => parseInt(d) / 255).reduce((n, o) => n + o) / 3 > 0.5;
        }
      } else {
        this.iconDark = false;
      }
    } else {
      this.iconDark = Util.parseBoolean(this.iconDark.toString(), false);
    }
  }

  toggle(evt: Event) {
    if (this.clickable) {
      return this.buttonActive = !this.buttonActive;
    }
    return undefined;
  }
}
