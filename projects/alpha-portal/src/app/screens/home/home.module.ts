import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { QuickLinksComponent } from './quick-links/quick-links.component';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';

import { QuickNumberComponent } from './quick-number/quick-number.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ActivityBarsComponent } from './charts/activity-bars/activity-bars.component';
import { FavouriteScreensComponent } from './charts/favourite-screens/favourite-screens.component';
import { HistoryApproveComponent } from './history-approve/history-approve.component';
import { RegisterOffModule } from '../register-off/register-off.module';
import { HomeExplainWorkComponent } from './home-explain-work/home-explain-work.component';
import { FormsModule } from '@angular/forms';
import { CoreButtonGroupVnsComponent, CoreCheckboxComponent, CoreDatePickerComponent, CoreDropdownComponent, CoreLineComponent, CoreMonthPickerComponent, CoreYearPickerComponent, MapAvatarToServerPipe, NormalizeHumanNamePipe, TableCellPipe, TooltipDirective, TranslatePipe } from 'ngx-histaff-alpha';
import { BaseSliderModule } from '../../components/base-slider/base-slider.module';

@NgModule({
  declarations: [
    HomeComponent,
    QuickNumberComponent,
    QuickLinksComponent,
    CommingSoonComponent,
    ActivityBarsComponent,
    FavouriteScreensComponent,
    HistoryApproveComponent,
    HomeExplainWorkComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BaseSliderModule,
    NgxChartsModule,
    RegisterOffModule,
    CoreDatePickerComponent,
    CoreDropdownComponent,
    CoreMonthPickerComponent,
    CoreLineComponent,
    CoreYearPickerComponent,
    CoreButtonGroupVnsComponent,
    CoreCheckboxComponent,
    FormsModule,
    TranslatePipe,
    TableCellPipe,
    NormalizeHumanNamePipe,
    MapAvatarToServerPipe,
    TooltipDirective,
  ]
})
export class HomeModule { }
