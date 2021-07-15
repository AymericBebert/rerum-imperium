import {Component, Inject, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {marker} from '@biesbjerg/ngx-translate-extract-marker';
import {filter, map, mergeMap} from 'rxjs/operators';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {DeviceService} from '../service/device.service';
import {SettingsService} from '../service/settings.service';
import {NavService} from './nav.service';

marker('app-name');

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @ViewChild('drawer', {static: true}) public navDrawer!: MatSidenav;

  public appVersion = this.config.version;

  constructor(public navService: NavService,
              public settingsService: SettingsService,
              public deviceService: DeviceService,
              private route: ActivatedRoute,
              private router: Router,
              @Inject(APP_CONFIG) private config: AppConfig,
  ) {
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
        mergeMap(r => r.data)
      )
      .subscribe(data => {
        this.navService.showBackButton$.next(data.hasBack || !!data.backRouterNavigate);
        this.navService.navButtons$.next(data.navButtons || []);
        this.navService.navTools$.next(data.navTools || []);
        this.navService.mainTitle$.next(data.mainTitle || '');
        this.navService.setBackRouterLink(data.backRouterNavigate);
      });
  }

  public closeDrawer(): void {
    if (!this.navService.pinSideNav$.getValue()) {
      this.navDrawer.close().catch(err => console.error('Could not close drawer?', err));
    }
  }
}
