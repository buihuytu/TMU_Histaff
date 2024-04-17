import { Routes } from '@angular/router';
import { TrProgramComponent } from './tr-program.component';
import { TrProgramEditComponent } from './tr-program-edit/tr-program-edit.component';
import { TrClassComponent } from './tr-class/tr-class.component';
import { TrPrepareComponent } from './tr-prepare/tr-prepare.component';
import { TrPrepareEditComponent } from './tr-prepare/tr-prepare-edit/tr-prepare-edit.component';
import { TrProgramCommitComponent } from './tr-program-commit/tr-program-commit.component';
import { TrClassEditComponent } from './tr-class/tr-class-edit/tr-class-edit.component';
import { TrClassResultComponent } from './tr-class-result/tr-class-result.component';
import { TrProgramResultEditComponent } from './tr-program-result/tr-program-result-edit/tr-program-result-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

export const routes: Routes = [
    {
        path: "",
        component: TrProgramComponent,
    },
    {
        path: "tr-prepare",
        component: TrPrepareComponent,
        children: [
            {
                path: ":id",
                component: TrPrepareEditComponent,
                outlet: "corePageListAux",
                canDeactivate: [CanDeactivateGuard]
            }
        ]
    },
    {
        path: "tr-class",
        component: TrClassComponent,
    },
    {
        path: "tr-class/:id",
        component: TrClassEditComponent,
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: "tr-program-commit",
        component: TrProgramCommitComponent,
    },
    {
        path: ":id",
        component: TrProgramResultEditComponent,
        outlet: 'programResult',
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: "tr-class-result",
        component: TrClassResultComponent,
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: ":id",
        component: TrProgramEditComponent,
        canDeactivate: [CanDeactivateGuard]
    },

];