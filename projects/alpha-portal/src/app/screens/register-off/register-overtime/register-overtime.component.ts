import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreFormSection, EnumFormBaseContolType, ICorePageEditCRUD, DialogService, MultiLanguageService, AppService, LayoutService, AuthService, IAuthData } from 'ngx-histaff-alpha';
import { Subscription, map } from 'rxjs';
import { RegisterOvertimeService } from './register-overtime.service';

@Component({
  selector: 'app-register-overtime',
  templateUrl: './register-overtime.component.html',
  styleUrls: ['./register-overtime.component.scss'],
})

export class RegisterOvertimeComponent extends BaseEditComponent implements OnInit,AfterViewInit{
  employeeId!: number;
  totalOtMonth!: string;
  
  totalOtOfMonth = EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_OVERTIME_TOTAL_OT_MONTH;
  lang!: string;
  sections: ICoreFormSection[] =
  [
    {
      rows: [
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            type: 'text',
            hidden: true,
          },
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'employeeId',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            type: 'text',
            hidden: true,
          },
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'typeCode',
            value: 'OVERTIME',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            type: 'string',
            hidden: true,
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_OVERTIME_WORKING_DAY,
            field: 'workingDay',
            value: '',
            type: 'date',
            controlType: EnumFormBaseContolType.DATEPICKER,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_OVERTIME_TIME_START,
            field: 'timeStart',
            value: '',
            type: 'time',
            controlType: EnumFormBaseContolType.TEXTBOX,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_OVERTIME_TIME_END,
            field: 'timeEnd',
            value: '',
            type: 'time',
            controlType: EnumFormBaseContolType.TEXTBOX,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
        ],
        // [
        //   {
        //     flexSize: 12,
        //     label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_OVERTIME_IS_CHANGE_TO_FUND,
        //     field: 'isChangeToFund',
        //     value: '',
        //     type: 'boolean',
        //     controlType: EnumFormBaseContolType.CHECKBOX,
        //   },
        // ],
        // [
        //   {
        //     flexSize: 12,
        //     label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_OVERTIME_IS_TIMEKEEPING,
        //     field: 'isTimeKeeping',
        //     value: '',
        //     type: 'boolean',
        //     controlType: EnumFormBaseContolType.CHECKBOX,
        //   },
        // ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_OVERTIME_IS_WORKING_OVERNIGHT,
            field: 'isWorkingOvernight',
            value: '',
            type: 'boolean',
            controlType: EnumFormBaseContolType.CHECKBOX,
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_OVERTIME_NOTE,
            field: 'note',
            value: '',
            type: 'string',
            controlType: EnumFormBaseContolType.TEXTAREA,
          },
        ],
      ],
    },
  ];

  crud!: ICorePageEditCRUD;
  override entityTable = 'PORTAL_REGISTER_OFF';
  subscriptions: Subscription[] = [];
  landscapeMode: any;

  constructor(
    public override dialogService: DialogService,
    public mls: MultiLanguageService,
    private appService: AppService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private registerOvertimeService: RegisterOvertimeService,
  ) {
    super(dialogService);
    this.crud = {
      c: api.PORTAL_REGISTER_OFF_CREATE,
      r: api.PORTAL_REGISTER_OFF_READ,
      u: api.PORTAL_REGISTER_OFF_UPDATE,
      d: api.PORTAL_REGISTER_OFF_DELETE,
    };
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    );
    this.subscriptions.push(
      this.layoutService.landscapeMode$.subscribe(x => {
        this.landscapeMode = x;
        console.log(this.landscapeMode)
      })
    )
    this.authService.data$.subscribe((x: IAuthData | null) => this.employeeId = x?.employeeId!);

    this.subscriptions.push(
      this.registerOvertimeService.getTotalOtMonth()
        .pipe(
          map((f: any) => {
            let options: string = "";
            options = f.body.innerBody.totalOtMonth;
            return options;
          })
        )
        .subscribe(response => {
          console.log(response);
          // if(this.originalName != response) 
          //   this.form.get('code')?.patchValue(response);
          this.totalOtMonth = response
        })
    )!
  }

 

  onFormCreated(e: FormGroup){
    this.form = e;
    this.form.get('employeeId')?.patchValue(this.employeeId);
   }

  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
