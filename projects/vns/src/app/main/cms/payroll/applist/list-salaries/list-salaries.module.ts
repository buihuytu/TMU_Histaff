import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorePageListComponent, CorePageEditComponent, CoreDropdownComponent, CoreCheckboxComponent, CoreButtonGroupVnsComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { ListSalariesEditComponent } from './list-salaries-edit/list-salaries-edit.component';
import { ListSalariesComponent } from './list-salaries.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: ListSalariesComponent,
  },
  {
    path: ':id',
    component: ListSalariesEditComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreDropdownComponent,
    CoreCheckboxComponent,
    CoreButtonGroupVnsComponent,
    CoreStatusStickerComponent

  ],
  declarations: [ListSalariesComponent, ListSalariesEditComponent],
  // providers: [CoreService],
})
export class ListSalariesModule {}
