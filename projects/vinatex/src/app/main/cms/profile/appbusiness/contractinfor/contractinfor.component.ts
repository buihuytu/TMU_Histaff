import {AfterViewInit,Component,Input,TemplateRef,ViewChild,} from "@angular/core";
import { ContractInforService } from "./contractinfor.service";
import { BehaviorSubject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, IFilterOperator, EnumFilterOperator, IInOperator, ISortItem, EnumSortDirection, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, IGenerateTemplateRequest, MultiLanguageService, RandomAvatarService, OrganizationService, AppService, CorePageListService, AlertService, IAlertOptions, ICoreButtonVNS, EnumCoreButtonVNSCode, alertOptions, ICoreButtonDropdownOption, CoreButtonGroupService } from "ngx-histaff-alpha";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "cms-profile-contractinfor",
  templateUrl: "./contractinfor.component.html",
  styleUrls: ["./contractinfor.component.scss"],
})
export class ContractInforComponent extends BaseComponent implements AfterViewInit {
  loading!: boolean;

  @Input() hideHeader!: boolean;

  @ViewChild('sticker') sticker!: TemplateRef<any>;
  /* START: Local filter params */
  orgIds!: number[];
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */
  datePeriodComparisonFor: string = 'startDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STARTDATE_FILTER;
  statusInclusionFor: string = 'workStatusId';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_CORE_PARAMS_EMPLOYEE_STATUS_IN;
  statusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;

