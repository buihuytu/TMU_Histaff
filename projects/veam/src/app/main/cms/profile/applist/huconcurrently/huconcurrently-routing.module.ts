import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HuconcurrentlyComponent } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: '',
    component: HuconcurrentlyComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HuconcurrentlyRoutingModule { }
