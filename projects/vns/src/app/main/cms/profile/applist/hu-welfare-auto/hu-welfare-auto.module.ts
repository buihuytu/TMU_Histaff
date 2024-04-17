import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HuWelfareAutoComponent } from './hu-welfare-auto.component';
import { CorePageEditComponent, CorePageListComponent, CoreOrgTreeComponent, CoreHeaderParamsComponent } from 'ngx-histaff-alpha';
import { HuWelfareAutoEditComponent } from './hu-welfare-auto-edit/hu-welfare-auto-edit.component';
import { HuWelfareAutoRoutingModule } from './hu-welfare-auto-routing';

@NgModule({
  declarations: [HuWelfareAutoComponent, HuWelfareAutoEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    CorePageEditComponent,
    CorePageListComponent,
    HuWelfareAutoRoutingModule,
    CoreOrgTreeComponent,
    CoreHeaderParamsComponent,
  ],
})
export class HuWelfareAutoModule {}
