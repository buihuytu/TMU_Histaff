import { Component, OnInit, TemplateRef, ViewChild, isDevMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICoreTableColumnItem, EnumCoreTablePipeType, EnumCoreButtonVNSCode, IXlsxImportObject, ISortItem, EnumSortDirection, MultiLanguageService, CorePageListService, AlertService, AppService, noneAutoClosedAlertOptions, ICoreButtonVNS, IFormatedResponse, alertOptions } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-hucommend-import',
  templateUrl: './hucommend-import.component.html',
  styleUrls: ['./hucommend-import.component.scss']
})
export class HucommendImportComponent extends BaseComponent implements OnInit {

  captionCode: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_IMPORT

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.XLSX_HU_COMMAND_IMPORT_QUERY_LIST,
  }

  checkboxTemplate!: TemplateRef<any>;
  @ViewChild('isTax') isTax!: TemplateRef<any>;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      type: 'number',
      align: 'right',
      hidden: true,
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_IMPORT_INSERT_ON,
      field: 'xlsxInsertOn',
      type: 'date',
      align: 'left',
      width: 160,
      pipe: EnumCoreTablePipeType.DATE_TIME,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_IMPORT_FILE_NAME,
      field: 'xlsxFileName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_IMPORT_ROW,
      field: 'xlsxRow',
      type: 'number',
      align: 'center',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 240,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_STATUS_ID,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_COMMEND_OBJ_ID,
      field: 'commendObjName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_YEAR,
      field: 'year',
      type: 'number',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_NO,
      field: 'no',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SIGN_DATE,
      field: 'signDate',
      type: 'date',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SIGN_NAME,
      field: 'signerName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_POSITION_NAME,
      field: 'signerPosition',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SALARY_INCREASE_TIME,
      field: 'salaryIncreaseTime',
      type: 'number',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COMMEND_AWARD_TITLE,
      field: 'awardTitleName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_COMMEND_ORG_LEVEL,
      field: 'orgLevelName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_REASON,
      field: 'reason',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COMMEND_AWARD_TITLE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SIGN_DATE,
      field: 'effectDate',
      type: 'date',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_PAYMENT_NO,
      field: 'paymentNo',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SOURCE_COST_ID,
      field: 'fundSourceName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_MONEY,
      field: 'money',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.NUMBER,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_REWARD,
      field: 'rewardName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_REWARD_LEVEL,
      field: 'rewardLevelName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_IS_TAX,
      field: 'isTax',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_MONTH_TAX,
      field: 'monthTax',
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_PAYMENT_CONTENT,
      field: 'paymentContent',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SIGN_PAYMENT_NAME,
      field: 'signPaymentName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_POSITION_PAYMENT_NAME,
      field: 'positionPaymentName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SIGN_PAYMENT_DATE,
      field: 'signPaymentDate',
      type: 'date',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_POSITION_PAYMENT_NOTE,
      field: 'paymentNote',
      type: 'string',
      align: 'left',
      width: 250,
    },
  ]

  callerListInstance!: number;

  shownButtonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SAVE,
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL
  ]

  importPreviewOuterParam!: IXlsxImportObject;
  loading!: boolean;

  outerSort: ISortItem[] = [
    {
      field: 'xlsxRow',
      sortDirection: EnumSortDirection.ASC
    }
  ];

  constructor(
    public override mls: MultiLanguageService,
    private router: Router,
    private route: ActivatedRoute,
    private corePageListService: CorePageListService,
    private alertService: AlertService,
    private appService: AppService,
  ) {
    super(mls);
    const navigation = this.router.getCurrentNavigation();

    this.importPreviewOuterParam = navigation?.extras?.state!['importPreviewOuterParam'];

    this.callerListInstance = Number(
      this.route.snapshot.paramMap.get('listInstance')!
    );

    const instancesFilter = this.corePageListService.instances.filter(
      (x) => x.instanceNumber === this.callerListInstance
    );
    if (!!instancesFilter.length) {
      const instance = instancesFilter[0];
    } else {
      if (isDevMode()) {
        this.alertService.info(`CorePageList instances do not include number ${this.callerListInstance}`, noneAutoClosedAlertOptions)
      }
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
        this.columns.filter((c) => c.field === 'isTax')[0].templateRef =
            this.isTax;
    });
}

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCoreButtonGroupVNSClick(e: ICoreButtonVNS) {
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_CANCEL) {
      this.onCancel();
    } else if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SAVE) {

      this.loading = true;

      this.subscriptions.push(
        this.appService.post(api.XLSX_HU_COMMAND_IMPORT_SAVE, this.importPreviewOuterParam).subscribe(x => {
          this.loading = false;
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              const instanceFilter = this.corePageListService.instances.filter(x => x.instanceNumber === this.callerListInstance)
              if (!!instanceFilter.length) {
                instanceFilter[0].reloadFlag$.next(!instanceFilter[0].reloadFlag$.value)
              }
              this.onCancel();
            } else {
              // this.alertService.info(this.mls.trans(body.messageCode, this.lang), alertOptions)
            }
          } else {
            console.log("Save failed", x)
          }
        })

      )
    }
  }
}