import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateFunctionUrlMapperGuard, SysFunctionUrlMapperComponent } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: '',
    component: SysFunctionUrlMapperComponent,
    outlet: 'popupAux',
    canActivate: [CanActivateFunctionUrlMapperGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysFunctionUrlMapperRoutingModule { }
