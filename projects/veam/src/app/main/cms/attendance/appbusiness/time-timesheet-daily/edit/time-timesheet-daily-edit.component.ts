import { Component } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, CoreFormService } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription } from "rxjs";
import { TimeTimesheetDailyEditService } from "./time-timesheet-daily-edit.service";
import { EnumTranslateKey, api } from 'alpha-global-constants';
@Component({
  selector: "app-time-timesheet-daily-edit",
  templateUrl: "./time-timesheet-daily-edit.component.html",
  styleUrls: ["./time-timesheet-daily-edit.component.scss"]
})
export class TimeTimesheetDailylEditComponent extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */
  override entityTable = "AT_TIME_TIMESHEET_DAILY";

  loading: boolean = false;

  timeTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atTimeTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  atTimeTypeGetByIdApi = api.AT_SHIFT_GET_TIME_TYPE_BY_ID;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  subsctiptions: Subscription[] = [];
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
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_EMPLOYEE_CODE,
              field: 'employeeId',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: true,
              hidden: true,
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_EMPLOYEE_CODE,
              field: 'employeeCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_EMPLOYEE_NAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              disabled: true,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_POSITION_NAME,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_DEPARTMENT_NAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              disabled: true,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_WORKINGDAY,
              field: 'workingday',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              disabled: true,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_SHIFT_TYPE,
              field: 'manualId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.timeTypeOptions$,
              getByIdObject$: this.atTimeTypeGetByIdObject$,
              getByIdApi: this.atTimeTypeGetByIdApi,
              shownFrom: 'name',
              readonly: false,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_REASON,
              field: 'reason',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              //   validators: [
              //     {
              //         name: 'required',
              //         validator: Validators.required,
              //         errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //     }
              //   ]
            }
          ],
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_REASON,
              field: 'orgStatus',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              hidden: true
              //   validators: [
              //     {
              //         name: 'required',
              //         validator: Validators.required,
              //         errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //     }
              //   ]
            }
          ]
        ]
      }
    ];

  constructor(
    public override dialogService: DialogService,
    public timeTimesheetDailyEditService: TimeTimesheetDailyEditService,
    private appService: AppService,
    private coreFormService: CoreFormService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_TIME_TIMESHEET_DAILY_EDIT;

    this.crud = {
      c: api.AT_TIME_TIMESHEET_DAILY_CREATE,
      r: api.AT_TIME_TIMESHEET_DAILY_READ,
      u: api.AT_TIME_TIMESHEET_DAILY_UPDATE,
      d: api.AT_TIME_TIMESHEET_DAILY_DELETE,
    };
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.appService.get(api.AT_SHIFT_TIME_TYPE).subscribe((res: any) => {
      const options: { value: number; text: string }[] = [];
      options.push({
        value: 0,
        text: '',
      });
      res.body.innerBody.map((g: any) => {
        options.push({
          value: g.id,
          text: g.name,
        });
      });
      this.timeTypeOptions$.next(options);
      this.loading = false;
    });
      var orgStatus =this.form.get('orgStatus')?.value;
      if(orgStatus === 1){
        // this.form.disable();
        this.form.get("manualId")?.disable();
        this.form.get("reason")?.disable();
        //this.coreFormService.getFormBaseControlByName(this.sections, "manualId")?.disabled = true;
        //this.coreFormService.getFormBaseControlByName(this.sections, "reason")?.disabled = true;
      }
      else {
        this.form.get("manualId")?.enable();
        this.form.get("reason")?.enable();
      }
      

  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnInit(): void {
    this.loading = true;
  }
}