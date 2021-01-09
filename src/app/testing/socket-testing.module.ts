import {NgModule} from '@angular/core';
import {SocketService} from '../socket/socket.service';
import {SocketTestingService} from './socket-testing.service';

@NgModule({
  providers: [
    {provide: SocketService, useClass: SocketTestingService},
  ],
  imports: []
})
export class SocketTestingModule {
}
