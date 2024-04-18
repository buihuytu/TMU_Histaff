import { Routes } from "@angular/router";
import { HuAssetMngComponent } from "./hu-asset-mng.component";
import { HuAssetMngEditComponent } from "./hu-asset-mng-edit/hu-asset-mng-edit.component";
import { CanDeactivateGuard } from "ngx-histaff-alpha";

export const routes: Routes = [
    {
        path: "",
        component: HuAssetMngComponent
    },
    {
        path: ":id",
        component: HuAssetMngEditComponent,
        canDeactivate: [CanDeactivateGuard]
    }
]