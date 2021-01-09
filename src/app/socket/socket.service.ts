import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, fromEvent, Observable, of, Subject} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  skip,
  startWith,
  take,
  takeUntil,
  tap
} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {EmittedEventTypes, ReceivedEventTypes} from './socket-event-types';
import {io, Socket} from 'socket.io-client';

@Injectable()
export class SocketService {

  public connected$ = new Subject<boolean>();

  private socket: Socket | null = null;
  private shouldBeConnected$ = new BehaviorSubject<boolean>(false);

  public connectionError$ = combineLatest([
    this.shouldBeConnected$,
    this.connected$.pipe(startWith(false)),
  ]).pipe(
    map(([s, c]) => s && !c),
    distinctUntilChanged(),
    debounceTime(1000),
    startWith(false),
    distinctUntilChanged(),
    shareReplay(1),
  );

  private disconnect$ = new Subject<void>();

  constructor() {
    this.shouldBeConnected$
      .pipe(distinctUntilChanged(), skip(1))
      .subscribe(shouldConnect => {
        if (shouldConnect) {
          console.log('Socket should connect');
          this.socket = io(environment.backendUrl);
          this.on('connect').subscribe(() => this.connected$.next(true));
          this.on('disconnect').subscribe(() => this.connected$.next(false));
        } else {
          console.log('Socket should disconnect');
          this.disconnect$.next();
          this.socket.disconnect();
          this.socket.close();
          this.socket = null;
          this.connected$.next(false);
        }
      });
  }

  public connectSocket() {
    this.shouldBeConnected$.next(true);
  }

  public disconnectSocket() {
    this.shouldBeConnected$.next(false);
  }

  public on<T extends keyof ReceivedEventTypes>(eventName: T): Observable<ReceivedEventTypes[T]> {
    if (this.socket === null) {
      console.error('Cannot receive event: null socket');
      return of();
    }
    return fromEvent<ReceivedEventTypes[T]>(this.socket, eventName)
      .pipe(
        tap(data => environment.debugSocket && console.log(`socket> ${eventName}:`, data)),
        takeUntil(this.disconnect$)
      );
  }

  public once<T extends keyof ReceivedEventTypes>(eventName: T): Observable<ReceivedEventTypes[T]> {
    return this.on<T>(eventName).pipe(take(1));
  }

  public emit<T extends keyof EmittedEventTypes>(eventName: T, ...args: Array<EmittedEventTypes[T]>): void {
    if (this.socket === null) {
      console.error('Cannot emit event: null socket');
      return;
    }
    if (environment.debugSocket) {
      console.log(`socket< ${eventName}:`, args?.[0]);
    }
    this.socket.emit(eventName, ...args);
  }
}
