import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PayrollListRoutes } from './payrolllist.routing';
import { ListSalariesComponent } from './list-salaries/list-salaries.component';

@NgModule({
  imports: [RouterModule.forChild(PayrollListRoutes)],

  declarations: [
  
  ],
})
export class PayrollListModule {}
