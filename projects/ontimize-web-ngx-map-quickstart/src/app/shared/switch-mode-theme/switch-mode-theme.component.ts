import { Component } from '@angular/core';
import { AppearanceService } from 'ontimize-web-ngx';

@Component({
  selector: 'switch-mode-theme',
  templateUrl: './switch-mode-theme.component.html'
})
export class SwitchModeThemeComponent {
  public lightMode: boolean = true;
  constructor(protected appearanceService: AppearanceService) {
    this.lightMode = !this.appearanceService.isDarkMode();
  }
  toggleModeDark(isDark: boolean) {
    this.appearanceService.setDarkMode(isDark);
    this.lightMode = !isDark;

  }
}
