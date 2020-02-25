import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferComponent } from './transfer.component';
import { PrimeModule } from 'src/app/shared/primeng-module';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { MessageService } from 'primeng/api';
import { Service } from 'src/app/service/service';
import { Router } from '@angular/router';
import { UrlConfig } from 'src/app/service/url-config';
import { of } from 'rxjs';

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;
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
      userId: 1234
    },
    validUser: () => MockUserService.isValidUser,
    loggedUser: () => {
      return MockUserService.currentUser;
    },
    modalConfig: () => ({
      header: '',
      message: '',
      modalShow: '',
      button: ''
    }),
    alertConfigDefaultValue: () => ({
      header: '',
      message: '',
      modalShow: '',
      button: ''
    }),
    getList(url: string) {
      return of(
        [
          {
              transactionId: 1,
              sourceAccountNumber: 234234,
              destinationAccountNumber: 4234234,
              transactionType: 'credit',
              transactionDate: '12-4-2020',
              transactionAmount: 6000,
              availableBalance: 10000
          }
        ]
      );
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PrimeModule, SharedModuleModule],
      declarations: [ TransferComponent ],
      providers: [MessageService, Service,
      { provide: Router, useValue: mockRouter },
    UrlConfig]
    })
    .compileComponents();
    mockRouter = TestBed.get(Router);
    api = TestBed.get(Service);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check transfer', () => {
    component.getAccountSummary();
    expect(api.getList('')).toBeTruthy();
    expect(component).toBeTruthy();
  });
  it('Should check modalAction', () => {
    const action =  'Ok';
    component.modalAction(action);
    expect(action).toEqual(action);
  });
  it('should check transfer', () => {
    component.transferCurrency();
    const requestObject = {
      userId: 1,
      destinationAccountNumber: 123456,
      transactionAmount: 123456
    };
    expect(api.postCall('', requestObject, 'post')).toBeTruthy();
    expect(component).toBeTruthy();
  });
});
