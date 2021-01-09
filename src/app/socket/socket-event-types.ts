import {IImperiumAction, IJoinRoom} from '../model/imperium';
import {ISatelles} from '../model/satelles';
import {IRoom} from '../model/room';

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
