import {TestBed} from '@angular/core/testing';
import {UpdaterService} from './updater.service';
import {ServiceWorkerModule} from '@angular/service-worker';

describe('UpdaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ServiceWorkerModule.register('ngsw-worker.js', {enabled: false}),
    ],
    providers: [
      UpdaterService,
    ],
  }));

  it('should be created', () => {
    const service: UpdaterService = TestBed.inject(UpdaterService);
    expect(service).toBeTruthy();
  });
});
