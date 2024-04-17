import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CorePageListComponent, CorePageEditComponent, CoreOrgTreeComponent, CoreAccordionComponent, CoreCompositionComponent, CoreHeaderParamsComponent } from 'ngx-histaff-alpha';
import { HuBlacklistComponent } from './hu-blacklist.component';

const routes: Routes = [
  {
    path: '',
    component: HuBlacklistComponent
  }
];

@NgModule({
  declarations: [
    HuBlacklistComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreOrgTreeComponent,
    CoreHeaderParamsComponent,
    CoreAccordionComponent,
    CoreCompositionComponent,
    FormsModule
  ]
})

export class HuBlacklistModule {}