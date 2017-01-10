import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ObservableWrapper } from 'ontimize-web-ng2/ontimize/util/async';


@Injectable()
export class NavigationBarService {
  public currentTitle: string = null;
  public visible: boolean = true;

  private titleEmitter: EventEmitter<any> = new EventEmitter();
  private visibleEmitter: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  public setTitle(title: string): void {
    this.currentTitle = title;
    this._emitTitleChanged(this.currentTitle);
  }

  public setVisible(visible: boolean): void {
    this.visible = visible;
    this._emitVisibleChanged(this.visible);
  }


  /**
 * Subscribe to title updates
 */
  public onTitleChange(onNext: (value: any) => void): Object {
    return ObservableWrapper.subscribe(this.titleEmitter, onNext);
  }

  public onVisibleChange(onNext: (value: boolean) => void): Object {
    return ObservableWrapper.subscribe(this.visibleEmitter, onNext);
  }


  private _emitTitleChanged(title): void {
    ObservableWrapper.callEmit(this.titleEmitter, title);
  }

  private _emitVisibleChanged(visible): void {
    ObservableWrapper.callEmit(this.visibleEmitter, visible);
  }



}
