import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {EMPTY} from 'rxjs';
import {NavButtonsService} from '../../nav/nav-buttons.service';
import {ShareButtonModule} from '../../share-button/share-button.module';
import {StorageModule} from '../../storage/storage.module';
import {SocketTestingModule} from '../../testing/socket-testing.module';
import {TranslateTestingModule} from '../../testing/translate-testing-module';
import {RoomsService} from '../rooms.service';
import {CommandComponent} from './command.component';

describe('CommandComponent', () => {
  let component: CommandComponent;
  let fixture: ComponentFixture<CommandComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateTestingModule,
        RouterTestingModule,
        SocketTestingModule,
        ShareButtonModule,
        MatIconModule,
        MatDialogModule,
        StorageModule,
      ],
      declarations: [
        CommandComponent,
      ],
      providers: [
        {provide: ActivatedRoute, useValue: {paramMap: EMPTY}},
        RoomsService,
        NavButtonsService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
