import {ApplicationRef, Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {BehaviorSubject, concat, interval} from 'rxjs';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UpdaterService {

  public readonly updatesAvailable$ = new BehaviorSubject<boolean>(false);
  public readonly updatesActivated$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly swUpdate: SwUpdate,
              appRef: ApplicationRef,
  ) {
    if (!swUpdate.isEnabled) {
      return;
    }

    swUpdate.versionUpdates.subscribe(evt => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          this.updatesAvailable$.next(true);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          this.updatesActivated$.next(true);
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.warn(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });

    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable));
    const checkInterval$ = interval(5 * 60 * 1000);
    const everyCheckIntervalOnceAppIsStable$ = concat(appIsStable$, checkInterval$);

    everyCheckIntervalOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await swUpdate.checkForUpdate();
        console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
    });
  }

  public update(): void {
    if (!this.swUpdate.isEnabled) {
      return;
    }
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
}
