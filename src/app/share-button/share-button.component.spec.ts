import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {TranslateTestingModule} from '../testing/translate-testing-module';
import {ShareButtonComponent} from './share-button.component';

describe('ShareButtonComponent', () => {
  let component: ShareButtonComponent;
  let fixture: ComponentFixture<ShareButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ShareButtonComponent,
        TranslateTestingModule,
      ],
      declarations: [],
      providers: [],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
