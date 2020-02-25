import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AlertComponent } from './alert/alert.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { Service } from '../service/service';
import { AuthGuard } from '../service/auth-guard';
import { UrlConfig } from '../service/url-config';
import { ConstantService } from '../service/constant';
import { CommonService } from 'src/app/service/common-service';
import { OnlynumberDirective } from 'src/app/helper/allow-number.directive';

@NgModule({
  declarations: [AlertComponent, SpinnerComponent, OnlynumberDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    Service,
    AuthGuard,
    UrlConfig,
    ConstantService,
    CommonService
  ],
  exports: [ FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    SpinnerComponent,
    OnlynumberDirective ]
})
export class SharedModuleModule { }
