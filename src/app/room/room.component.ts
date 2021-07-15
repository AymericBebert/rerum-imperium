import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {map, takeUntil, withLatestFrom} from 'rxjs/operators';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {IArgValue} from '../model/imperium';
import {IRoom} from '../model/room';
import {ICommand, ISatelles} from '../model/satelles';
import {NavButtonsService} from '../nav/nav-buttons.service';
import {ShareButtonService} from '../share-button/share-button.service';
import {SocketService} from '../socket/socket.service';
import {StorageService} from '../storage/storage.service';
import {RoomsService} from './rooms.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  public room$ = this.roomsService.currentRoom$;
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
              @Inject(APP_CONFIG) private config: AppConfig,
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

  public trackSatelles = (index: number, satelles: ISatelles) => satelles.id;

  public trackCommand = (index: number, command: ICommand) => command.name;

  public imperiumAction(satellesId: string, commandName: string, args: IArgValue[]): void {
    this.socket.emit('imperium action', {
      satellesId,
      commandName,
      args,
    });
  }

  private shareRoom(room: IRoom | null): void {
    const shareTitle = this.translateService.instant('room.share.title');
    const shareText = this.translateService.instant('room.share.text');
    if (room === null) {
      console.error('Trying to share but room is null?');
    } else {
      this.shareButtonService.shareOrCopy(shareTitle, shareText, `${this.config.websiteUrl}/room/${room.token}`);
    }
  }
}
