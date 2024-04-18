import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApproveStaffProfileEditComponent } from "./approve-staff-profile-edit.component";



const routes: Routes = [
    {
      path: "",
      component: ApproveStaffProfileEditComponent,
      
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ApproveStaffProfileRoutingModule{}