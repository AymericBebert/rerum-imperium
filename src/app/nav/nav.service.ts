import {Injectable} from '@angular/core';
import {BehaviorSubject, from} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from '../storage/storage.service';
import {NavButtonsService} from './nav-buttons.service';
import {SettingsService} from '../service/settings.service';
import {DeviceService} from '../service/device.service';
import {filter, switchMap, tap} from 'rxjs/operators';
import {version} from '../../version';
import {UpdaterService} from '../updater/updater.service';

@Injectable()
export class NavService {
  public mainTitle$ = new BehaviorSubject<string>('');
  public pinSideNav$ = new BehaviorSubject<boolean>(false);
  public showBackButton$ = new BehaviorSubject<boolean>(false);
  public navButtons$ = new BehaviorSubject<string[]>([]);
  public navTools$ = new BehaviorSubject<{ name: string, icon: string }[]>([]);
  public notificationBadge$ = new BehaviorSubject<string>('');
  public displayUpdatesAvailable$ = new BehaviorSubject<boolean>(false);
  public displayUpdatesActivated$ = new BehaviorSubject<boolean>(false);

  public language$ = new BehaviorSubject<string>('');

  constructor(private navButtonsService: NavButtonsService,
              private settingsService: SettingsService,
              private deviceService: DeviceService,
              private translateService: TranslateService,
              private storageService: StorageService,
              private updater: UpdaterService,
  ) {
    this.deviceService.isHandset$.pipe(filter(h => h)).subscribe(() => this.setPinSideNav(false));

    this.updater.updatesAvailable$.subscribe(() => {
      this.notificationBadge$.next('1');
      this.displayUpdatesAvailable$.next(true);
    });

    this.updater.updatesActivated$.subscribe(() => {
      this.notificationBadge$.next('1');
      this.displayUpdatesActivated$.next(true);
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
    } else if (['en', 'fr'].includes(languageFromBrowser)) {
      this.setLanguage(languageFromBrowser);
    } else {
      this.setLanguage('fr');
    }
  }

  public setDarkMode(b: boolean): void {
    this.storageService.setItem('darkMode', JSON.stringify(b));
    this.settingsService.darkMode$.next(b);
  }

  public applyStoredDarkMode(): void {
    const darkModeFromStorage = this.storageService.getItem('darkMode');
    if (darkModeFromStorage && JSON.parse(darkModeFromStorage)) {
      this.setDarkMode(true);
    }
  }

  public setPinSideNav(b: boolean): void {
    this.storageService.setItem('pinSideNav', JSON.stringify(b));
    this.pinSideNav$.next(b);
  }

  public applyPinSideNav(): void {
    const pinSideNavFromStorage = this.storageService.getItem('pinSideNav');
    if (pinSideNavFromStorage && JSON.parse(pinSideNavFromStorage)) {
      this.setPinSideNav(true);
    }
  }

  public update(): void {
    this.updater.update();
  }

  public checkForUpdates(): void {
    console.log('checkForUpdates clicked');
    console.log(`Current version: ${version}`);
    this.clearRefreshPage(false);
  }

  public clearRefreshPage(alwaysRefresh: boolean = true): void {
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
