import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './service/auth-guard';


const routes: Routes = [
    {
      path: '',
      loadChildren: () => import(`./module/member/member.module`).then(m => m.MemberModule)
    },
    {
      path: 'login',
      loadChildren: () => import(`./module/member/member.module`).then(m => m.MemberModule)
    },
    {
      path: 'transfer',
      loadChildren: () => import(`./module/money-exchange/money-exchange.module`).then(m => m.MoneyExchangeModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'transaction',
      loadChildren: () => import(`./module/transaction/transaction.module`).then(m => m.TransactionModule),
      canActivate: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
