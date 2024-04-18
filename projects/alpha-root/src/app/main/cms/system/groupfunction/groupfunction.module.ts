import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CorePageListComponent, CorePageHeaderComponent, CorePageEditComponent } from "ngx-histaff-alpha";
import { GroupFuntionRoutingModule } from "./groupfunction-routing.module";

@NgModule({
  imports: [ 
    CorePageListComponent,
    CorePageHeaderComponent,
    GroupFuntionRoutingModule,
    RouterModule,
    CorePageEditComponent,],
})
export class GroupFunctionModule {}