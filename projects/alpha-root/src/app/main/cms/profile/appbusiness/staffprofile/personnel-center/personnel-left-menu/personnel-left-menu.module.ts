import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PersonnelLeftMenuComponent } from './personnel-left-menu/personnel-left-menu.component';
import { CoreFileUploaderComponent, CoreLineComponent, NormalizeHumanNamePipe, TableCellPipe, TranslatePipe } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [
    PersonnelLeftMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CoreFileUploaderComponent,
    CoreLineComponent,
    NormalizeHumanNamePipe,
    TranslatePipe,
    TableCellPipe,
  ],
  exports: [PersonnelLeftMenuComponent]
})
export class PersonnelLeftMenuModule { }
