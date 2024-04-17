import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrainingBusinessRoutes } from './trainingbusiness.routing';

@NgModule({
  imports: [
    RouterModule.forChild(TrainingBusinessRoutes)
  ],
  declarations: [
  ],
})
export class TrainingBusinessModule { }
