import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {IArgValue} from '../../model/imperium';
import {IArg, ICommand} from '../../model/satelles';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit, OnDestroy {
  @Input() public command: ICommand | undefined;
  @Output() public action = new EventEmitter<IArgValue[]>();

  private debouncedSubmit$ = new Subject<IArg[]>();
  private destroy$ = new Subject<void>();

  public trackArgs = (index: number, arg: IArg) => arg.name + arg.type;

  ngOnInit(): void {
    this.debouncedSubmit$
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe(args => this.submitChanges(...args));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public submitChanges(...args: IArg[]): void {
    this.action.emit(args);
  }

  public scheduleSubmitChanges(...args: IArg[]): void {
    this.debouncedSubmit$.next(args);
  }
}
