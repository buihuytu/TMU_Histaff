import {
  Component,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  Input,
} from "@angular/core";

import { BehaviorSubject } from "rxjs";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ISortItem, EnumSortDirection, IFilterOperator, EnumFilterOperator, IInOperator, ICorePageListApiDefinition, ICorePageListCRUD, IGenerateTemplateRequest, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, RandomAvatarService, OrganizationService } from "ngx-histaff-alpha";




@Component({
  selector: "cms-app-welfare-mng",
  templateUrl: "./welfaremng.component.html",
  styleUrls: ["./welfaremng.component.scss"],
})
export class WelfareMngComponent  extends BaseComponent implements AfterViewInit {

  @Input() hideHeader!: boolean;

  /* START: Local filter params */
  orgIds!: number[];
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_MNG
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
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
    queryListRelativePath: api.HU_WELFARE_MNG_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_WELFARE_MNG_DELETE_IDS
  }

  avatarTemplate!: TemplateRef<any>;
  generateTemplateRequest!: IGenerateTemplateRequest;
  /* Bellow are three props to pass to CoreCommonParamKit */
  datePeriodComparisonFor: string = 'effectDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EFFECT_DAY;
  statusInclusionFor: string = 'workStatusId';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EMPLOYEE_STATUS;
  workStatusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;
  /*********************/

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_DEPARTMENT_NAME,
      field: 'departmentName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_WELFARE_NAME,
      field: 'welfareName',
      type: 'string',
      align: 'left',
      width: 160
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_DECISION_CODE,
      field: 'decisionCode',
      type: 'string',
      align: 'left',
      width: 130
  },
    {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_MONEY,
        field: 'money',
        type: 'string',
        align: 'right',
        pipe: EnumCoreTablePipeType.NUMBER,
        width: 130,
    },
    {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EFFECT_DAY,
        field: 'effectDate',
        type: 'string',
        pipe: EnumCoreTablePipeType.DATE,
        align: 'center',
        width: 100
    }
  ]

  defaultAvatar!: string;

  editRoute: ICorePageListEditRouting = {
      auxiliary: 'popupAux'
    }
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private ras: RandomAvatarService,
    private organizationService: OrganizationService
  ) {
    super(mls);
    this.defaultAvatar = ras.get();

    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
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

  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: "HU_WELFARE_MNG",
        lang: x
      }
    })
  }
}
