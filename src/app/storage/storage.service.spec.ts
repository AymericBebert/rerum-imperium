import {TestBed} from '@angular/core/testing';
import {CookieService} from 'ngx-cookie-service';
import {StorageService} from './storage.service';

describe('StorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      StorageService,
      CookieService,
    ],
  }));

  it('should be created', () => {
    const service: StorageService = TestBed.inject(StorageService);
    expect(service).toBeTruthy();
  });
});
