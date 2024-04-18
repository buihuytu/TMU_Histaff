import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Payroll3PListRoutes } from './payroll3plist.routing';

@NgModule({
    imports: [
        RouterModule.forChild(Payroll3PListRoutes),
    ]
})
export class Payroll3PListModule {
}
