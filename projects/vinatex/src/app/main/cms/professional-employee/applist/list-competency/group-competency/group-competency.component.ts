import { Component, ViewChild, TemplateRef, isDevMode } from "@angular/core";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageListComponent, CoreStatusStickerComponent, CorePageHeaderComponent, CoreCompositionComponent, BaseComponent, EnumCoreButtonVNSCode, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, MultiLanguageService, AlertService, DialogService, RoutingService, AuthService, CorePageListService, CorePageEditService, AppService, ICorePageListEditRouting, ICoreButtonVNS, alertOptions, IToggleActiveIdsRequest, IFormatedResponse, noneAutoClosedAlertOptions, ISysMutationLogBeforeAfterRequest, IIdsRequest } from "ngx-histaff-alpha";
import { BehaviorSubject, filter } from "rxjs";

@Component({
  selector: 'app-group-competency',
  standalone: true,
  imports: [
    RouterModule,
    CorePageListComponent,
    CoreStatusStickerComponent,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    
  ],
  templateUrl: './group-competency.component.html',
  styleUrl: './group-competency.component.scss'
})
export class GroupCompetencyComponent extends BaseComponent{
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  corePageListInstanceNumber!: number;
  pendingAction!: EnumCoreButtonVNSCode;

  selectedIds: any[] = [];
  selectedData: any[] = [];
  
