import { Routes } from "@angular/router"
import { HuCompetencyPeroidComponent } from "./hu-competency-peroid.component"
import { HuCompetencyPeroidEditComponent } from "./hu-competency-peroid-edit/hu-competency-peroid-edit.component"
import { CanDeactivateGuard } from "ngx-histaff-alpha"

export const routes: Routes = [
    {
        path: "",
        component: HuCompetencyPeroidComponent,
    },
    {
        path: ":id",
        component: HuCompetencyPeroidEditComponent,
        canDeactivate: [CanDeactivateGuard]
    }
]