import { Component, OnInit, ViewEncapsulation, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent, IFilterOperator, EnumFilterOperator, IInOperator, ISortItem, EnumSortDirection, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, OrganizationService, AlertService, ICoreButtonVNS, EnumCoreButtonVNSCode, alertOptions } from 'ngx-histaff-alpha';

@Component({
  selector: 'cms-profile-inschange',
  templateUrl: './inschange.component.html',
  styleUrls: ['./inschange.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InsChangeComponent extends BaseComponent implements OnInit, AfterViewInit {
  /*
  Properties being passed to core-page-list
  */
  @ViewChild('isBhxh') isBhxh!: TemplateRef<any>;
  @ViewChild('isBhyt') isBhyt!: TemplateRef<any>;
  @ViewChild('isBhtn') isBhtn!: TemplateRef<any>;
  @ViewChild('isBnn') isBnn!: TemplateRef<any>;
  orgIds!: number[];
  title = EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE;
  checkboxTemplate!: TemplateRef<any>;
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
  selectedData!: any[];
  corePageListInstanceNumber: any;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.INS_CHANGE_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.INS_CHANGE_DELETE_IDS,
  };

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
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_EMPL_CODE, //ma nv
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_EMPL_NAME, //ten nv
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 260,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_ORG_NAME, //cong ty
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_POS_NAME, //chuc danh
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_CHANGE_NAME, //loai bien dong
      field: 'changeTypeName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_EFFECTIVE_DATE, //ngay hieu luc
      field: 'effectiveDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 120,
      readonly: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_EXPIRE_DATE, //ngay het han
      field: 'expireDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 120,
      readonly: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_MONTH, //thang bien dong
      // field: 'changeMonth',
      // type: 'date',
      // pipe: EnumCoreTablePipeType.DATE_TIME,
      field: 'changeMonthString',
      type: 'string',
      align: 'center',
      width: 120,
      readonly: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_BHXH_NO, //so so bhxh
      field: 'bhxhNo',
      type: 'string',
      align: 'center',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_ID_NO, //CCCD
      field: 'idNo',
      type: 'string',
      align: 'center',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_ID_DATE, //ngay cap
      field: 'idDate',
      type: 'date',
      align: 'left',
      pipe: EnumCoreTablePipeType.DATE,
      width: 100,
      readonly: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_ID_PLACE, //noi cap
      field: 'addressIdentity',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BIRTH_DATE, //ngay sinh
      field: 'birthDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 100,
      readonly: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BIRTH_PLACE, //noi sinh
      field: 'birthPlace',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_UNIT, //don vi bh
      field: 'unitInsuranceTypeName',
      type: 'string',
      align: 'left',
      width: 250,
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
      align: 'center',
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHTNLĐ_BNN,
      field: 'isBhtn',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHTN,
      field: 'isBnn',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_DECLARATION_PERIOD, //dot khai bao
      // field: 'declarationPeriod',
      // type: 'date',
      // pipe: EnumCoreTablePipeType.DATE,
      field: 'declarationPeriodString',
      type: 'string',
      align: 'center',
      width: 120,
      readonly: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_BHYT_REIMBURSEMENT_DATE, //ngay tra the bhyt
      field: 'bhytReimbursementDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 150,
      readonly: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_NOTE, //ghi chu
      field: 'note',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_SALARY, //luong
      field: 'salaryNew',
      type: 'string',
      align: 'left',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_ARREARS_FROM_MONTH, //tu thang(truy thu)
      // field: 'arrearsFromMonth',
      // type: 'date',
      // pipe: EnumCoreTablePipeType.DATE,
      field: 'arrearsFromMonthString',
      type: 'string',
      align: 'center',
      width: 210,
      readonly: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_ARREARS_TO_MONTH, //den thang(truy thu)
      // field: 'arrearsToMonth',
      // type: 'date',
      // pipe: EnumCoreTablePipeType.DATE,
      field: 'arrearsToMonthString',
      type: 'string',
      align: 'center',
      width: 210,
      readonly: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_AR_BHXH_SA_DIF, //muc chenh lech bhxh
      field: 'arBhxhSalaryDifference',
      type: 'string',
      pipe: EnumCoreTablePipeType.NUMBER,
      align: 'right',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_AR_BHYT_SA_DIF, //muc chenh lech bhyt
      field: 'arBhytSalaryDifference',
      type: 'string',
      pipe: EnumCoreTablePipeType.NUMBER,
      align: 'right',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_AR_BHTN_SA_DIF, //muc chenh lech bhtn
      field: 'arBhtnSalaryDifference',
      type: 'string',
      pipe: EnumCoreTablePipeType.NUMBER,
      align: 'right',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_AR_BHTNLD_BNN_SA_DIF, //muc chenh lech bhtnld-bnn
      field: 'arBhtnldBnnSalaryDifference',
      type: 'string',
      pipe: EnumCoreTablePipeType.NUMBER,
      align: 'right',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_WITHDRAWAL_FROM_MONTH, //tu thang(thoai thu)
      // field: 'withdrawalFromMonth',
      // type: 'date',
      // pipe: EnumCoreTablePipeType.DATE,
      field: 'withdrawalFromMonthString',
      type: 'string',
      align: 'center',
      width: 210,
      readonly: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_WITHDRAWAL_TO_MONTH, //den thang(thoai thu)
      // field: 'withdrawalToMonth',
      // type: 'date',
      // pipe: EnumCoreTablePipeType.DATE,
      field: 'withdrawalToMonthString',
      type: 'string',
      align: 'center',
      width: 210,
      readonly: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_WD_BHXH_SA_DIF, //chenh lech bhxh
      field: 'wdBhxhSalaryDifference',
      type: 'string',
      pipe: EnumCoreTablePipeType.NUMBER,
      align: 'right',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_WD_BHYT_SA_DIF, //chenh lech bhyt
      field: 'wdBhytSalaryDifference',
      type: 'string',
      pipe: EnumCoreTablePipeType.NUMBER,
      align: 'right',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_WD_BHTN_SA_DIF, //chenh lech bhtn
      field: 'wdBhtnSalaryDifference',
      type: 'string',
      pipe: EnumCoreTablePipeType.NUMBER,
      align: 'right',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_WD_BHTNLD_BNN_SA_DIF, //chenh lech bhtnld-bnn
      field: 'wdBhtnldBnnSalaryDifference',
      type: 'string',
      pipe: EnumCoreTablePipeType.NUMBER,
      align: 'right',
      width: 160,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  constructor(public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    super(mls);
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map((x) => newOrgIds.push(Number(x)));
    this.onOrgIdsChange(newOrgIds);
    this.corePageListInstanceNumber = new Date().getTime();
  }
  override ngOnInit(): void {
    this.subscriptions.push(this.mls.lang$.subscribe((x) => (this.lang = x)));
  }
  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'isBhxh')[0].templateRef = this.isBhxh;
    this.columns.filter((c) => c.field === 'isBhyt')[0].templateRef = this.isBhyt;
    this.columns.filter((c) => c.field === 'isBhtn')[0].templateRef = this.isBhtn;
    this.columns.filter((c) => c.field === 'isBnn')[0].templateRef = this.isBnn;
  }
  onSelectedDataChange(e: any[]) {
    this.selectedData = e;
  }
  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    if (e.code == EnumCoreButtonVNSCode.HEADER_COPY) {
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
    }
  }
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
}
