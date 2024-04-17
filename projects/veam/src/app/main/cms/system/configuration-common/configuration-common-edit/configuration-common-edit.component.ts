// thêm thư viện
import { Component, OnInit } from '@angular/core';

// cần sử dụng kiểu dữ liệu ConfigurationCommonEditService
// để khai báo thuộc tính
// ở bên trong constructor
import { ConfigurationCommonEditService } from './configuration-common-edit.service';

// cần sử dụng kiểu dữ liệu FormGroup
import { FormGroup, Validators } from '@angular/forms';
import { BaseEditComponent, DialogService, EnumFormBaseContolType, ICoreFormSection, ICorePageEditCRUD } from 'ngx-histaff-alpha';
import { EnumTranslateKey, api } from 'alpha-global-constants';


// khai báo bộ trang trí (decorator)
@Component({
  selector: 'app-configuration-common-edit',
  templateUrl: './configuration-common-edit.component.html',
  styleUrls: ['./configuration-common-edit.component.scss']
})


// khai báo lớp
export class ConfigurationCommonEditComponent extends BaseEditComponent implements OnInit {
  // khai báo thuộc tính captionCode
  // để thiết lập tiêu đề cho Pop Up
  public captionCode!: EnumTranslateKey;

  // thuộc tính sections
  // để hứng dữ liệu gọi từ API
  public sections: ICoreFormSection[] = [
    {
      rows: [
        // dòng thứ 0
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
        ],

        // dòng thứ 1
        [
          {
            // trường 1:
            // Số lần login lỗi tối đa
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_SYS_CONFIGURATION_COMMON_YOUR_MAXIMUM_TURN,
            field: 'yourMaximumTurn',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            // trường 2:
            // Cổng thông tin
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_SYS_CONFIGURATION_COMMON_PORTAL_PORT,
            field: 'portalPort',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            // trường 3:
            // Cổng ứng dụng
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_SYS_CONFIGURATION_COMMON_APPLICATION_PORT,
            field: 'applicationPort',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            // trường 4:
            // Độ dài tối thiểu mật khẩu
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_SYS_CONFIGURATION_COMMON_MINIMUM_LENGTH,
            field: 'minimumLength',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          }
        ],

        // dòng thứ 2
        [
          {
            // trường 5:
            // ký tự chữ hoa
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_SYS_CONFIGURATION_COMMON_IS_UPPERCASE,
            field: 'isUppercase',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            readonly: false,
            type: 'boolean',
          },
          {
            // trường 6:
            // Ký tự số
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_SYS_CONFIGURATION_COMMON_IS_NUMBER,
            field: 'isNumber',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            readonly: false,
            type: 'boolean',
          },
          {
            // trường 7:
            // Ký tự chữ thường
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_SYS_CONFIGURATION_COMMON_IS_LOWERCASE,
            field: 'isLowercase',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            readonly: false,
            type: 'boolean',
          },
          {
            // trường 8:
            // Ký tự đặc biệt
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_SYS_CONFIGURATION_COMMON_IS_SPECIAL_CHAR,
            field: 'isSpecialChar',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            readonly: false,
            type: 'boolean',
          }
        ]
      ]
    },
  ];


  // khai báo thuộc tính crud
  // để chứa các đường dẫn API
  public crud!: ICorePageEditCRUD;


  // khai báo thuộc tính entityTable
  // nhưng phải ghi đè
  // vì kế thừa lớp BaseEditComponent
  public override entityTable: string = "SYS_CONFIGURATION_COMMON";


  // khai báo thuộc tính loading
  public loading: boolean = false;


  // hàm khởi tạo
  constructor(
    // vì kế thừa nên phải khai báo
    public override dialogService: DialogService,
    private configurationCommonEditService: ConfigurationCommonEditService
  )
  {
    // nhìn code như này
    // tức là truyền thuộc tính dialogService
    // vào hàm khởi tạo của lớp cha
    // dialogService lúc này được gọi là đối số
    // lớp cha mà lớp con kế thừa chính là "BaseEditComponent"
    super(dialogService);


    this.crud = {
      c: api.SYS_CONFIGURATION_COMMON_CREATE,
      r: api.SYS_CONFIGURATION_COMMON_READ,
      u: api.SYS_CONFIGURATION_COMMON_UPDATE,
      d: api.SYS_CONFIGURATION_COMMON_DELETE_IDS,
    };


    this.captionCode = EnumTranslateKey.UI_TITLE_SYS_CONFIGURATION_COMMON;
  }


  // khi đến giai đoạn OnInit
  // thì nó sẽ gọi hàm ngOnInit()
  public ngOnInit(): void {
    this.loading = true;
  }


  // khai báo phương thức
  // vì kế thừa
  public onFormCreated(e: FormGroup): void {
    this.form = e;
  }


  // khai báo phương thức
  // vì kế thừa
  public onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}