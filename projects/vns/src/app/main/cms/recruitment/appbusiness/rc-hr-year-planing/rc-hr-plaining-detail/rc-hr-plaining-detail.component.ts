import { AfterViewInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';

import { RcHrYearPlaningService } from './rc-hr-year-plaining.service';
import { AppService, BaseComponent, ICoreDropdownOption, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, IFormatedResponse, IInOperator, MultiLanguageService, OrganizationService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-rc-hr-plaining-detail',
  // standalone: true,
  // imports: [],
  templateUrl: './rc-hr-plaining-detail.component.html',
  styleUrl: './rc-hr-plaining-detail.component.scss'
})
export class RcHrPlainingDetailComponent extends BaseComponent implements AfterViewInit {

  yearPlanId!: number;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.RC_PLANING_DETAIL_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.RC_PLANING_DETAIL_DELETE_IDS,
  }

  label: any = {
    year: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_YEAR_BOUNDARY,
    version: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_VERSION,
    effectDate: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EFFECT_DATE,
    position: EnumTranslateKey.UI_LABEL_TIME_IMPORT_POSITION_NAME,
  }


  yearPlaning: {
    year?: number,
    version?: string,
    effectDate?: string,
    orgName?: string,
  } = {
      year: 0,
      version: '',
      effectDate: '',
      orgName: ''
    }

  corePageListInstanceNumber: any;
  orgIds!: number[];

  positionId!: number;
  positionOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  positionGetByIdObject$ = new BehaviorSubject<any>(null);
  positionGetByIdApi = api.RC_YEAR_PLANING_GETYEAR;

  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || [],
    },
  ];
  outerParam$ = new BehaviorSubject<any>(null);
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_YEAR,
      field: 'id',
      type: 'number',
      align: 'left',
      width: 0,
      hidden: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_YEAR,
      field: 'yearPlanId',
      type: 'number',
      align: 'left',
      width: 0,
      hidden: true,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_ORG_NAME,
      field: 'orgName',
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
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T1,
      field: 'month1',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T2,
      field: 'month2',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T3,
      field: 'month3',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T4,
      field: 'month4',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T5,
      field: 'month5',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T6,
      field: 'month6',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T7,
      field: 'month7',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T8,
      field: 'month8',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T9,
      field: 'month9',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T10,
      field: 'month10',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T11,
      field: 'month11',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T12,
      field: 'month12',
      type: 'string',
      align: 'left',
      width: 80,
    },
  ]
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  constructor(
    public override mls: MultiLanguageService,
    private router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    public appService: AppService,
    private rcHrYearPlaningService: RcHrYearPlaningService,
  ) {
    super(mls);
    this.corePageListInstanceNumber = new Date().getTime();
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map((x) => newOrgIds.push(Number(x)));
    this.onOrgIdsChange(newOrgIds);
    this.yearPlanId = Number(atob(this.route.snapshot.params['id']));
  }
  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
    })
  }

  ngAfterViewInit(): void {
    this.outerParam$.next({
      yearPlanId: this.yearPlanId
    })
    setTimeout(() => {
      this.subscriptions.push(
        this.appService.get(api.RC_YEAR_PLANING_READ + `?id=${this.yearPlanId}`).subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options = {
                year: body.innerBody.year,
                version: body.innerBody.version,
                effectDate: body.innerBody.effectDate,
              };
              this.yearPlaning = options;
              this.rcHrYearPlaningService.yearPlaning$.next({
                ...this.rcHrYearPlaningService.yearPlaning$.value,
                yearPlanId: this.yearPlanId,
                year: options.year,
                version: options.version,
                effectDate: options.effectDate,
              });
            }
          }
        }),
      );
    })
  }

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
    const idOrg = this.organizationService.status$.value.selectedKey;
    if (this.orgIds.length > 0) {
      this.subscriptions.push(
        this.appService.post(api.RC_PLANING_DETAIL_GET_ALL_POSITION_BY_ORGS, { ids: orgIds, id: idOrg }).subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              res.body.innerBody.listPos.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              this.rcHrYearPlaningService.yearPlaning$.next({
                ...this.rcHrYearPlaningService.yearPlaning$.value,
                orgName: res.body.innerBody.orgName,
                orgId: idOrg
              });
              this.positionOptions$.next(options);
            }
          }
        }),
      );
    }
  }
  onPositionChange(e: any) {

  }
  onBack() {

  }
}