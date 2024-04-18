import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractListRoutingModule } from './contract-list-routing.module';
import { ContractListComponent } from './contract-list/contract-list.component';
import { FormsModule } from '@angular/forms';
import { CoreLoadingSurfaceComponent, CoreReducerIconComponent, MapAvatarToServerPipe, NormalizeHumanNamePipe, TableCellPipe, ThreedotsComponent, TooltipDirective, TranslatePipe } from 'ngx-histaff-alpha';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';

@NgModule({
  declarations: [
    ContractListComponent,
    ContractDetailComponent
  ],
  imports: [
    CommonModule,
    ContractListRoutingModule,
    CoreReducerIconComponent,
    CoreLoadingSurfaceComponent,
    FormsModule,
    ThreedotsComponent,
    TranslatePipe,
    TableCellPipe,
    NormalizeHumanNamePipe,
    MapAvatarToServerPipe,
    TooltipDirective,
  ]
})
export class ContractListModule { }
