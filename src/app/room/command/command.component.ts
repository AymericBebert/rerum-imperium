import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatSliderChange} from '@angular/material/slider';
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

  constructor() {
  }

  public trackArgs = (index: number, arg: IArg) => arg.name + arg.type;

  public booleanChange(arg: IArg, $event: MatCheckboxChange): void {
    const args = this.command?.args ?? [];
    args.forEach(a => {
      if (a.name === arg.name) {
        a.booleanValue = $event.checked;
      }
    });
    this.action.emit(args);
  }

  public numberChange(arg: IArg, $event: MatSliderChange): void {
    const args = this.command?.args ?? [];
    args.forEach(a => {
      if (a.name === arg.name) {
        a.numberValue = $event.value || undefined;
      }
    });
    this.action.emit(args);
  }
}
