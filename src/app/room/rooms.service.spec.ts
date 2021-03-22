import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RoomsService} from './rooms.service';
import {SocketTestingModule} from '../testing/socket-testing.module';
import {StorageModule} from '../storage/storage.module';

describe('RoomsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      SocketTestingModule,
      StorageModule,
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
