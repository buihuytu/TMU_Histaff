import { Routes } from '@angular/router';
import { ListCompetencyComponent } from './list-competency.component';
import { CompetencyDictEditComponent } from './competency-dict/competency-dict-edit/competency-dict-edit.component';
import { GroupCompetencyEditComponent } from './group-competency/group-competency-edit/group-competency-edit.component';
import { AspectEditComponent } from './aspect/aspect-edit/aspect-edit.component';
import { CompetencyEditComponent } from './competency/competency-edit/competency-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

export const routes: Routes = [
    {
        path: "",
        component: ListCompetencyComponent,
        children: [
            {
                path: ':id',
                component: CompetencyDictEditComponent,
                outlet: "dictionary",
                canDeactivate: [CanDeactivateGuard]
            },
            {
                path: ':id',
                component: GroupCompetencyEditComponent,
                outlet: "group",
                canDeactivate: [CanDeactivateGuard]
            },
            {
                path: ':id',
                component: AspectEditComponent,
                outlet: "aspect",
                canDeactivate: [CanDeactivateGuard]
            },
            {
                path: ':id',
                component: CompetencyEditComponent,
                outlet: "competency",
                canDeactivate: [CanDeactivateGuard]
            },
        ]
    },
];