// thêm thư viện
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  TemplateRef
}
from '@angular/core';

// cần sử dụng
// kiểu dữ liệu "BehaviorSubject"
// để khai báo thuộc tính
// BehaviorSubject dịch ra là chủ thể của hành vi
import { BehaviorSubject } from 'rxjs';

// cần sử dụng "ViewChild"
// để tạo ra cái checkbox
import { ViewChild } from '@angular/core';
import { ICorePageListApiDefinition,ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, ICorePageListCRUD } from 'ngx-histaff-alpha';
import { EnumTranslateKey, api } from 'alpha-global-constants';


// khai báo bộ trang trí (decorator)
@Component({
  selector: 'app-configuration-common',
  templateUrl: './configuration-common.component.html',
  styleUrls: ['./configuration-common.component.scss']
})


// khai báo lớp
export class ConfigurationCommonComponent implements OnInit, AfterViewInit, OnDestroy {
  // thuộc tính "apiDefinition"
  // sẽ được gọi trong thẻ "core-page-list"
  public apiDefinition: ICorePageListApiDefinition = {
    // cái này để gọi api
    // sau đó in dữ liệu ra bảng
    queryListRelativePath: api.SYS_CONFIGURATION_COMMON_QUERY_LIST
  };


  // khai báo thuộc tính
  @ViewChild('isUppercase') isUppercase!: TemplateRef<any>;
  @ViewChild('isNumber') isNumber!: TemplateRef<any>;
  @ViewChild('isLowercase') isLowercase!: TemplateRef<any>;
  @ViewChild('isSpecialChar') isSpecialChar!: TemplateRef<any>;
  public checkboxTemplate!: TemplateRef<any>;


  // thuộc tính "columns"
  // sẽ được gọi trong thẻ "core-page-list"
  columns: ICoreTableColumnItem[] = [
    {
      caption: 'id',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      // trường 1:
      // số lần login lỗi tối đa
      caption: EnumTranslateKey.UI_LABEL_SYS_CONFIGURATION_COMMON_YOUR_MAXIMUM_TURN,
      field: 'yourMaximumTurn',
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      // trường 2:
      // cổng thông tin
      caption: EnumTranslateKey.UI_LABEL_SYS_CONFIGURATION_COMMON_PORTAL_PORT,
      field: 'portalPort',
      type: 'number',
      align: 'left',
      width: 160,
    },
    {
      // trường 3:
      // cổng ứng dụng
      caption: EnumTranslateKey.UI_LABEL_SYS_CONFIGURATION_COMMON_APPLICATION_PORT,
      field: 'applicationPort',
      type: 'number',
      align: 'left',
      width: 160,
      // hidden: true,
    },
    {
      // trường 4:
      // độ dài tối thiểu mật khẩu
      caption: EnumTranslateKey.UI_LABEL_SYS_CONFIGURATION_COMMON_MINIMUM_LENGTH,
      field: 'minimumLength',
      type: 'number',
      align: 'left',
      width: 240,
    },
    {
      // trường 5:
      // ký tự chữ hoa
      caption: EnumTranslateKey.UI_LABEL_SYS_CONFIGURATION_COMMON_IS_UPPERCASE,
      field: 'isUppercase',
      type: 'bool',
      align: 'left',
      width: 160,

      // khi dùng cái pipe này
      // thì giao diện in ra chữ "Đúng"
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
    },
    {
      // trường 6:
      // ký tự số
      caption: EnumTranslateKey.UI_LABEL_SYS_CONFIGURATION_COMMON_IS_NUMBER,
      field: 'isNumber',
      type: 'bool',
      align: 'left',
      width: 160,

      // khi dùng cái pipe này
      // thì giao diện in ra chữ "Đúng"
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
    },
    {
      // trường 7:
      // ký tự chữ thường
      caption: EnumTranslateKey.UI_LABEL_SYS_CONFIGURATION_COMMON_IS_LOWERCASE,
      field: 'isLowercase',
      type: 'bool',
      align: 'left',
      width: 160,

      // khi dùng cái pipe này
      // thì giao diện in ra chữ "Đúng"
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
    },
    {
      // trường 8:
      // ký tự đặc biệt
      caption: EnumTranslateKey.UI_LABEL_SYS_CONFIGURATION_COMMON_IS_SPECIAL_CHAR,
      field: 'isSpecialChar',
      type: 'bool',

      // khi dùng cái pipe này
      // thì giao diện in ra chữ "Đúng"
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      
      align: 'left',
      readonly: true,
      templateRef: this.checkboxTemplate,
      width: 160,
    }
  ];


  // khai báo thuộc tính
  // để in ra tiêu đề
  public title = EnumTranslateKey.UI_TITLE_SYS_CONFIGURATION_COMMON;

  
  // khai báo thuộc tính "editRoute"
  // để chuyển hướng đến Pop Up
  public editRoute: ICorePageListEditRouting = {
    // auxiliary là phụ trợ
    // đồng nghĩa với support
    auxiliary: 'popupAux',
  };


  // khai báo thuộc tính "crud"
  // để thiết lập API xóa nhiều bản ghi
  public crud: ICorePageListCRUD = {
    deleteIds: api.SYS_CONFIGURATION_COMMON_DELETE_IDS,
  };


  // khai báo thuộc tính "outerParam$"
  // có tác dụng
  // "outer Param" là thông số bên ngoài
  public outerParam$ = new BehaviorSubject<any>(null);


  // hàm khởi tạo
  public constructor() { }


  // hàm ngOnInit()
  // tương đương với giai đoạn ngOnInit
  // trong vòng đời của 1 component
  public ngOnInit(): void {
  }


  // hàm ngAfterViewInit()
  // tương đương với giai đoạn ngAfterViewInit
  // trong vòng đời của 1 component
  public ngAfterViewInit(): void {
    // chỗ này để tạo ra cái checkbox
    this.columns.filter((c) => c.field === 'isUppercase')[0].templateRef = this.isUppercase;
    this.columns.filter((c) => c.field === 'isNumber')[0].templateRef = this.isNumber;
    this.columns.filter((c) => c.field === 'isLowercase')[0].templateRef = this.isLowercase;
    this.columns.filter((c) => c.field === 'isSpecialChar')[0].templateRef = this.isSpecialChar;
  }


  public ngOnDestroy(): void {
    
  }
}