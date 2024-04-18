
import { Component } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { OverTimeService } from "../overtime.service";
import { BehaviorSubject, Subscription, map } from "rxjs";
import { Validators, FormGroup } from "@angular/forms";
import { BaseEditComponent, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, CoreFormService } from "ngx-histaff-alpha";
@Component({
  selector: 'app-overtime-edit',
  templateUrl: './overtime-edit.component.html',
  styleUrls: ['./overtime-edit.component.scss']
})
export class OvertimeEditComponent  extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */
  override entityTable = 'AT_OVERTIME';

  year!: number;
  periodId!: number;
  employeeId!: number;
  minDate!: Date;
  maxDate!: Date;
  subsctiptions: Subscription[] = [];

  loading: boolean = false;

    employeeGetByIdObject$ = new BehaviorSubject<any>(null);
    employeeGetByIdApi = api.HU_EMPLOYEE_READ;

    captionCode!: EnumTranslateKey;
    formComposition!: ICorePageEditColumnComposition[][];
    crud!: ICorePageEditCRUD;
    sections: ICoreFormSection[] =
    [
      {
        updateModeOnly:true,
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
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'periodId',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'number'
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_EMPLOYEECODE,
              field: 'employeeId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              getByIdObject$: this.employeeGetByIdObject$,
              getByIdApi: this.employeeGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'code',
              alsoBindTo: [{ takeFrom: 'fullname', bindTo: 'employeeName' },
                            { takeFrom: 'orgName', bindTo: 'orgName' },
                           { takeFrom: 'positionName', bindTo: 'positionName' },],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'text',
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_EMPLOYEENAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_ORGNAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_TITLENAME,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
          ],
          
        ]
      },
      {
        rows:[
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_START_DATE,
              field: 'startDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
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
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_END_DATE,
              field: 'endDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
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
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_TIME_START,
              field: 'timeStartStr',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'time',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_TIME_END,
              field: 'timeEndStr',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'time',
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
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_REASON,
              field: 'reason',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_FILE_NAME,
              field: 'firstAttachmentBuffer',
              value: null,
              controlType: EnumFormBaseContolType.ATTACHMENT,
              assignTo: 'fileName',
              type: 'object',
            },
          ], 
        ]
      },
      {
        addModeOnly:true,
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_EMPLOYEE_CHECKER,
              field: 'employeeIds',
              value: [],
              controlType: EnumFormBaseContolType.SEEKER,
              type: 'object',
              /* 
                START: Thay đổi thuộc tính của SEEKER để có SELECTOR:
              */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              multiMode: true,
              objectList$: new BehaviorSubject<any[]>([]),
              getObjectListFrom: 'employeeList',
              getByIdObject$: this.employeeGetByIdObject$,
              getByIdApi: this.employeeGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'fullname',
              // alsoBindTo: [{ takeFrom: 'positionName', bindTo: 'signPosition' }],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]

            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
              field: 'employeeList',
              value: [],
              controlType: EnumFormBaseContolType.HIDDEN,
              type: 'object',
            },
          ]
        ]
      }
    ];

  constructor(
    public override dialogService: DialogService,
    private coreFormService: CoreFormService,
    private overTimeService: OverTimeService
    ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_OVERTIME_EDIT;

    this.crud = {
      c: api.AT_OVERTIME_CREATE,
      r: api.AT_OVERTIME_READ,
      u: api.AT_OVERTIME_UPDATE,
      d: api.AT_OVERTIME_DELETE,
    };

    this.overTimeService.currentSelectedYear.subscribe(year => this.year = year);

    this.overTimeService.currentperiodId.subscribe(id => this.periodId = id);
    
    this.overTimeService.currentemployeeSelected.subscribe(id => this.employeeId = id);

    this.overTimeService.currentMinDate.subscribe(date => this.minDate = new Date(new Date(date).setHours(0,0,0,0)));

    this.overTimeService.currentMaxDate.subscribe(date => this.maxDate = new Date(new Date(date).setHours(23,59,59,999)));
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;

    if (!!!this.periodId || this.periodId === 0) {
      this.subsctiptions.push(
        this.overTimeService.getCurrentPeriodSalary()
          .pipe(
            map((f: any) => {
              let options: number;
              options = f.body.innerBody.id;
              this.periodId = options;
              console.log(this.periodId);
              return options;
            })
          )
          .subscribe(response => {
            if (this.form.get('periodId')?.value == "")
              this.form.get('periodId')?.patchValue(response);
          })
      )!
    }

    
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;

    if (this.periodId != 0) {
      if (this.form.get('periodId')?.value == "")
        this.form.get('periodId')?.patchValue(this.periodId);
    }
    if (this.employeeId != 0) {
      if (this.form.get('id')?.value == "")
        this.form.get('id')?.patchValue(this.employeeId);
    }
  }
}
