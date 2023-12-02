import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class UpdaterTestingService {

  // noinspection JSUnusedGlobalSymbols
  public readonly updatesAvailable$ = new BehaviorSubject<boolean>(false);

  // noinspection JSUnusedGlobalSymbols
  public readonly updatesActivated$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  public update(): void {
    console.log('UpdaterTestingService.update() called');
  }
}
