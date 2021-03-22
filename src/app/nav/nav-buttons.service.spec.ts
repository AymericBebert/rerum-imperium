import {TestBed} from '@angular/core/testing';
import {NavButtonsService} from './nav-buttons.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateTestingModule} from '../testing/translate-testing-module';

describe('NavButtonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      TranslateTestingModule,
      RouterTestingModule,
    ],
    providers: [
      NavButtonsService,
    ],
  }));

  it('should be created', () => {
    const service: NavButtonsService = TestBed.inject(NavButtonsService);
    expect(service).toBeTruthy();
  });
});
