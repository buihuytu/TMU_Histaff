import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CoreOrgTreeComponent, CoreStatusStickerComponent, CoreAccordionComponent, CoreCompositionComponent } from 'ngx-histaff-alpha';
import { AsProjectEditComponent } from './as-project-edit/as-project-edit.component';
import { AsProjectComponent } from './as-project.component';

const routes: Routes = [
  {
    path: '',
    component: AsProjectComponent,
    children: [
      {
        path: ':id',
        component: AsProjectEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      }
    ]
  }
];

@NgModule({
  declarations: [
    AsProjectComponent,
    AsProjectEditComponent
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

export class AsProjectModule {}