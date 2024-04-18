import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommunistBusinessRoutes } from './communistbusiness.routing';

@NgModule({
    imports: [
        RouterModule.forChild(CommunistBusinessRoutes)
    ],
    declarations: [
    ],
})
export class TrainingBusinessModule { }
