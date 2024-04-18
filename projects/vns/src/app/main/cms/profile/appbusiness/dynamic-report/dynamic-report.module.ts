import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicReportRoutingModule } from './dynamic-report-routing.module';
import { DynamicReportComponent } from './dynamic-report/dynamic-report.component';
import { CoreButtonGroupVnsComponent, CoreCheckboxComponent, CoreCommonParamKitComponent, CoreCompositionComponent, CoreDropdownComponent, CoreOrgTreeComponent, CorePageHeaderComponent, CorePaginationFullComponent, CoreQueryBuilderComponent, CoreTableComponent, FilterPipe, TranslatePipe } from 'ngx-histaff-alpha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        DynamicReportComponent
    ],
    imports: [
        CommonModule,
        TranslatePipe,
        FilterPipe,
        DynamicReportRoutingModule,
        CoreCompositionComponent,
        CorePageHeaderComponent,
        CoreOrgTreeComponent,
        FormsModule,
        ReactiveFormsModule,
        CoreButtonGroupVnsComponent,
        CoreTableComponent,
        CoreDropdownComponent,
        CorePaginationFullComponent,
        CoreCheckboxComponent,
        CoreQueryBuilderComponent,
        CoreCommonParamKitComponent,
    ]
})
export class DynamicReportModule { }
