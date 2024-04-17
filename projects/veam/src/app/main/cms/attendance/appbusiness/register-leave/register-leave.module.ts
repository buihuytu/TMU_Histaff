import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RegisterLeaveComponent } from "./register-leave.component";
import { LeaveEditComponent } from "./leave-edit/leave-edit.component";
import { CanDeactivateGuard, CoreOrgTreeComponent, CorePageListComponent, CorePageEditComponent, CoreDropdownComponent, CoreDatePickerComponent, CoreButtonGroupVnsComponent } from "ngx-histaff-alpha";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: RegisterLeaveComponent
  },
  {
    path: ":id",
    component: LeaveEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    CoreOrgTreeComponent,
    CorePageListComponent,
    CorePageEditComponent,
    CoreDropdownComponent,
    CoreDatePickerComponent,
    CoreButtonGroupVnsComponent],
  declarations: [RegisterLeaveComponent, LeaveEditComponent],
})
export class RegisterleaveModule {}
