import { Component, AfterViewInit, OnInit } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICoreDropdownOption, IInOperator, ICorePageListApiDefinition,ICoreTableColumnItem, EnumCoreTablePipeType, MultiLanguageService, AppService, ICoreButtonVNS } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

interface OptionContext {
  value: number;
  text: string;
}

@Component({
  selector: 'app-tr-assessment-result',
  templateUrl: './tr-assessment-result.component.html',
  styleUrl: './tr-assessment-result.component.scss'
})

export class TrAssessmentResultComponent extends BaseComponent implements OnInit, AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_TR_ASSESSMENT_RESULT;

  yearTitle: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_YEAR;
  educationProgramName: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_TR_PROGRAM_ID;
  
  
  // drop down list "Education Program"
  educationProgramValues: any;
  educationProgramOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  educationProgramGetByIdObject$ = new BehaviorSubject<any>(null);
  

  year!: number;

  outerInOperators: IInOperator[] | null = null;

  corePageListHeight!: number;

  listEmployeeTitle = EnumTranslateKey.UI_COMPONENT_TITLE_LIST_EMPLOYEE;
  resultEvaluateTitle = EnumTranslateKey.UI_COMPONENT_TITLE_RESULT_EVALUATE;

  
  /* tham số lọc cho employees */
  trAssessmentResultId!: number;


  employeeOuterParam$ = new BehaviorSubject<any>(null);
  
  isDeskop!: boolean;

  listEmployeeApiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_ASSESSMENT_RESULT_QUERY_LIST,
  }

  resultEvaluateApiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_RESULT_EVALUATION_QUERY_LIST_FOR_EMPLOYEE,
  }

  columnsListEmployee: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_ORG_ID,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TYPE_IS_ACTIVE,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_IS_LOCK,
      field: 'isLocked',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_YES_NO
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    }
  ];

  columnsResultEvaluate: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CRITERIA_CODE,
      field: 'criteriaCode',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CRITERIA_NAME,
      field: 'criteriaName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_DETAIL_RATIO,
      field: 'ratio',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_DETAIL_POINT_MAX,
      field: 'pointMax',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_POINT_EVALUATION,
      field: 'pointEvaluate',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_GENERAL_OPINION,
      field: 'generalOpinion',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 20,
    }
  ];

  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService
  ) {
    super(mls);
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    );

    const mainAppHeaderHeight = Number(getComputedStyle(document.documentElement).getPropertyValue('--size-header-height').replace('px', ''));
    const corePaginationHeight = Number(getComputedStyle(document.documentElement).getPropertyValue('--size-core-pagination-height').replace('px', ''));
    this.corePageListHeight = window.innerHeight - mainAppHeaderHeight - corePaginationHeight - 80;

    if(window.innerHeight > 750){
      this.isDeskop = true;
    }

    this.subscriptions.push(
      this.appService.get("/api/TrAssessmentResult/GetDropDownEducationProgram").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.educationProgramOptions$.next(options);
      })
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // give value "-1" into function
      // to result query is 0 record
      // when enter key F5
      this.onTrAssessmentResultIdChange(-1);
    })
  }

  override ngOnDestroy(): void {
    this.subscriptions.push(
      this.employeeOuterParam$.unsubscribe()!
    );
  }

  onTrAssessmentResultIdChange(trAssessmentResultId: number) {
    this.trAssessmentResultId = trAssessmentResultId;
    
    this.employeeOuterParam$.next({
      trAssessmentResultId: trAssessmentResultId
    });
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    console.log("onCorePageHeaderButtonClick e", e)
  }

  onYearChange($event: number) {
    if (!!$event) {
      var arr: any = this.outerInOperators?.filter(x => x.field != 'year');

      if (!!arr) {
        this.outerInOperators = arr;
        
        this.outerInOperators?.push({
          field: 'year',
          values: [$event]
        });
      }
      else {
        this.outerInOperators = [
          {
            field: 'year',
            values: [$event]
          }
        ]
      }
    }
    else {
      var arr: any = this.outerInOperators?.filter(x => x.field == 'year');

      if (!!arr) {
        var arr: any = this.outerInOperators?.filter(x => x.field != 'year');
        this.outerInOperators = arr;
      }
    }

    // give value "-1" into function
    // to result query is 0 record
    // when enter key F5
    this.onTrAssessmentResultIdChange(-1);
  }

  onDropDownListEducationProgramChange($event: number): void {
    if (!!$event) {
      var arr: any = this.outerInOperators?.filter(x => x.field != 'trProgramId');

      if (!!arr) {
        this.outerInOperators = arr;
        
        this.outerInOperators?.push({
          field: 'trProgramId',
          values: [$event]
        });
      }
      else {
        this.outerInOperators = [
          {
            field: 'trProgramId',
            values: [$event]
          }
        ]
      }
    }
    else {
      var arr: any = this.outerInOperators?.filter(x => x.field == 'trProgramId');

      if (!!arr) {
        var arr: any = this.outerInOperators?.filter(x => x.field != 'trProgramId');
        this.outerInOperators = arr;
      }
    }

    // give value "-1" into function
    // to result query is 0 record
    // when enter key F5
    this.onTrAssessmentResultIdChange(-1);
  }
}