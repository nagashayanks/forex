import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import {CarouselModule} from 'primeng/carousel';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    TableModule,
    CardModule,
    CalendarModule,
    DropdownModule,
    RadioButtonModule,
    ButtonModule,
    CarouselModule,
    InputTextModule,
    ToastModule
  ],
  providers: [],
  exports: [ CardModule, CalendarModule, DropdownModule, TableModule, CarouselModule, RadioButtonModule,
     ButtonModule, InputTextModule, ToastModule ]
})
export class PrimeModule { }
