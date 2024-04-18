import { Routes } from '@angular/router';
import { InsTotalSalaryComponent } from './ins-total-salary.component';
import { InsTotalSalaryDetailsComponent } from './ins-total-salary-details/ins-total-salary-details.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

export const routes: Routes = [
    {
        path: '',
        component: InsTotalSalaryComponent,
        children: [
            {
                path: ':id',
                component: InsTotalSalaryDetailsComponent,
                outlet: 'corePageListAux',
                canDeactivate: [CanDeactivateGuard],
            },
        ],
    }
];