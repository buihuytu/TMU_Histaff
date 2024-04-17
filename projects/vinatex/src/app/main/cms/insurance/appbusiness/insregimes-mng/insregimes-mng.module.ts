import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CorePageListComponent, CorePageHeaderComponent, CoreAccordionComponent, CoreOrgTreeComponent, CoreFileUploaderComponent, CoreControlComponent, CoreButtonGroupVnsComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { InsRegimesMngEditComponent } from './edit/insregimes-mng-edit.component';
import { InsRegimesMngComponent } from './insregimes-mng.component';

const routes: Routes = [
  {
    path: '',
    component: InsRegimesMngComponent,
  },
  {
    path: ':id',
    component: InsRegimesMngEditComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CorePageListComponent,
    CorePageHeaderComponent,
    CoreAccordionComponent,
    CoreOrgTreeComponent,
    FormsModule,
    ReactiveFormsModule,
    CoreFileUploaderComponent,
    CoreControlComponent,
    CoreButtonGroupVnsComponent,
    CoreStatusStickerComponent
  ],
  declarations: [InsRegimesMngComponent, InsRegimesMngEditComponent],
  // providers: [CoreService],
})
export class InsRegimesMngModule {}
