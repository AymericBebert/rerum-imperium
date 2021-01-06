import {TranslateService} from '@ngx-translate/core';
import {Component} from '@angular/core';

// @ts-ignore
@Component({
  selector: 'app-translation-markers',
  template: `<p>Nope</p>`,
})
export class TranslationMarkersComponent {
  constructor(public translate: TranslateService) {

    // Translation markers so that ngx-translate-extract will extract them

    translate.get([
      // 'main-title.wheel',
    ]);
  }
}
