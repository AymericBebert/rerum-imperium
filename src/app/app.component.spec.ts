import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {ChangeLanguageComponent} from './nav/change-language.component';
import {NavButtonsService} from './nav/nav-buttons.service';
import {NavComponent} from './nav/nav.component';
import {NavService} from './nav/nav.service';
import {DeviceService} from './service/device.service';
import {SettingsService} from './service/settings.service';
import {StorageModule} from './storage/storage.module';
import {TranslateTestingModule} from './testing/translate-testing-module';
import {UpdaterTestingModule} from './testing/updater-testing.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateTestingModule,
        RouterTestingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatSlideToggleModule,
        MatIconModule,
        MatBadgeModule,
        MatMenuModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        StorageModule,
        UpdaterTestingModule,
      ],
      declarations: [
        AppComponent,
        NavComponent,
        ChangeLanguageComponent,
      ],
      providers: [
        NavService,
        NavButtonsService,
        SettingsService,
        DeviceService,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
