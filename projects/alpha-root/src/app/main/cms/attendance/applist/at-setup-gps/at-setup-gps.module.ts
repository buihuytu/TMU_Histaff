import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtSetupGpsComponent } from './at-setup-gps.component';
import { AtSetupGpsEditComponent } from './at-set-gps-edit/at-setup-gps-edit.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CanDeactivateGuard, CoreOrgTreeComponent, CorePageEditComponent, CorePageListComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
const routes: Routes = [
  {
    path: '',
    component: AtSetupGpsComponent,
    children: [
      {
        path: ":id",
        component: AtSetupGpsEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreStatusStickerComponent,
    CoreOrgTreeComponent
  ],
  declarations: [AtSetupGpsComponent, AtSetupGpsEditComponent],
})
export class AtSetupGpsModule {}
