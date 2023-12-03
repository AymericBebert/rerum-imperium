import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ConfigTestingModule} from '../testing/config-testing.module';
import {SocketTestingModule} from '../testing/socket-testing.module';
import {RoomsService} from './rooms.service';

describe('RoomsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ConfigTestingModule,
      HttpClientTestingModule,
      SocketTestingModule,
      MatSnackBarModule,
    ],
    providers: [],
  }));

  it('should be created', () => {
    const service: RoomsService = TestBed.inject(RoomsService);
    expect(service).toBeTruthy();
  });
});
