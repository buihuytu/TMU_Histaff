import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { FunctionComponent, FunctionEditComponent, CorePageListComponent, CorePageHeaderComponent, CorePageEditComponent, CoreCheckboxComponent } from 'ngx-histaff-alpha';
import { FunctionRoutingModule } from './function-routing.module';


const routes: Routes = [
  {
    path: '',
    component: FunctionComponent
  },
  {
    path: ':id',
    component: FunctionEditComponent 
  }
];

@NgModule({
  imports: [
    CommonModule,
    FunctionRoutingModule,
    CorePageListComponent,
    CorePageHeaderComponent,
    CorePageEditComponent,
    CoreCheckboxComponent,
  ],
})
export class FunctionModule {}
