import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CssVarComponent } from './css-var.component';
import { CSSVarEditComponent } from './edit/edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: '',
    component: CssVarComponent,
    children: [
      {
        path: ':id',
        component: CSSVarEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CssVarRoutingModule {}
