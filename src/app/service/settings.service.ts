import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SettingsService {

  private readonly _darkMode$ = new BehaviorSubject<boolean>(false);
  public readonly darkMode$ = this._darkMode$.asObservable();

  public set darkMode(isDark: boolean) {
    if (isDark) {
      document.getElementsByTagName('html').item(0)?.classList.add('bronze-dark-theme');
    } else {
      document.getElementsByTagName('html').item(0)?.classList.remove('bronze-dark-theme');
    }
    this._darkMode$.next(isDark);
  }
}
