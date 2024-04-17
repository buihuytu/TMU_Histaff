import { Component, ElementRef, OnDestroy, OnInit, ViewChild, isDevMode } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListEditRouting, IGenerateTemplateRequest, IFilterOperator, EnumFilterOperator, IInOperator, ICorePageListCRUD, EnumCoreButtonVNSCode, ISortItem, EnumSortDirection, ICoreTableColumnItem, MultiLanguageService, CorePageListService, OrganizationService, EvaluateDialogService, AlertService, LongTaskService, AuthService, noneAutoClosedAlertOptions, IImportXlsxToDbRequest, IXlsxImportObject, ICoreButtonVNS } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, filter, map, switchMap } from 'rxjs';
import { HuEvaluateEditService } from './hu-evaluate-edit/hu-evaluate-edit.service';

declare let coreFileUtils: any;
const { blobToBase64 } = coreFileUtils;
@Component({
  selector: 'app-hu-evaluate',
  templateUrl: './hu-evaluate.component.html',
  styleUrls: ['./hu-evaluate.component.scss'],
})
export class HuEvaluateComponent implements OnInit, OnDestroy {

  @ViewChild('fileImport') fileImport!: ElementRef;

  datePeriodComparisonFor: string = 'fromDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_FROM_DATE_FILTER;
  statusInclusionFor: string = 'employeeStatus';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_CORE_PARAMS_EMPLOYEE_STATUS_IN;
  statusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_EVALUATE_QUERY_LIST,
  };
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  orgIds!: number[];
  lang!: string;

  subscriptions: Subscription[] = [];
  generateTemplateRequest!: IGenerateTemplateRequest;

  outerParam$ = new BehaviorSubject<any>(null);
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL
    }
  ]
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ]
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATE;
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_EVALUATE_DELETE_IDS,
  };
  corePageListInstanceNumber!: number;
  longApiRunning!: boolean

  clickGenerateTemplate$ = new BehaviorSubject<number>(0);
  templateFileName!: string;
  importPreviewPath!: string;

  pendingAction!: EnumCoreButtonVNSCode;

  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL,
    EnumCoreButtonVNSCode.NONE_HEADER_CONFIRM
  ];
  onOrgIdsChange(orgIds: number[]) {

    this.orgIds = orgIds
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds
      }
    ]
  }

  onInstanceCreated(e: number) {
    this.corePageListInstanceNumber = e
  }

  onProgressWindowClose(_: any) {
    this.longApiRunning = false;
  }

  generateTemplate(formType: number) {
    if (formType === 2) {
      const now = new Date().getTime();
      this.clickGenerateTemplate$.next(now);
    }
    else if (formType === 1) {

    }
    else {
    }
  }
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_EVALUATE_TYPE,
      field: 'evaluateName',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_YEAR,
      field: 'yearSearch',
      type: 'string',
      align: 'center',
      width: 100,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_EMPOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_EMPOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_CLASSIFICATION,
      field: 'classificationName',
      type: 'string',
      align: 'left',
      width: 220,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_POINT,
      field: 'pointSearch',
      type: 'string',
      align: 'center',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EVALUATE_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 150,
    },
  ];

  constructor(
    public mls: MultiLanguageService,
    private corePageListService: CorePageListService,
    private organizationService: OrganizationService,
    private huEvaluateEditService: HuEvaluateEditService,
    public evaluateDialogService: EvaluateDialogService,
    private alertService: AlertService,
    private longTaskService: LongTaskService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute

  ) {
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map((x) =>
      newOrgIds.push(Number(x))
    );
    this.onOrgIdsChange(newOrgIds);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.evaluateDialogService.dialogConfirmed$.pipe(
        filter(x => !!x)
      ).
        subscribe(x => {
          if (!!x?.confirmed) {

            if (this.pendingAction === EnumCoreButtonVNSCode.HEADER_DOWNLOAD) {
              if (this.evaluateDialogService.formType === 1) {
                this.mls.lang$.subscribe(x => {
                  this.lang = x;
                  this.generateTemplateRequest = {
                    exCode: 'HU_EVALUATE',
                    lang: x
                  }
                })
              }
              else {
                this.mls.lang$.subscribe(x => {
                  this.lang = x;
                  this.generateTemplateRequest = {
                    exCode: 'HU_EVALUATE_CONCURRENT',
                    lang: x
                  }
                })
              }
              this.clickGenerateTemplate$.next(new Date().getTime())
            } else if (this.pendingAction === EnumCoreButtonVNSCode.HEADER_UPLOAD) {
              this.fileImport.nativeElement.value = null;
              this.browFile();
            }

          }
        })
    )

    this.subscriptions.push(
      this.clickGenerateTemplate$.pipe(
        map(x => {
          console.log("map", x)
          return x;
        }),
        filter(x => {
          console.log("filter", !!x)
          return !!x
        }),
        switchMap(x => {
          this.longApiRunning = true;
          this.templateFileName = this.generateTemplateRequest?.exCode + "_" + x + ".xlsx"
          return this.corePageListService.generateTemplate(this.generateTemplateRequest)
        })
      ).subscribe(x => {
        this.longApiRunning = false;
        if (x.ok && x.status === 200) {

          if (x.body.statusCode === 400) return

          let downloadLink = document.createElement("a");
          downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
          downloadLink.setAttribute("download", this.templateFileName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
        } else {
          this.alertService.info("Download failed. Please contact your developer team to resolve", noneAutoClosedAlertOptions)
        }
      }))
  }

  browFile(): void {
    this.fileImport.nativeElement.value = null;
    this.fileImport.nativeElement.click();
  }



  inputFile = async (e: any) => {
    const files = e.target.files;
    const file = files[0];
    let fileName = file.name;
    if (this.evaluateDialogService.formType === 1) {
      const blob = new Blob([file]);
      this.mls.lang$.subscribe(x => {
        this.lang = x;
        this.generateTemplateRequest = {
          exCode: 'HU_EVALUATE',
          lang: x
        }
      })
      this.importPreviewPath = 'hu-evaluate-import'
      blobToBase64(blob).then((base64: any) => {

        // Nếu tham số generateTemplateRequest được truyền vào
        // Import sẽ thực thi theo quy trình Core
        if (this.generateTemplateRequest) {
          const importXlsxToDbRequest: IImportXlsxToDbRequest = {
            fileName,
            exCode: this.generateTemplateRequest.exCode,
            base64String: base64
          }
          this.longApiRunning = true;
          this.subscriptions.push(
            this.corePageListService.importXlsxToDb(importXlsxToDbRequest).subscribe(x => {
              const session = Number(this.longTaskService.data$.value?.outerMessage);
              this.longApiRunning = false;
              if (x.ok && x.status === 200) {
                let downloadLink = document.createElement("a");
                downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
                fileName = fileName.split(".xlsx")[0] + "_processed_" + new Date().getTime() + ".xlsx";
                downloadLink.setAttribute("download", fileName);
                document.body.appendChild(downloadLink);
                downloadLink.click();

                const importPreviewOuterParam: IXlsxImportObject = {
                  xlsxSid: this.authService.data$.value?.id!,
                  xlsxExCode: this.generateTemplateRequest.exCode,
                  xlsxSession: session
                }

                if (!!!this.importPreviewPath) {

                  if (isDevMode()) {
                    this.alertService.error("'importPreviewPath' input property was missing!", noneAutoClosedAlertOptions);
                  }

                } else {


                  this.router.navigate(
                    [
                      {
                        outlets: {
                          corePageListAux: [
                            this.importPreviewPath,
                            { listInstance: this.corePageListInstanceNumber },
                          ],
                        },
                      },
                    ],
                    {
                      relativeTo: this.route, state: {
                        session,
                        importPreviewOuterParam
                      }
                    }
                  );

                }
              }
            })
          )

        }

      });
    }
    else {
      const blob = new Blob([file]);
      this.mls.lang$.subscribe(x => {
        this.lang = x;
        this.generateTemplateRequest = {
          exCode: 'HU_EVALUATE_CONCURRENT',
          lang: x
        }
      })
      this.importPreviewPath = 'hu-evaluate-concurrent-import'
      blobToBase64(blob).then((base64: any) => {

        // Nếu tham số generateTemplateRequest được truyền vào
        // Import sẽ thực thi theo quy trình Core
        if (this.generateTemplateRequest) {
          const importXlsxToDbRequest: IImportXlsxToDbRequest = {
            fileName,
            exCode: this.generateTemplateRequest.exCode,
            base64String: base64
          }
          this.longApiRunning = true;
          this.subscriptions.push(
            this.corePageListService.importXlsxToDb(importXlsxToDbRequest).subscribe(x => {
              const session = Number(this.longTaskService.data$.value?.outerMessage);
              this.longApiRunning = false;
              if (x.ok && x.status === 200) {
                let downloadLink = document.createElement("a");
                downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
                fileName = fileName.split(".xlsx")[0] + "_processed_" + new Date().getTime() + ".xlsx";
                downloadLink.setAttribute("download", fileName);
                document.body.appendChild(downloadLink);
                downloadLink.click();

                const importPreviewOuterParam: IXlsxImportObject = {
                  xlsxSid: this.authService.data$.value?.id!,
                  xlsxExCode: this.generateTemplateRequest.exCode,
                  xlsxSession: session
                }

                if (!!!this.importPreviewPath) {

                  if (isDevMode()) {
                    this.alertService.error("'importPreviewPath' input property was missing!", noneAutoClosedAlertOptions);
                  }

                } else {


                  this.router.navigate(
                    [
                      {
                        outlets: {
                          corePageListAux: [
                            this.importPreviewPath,
                            { listInstance: this.corePageListInstanceNumber },
                          ],
                        },
                      },
                    ],
                    {
                      relativeTo: this.route, state: {
                        session,
                        importPreviewOuterParam
                      }
                    }
                  );

                }
              }
            })
          )

        }

      });
    }



  };

  onRowClick(e: any) {
    this.huEvaluateEditService.employeeConcurrentId = e.employeeConcurrentId
    this.huEvaluateEditService.employeeId = e.employeeId

  }
  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_DOWNLOAD:
        this.pendingAction = e.code
        this.evaluateDialogService.createNew(undefined, undefined, undefined, undefined,
          EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATE_CHOOSE_FILE_TYPE, undefined, true, false,)
        break;
      case EnumCoreButtonVNSCode.HEADER_UPLOAD:
        this.pendingAction = e.code
        this.evaluateDialogService.createNew(undefined, undefined, undefined, undefined,
          EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATE_CHOOSE_FILE_TYPE_WANT_IMPORT, undefined,true, false)
        break;

      default:
        break;
    }
  }
  chooseOptionTemplate() {

    return;
  }
  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }
}
