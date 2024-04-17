import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileRecruitmentEditComponent } from "./profile-recruitment-edit.component";
import { CanDeactivateGuard } from "ngx-histaff-alpha";

const routes: Routes = [
    {
      path: "",
      component: ProfileRecruitmentEditComponent,
      canDeactivate: [CanDeactivateGuard],
    },
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProfileRecruitmentEditRoutingModule { }