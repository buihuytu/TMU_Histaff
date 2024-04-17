import { Routes } from "@angular/router";
import { CanDeactivateGuard } from "ngx-histaff-alpha";
import { HuPlanningComponent } from "./hu-planning.component";
import { HuPlanningEditComponent } from "./hu-planning-edit/hu-planning-edit.component";

export const routes: Routes = [
    {
        path: "",
        component: HuPlanningComponent
    },
    {
        path: ":id",
        component: HuPlanningEditComponent,
        canDeactivate: [CanDeactivateGuard]
    }
]