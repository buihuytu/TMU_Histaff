import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OthersRoutes } from './others.routing';

@NgModule({
    imports: [
        RouterModule.forChild(OthersRoutes),
    ]
})
export class OthersModule {
}
