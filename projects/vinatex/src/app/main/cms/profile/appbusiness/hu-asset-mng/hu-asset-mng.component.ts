import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CoreOrgTreeComponent, CorePageListComponent, FullscreenModalLoaderComponent, BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, IFilterOperator, EnumFilterOperator, IInOperator, ICoreTableColumnItem, MultiLanguageService, OrganizationService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-hu-asset-mng',
  standalone: true,
  imports: [
    FormsModule,
    CoreOrgTreeComponent,
    CorePageListComponent,
    CommonModule, 
    FullscreenModalLoaderComponent
  ],
  templateUrl: './hu-asset-mng.component.html',
  styleUrl: './hu-asset-mng.component.scss'
})
export class HuAssetMngComponent extends BaseComponent {
  selectedIds: string[] | number[] = [];
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_ASSET_MNG;
  outerParam$ = new BehaviorSubject<any>(null);
  id: any;
  loading!: boolean;
  orgIds!: number[];
  dateIssueComparisonFor: string = 'dateIssue';
  dateIssueComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DATE_ISSUE_FILTER;
  statusInclusionFor: string = 'empStatusId';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_CORE_PARAMS_EMPLOYEE_STATUS_IN;
  statusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_ASSET_MNG_QUERY_LIST,
  };
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_ASSET_MNG_DELETE_IDS,
  };
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_EMPLOYEE_CODE,//ma nhan vien
      field: 'employeeId',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_EMPLOYEE_NAME,//ho ten nv
      field: 'fullName',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_POSITION_NAME,//chuc danh
      field: 'jobName',
      type: 'string',
      align: 'left',
      width: 170,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_ORGANIZATION_NAME,//phong ban
      field: 'organizationName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_POSITION_NAME,//vi tri cong viec
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ASSET_NAME,//ten tai san
      field: 'name',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ASSET_GROUP,//nhom tai san
      field: 'groupAssetName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_HU_ASSET_MNG_VALUE_ASSET,//gia tri tai san
      field: 'valueAsset',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_HU_ASSET_MNG_DATE_ISSUE,//ngay cap phat
      field: 'dateIssue',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_HU_ASSET_MNG_REVOCATION_DATE,//ngay thu hoi
      field: 'revocationDate',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_HU_ASSET_MNG_STATUS_ASSET,//trang thai
      field: 'satusName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,//Note
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
    }
  ];

  constructor(
    public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
  ) {
    super(mls);
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
  }

  override ngOnDestroy(): void { }

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }

  onRowClick(e: any) {
    this.id = e.id
  }

  onSelectedIdsChange(e: number[]) {
    this.selectedIds = e;
  }
}
