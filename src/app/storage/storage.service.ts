import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public readonly noStorageError$ = new Subject<void>();

  private readonly _storage: Storage | null = null;

  constructor() {
    try {
      if (localStorage !== null) {
        this._storage = localStorage;
        return;
      }
    } catch (e) {
      console.warn('Could not access localStorage, trying sessionStorage');
    }

    try {
      if (sessionStorage !== null) {
        this._storage = sessionStorage;
        return;
      }
    } catch (e) {
      console.warn('Could not access sessionStorage');
    }

    if (this._storage === null) {
      this.noStorageError$.next();
    }
  }

  public setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  public getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  private get storage(): Storage {
    if (this._storage !== null) {
      return this._storage;
    }
    this.noStorageError$.next();
    throw new Error('No storage option is available.');
  }
}
