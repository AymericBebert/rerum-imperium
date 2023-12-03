import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {IArgValue} from '../../model/imperium';
import {IArg, ICommand} from '../../model/satelles';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
  ],
})
export class CommandComponent implements OnInit, OnDestroy {
  @Input() public command: ICommand | undefined;
  @Output() public action = new EventEmitter<IArgValue[]>();

  private readonly debouncedSubmit$ = new Subject<IArg[]>();
  private readonly destroy$ = new Subject<void>();

  public readonly trackArgs = (index: number, arg: IArg) => arg.name + arg.type;

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
