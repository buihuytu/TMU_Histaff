import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AttendanceRoutes } from "./attendance.routing";

@NgModule({
  imports: [RouterModule.forChild(AttendanceRoutes)],
})
export class AttendanceModule {}
