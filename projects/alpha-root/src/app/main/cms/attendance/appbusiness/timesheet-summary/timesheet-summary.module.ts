import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CorePageEditComponent, CorePageListComponent, CoreOrgTreeComponent, CoreHeaderParamsComponent, FullscreenModalLoaderComponent, CoreButtonGroupVnsComponent } from "ngx-histaff-alpha";
import { TimesheetSummaryComponent } from "./timesheet-summary.component";

const routes: Routes = [
  {
    path: "",
    component: TimesheetSummaryComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    CorePageEditComponent,
    CorePageListComponent,
    CoreOrgTreeComponent,
    CoreHeaderParamsComponent,
    FullscreenModalLoaderComponent,
    CoreButtonGroupVnsComponent
  ],
  declarations: [TimesheetSummaryComponent],
  // providers: [CoreService],
})
export class TimesheetSummaryModule {}