  id: any;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_CONTRACT
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
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_CONTRACT_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_CONTRACT_DELETE_IDS,
    toggleApproveIds: api.HU_CONTRACT_CHANGESTATUSAPPROVE
  }

  avatarTemplate!: TemplateRef<any>;
  dataButtonPrints : ICoreButtonDropdownOption[] = []

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 10,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STATUSNAME,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EMPLOYEECODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 70,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EMPLOYEENAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_ORGNAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_CONTRACTNO,
      field: 'contractNo',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_CONTRACTTYPENAME,
      field: 'typeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STARTDATE,
      field: 'startDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EXPIREDATE,
      field: 'expireDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
    },

    // chắc là viết code ở đây
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_LIQUIDATION_DATE,
      field: 'liquidationDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_LIQUIDATION_REASON,
      field: 'liquidationReason',
      type: 'string',
      align: 'left',
      width: 200,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_SIGNDATE,
      field: 'signDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_SIGNERNAME,
      field: 'signerName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_SIGNERPOSITION,
      field: 'signerPosition',
      type: 'string',
      align: 'left',
      width: 250,
    },

  ]

  defaultAvatar!: string;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-list */
  generateTemplateRequest!: IGenerateTemplateRequest;
  constructor(
    public override mls: MultiLanguageService,
    private ras: RandomAvatarService,
    private router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private http: HttpClient,
    private appService: AppService,
    private corePageListService: CorePageListService,
    private contractInforService: ContractInforService,
    private alertService: AlertService,
    private coreButtonGroupService : CoreButtonGroupService
  ) {
    super(mls);
    this.defaultAvatar = ras.get();
    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
    this.corePageListInstanceNumber = new Date().getTime();
  }
  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: 'HU_CONTRACT',
        lang: x
      }
    })
  }

  ngAfterViewInit(): void {
    const stickerFilter = this.columns.filter(c => c.field === 'statusName');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;

    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "CONTRACT_INFORMATION_PRINTING_FORM").subscribe(x => {
        let vals = x.body.innerBody
        vals.map(x => {
          x.codeName = x.code + '-'+ x.name
        })
        vals.forEach(element => {
          let dataButtonPrint : ICoreButtonDropdownOption = {
            childCaptionCode : element.codeName,
            childIconWrapperClass : '',
            childCode: element.codeName,
            childIconClass: ''
          }
          this.dataButtonPrints.push(dataButtonPrint)
        });

        this.coreButtonGroupService.headerButtonPrintDropdownOptions$.next(this.dataButtonPrints)
      })
    )
  }

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds
      }
    ]
  }

  onRowClick(e: any) {
    this.id = e.id
  }

  selectedIds: number[] = [];
  
  listInstance!: number;
  
  onInstanceCreated(event: number) {
    this.listInstance = event;
  }

  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };

  employeeId!: number;

  customizeSelectedIdsChange(e: number[]): void {
    this.selectedIds = e;

    this.contractInforService.changeListEmployeeSelected(e);
    this.contractInforService.currentListEmployeeSelected.subscribe(id => this.employeeId = id[0]);
  }

  corePageListInstanceNumber!: number;

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    let filename = '';

    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_LIQUIDATE_CONTRACT:
        if (this.selectedIds.length != 0) {
          this.router.navigate(
            [
              {
                outlets: {
                  corePageListAux: [
                    btoa('0'),
                    { listInstance: this.corePageListInstanceNumber },
                  ],
                },
              },
            ],
            { relativeTo: this.route }
          );
        }
        else {
          // bắn ra thông báo chưa chọn bản ghi
          this.alertService.error(this.mls.trans('NO_SELECTED_ID_TO_DELETE'), this.alertOptions);
        }

        break;

      case EnumCoreButtonVNSCode.HEADER_PRINT:
        if (this.selectedIds.length > 1) {
          this.alertService.warn(this.mls.trans('PRINT_ONE_RECORD'), alertOptions);
        }
        else {
          this.http.get(api.HU_CONTRACT_GET_FILE_NAME + this.selectedIds[0].toString()).subscribe((response: any) => {
            filename = response.innerBody;
          });

          this.loading = true;

          this.http
            .get(api.HU_CONTRACT_GET_PROBATION_CONTRACT, {
              responseType: 'blob',
              params: { id: this.selectedIds[0].toString() }
            })
            .subscribe((response: Blob) => {
              if (response.type === 'application/octet-stream') {
                const downloadUrl = URL.createObjectURL(response);
                
                const link = document.createElement('a');
                
                link.href = downloadUrl;
                
                // link.setAttribute('download', '2C_BNV_2008_' + filename + '.doc');
                link.setAttribute('download', filename + '.doc');
                
                document.body.appendChild(link);
                
                link.click();
                
                document.body.removeChild(link);
                
                URL.revokeObjectURL(downloadUrl);
              }
              else {
                const reader = new FileReader();
                
                reader.onload = () => {
                  const jsonBody = reader.result as string;
                  
                  const data = JSON.parse(jsonBody);
                  
                  if (data.statusCode == 200) {
                    this.alertService.success(data.messageCode, alertOptions);
                  }
                  else {
                    this.alertService.error(data.messageCode, alertOptions);
                  }
                };

                reader.readAsText(response);
              }

              this.loading = false;
            });
        }
        break;

        case EnumCoreButtonVNSCode.HEADER_DROPDOWN_PRINT:
          if (this.selectedIds.length > 1) {
            this.alertService.warn(this.mls.trans('PRINT_ONE_RECORD'), alertOptions);
            return;
          } else if(this.selectedIds.length == 0){
            this.alertService.warn(this.mls.trans(EnumTranslateKey.REPORT_SELECTED_NOT_NULL), alertOptions);
            return;
          }
          else {
            const fileName = e.childCodeClicked;
            this.loading = true;
            const request = {
              fileName : fileName,
              id : this.selectedIds[0],
              viewName : "CONTRACT"
            }
            this.appService
              .blobPost(api.EXPORT_WORD_BY_TEMPLATE,request)
              .subscribe((x: any) => {
                let downloadLink = document.createElement("a");
                downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
                downloadLink.setAttribute("download", fileName +'.doc');
                document.body.appendChild(downloadLink);
                downloadLink.click();
                this.loading = false;
              });
          }
          break;

      default:
        break;
    }
  }

}
