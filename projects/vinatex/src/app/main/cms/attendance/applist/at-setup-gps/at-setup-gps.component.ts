import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { IFilterOperator, EnumFilterOperator, IInOperator, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting, OrganizationService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-at-setup-gps',
  templateUrl: './at-setup-gps.component.html',
  styleUrls: ['./at-setup-gps.component.scss']
})

export class AtSetupGpsComponent implements OnInit, AfterViewInit, OnDestroy {

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
    queryListRelativePath: api.AT_SETUP_GPS_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.AT_SETUP_GPS_DELETE_IDS,
    toggleActiveIds: api.AT_SETUP_GPS_TOGGLE_ACTIVE_IDS
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_GPS_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_GPS_ADDRESS,
      field: 'address',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_GPS_LAT,
      field: 'latVd',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_GPS_LONG,
      field: 'longKd',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_GPS_RADIUS,
      field: 'radius',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_IS_ACTIVE,
      field: 'status',
      type: 'string',
      align: 'left',
      width: 130,
    },
    
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  constructor(private router: Router, private route: ActivatedRoute,
    private organizationService: OrganizationService,
    ) { 
    const newOrgIds: number[] = [];
      this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
      this.onOrgIdsChange(newOrgIds)
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      
    })
  }
  ngOnDestroy(): void { }

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

