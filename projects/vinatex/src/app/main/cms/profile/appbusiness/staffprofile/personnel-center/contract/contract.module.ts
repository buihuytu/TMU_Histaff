import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';
import { CorePageViewComponent, CoreTabsComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { ContractappendixComponent } from './contractappendix/contractappendix.component';
import { ContractinfoComponent } from './contractinfo/contractinfo.component';


@NgModule({
  declarations: [
    ContractComponent,
    ContractinfoComponent,
    ContractappendixComponent
  ],
  imports: [
    CommonModule,
    TranslatePipe,
    ContractRoutingModule,
    CorePageViewComponent,
    CoreTabsComponent,
  ]
})
export class ContractModule { }
