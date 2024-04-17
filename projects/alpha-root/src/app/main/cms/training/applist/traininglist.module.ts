import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TrainingListRoutes } from "./traininglist.routing";

@NgModule({
  imports: [RouterModule.forChild(TrainingListRoutes)],
  declarations: []
})

export class TrainingListModule {}