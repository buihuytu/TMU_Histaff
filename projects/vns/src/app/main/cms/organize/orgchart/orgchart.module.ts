import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreIosSwitcherComponent, CoreLoadingSurfaceComponent, CoreOrgchartflexComponent, CorePageHeaderComponent, MapAvatarToServerPipe, TableCellPipe, TooltipDirective, TranslatePipe } from 'ngx-histaff-alpha';
import { OrgchartRoutingModule } from './orgchart-routing.module';
import { OrgchartComponent } from './orgchart.component';

@NgModule({
  declarations: [
    OrgchartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    TableCellPipe,
    MapAvatarToServerPipe,
    CorePageHeaderComponent,
    OrgchartRoutingModule,
    CoreOrgchartflexComponent,
    CoreLoadingSurfaceComponent,
    TooltipDirective,
    CoreIosSwitcherComponent
  ]
})
export class OrgchartModule { }
