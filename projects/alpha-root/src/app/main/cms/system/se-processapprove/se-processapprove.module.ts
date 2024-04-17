import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeProcessApproveComponent } from './se-processapprove.component';
import { CorePageListComponent, CoreListComponent, CoreOrgTreeComponent, CorePageEditComponent, CoreCheckboxComponent, CoreFormComponent, AppService, CorePageHeaderComponent } from 'ngx-histaff-alpha';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: SeProcessApproveComponent,
  },
  // {
  //   path: ':id',
  //   component: SeProcessApproveEditComponent,
  //   canDeactivate: [CanDeactivateGuard],
  // },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CorePageListComponent,
    CoreListComponent,
    CorePageHeaderComponent,
    CoreOrgTreeComponent,
    CorePageEditComponent,
    CoreCheckboxComponent,
    CoreFormComponent,
    CoreListComponent,
  ],
  declarations: [SeProcessApproveComponent],
  providers: [AppService],
})
export class SeProcessApproveModule {}
