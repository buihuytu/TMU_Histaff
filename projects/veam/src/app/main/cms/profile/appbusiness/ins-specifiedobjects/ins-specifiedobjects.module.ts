import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent } from "ngx-histaff-alpha";
import { SpecifiedObjectsEditComponent } from "./edit/ins-specifiedobjects-edit.component";
import { SpecifiedObjectsComponent } from "./ins-specifiedobjects.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: SpecifiedObjectsComponent,
  },
  {
    path: ":id",
    component: SpecifiedObjectsEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CorePageListComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
  ],
  declarations: [SpecifiedObjectsComponent,SpecifiedObjectsEditComponent],
})
export class SpecifiedObjectsModule {}
