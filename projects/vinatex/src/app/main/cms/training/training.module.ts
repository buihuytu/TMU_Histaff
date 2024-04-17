import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrainingRoutes } from './training.routing';
import { Error404Module } from '../../errors/404/error-404.module';

@NgModule({
  // imports: [
  //   RouterModule.forChild(TrainingRoutes), Error404Module
  // ],
  imports: [RouterModule.forChild(TrainingRoutes)],
  declarations: [],
})
export class TrainingModule {}
