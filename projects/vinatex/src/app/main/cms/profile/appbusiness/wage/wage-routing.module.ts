import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WageEditComponent } from './edit/wage-edit.component';
import { HuWorkingHslPcImportComponent } from './hu-working-hsl-pc-import/hu-working-hsl-pc-import.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';
import { WageExtComponent } from './wage-ext/wage-ext.component';


const routes: Routes = [
  {
    path: "",
    component: WageExtComponent,
    children: [
      {
        path: "hu-working-hsl-pc-import",
        outlet: "corePageListAux",
        component: HuWorkingHslPcImportComponent
      }
    ]
  },
  {
    path: ":id",
    component: WageEditComponent,
    canDeactivate: [CanDeactivateGuard]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WageRoutingModule { }