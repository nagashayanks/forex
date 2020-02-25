import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HistoryComponent } from './history.component';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { of } from 'rxjs';
import { PrimeModule } from 'src/app/shared/primeng-module';
import { GridComponent } from 'src/app/shared/grid/grid.component';
describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let api: Service;

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
      declarations: [ HistoryComponent, GridComponent ],
      imports: [SharedModuleModule, HttpClientTestingModule, PrimeModule],
      providers: [
        { provide: Service, useValue: MockUserService },
        UrlConfig]
    })
    .compileComponents();
    api = TestBed.get(Service);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should check modalAction', () => {
    const action =  'Ok';
    component.modalAction(action);
    expect(action).toEqual(action);
  });
});
