import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {translateTestingModule} from '../testing/translate-testing-module';
import {NavButtonsService} from './nav-buttons.service';

describe('NavButtonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      translateTestingModule,
      RouterTestingModule,
    ],
    providers: [
      provideZonelessChangeDetection(),
      provideHttpClient(withInterceptorsFromDi()),
      provideHttpClientTesting(),
    ],
  }));

  it('should be created', () => {
    const service: NavButtonsService = TestBed.inject(NavButtonsService);
    expect(service).toBeTruthy();
  });
});
