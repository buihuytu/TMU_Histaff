import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CorePageListComponent, CoreListComponent, CorePageHeaderComponent, CoreOrgTreeComponent, CorePageEditComponent, CoreCheckboxComponent, AppService } from 'ngx-histaff-alpha';
import { SeProcessEditComponent } from './edit/se-process-edit.component';
import { SeProcessComponent } from './se-process.component';
import { CommonModule } from '@angular/common';



const routes: Routes = [
  {
    path: '',
    component: SeProcessComponent,
  },
  {
    path: ':id',
    component: SeProcessEditComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    CoreListComponent,
    CorePageHeaderComponent,
    CoreOrgTreeComponent,
    CorePageEditComponent,
    CoreCheckboxComponent,
  ],
  declarations: [SeProcessComponent, SeProcessEditComponent],
  providers: [AppService],
})
export class SeProcessModule {}
