import { Routes } from '@angular/router'
import { HuComWorkingComponent } from './hu-com-working.component';
import { HuComWorkingEditComponent } from './hu-com-working-edit/hu-com-working-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

export const routes: Routes = [
    {
        path: "",
        component: HuComWorkingComponent,
    },
    {
        path: ":id",
        component: HuComWorkingEditComponent,
        canDeactivate: [CanDeactivateGuard],
    },
];