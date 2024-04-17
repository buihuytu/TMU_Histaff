import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, EnumCoreTablePipeType, EnumFilterOperator, EnumSortDirection, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, IFilterOperator, IGenerateTemplateRequest, IInOperator, ISortItem, MultiLanguageService, OrganizationService,} from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "cms-app-allowanceemployee",
  templateUrl: "./allowanceemployee.component.html",
  styleUrls: ["./allowanceemployee.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AllowanceEmployeeComponent extends BaseComponent {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_ALLOWANSEEMPLOYEE
  datePeriodComparisonFor: string = 'startDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_DATESTART_FILTER;
  statusInclusionFor: string = 'workStatusId';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_CORE_PARAMS_EMPLOYEE_STATUS_IN;
  statusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;
  orgIds!: number[];
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
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_ALLOWANSEEMPLOYEE_DELETE_IDS,
  }
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  columns: ICoreTableColumnItem[] = [
    {
      caption: 'ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_EMPLOYEECODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_EMPLOYEENAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 240,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_POSITION_NAME,
      field: 'posName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_ALLOWANCENAME,
      field: 'allowanceName',
      type: 'string',
      align: 'left',
      width: 220,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_MONNEY,
      field: 'monney',
      type: 'number',
      align: 'right',
      width: 100,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_ISCOEFICIENT,
      field: 'coefficient',
      type: 'number',
      align: 'certer',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_DATESTART,
      field: 'dateStart',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_DATEEND,
      field: 'dateEnd',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250,
    },
  ]

  generateTemplateRequest!: IGenerateTemplateRequest;

  constructor(
    public override mls: MultiLanguageService,
    private organizationService: OrganizationService
  ) {
    super(mls);
     /* Get orgIds startup value */
     const newOrgIds: number[] = [];
     this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
     this.onOrgIdsChange(newOrgIds)
  }
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_ALLOWANSEEMPLOYEE_QUERY_LIST,
  }
  onOrgIdsChange(orgIds: number[]) {

    this.orgIds = orgIds
    this.outerInOperators = [
      {
        field: 'orgId',
        values: this.orgIds
      }
    ]
  } 
  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: 'HU_ALLOWANCE_EMP',
        lang: x
      }
    })
  }
}
