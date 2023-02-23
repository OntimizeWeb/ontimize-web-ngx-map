import { Injector } from '@angular/core';
import { OTranslateService } from 'ontimize-web-ngx';
import { MAP } from '../i18n/i18n';

export class TranslateMapService {

  protected oTranslateService: OTranslateService;
  protected currentLang: string = 'en';

  constructor(
    protected injector: Injector) {
    try {
      this.oTranslateService = this.injector.get(OTranslateService);
      this.currentLang = this.oTranslateService.getCurrentLang();
      this.oTranslateService.onLanguageChanged.subscribe((lang: string) => {
        this.currentLang = lang;
      });
    } catch (ex) {
      // nothing to do
    }
  }


  public get(text: string): string {
    let textTranslated;
    try {
      if (this.oTranslateService) {
        const bundle = this.oTranslateService.get(text);
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
      const bundle = MAP[this.currentLang];
      if (bundle && bundle[text]) {
        textTranslated = bundle[text];
      } else {
        textTranslated = text;
      }
    }
    return textTranslated;
  }

}
