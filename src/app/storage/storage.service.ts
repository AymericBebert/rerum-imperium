import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class StorageService {
  public readonly noStorageError$ = new Subject<void>();

  private readonly storage: any = null;

  constructor() {
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
      console.warn('Could not access sessionStorage');
    }

    if (!this.checkStorage()) {
      return;
    }
  }

  public setItem(key: string, value: string): void {
    if (!this.checkStorage()) {
      return;
    }
    this.storage.setItem(key, value);
  }

  public getItem(key: string): string | null {
    if (!this.checkStorage()) {
      return null;
    }
    return this.storage.getItem(key);
  }

  public removeItem(key: string): void {
    if (!this.checkStorage()) {
      return;
    }
    this.storage.removeItem(key);
  }

  private checkStorage(): boolean {
    if (this.storage !== null) {
      return true;
    }
    console.error('No storage option is available.');
    this.noStorageError$.next();
    return false;
  }
}
