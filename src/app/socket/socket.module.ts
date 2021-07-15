import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SocketService} from 'src/app/socket/socket.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    SocketService,
  ]
})
export class SocketModule {
}
