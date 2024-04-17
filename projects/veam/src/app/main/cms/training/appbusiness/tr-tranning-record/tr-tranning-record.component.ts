import { Component, AfterViewInit } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AppService, BaseComponent, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, EnumFilterOperator, ICoreChecklistOption, ICoreDropdownOption, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, IFilterOperator, IInOperator, MultiLanguageService,} from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

interface OptionContext {
  value: number;
  text: string;
}

@Component({
  selector: 'app-tr-tranning-record',
  templateUrl: './tr-tranning-record.component.html',
  styleUrl: './tr-tranning-record.component.scss'
})

export class TrTranningRecordComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_TR_TRANNING_RECORD;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_TRANNING_RECORD_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.TR_TRANNING_RECORD_DELETE_IDS,
  }

  employeeSeekerName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_EMPLOYEE_SEEKER;
  datePickerName1: EnumTranslateKey = EnumTranslateKey.UI_LABEL_TIME_IMPORT_FROM_DATE;
  datePickerName2: EnumTranslateKey = EnumTranslateKey.UI_LABEL_TIME_IMPORT_TO_DATE;
  courseName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_COURSE;
  workStatusName: EnumTranslateKey = EnumTranslateKey.UI_CORE_PARAMS_EMPLOYEE_STATUS_IN;

  outerInOperators: IInOperator[] | null = null;

  outerFilterOperators: IFilterOperator[] = [];


  // this is seeker to choose "employee"
  employeeId!: number;
  employeeSeekerType: EnumCoreFormControlSeekerSourceType = EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK;


  // this is date picker
  dateFromPicker!: any;
  dateToPicker!: any;


  // this is drop down list to choose "course"
  courseOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  courseGetByIdObject$ = new BehaviorSubject<any>(null);
  courseValues: any;


  // this is check list to choose "work status"
  workStatusOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  workStatusGetByIdObject$ = new BehaviorSubject<any>(null);
  workStatusValues: any;


  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_TITLE_HU_CERTIFICATE_EDIT_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_UNIT_DEPARTMENT,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_COURSE,
      field: 'courseName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_FROM_DATE,
      field: 'dateFrom',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_TO_DATE,
      field: 'dateTo',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_CONTENT,
      field: 'content',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NAME,
      field: 'targetText',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TR_PLACE,
      field: 'trainingPlace',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_TRAINING_CENTER,
      field: 'trainingCenter',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RESULT,
      field: 'result',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_MARK,
      field: 'scores',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_RATING,
      field: 'rating',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DUE_REVIEW_1,
      field: 'evaluateDue1',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DUE_REVIEW_2,
      field: 'evaluateDue2',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DUE_REVIEW_3,
      field: 'evaluateDue3',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CERTIFICATION,
      field: 'certificateText',
      type: 'string',
      align: 'left',
      width: 180,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_DATE_OF_ISSUE_OF_CERTIFICATE,
      field: 'certificateIssuanceDate',
      type: 'string',
      align: 'left',
      width: 220,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMITMENT_NUMBER,
      field: 'commitmentNumber',
      type: 'string',
      align: 'left',
      width: 180,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMITTED_AMOUNT,
      field: 'commitmentAmount',
      type: 'string',
      align: 'left',
      width: 180,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_NUMBER_OF_MONTHS_COMMITTED,
      field: 'monthCommitment',
      type: 'string',
      align: 'left',
      width: 180,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_COMMITMENT_START_DATE,
      field: 'commitmentStartDate',
      type: 'string',
      align: 'left',
      width: 180,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_COMMITMENT_END_DATE,
      field: 'commitmentEndDate',
      type: 'string',
      align: 'left',
      width: 180,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'id',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'employeeId',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'trCourseId',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'workStatusId',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1,
    }
  ]

  constructor(
    private appService: AppService,
    public override mls: MultiLanguageService
  ) {
    super(mls);
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.appService.get("/api/TrTranningRecord/GetDropDownCourse").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.courseOptions$.next(options);
      })
    );

    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "EMP_STATUS").subscribe(res => {
        const options: ICoreChecklistOption[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name,
            checked: false
          })
        });

        this.workStatusOptions$.next(options);
      })
    );
  }

  ngAfterViewInit(): void {

  }

  onEmployeeChange($event: number): void {
    if (!!$event) {
      var arr: any = this.outerInOperators?.filter(x => x.field != 'employeeId');

      if (!!arr) {
        this.outerInOperators = arr;
        
        this.outerInOperators?.push({
          field: 'employeeId',
          values: [$event]
        });
      }
      else {
        this.outerInOperators = [
          {
            field: 'employeeId',
            values: [$event]
          }
        ]
      }
    }
    else {
      var arr: any = this.outerInOperators?.filter(x => x.field == 'employeeId');

      if (!!arr) {
        var arr: any = this.outerInOperators?.filter(x => x.field != 'employeeId');
        this.outerInOperators = arr;
      }
    }
  }

  onDateFromChange($event: any): void {
    let field: string;
    let operator: EnumFilterOperator;
    let eventFilterOperator: IFilterOperator;
    
    field = "dateFrom";
    operator = EnumFilterOperator.GREATER_THAN_OR_EQUAL;
    
    if ($event != null) {
      $event = new Date(($event as Date).setHours(0, 0, 0, 0));
    }
    eventFilterOperator = {
      field,
      operator,
      dateTimeValue: $event
    }

    // vì có 02 date nên cần bảo vệ state cũ
    const currentOuterFilterOperators: IFilterOperator[] = JSON.parse(JSON.stringify(this.outerFilterOperators));

    // lọc những field không trùng với field và operator
    const remainOuterFilterOperators = currentOuterFilterOperators.filter(x => !!!(x.field === field && x.operator === operator));

    // thêm lại event vừa xảy ra
    remainOuterFilterOperators.push(eventFilterOperator);

    this.outerFilterOperators = remainOuterFilterOperators;
  }

  onDateToChange($event: any): void {
    let field: string;
    let operator: EnumFilterOperator;
    let eventFilterOperator: IFilterOperator;
    
    field = "dateTo";
    operator = EnumFilterOperator.LESS_THAN_OR_EQUAL;
    
    if ($event != null) {
      $event = new Date(($event as Date).setHours(23, 59, 59, 999));
    }
    eventFilterOperator = {
      field,
      operator,
      dateTimeValue: $event
    }

    // vì có 02 date nên cần bảo vệ state cũ
    const currentOuterFilterOperators: IFilterOperator[] = JSON.parse(JSON.stringify(this.outerFilterOperators));

    // lọc những field không trùng với field và operator
    const remainOuterFilterOperators = currentOuterFilterOperators.filter(x => !!!(x.field === field && x.operator === operator));

    // thêm lại event vừa xảy ra
    remainOuterFilterOperators.push(eventFilterOperator);

    this.outerFilterOperators = remainOuterFilterOperators;

    console.log("chạy vào đây", this.dateToPicker);
  }

  onDropDownListCourseChange($event: number): void {
    if (!!$event) {
      var arr: any = this.outerInOperators?.filter(x => x.field != 'trCourseId');

      if (!!arr) {
        this.outerInOperators = arr;
        
        this.outerInOperators?.push({
          field: 'trCourseId',
          values: [$event]
        });
      }
      else {
        this.outerInOperators = [
          {
            field: 'trCourseId',
            values: [$event]
          }
        ]
      }
    }
    else {
      var arr: any = this.outerInOperators?.filter(x => x.field == 'trCourseId');

      if (!!arr) {
        var arr: any = this.outerInOperators?.filter(x => x.field != 'trCourseId');
        this.outerInOperators = arr;
      }
    }
  }

  onCheckListworkStatusChange($event: number): void {
    if (Array.isArray($event)) {
      // Nếu $event là mảng
      const arrayLength: number = $event.length;
      
      if (arrayLength > 0) {
        var arr: any = this.outerInOperators?.filter(x => x.field != 'workStatusId');

        if (!!arr) {
          this.outerInOperators = arr;
          
          this.outerInOperators?.push({
            field: 'workStatusId',
            values: $event
          });
        }
        else {
          this.outerInOperators = [
            {
              field: 'workStatusId',
              values: $event
            }
          ]
        }
      }
      else {
        var arr: any = this.outerInOperators?.filter(x => x.field == 'workStatusId');

        if (!!arr) {
          var arr: any = this.outerInOperators?.filter(x => x.field != 'workStatusId');
          this.outerInOperators = arr;
        }
      }
    }
    else {
      // Nếu $event không là mảng
      console.log(`$event không phải là mảng, giá trị là: ${$event}`);
    }
  }
}