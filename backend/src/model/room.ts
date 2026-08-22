import {ISatelles} from './satelles';

export interface IRoom {
  token: string;
  roomName: string;
  satellites: ISatelles[];
}
