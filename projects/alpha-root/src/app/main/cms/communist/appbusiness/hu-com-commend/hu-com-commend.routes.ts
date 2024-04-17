import { Routes } from "@angular/router";
import { HuComCommendComponent } from "./hu-com-commend.component";
import { HuComCommendEditComponent } from "./hu-com-commend-edit/hu-com-commend-edit.component";
import { CanDeactivateGuard } from "ngx-histaff-alpha";

export const route : Routes = [
    {
        path: '',
        component: HuComCommendComponent,
    },
    {
        path: ':id',
        component: HuComCommendEditComponent,
        canDeactivate: [CanDeactivateGuard]
    }
]