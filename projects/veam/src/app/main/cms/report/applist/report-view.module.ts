import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportViewComponent } from "./report-view.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CorePageHeaderComponent, CoreOrgTreeComponent, CoreDropdownComponent, CoreDatePickerComponent, CoreListComponent, CoreFormControlSeekerComponent, CoreMonthSelectorComponent, TranslatePipe, CoreChecklistComponent } from "ngx-histaff-alpha";

const routes: Routes = [
  {
    path: "",
    component: ReportViewComponent,
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    TranslatePipe,
    CorePageHeaderComponent,
    CoreOrgTreeComponent,
    CoreDropdownComponent,
    CoreDatePickerComponent,
    CoreMonthSelectorComponent,
    CoreListComponent,
    CoreFormControlSeekerComponent,
    CoreChecklistComponent,
  ],
  declarations: [
    ReportViewComponent,
  ],
  // providers: [CoreService],
})
export class ReportViewModule { }
