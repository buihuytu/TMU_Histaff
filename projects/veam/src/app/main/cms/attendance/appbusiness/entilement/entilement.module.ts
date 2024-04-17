import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreOrgTreeComponent, CorePageListComponent, CorePageEditComponent, CoreButtonGroupVnsComponent, FullscreenModalLoaderComponent, CoreParamControlComponent, CoreDropdownComponent, CoreHeaderParamsComponent } from "ngx-histaff-alpha";
import { EntilementComponent } from "./entilement.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: EntilementComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes),
    CommonModule,
    CoreOrgTreeComponent,
    FormsModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreButtonGroupVnsComponent,
    CoreHeaderParamsComponent,
    FullscreenModalLoaderComponent,
    CoreParamControlComponent,
    CoreDropdownComponent],
  declarations: [EntilementComponent],
  // providers: [CoreService],
})
export class EntitlementModule {}
