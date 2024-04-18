import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorePageHeaderComponent, CorePageListComponent, CoreCompositionComponent, CoreStatusStickerComponent, BaseComponent, ICorePageListApiDefinition,ICorePageListCRUD, EnumCoreButtonVNSCode, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, LayoutService, CorePageListService, CorePageEditService, UrlService, AlertService, DialogService, RoutingService, AuthService, ISysMutationLogBeforeAfterRequest, IIdsRequest, IFormatedResponse, ICoreButtonVNS, alertOptions, TranslatePipe } from 'ngx-histaff-alpha';
import { BehaviorSubject, filter } from 'rxjs';
import { TrProgramService } from '../tr-program.service';
import { FormsModule } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-tr-program-commit',
  standalone: true,
  imports: [
    CommonModule,
    CorePageHeaderComponent,
    CorePageListComponent,
    CoreCompositionComponent,
    CoreStatusStickerComponent,
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './tr-program-commit.component.html',
  styleUrl: './tr-program-commit.component.scss'
})

export class TrProgramCommitComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_IS_COMMIT_TRAIN;
  nullTitle = EnumTranslateKey.NULL;
  corePageListInstanceNumber!: number;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_PROGRAM_COMMIT_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.TR_PROGRAM_COMMIT_DELETE_IDS
  };

  // Dialog
  pendingAction!: EnumCoreButtonVNSCode;


  headerButtons: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.HEADER_CREATE,
    EnumCoreButtonVNSCode.HEADER_EDIT,
    EnumCoreButtonVNSCode.HEADER_DELETE,
    EnumCoreButtonVNSCode.HEADER_EXPORTEXEL,
  ];

  outerParam$ = new BehaviorSubject<any>(null);

  selectedIds: any[] = [];
  selectedData: any[] = [];

  // Label
  labelList = {
    programLabel: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_PROGRAM_CODE,
    courseLabel: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_COURSE_NAME,
  }

  programCode!: string;
  courseName!: string;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_LABEL_TR_PREPARE_ID,
      field: 'id',
      type: 'number',
      hidden: true,
      align: 'left',
      width: 10,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_STUDENT_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_ORG_ID,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_COMPENSATION_CALCULATION,
      field: 'calculateReimbursement',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMITMENT_NUMBER,
      field: 'commitNo',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SIGN_DATE,
      field: 'signDate',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_COSTS,
      field: 'trainingCosts',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMITTED_AMOUNT,
      field: 'moneyCommit',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_COMMITMENT_TIME,
      field: 'timeCommit',
      type: 'string',
      align: 'left',
      width: 190,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_FROM_DATE,
      field: 'dateFrom',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_TO_DATE,
      field: 'dateTo',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_NUM_COMMITMENT,
      field: 'dayQuantity',
      type: 'string',
      align: 'left',
      width: 150,
    }
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };

  constructor(
    public override mls: MultiLanguageService,
    private layoutService: LayoutService,
    private corePageListService: CorePageListService,
    private corePageEditService: CorePageEditService,
    private router: Router,
    private route: ActivatedRoute,
    private urlService: UrlService,
    private alertService: AlertService,
    private trProgramService: TrProgramService,
    private dialogService: DialogService,
    private routingService: RoutingService,
    private authService: AuthService,
  ) {
    super(mls);
    this.corePageListInstanceNumber = new Date().getTime();

  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

    this.subscriptions.push( // outer-push
    this.dialogService.dialogConfirmed$.pipe(
      filter(i => !!!this.dialogService.busy && !!i?.confirmed)
    ).subscribe(() => {
      this.dialogService.resetService();
      switch (this.pendingAction) {
        case EnumCoreButtonVNSCode.HEADER_DELETE:
          const sysMutationLogBeforeAfterRequest: ISysMutationLogBeforeAfterRequest = {
            sysFunctionCode: this.routingService.currentFunction$.value?.code!,
            sysActionCode: EnumCoreButtonVNSCode.HEADER_DELETE,
            before: JSON.stringify(this.selectedData),
            after: '""',
            username: this.authService.data$.value?.userName!
          }

          const request: IIdsRequest = {
            ids: this.selectedIds as number[],
            sysMutationLogBeforeAfterRequest
          };

          this.subscriptions.push(
            this.corePageListService
              .deleteIds(request, this.crud.deleteIds!)
              .subscribe((x) => {
                if (x.ok && x.status === 200) {
                  const body: IFormatedResponse = x.body;
                  if (body.statusCode === 200 || x.body.statusCode == '200') {
                    const filter = this.corePageListService.instances.filter(x => x.instanceNumber === this.corePageListInstanceNumber)
                    if(filter.length){
                      filter[0].reloadFlag$.next(!filter[0].reloadFlag$.value)
                    }
                    console.log(123213);
                    request.ids = [];
                  } else if (body.statusCode === 400) {
                  }
                }
              })
          );
          break;
        default:
          break;
      }
    }))
  }

  ngAfterViewInit(): void {
    this.outerParam$.next({
      trProgramId: this.trProgramService.trProgramId$.value,
    })
  }
  
  onSelectedDataChange(e: any[]) {
    this.selectedData = e;
    console.log(this.selectedData);
  }

  onSelectedIdsChange(e: string[] | number[]) {
    this.selectedIds = e;
    console.log(this.selectedIds);
  }

  onInstanceCreated(e: any){
    this.corePageListInstanceNumber = e;
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        this.corePageEditService.fromUrl = this.router.url;

        this.router.navigate(
          [
            {
              outlets: {
                corePageListAux: [btoa('0'), { listInstance: this.corePageListInstanceNumber }],
              },
            },
          ],
          { relativeTo: this.route },
        );
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        console.log("HEADER_EDIT");
        if (this.selectedIds.length > 1) {
          this.alertService.error(this.mls.trans('SELECT_ONLY_ONE_RECORD_TO_EDIT'), alertOptions);
        }
        else {
          if (this.selectedIds.length == 1) {
            this.router.navigate(
              [
                {
                  outlets: {
                    corePageListAux: [btoa('' + this.selectedIds[0]), { listInstance: this.corePageListInstanceNumber }],
                  },
                }
              ],
              { relativeTo: this.route },
            );
          } else {
            this.alertService.error(this.mls.trans('NO_SELECTED_ID_TO_EDIT'), alertOptions);
          }

        }
        break;
      case EnumCoreButtonVNSCode.HEADER_DELETE:
        this.pendingAction = EnumCoreButtonVNSCode.HEADER_DELETE
        this.dialogService.title$.next(EnumTranslateKey.UI_CORE_DIALOG_SERVICE_CONFIRMATION)
        this.dialogService.okButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CONFIRM)
        this.dialogService.cancelButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CANCEL)
        this.dialogService.showCancelOnly$.next(false);
        this.dialogService.busy = true;
        this.dialogService.body$.next(EnumTranslateKey.UI_CORE_DIALOG_SERVICE_ARE_YOU_SURE_TO_DELETE);
        let listDeleteIds: any[] = [];
        this.selectedData.forEach(x => {
          listDeleteIds.push(x[this.columns[1].field])
        });
        this.dialogService.informationLines$.next(listDeleteIds)
        this.dialogService.showConfirmDialog$.next(true);
        console.log("HEADER_DELETE");
        break;
      default:
        break;
    }
  }

  onCancel(): void {
    console.log(this.urlService.previousRouteUrl$.value);
    // if (!!this.urlService.previousRouteUrl$.value.length) {
    //   this.router.navigateByUrl(this.urlService.previousRouteUrl$.value);
    // } else {
    //   this.router.navigate(['../'], { relativeTo: this.route });
    // }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}