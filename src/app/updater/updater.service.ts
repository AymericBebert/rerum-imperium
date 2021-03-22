import {ApplicationRef, Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {first} from 'rxjs/operators';
import {concat, interval} from 'rxjs';

@Injectable()
export class UpdaterService {

  public updatesAvailable$ = this.updates.available;
  public updatesActivated$ = this.updates.activated;

  constructor(private appRef: ApplicationRef,
              private updates: SwUpdate,
  ) {
    if (!this.updates.isEnabled) {
      return;
    }

    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable));
    const checkInterval$ = interval(5 * 60 * 1000);
    const everyCheckIntervalOnceAppIsStable$ = concat(appIsStable$, checkInterval$);

    everyCheckIntervalOnceAppIsStable$.subscribe(() => {
      console.log('Checking for updates');
      this.updates.checkForUpdate().catch(err => console.error('checkForUpdate error', err));
    });

    this.updates.available.subscribe(event => {
      console.log('Current version is', event.current);
      console.log('Available version is', event.available);
    });

    this.updates.activated.subscribe(event => {
      console.log('Old version was', event.previous);
      console.log('New version is', event.current);
    });
  }

  public update(): void {
    if (!this.updates.isEnabled) {
      return;
    }
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
