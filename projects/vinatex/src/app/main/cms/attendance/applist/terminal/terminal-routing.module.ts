import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerminalComponent } from './terminal.component';
import { TerminalEditComponent } from './edit/terminal-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: TerminalComponent,
    children: [
      {
        path: ":id",
        component: TerminalEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerminalRoutingModule { }