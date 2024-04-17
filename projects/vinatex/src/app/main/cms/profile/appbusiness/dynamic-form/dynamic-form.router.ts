import { Routes } from '@angular/router'
import { CanDeactivateGuard } from 'ngx-histaff-alpha';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
// import { DynamicFormEditComponent } from './dynamic-form-edit/dynamic-form-edit.component';

export const routes: Routes = [
    {
        path: "",
        component: DynamicFormComponent,
    },
    // {
    //     path: "edit",
    //     component: DynamicFormEditComponent,
    //     // canDeactivate: [CanDeactivateGuard
]
