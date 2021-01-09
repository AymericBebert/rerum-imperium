import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ICommand} from '../../model/satelles';
import {IArgValue} from '../../model/imperium';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent {

  @Input() public command: ICommand;
  @Output() public action = new EventEmitter<IArgValue[]>();

  constructor() {
  }
}
