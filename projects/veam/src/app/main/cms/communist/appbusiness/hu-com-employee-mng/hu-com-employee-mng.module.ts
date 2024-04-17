import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HuComEmployeeMngComponent } from './hu-com-employee-mng.component';
import { CorePageListComponent, CorePageEditComponent, CoreOrgTreeComponent, CoreAccordionComponent, CoreCompositionComponent } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: '',
    component: HuComEmployeeMngComponent,
    // children: [
    //   {
    //     path: ':id',
    //     component: RcExamsEditComponent,
    //     outlet: 'corePageListAux',
    //     canDeactivate: [CanDeactivateGuard],
    //   }
    // ],
  }
];

@NgModule({
  declarations: [
    HuComEmployeeMngComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreOrgTreeComponent,
    CoreAccordionComponent,
    CoreCompositionComponent,
    FormsModule
  ]
})

export class HuComEmployeeMngModule {}