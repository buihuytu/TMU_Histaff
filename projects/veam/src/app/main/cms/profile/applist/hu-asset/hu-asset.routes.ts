import { Routes } from "@angular/router";
import { HuAssetComponent } from "./hu-asset.component";
import { HuAssetEditComponent } from "./hu-asset-edit/hu-asset-edit.component";
import { CanDeactivateGuard } from "ngx-histaff-alpha";

export const routes: Routes = [
    {
        path: "",
        component: HuAssetComponent
    },
    {
        path: ":id",
        component: HuAssetEditComponent,
        canDeactivate: [CanDeactivateGuard]
    }
]