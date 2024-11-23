import {JsonPipe} from '@angular/common';
import {Component, DestroyRef, inject, input, OnInit, output} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {IArgValue} from '../../model/imperium';
import {IArg, ICommand} from '../../model/satelles';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss'],
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    JsonPipe,
  ],
})
export class CommandComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  public readonly command = input.required<ICommand>();
  public readonly action = output<IArgValue[]>();

  private readonly debouncedSubmit$ = new Subject<IArg[]>();

  ngOnInit(): void {
    this.debouncedSubmit$
      .pipe(debounceTime(100), takeUntilDestroyed(this.destroyRef))
      .subscribe(args => this.submitChanges(...args));
  }

  public submitChanges(...args: IArg[]): void {
    this.action.emit(args);
  }

  public scheduleSubmitChanges(...args: IArg[]): void {
    this.debouncedSubmit$.next(args);
  }
}
