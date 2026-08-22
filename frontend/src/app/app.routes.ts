import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RoomComponent} from './room/room.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {},
  },
  {
    path: 'room/:token',
    component: RoomComponent,
    data: {
      backRouterNavigate: '/',
      navButtons: ['share'],
      // navTools: [{name: 'nav-tool.wheel', icon: 'near_me'}],
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
