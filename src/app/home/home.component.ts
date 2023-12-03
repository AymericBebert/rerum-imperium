import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';
import {IStoredRoom} from '../model/room';
import {RoomsService} from '../room/rooms.service';
import {ImmediateErrorStateMatcher} from '../utils/error-state-matcher';
import {isNotNull} from '../utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {

  public readonly roomFormControl = new FormControl<string>('', {
    asyncValidators: [this.roomsService.roomExistsValidator()],
  });

  public readonly matcher = new ImmediateErrorStateMatcher();
  public readonly roomCheckPending$ = this.roomsService.roomCheckPending$;
  public deletion = false;

  private readonly rawVisitedRooms$ = new BehaviorSubject<IStoredRoom[]>([]);
  public readonly visitedRooms$: Observable<IStoredRoom[]> = this.rawVisitedRooms$.pipe(
    map(vr => vr.sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0))),
  );

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly roomsService: RoomsService,
  ) {
    this.rejoinLastVisitedRoom();
    this.getVisitedRooms();
  }

  ngOnInit(): void {
    this.roomsService.roomCheck$
      .pipe(
        filter(isNotNull),
        takeUntil(this.destroy$),
      )
      .subscribe(room => {
        console.log('roomCheck$', room);
        this.goToRoom(room.token);
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
      this.goToRoom(token);
    }
  }

  public toggleDeletion(): void {
    this.deletion = !this.deletion;
  }

  private rejoinLastVisitedRoom(): void {
    const lastVisited = this.roomsService.getLastVisitedRoom();
    if (lastVisited) {
      console.log('Auto rejoin', lastVisited);
      this.goToRoom(lastVisited);
    }
  }

  private getVisitedRooms(): void {
    this.rawVisitedRooms$.next(this.roomsService.getVisitedRooms());
  }

  private deleteVisitedRoom(token: string): void {
    this.rawVisitedRooms$.next(this.roomsService.deleteVisitedRoom(token));
  }

  private goToRoom(token: string): void {
    this.router.navigate(['room', token]).catch(err => console.error('Navigation error', err));
  }
}
