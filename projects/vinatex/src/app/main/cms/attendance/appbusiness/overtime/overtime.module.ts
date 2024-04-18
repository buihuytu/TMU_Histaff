import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanDeactivateGuard, CoreOrgTreeComponent, CorePageListComponent, CorePageEditComponent, CoreDropdownComponent, CoreDatePickerComponent, CoreButtonGroupVnsComponent, FullscreenModalLoaderComponent } from "ngx-histaff-alpha";
import { OvertimeEditComponent } from "./overtime-edit/overtime-edit.component";
import { OvertimeComponent } from "./overtime.component";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: OvertimeComponent
  },
  {
    path: ":id",
    component: OvertimeEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes),
    CoreOrgTreeComponent,
    FormsModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreDropdownComponent,
    CoreDatePickerComponent,
    CoreButtonGroupVnsComponent,
    FullscreenModalLoaderComponent
  ],
  declarations: [OvertimeComponent, OvertimeEditComponent],
  // providers: [CoreService],
})
export class OvertimeModule {}
