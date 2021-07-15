import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {NavButtonsService} from '../nav/nav-buttons.service';
import {RoomsService} from '../room/rooms.service';
import {StorageModule} from '../storage/storage.module';
import {SocketTestingModule} from '../testing/socket-testing.module';
import {TranslateTestingModule} from '../testing/translate-testing-module';
import {HomeComponent} from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateTestingModule,
        SocketTestingModule,
        RouterTestingModule,
        StorageModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatSnackBarModule,
      ],
      declarations: [
        HomeComponent,
      ],
      providers: [
        RoomsService,
        NavButtonsService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
