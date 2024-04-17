import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { Subscription, BehaviorSubject } from 'rxjs';
import {
  BaseEditComponent,
  ICoreDropdownOption,
  ICorePageEditCRUD,
  ICoreFormSection,
  EnumFormBaseContolType,
  EnumCoreFormControlSeekerSourceType,
  DialogService,
  AppService,
  CorePageEditComponent,
  EnumCoreTablePipeType
}
from 'ngx-histaff-alpha';

interface OptionContext {
  value: number;
  text: string;
}

@Component({
  selector: 'app-tr-request-year-edit',
  standalone: true,
  imports: [
    CommonModule,
    CorePageEditComponent
  ],
  templateUrl: './tr-request-year-edit.component.html',
  styleUrl: './tr-request-year-edit.component.scss'
})

export class TrRequestYearEditComponent extends BaseEditComponent {
  override entityTable = 'TR_REQUEST_YEAR';
  
  subscriptions: Subscription[] = [];
  
  captionCode!: EnumTranslateKey;


  // seeker to choose organization
  orgUnitGetByIdApi = api.OM_ORGANIZATION_READ;
  orgUnitGetByIdObject$ = new BehaviorSubject<any>(null);


  // "drop down list" to choose "quarter"
  quarterIdGetByIdApi = api.SYS_OTHERLIST_READ;
  quarterIdGetByIdObject$ = new BehaviorSubject<any>(null);
  quarterIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  // "drop down list" to choose "training course"
  trCourseIdGetByIdApi = api.TR_COURSE_READ;
  trCourseIdGetByIdObject$ = new BehaviorSubject<any>(null);
  trCourseIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  // "drop down list" to choose "company"
  companyIdGetByIdApi = api.HU_COMPANY_READ;
  companyIdGetByIdObject$ = new BehaviorSubject<any>(null);
  companyIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  // "drop down list" to choose "initialization location"
  initializationLocationGetByIdApi = api.SYS_OTHERLIST_READ;
  initializationLocationGetByIdObject$ = new BehaviorSubject<any>(null);
  initializationLocationOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  // "drop down list" to choose "priority level"
  priorityLevelGetByIdApi = api.SYS_OTHERLIST_READ;
  priorityLevelGetByIdObject$ = new BehaviorSubject<any>(null);
  priorityLevelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  // "drop down list" to choose "status"
  statusIdGetByIdApi = api.SYS_OTHERLIST_READ;
  statusIdGetByIdObject$ = new BehaviorSubject<any>(null);
  statusIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  

  loading: boolean = false;
  
  crud!: ICorePageEditCRUD;

  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_YEAR,
              field: 'year',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_EXPECTED_TIME,
              field: 'quarterId',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.quarterIdGetByIdApi,
              getByIdObject$: this.quarterIdGetByIdObject$,
              dropdownOptions$: this.quarterIdOptions$,
              shownFrom: 'name',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DEPARTMENT_SENDS_REQUEST,
              field: 'orgId',
              value: '',
              type: 'text',
              controlType: EnumFormBaseContolType.SEEKER,

              /*
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
              */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,
              getByIdObject$: this.orgUnitGetByIdObject$,
              getByIdApi: this.orgUnitGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DATE_REQUEST,
              field: 'dateOfRequest',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_COURSE,
              field: 'trCourseId',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.trCourseIdGetByIdApi,
              getByIdObject$: this.trCourseIdGetByIdObject$,
              dropdownOptions$: this.trCourseIdOptions$,
              shownFrom: 'courseName',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_CONTENTTRAIN,
              field: 'content',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'string'
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_TRAINING_HOST_UNIT,
              field: 'companyId',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.companyIdGetByIdApi,
              getByIdObject$: this.companyIdGetByIdObject$,
              dropdownOptions$: this.companyIdOptions$,
              shownFrom: 'nameVn'
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_PARTICIPANTS,
              field: 'participants',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string'
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_NUMBER_ATTENDING,
              field: 'quantityPeople',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ORGANIZATION_LOCATION,
              field: 'initializationLocation',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.initializationLocationGetByIdApi,
              getByIdObject$: this.initializationLocationGetByIdObject$,
              dropdownOptions$: this.initializationLocationOptions$,
              shownFrom: 'name'
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LEVEL_PRIORITY,
              field: 'priorityLevel',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.priorityLevelGetByIdApi,
              getByIdObject$: this.priorityLevelGetByIdObject$,
              dropdownOptions$: this.priorityLevelOptions$,
              shownFrom: 'name',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_STATUS_ID,
              field: 'statusId',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.statusIdGetByIdApi,
              getByIdObject$: this.statusIdGetByIdObject$,
              dropdownOptions$: this.statusIdOptions$,
              shownFrom: 'name',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ESTIMATED_COST,
              field: 'money',
              value: '',
              controlType: EnumFormBaseContolType.CURRENCY,
              type: 'number',
              pipe: EnumCoreTablePipeType.NUMBER,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'string'
            }
          ]
        ]
      }
    ];

  constructor (
    public override dialogService: DialogService,
    private appService: AppService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TR_REQUEST_YEAR;

    this.crud = {
      c: api.TR_REQUEST_YEAR_CREATE,
      r: api.TR_REQUEST_YEAR_READ,
      u: api.TR_REQUEST_YEAR_UPDATE,
      d: api.TR_REQUEST_YEAR_DELETE,
    };
  }

  ngOnInit(): void {

  }

  onFormCreated(e: FormGroup): void {
    this.form = e;

    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "QUARTER").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.quarterIdOptions$.next(options);
      })
    );

    this.subscriptions.push(
      this.appService.get(api.TR_REQUEST_YEAR_LIST_TRAINING_COURSE).subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.trCourseIdOptions$.next(options);
      })
    );

    this.subscriptions.push(
      this.appService.get(api.TR_REQUEST_YEAR_LIST_COMPANY).subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.companyIdOptions$.next(options);
      })
    );

    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "DDTC").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.initializationLocationOptions$.next(options);
      })
    );

    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "MDUT").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.priorityLevelOptions$.next(options);
      })
    );

    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "STATUS").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.statusIdOptions$.next(options);
      })
    );
  }

  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}