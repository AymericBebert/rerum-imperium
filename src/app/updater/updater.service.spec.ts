import {TestBed} from '@angular/core/testing';
import {ServiceWorkerModule} from '@angular/service-worker';
import {UpdaterService} from './updater.service';

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
