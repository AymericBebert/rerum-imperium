import {CommandArgType} from './satelles';

export interface IJoinRoom {
  token: string;
}

export interface IArgValue {
  name: string;
  type: CommandArgType;
  stringValue?: string;
  numberValue?: number;
  booleanValue?: boolean;
  colorValue?: string;
  selectValue?: string;
}

export interface IImperiumAction {
  id: string;
  args: IArgValue[];
}
