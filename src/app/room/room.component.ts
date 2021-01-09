import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {map, takeUntil, withLatestFrom} from 'rxjs/operators';
import {StorageService} from '../storage/storage.service';
import {NavButtonsService} from '../service/nav-buttons.service';
import {ShareButtonService} from '../share-button/share-button.service';
import {SocketService} from '../socket/socket.service';
import {environment} from '../../environments/environment';
import {RoomsService} from '../service/rooms.service';
import {IRoom} from '../model/room';
import {IArgValue} from '../model/imperium';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  public room$ = this.roomsService.currentRoom$;

  // public players$: Observable<EnrichedPlayer[]> = this.room$.pipe(
  //   filter(room => room !== null),
  //   map(game => {
  //   }),
  // );

  public connectionError$ = this.socket.connectionError$;

  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private storageService: StorageService,
              private navButtonsService: NavButtonsService,
              private shareButtonService: ShareButtonService,
              private translateService: TranslateService,
              private roomsService: RoomsService,
              private socket: SocketService,
  ) {
  }

  ngOnInit(): void {
    this.navButtonsService.navButtonClicked$()
      .pipe(
        withLatestFrom(this.room$),
        takeUntil(this.destroy$),
      )
      .subscribe(([btn, room]) => {
        switch (btn) {
          case 'share':
            this.shareRoom(room);
            break;
        }
      });

    this.route.paramMap
      .pipe(map(params => params.get('token')), takeUntil(this.destroy$))
      .subscribe(token => this.roomsService.setCurrentRoomToken(token));
  }

  ngOnDestroy(): void {
    this.roomsService.setCurrentRoomToken(null);

    this.destroy$.next();
    this.destroy$.complete();
  }

  public imperiumAction(satellesId: string, commandName: string, args: IArgValue[]) {
    this.socket.emit('imperium action', {
      satellesId,
      commandName,
      args,
    });
  }

  private shareRoom(room: IRoom | null) {
    const shareTitle = this.translateService.instant('room.share.title');
    const shareText = this.translateService.instant('room.share.text');
    if (room === null) {
      console.error('Trying to share but room is null?');
    } else {
      this.shareButtonService.shareOrCopy(shareTitle, shareText, environment.websiteUrl + `/room/${room.token}`);
    }
  }
}
