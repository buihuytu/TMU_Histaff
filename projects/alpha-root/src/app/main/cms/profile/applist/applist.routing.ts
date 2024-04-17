import { Routes } from '@angular/router';

export const ProfileListRoutes: Routes = [
  {
    path: 'job',
    loadChildren: () => import('./job/job.module').then((m) => m.JobModule),
  },
  {
    path: 'job-band',
    loadChildren: () =>
      import('./job-band/job-band.module').then((m) => m.JobBandModule),
  },
  {
    path: 'position',
    loadChildren: () =>
      import('./position/position.module').then((m) => m.PositionModule),
  },
  {
    path: 'contracttype',
    loadChildren: () =>
      import('./contracttype/contracttype.module').then(
        (m) => m.ContractTypeModule
      ),
  },
  {
    path: 'welfare',
    loadChildren: () =>
      import('./welfare/welfare.module').then((m) => m.WelfareModule),
  },
  {
    path: 'welfaremng',
    loadChildren: () =>
      import('./welfaremng/welfaremng.module').then((m) => m.WelfareMngModule),
  },
  {
    path: 'allowance',
    loadChildren: () =>
      import('./allowance/allowance.module').then((m) => m.AllowanceModule),
  },
  {
    path: 'approve',
    loadChildren: () =>
      import('./approve-portal/approve-portal.module').then((m) => m.ApprovePortalModule),
  },
  {
    path: 'allowanseemployee',
    loadChildren: () =>
      import('./allowanceemployee/allowanceemployee.module').then(
        (m) => m.AllowanceEmployeeModule
      ),
  },
  {
    path: 'salaryscale',
    loadChildren: () =>
      import('./salaryscale/salaryscale.module').then(
        (m) => m.SalaryScaleModule
      ),
  },
  {
    path: 'salaryrank',
    loadChildren: () =>
      import('./salaryrank/salaryrank.module').then((m) => m.SalaryRankModule),
  },
  {
    path: 'salarylevel',
    loadChildren: () =>
      import('./salarylevel/salarylevel.module').then(
        (m) => m.SalaryLevelModule
      ),
  },
  {
    path: 'classification',
    loadChildren: () =>
      import('./classification/classification.module').then(
        (m) => m.ClassificationModule
      ),
  },
  {
    path: 'otherlist',
    loadChildren: () =>
      import('./otherlist/otherlist.module').then((m) => m.OtherlistModule),
  },

  {
    path: 'bank',
    loadChildren: () => import('./bank/bank.module').then((m) => m.BankModule),
  },
  {
    path: 'nation',
    loadChildren: () =>
      import('./hu-nation/hu-nation.module').then((m) => m.HuNationModule),
  },
  {
    path: 'province',
    loadChildren: () =>
      import('./hu-province/hu-province.module').then(
        (m) => m.HuProvinceModule
      ),
  },
  {
    path: 'district',
    loadChildren: () =>
      import('./hu-district/hu-district.module').then(
        (m) => m.HuDistrictModule
      ),
  },
  {
    path: 'ward',
    loadChildren: () =>
      import('./hu-ward/hu-ward.module').then((m) => m.HuWardModule),
  },
  {
    path: 'bankbranch',
    loadChildren: () =>
      import('./bank-branch/bank-branch.module').then(
        (m) => m.BankBranchModule
      ),
  },
  {
    path: 'qualification',
    redirectTo: './groupposition/groupposition.module#GroupPositionModule',
    pathMatch: 'full',
  },
  {
    path: 'commend',
    loadChildren: () =>
      import('./hucommend/hucommend.module').then((m) => m.HucommendModule),
  },
  {
    path: 'evaluate',
    loadChildren: () =>
      import('./hu-evaluate/hu-evaluate.module').then(
        (m) => m.HuEvaluateModule
      ),
  },
  {
    path: 'welfare-auto',
    loadChildren: () =>
      import('./hu-welfare-auto/hu-welfare-auto.module').then(
        (m) => m.HuWelfareAutoModule
      ),
  },
  {
    path: 'locationlist',
    loadChildren: () =>
      import('./locationlist/locationlist.module').then(
        (m) => m.LocationListModule
      ),
  },
  {
    path: 'concurrently',
    loadChildren: () =>
      import('./huconcurrently/huconcurrently.module').then((m) => m.HuconcurrentlyModule),
  },
  {
    path: 'qualification',
    redirectTo: './groupposition/groupposition.module#GroupPositionModule',
    pathMatch: 'full',
  },
  {
    path: "hu-asset",
    loadChildren: () => import('./hu-asset/hu-asset.routes').then(m => m.routes)
  }
];
