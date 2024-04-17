import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CorePageListComponent, CoreButtonGroupVnsComponent, CoreAccordionComponent, CoreOrgTreeComponent, CorePageHeaderComponent, CoreControlComponent, CoreCheckboxComponent } from 'ngx-histaff-alpha';
import { InsChangeEditComponent } from './edit/inschange-edit.component';
import { InsChangeComponent } from './inschange.component';

const routes: Routes = [
  {
    path: '',
    component: InsChangeComponent,
  },
  {
    path: ':id',
    component: InsChangeEditComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    FormsModule,
    CoreButtonGroupVnsComponent,
    CoreAccordionComponent,
    ReactiveFormsModule,
    RouterModule,
    CoreOrgTreeComponent,
    CorePageHeaderComponent,
    CoreControlComponent,
    CoreCheckboxComponent,
  ],
  declarations: [InsChangeComponent, InsChangeEditComponent],
  // providers: [CoreService],
})
export class InsChangeModule {}
