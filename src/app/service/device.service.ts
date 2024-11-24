import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {inject, Injectable, signal} from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly breakpointObserver = inject(BreakpointObserver);

  public readonly isHandset = signal<boolean>(true);

  constructor() {
    this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(map(result => result.matches))
      .subscribe(res => this.isHandset.set(res));
  }
}
