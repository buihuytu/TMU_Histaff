import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "url-mapper",
    loadChildren: () => import('./sys-function-url-mapper/sys-function-url-mapper.module').then(m => m.SysFunctionUrlMapperModule)
  },
  {
    path: "action-mapper",
    loadChildren: () => import('./sys-function-action-mapper/sys-function-action-mapper.module').then(m => m.SysFunctionActionMapperModule)
  },
  {
    path: "portal-route",
    loadChildren: () => import('./portal-route/portal-route.module').then(m => m.PortalRouteModule)
  },
  {
    path: "in-memory",
    loadChildren: () => import('./in-memory/in-memory.module').then(m => m.InMemoryModule)
  },
  {
    path: "log-file-list",
    loadChildren: () => import('./log-file-list/log-file-list.module').then(m => m.LogFileListModule)
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full" 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
