import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrSettingCriCourseComponent } from './tr-setting-cri-course.component';
import { TrSettingCriCourseEditComponent } from './edit/tr-setting-cri-course-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

export const routes: Routes = [
  {
    path: "",
    component: TrSettingCriCourseComponent,
    children: [
      {
        path: ":id",
        component: TrSettingCriCourseEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
];