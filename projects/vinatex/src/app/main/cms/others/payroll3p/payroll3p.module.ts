import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Payroll3PRoutes } from './payroll3p.routing';

@NgModule({
    imports: [
        RouterModule.forChild(Payroll3PRoutes),
    ]
})
export class Payroll3PModule {
}
