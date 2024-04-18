import { RouterModule, Routes } from '@angular/router';
import { TrRequestEditComponent } from './edit/tr-request-edit.component';
import { TrRequestComponent } from './tr-request.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

export const routes: Routes = [
    {
        path: "",
        component: TrRequestComponent,
      },
      {
        path: ":id",
        component: TrRequestEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
];