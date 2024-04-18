import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'object',
    loadChildren: () => import("./object/object.module").then(m => m.ObjectModule)
  },
  {
    path: 'infotype',
    loadChildren: () => import("./infotype/infotype.module").then(m => m.InfotypeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreHrmRoutingModule { }
