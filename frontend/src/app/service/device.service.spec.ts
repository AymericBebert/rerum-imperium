import {provideZonelessChangeDetection} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {DeviceService} from './device.service';

describe('DeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      provideZonelessChangeDetection(),
      DeviceService,
    ],
  }));

  it('should be created', () => {
    const service: DeviceService = TestBed.inject(DeviceService);
    expect(service).toBeTruthy();
  });
});
