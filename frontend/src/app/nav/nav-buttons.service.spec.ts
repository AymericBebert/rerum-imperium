import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {translateTestingProviders} from '../testing/translate-testing-providers';
import {NavButtonsService} from './nav-buttons.service';

describe('NavButtonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
    ],
    providers: [
      provideZonelessChangeDetection(),
      provideHttpClient(withInterceptorsFromDi()),
      provideHttpClientTesting(),
      translateTestingProviders,
    ],
  }));

  it('should be created', () => {
    const service: NavButtonsService = TestBed.inject(NavButtonsService);
    expect(service).toBeTruthy();
  });
});
