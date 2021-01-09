import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {DirectHomeComponent} from './direct-home.component';
import {TranslateTestingModule} from '../testing/translate-testing-module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ThingsService} from '../service/things.service';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

describe('DirectHomeComponent', () => {
  let component: DirectHomeComponent;
  let fixture: ComponentFixture<DirectHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateTestingModule,
        MatButtonModule,
        MatInputModule,
      ],
      declarations: [
        DirectHomeComponent,
      ],
      providers: [
        ThingsService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
