import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { HighlightLoader } from 'ngx-highlightjs';
import { AppearanceService } from 'ontimize-web-ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'highlight-comp',
  styleUrls: ['./highlight.component.scss'],
  templateUrl: './highlight.component.html',
  inputs: [
    'templateContent: template-content',
    'templateType: template-type'
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighlightComponent {

  templateContent: any;
  templateType: any;
  templateTypeArray: Array<string>;
  private onThemeUpdate: Subscription;

  constructor(
    private hljsLoader: HighlightLoader,
    private appearanceService: AppearanceService
  ) {
    this.loadTheme(this.appearanceService.isDarkMode());
    this.onThemeUpdate = this.appearanceService.isDarkMode$.subscribe((darkMode: boolean) => {
      this.loadTheme(darkMode);
    });
  }

  loadTheme(darkMode: boolean) {
    this.hljsLoader.setTheme(darkMode ? 'assets/hightlight/github-dark.css' : 'assets/hightlight/github.css');
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
