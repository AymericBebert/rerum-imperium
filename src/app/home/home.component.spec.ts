import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {TranslateTestingModule} from '../testing/translate-testing-module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ThingsService} from '../service/things.service';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateTestingModule,
        MatButtonModule,
        MatInputModule,
      ],
      declarations: [
        HomeComponent,
      ],
      providers: [
        ThingsService,
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
