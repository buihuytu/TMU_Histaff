
import { Component } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, AppService, IFormatedResponse } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription } from "rxjs";
import { AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-sun-per-edit',
  templateUrl: './sun-per-edit.component.html',
  styleUrls: ['./sun-per-edit.component.scss']
})
export class SunPerEditComponent  extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */
  override entityTable = 'AT_DECLARE_SENIORITY';

  loading: boolean = false;

    salaryPeriodOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
    atSalaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
    atSalaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;


    atSalaryPeriodGetById2Object$ = new BehaviorSubject<any>(null);
    atSalaryPeriodGetById2Api = api.AT_SALARY_PERIOD_READ;


    employeeGetByIdObject$ = new BehaviorSubject<any>(null);
    employeeGetByIdApi = api.HU_EMPLOYEE_READ;
    subsctiptions: Subscription[] = [];
    captionCode!: EnumTranslateKey;
    formComposition!: ICorePageEditColumnComposition[][];
    crud!: ICorePageEditCRUD;
    sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: 0,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            }
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_EMPLOYEECODE,
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
              alsoBindTo: [
                            { takeFrom: 'fullname', bindTo: 'employeeName' },
                            { takeFrom: 'positionName', bindTo: 'positionName' },
                            { takeFrom: 'orgName', bindTo: 'orgName' }],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_EMPLOYEENAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text', 
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_ORGNAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text', 
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_TITLENAME,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_YEAR_DECLARE,
              field: 'yearDeclare',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'number',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_MONTH_ADJUST,
              field: 'monthAdjust',
              value: '',
              getByIdObject$: this.atSalaryPeriodGetByIdObject$,
              getByIdApi: this.atSalaryPeriodGetByIdApi,
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              dropdownOptions$: this.salaryPeriodOptions$,
              type: 'text',
              disabled: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_NUMBER_MONTH_ADJUST,
              field: 'monthAdjustNumber',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'number',
              validators: [
                {
                  name: 'CheckForMonthAdjustNumber',
                  validator: SunPerEditComponent.CheckForMonthAdjustNumber,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_CHECK_FOR_MONTH_ADJUST_NUMBER,
                }
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_REASON_ADJUST_SENIORITY,
              field: 'reasonAdjust',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
            }
          ], 

          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_MONTH_DAY_OFF,
              field: 'monthDayOff',
              value: '',
              getByIdObject$: this.atSalaryPeriodGetById2Object$,
              getByIdApi: this.atSalaryPeriodGetById2Api,
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              dropdownOptions$: this.salaryPeriodOptions$,
              type: 'text',
              disabled: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_NUMBER_DAY_OFF,
              field: 'numberDayOff',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'number',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_REASON_ADJUST_DAY_OFF,
              field: 'reasonAdjustDayOff',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECLARE_SENIORITY_ADJUST_TOTAL_DAY_OFF,
              field: 'total',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'number',
            }
          ], 
        ]
      }
    ];

  constructor(public override dialogService: DialogService,
    private appService: AppService,
    ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_DECLARE_SENIORITY_EDIT;

    this.crud = {
      c: api.AT_DECLARE_SENIORITY_CREATE,
      r: api.AT_DECLARE_SENIORITY_READ,
      u: api.AT_DECLARE_SENIORITY_UPDATE,
      d: api.AT_DECLARE_SENIORITY_DELETE,
    };
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;


    const yearDeclare = this.form.get('yearDeclare');
    if (yearDeclare) {
      this.subsctiptions.push(
        yearDeclare.valueChanges.subscribe((x: any) => {
          if (yearDeclare.value != null && yearDeclare.value != "") {
            this.form.get('monthAdjust')?.enable();
            this.form.get('monthDayOff')?.enable();
          }
          else {
            this.form.get('monthAdjust')?.disable();
            this.form.get('monthDayOff')?.disable();
          }
          if (!!x) {
            this.subsctiptions.push(
              this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_IN_YEAR, { year: yearDeclare.value }).subscribe((x) => {
                if (x.ok && x.status === 200) {
                  const body: IFormatedResponse = x.body;
                  if (body.statusCode === 200) {
                    const options: { value: number; text: string; code: string }[] = [];
                    body.innerBody.map((get: any) => {
                      options.push({
                        value: get.id,
                        text: get.name,
                        code: get.month,
                      });
                    });
                    this.salaryPeriodOptions$.next(options);
                  } 
                }
              }),
            );
          } else {
            this.form.get('monthAdjust')?.setValue(null);
            this.form.get('monthAdjust')?.disable();
            this.form.get('monthDayOff')?.setValue(null);
            this.form.get('monthDayOff')?.disable();
          }
        })
      )
    }
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  // check data is decimal
  static isDecimal(value: number): boolean {
    return value % 1 !== 0;
  }

  static CheckForMonthAdjustNumber(parameter: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const monthAdjustNumber = parameter.value;

    if (monthAdjustNumber != '' && monthAdjustNumber != null) {
      if (SunPerEditComponent.isDecimal(monthAdjustNumber) == true) {
        valid = false;
        
        errorMessage = EnumTranslateKey.UI_FORM_CONTROL_CHECK_FOR_MONTH_ADJUST_NUMBER;
        
        return CustomValidators.core('monthAdjustNumber', valid, errorMessage)(parameter);
      }
      else {
        parameter.parent?.get('monthAdjustNumber')?.setErrors(null);
      }
    }
    else {
      parameter.parent?.get('monthAdjustNumber')?.setErrors(null);
    }
  }
}
