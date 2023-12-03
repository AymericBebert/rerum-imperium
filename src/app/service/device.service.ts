import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  public readonly isHandset$ = new BehaviorSubject<boolean>(true);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(map(result => result.matches))
      .subscribe(res => this.isHandset$.next(res));
  }
}
