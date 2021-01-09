export type CommandType = 'info' | 'action' | 'complex';
export type CommandArgType = 'string' | 'number' | 'boolean' | 'color' | 'select';

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
  type: CommandType;
  args?: IArg[];
}

export interface ISatelles {
  id: string;
  name: string;
  commands: ICommand[];
}
