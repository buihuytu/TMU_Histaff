import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogFileListComponent } from './log-file-list.component';

const routes: Routes = [
  {
    path: "",
    component: LogFileListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogFileListRoutingModule { }
