import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CorePageListComponent, CoreCheckboxComponent, CoreOrgTreeComponent, CoreDropdownComponent, CoreFormControlSeekerComponent, CoreChecklistComponent, CoreButtonGroupVnsComponent, CorePageHeaderComponent, CoreCompositionComponent, CoreTableComponent, FullscreenModalLoaderComponent, CorePaginationFullComponent, TranslatePipe } from "ngx-histaff-alpha";
import { ImportSalaryBackdateComponent } from "./import-salary-backdate.component";
import { FormsModule } from "@angular/forms";

// tạo biến routes
const routes: Routes = [
  {
    path: '',
    component: ImportSalaryBackdateComponent
  }
];


// khai báo bộ trang trí (decorator)
@NgModule({
  declarations: [
    ImportSalaryBackdateComponent
  ],
  imports: [
    RouterModule.forChild(routes),

    FormsModule,
    TranslatePipe,
    
    // vì bạn có dòng code
    // *ngIf="!!sections.length"
    // nên phải thêm CommonModule
    CommonModule,

    // thẻ core-page-list
    CorePageListComponent,

    // thẻ core-checkbox
    CoreCheckboxComponent,

    // thẻ core-org-tree
    CoreOrgTreeComponent,

    // sửa lỗi do
    // thuộc tính [options$] báo lỗi đỏ
    // cách sửa lỗi là thêm thư viện
    // liên quan đến Drop Down List
    CoreDropdownComponent,

    // thẻ core-form-control-seeker
    CoreFormControlSeekerComponent,

    // thẻ core-checklist
    CoreChecklistComponent,

    // thẻ core-button-group-vns
    CoreButtonGroupVnsComponent,

    // thẻ core-page-header
    CorePageHeaderComponent,

    // thẻ core-composition
    CoreCompositionComponent,

    // thẻ core-table
    CoreTableComponent,
    FullscreenModalLoaderComponent,

    // thẻ core-pagination-full
    CorePaginationFullComponent
  ],
})


// khai báo lớp
export class ImportSalaryBackdateModule {}