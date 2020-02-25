/**
 * Importing all the necessary modules from the angular core module
 */
import { Component, OnInit } from '@angular/core';
/**
 * Importing  FormBuilder, Validators from angular forms
 */
import { FormBuilder, Validators } from '@angular/forms';
/**
 * Importing data service from the Model layer
 */
import { Service } from 'src/app/service/service';
import { CommonService } from 'src/app/service/common-service';

import { UrlConfig } from 'src/app/service/url-config';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  countries;
  spinner = false;
  showAccount: boolean;
  changedValue: any;
  convertedlist: any;
  accNoSummary: any;
  constructor(private builder: FormBuilder,
              private api: Service,
              private url: UrlConfig,
              public commonService: CommonService,
  ) {
  }
  /**
   * Assigning group method of FormBuilder service to a transferForm for validations.
   */
  transferForm = this.builder.group({
    selectedCountry: ['INR', Validators.required],
    amount: ['', Validators.required],
    accNo: ['', Validators.required],
    convetedValue: ['']
  });

  ngOnInit() {
    this.showAccount = false;
    this.getCountries();
    this.getAccountSummary();
  }

  /**
   * method to fetch all currency values for dropdown
   */
  getCountries = () => {
    this.api.getList(this.url.urlConfig().currencies).subscribe(order => {
      this.spinner = false;
      this.countries = order;
    }, error => {
      this.spinner = false;
    });
  }

  /**
   * onchange event for caluclating conversion amount value
   */
  onChangeCity(event) {
    this.changedValue = event.value;
    const domEvent = event.originalEvent;
    this.convertCurrency();
  }

  /**
   * method for converting the currency
   */
  convertCurrency = () => {
    const params = `?from=INR&to=${this.changedValue.code}&amount=${this.transferForm.value.amount}`;
    this.api.getList(this.url.urlConfig().exchange.concat(params)).subscribe(order => {
      this.spinner = false;
      this.transferForm.patchValue({ convetedValue: order.convertedAmount });
      this.convertedlist = order;

    }, error => {
      this.spinner = false;
    });
  }

  /**
   * method to transfer the currency
   */
  transferCurrency = () => {
    const requestObject = {
      userId: `${this.commonService.loggedUser().userId}`,
      destinationAccountNumber: this.transferForm.value.accNo,
      transactionAmount: this.transferForm.value.amount
    };
    this.api.postCall(this.url.urlConfig().transfer, requestObject, 'post').subscribe(order => {
      this.spinner = false;
      // tslint:disable-next-line: no-string-literal
      if (order['statusCode'] === 200) {
        this.commonService.alertConfig = this.commonService.modalConfig(
          '', 'amount transfered Successfully',
          true, [{ name: 'Ok' }]
        );
      } else {
        this.commonService.alertConfig = this.commonService.modalConfig(
          'error', 'amount transfer Failed!..',
          true, [{ name: 'Ok' }]
        );
      }
    });
  }

  toggleshow($event) {
    if (this.showAccount !== true) {
      this.showAccount = true;
    } else {
      this.showAccount = false;
    }
  }

  public checkAmount(amount) {
    if (Number(amount) > 0) {
    } else {
      this.commonService.alertConfig = this.commonService.modalConfig('Error', 'Amont should be atleast one', true, [{ name: 'Ok' }]);
    }
  }

  getAccountSummary = () => {
    const param = `${this.commonService.loggedUser().userId}`;
    this.api.getList(this.url.urlConfig().accounts.concat(param)).subscribe(order => {
      this.spinner = false;
      this.accNoSummary = order;
      sessionStorage.setItem('accountNumber', order.accountNumber);
    }, error => {
      this.spinner = false;
    });
  }

  
  /* Modal Action */
  public modalAction(action: string): void {
    if (action === 'Ok') {
      this.commonService.alertConfigDefaultValue();
    }
  }
}
