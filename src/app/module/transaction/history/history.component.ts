import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { TransactionSummary } from 'src/app/model/model';
import { CommonService } from 'src/app/service/common-service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  spinner = false;
  submitted = false;
  transactionHistoryList: TransactionSummary[];
  gridColumns = [];
  pagination = true;
  sorting = true;
  pageLinks = 5;
  constructor(
    private api: Service,
    private url: UrlConfig,
    private common: CommonService) { }

  /* configure the grid columns */
  private generateGridColumn(): void {
    this.gridColumns = [
      {
        colName: 'To Account',
        rowName: 'destinationAccountNumber',
      }, {
        colName: 'Amount',
        rowName: 'transactionAmount',
      }, {
        colName: 'Transaction Type',
        rowName: 'transactionType',
      }, {
        colName: 'Transaction Date',
        rowName: 'transactionDate',
      },
      {
        colName: 'Balance',
        rowName: 'availableBalance',
      }
    ];

  }

  /*  Get transaction history*/
  private getSummary() {
    this.submitted = true;
    this.generateGridColumn();
    this.spinner = true;
    const account = sessionStorage.getItem('accountNumber');
    const params = `/${account}/transactions`;
    /* Api call*/
    this.api.getList(this.url.urlConfig().transactionHistory.concat(params))
      .subscribe(summary => {
        this.spinner = false;
        if (summary) {
          this.transactionHistoryList = summary;
        } else {
          this.common.alertConfig = this.common.modalConfig('Error', summary.message, true, [{ name: 'Ok' }]);
        }
      },
      error => {
        this.spinner = false;
      });
  }

  /* Modal Action */
  public modalAction(action: string): void {
    if (action === 'Ok') {
      this.common.alertConfigDefaultValue();
    }
  }
  ngOnInit() {
    this.getSummary();
  }

}
