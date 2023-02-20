import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable()
export class SocketTestingService {

  public readonly connected$ = new Subject<boolean>();
  public readonly connectionError$ = new Subject<boolean>();

  private socket: true | null = null;

  constructor() {
  }

  public connectSocket(): void {
    if (this.socket === null) {
      console.log('Connecting fake socket');
      this.socket = true;
      this.connected$.next(true);
    }
  }

  public disconnectSocket(): void {
    if (this.socket !== null) {
      console.log('Disconnecting fake socket');
      this.connected$.next(false);
      this.socket = null;
    }
  }

  public on(event: string): Observable<string> {
    if (this.socket !== null) {
      throw new Error('on called but fake socket is disconnected');
    }
    return new Subject<string>();
  }

  public once(event: string): Observable<string> {
    return this.on(event).pipe(take(1));
  }

  public emit(event: string, data: string = ''): void {
    if (this.socket !== null) {
      throw new Error('emit called but fake socket is disconnected');
    }
    // do nothing
    console.log(`emit: "${event}" ${data ? data.substring(0, 20) + '...' : ''}`);
  }
}
