import {NgModule} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UpdaterService} from '../updater/updater.service';

class UpdaterTestingService {
  // noinspection JSUnusedGlobalSymbols
  public readonly updatesAvailable$ = new BehaviorSubject<boolean>(false);
  // noinspection JSUnusedGlobalSymbols
  public readonly updatesActivated$ = new BehaviorSubject<boolean>(false);

  public update(): void {
    console.log('UpdaterTestingService.update() called');
  }
}

@NgModule({
  providers: [
    {provide: UpdaterService, useClass: UpdaterTestingService},
  ],
})
export class UpdaterTestingModule {
}
