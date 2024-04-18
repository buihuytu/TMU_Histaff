import {AfterViewInit,Component,Input,TemplateRef,ViewChild,} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, IFilterOperator, EnumFilterOperator, IInOperator, ISortItem, EnumSortDirection, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, IGenerateTemplateRequest, MultiLanguageService, RandomAvatarService, OrganizationService, AppService, CorePageListService, AlertService, IAlertOptions, ICoreButtonVNS, EnumCoreButtonVNSCode, alertOptions, CorePageListComponent, CorePageEditComponent, CoreOrgTreeComponent, CoreTableComponent, TranslatePipe, CoreButtonGroupVnsComponent, FullscreenModalLoaderComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HuPlanningEditService } from "./hu-planning-edit/hu-planning-edit.service";

@Component({
  selector: 'app-hu-planning',
  standalone: true,
  imports: [
        FormsModule,
        CorePageListComponent,
        CorePageEditComponent,
        CoreOrgTreeComponent,
        CoreTableComponent,
        TranslatePipe,
        CoreButtonGroupVnsComponent,
        FullscreenModalLoaderComponent,
        CoreStatusStickerComponent,
        CommonModule,
  ],
  templateUrl: './hu-planning.component.html',
  styleUrl: './hu-planning.component.scss'
})
export class HuPlanningComponent extends BaseComponent implements AfterViewInit {
  loading!: boolean;

  @Input() hideHeader!: boolean;

  @ViewChild('sticker') sticker!: TemplateRef<any>;
  /* START: Local filter params */
  orgIds!: number[];
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */
  datePeriodComparisonFor: string = 'startDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STARTDATE_FILTER;
  statusInclusionFor: string = 'workStatusId';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_CORE_PARAMS_EMPLOYEE_STATUS_IN;
  statusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;
  corePageListInstanceNumber!: number;
  id: any;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_PLANNING
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

  // outerSort: ISortItem[] = [
  //   {
  //     field: "jobOrderNum",
  //     sortDirection: EnumSortDirection.ASC
  //   }
  // ]

  selectedData!: any[];
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_PLANNING_QUERY_LIST,
  }
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_PLANNING_DELETE_IDS,
  }
  selectedIds: number[] = [];
  listInstance!: number;
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 10,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE,
      field: 'jobOrderNum',
      type: 'string',
      align: 'center',
      hidden: true,
      width: 0,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EMPLOYEECODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EMPLOYEENAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_ORGNAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_NUM_DECISION,//so quyet dinh
      field: 'decisionNo',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_HU_PLANNING_POSITION_PLANNING,//CHUC DANH QUY HOACH
      field: 'planningTitleName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_HU_PLANNING_TYPE,//loai quy hoach
      field: 'planningTypeName',
      type: 'string',
      align: 'left',
      width: 250,
    },

    // {
    //   caption: EnumTranslateKey.UI_ENTITY_FIELD_HU_PLANNING_PERIOD,//dot quy hoach
    //   field: 'planningPeriodName',
    //   type: 'string',
    //   align: 'left',
    //   width: 180,
    // },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_HU_PLANNING_FROM_YEAR,//giai doan tu
      field: 'fromYearId',
      type: 'string',
      align: 'center',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_HU_PLANNING_TO_YEAR,//giai doan den
      field: 'toYearId',
      type: 'string',
      align: 'center',
      width: 120,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_GENDER,//gioi tinh
      field: 'genderName',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_BIRTH_DATE,//ngay sinh
      field: 'birthDate',
      type: 'date',
      align: 'center',
      width: 140,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_NATIVE_NAME,//dân tộc
      field: 'nativeName',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_HOME_TOWN,//quê quán
      field: 'placeName',
      type: 'string',
      align: 'left',
      width: 120,
      
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_DATE,//ngày vào đảng
      field: 'memberDate',
      type: 'date',
      align: 'center',
      width: 140,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CERTIFICATE_LEVEL_TRAIN,// trình độ chuyên môn
      field: 'levelTrainName',
      type: 'string',
      align: 'left',
      width: 180,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_LEARNING_LEVEL,//trình độ học vấn
      field: 'levelName',
      type: 'string',
      align: 'left',
      width: 180,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_POLITICAL_THEORY_LEVEL,//trình độ lý luận chính trị
      field: 'politicalTheoryLevel',
      type: 'string',
      align: 'left',
      width: 180,
    },
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-list */
  generateTemplateRequest!: IGenerateTemplateRequest;
  constructor(
    public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
    private huPlanningEditService : HuPlanningEditService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(mls);
    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
    this.corePageListInstanceNumber = new Date().getTime();
  }
  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
    })
  }

  ngAfterViewInit(): void {

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

  onRowClick(e: any) {
    this.huPlanningEditService.planningId = e.planningId;
  }

  // customizeSelectedIdsChange(e: number[]): void {
  //   this.selectedIds = e;
  // }

  // onInstanceCreated(event: number) {
  //   this.listInstance = event;
  // }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        this.huPlanningEditService.planningId = 0
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        break;
      case EnumCoreButtonVNSCode.HEADER_COPY:
        if (this.selectedData.length > 1) {
          this.alertService.error(`${this.mls.trans(EnumTranslateKey.NOT_SELECTED_MORE_THAN_ONE_ROW_FOR_BUTTON_COPY_DATA)}`, alertOptions)
          return;
        }
        this.router.navigate(
          [btoa('0'), { listInstance: this.corePageListInstanceNumber }],
          {
            relativeTo: this.route, state: { selectedData: this.selectedData }
          }
        );
        break;
      default:
    }
  }  

  onRowClickLocal(e: any): void {
    this.id = e;
  }

  onSelectedDataChangeLocal(e: any) {
    this.selectedData = e;
    this.selectedIds = this.selectedData.map(x => x.id);
  }

  customizeSelectedIdsChange(e: number[]): void {
    this.selectedIds = e;
  }
}

