import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterOffRoutingModule } from './register-off-routing.module';
import { RegisterOffComponent } from './register-off/register-off.component';
import { RegisterOffEditComponent } from './register-off-edit/register-off-edit.component';
import { RegisterOvertimeComponent } from './register-overtime/register-overtime.component';
import { ExplainWorkComponent } from './explain-work/explain-work.component';
import { RegisterHistoryComponent } from './register-history/register-history.component';
import { FormsModule } from '@angular/forms';

import { RegisterHistoryEditComponent } from './register-history/register-history-edit/register-history-edit.component';
import { CoreButtonGroupVnsComponent, CoreCheckboxComponent, CoreControlComponent, CoreDatePickerComponent, CoreDropdownComponent, CoreLineComponent, CoreMonthPickerComponent, CorePageEditComponent, CoreYearPickerComponent, FullscreenModalLoaderComponent, MapAvatarToServerPipe, NormalizeHumanNamePipe, TableCellPipe, TranslatePipe } from 'ngx-histaff-alpha';

@NgModule({
    declarations: [
        RegisterOffComponent,
        RegisterOffEditComponent,
        RegisterOvertimeComponent,
        ExplainWorkComponent,
        RegisterHistoryComponent,
        RegisterHistoryComponent,
        RegisterHistoryEditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RegisterOffRoutingModule,
        TranslatePipe,
        MapAvatarToServerPipe,
        TableCellPipe,
        NormalizeHumanNamePipe,
        CorePageEditComponent,
        CoreControlComponent,
        CoreDatePickerComponent,
        CoreDropdownComponent,
        CoreMonthPickerComponent,
        CoreLineComponent,
        CoreYearPickerComponent,
        CoreButtonGroupVnsComponent,
        CoreCheckboxComponent,
        FullscreenModalLoaderComponent
    ],
    exports: [ExplainWorkComponent]
})
export class RegisterOffModule { }
