import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeCapacityFrameworkComponent } from './pe-capacity-framework.component';
import { PeCapacityFrameworkEditComponent } from './pe-capacity-framework-edit/pe-capacity-framework-edit.component';
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CoreOrgTreeComponent, CoreStatusStickerComponent, CoreAccordionComponent, CoreCompositionComponent } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: '',
    component: PeCapacityFrameworkComponent,
    children: [
      {
        path: ':id',
        component: PeCapacityFrameworkEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      }
    ]
  }
];

@NgModule({
  declarations: [
    PeCapacityFrameworkComponent,
    PeCapacityFrameworkEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreOrgTreeComponent,
    CoreStatusStickerComponent,
    CoreAccordionComponent,
    CoreCompositionComponent,
    FormsModule
  ]
})

export class PeCapacityFrameworkModule {}