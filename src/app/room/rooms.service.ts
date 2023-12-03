import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, combineLatest, Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, map, skip, switchMap, takeUntil, tap} from 'rxjs/operators';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {IRoom, IStoredExpandedSatelles, IStoredRoom} from '../model/room';
import {SocketService} from '../socket/socket.service';
import {StorageService} from '../storage/storage.service';
import {isNotNull} from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {

  public readonly roomCheckPending$ = new BehaviorSubject<boolean>(false);
  public readonly roomCheck$ = new Subject<IRoom | null>();

  public readonly currentRoom$ = new BehaviorSubject<IRoom | null>(null);
  private readonly currentRoomId$ = this.currentRoom$.pipe(map(room => room?.token || ''), distinctUntilChanged());

  private readonly roomLeft$ = this.currentRoom$.pipe(skip(1), filter(r => !r), map(() => void 0));

  constructor(private readonly http: HttpClient,
              private readonly socket: SocketService,
              private readonly storageService: StorageService,
              private readonly snackBar: MatSnackBar,
              @Inject(APP_CONFIG) private readonly config: AppConfig,
  ) {
    this.currentRoom$
      .pipe(
        filter(isNotNull),
        map(room => ({token: room.token, roomName: room.roomName})),
        debounceTime(500),
      )
      .subscribe(({token, roomName}) => this.addToVisitedRooms(token, roomName));

    this.currentRoomId$.pipe(skip(1)).subscribe(token => this.setLastVisitedRoom(token));

    combineLatest([
      this.currentRoomId$,
      this.socket.connected$,
    ])
      .pipe(filter(([rid, c]) => c && !!rid))
      .subscribe(([token]) => {
        this.socket.emit('imperium exit');
        this.socket.emit('imperium join', {token});
      });

    this.socket.connected$
      .pipe(
        filter(c => c),
        switchMap(() => this.socket.on('display error').pipe(takeUntil(this.roomLeft$))),
      )
      .subscribe(err => {
        console.error('Received error:', err);
        this.snackBar.open(err, '', {
          duration: 3000,
        });
      });

    this.socket.connected$
      .pipe(
        filter(c => c),
        switchMap(() => this.socket.on('room').pipe(takeUntil(this.roomLeft$))),
      )
      .subscribe(g => {
        console.log('Received room');
        this.currentRoom$.next(g);
      });

    this.roomLeft$.subscribe(() => console.log('room left'));
  }

  public setCurrentRoomToken(token: string | null): void {
    const currentRoom = this.currentRoom$.getValue();
    if (!token) {
      this.socket.disconnectSocket();
    }
    if (currentRoom && currentRoom.token !== token) {
      this.currentRoom$.next(null);
    }
    if (token && (!currentRoom || currentRoom.token !== token)) {
      this.getRoom(token).subscribe(room => {
        this.currentRoom$.next(room);
        if (room) {
          this.socket.connectSocket();
        } else {
          this.setLastVisitedRoom('');
        }
      });
    }
  }

  public roomExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value.length < this.config.tokenLength) {
        return of(null);
      }
      return this.roomExistsCheck(control.value).pipe(
        map(res => res ? null : {roomNotFound: true}),
      );
    };
  }

  public getVisitedRooms(): IStoredRoom[] {
    const visitedRoomsFromStorage = this.storageService.getItem('visitedRooms') || '[]';
    return (JSON.parse(visitedRoomsFromStorage) as IStoredRoom[]).map(g => ({...g, date: new Date(g.date)}));
  }

  public deleteVisitedRoom(token: string): IStoredRoom[] {
    const newStoredRooms = this.getVisitedRooms().filter(sg => sg.token !== token);
    this.storageService.setItem('visitedRooms', JSON.stringify(newStoredRooms));
    return newStoredRooms;
  }

  public getLastVisitedRoom(): string {
    return this.storageService.getItem('lastVisited') || '';
  }

  public setLastVisitedRoom(token: string): void {
    const lastVisited = this.storageService.getItem('lastVisited') || '';
    if (lastVisited !== token) {
      console.log('setLastVisitedRoom:', lastVisited, '->', token);
      this.clearExpandedSatelles();
      this.storageService.setItem('lastVisited', token);
    } else {
      console.log('setLastVisitedRoom: keeping', lastVisited);
    }
  }

  public getExpandedSatelles(): IStoredExpandedSatelles[] {
    const expandedSatellesFromStorage = this.storageService.getItem('expandedSatelles') || '[]';
    return JSON.parse(expandedSatellesFromStorage);
  }

  public setExpandedSatelles(satellesName: string, expanded: boolean): void {
    const expandedSatelles = this.getExpandedSatelles();
    const foundAtIndex = expandedSatelles.map(es => es.satellesName).indexOf(satellesName);
    if (foundAtIndex >= 0) {
      expandedSatelles[foundAtIndex] = {satellesName, expanded};
    } else {
      expandedSatelles.push({satellesName, expanded});
    }
    this.storageService.setItem('expandedSatelles', JSON.stringify(expandedSatelles));
  }

  public clearExpandedSatelles(): void {
    this.storageService.removeItem('expandedSatelles');
  }

  private roomExistsCheck(token: string): Observable<IRoom | null> {
    this.roomCheckPending$.next(true);
    return this.getRoom(token).pipe(
      tap(room => this.roomCheck$.next(room)),
      finalize(() => this.roomCheckPending$.next(false)),
    );
  }

  private getRoom(token: string): Observable<IRoom | null> {
    return this.http.get<IRoom>(`${this.config.backendUrl}/rooms/room/${token}`)
      .pipe(
        catchError(err => {
          console.error(err);
          this.snackBar.open(`getRoom: ${err}`, '', {duration: 3000});
          return of(null);
        }),
      );
  }

  private addToVisitedRooms(token: string, roomName: string): void {
    const visitedRoomsFromStorage = this.storageService.getItem('visitedRooms') || '[]';
    const visitedRooms: IStoredRoom[] = JSON.parse(visitedRoomsFromStorage);
    const foundAtIndex = visitedRooms.map(sg => sg.token).indexOf(token);
    if (foundAtIndex >= 0) {
      visitedRooms[foundAtIndex] = {token, roomName, date: new Date()};
    } else {
      visitedRooms.push({token, roomName, date: new Date()});
    }
    this.storageService.setItem('visitedRooms', JSON.stringify(visitedRooms));
  }
}
