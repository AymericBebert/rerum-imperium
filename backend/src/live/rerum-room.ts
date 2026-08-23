import {Subject} from 'rxjs';
import type {Server, Socket} from 'socket.io';
import {config} from '../config.ts';
import {emitEvent, type EmittedEventTypes} from '../events.ts';
import type {IImperiumAction} from '../model/imperium.ts';
import type {IRoom} from '../model/room.ts';
import type {ICommand, ISatelles} from '../model/satelles.ts';

export class RerumRoom {
  public destroy$: Subject<void> = new Subject<void>();
  private _satellites: { [id: string]: { socket: Socket, satelles: ISatelles } } = {};

  constructor(private readonly _io: Server,
              private readonly _token: string,
              private readonly _roomName: string,
  ) {
  }

  public get room(): IRoom {
    return {
      token: this._token,
      roomName: this._roomName,
      satellites: Object.values(this._satellites)
        .map(s => s.satelles)
        .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)),
    };
  }

  public get socketRoom(): string {
    return this._token;
  }

  public addSatelles(socket: Socket, satelles: ISatelles): boolean {
    const names = Object.values(this._satellites).map(s => s.satelles.name);
    if (!this._satellites[satelles.id]) {
      const satellesRootName = satelles.name;
      let i = 0;
      while (names.indexOf(satelles.name) !== -1) {
        i += 1;
        satelles.name = `${satellesRootName}_${i}`;
      }
    }
    this._satellites[satelles.id] = {socket, satelles};
    this.emit('room', this.room);
    return true;
  }

  public removeSatelles(id: string): boolean {
    if (!this._satellites[id]) {
      return false;
    }
    this._satellites[id].socket.disconnect(true);
    delete this._satellites[id];
    this.emit('room', this.room);
    return true;
  }

  public updateSatelles(id: string, commands: ICommand[]): boolean {
    if (!this._satellites[id]) {
      return false;
    }
    this._satellites[id].satelles.commands = commands;
    this.emit('room', this.room);
    return true;
  }

  public getSatellesCount(): number {
    return Object.keys(this._satellites).length;
  }

  public async addImperium(socket: Socket): Promise<boolean> {
    try {
      await socket.join(this.socketRoom);
    } catch (e) {
      console.error(e);
      return false;
    }
    emitEvent(socket, 'room', this.room);
    return true;
  }

  public async removeImperium(socket: Socket): Promise<boolean> {
    try {
      await socket.leave(this.socketRoom);
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  public getImperiumCount(): Promise<number> {
    return this._io.sockets.adapter.sockets(new Set([this.socketRoom])).then(s => s.size);
  }

  public imperiumAction(action: IImperiumAction): boolean {
    const satelles = this._satellites[action.satellesId];
    if (satelles) {
      emitEvent(satelles.socket, 'imperium action', action);
      return true;
    }
    return false;
  }

  public destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public emit<T extends keyof EmittedEventTypes>(eventName: T, ...args: Array<EmittedEventTypes[T]>): void {
    if (config.debugSocket) {
      console.log(`socket< [${this.socketRoom}] ${eventName}: ${JSON.stringify(args[0])?.substr(0, 999)}`);
    } else {
      console.log(`Emitting event to clients of ${this.socketRoom}: ${eventName}`);
    }
    this._io.to(this.socketRoom).emit(eventName, ...args);
  }
}
