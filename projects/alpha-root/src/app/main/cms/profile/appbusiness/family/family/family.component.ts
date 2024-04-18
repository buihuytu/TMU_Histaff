import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, TemplateRef } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, IGenerateTemplateRequest, ISortItem, EnumSortDirection, IFilterOperator, EnumFilterOperator, IInOperator, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, OrganizationService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'cms-app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
})
export class FamilyComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('isHousehold') isHousehold!: TemplateRef<any>;
  @ViewChild('isDeduct') isDeduct!: TemplateRef<any>;
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_FAMILY;
  orgIds!: number[];

  generateTemplateRequest!: IGenerateTemplateRequest;
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  datePeriodComparisonFor: string = 'deductFrom';
  datePeriodComparisonForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_DEDUCT_FROM;
  statusInclusionFor: string = 'statusId';
  statusInclusionForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_CORE_PARAMS_EMPLOYEE_STATUS_IN;
  statusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;
  outerParam$ = new BehaviorSubject<any>(null);
  headerFirstRowHeight: number = 60;
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL,
    },
  ];
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || [],
    },
  ];

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_FAMILY_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_FAMILY_DELETE_IDS,
    toggleApproveIds: api.HU_FAMILY_CHANGE_STATUS,
  };

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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_RELATIONSHIP,
      field: 'relationshipName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_FULLNAME,
      field: 'fullname',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_BIRTH_DATE,
      field: 'birthDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_ID_NO,
      field: 'idNo',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_PIT_CODE,
      field: 'pitCode',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_IS_DEDUCT,
      field: 'isDeduct',
      width: 110,
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      //readonly: true,
      //templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_DEDUCT_FROM,
      field: 'deductFrom',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_DEDUCT_TO,
      field: 'deductTo',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
    },
    // ẩn trường là chủ hộ, BA Tiến yêu cầu
    // {
    //   caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_IS_HOUSEHOLD,
    //   field: 'isHousehold',
    //   width: 150,
    //   type: 'bool',
    //   pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
    //   align: 'center',
    //   readonly: true,
    //   templateRef: this.checkboxTemplate,
    // },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 150,
    },
    
  ];

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  constructor(
    public override mls: MultiLanguageService,
    private organizationService: OrganizationService
  )
  {
    super(mls);

    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map((x) =>
      newOrgIds.push(Number(x))
    );
    this.onOrgIdsChange(newOrgIds);
  }

  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'isDeduct')[0].templateRef =
      this.isDeduct;

    const stickerFilter = this.columns.filter(c => c.field === 'statusName');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }
  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: 'HU_FAMILY',
        lang: x
      }
    })
  }

  override ngOnDestroy(): void { }
}
