import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CorePageListComponent, CoreListComponent, CorePageHeaderComponent, CoreOrgTreeComponent, CorePageEditComponent, CoreStatusStickerComponent, AppService } from 'ngx-histaff-alpha';
import { PhaseAdvanceEditComponent } from './edit/phaseadvance-edit.component';
import { PhaseAdvanceComponent } from './phaseadvance.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: "",
    component: PhaseAdvanceComponent
  },
  {
    path: ":id",
    component: PhaseAdvanceEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    CorePageListComponent,
    CoreListComponent,
    CorePageHeaderComponent,
    CoreOrgTreeComponent,
    CorePageEditComponent,
    CoreStatusStickerComponent
  ],
  declarations: [PhaseAdvanceComponent, PhaseAdvanceEditComponent],
  providers: [AppService],
})
export class PhaseAdvanceModule {}
