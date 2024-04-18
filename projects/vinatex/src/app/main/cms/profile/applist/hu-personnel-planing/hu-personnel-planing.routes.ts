import { Routes } from "@angular/router";
import { HuPersonnelPlaningComponent } from "./hu-personnel-planing.component";
import { HuPersonnelPlaningEditComponent } from "./hu-personnel-planing-edit/hu-personnel-planing-edit.component";
import { CanDeactivateGuard } from "ngx-histaff-alpha";
import { HuPersonnelPlaningImportComponent } from "./hu-personnel-planing-import/hu-personnel-planing-import.component";

export const routes: Routes = [
    {
        path: "",
        component: HuPersonnelPlaningComponent,
        children: [
            {
              path: "hu-personnel-planing-import",
              outlet: "corePageListAux",
              component: HuPersonnelPlaningImportComponent
            }
          ]
    },
    {
        path: ":id",
        component: HuPersonnelPlaningEditComponent,
        canDeactivate: [CanDeactivateGuard]
    }
   
];