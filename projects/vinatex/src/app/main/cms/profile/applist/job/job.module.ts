import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobComponent } from "./job.component";
import { JobEditComponent } from "./edit/job-edit.component";

import { CanDeactivateGuard, CorePageListComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageHeaderComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: JobComponent,
    children: [
      {
        path: ":id",
        component: JobEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), 
    CorePageListComponent,
    CoreOrgTreeComponent,
    CommonModule,
    FormsModule,
    CorePageEditComponent,
    CorePageHeaderComponent,
    CoreStatusStickerComponent
  ],
  declarations: [JobComponent, JobEditComponent],
})
export class JobModule {}
