import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DirectHomeComponent} from './direct-home/direct-home.component';
import {HomeComponent} from './home/home.component';
import {RoomComponent} from './room/room.component';


const routes: Routes = [
  {
    path: 'direct-home',
    component: DirectHomeComponent,
    data: {
      backRouterNavigate: '/',
      // navButtons: ['share'],
      // navTools: [{name: 'nav-tool.wheel', icon: 'near_me'}],
    },
  },
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

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
