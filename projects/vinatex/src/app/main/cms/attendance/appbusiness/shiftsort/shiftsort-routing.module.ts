import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftSortComponent } from './shiftsort.component';
import { ShiftSortEditComponent } from './edit/shiftsort-edit.component';
import { ShiftSortDeleteComponent } from './delete/shiftsort-delete.component';

const routes: Routes = [
  {
    path: "",
    component: ShiftSortComponent,
    children: [
      {
        path: ":id",
        component: ShiftSortDeleteComponent,
        outlet: "corePageListAux",
      }
    ]
  },
  {
    path: ":id",
    component: ShiftSortEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftSortRoutingModule { }