import {AsyncPipe} from '@angular/common';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {IArgValue} from '../model/imperium';
import {IRoom} from '../model/room';
import {ISatelles} from '../model/satelles';
import {NavButtonsService} from '../nav/nav-buttons.service';
import {ShareService} from '../share/share.service';
import {SocketService} from '../socket/socket.service';
import {CommandComponent} from './command/command.component';
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
  styleUrls: ['./room.component.scss'],
  imports: [
    TranslateModule,
    MatExpansionModule,
    MatIconModule,
    CommandComponent,
    AsyncPipe,
  ],
})
export class RoomComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly navButtonsService = inject(NavButtonsService);
  private readonly shareButtonService = inject(ShareService);
  private readonly translateService = inject(TranslateService);
  private readonly roomsService = inject(RoomsService);
  private readonly socket = inject(SocketService);
  private readonly config = inject<AppConfig>(APP_CONFIG);

  public readonly connectionError$ = this.socket.connectionError$;
  public room: IDisplayedRoom | null = null;

  private readonly expandedPanels = this.roomsService.getExpandedSatelles()
    .filter(es => es.expanded)
    .map(es => es.satellesName);
  private readonly destroy$ = new Subject<void>();

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
