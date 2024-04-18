import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanDeactivateGuard, CorePageListComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageHeaderComponent } from "ngx-histaff-alpha";
import { JobBandEditComponent } from "./edit/job-band-edit.component";
import { JobBandComponent } from "./job-band.component";

const routes: Routes = [
  {
    path: "",
    component: JobBandComponent,
    children: [
      {
        path: ":id",
        component: JobBandEditComponent,
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
    CorePageEditComponent,
    CorePageHeaderComponent,
  ],
  declarations: [JobBandComponent, JobBandEditComponent],
})
export class JobBandModule {}
