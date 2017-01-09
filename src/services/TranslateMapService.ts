import { Injector } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { OTranslateService } from 'ontimize-web-ng2/ontimize';

import MAP_CORE_TRANSLATIONS = require('../i18n/i18n');

export class TranslateMapService {

  protected oTranslateService: OTranslateService;
  protected currentLang: string = 'en';

  constructor(
    protected injector: Injector) {
    try {
      var self = this;
      this.oTranslateService = this.injector.get(OTranslateService);
      this.oTranslateService.onLanguageChanged.subscribe((lang: string) => {
        self.currentLang = lang;
      });
    } catch (ex) {
      //nothing to do
    }
  }


  public get (text: string): string {
    let textTranslated = undefined;
    try {
      if (this.oTranslateService) {
        let bundle = this.oTranslateService.get(text);
        if (bundle && bundle['value']) {
          textTranslated = bundle['value'];
        }
        /*
        * Due to a bug fixed on ng2-translate (v2.2.2) library, exceptions is not thrown
        * anymore when asking for a key that does not exist.
        */
        textTranslated = textTranslated === text ? undefined : textTranslated;
      }
    } catch (e) {
      textTranslated = undefined;
    }
    if (!textTranslated) {
      let bundle = MAP_CORE_TRANSLATIONS.MAP[this.currentLang];
      if (bundle && bundle[text]) {
        textTranslated = bundle[text];
      } else {
        textTranslated = text;
      }
    }
    return textTranslated;
  }


}
