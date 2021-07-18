import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IArgValue} from '../../model/imperium';
import {IArg, ICommand} from '../../model/satelles';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent {
  @Input() public command: ICommand | undefined;
  @Output() public action = new EventEmitter<IArgValue[]>();

  public trackArgs = (index: number, arg: IArg) => arg.name + arg.type;

  public submitChanges(): void {
    this.action.emit(this.command?.args ?? []);
  }
}
