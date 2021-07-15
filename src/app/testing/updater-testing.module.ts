import {NgModule} from '@angular/core';
import {UpdaterService} from '../updater/updater.service';
import {UpdaterTestingService} from './updater-testing.service';

@NgModule({
  providers: [
    {provide: UpdaterService, useClass: UpdaterTestingService},
  ],
})
export class UpdaterTestingModule {
}
