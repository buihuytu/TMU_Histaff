import { Routes } from "@angular/router";

export const AttendanceListRoutes: Routes = [
  {
    path: "symbol",
    loadChildren: () => import("./symbol/symbol.module").then(m => m.SymbolModule),
  },
  {
    path: "timetype",
    loadChildren: () => import("./timetype/timetype.module").then(m => m.TimeTypeModule),
  },
  {
    path: "shift",
    loadChildren: () => import("./shift/shift.module").then(m => m.ShiftModule),
  },
  {
    path: "holiday",
    loadChildren: () => import("./holiday/holiday.module").then(m => m.HolidayModule),
  }, 
  {
    path: "salaryperiod",
    loadChildren: () => import("./salaryperiod/salaryperiod.module").then(m => m.SalaryPeriodModule),
  },
  {
    path: "terminal",
    loadChildren: () => import("./terminal/terminal.module").then(m => m.TerminalModule),
  },
  {
    path: "periodstandard",
    loadChildren: () => import("./periodstandard/periodstandard.module").then(m => m.PeriodStandardModule),
  },
  {
    path: "setuptimeemp",
    loadChildren: () => import("./setuptimeemp/setuptimeemp.module").then(m => m.SetupTimeEmpModule),
  },
  {
    path: "signdefault",
    loadChildren: () => import("./signdefault/signdefault.module").then(m => m.SignDefaultModule),
  },
  {
    path: "swipedata",
    loadChildren: () => import("./swipedata/swipedata.module").then(m => m.SwipeDataModule),
  },
  {
    path: "at-setup-wifi",
    loadChildren: () => import("./at-setup-wifi/at-setup-wifi.module").then(m => m.AtSetupWifiModule),
  },
  {
    path: "at-setup-gps",
    loadChildren: () => import("./at-setup-gps/at-setup-gps.module").then(m => m.AtSetupGpsModule),
  }
];
