import {TestBed} from '@angular/core/testing';
import {NavService} from './nav.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateTestingModule} from '../testing/translate-testing-module';
import {NavButtonsService} from './nav-buttons.service';
import {SettingsService} from './settings.service';
import {DeviceService} from './device.service';
import {StorageModule} from '../storage/storage.module';
import {UpdaterTestingModule} from '../testing/updater-testing.module';

describe('NavService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      TranslateTestingModule,
      RouterTestingModule,
      StorageModule,
      UpdaterTestingModule,
    ],
    providers: [
      NavService,
      NavButtonsService,
      SettingsService,
      DeviceService,
    ],
  }));

  it('should be created', () => {
    const service: NavService = TestBed.inject(NavService);
    expect(service).toBeTruthy();
  });
});