  forceReloadingFlag$ = new BehaviorSubject<boolean>(false);
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMPETENCY_GROUP;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_COMPETENCY_GROUP_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_COMPETENCY_GROUP_DELETE_IDS,
    toggleActiveIds: api.HU_COMPETENCY_GROUP_TOGGLE_ACTIVE_IDS,
  }

  /* -------------- Core-page-header -------------- */
  headerButtons: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.HEADER_CREATE,
    EnumCoreButtonVNSCode.HEADER_EDIT,
    EnumCoreButtonVNSCode.HEADER_DELETE,
    EnumCoreButtonVNSCode.HEADER_EXPORTEXEL,
  ];

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COMPETENCY_GROUP_IS_ACTIVE,
      field:  'status',
      type: 'string',
      align: 'center',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COMPETENCY_GROUP_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 500
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COMPETENCY_GROUP_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 500,
    },
  ]

  
  constructor(
    public override mls: MultiLanguageService,
    private router: Router, 
    private route: ActivatedRoute,
    private alertService: AlertService,
    private dialogService: DialogService,
    private routingService: RoutingService,
    private authService: AuthService,
    private corePageListService: CorePageListService,
    private corePageEditService: CorePageEditService,
    private appService: AppService,
  ) {
      super(mls);
      this.corePageListInstanceNumber = new Date().getTime();

    }
    
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }

  onInstanceCreated(e: any){
    this.corePageListInstanceNumber = e;
  }

  onSelectedDataChange(e: any[]) {
    this.selectedData = e;
    console.log(this.selectedData);
  }

  onSelectedIdsChange(e: string[] | number[]) {
    this.selectedIds = e;
    console.log(this.selectedIds);
  }

  onRowDoubleClick(e: any): void {
    console.log(e);
    this.router.navigate(
      [
        {
          outlets: {
            group: [btoa('' + e.id), { listInstance: this.corePageListInstanceNumber }],
          },
        },
      ],
      { relativeTo: this.route.parent },
    );
  }

  corePageHeaderButtonClick(e: ICoreButtonVNS) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        this.router.navigate(
          [
            {
              outlets: {
                group: [btoa('0'), { listInstance: this.corePageListInstanceNumber }],
              },
            },
          ],
          { relativeTo: this.route.parent },
        );
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        console.log("HEADER_EDIT", this.selectedIds.length);
        if (this.selectedIds.length > 1) {
          this.alertService.error(this.mls.trans('SELECT_ONLY_ONE_RECORD_TO_EDIT'), alertOptions);
        }
        else{
          if(this.selectedIds.length == 1){
            this.router.navigate(
              [
                {
                  outlets: {
                    group: [btoa('' + this.selectedIds[0]), { listInstance: this.corePageListInstanceNumber }],
                  },
                },
              ],
              { relativeTo: this.route.parent },
            );
          } else {
            this.alertService.error(this.mls.trans('NO_SELECTED_ID_TO_EDIT'), alertOptions);
          }
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_DELETE:
        console.log("HEADER_DELETE");
        this.pendingAction = EnumCoreButtonVNSCode.HEADER_DELETE
        this.dialogService.title$.next(EnumTranslateKey.UI_CORE_DIALOG_SERVICE_CONFIRMATION)
        this.dialogService.okButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CONFIRM)
        this.dialogService.cancelButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CANCEL)
        this.dialogService.showCancelOnly$.next(false);
        this.dialogService.busy = true;
        this.dialogService.body$.next(EnumTranslateKey.UI_CORE_DIALOG_SERVICE_ARE_YOU_SURE_TO_DELETE);
        let listDeleteIds: any[] = [];
        this.selectedData.forEach(x => {
          listDeleteIds.push(x[this.columns[2].field])
        });
        this.dialogService.informationLines$.next(listDeleteIds)
        this.dialogService.showConfirmDialog$.next(true);
        break;
      case EnumCoreButtonVNSCode.HEADER_ACTIVATE:
        console.log("HEADER_ACTIVATE");
        if (!!this.selectedIds.length) {
          if (
            typeof this.selectedIds[0] !== 'number'
          ) {
            this.alertService.info(
              this.mls.trans(
                EnumTranslateKey.CORE_PAGE_LIST_ACTIVE_IDS_METHOD_SUPORTS_ONLY_NUMBER_TYPE
              )
            );
            break;
          }
        } else {
          this.alertService.error(
            this.mls.trans('NO_SELECTED_ID_TO_ACTIVATE'),
            alertOptions
          );
          break;
        }
        const request: IToggleActiveIdsRequest = {
          valueToBind: true,
          ids: this.selectedIds as number[],
        };
        const confirmActive = window.confirm(
          this.mls.trans('common.confirm.delete.active.prefix') +
          JSON.stringify(this.selectedIds) +
          '?'
        );
        if (confirmActive) {
          if (!!this.crud.toggleActiveIds) {
            this.subscriptions.push(
              this.appService.post(this.crud.toggleActiveIds, request)
                .subscribe((x) => {
                  if (x.ok && x.status === 200) {
                    const body: IFormatedResponse = x.body;
                    if (body.statusCode === 200 || x.body.statusCode == '200') {
                      const filter = this.corePageListService.instances.filter(x => x.instanceNumber === this.corePageListInstanceNumber)
                      if(filter.length){
                        filter[0].reloadFlag$.next(!filter[0].reloadFlag$.value)
                      }
                      request.ids = [];
                    }
                  }
                })
            );
          } else {
            if (isDevMode()) {
              this.alertService.warn(this.mls.trans(EnumTranslateKey.NO_API_END_POINT_PROVIDED_FOR_ACTIVATION), noneAutoClosedAlertOptions)
            }
          }
        }
        break;
        case EnumCoreButtonVNSCode.HEADER_INACTIVATE:

        if (!!this.selectedIds.length) {
          if (
            typeof this.selectedIds[0] !== 'number'
          ) {
            this.alertService.info(
              this.mls.trans(
                EnumTranslateKey.CORE_PAGE_LIST_INACTIVE_IDS_METHOD_SUPORTS_ONLY_NUMBER_TYPE
              )
            );
            break;
          }
        } else {
          this.alertService.error(
            this.mls.trans('NO_SELECTED_ID_TO_INACTIVATE'),
            alertOptions
          );
          break;
        }
        const payload: IToggleActiveIdsRequest = {
          valueToBind: false,
          ids: this.selectedIds as number[],
        };
        const confirmInactive = window.confirm(
          this.mls.trans('common.confirm.delete.inactive.prefix') +
          JSON.stringify(this.selectedIds) +
          '?'
        );
        if (confirmInactive) {
          if (!!this.crud.toggleActiveIds) {
            this.subscriptions.push(
              this.appService.post(this.crud.toggleActiveIds, payload)
                .subscribe((x) => {
                  if (x.ok && x.status === 200) {
                    const body: IFormatedResponse = x.body;
                    if (body.statusCode === 200 || x.body.statusCode == '200') {
                      const filter = this.corePageListService.instances.filter(x => x.instanceNumber === this.corePageListInstanceNumber)
                      if(filter.length){
                        filter[0].reloadFlag$.next(!filter[0].reloadFlag$.value)
                      }
                      payload.ids = [];
                    }
                  }
                })
            );
          } else {
            if (isDevMode()) {
              this.alertService.warn(this.mls.trans(EnumTranslateKey.NO_API_END_POINT_PROVIDED_FOR_ACTIVATION), noneAutoClosedAlertOptions)
            }
          }
        }
        break;
      default:
        break;
    }
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

  override ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }
}
