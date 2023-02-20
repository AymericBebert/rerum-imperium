import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {IArgValue} from '../model/imperium';
import {IRoom} from '../model/room';
import {ICommand, ISatelles} from '../model/satelles';
import {NavButtonsService} from '../nav/nav-buttons.service';
import {ShareButtonService} from '../share-button/share-button.service';
import {SocketService} from '../socket/socket.service';
import {RoomsService} from './rooms.service';

interface IDisplayedSatelles extends ISatelles {
  expanded: boolean;
}

interface IDisplayedRoom extends IRoom {
  satellites: IDisplayedSatelles[];
}

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  public readonly connectionError$ = this.socket.connectionError$;
  public room: IDisplayedRoom | null = null;

  private readonly expandedPanels = this.roomsService.getExpandedSatelles().filter(es => es.expanded).map(es => es.satellesName);
  private readonly destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private navButtonsService: NavButtonsService,
              private shareButtonService: ShareButtonService,
              private translateService: TranslateService,
              private roomsService: RoomsService,
              private socket: SocketService,
              @Inject(APP_CONFIG) private config: AppConfig,
  ) {
  }

  ngOnInit(): void {
    this.roomsService.currentRoom$
      .pipe(takeUntil(this.destroy$))
      .subscribe(room => this.room = room ? {
        ...room,
        roomName: room.roomName.trim() || '...',
        satellites: room.satellites.map(s => ({...s, expanded: this.expandedPanels.includes(s.name)})),
      } : room);

    this.navButtonsService.navButtonClicked$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(btn => {
        switch (btn) {
          case 'share':
            this.shareRoom(this.room);
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

  public expandedChanged(name: string, expanded: boolean) {
    this.roomsService.setExpandedSatelles(name, expanded);
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
