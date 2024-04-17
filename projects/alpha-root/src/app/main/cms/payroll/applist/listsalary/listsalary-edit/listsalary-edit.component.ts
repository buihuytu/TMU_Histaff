import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, AppService, DialogService, MultiLanguageService, IFormatedResponse } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-listsalary-edit',
  templateUrl: './listsalary-edit.component.html',
  styleUrls: ['./listsalary-edit.component.scss']
})
export class ListSalaryEditComponent extends BaseEditComponent implements OnInit, OnDestroy {

  override entityTable = "PA_LISTSAL";

  loading: boolean = false;

  subsctiptions: Subscription[] = [];

  sysOtherlistGetByIdObject$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi = api.SYS_OTHERLIST_READ;

  sysOtherlistGetById2Object$ = new BehaviorSubject<any>(null);
  sysOtherlistGetById2Api = api.SYS_OTHERLIST_READ;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  // sửa cái region ban đầu
  // thành cái kiểu dữ liệu
  kieu_DuLieu$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  // sửa cái unit ban đầu
  // thành cái nhóm ký hiệu
  nhom_KH$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              // đây là trường id
              // nhưng đã bị ẩn
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden:true,
              type: 'text'
            },
            {
              // trường trạng thái
              // nhưng bị ẩn đi
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_IS_ACTIVE,
              field: 'isActive',
              value: 'true',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'boolean',
              hidden:true
            },
          ],
          [
            {
              // đây là trường mã danh mục lương
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_CODE,
              field: 'codeListsal',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              // đây là trường tên tiếng việt
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_NAME_VN,
              field: 'nameVn',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              // đây là trường tên tiếng Anh
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_NAME_EN,
              field: 'nameEn',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text'
            },
        ],
        [
            {
              // đây là DropDownList chọn kiểu dữ liệu
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_DATA_TYPE_NAME,
              field: 'dataTypeId',
              value: '',
              getByIdObject$: this.sysOtherlistGetByIdObject$,
              getByIdApi: this.sysOtherlistGetByIdApi,
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.kieu_DuLieu$,
              type: 'number'
            },
            {
              // đây là DropDownList chọn nhóm ký hiệu
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_LIST_KH_NAME,
              field: 'listKyhieuId',
              value: '',
              getByIdObject$: this.sysOtherlistGetById2Object$,
              getByIdApi: this.sysOtherlistGetById2Api,
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.nhom_KH$,
              type: 'number'
            },
            {
              // đây là trường thứ tự
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_ORDERLY,
              field: 'thuTu',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
              }
        ],
          
          [
            {
              flexSize: 8,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_STT,
              field: 'order',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
          ],
        ]
      },
    ];
  constructor(
    private appService: AppService ,
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSAL_EDIT;

    this.crud = {
      c: api.PA_LISTSAL_CREATE,
      r: api.PA_LISTSAL_READ,
      u: api.PA_LISTSAL_UPDATE,
      d: api.PA_LISTSAL_DELETE,
    };

  }
  ngOnInit(): void {
    this.loading = true;
    this.subsctiptions.push(
      this.appService
      .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'DATA_TYPE')
      .subscribe((res: any) => {

        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string; }[] = [];
            options.push({
              value: null,
              text: ''
            })
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            this.kieu_DuLieu$.next(options);
            // END ONE LOGIC
          }
        }
      }),

      this.appService

      // cái mã SYM_LIST
      // là ở trong bảng SYS_OTHER_LIST_TYPE
      .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'SYM_LIST')
      .subscribe((res: any) => {

        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string; }[] = [];
            options.push({
              value: null,
              text: ''
            })
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            this.nhom_KH$.next(options);
            // END ONE LOGIC
          }
        }
      })
    )
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subsctiptions.map(x => x?.unsubscribe())
  }
}
