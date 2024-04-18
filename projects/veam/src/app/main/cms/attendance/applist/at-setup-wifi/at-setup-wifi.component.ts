import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, IFilterOperator, EnumFilterOperator, IInOperator, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting, MultiLanguageService, OrganizationService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-at-setup-wifi',
  templateUrl: './at-setup-wifi.component.html',
  styleUrls: ['./at-setup-wifi.component.scss']
})

export class AtSetupWifiComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  /*
  Properties being passed to core-page-list
  */
  orgIds!: number[];
  outerParam$ = new BehaviorSubject<any>(null);
  shownFrom!: string;
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL,
    }
  ]
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ]
  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_SETUP_WIFI;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_SETUP_WIFI_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.AT_SETUP_WIFI_DELETE_IDS,
    toggleActiveIds: api.AT_SETUP_WIFI_TOGGLE_ACTIVE_IDS
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_GROUP_ID,
      field: 'id',
      type: 'number',
      hidden: true,
      align: 'left',
      width: 10,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_DEPARTMENT_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_NAME,
      field: 'nameVn',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_WIFI_NAME,
      field: 'nameWifi',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_IP,
      field: 'ip',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_PROGRAM_STATUS,
      field: 'status',
      type: 'string',
      align: 'left',
      width: 130,
    },
    
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  constructor(
    public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
    ) { 
      super(mls);
      const newOrgIds: number[] = [];
      this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
      this.onOrgIdsChange(newOrgIds)
    }

  override ngOnInit(): void { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      
    })
  }
  override ngOnDestroy(): void { }

  onOrgIdsChange(orgIds: number[]) {

    this.orgIds = orgIds
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds
      }
    ]
  }
}
