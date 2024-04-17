import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilyComponent } from './family/family.component';
import { CanDeactivateGuard } from '../../../../../guards/can-deactivate.guard';
import { FamilyEditComponent } from './family-edit/family-edit.component';

const routes: Routes = [
  {
    path: "",
    component: FamilyComponent,
    // For popup mode:
    /*
    children: [
      {
        path: ":id",
        component: FamilyEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
    */
  },
  {
    path: "change-family-portal",
    loadChildren: () => import('./change-family-portal/change-family-portal.module').then(m => m.ChangeFamilyPortalModule)
  },
  // For noen-popup mode
  {
    path: ":id",
    component: FamilyEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyRoutingModule { }
