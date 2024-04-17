import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelfareMngComponent } from './welfaremng.component';
import { WelfareMngEditComponent } from './edit/welfaremng-edit.component';
import { WelfaremngImportComponent } from '../welfaremng-import/welfaremng-import.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: WelfareMngComponent,
    children: [
      {
        path: "welfaremng-import",
        outlet: "corePageListAux",
        component: WelfaremngImportComponent
      },
      {
        path: ":id",
        component: WelfareMngEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelfareMngRoutingModule { }