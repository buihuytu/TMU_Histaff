import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyRoutingModule } from './family-routing.module';
import { FamilyComponent } from './family.component';
import { TranslatePipe } from 'ngx-histaff-alpha';


@NgModule({
  declarations: [
    FamilyComponent
  ],
  imports: [
    CommonModule,
    FamilyRoutingModule,
    TranslatePipe,
  ]
})
export class FamilyModule { }
