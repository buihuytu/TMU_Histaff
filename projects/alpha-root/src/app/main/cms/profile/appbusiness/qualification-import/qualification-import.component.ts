import { Component, OnInit, TemplateRef, ViewChild, isDevMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CoreTableComponent, BaseComponent, ICorePageListApiDefinition, ICoreTableColumnItem, EnumCoreTablePipeType, EnumCoreButtonVNSCode, IXlsxImportObject, ISortItem, EnumSortDirection, MultiLanguageService, CorePageListService, AlertService, AppService, noneAutoClosedAlertOptions, ICoreButtonVNS, IFormatedResponse, alertOptions } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-qualification-import',
  templateUrl: './qualification-import.component.html',
  styleUrls: ['./qualification-import.component.scss'],
  providers: [CoreTableComponent]
})
export class QualificationImportComponent extends BaseComponent implements OnInit {

  captionCode: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_HU_CERTIFICATE_IMPORT
  @ViewChild('isPrime') isPrime!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.XLSX_HU_CERTIFICATE_IMPORT_QUERY_LIST,
  }

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
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EMPLOYEE_NAME,
      field: 'employeeFullName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TITLE_NAME,
      field: 'titleName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TYPECERTIFICATENAME,
      field: 'typeCertificateName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_IS_PRIME,
      field: 'isPrime',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      width: 100,
      readonly:true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TRAIN_FROM,
      field: 'trainFromDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TRAIN_TO,
      field: 'trainToDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EFFECT_DATE,
      field: 'effectFrom',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EXPIRE_DATE,
      field: 'effectTo',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_LEVEL,
      field: 'levelName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_MAJOR,
      field: 'major',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_LEVELTRAINNAME,
      field: 'levelTrainName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_CONTENTTRAIN,
      field: 'contentTrain',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_SCHOOLNAME,
      field: 'schoolName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_YEAR,
      field: 'year',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_MARK,
      field: 'mark',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TYPETRAINNAME,
      field: 'typeTrainName',
      type: 'string',
      align: 'left',
      width: 200,
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

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCoreButtonGroupVNSClick(e: ICoreButtonVNS) {
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_CANCEL) {
      this.onCancel();
    } else if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SAVE) {

      this.loading = true;

      this.subscriptions.push(
        this.appService.post(api.XLSX_HU_CERTIFICATE_IMPORT_SAVE, this.importPreviewOuterParam).subscribe(x => {
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
              this.alertService.info(this.mls.trans(body.messageCode, this.lang), alertOptions)
            }
          } else {
            console.log("Save failed", x)
          }
        })

      )
    }
  }
}
