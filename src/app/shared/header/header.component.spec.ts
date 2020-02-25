import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService  } from 'src/app/service/notification-service';
import { of } from 'rxjs';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let notification: NotificationService;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const MockUserService = {
    isValidUser: false,
    currentUser: {
      userName: 'Mani',
      userId: 1234,
    },
    getMessage: () => {
      return of({
        userName: 'Mani',
        userId: 1234,
      });
    },
    clearMessages: () => {}
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: NotificationService, useValue: MockUserService },
        { provide: ActivatedRoute, useValue: mockRouter }]
    })
    .compileComponents();
    notification = TestBed.get(NotificationService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate toggle ', () => {
    component.toggleFlag = true;
    component.toggle();
    expect(component.toggleFlag).toBe(false);
  });
  it('should validate logout ', () => {
    sessionStorage.clear();
    notification.clearMessages();
    component.logout();
  });
});
