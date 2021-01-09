export type CommandArgType = 'info' | 'string' | 'number' | 'boolean' | 'color' | 'select' | 'action';

export interface IArg {
  name: string;
  type: CommandArgType;
  infoValue?: string;
  numberMin?: number;
  numberMax?: number;
  numberStep?: number;
  selectOptions?: string[];
  actionName?: string;
}

export interface ICommand {
  name: string;
  args: IArg[];
}

export interface ISatelles {
  id: string;
  name: string;
  commands: ICommand[];
}

// export interface IAnnounce {
//   token: string;
//   roomName: string;
//   satelles: ISatelles;
// }
