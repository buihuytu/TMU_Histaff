import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RcRequestComponent } from './rc-request.component';
import { RcRequestEditComponent } from './rc-request-edit/rc-request-edit.component';
import { CanDeactivateGuard, CoreAccordionComponent, CoreCompositionComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageListComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: RcRequestComponent,
    children: []
  },
  {
    path: ':id',
    component: RcRequestEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];

@NgModule({
  declarations: [
    RcRequestComponent,
    RcRequestEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreOrgTreeComponent,
    CoreAccordionComponent,
    CoreCompositionComponent,
    FormsModule,
    CoreStatusStickerComponent
  ]
})

export class RcRequestModule {}