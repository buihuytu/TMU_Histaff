import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrplanComponent } from './trplan.component';

import { TrPlanRoutingModule } from './trplan.routing';
import { TrplanEditComponent } from './trplan-edit/trplan-edit.component';

import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CoreOrgTreeComponent, CorePageEditComponent, CorePageListComponent, FullscreenModalLoaderComponent } from 'ngx-histaff-alpha';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: "",
    component: TrplanComponent
  },
  {
    path: ":id",
    component:TrplanEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
]

@NgModule({
  declarations: [TrplanComponent, TrplanEditComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    CorePageListComponent,
    CoreOrgTreeComponent,
    CorePageEditComponent,
    TrPlanRoutingModule,
    FullscreenModalLoaderComponent
  ],
})
export class TrplanModule {}
