import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GroupFunctionComponent, GroupFunctionEditComponent, CanDeactivateGuard } from "ngx-histaff-alpha";


const routes: Routes = [
    {
      path: "",
      component: GroupFunctionComponent,
      children: [
        {
          path: ":id",
          component: GroupFunctionEditComponent,
          outlet: "corePageListAux",
          canDeactivate: [CanDeactivateGuard]
        }
      ]
    },
    
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class GroupFuntionRoutingModule {}