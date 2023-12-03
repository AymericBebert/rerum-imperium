import {TestBed} from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TranslateTestingModule} from '../testing/translate-testing-module';
import {ShareButtonService} from './share-button.service';

describe('ShareButtonService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      TranslateTestingModule,
      MatSnackBarModule,
    ],
    providers: [],
  }));

  it('should be created', () => {
    const service: ShareButtonService = TestBed.inject(ShareButtonService);
    expect(service).toBeTruthy();
  });
});
