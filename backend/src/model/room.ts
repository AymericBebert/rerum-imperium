import type {ISatelles} from './satelles.ts';

export interface IRoom {
  token: string;
  roomName: string;
  satellites: ISatelles[];
}
