import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { HistoryComponent } from './history/history.component';
import { SharedModuleModule } from '../../shared/shared-module.module';
import { PrimeModule } from 'src/app/shared/primeng-module';
import { GridComponent } from 'src/app/shared/grid/grid.component';

@NgModule({
  declarations: [HistoryComponent, GridComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModuleModule,
    PrimeModule
  ]
})
export class TransactionModule { }
