import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorePageListComponent, CoreOrgTreeComponent, CorePageEditComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { DisciplineEditComponent } from './discipline-edit/discipline-edit.component';
import { DisciplineRoutingModule } from './discipline-routing.module';
import { DisciplineComponent } from './discipline/discipline.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DisciplineComponent,
    DisciplineEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DisciplineRoutingModule,
    CorePageListComponent,
    CoreOrgTreeComponent,
    CorePageEditComponent,
    CoreStatusStickerComponent
  ]
})
export class DisciplineModule { }
