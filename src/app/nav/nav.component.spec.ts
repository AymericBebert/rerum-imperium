import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {DeviceService} from '../service/device.service';
import {SettingsService} from '../service/settings.service';
import {StorageModule} from '../storage/storage.module';
import {TranslateTestingModule} from '../testing/translate-testing-module';
import {UpdaterTestingModule} from '../testing/updater-testing.module';
import {ChangeLanguageComponent} from './change-language.component';
import {NavButtonsService} from './nav-buttons.service';
import {NavComponent} from './nav.component';
import {NavService} from './nav.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatSlideToggleModule,
        MatIconModule,
        MatBadgeModule,
        MatMenuModule,
        StorageModule,
        UpdaterTestingModule,
      ],
      declarations: [
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
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
