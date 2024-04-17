import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICoreButtonVNS, ICoreDropdownOption, IFilterOperator, ICoreParamControl, IInOperator, ISortItem, EnumSortDirection, EnumCoreButtonVNSCode, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, AppService, OrganizationService, AlertService, DialogService, IFormatedResponse, alertOptions, EnumFilterOperator } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject } from "rxjs";

@Component({
  selector: 'cms-app-ins-arising',
  templateUrl: './ins-arising.component.html',
  styleUrls: ['./ins-arising.component.scss'],
})
export class InsArisingComponent
  extends BaseComponent
  implements OnInit, OnDestroy {
  @Output() buttonClick = new EventEmitter<ICoreButtonVNS>();
  @ViewChild('hi') hi!: TemplateRef<any>;
  @ViewChild('ui') ui!: TemplateRef<any>;
  @ViewChild('ai') ai!: TemplateRef<any>;
  @ViewChild('si') si!: TemplateRef<any>;
  @ViewChild('insOrgId') insOrgId!: TemplateRef<any>;
  @ViewChild('insGroupType') insGroupType!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_ARISING;

  override subscriptions: Subscription[] = [];
  orgId!: number;

  startDate!: any;
  endDate!: any;

  groupOptionsArisingGroup$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsInsOrg$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  arisingGroupGetByIdObject$ = new BehaviorSubject<any>(null);
  insOrgGetByIdObject$ = new BehaviorSubject<any>(null);

  shownFrom!: string;

  filterOperators!: IFilterOperator[];
  paramRows!: ICoreParamControl[][];

  datePeriodComparisonFor: string = 'declaredDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_EFFECT_DATE;

  orgIds!: number[];
  insOrgIdsDefault: number[] = [];
  outerParam$ = new BehaviorSubject<any>(null);
  outerFilterOperators: IFilterOperator[] = [];
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || [],
    },
  ];
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  buttonItemSearch: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
  ];

  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.HEADER_DECLAREINSARISING,
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL,
  ];
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.INS_ARISING_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.INS_ARISING_DELETE_IDS,
  };
  listInstance!: number;
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
      type: 'number',
      align: 'right',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_INS_ORG_NAME,
      field: 'insOrgName',
      type: 'string',
      align: 'left',
      width: 350,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_INS_GROUP_TYPE,
      field: 'insGroupTypeName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_REASONS,
      field: 'reasons',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_INS_NO,
      field: 'insNo',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_EFFECT_DATE,
      field: 'effectDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'right',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_OLD_SAL,
      field: 'oldSal',
      type: 'string',
      pipe: EnumCoreTablePipeType.NUMBER,
      align: 'right',
      width: 150,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_OLD_SAL,
      field: 'oldSal',
      type: 'string',
      pipe: EnumCoreTablePipeType.NUMBER,
      align: 'right',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_OLD_INS_SAL,
      field: 'oldInsSal',
      type: 'string',
      pipe: EnumCoreTablePipeType.NUMBER,
      align: 'right',
      width: 135,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_NEW_SAL,
      field: 'newSal',
      type: 'string',
      pipe: EnumCoreTablePipeType.NUMBER,
      align: 'right',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_NEW_INS_SAL,
      field: 'newInsSal',
      type: 'string',
      pipe: EnumCoreTablePipeType.NUMBER,
      align: 'right',
      width: 135,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_SI,
      field: 'si',
      width: 50,
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_HI,
      field: 'hi',
      width: 50,
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_UI,
      field: 'ui',
      width: 50,
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_AI,
      field: 'ai',
      width: 75,
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };

  selectedIds: number[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public override mls: MultiLanguageService,
    private appService: AppService,
    private organizationService: OrganizationService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {
    super(mls);
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map((x) =>
      newOrgIds.push(Number(x))
    );
    this.onOrgIdsChange(newOrgIds);
    this.shownFrom = 'name';
  }

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }

  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'hi')[0].templateRef = this.hi;
    this.columns.filter((c) => c.field === 'si')[0].templateRef = this.si;
    this.columns.filter((c) => c.field === 'ai')[0].templateRef = this.ai;
    this.columns.filter((c) => c.field === 'ui')[0].templateRef = this.ui;
  }
  override ngOnInit(): void {
    //debugger;
    this.subscriptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'INS_UNIT')
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              // options.push({
              //   value: Number(),
              //   text: ''
              // })
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                }),
                  this.insOrgIdsDefault.push(Number(g.id));
                this.insOrgIdsDefault.push(Number(0));
              });
              this.groupOptionsInsOrg$.next(options);
            }
          }
        })
    );

    const options: { value: number | null; text: string }[] = [];
    options.push(
      // {
      //   value: Number(),
      //   text: ''
      // },
      {
        value: 1,
        text: 'Tăng',
      },
      {
        value: 2,
        text: 'Giảm',
      },
      {
        value: 3,
        text: 'Điểu chỉnh',
      }
    );
    this.groupOptionsArisingGroup$.next(options);
  }

  override ngOnDestroy(): void { }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    if (e.code == EnumCoreButtonVNSCode.HEADER_DECLAREINSARISING) {
      console.log('HEADER_DECLAREINSARISING', this.selectedIds);
      if (this.selectedIds.length == 0) {
        this.alertService.error(
          this.mls.trans('NO_SELECTED_ID_TO_CREATE'),
          alertOptions
        );
      } else {
        this.router.navigate(
          [
            {
              outlets: {
                corePageListAux: [
                  btoa('0'),
                  { listInstance: this.listInstance },
                ],
              },
            },
          ],
          { relativeTo: this.route, state: { data: this.selectedIds } }
        );
      }
    }
  }
  onInstanceCreated(event: number) {
    this.listInstance = event;
  }

  onRowDoubleClick(e: any) {
    //debugger;
    return;
  }
  onRowClick(e: any) {
    debugger;
    return;
  }
  onSelectedIdsChange(e: number[]) {
    this.selectedIds = e;
  }

  onFormReinit(e: number[]) {
    this.selectedIds = e || [];
  }

  onButtonClick(e: ICoreButtonVNS): void {
    let InsGroupTypes: number[] = [];
    let insOrgIds: number[] = [];
    debugger;
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SEARCH) {
      this.filterOperators = [
        {
          field: 'effectDate',
          operator: EnumFilterOperator.GREATER_THAN_OR_EQUAL,
          dateTimeValue: this.startDate,
        },
        {
          field: 'effectDate',
          operator: EnumFilterOperator.LESS_THAN_OR_EQUAL,
          dateTimeValue: this.endDate,
        },
      ];
      if (this.insGroupType != null) {
        InsGroupTypes.push(Number(this.insGroupType));
      } else {
        InsGroupTypes.push(Number(1));
        InsGroupTypes.push(Number(2));
        InsGroupTypes.push(Number(3));
      }

      if (this.insOrgId != null) {
        insOrgIds.push(Number(this.insOrgId));
      } else {
        insOrgIds = this.insOrgIdsDefault;
      }

      this.outerInOperators = [
        {
          field: 'insOrgId',
          values: insOrgIds,
        },
        {
          field: 'insGroupType',
          values: InsGroupTypes,
        },
      ];
    }
  }
}
