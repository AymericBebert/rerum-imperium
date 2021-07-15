import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {StorageModule} from '../storage/storage.module';
import {SocketTestingModule} from '../testing/socket-testing.module';
import {RoomsService} from './rooms.service';

describe('RoomsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      SocketTestingModule,
      StorageModule,
      MatSnackBarModule,
    ],
    providers: [
      RoomsService,
    ]
  }));

  it('should be created', () => {
    const service: RoomsService = TestBed.inject(RoomsService);
    expect(service).toBeTruthy();
  });
});
