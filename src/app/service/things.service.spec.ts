import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ThingsService} from './things.service';

describe('ThingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      ThingsService,
    ]
  }));

  it('should be created', () => {
    const service: ThingsService = TestBed.inject(ThingsService);
    expect(service).toBeTruthy();
  });
});
