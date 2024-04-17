import { Component } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreChecklistOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, DialogService } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject, map } from "rxjs";
import { PhaseAdvanceEditService } from "./phaseadvance-edit.service";

@Component({
  selector: 'app-phaseadvance-edit',
  templateUrl: './phaseadvance-edit.component.html',
  styleUrls: ['./phaseadvance-edit.component.scss'],
})
export class PhaseAdvanceEditComponent  extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */
  override entityTable = 'PA_PHASE_ADVANCE';

  loading: boolean = false;
  subscriptions: Subscription[] = [];
  
  listRewardLevelOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  listRewardLevelGetByIdObject$ = new BehaviorSubject<any>(null);

  salaryPeriodOptions$ = new BehaviorSubject<any>(null);
  salaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  //salaryPeriodGetByIdApi = api.PA_PHASE_ADVANCE_GETYEARPERIOD;
  salaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;

  salaryPeriodMonthOptions$ = new BehaviorSubject<any>(null);
  salaryPeriodMonthGetByIdObject$ = new BehaviorSubject<any>(null);
  salaryPeriodMonthGetByIdApi = api.AT_SALARY_PERIOD_READ;


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
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'year',
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
            field: 'periodId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.salaryPeriodOptions$,
            getByIdObject$: this.salaryPeriodGetByIdObject$,
            shownFrom: 'year',
            getByIdApi: this.salaryPeriodGetByIdApi,
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
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_FROM_DATE,
            field: 'fromDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            readonly: false,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_TO_DATE,
            field: 'toDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            readonly: false,
          },
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
          
        ],
        [
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
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_SENIORITY,
            field: 'seniority',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            pipe: EnumCoreTablePipeType.NUMBER,
            type: 'number',
            readonly: false,
          }
        ],
        [
          {
            flexSize: 12,
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

  ngAfterViewInit(): void{
    this.loading  = true;
    
    this.subscriptions.push(
      this.form.get('periodId')?.valueChanges.subscribe(x => {
        if(!!x){
          this.check = this.period.filter(y => y.value == x)
          this.form.get('year')?.setValue(this.check[0].valyear)
        }
      })!
    )
  }

    ngOnInit(): void {
    this.loading = true;
    //nam ky cong
    this.slrService
      .getYearPeriod()
      .pipe(
        map((x: any) => {
          if (x.ok && x.status === 200) {
            const options: { value: number; text: string, valyear: number }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.year,
                valyear: g.valYear
              });
            });
            return options;
          } else {
            return [];
          }
        })
      )
      .subscribe((response) => {
        this.period=response;
        this.salaryPeriodOptions$.next(response);
        this.loading = false;
      });

      //don vi
      this.slrService
      .getOrg()
      .pipe(
        map((x: any) => {
          if (x.ok && x.status === 200) {
            const options: { value: number; text: string }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.orgName,
              });
            });
            return options;
          } else {
            return [];
          }
        })
      )
      .subscribe((response) => {
        this.organizationOptions$.next(response);
        this.loading = false;
      });
      //thang chi bs
      // this.slrService.getMonthSalAdd()
      // .pipe(
      //   map((x: any) =>{
      //     if(x.ok && x.status == 200){
      //       const options: {value: number; text: string}[] =[];
      //       x.body.innerBody.map((g: any) => {
      //         options.push({
      //           value: g.id,
      //           text: g.salMonthName,
      //         });
      //       });
      //       return options;
      //     }else{
      //       return [];
      //     }
      //   })
      // )
      // .subscribe((response)=>{
      //   this.otherlistOptions$.next(response);
      //   this.loading = false;
      // });

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


  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e as FormGroup;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}


