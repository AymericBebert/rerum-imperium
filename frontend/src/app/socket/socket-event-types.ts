import {IImperiumAction, IJoinRoom} from '../model/imperium';
import {IRoom} from '../model/room';
import {ISatelles} from '../model/satelles';

/* eslint-disable @typescript-eslint/naming-convention */
export interface ReceivedEventTypes {
  'connect': void;
  'disconnect': void;
  'room': IRoom;
  'satelles add': ISatelles;
  'satelles remove': string;
  'imperium action': IImperiumAction;
  'display error': string;
}

export interface EmittedEventTypes {
  'imperium join': IJoinRoom;
  'imperium exit': void;
  'imperium action': IImperiumAction;
  'disconnect': void;
}
