import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigTestingModule} from '../testing/config-testing.module';
import {TranslateTestingModule} from '../testing/translate-testing-module';
import {UpdaterTestingModule} from '../testing/updater-testing.module';
import {NavService} from './nav.service';

describe('NavService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ConfigTestingModule,
      TranslateTestingModule,
      RouterTestingModule,
      UpdaterTestingModule,
    ],
    providers: [
      provideHttpClient(withInterceptorsFromDi()),
      provideHttpClientTesting(),
    ],
  }));

  it('should be created', () => {
    const service: NavService = TestBed.inject(NavService);
    expect(service).toBeTruthy();
  });
});
