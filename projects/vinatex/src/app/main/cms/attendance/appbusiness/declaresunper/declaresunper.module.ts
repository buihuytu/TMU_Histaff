import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CanDeactivateGuard, CoreOrgTreeComponent, CorePageListComponent, CorePageEditComponent, FullscreenModalLoaderComponent, CoreDropdownComponent } from "ngx-histaff-alpha";
import { DeclaresunperComponent } from "./declaresunper.component";
import { SunPerEditComponent } from "./sun-per-edit/sun-per-edit.component";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: DeclaresunperComponent
  },
  {
    path: ":id",
    component: SunPerEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes),
    CoreOrgTreeComponent,
    FormsModule,
    CorePageListComponent,
    CorePageEditComponent,
    FullscreenModalLoaderComponent,
    CoreDropdownComponent],
  declarations: [DeclaresunperComponent, SunPerEditComponent],
  // providers: [CoreService],
})
export class DeclaresunperModule {}
