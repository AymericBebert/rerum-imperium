import {inject, Injectable, signal} from '@angular/core';
import {StorageService} from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly storageService = inject(StorageService);

  public readonly darkMode = signal<boolean>(false);

  constructor() {
    const darkModeFromStorage = this.storageService.getItem('darkMode');
    if (!darkModeFromStorage && window.matchMedia) {
      this.setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches, false);
    }
    this.setDarkMode(!!JSON.parse(darkModeFromStorage || 'false'), false);
  }

  public setDarkMode(isDark: boolean, register = true): void {
    if (register) {
      this.storageService.setItem('darkMode', JSON.stringify(isDark));
    }
    if (isDark) {
      document.getElementsByTagName('html').item(0)?.setAttribute('dark-theme', 'true');
    } else {
      document.getElementsByTagName('html').item(0)?.removeAttribute('dark-theme');
    }
    this.darkMode.set(isDark);
  }
}
