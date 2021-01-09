import {ISatelles} from './satelles';

export interface IRoom {
  token: string;
  roomName: string;
  satellites: ISatelles[];
}

export interface IStoredRoom {
  token: string;
  roomName: string;
  date: Date;
}
