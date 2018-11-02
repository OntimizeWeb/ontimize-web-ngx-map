import { Component } from '@angular/core';
import { Util } from '../../utils';

@Component({
  moduleId: module.id,
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
  templateUrl: './o-toggle-icon-button.component.html',
  styleUrls: ['./o-toggle-icon-button.component.scss']
})
export class OToggleIconButtonComponent {
  protected _buttonActive: boolean = false;
  protected _iconDark: boolean;
  protected _iconName: string;
  protected bgColor: string;
  protected clickable: boolean;
  protected _noInk: boolean = false;

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

  toggle() {
    if (this.clickable) {
      return this.buttonActive = !this.buttonActive;
    }
    return false;
  }

  get buttonActive(): boolean {
    return this._buttonActive;
  }

  set buttonActive(val: boolean) {
    this._buttonActive = val;
  }

  get iconDark(): boolean {
    return this._iconDark;
  }

  set iconDark(val: boolean) {
    this._iconDark = val;
  }

  get iconName(): string {
    return this._iconName;
  }

  set iconName(val: string) {
    this._iconName = val;
  }

  get noInk(): boolean {
    return this._noInk;
  }

  set noInk(val: boolean) {
    this._noInk = val;
  }
}
