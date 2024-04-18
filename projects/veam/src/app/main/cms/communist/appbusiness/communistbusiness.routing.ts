import { Routes } from '@angular/router';

export const CommunistBusinessRoutes: Routes = [
    {
        path: 'com-working',
        loadChildren: () => import('./hu-com-working/hu-com-working.routes').then((m) => m.routes)
    },
    {
        path: 'hu-com-employee-mng',
        loadChildren: () => import('./hu-com-employee-mng/hu-com-employee-mng.module').then((m) => m.HuComEmployeeMngModule)
    },
    {
        path: 'com-classification',
        loadChildren:() => import('./hu-com-classification/hu-com-classification.routes').then((m) => m.routes)
    },
    {
        path: 'hu-com-planning-manage',
        loadChildren:() => import('./hu-com-planning-manage/hu-com-planning-manage.routes').then((m) => m.routes)
    },
    {
        path: 'hu-com-commend',
        loadChildren:() => import('./hu-com-commend/hu-com-commend.routes').then((r) => r.route)
    }
];
