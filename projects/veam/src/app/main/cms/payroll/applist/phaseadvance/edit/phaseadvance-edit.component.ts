import { AfterViewInit, Component } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreChecklistOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, DialogService, AppService, IFormatedResponse } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject, map, distinctUntilChanged } from "rxjs";
import { PhaseAdvanceEditService } from "./phaseadvance-edit.service";

@Component({
  selector: 'app-phaseadvance-edit',
  templateUrl: './phaseadvance-edit.component.html',
  styleUrls: ['./phaseadvance-edit.component.scss'],
})
export class PhaseAdvanceEditComponent  extends BaseEditComponent implements AfterViewInit {
  /* Properties to be passed into core-page-edit */
  override entityTable = 'PA_PHASE_ADVANCE';

  loading: boolean = false;
  subscriptions: Subscription[] = [];
  
  listRewardLevelOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  listRewardLevelGetByIdObject$ = new BehaviorSubject<any>(null);

  // Year
  yearOptions$ = new BehaviorSubject<any>(null);
  yearGetByIdObject$ = new BehaviorSubject<any>(null);
  yearGetByIdApi = api.AT_SALARY_PERIOD_GET_YEAR;

  // Salary Period
  salaryPeriodOptions$ = new BehaviorSubject<any>(null);
  salaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  salaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;

  // From Salary
  fromSalaryOptions$ = new BehaviorSubject<any>(null);
  fromSalaryGetByIdObject$ = new BehaviorSubject<any>(null);
  fromSalaryGetByIdApi = api.AT_SALARY_PERIOD_READ;

  // To Salary
  toSalaryOptions$ = new BehaviorSubject<any>(null);
  toSalaryGetByIdObject$ = new BehaviorSubject<any>(null);
  toSalaryGetByIdApi = api.AT_SALARY_PERIOD_READ;

  organizationOptions$ = new BehaviorSubject<any>(null);
  organizationGetByIdObject$ = new BehaviorSubject<any>(null);
  organizationGetByIdApi = api.HU_ORGANIZATION_READ;

  otherlistOptions$ = new BehaviorSubject<any>(null);
  otherlistGetByIdObject$ = new BehaviorSubject<any>(null);
  otherlistGetByIdApi = api.SYS_OTHERLIST_READ;

  atSymbolOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  atSymbolGetByIdObject$ = new BehaviorSubject<any>(null);
  atSymbolGetByIdApi = api.PA_PHASE_ADVANCE_GET_SYMBOL_BY_ID;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  check: any[] = [];
  period: any[] = [];

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
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_UNIT,
            field: 'orgId',
            value: '',
            controlType: EnumFormBaseContolType.SEEKER,
            seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,
            //dropdownOptions$: this.organizationOptions$,
            getByIdObject$: this.organizationGetByIdObject$,
            getByIdApi: this.organizationGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'name',
            alsoBindTo: [
              {takeFrom: 'name', bindTo: 'name'}
            ],
            readonly: true,
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
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_YEAR,//nam
            field: 'year',
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
              {
                name: 'max',
                validator: Validators.max(9999),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
              {
                name: 'min',
                validator: Validators.min(1000),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ]
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_DAY,
            field: 'phaseDay',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            readonly: false,
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
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_SALARY_PERIOD,//nam
            field: 'periodId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.salaryPeriodOptions$,
            getByIdObject$: this.salaryPeriodGetByIdObject$,
            shownFrom: 'name',
            getByIdApi: this.salaryPeriodGetByIdApi,
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
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_FROM_SALARY,
            field: 'fromSalary',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.fromSalaryOptions$,
            getByIdObject$: this.fromSalaryGetByIdObject$,
            shownFrom: 'name',
            getByIdApi: this.fromSalaryGetByIdApi,
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
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_TO_SALARY,
            field: 'toSalary',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.toSalaryOptions$,
            getByIdObject$: this.toSalaryGetByIdObject$,
            shownFrom: 'name',
            getByIdApi: this.toSalaryGetByIdApi,
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
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_NAME_BONUS,
            field: 'nameVn',
            value: '',
            controlType:EnumFormBaseContolType.TEXTBOX,
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
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_MONTH_LBS,
            field: 'monthLbs',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ]
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_SYMBOL_BONUS,//ky hieu cong 0 tinh luong bs
            field: 'listSymbolId',
            value: [""],
            controlType: EnumFormBaseContolType.CHECKLIST,
            checklistOptions$: this.atSymbolOptions$,
            getByIdObject$: this.atSymbolGetByIdObject$,
            shownFrom: 'name',
            // getByIdApi: this.atSymbolGetByIdApi,
            type: 'string',
            readonly: true,
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_SENIORITY,
            field: 'seniority',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            pipe: EnumCoreTablePipeType.NUMBER,
            type: 'number',
            readonly: false,
          },
          {
            flexSize: 8,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
          },
        ]
      ]
    },
  ];

  constructor(
    public override dialogService: DialogService,
    private slrService: PhaseAdvanceEditService,
    private appService: AppService, // CoreService is DEPRECATED!!!,
  ) {
    super(dialogService);

    this.captionCode =
      EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE;

    this.crud = {
      c: api.PA_PHASE_ADVANCE_CREATE,
      r: api.PA_PHASE_ADVANCE_READ,
      u: api.PA_PHASE_ADVANCE_UPDATE,
      d: api.PA_PHASE_ADVANCE_DELETE_IDS,
    };
  }


  ngOnInit(): void {

    //cong 0 tinh luong bs
    this.slrService.getAtSymbol()
    .pipe(
      map((x: any) =>{
        if(x.ok && x.status == 200){
          const options: {value: number | null; text: string}[] =[];
          x.body.innerBody.map((g: any) => {
            options.push({
              value: g.id,
              text: g.name,
            });
          });
          return options;
        }else{
          return [];
        }
      })
    )
    .subscribe((response: any)=>{
      this.atSymbolOptions$.next(response);
      this.loading = false;
    });
  }


  ngAfterViewInit(): void{
    this.subscriptions.push( // <== Outer push
      this.form
      .get('year')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe(x => {
        if (!!x || x.toString().length == 4) {
          this.subscriptions.push(
            this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_IN_YEAR, { year: x }).subscribe(x => {
              if (x.ok && x.status === 200) {
                const body: IFormatedResponse = x.body
                if (body.statusCode === 200) {
                  const options: { value: number; text: string }[] = [];
                  body.innerBody.map((get: any) => {
                    options.push({
                      value: get.id,
                      text: get.name,
                    });
                  });
                  this.salaryPeriodOptions$.next(options);
                  this.fromSalaryOptions$.next(options);
                  this.toSalaryOptions$.next(options);
                } else {
                  //this.responseService.resolve(body)
                }
              } else {
                //this.alertService.error(JSON.stringify(x), alertOptions)
              }
            })
          )
        }
      })!
    )
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e as FormGroup;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}


