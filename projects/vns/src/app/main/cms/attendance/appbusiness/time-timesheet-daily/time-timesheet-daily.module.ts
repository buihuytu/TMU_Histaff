import { NgModule } from "@angular/core";
import { TimeTimesheetDailyRoutingModule } from "./time-timesheet-daily-routing.module";
import { CommonModule } from "@angular/common";
import { CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreCompositionComponent, CoreOrgTreeComponent, CoreDropdownComponent, CoreButtonGroupVnsComponent, CoreDatePickerComponent, CoreFormControlSeekerComponent, CoreChecklistComponent, FullscreenModalLoaderComponent, CoreCheckboxComponent, TranslatePipe, TableCellPipe } from "ngx-histaff-alpha";
import { TimeTimesheetDailylEditComponent } from "./edit/time-timesheet-daily-edit.component";
import { TimeTimesheetDailyComponent } from "./time-timesheet-daily.component";
import { FormsModule } from "@angular/forms";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    TableCellPipe,
    CorePageListComponent,
    CorePageEditComponent,
    TimeTimesheetDailyRoutingModule,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreOrgTreeComponent,
    CoreDropdownComponent,
    CoreButtonGroupVnsComponent,
    CoreDatePickerComponent,
    CoreFormControlSeekerComponent,
    CoreChecklistComponent,
    FullscreenModalLoaderComponent,
    CoreCheckboxComponent
  ],
  declarations: [TimeTimesheetDailyComponent, TimeTimesheetDailylEditComponent],
  // providers: [CoreService],
})
export class TimeTimesheetDailyModule {}
