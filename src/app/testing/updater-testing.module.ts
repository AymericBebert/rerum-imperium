import {NgModule} from '@angular/core';
import {UpdaterTestingService} from './updater-testing.service';
import {UpdaterService} from '../updater/updater.service';

@NgModule({
  providers: [
    {provide: UpdaterService, useClass: UpdaterTestingService},
  ],
})
export class UpdaterTestingModule {
}
