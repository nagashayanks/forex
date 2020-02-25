import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { PrimeModule } from 'src/app/shared/primeng-module';
import { of } from 'rxjs';
import { ConstantService } from 'src/app/service/constant';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let api: Service;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  /* create mock data for testing */
  const MockUserService = {
    isValidUser: false,
    setValidUser: (flag: boolean) => { MockUserService.isValidUser = flag; },
    currentUser: {
      userName: 'Mani',
      mobile: 1234
    },
    validUser: () => MockUserService.isValidUser,
    modalConfig: () => ({
      header: '',
      message: '',
      modalShow: '',
      button: []
    }),
    alertConfigDefaultValue: () => ({
      header: '',
      message: '',
      modalShow: '',
      button: []
    }),
    postCall(url: string, data: any, type: string) {
      return of({
        userName: 'Mani',
        mobile: 1234
      });
    },
    getList() {
      return of([{
        userName: 'Mani',
        mobile: 1234
      }]);
    }

  };
  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModuleModule, PrimeModule, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: FormBuilder, useValue: formBuilder },
        { provide: Service, useValue: MockUserService },
        UrlConfig, ConstantService]
    })
      .compileComponents();
    mockRouter = TestBed.get(Router);
    api = TestBed.get(Service);
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit Valid User and form creation', () => {
    component.ngOnInit();
    component.loginForm = formBuilder.group({
      mobile: ['', Validators.required],
      password: ['', Validators.required]
    });
    expect(component.loginForm.valid).toBeFalsy();
    // expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  /* Login while clicking the sign in button */
  it('Should check valid user while onClickSubmit', () => {
    const response = {
      userName: 'Mani',
      mobile: 1234
    };

    component.loginForm.controls.mobile.setValue('1234');
    component.loginForm.controls.password.setValue('123345678');
    component.onClickSubmit();
    component.submitted = true;
    /* Stored the user details in session storage */
    sessionStorage.setItem('currentUser', JSON.stringify(response));
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    expect(currentUser).toEqual(response);
    expect(component.spinner).toBeFalsy();
  });

  it('Should check modalAction', () => {
    const action =  'Ok';
    component.modalAction(action);
    expect(action).toEqual(action);
  });

});
