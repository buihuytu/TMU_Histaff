import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition,ICorePageListCRUD, IFilterOperator, EnumFilterOperator, IInOperator, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, OrganizationService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'cms-app-se-authorize-approve',
  templateUrl: './se-authorize-approve.component.html',
  styleUrls: ['./se-authorize-approve.component.scss'],
})
export class SeAuthorizeApproveComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SE_AUTHORIZE_APPROVE;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SE_AUTHORIZE_APPROVE_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.SE_AUTHORIZE_APPROVE_DELETE_IDS,
  };

  orgIds!: number[];
  outerParam$ = new BehaviorSubject<any>(null);
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
      caption: 'id',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_PROCESS,
      field: 'processName',
      type: 'number',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_FROM_DATE,
      field: 'fromDate',
      type: 'number',
      align: 'left',
      pipe: EnumCoreTablePipeType.DATE,
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_TO_DATE,
      field: 'toDate',
      type: 'number',
      align: 'left',
      pipe: EnumCoreTablePipeType.DATE,
      width: 250,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(public override mls: MultiLanguageService, private organizationService: OrganizationService) {
    super(mls);
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map((x) => newOrgIds.push(Number(x)));
    this.onOrgIdsChange(newOrgIds);
  }
  ngAfterViewInit(): void {}

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }
}
