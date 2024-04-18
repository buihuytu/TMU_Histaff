import { Component, ViewEncapsulation, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ISortItem, EnumSortDirection, ICoreTableColumnItem, ICorePageListEditRouting, MultiLanguageService, IInOperator, OrganizationService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cms-setup-time-emp',
  templateUrl: './setuptimeemp.component.html',
  styleUrls: ['./setuptimeemp.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SetupTimeEmpComponent
  extends BaseComponent implements AfterViewInit
{
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /* START: Local filter params */
  orgIds!: number[];
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]
  outerParam$ = new BehaviorSubject<any>(null);

  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_SETUP_TIME_EMP;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_SETUP_TIME_EMP_QUERY_LIST,
  };

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.AT_SETUP_TIME_EMP_DELETE_IDS,
    toggleActiveIds: api.AT_SETUP_TIME_EMP_TOGGLE_ACTIVE_IDS,
  }

  // Sắp xếp lưới hiển thị theo cấp chức danh
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || [],
    },
  ];
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE,
      field: 'jobOrderNum',
      type: 'string',
      align: 'center',
      hidden: true,
      width: 0,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_STATUS,
      field:  'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_EMPLOYEE_POSITION,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_NUMBER_SWIPECARD,
      field: 'numberSwipecard',
      type: 'string',
      align: 'center',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_STATUS,
      field:  'status',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_TIME_EMP_DESCRIPTION,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 500,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_JOB_ORDER_NUM,
      field: 'jobOrderNum',
      type: 'string',
      align: 'right',
      width: 0,
      hidden: true,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(public override mls: MultiLanguageService,
    private organizationService: OrganizationService) {
    super(mls);
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdChange(newOrgIds);
  }



  onOrgIdChange(orgId: any) {
    this.orgIds = orgId;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgId,
      },
    ];
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }
}
