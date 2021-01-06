import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NavService} from './service/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private translate: TranslateService,
              private navService: NavService,
  ) {
    translate.addLangs(['fr', 'en']);
    translate.setDefaultLang('fr');
    this.navService.applyStoredLanguage();
    this.navService.applyStoredDarkMode();
    this.navService.applyPinSideNav();
  }

}
