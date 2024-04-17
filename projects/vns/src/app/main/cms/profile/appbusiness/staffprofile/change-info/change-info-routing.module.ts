import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangeInfoComponent } from "./change-info.component";
import { CanDeactivateGuard } from "ngx-histaff-alpha";

const routes: Routes = [
    {
      path: "",
      component: ChangeInfoComponent,
      canDeactivate: [CanDeactivateGuard],
    },
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ChangeInfoRoutingModule { }