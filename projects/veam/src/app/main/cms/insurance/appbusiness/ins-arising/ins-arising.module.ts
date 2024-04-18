import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard, CorePageListComponent, CoreOrgTreeComponent, CorePageEditComponent, CoreButtonGroupVnsComponent, CorePageHeaderComponent, CoreCheckboxComponent, CoreHeaderParamsComponent, CoreDropdownComponent, CoreDatePickerComponent } from 'ngx-histaff-alpha';
import { InsArisingEditComponent } from './ins-arising-edit/ins-arising-edit.component';
import { InsArisingComponent } from './ins-arising/ins-arising.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
const routes: Routes = [
  {
    path: "",
    component: InsArisingComponent,
    children: [
      {
        path: ":id",
        component: InsArisingEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];
@NgModule({
  declarations: [
    InsArisingComponent,
    InsArisingEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    CorePageListComponent,
    CoreOrgTreeComponent,
    CorePageEditComponent,
    CoreButtonGroupVnsComponent,
    CorePageHeaderComponent,
    CoreCheckboxComponent,
    CoreHeaderParamsComponent,
    CoreDropdownComponent,
    CoreDatePickerComponent
  ]
})
export class InsArisingModule { }
