import { Routes } from '@angular/router';

export const SystemRoutes: Routes = [
  {
    path: 'language',
    loadChildren: () => import('./language/language.module').then((m) => m.LanguageModule),
  },
  {
    path: 'function',
    loadChildren: () => import('./function/function.module').then((m) => m.FunctionModule),
  },
  {
    path: 'function-ignore',
    loadChildren: () => import('./function-ignore/function-ignore.module').then((m) => m.FunctionIgnoreModule),
  },
  {
    path: 'function-action',
    loadChildren: () =>
      import('./sys-function-action/sys-function-action.module').then((m) => m.SysFunctionActionModule),
  },
  {
    path: 'groupuser',
    loadChildren: () => import('./groupuser/groupuser.module').then((m) => m.GroupUserModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'grouppermission',
    loadChildren: () =>
      import('./groupuserpermission/groupuserpermission.module').then((m) => m.GroupUserPermissionModule),
  },
  {
    path: 'upermission',
    loadChildren: () => import('./userpermission/userpermission.module').then((m) => m.UserPermissionModule),
  },
  {
    path: 'sys-other-list',
    loadChildren: () => import('./sys-otherlist/sys-otherlist.module').then((m) => m.SysOtherlistModule),
  },
  {
    path: 'sys-other-list-type',
    loadChildren: () => import('./otherlist-type/otherlist-type.module').then((m) => m.OtherlistTypeModule),
  },
  {
    path: 'css-var',
    loadChildren: () => import('./css-var/css-var.module').then((m) => m.CssVarModule),
  },
  {
    path: 'css-theme',
    loadChildren: () => import('./css-theme/css-theme.module').then((m) => m.CssThemeModule),
  },
  {
    path: 'ldap',
    loadChildren: () => import('./se-ldap/se-ldap.module').then((m) => m.SeLdapModule),
  },
  {
    path: 'process',
    loadChildren: () => import('./se-process/se-process.module').then((m) => m.SeProcessModule),
  },
  {
    path: 'authorize-approve',
    loadChildren: () =>
      import('./se-authorize-approve/se-authorize-approve.module').then((m) => m.SeAuthorizeApproveModule),
  },
  {
    path: 'hangfire-dashborad',
    loadChildren: () => import('./background-jobs/background-jobs.module').then((m) => m.BackgroundJobsModule),
  },
  {
    path: 'function-group',
    loadChildren: () => import('./groupfunction/groupfunction.module').then((m) => m.GroupFunctionModule),
  },
  {
    path: 'action',
    loadChildren: () => import('./sys-action/sys-action.module').then((m) => m.SysActionModule),
  },
  {
    path: 'module',
    loadChildren: () => import('./sys-module/sys-module.module').then((m) => m.SysModuleModule),
  },
  {
    path: 'configuration-common',
    loadChildren: () => import('./configuration-common/configuration-common.module').then((m) => m.ConfigurationCommonModule),
  },
  {
    path:'process-approve',
    loadChildren:() => import('./se-processapprove/se-processapprove.module').then((m) => m.SeProcessApproveModule),
  },
  {
    path:'mutation-log',
    loadChildren:() => import('./mutation-log/mutation-log.module').then(m => m.MutationLogModule)
  },
  {
    path:'se-document',
    loadChildren:() => import('./se-document/se-document.module').then((m) => m.SeDocumentModule)
  },
  {
    path:'se-document-info',
    loadChildren:() => import('./se-document-info/se-document-info.module').then((m) => m.SeDocumentInfoModule)
  },
  {
    path:'se-config',
    loadChildren:() => import('./se-config/se-config.routes').then((m) => m.routes),
  },
  {
    path: 'sys-mail-template',
    loadChildren: () => import('./sys-mail-template/sys-mail-template-routes').then((r) => r.routes),
  }
];
