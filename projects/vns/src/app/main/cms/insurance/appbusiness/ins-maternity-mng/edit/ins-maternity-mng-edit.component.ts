import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageEditComponent, CorePageHeaderComponent, BaseEditComponent, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, DialogService, MultiLanguageService, CommonHttpRequestService, AppService, CoreFormService, CustomValidators } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-ins-maternity-mng-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CorePageEditComponent,
    CorePageHeaderComponent,
  ],
  templateUrl: './ins-maternity-mng-edit.component.html',
  styleUrl: './ins-maternity-mng-edit.component.scss'
})
export class InsMaternityMngEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy{
  
  /* Properties to be passed into core-page-edit */
  override entityTable = "INS_MATERNITY_MNG";


  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;

  loading: boolean = false;
  bufferForm!: FormGroup;
  subscriptions: Subscription[] = [];

  /*--------------------------- Employee Seeker ---------------------------*/ 
  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  sections: ICoreFormSection[] =
  [
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_INS_MATERNITY_MNG_INFOR,
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_ID,
            field: 'id',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'number'
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_EMPLOYEE_CODE,   // Mã NV
            field: 'employeeId',
            value: '',
            controlType: EnumFormBaseContolType.SEEKER,

            /* 
              START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
              we must pass the three properties bellow:
            */
            seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,    
            getByIdObject$: this.employeeGetByIdObject$,
            getByIdApi: this.employeeGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'code',
            alsoBindTo: [{ takeFrom: 'fullname', bindTo: 'employeeName' },
            { takeFrom: 'orgName', bindTo: 'orgName' },
            { takeFrom: 'positionName', bindTo: 'posName' },
            { takeFrom: 'orgId', bindTo: 'orgId' },
            ],
            /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ],
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_EMPLOYEE_NAME,   // Họ và tên
            field: 'employeeName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
            disabled: true,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_EMPLOYEE_DEPARTMENT,   // Ban/Phòng
            field: 'orgName', 
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
            disabled: true,
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_EMPLOYEE_POSITION,   // Vị trí
            field: 'posName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
            disabled: true,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_FROM_DATE,    // Nghỉ sinh từ ngày
            field: 'fromDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'fromDate',
                validator: InsMaternityMngEditComponent.fromDate,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EXPIREDATE_LESS_THAN_EFFECTDATE,
              },
            ],
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_TO_DATE,    // Nghỉ sinh tới ngày
            field: 'toDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'toDate',
                validator: InsMaternityMngEditComponent.toDate,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EXPIREDATE_LESS_THAN_EFFECTDATE,
              },
            ],
          },
          
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_FROM_DATE_ENJOY,   // Ngày hưởng chế độ thai sản
            field: 'fromDateEnjoy',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_TO_DATE_ENJOY,   // Ngày kết thúc hưởng chế độ thai sản
            field: 'toDateEnjoy',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_TIEN_TAM_UNG,  // Tiền tạm ứng
            field: 'tienTamUng',
            value: '',
            controlType: EnumFormBaseContolType.CURRENCY,
            pipe: EnumCoreTablePipeType.NUMBER,
            type: 'number',
          },
          
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_IS_NGHI_THAI_SAN,    // Nghỉ thai sản
            field: 'isNghiThaiSan',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_NGAY_DI_LAM_SOM,   // Ngày đi làm sớm 
            field: 'ngayDiLamSom',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_NGAY_DU_SINH,   // 	Ngày dự sinh
            field: 'ngayDuSinh',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
          },
        ],
        [
          
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_SO_CON,   // 	Số con
            field: 'soCon',
            value: 1,
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
          },
          {
            flexSize: 8,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_NOTE,   // 	Ghi chú
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
          
        ]
      ]
    },
    
  ];

  constructor(
    //private _coreService: CoreService,
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private commonHttpRequestService: CommonHttpRequestService,
    private appService: AppService, // CoreService is DEPRECATED!!!
    private coreFormService: CoreFormService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_INS_MATERNITY_MNG_EDIT;

    this.crud = {
      c: api.INS_MATERNITY_MNG_CREATE,
      r: api.INS_MATERNITY_MNG_READ,
      u: api.INS_MATERNITY_MNG_UPDATE,
      d: api.INS_MATERNITY_MNG_DELETE_IDS,
    };
  }

  onFormCreated(e: FormGroup): void {
    this.form = e;
    console.log(this.form);
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

  protected static fromDate(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = "";
    const fromDate = date.value;
    const toDate = date.parent?.get("toDate")?.value;
    if (toDate != "" && toDate != null && fromDate != null) {
      if (fromDate > new Date(toDate)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_FORM_CONTROL_ERROR_FROM_DATE_LESS_THAN_TO_DATE
        return CustomValidators.core("fromdate", false, errorMessage)(date)
      } else {
        date.parent?.get("fromdate")?.setErrors(null);
        date.parent?.get("toDate")?.setErrors(null);
      }
    }
  }

  protected static toDate(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = "";
    const fromDate = date.parent?.get("fromDate")?.value;
    const toDate = date.value;
    if (toDate != "" && toDate != null) {
      if (fromDate != "" && fromDate != null && toDate < new Date(fromDate)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_FORM_CONTROL_ERROR_TO_DATE_MORE_THAN_FROM_DATE
        return CustomValidators.core("toDate", false, errorMessage)(date)
      } else {
        date.parent?.get("fromDate")?.setErrors(null);
        date.parent?.get("toDate")?.setErrors(null);
      }
    } else {
      // date.parent?.get("fromDate")?.setErrors(null);
      date.parent?.get("toDate")?.setErrors(null);
    }
  }
}
