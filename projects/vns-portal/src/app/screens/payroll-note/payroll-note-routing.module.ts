import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollNoteComponent } from './payroll-note/payroll-note.component';

const routes: Routes = [{
  path: '',
  component: PayrollNoteComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollNoteRoutingModule { }
