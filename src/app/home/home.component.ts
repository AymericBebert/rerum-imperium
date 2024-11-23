import {AsyncPipe} from '@angular/common';
import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Router} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {filter} from 'rxjs/operators';
import {IStoredRoom} from '../model/room';
import {RoomsService} from '../room/rooms.service';
import {ImmediateErrorStateMatcher} from '../utils/error-state-matcher';
import {isNotNull} from '../utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    AsyncPipe,
  ],
})
export class HomeComponent implements OnInit {
  private readonly roomsService = inject(RoomsService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  public readonly roomFormControl = new FormControl<string>('', {
    asyncValidators: [this.roomsService.roomExistsValidator()],
  });

  public readonly matcher = new ImmediateErrorStateMatcher();
  public readonly roomCheckPending$ = this.roomsService.roomCheckPending$;
  public deletion = false;

  public readonly visitedRooms = signal<IStoredRoom[]>([]);

  constructor() {
    this.rejoinLastVisitedRoom();
    this.getVisitedRooms();
  }

  ngOnInit(): void {
    this.roomsService.roomCheck$
      .pipe(
        filter(isNotNull),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(room => {
        console.log('roomCheck$', room);
        this.goToRoom(room.token);
      });
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

  private setVisitedRooms(rooms: IStoredRoom[]): void {
    this.visitedRooms.set(rooms.sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0)));
  }

  private getVisitedRooms(): void {
    this.setVisitedRooms(this.roomsService.getVisitedRooms());
  }

  private deleteVisitedRoom(token: string): void {
    this.setVisitedRooms(this.roomsService.deleteVisitedRoom(token));
  }

  private goToRoom(token: string): void {
    this.router.navigate(['room', token]).catch(err => console.error('Navigation error', err));
  }
}
