import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingCenterComponent } from './trainingcenter.component';
import { TrainingCenterEditComponent } from './edit/training-center-edit.component';
import { CanDeactivateGuard, CorePageEditComponent, CorePageHeaderComponent, CorePageListComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: TrainingCenterComponent,
    children: [
      {
        path: ':id',
        component: TrainingCenterEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
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
  declarations: [TrainingCenterComponent, TrainingCenterEditComponent],
  // providers: [CoreService],
})
export class TrainingCenterModule {}
