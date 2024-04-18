import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfessionalEmployeeBusinessRoutes } from './professional-employee-business.routing';

@NgModule({
  imports: [RouterModule.forChild(ProfessionalEmployeeBusinessRoutes)],
  declarations: [
  ],
})

export class ProfessionalEmployeeBusinessModule {}