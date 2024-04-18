import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CoreOrgTreeComponent, CorePageHeaderComponent, CoreCompositionComponent, CoreTableComponent, CoreButtonGroupVnsComponent, FullscreenModalLoaderComponent, TranslatePipe } from "ngx-histaff-alpha";
import { EvaluationComEditComponent } from "./evaluation-com-edit/evaluation-com-edit.component";
import { EvaluationComImportComponent } from "./evaluation-com-import/evaluation-com-import.component";
import { EvaluationComComponent } from "./evaluation-com.component";

const routes: Routes = [
  {
    path: '',
    component: EvaluationComComponent,
    children: [
      {
        path: "evaluation-com-import",
        outlet: "corePageListAux",
        component: EvaluationComImportComponent,

      },
      {
        path: ':id',
        component: EvaluationComEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      }      
    ],
  },
];

@NgModule({
  declarations: [
    EvaluationComComponent,
    EvaluationComEditComponent,
    EvaluationComImportComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule, 
    TranslatePipe,
    CorePageListComponent,
    CorePageEditComponent,
    CoreOrgTreeComponent,
    CorePageHeaderComponent,
    FormsModule,
    CoreCompositionComponent,
    CoreTableComponent,
    CoreButtonGroupVnsComponent,
    FullscreenModalLoaderComponent,
  ],
})
export class EvaluationComModule {}
