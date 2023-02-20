import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, EMPTY, fromEvent, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, skip, startWith, take, takeUntil, tap} from 'rxjs/operators';
import {io, Socket} from 'socket.io-client';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {EmittedEventTypes, ReceivedEventTypes} from './socket-event-types';

@Injectable()
export class SocketService {

  public readonly connected$ = new Subject<boolean>();

  private socket: Socket | null = null;
  private readonly shouldBeConnected$ = new BehaviorSubject<boolean>(false);

  public readonly connectionError$ = combineLatest([
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

  private readonly disconnect$ = new Subject<void>();

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {
    this.shouldBeConnected$
      .pipe(distinctUntilChanged(), skip(1))
      .subscribe(shouldConnect => {
        if (shouldConnect) {
          console.log('Socket should connect');
          this.socket = io(this.config.backendUrl);
          this.on('connect').subscribe(() => this.connected$.next(true));
          this.on('disconnect').subscribe(() => this.connected$.next(false));
        } else {
          console.log('Socket should disconnect');
          this.disconnect$.next();
          if (this.socket != null) {
            this.socket.disconnect();
            this.socket.close();
          }
          this.socket = null;
          this.connected$.next(false);
        }
      });
  }

  public connectSocket(): void {
    this.shouldBeConnected$.next(true);
  }

  public disconnectSocket(): void {
    this.shouldBeConnected$.next(false);
  }

  public on<T extends keyof ReceivedEventTypes>(eventName: T): Observable<ReceivedEventTypes[T]> {
    if (this.socket === null) {
      console.error('Cannot receive event: null socket');
      return EMPTY;
    }
    return fromEvent<ReceivedEventTypes[T]>(this.socket as any, eventName)
      .pipe(
        tap(data => this.config.debugSocket && console.log(`socket> ${eventName}:`, data)),
        takeUntil(this.disconnect$),
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
    if (this.config.debugSocket) {
      console.log(`socket< ${eventName}:`, args?.[0]);
    }
    this.socket.emit(eventName, ...args);
  }
}
