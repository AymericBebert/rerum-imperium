import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  private readonly _darkMode$ = new BehaviorSubject<boolean>(false);
  public readonly darkMode$ = this._darkMode$.asObservable();

  public set darkMode(isDark: boolean) {
    if (isDark) {
      document.getElementsByTagName('html').item(0)?.setAttribute('dark-theme', 'true');
    } else {
      document.getElementsByTagName('html').item(0)?.removeAttribute('dark-theme');
    }
    this._darkMode$.next(isDark);
  }
}
