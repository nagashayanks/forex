import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoneyExchangeRoutingModule } from './money-exchange-routing.module';
import { TransferComponent } from './transfer/transfer.component';
import { PrimeModule } from 'src/app/shared/primeng-module';
import { MessageService } from 'primeng/api';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';


@NgModule({
  declarations: [TransferComponent],
  imports: [
    CommonModule,
    MoneyExchangeRoutingModule,
    PrimeModule,
    SharedModuleModule,
  ],
  providers: [MessageService]
})
export class MoneyExchangeModule { }
