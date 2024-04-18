import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrLectureComponent } from './tr-lecture.component';
import { TrLectureEditComponent } from './tr-lecture-edit/tr-lecture-edit.component';
import { CanDeactivateGuard, CorePageEditComponent, CorePageListComponent } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: '',
    component: TrLectureComponent,
    children: [
      {
        path: ':id',
        component: TrLectureEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      }
    ],
  }
];

@NgModule({
  declarations: [
    TrLectureComponent,
    TrLectureEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent
  ]
})

export class TrLectureModule {}