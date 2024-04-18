import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { SurveyComponent } from "./survey.component";
import { SurveyEditComponent } from "./edit/survey-edit.component";
import { CanDeactivateGuard, CorePageEditComponent, CorePageListComponent, TooltipDirective, TranslatePipe } from "ngx-histaff-alpha";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: SurveyComponent,
  },
  {
    path: ":id",
    component: SurveyEditComponent,
    canDeactivate: [CanDeactivateGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    FormsModule,
    TranslatePipe,
    TooltipDirective
  ],
  declarations: [SurveyComponent, SurveyEditComponent]
})
export class SurveyModule {}
