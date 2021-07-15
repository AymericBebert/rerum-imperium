import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SocketTestingModule} from '../testing/socket-testing.module';
import {SocketService} from './socket.service';

describe('SocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      SocketTestingModule,
    ],
    providers: [],
  }));

  it('should be created', () => {
    const service = TestBed.inject(SocketService);
    expect(service).toBeTruthy();
  });
});
