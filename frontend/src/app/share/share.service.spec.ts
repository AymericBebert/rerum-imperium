import {provideZonelessChangeDetection} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {translateTestingProviders} from '../testing/translate-testing-providers';
import {ShareService} from './share.service';

describe('ShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      MatSnackBarModule,
    ],
    providers: [
      ShareService,
      provideZonelessChangeDetection(),
      translateTestingProviders,
    ],
  }));

  it('should be created', () => {
    const service: ShareService = TestBed.inject(ShareService);
    expect(service).toBeTruthy();
  });
});
