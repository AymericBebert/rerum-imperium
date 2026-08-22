import {provideZonelessChangeDetection} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {translateTestingModule} from '../testing/translate-testing-module';
import {ShareService} from './share.service';

describe('ShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      translateTestingModule,
      MatSnackBarModule,
    ],
    providers: [
      ShareService,
      provideZonelessChangeDetection(),
    ],
  }));

  it('should be created', () => {
    const service: ShareService = TestBed.inject(ShareService);
    expect(service).toBeTruthy();
  });
});
