import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AllowanceEmployeeComponent } from "./allowanceemployee.component";
import { AllowanceEmployeeEditComponent } from "./edit/allowanceemployee-edit.component";
import { AllowanceemployeeImportComponent } from "./allowanceemployee-import/allowanceemployee-import.component";
import { CanDeactivateGuard, CoreButtonGroupVnsComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageListComponent, FullscreenModalLoaderComponent, TranslatePipe } from "ngx-histaff-alpha";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


const routes: Routes = [
  {
    path: "",
    component: AllowanceEmployeeComponent,
    children: [
      {
        path: "allowance-import",
        outlet: "corePageListAux",
        component: AllowanceemployeeImportComponent
      },
      {
        path: ":id",
        component: AllowanceEmployeeEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      },

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes), 
    CommonModule,
    FormsModule,
    TranslatePipe,
    CoreOrgTreeComponent,
    CorePageListComponent,
    CorePageEditComponent,
    FullscreenModalLoaderComponent,
    CoreButtonGroupVnsComponent,
  ],
  declarations: [AllowanceEmployeeComponent, AllowanceEmployeeEditComponent, AllowanceemployeeImportComponent],
})
export class AllowanceEmployeeModule {}
