import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {EMPTY} from 'rxjs';
import {ICommand} from '../../model/satelles';
import {SocketTestingModule} from '../../testing/socket-testing.module';
import {translateTestingProviders} from '../../testing/translate-testing-providers';
import {CommandComponent} from './command.component';

describe('CommandComponent', () => {
  let component: CommandComponent;
  let fixture: ComponentFixture<CommandComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommandComponent,
        RouterTestingModule,
        SocketTestingModule,
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        {provide: ActivatedRoute, useValue: {paramMap: EMPTY}},
        translateTestingProviders,
      ],
    });

    fixture = TestBed.createComponent(CommandComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('command', {name: 'hello', type: 'info'} satisfies ICommand);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
