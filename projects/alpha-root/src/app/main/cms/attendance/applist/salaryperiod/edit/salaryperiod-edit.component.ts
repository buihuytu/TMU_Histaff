import {Component, Input, AfterViewInit} from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, EnumCoreOrgTreeaAccessorMode, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, OrganizationService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-salaryperiod-edit',
  templateUrl: './salaryperiod-edit.component.html',
  styleUrls: ['./salaryperiod-edit.component.scss'],
})
export class SalaryPeriodEditComponent extends BaseEditComponent implements AfterViewInit{
  loading: boolean = false;
  @Input() accessorMode!: EnumCoreOrgTreeaAccessorMode;
  override entityTable = 'AT_SALARY_PERIOD';
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  subsctiptions: Subscription[] = [];

  leftSections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
            field: 'orgIds',
            value: [],
            controlType: EnumFormBaseContolType.ORGTREECHECK,
            type: 'object',
          },
        ],
      ],
    },
  ];

  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'id',
            value: null,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            type: 'text',
            hidden: true,
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_YEAR,
            field: 'year',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            shownFrom: 'name',
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'min',
                validator: Validators.min(1000),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              },
              {
                name: 'max',
                validator: Validators.max(9999),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MAX,
              },
            ],

          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_MONTH,
            field: 'month',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            shownFrom: 'name',
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'min',
                validator: Validators.min(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              },
              {
                name: 'max',
                validator: Validators.max(12),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MAX,
              },
            ],

          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_NAME,
            field: 'name',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            shownFrom: 'name',
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'minLength',
                validator: Validators.minLength(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],

          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_DATE_START,
            field: 'startDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            shownFrom: 'name',
            type: 'Date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'minLength',
                validator: Validators.minLength(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],

          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_DATE_END,
            field: 'endDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            shownFrom: 'name',
            type: 'Date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'minLength',
                validator: Validators.minLength(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],

          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            shownFrom: 'name',
            type: 'text',
          },
        ],
      ],
    },

  ];
  constructor(
    public override dialogService: DialogService,
    private organizationService: OrganizationService,
  ) {
    super(dialogService);
    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_EDIT;
    this.crud = {
      c: api.AT_SALARY_PERIOD_CREATE_WITH_LIST_AT_ORG_PERIOD,
      r: api.AT_SALARY_PERIOD_READ,
      u: api.AT_SALARY_PERIOD_UPDATE_WITH_LIST_AT_ORG_PERIOD,
      d: api.AT_SALARY_PERIOD_DELETE_IDS,
    };
    this.organizationService.status$.next({
      ...this.organizationService.status$.value,
      checkedKeys: [],
      activeKeys: []
    })
  }

  ngOnInit(): void { }
  /* GET FormGroup Instance */
  onFormCreated(e: any): void {
    this.form = e;    
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    // this.salaryPeriodService.orgIds = [];
    // console.log(this.salaryPeriodService.orgIds);
    this.subsctiptions.map(x => x?.unsubscribe())
  }

  ngAfterViewInit(): void {
    
    if (!!!this.form.get('id')?.value) { // Nếu là form thêm mới
      setTimeout(() => {
        this.form.get('orgIds')?.patchValue([])
      }) // <== Chờ cho orgTreeData của CoreOrgTree nhận được xong giá trị 
    }
  }

}
