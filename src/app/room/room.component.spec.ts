import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RoomComponent} from './room.component';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateTestingModule} from '../testing/translate-testing-module';
import {MatDialogModule} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {EMPTY} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {ShareButtonModule} from '../share-button/share-button.module';
import {SocketTestingModule} from '../testing/socket-testing.module';
import {NavButtonsService} from '../nav/nav-buttons.service';
import {RoomsService} from './rooms.service';
import {StorageModule} from '../storage/storage.module';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;

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
        RoomComponent,
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
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
