import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollNoteRoutingModule } from './payroll-note-routing.module';
import { PayrollNoteComponent } from './payroll-note/payroll-note.component';
import { FormsModule } from '@angular/forms';
import { CoreDropdownComponent, TranslatePipe } from 'ngx-histaff-alpha';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    PayrollNoteRoutingModule,
    CoreDropdownComponent
  ]
})
export class PayrollNoteModule { }
