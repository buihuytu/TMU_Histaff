import { Routes } from "@angular/router";
import { SysMailTemplateComponent } from "./sys-mail-template.component";
import { SysMailTemplateEditComponent } from "./sys-mail-template-edit/sys-mail-template-edit.component";
import { CanDeactivateGuard } from "ngx-histaff-alpha";

export const routes: Routes = [
    {
        path: '',
        component: SysMailTemplateComponent,
    },
    {
        path: ':id',
        component: SysMailTemplateEditComponent,
        canDeactivate: [CanDeactivateGuard],
    }
]

