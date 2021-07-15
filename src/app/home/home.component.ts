import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';
import {IStoredRoom} from '../model/room';
import {RoomsService} from '../room/rooms.service';
import {ImmediateErrorStateMatcher} from '../utils/error-state-matcher';
import {isNotNull} from '../utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public roomFormControl: FormControl;
  public matcher: ErrorStateMatcher;
  public deletion = false;
  public roomCheckPending$ = this.roomsService.roomCheckPending$;

  private rawVisitedRooms$ = new BehaviorSubject<IStoredRoom[]>([]);
  public visitedRooms$: Observable<IStoredRoom[]> = this.rawVisitedRooms$.pipe(
    map(vr => vr.sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0))),
  );

  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private roomsService: RoomsService,
  ) {
    this.getVisitedRooms();
    this.roomFormControl = new FormControl('', {
      asyncValidators: [this.roomsService.roomExistsValidator()],
    });
    this.matcher = new ImmediateErrorStateMatcher();
  }

  ngOnInit(): void {
    this.roomsService.roomCheck$
      .pipe(
        filter(isNotNull),
        takeUntil(this.destroy$),
      )
      .subscribe(room => {
        console.log('roomCheck$', room);
        this.router.navigate(['..', 'room', room.token]).catch(err => console.error('Navigation error', err));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public visitedRoomClicked(token: string): void {
    if (this.deletion) {
      this.deleteVisitedRoom(token);
    } else {
      this.router.navigate(['..', 'room', token]).catch(err => console.error('Navigation error', err));
    }
  }

  public getVisitedRooms(): void {
    this.rawVisitedRooms$.next(this.roomsService.getVisitedRooms());
  }

  public deleteVisitedRoom(token: string): void {
    this.rawVisitedRooms$.next(this.roomsService.deleteVisitedRoom(token));
  }

  public toggleDeletion(): void {
    this.deletion = !this.deletion;
  }
}
