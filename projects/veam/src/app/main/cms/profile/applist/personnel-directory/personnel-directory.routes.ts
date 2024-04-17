import { Routes } from "@angular/router";
import { CanDeactivateGuard } from "ngx-histaff-alpha";
import { PersonnelDirectoryComponent } from "./personnel-directory.component";
import { PersonnelDirectoryEditComponent } from "./personnel-directory-edit/personnel-directory-edit.component";

export const routes: Routes = [
    {
        path: "",
        component: PersonnelDirectoryComponent,
        children: [
            {
                path: ":id",
                component: PersonnelDirectoryEditComponent,
                canDeactivate: [CanDeactivateGuard],
                outlet: "corePageListAux"
            }
        ]
    }
]