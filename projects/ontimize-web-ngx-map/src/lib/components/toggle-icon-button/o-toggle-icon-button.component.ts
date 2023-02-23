import { Component, OnInit } from '@angular/core';
import { InputConverter } from 'ontimize-web-ngx';

import { Util } from '../../utils/index';

@Component({
  selector: 'o-toggle-icon-button',
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
export class OToggleIconButtonComponent implements OnInit {
  @InputConverter()
  public buttonActive: boolean = false;
  protected _iconDark: boolean;
  protected _iconName: string;
  protected bgColor: string;
  @InputConverter()
  public clickable: boolean;
  @InputConverter()
  public noInk: boolean = false;

  ngOnInit() {
    this.clickable = Util.parseBoolean(this.clickable ? this.clickable.toString() : 'yes', true);
    this.noInk = Util.parseBoolean(this.noInk ? this.noInk.toString() : 'no', false);
    this.noInk = !this.clickable ? true : this.noInk;
    if (this.iconDark === undefined || this.iconDark === null) {
      if (!!this.bgColor) {
        const rgb = this.bgColor.replace(/rgb.*\(/g, '').replace(/[\)\s]/g, '').split(',');
        if (rgb.length >= 3) {
          this.iconDark = rgb.map(d => parseInt(d, 10) / 255).reduce((n, o) => n + o) / 3 > 0.5;
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
}
