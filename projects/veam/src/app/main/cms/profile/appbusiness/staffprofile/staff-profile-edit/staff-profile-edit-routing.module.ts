import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StaffProfileEditComponent } from "./staff-profile-edit.component";
import { CanDeactivateGuard } from "ngx-histaff-alpha";

const routes: Routes = [
    {
      path: "",
      component: StaffProfileEditComponent,
      canDeactivate: [CanDeactivateGuard],
    },
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class StaffProfileEditRoutingModule { }