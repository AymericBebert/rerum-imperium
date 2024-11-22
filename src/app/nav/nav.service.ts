import {inject, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject, from} from 'rxjs';
import {filter, switchMap, tap} from 'rxjs/operators';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {DeviceService} from '../service/device.service';
import {SettingsService} from '../service/settings.service';
import {StorageService} from '../storage/storage.service';
import {UpdaterService} from '../updater/updater.service';
import {NavButtonsService} from './nav-buttons.service';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private readonly navButtonsService = inject(NavButtonsService);
  private readonly settingsService = inject(SettingsService);
  private readonly deviceService = inject(DeviceService);
  private readonly translateService = inject(TranslateService);
  private readonly storageService = inject(StorageService);
  private readonly updater = inject(UpdaterService);
  private readonly config = inject<AppConfig>(APP_CONFIG);

  public readonly mainTitle$ = new BehaviorSubject<string>('');
  public readonly pinSideNav$ = new BehaviorSubject<boolean>(false);
  public readonly showBackButton$ = new BehaviorSubject<boolean>(false);
  public readonly navButtons$ = new BehaviorSubject<string[]>([]);
  public readonly navTools$ = new BehaviorSubject<{ name: string, icon: string }[]>([]);

  public notificationBadge = '';
  public displayUpdatesAvailable = false;
  public displayUpdatesActivated = false;

  public readonly language$ = new BehaviorSubject<string>('');

  constructor() {
    this.deviceService.isHandset$.pipe(filter(h => h)).subscribe(() => this.setPinSideNav(false));

    this.updater.updatesAvailable$.pipe(filter(a => a)).subscribe(() => {
      this.notificationBadge = '1';
      this.displayUpdatesAvailable = true;
    });

    this.updater.updatesActivated$.pipe(filter(a => a)).subscribe(() => {
      this.notificationBadge = '1';
      this.displayUpdatesActivated = true;
    });
  }

  public setBackRouterLink(backRouterNavigate: string): void {
    this.navButtonsService.setBackRouterLink(backRouterNavigate);
  }

  public backClicked(): void {
    this.navButtonsService.backClicked();
  }

  public navButtonClicked(buttonId: string): void {
    this.navButtonsService.navButtonClicked(buttonId);
  }

  public navToolClicked(toolId: string): void {
    this.navButtonsService.navButtonClicked(toolId);
  }

  public setLanguage(lang: string): void {
    if (lang === this.translateService.currentLang) {
      return;
    }
    this.translateService.use(lang);
    this.language$.next(lang);
    this.storageService.setItem('language', lang);
  }

  public applyStoredLanguage(): void {
    const languageFromStorage = this.storageService.getItem('language');
    const languageFromBrowser = this.translateService.getBrowserLang();
    if (languageFromStorage) {
      this.setLanguage(languageFromStorage);
    } else if (languageFromBrowser && ['en', 'fr'].includes(languageFromBrowser)) {
      this.setLanguage(languageFromBrowser);
    } else {
      this.setLanguage('fr');
    }
  }

  public setDarkMode(b: boolean): void {
    this.storageService.setItem('darkMode', JSON.stringify(b));
    this.settingsService.darkMode = b;
  }

  public applyStoredDarkMode(): void {
    const darkModeFromStorage = this.storageService.getItem('darkMode');
    if (!darkModeFromStorage && window.matchMedia) {
      this.setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    this.setDarkMode(!!JSON.parse(darkModeFromStorage || 'false'));
  }

  public setPinSideNav(b: boolean): void {
    this.storageService.setItem('pinSideNav', JSON.stringify(b));
    this.pinSideNav$.next(b);
    if (b) {
      document.getElementsByTagName('html').item(0)?.setAttribute('sidenav', 'pinned');
    } else {
      document.getElementsByTagName('html').item(0)?.removeAttribute('sidenav');
    }
  }

  public applyPinSideNav(): void {
    const pinSideNavFromStorage = this.storageService.getItem('pinSideNav');
    this.setPinSideNav(!!pinSideNavFromStorage && !!JSON.parse(pinSideNavFromStorage));
  }

  public update(): void {
    this.updater.update();
  }

  public checkForUpdates(): void {
    console.log('checkForUpdates clicked');
    console.log(`Current version: ${this.config.version}`);
    this.clearRefreshPage(false);
  }

  public clearRefreshPage(alwaysRefresh = true): void {
    console.log('checkForUpdates clicked');
    from(window.caches.keys())
      .pipe(
        tap(keys => console.log('Cache keys:', keys)),
        filter(keys => alwaysRefresh || keys.length > 0),
        switchMap(keys => Promise.all(keys.map(key => caches.delete(key)))),
        tap(deleted => console.log('Deleted?:', deleted)),
        filter(deleted => alwaysRefresh || deleted.some(d => d)),
      )
      .subscribe(() => this.refreshPage());
  }

  public refreshPage(): void {
    console.log('Refreshing page...');
    location.reload();
  }
}
