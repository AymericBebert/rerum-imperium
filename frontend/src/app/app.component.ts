import {Component, inject, viewChild} from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {filter, map, mergeMap} from 'rxjs/operators';
import {APP_CONFIG, AppConfig} from '../config/app.config';
import {ChangeLanguageComponent} from './nav/change-language.component';
import {NavService} from './nav/nav.service';
import {DeviceService} from './service/device.service';
import {SettingsService} from './service/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterModule,
    TranslateModule,
    ChangeLanguageComponent,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule,
  ],
})
export class AppComponent {
  readonly navService = inject(NavService);
  readonly settingsService = inject(SettingsService);
  readonly deviceService = inject(DeviceService);
  private readonly config = inject<AppConfig>(APP_CONFIG);
  private readonly router = inject(Router);

  public readonly appVersion = this.config.version;

  readonly navDrawer = viewChild<MatSidenav | null>('drawer');

  constructor() {
    const translate = inject(TranslateService);
    const route = inject(ActivatedRoute);

    translate.addLangs(['fr', 'en']);
    translate.setDefaultLang('fr');
    this.navService.applyStoredLanguage();
    this.navService.applyStoredPinSideNav();

    this.router.events
      .pipe(
        filter(val => val instanceof NavigationEnd),
        map(() => route),
        map(r => {
          while (r.firstChild) {
            r = r.firstChild;
          }
          return r;
        }),
        filter(r => r.outlet === 'primary'),
        mergeMap(r => r.data),
      )
      .subscribe(data => {
        this.navService.showBackButton.set(data.hasBack || !!data.backRouterNavigate);
        this.navService.navButtons.set(data.navButtons || []);
        this.navService.navTools.set(data.navTools || []);
        this.navService.mainTitle.set(data.mainTitle || '');
        this.navService.setBackRouterLink(data.backRouterNavigate);
      });
  }

  public openDrawer(): void {
    const navDrawer = this.navDrawer();
    if (navDrawer) {
      if (!this.deviceService.isHandset()) {
        this.navService.setPinSideNav(true);
      }
      navDrawer.open().catch(err => console.error('Could not open drawer?', err));
    }
  }

  public closeDrawer(): void {
    const navDrawer = this.navDrawer();
    if (!this.navService.pinSideNav() && navDrawer) {
      navDrawer.close().catch(err => console.error('Could not close drawer?', err));
    }
  }
}
