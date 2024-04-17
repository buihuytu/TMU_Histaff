import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportViewComponent } from "./report-view.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CorePageHeaderComponent, CoreOrgTreeComponent, CoreDropdownComponent, CoreDatePickerComponent, CoreListComponent, CoreFormControlSeekerComponent, CoreMonthSelectorComponent, TranslatePipe, CoreControlComponent } from "ngx-histaff-alpha";

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
    ReactiveFormsModule,
    TranslatePipe,
    CorePageHeaderComponent,
    CoreOrgTreeComponent,
    CoreDropdownComponent,
    CoreDatePickerComponent,
    CoreMonthSelectorComponent,
    CoreListComponent,
    CoreFormControlSeekerComponent,
    CoreControlComponent
  ],
  declarations: [
    ReportViewComponent,
  ],
  // providers: [CoreService],
})
export class ReportViewModule { }
