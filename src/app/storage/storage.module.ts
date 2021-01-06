import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {StorageService} from './storage.service';
import {CookieService} from 'ngx-cookie-service';

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
