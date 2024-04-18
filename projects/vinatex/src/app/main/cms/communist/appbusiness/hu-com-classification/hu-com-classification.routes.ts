import { Routes } from '@angular/router'
import { HuComClassificationComponent } from './hu-com-classification.component';
import { HuComClassificationEditComponent } from './hu-com-classification-edit/hu-com-classification-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

export const routes: Routes = [
    {
        path: "",
        component: HuComClassificationComponent,
    },
    {
        path: ":id",
        component: HuComClassificationEditComponent,
        canDeactivate: [CanDeactivateGuard]
    }
];