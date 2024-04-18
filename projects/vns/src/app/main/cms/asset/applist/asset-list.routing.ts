import { Routes } from '@angular/router';

export const AssetListRoutes: Routes = [
  {
    path: 'as-project',
    loadChildren:()=>import('./as-project/as-project.module').then((m)=>m.AsProjectModule)
  }
];