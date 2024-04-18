import { Component, ViewEncapsulation, ViewChild, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, IFilterOperator, EnumFilterOperator, IInOperator, ISortItem, EnumSortDirection, ICorePageListApiDefinition, ICorePageListCRUD, IGenerateTemplateRequest, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, OrganizationService, AlertService, MultiLanguageService, ICoreButtonVNS, EnumCoreButtonVNSCode, alertOptions } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription } from "rxjs";
import { InsInformationEditService } from "./edit/insinformation.edit.service";


@Component({
  selector: 'cms-profile-insinformation',
  templateUrl: './insinformation.component.html',
  styleUrls: ['./insinformation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InsInformationComponent extends BaseComponent {
  /*
  Properties being passed to core-page-list
  */
  @ViewChild('isBhxh') isBhxh!: TemplateRef<any>;
  @ViewChild('isBhyt') isBhyt!: TemplateRef<any>;
  @ViewChild('isBhtnldBnn') isBhtnldBnn!: TemplateRef<any>;
  @ViewChild('isBhtn') isBhtn!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;
  headerFirstRowHeight: number = 50;
  orgIds!: number[];
  title = EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION;
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
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.INS_INFORMATION_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.INS_INFORMATION_DELETE_IDS,
  };

  generateTemplateRequest!: IGenerateTemplateRequest;

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
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 350,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_ID_NO,
      field: 'idNo',
      type: 'number',
      align: 'left',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_ID_DATE,
      field: 'idDate',
      type: 'date',
      align: 'left',
      pipe: EnumCoreTablePipeType.DATE,
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BIRTH_DATE,
      field: 'birthDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BIRTH_PLACE,
      field: 'birthPlace',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_CONTACT,
      field: 'contact',
      type: 'string',
      align: 'center',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_SENIORITY_INSURANCE,
      field: 'seniorityInsuranceString',
      type: 'string',
      align: 'center',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_SENIORITY_INSURANCE_IN_CMP,
      field: 'seniorityInsuranceInCompanyString',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_COMPANY_SUPPLY_NAME,
      field: 'company',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_SALARY,
      field: 'salaryNew',
      type: 'string',
      align: 'right',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 170,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_SALARY_BHXH_YT,
      field: 'salaryBhxhYt',
      type: 'string',
      align: 'right',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 170,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_SALARY_BHTN,
      field: 'salaryBhTn',
      type: 'string',
      align: 'right',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH,
      field: 'isBhxh',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHYT,
      field: 'isBhyt',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'left',
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHTNLĐ_BNN,
      field: 'isBhtnldBnn',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      readonly: true,
      width: 120,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHTN,
      field: 'isBhtn',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  selectedData: any;
  corePageListInstanceNumber: any;
  override subscriptions: Subscription[] = [];
  override lang!: string
  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private insInformationEditService: InsInformationEditService,
    private alertService: AlertService,
    public override mls: MultiLanguageService
  ) {
    super(mls);
    this.corePageListInstanceNumber = new Date().getTime();
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map((x) => newOrgIds.push(Number(x)));
    this.onOrgIdsChange(newOrgIds);
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: 'INS_INFORMATION',
        lang: x
      }
    })
  }
  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'isBhxh')[0].templateRef = this.isBhxh;
    this.columns.filter((c) => c.field === 'isBhyt')[0].templateRef = this.isBhyt;
    this.columns.filter((c) => c.field === 'isBhtn')[0].templateRef = this.isBhtn;
    this.columns.filter((c) => c.field === 'isBhtnldBnn')[0].templateRef = this.isBhtnldBnn;
  }
  override ngOnDestroy(): void { }

  onRowClick(e: any) {
    this.router.navigate([btoa(e.id.toString())], { relativeTo: this.route });
  }
  onRowDoubleClick(e: any) {
    this.router.navigate([btoa(e.id.toString())], { relativeTo: this.route });
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

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    //console.log("StaffProfileComponent onCorePageHeaderButtonClick", e)
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_COPY:
        if (this.selectedData.length > 1) {
          this.alertService.error(`${this.mls.trans(EnumTranslateKey.NOT_SELECTED_MORE_THAN_ONE_ROW_FOR_BUTTON_COPY_DATA)}`, alertOptions)
          return;
        }
        this.router.navigate(
          [btoa('0'), { listInstance: this.corePageListInstanceNumber }],
          {
            relativeTo: this.route, state: { selectedData: this.selectedData }
          }
        );
        break;
      default:
        break;
    }
  }
  onSelectedDataChange(e: any[]) {
    this.selectedData = e;
    console.log(this.selectedData)
  }
}
