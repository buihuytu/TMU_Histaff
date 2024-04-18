// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { CanDeactivateGuard } from '@vinatex/guards/can-deactivate.guard';
// import { PhaseAdvanceComponent } from './phaseadvance.component';
// import { PhaseadvanceEditComponent } from './edit/phaseadvance-edit.component';

// const routes: Routes = [
//   {
//     path: "",
//     component: PhaseAdvanceComponent,
//     children: [
//       {
//         path: ":id",
//         component: PhaseadvanceEditComponent,
//         outlet: "corePageListAux",
//         canDeactivate: [CanDeactivateGuard]
//       }
//     ]
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class PhaseAdvanceRoutingModule { }