import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {StorageService} from './storage.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [],
  providers: [
    StorageService,
  ],
})
export class StorageModule {
}
