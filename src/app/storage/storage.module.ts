import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {StorageService} from './storage.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [],
  providers: [
    StorageService,
    CookieService,
  ],
  entryComponents: [],
})
export class StorageModule {
}
