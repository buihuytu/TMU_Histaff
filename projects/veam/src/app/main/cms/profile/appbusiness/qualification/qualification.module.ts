import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QualificationImportComponent } from "../qualification-import/qualification-import.component";
import { CanDeactivateGuard, CorePageListComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageHeaderComponent, CoreCheckboxComponent, FullscreenModalLoaderComponent, CoreButtonGroupVnsComponent, TranslatePipe } from "ngx-histaff-alpha";
import { QualificationEditComponent } from "./qualification-edit/qualification-edit.component";
import { QualificationComponent } from "./qualification.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: QualificationComponent,
    children: [
      {
        path: "qualification-import",
        outlet: "corePageListAux",
        component: QualificationImportComponent
      },
      {
        path: ":id",
        component: QualificationEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      },
      
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    RouterModule.forChild(routes),
    CorePageListComponent,
    CoreOrgTreeComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    CoreCheckboxComponent,
    FullscreenModalLoaderComponent,
    CoreButtonGroupVnsComponent,
  ],
  declarations: [QualificationComponent, QualificationEditComponent, QualificationImportComponent],
})
export class QualificationModule {}
