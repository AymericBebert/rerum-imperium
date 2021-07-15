import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Subject} from 'rxjs';

@Injectable()
export class StorageService {
  public noStorageError$ = new Subject<void>();

  private readonly storage: any = null;
  private readonly useCookie: boolean = false;

  constructor(private cookieService: CookieService,
  ) {
    try {
      if (localStorage !== null) {
        this.storage = localStorage;
        return;
      }
    } catch (e) {
      console.warn('Could not access localStorage, trying sessionStorage');
    }

    try {
      if (sessionStorage !== null) {
        this.storage = sessionStorage;
        return;
      }
    } catch (e) {
      console.warn('Could not access sessionStorage, trying cookies');
    }

    try {
      cookieService.set('write_test', 'test');
      if (cookieService.check('write_test') && cookieService.get('write_test') === 'test') {
        this.storage = cookieService;
        this.useCookie = true;
        return;
      } else {
        console.warn('Cannot use cookies as storage');
      }
    } catch (e) {
      console.warn('Could not use cookies as storage');
    }

    if (!this.checkStorage()) {
      return;
    }
  }

  public setItem(key: string, value: string): void {
    if (!this.checkStorage()) {
      return;
    }

    if (this.useCookie) {
      this.storage.set(key, value);
    } else {
      this.storage.setItem(key, value);
    }
  }

  public getItem(key: string): string | null {
    if (!this.checkStorage()) {
      return null;
    }

    if (this.useCookie) {
      if (this.storage.check(key)) {
        return this.storage.get(key);
      } else {
        return null;
      }
    } else {
      return this.storage.getItem(key);
    }
  }

  public removeItem(key: string): void {
    if (!this.checkStorage()) {
      return;
    }

    if (this.useCookie) {
      this.storage.delete(key);
    } else {
      this.storage.removeItem(key);
    }
  }

  private checkStorage(): boolean {
    if (this.storage !== null) {
      return true;
    } else {
      console.error('No storage option is available.');
      this.noStorageError$.next();
      return false;
    }
  }
}
