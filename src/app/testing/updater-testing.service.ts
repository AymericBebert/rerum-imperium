import {Injectable} from '@angular/core';
import {UpdateActivatedEvent, UpdateAvailableEvent} from '@angular/service-worker';
import {Subject} from 'rxjs';

@Injectable()
export class UpdaterTestingService {

  // noinspection JSUnusedGlobalSymbols
  public readonly updatesAvailable$ = new Subject<UpdateAvailableEvent>();

  // noinspection JSUnusedGlobalSymbols
  public readonly updatesActivated$ = new Subject<UpdateActivatedEvent>();

  constructor() {
  }

  public update(): void {
    console.log('UpdaterTestingService.update() called');
  }
}
