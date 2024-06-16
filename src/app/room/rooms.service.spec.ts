import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {ConfigTestingModule} from '../testing/config-testing.module';
import {SocketTestingModule} from '../testing/socket-testing.module';
import {RoomsService} from './rooms.service';

describe('RoomsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ConfigTestingModule,
      SocketTestingModule,
    ],
    providers: [
      provideHttpClient(withInterceptorsFromDi()),
      provideHttpClientTesting(),
    ],
  }));

  it('should be created', () => {
    const service: RoomsService = TestBed.inject(RoomsService);
    expect(service).toBeTruthy();
  });
});
