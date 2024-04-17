import { Routes } from '@angular/router';
import { Error404Component } from '../../errors/404/error-404.component';

export const CommunistRoutes: Routes = [
    {
        path: 'business',
        loadChildren: () => import('./appbusiness/communistbusiness.module').then((m) => m.TrainingBusinessModule),
    },
    {
        path: "list",
        loadChildren: () => import("./applist/communistlist.routing").then(m => m.CommunistListRoutes),
    },
    {
        path: '**',
        component: Error404Component,
    },
];
