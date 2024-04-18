import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguageRoutingModule } from './language-routing.module';
import { CorePageListComponent, CorePageEditComponent } from 'ngx-histaff-alpha';


@NgModule({

  imports: [
    CommonModule,
    LanguageRoutingModule,
    CorePageListComponent,
    CorePageEditComponent,
  ]
})
export class LanguageModule { }
