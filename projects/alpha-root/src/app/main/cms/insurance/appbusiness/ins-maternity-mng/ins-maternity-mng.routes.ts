import { Routes } from '@angular/router';
import { InsMaternityMngComponent } from './ins-maternity-mng.component';
import { InsMaternityMngEditComponent } from './edit/ins-maternity-mng-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

export const routes: Routes = [
  {
    path: '',
    component: InsMaternityMngComponent,
  },
  {
    path: ":id",
    component: InsMaternityMngEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];