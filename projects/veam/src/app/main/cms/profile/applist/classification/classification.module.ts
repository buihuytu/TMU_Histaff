import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassificationComponent } from './classification.component';
// import { CoreService } from '../../../../../services/core.service';
import { ClassificationEditComponent } from './edit/classification-edit.component';
import { CanDeactivateGuard, CorePageEditComponent, CorePageHeaderComponent, CorePageListComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: "",
    component: ClassificationComponent,
    children: [
      {
        path: ":id",
        component: ClassificationEditComponent,
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
    CorePageHeaderComponent,
    CorePageEditComponent,
    CoreStatusStickerComponent
  ],
  declarations: [ClassificationComponent, ClassificationEditComponent],
  // providers: [CoreService]
})
export class ClassificationModule { }
