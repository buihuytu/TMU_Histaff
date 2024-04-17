import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommunistRoutes } from './communist.routing';

@NgModule({
    imports: [
        RouterModule.forChild(CommunistRoutes)
    ],
    declarations: [
    ],
})
export class CommunistModule { }