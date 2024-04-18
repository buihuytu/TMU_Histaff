import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TrainingCourseComponent } from "./trainingcourse.component";
import { TrainingCourseEditComponent } from "./edit/training-course-edit.component";

import { CanDeactivateGuard, CorePageEditComponent, CorePageHeaderComponent, CorePageListComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { CommonModule } from "@angular/common";


const routes: Routes = [
  {
    path: "",
    component: TrainingCourseComponent,
    children: [
      {
        path: ":id",
        component: TrainingCourseEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    CoreStatusStickerComponent
  ],
  declarations: [TrainingCourseComponent, TrainingCourseEditComponent],
  // providers:[CoreService],
})
export class TrainingCourseModule { }
