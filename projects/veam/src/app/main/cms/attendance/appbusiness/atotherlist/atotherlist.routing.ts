import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AtotherlistComponent } from "./atotherlist.component";
import { AtotherlistEditComponent } from "./atotherlist-edit/atotherlist-edit.component";
import { CanDeactivateGuard } from "ngx-histaff-alpha";



const routes: Routes = [
  {
    path: "",
    component: AtotherlistComponent,
  },
  {
    path: ":id",
    component: AtotherlistEditComponent,
    canDeactivate: [CanDeactivateGuard]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtOtherListRoutingModule { }