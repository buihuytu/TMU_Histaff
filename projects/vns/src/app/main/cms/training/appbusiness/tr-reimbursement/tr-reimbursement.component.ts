import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageListComponent, CorePageHeaderComponent, CoreCompositionComponent, CoreOrgTreeComponent, CoreCheckboxComponent, CoreStatusStickerComponent, CoreFormComponent, CoreFormControlSeekerComponent, CoreDropdownComponent, CoreDatePickerComponent, CoreButtonGroupVnsComponent, ICoreAccordionItem, EnumCoreButtonVNSCode, ICoreFormSection, ICoreDropdownOption,EnumCoreFormControlSeekerSourceType, EnumCoreOrgTreeaAccessorMode, IFilterOperator, EnumFilterOperator, IInOperator, ICorePageListApiDefinition, ICoreTableColumnItem, EnumCoreTablePipeType, MultiLanguageService, AppService, AlertService, ICoreButtonVNS, IFormatedResponse, alertOptions, TranslatePipe } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tr-reimbursement',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    CorePageListComponent,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreOrgTreeComponent,
    CoreCheckboxComponent,
    CoreStatusStickerComponent,
    CommonModule,
    CoreFormComponent,
    CoreFormControlSeekerComponent,
    CoreDropdownComponent,
    CoreDatePickerComponent,
    CoreButtonGroupVnsComponent,
  ],
  templateUrl: './tr-reimbursement.component.html',
  styleUrl: './tr-reimbursement.component.scss'
})
export class TrReimbursementComponent {

  orgIds: number[] = [];
  orgId!: number;
  compositionHeight!: number;
  treeHeight!: number;
  lang!: string;
  subscriptions: Subscription[] = [];
  selectedIds!: number[];
  id!: number;
  loading!: boolean;
  shownFrom: string = 'name';
  trProgramId!: number;
  dateStartFrom!: Date;
  dateStartTo!: Date;
  dateEndFrom!: Date;
  dateEndTo!: Date;
  dateFinal!: Date;
  disabled!: boolean;
  heightList : number[] = [];
  sectors!: ICoreAccordionItem[];

  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
  ];

  submitText!: EnumTranslateKey;
  leftInputSections!: ICoreFormSection[];
  leftInputSectionsFlexSize!: number;
  showCaptionButton: boolean = true;
  form!: FormGroup;
  entityTable = 'TR_REIMBURSEMENT';

  trProgramOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  trProgramGetByIdObject$ = new BehaviorSubject<any>(null);
  trProgramGetByIdApi = api.TR_PROGRAM_READ;

  empGetByIdObject$ = new BehaviorSubject<any>(null);
  empGetByIdApi = api.HU_EMPLOYEE_READ;

  labelList = {
    year: EnumTranslateKey.UI_LABEL_TIME_IMPORT_YEAR,
    eployeeCode: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPLOYEE_CODE,
    empEsc: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_IS_EMP_QUIT,
    dateStartComFrom: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_FROM_DATE_COMMITMENT,
    dateStartComTo: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_TO_DATE_COMMITMENT,
    dateEndComFrom: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_END_DATE_COMMITMENT,
    dateEndComTo: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_END_TO_DATE_COMMITMENT,
    dateFinal: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_DATE_FINAL,
    trProgaram: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_TR_PROGRAM_ID,
  };

  employeeId!: number;
  employeeSeekerType: EnumCoreFormControlSeekerSourceType = EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK;
  workStatus!: boolean;

  accessorMode: EnumCoreOrgTreeaAccessorMode = EnumCoreOrgTreeaAccessorMode.ACTIVATED_SINGLE;
  outerParam$ = new BehaviorSubject<any>(null);
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL
    }
  ]
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ]

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_REIMBURSEMENT_QUERY_LIST,
  };

  title = EnumTranslateKey.UI_COMPONENT_TITLE_TR_REIMURSEMENT;
  titleForm1 = EnumTranslateKey.UI_COMPONENT_TITLE_TR_REIMURSEMENT_INFO

  // sections: ICoreFormSection[] = [
  //   {
  //     rows: [
  //       [
  //         {
  //           flexSize: 0,
  //           label: EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_ID,
  //           field: 'id',
  //           value: '',
  //           controlType: EnumFormBaseContolType.TEXTBOX,
  //           readonly: true,
  //           hidden: true,
  //           type: 'number',
  //         },
  //       ],
  //       [
  //         {
  //           flexSize: 3,
  //           label: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_YEAR, 
  //           field: 'year',
  //           value: '',
  //           controlType: EnumFormBaseContolType.TEXTBOX,
  //           type: 'number',
  //           readonly: false,
  //         },
  //         {
  //           flexSize: 3,
  //           label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_TR_PROGRAM_ID,
  //           field: 'trProgramId',
  //           value: '',
  //           readonly: false,
  //           controlType: EnumFormBaseContolType.DROPDOWN,
  //           dropdownOptions$: this.trProgramOptions$,
  //           getByIdObject$: this.trProgramGetByIdObject$,
  //           getByIdApi: this.trProgramGetByIdApi,
  //           shownFrom: 'name',
  //           type: 'number',
  //         },
  //         {
  //           flexSize: 3,
  //           label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_CODE, 
  //           field: 'employeeId',
  //           value: '',
  //           controlType: EnumFormBaseContolType.SEEKER,
  //           seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
  //           getByIdObject$: this.empGetByIdObject$,
  //           getByIdApi: this.empGetByIdApi,
  //           boundFrom: 'id',
  //           shownFrom: 'code',
  //           type: 'number',
  //           readonly: false,
  //         },
  //         {
  //           flexSize: 3,
  //           label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_IS_EMP_QUIT,
  //           field: 'isWorkStatusEmp',
  //           value: '',
  //           controlType: EnumFormBaseContolType.CHECKBOX,
  //           type: 'boolean',
  //         },
  //       ],
  //       [
  //         {
  //           flexSize: 3,
  //           label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_FROM_DATE_COMMITMENT,
  //           field: 'dateFromCommitment',
  //           value: '',
  //           controlType: EnumFormBaseContolType.DATEPICKER,
  //           type: 'date',
  //           readonly: false,
  //         },
  //         {
  //           flexSize: 3,
  //           label:
  //             EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_TO_DATE_COMMITMENT, 
  //           field: 'dateToCommitment',
  //           value: '',
  //           controlType: EnumFormBaseContolType.DATEPICKER,
  //           type: 'date',
  //           readonly: false,
  //         },
  //         {
  //           flexSize: 3,
  //           label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_END_DATE_COMMITMENT,
  //           field: 'endDateFromCommitment',
  //           value: '',
  //           controlType: EnumFormBaseContolType.DATEPICKER,
  //           type: 'date',
  //           readonly: false,
  //         },
  //         {
  //           flexSize: 3,
  //           label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_END_TO_DATE_COMMITMENT, 
  //           field: 'endDateToCommitment',
  //           value: '',
  //           controlType: EnumFormBaseContolType.DATEPICKER,
  //           type: 'date',
  //           readonly: false,
  //         },
  //       ]
  //     ],
  //   },
  //   // {
  //   //   caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_REIMURSEMENT_INFO,
  //   //   rows:[
  //   //     [
  //   //       {
  //   //         flexSize: 3,
  //   //         label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_FLOW_DATE_QUIT,
  //   //         field: 'isLaveDate',
  //   //         value: '',
  //   //         controlType: EnumFormBaseContolType.CHECKBOX,
  //   //         type: 'boolean',
  //   //       },
  //   //       {
  //   //         flexSize: 3,
  //   //         label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_DATE_FINAL,
  //   //         field: 'finalDate',
  //   //         value: '',
  //   //         controlType: EnumFormBaseContolType.DATEPICKER,
  //   //         type: 'date',
  //   //       },
  //   //     ],
  //   //   ]
  //   // },
  //   // {
  //   //   caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_REIMURSEMENT_INFO_QUICKLY,
  //   //   rows:[
  //   //     [
  //   //       {
  //   //         flexSize: 3,
  //   //         label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_MONTH_REIMURSEMENT,
  //   //         field: 'monthReimbursement',
  //   //         value: '',
  //   //         controlType: EnumFormBaseContolType.DATEPICKER,
  //   //         type: 'date',
  //   //       },
  //   //       {
  //   //         flexSize: 9,
  //   //         label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
  //   //         field: 'remark',
  //   //         value: '',
  //   //         controlType: EnumFormBaseContolType.TEXTAREA,
  //   //         type: 'text',
  //   //       },
  //   //     ],
  //   //   ]
  //   // }
  // ];

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_IS_LOCK,//khoa
      field: 'isReserves',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_CODE,//ma nv
      field: 'empCode',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_FULLNAME,//ho va ten
      field: 'empName',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_ORGCHART_JOBS,//chuc danh
      field: 'posName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LEAVE_JOB_DATE,//ngay nghi viec
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LEAVE_JOB_DATE,// ngay nghi viec
      field: 'year',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_YEAR,//nam
      field: 'year',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_TR_PROGRAM_ID,//chuong trinh dao tao
      field: 'trProgramName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_FROM_DATE,//ngay bat dau
      field: 'trStartDate',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_TO_DATE,//ngay ket thuc
      field: 'trEndDate',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_COSTS,//chi phi
      field: 'costStudent',
      type: 'date',
      align: 'left',
      width: 180,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_NUM_COMMITMENT,//so ngay cam ket
      field: 'numCommitment',
      type: 'string',
      align: 'left',
      width: 80,
      pipe: EnumCoreTablePipeType.NUMBER,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_FROM_DATE_COMMITMENT,//ngay cam ket tu
      field: 'dateFromCommitment',
      type: 'string',
      align: 'left',
      width: 180,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_TO_DATE_COMMITMENT,//ngay cam ket den
      field: 'dateToCommitment',
      type: 'string',
      align: 'left',
      width: 180,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_DATE_FINAL,//ngay chot boi hoan
      field: 'finalDate',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_DATE_FINAL,// so ngay con cam ket
      field: 'numDayRemainingCommit',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_DATE_FINAL,// so tien boi hoan
      field: 'costReimburse',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_MONTH_REIMURSEMENT,//thang boi hoan
      field: 'monthReimbursement',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE_TIME
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
      field: 'remark',
      type: 'string',
      align: 'left',
      width: 250,
    },
  ];

  constructor(
    public mls: MultiLanguageService,
    private appService: AppService,
    private alertService: AlertService,
  ){
    
  }

  year: number = new Date().getFullYear();
  ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
  }

  ngAfterViewInit(): void{
    setTimeout(() => {
      this.onYearChange(this.year);
    })
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:

        break;
      case EnumCoreButtonVNSCode.HEADER_DELETE:
        
        break;
      default:
        break;
    }
  }

  onOrgIdsChange(orgIds: number[]) {

    this.orgIds = orgIds
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds
      }
    ]
  }

  onYearChange(year: number) {
    if (year.toString().length == 4) {
      this.year = year;
      this.getListProgramCourse();
    } else {
      this.trProgramOptions$.next([]);
      this.trProgramGetByIdObject$.next(null);
      this.loading = false;
    }
  }

  onProgramIdChange(trProgramId: number) {
    this.trProgramId = trProgramId;
  }

  getListProgramCourse(){
    this.subscriptions.push(
      this.appService.post(api.TR_REIMBURSEMENT_GET_LIST_PROGRAM, {year: this.year}).subscribe((x) => {
        if(x.ok && x.status === 200){
          const body: IFormatedResponse = x.body;
          if(body.statusCode === 200){
            const options: {value: number; text: string}[] = [];
            body.innerBody.map((get: any) => {
              options.push({
                value: get.id,
                text: get.name
              });
            });
            this.trProgramOptions$.next(options);
          }
        }
      })
    )
  }

  onStartDateComFrom(dateStartFrom: Date){
    this.dateStartFrom = this.dateStartFrom;
  }
  onStartDateComTo(dateStartTo: Date){
    this.dateStartFrom = this.dateStartFrom;
  }
  onEndDateComFrom(dateEndFrom: Date){
    this.dateEndFrom = this.dateEndFrom;
  }
  onEndDateComTo(dateEndTo: Date){
    this.dateEndTo = this.dateEndTo;
  }

  onButtonClick(e: ICoreButtonVNS) {
    if (this.trProgramId == null) {
      this.alertService.error(`Select Salary Period to Find!!!`, alertOptions);
    } else if (this.orgIds?.length === 0) {
      this.alertService.error(
        `Select Organization Name to Find!!!`,
        alertOptions
      );
    } else {
      this.loadData();
    }
  }

  loadData(){

  }
  // onRowClick(e: any) {
  //   this.id = e.id
  // }

  onSelectedIdsChange(e: number[]) {
    this.selectedIds = e;
  }

  onRowDoubleClick(e: any) {
    this.subscriptions.push(
      // this.appService
      //   .get(api.SE_PROCESS_APPROVE_READ + e.id)
      //   .subscribe((x: any) => {
      //     if (x.ok && x.status == 200) {
      //       this.form.patchValue(x.body.innerBody);
      //       this.posObjectList$.next(x.body.innerBody.posList);
      //     }
      //   })
    );
  }


}
