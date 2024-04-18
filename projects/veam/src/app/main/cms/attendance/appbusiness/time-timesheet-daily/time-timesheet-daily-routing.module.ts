import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeTimesheetDailyComponent } from "./time-timesheet-daily.component";
import { TimeTimesheetDailylEditComponent } from './edit/time-timesheet-daily-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: TimeTimesheetDailyComponent,
    children: [
      {
        path: ":id",
        component: TimeTimesheetDailylEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeTimesheetDailyRoutingModule { }