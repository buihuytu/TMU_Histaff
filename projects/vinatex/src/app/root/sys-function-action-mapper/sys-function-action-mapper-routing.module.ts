import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysFunctionActionMapperComponent } from 'ngx-histaff-alpha';

const routes: Routes = [{
  path: "",
  component: SysFunctionActionMapperComponent,
  outlet: 'popupAux',
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysFunctionActionMapperRoutingModule { }
