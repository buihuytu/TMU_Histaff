import { AfterViewInit, Component, TemplateRef, ViewChild, isDevMode } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CorePageListComponent, CorePageHeaderComponent, CoreStatusStickerComponent, CoreCompositionComponent, BaseComponent, EnumCoreButtonVNSCode, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, MultiLanguageService, AlertService, CorePageListService, DialogService, RoutingService, AuthService, CoreButtonGroupService, AppService, ICorePageListEditRouting, alertOptions, IToggleActiveIdsRequest, IFormatedResponse, noneAutoClosedAlertOptions, ISysMutationLogBeforeAfterRequest, IIdsRequest } from 'ngx-histaff-alpha';
import { filter } from 'rxjs';

@Component({
  selector: 'app-competency-dict',
  standalone: true,
  imports: [
    RouterModule,
    CorePageListComponent,
    CorePageHeaderComponent,
    CoreStatusStickerComponent,
    CoreCompositionComponent,
  ],
  templateUrl: './competency-dict.component.html',
  styleUrl: './competency-dict.component.scss'
})
export class CompetencyDictComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  title = EnumTranslateKey.UI_COMPONENT_TRAINING_CENTER;

  selectedData!: any;
  selectedIds!: any;
  corePageListInstanceNumber!: number;
  pendingAction!: EnumCoreButtonVNSCode;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.COMPETENCY_DICTIONARY_QUERY_LIST,
  };

  listInstance!: number;

  crud: ICorePageListCRUD = {
    deleteIds: api.COMPETENCY_DICTIONARY_DELETE_IDS,
    toggleActiveIds: api.COMPETENCY_DICTIONARY_TOGGLE_ACTIVE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_ID,
      field: 'id',
      type: 'number',
      hidden: true,
      align: 'left',
      width: 10,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_IS_ACTIVE,
      field: 'status',
      type: 'string',
      align: 'left',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_GROUP,
      field: 'competencyGroupName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_NAME_COMPETENCY,
      field: 'competencyName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_NAME_ASPECT,
      field: 'competencyAspectName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_LEVEL,
      field: 'levelNumberName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_DESCRIBE_LEVEL,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250,
    },
  ];
  constructor(
    public override mls: MultiLanguageService,
    private router: Router, private route: ActivatedRoute,
    private alertService: AlertService,
    private corePageListService: CorePageListService,
    private dialogService: DialogService,
    private routingService: RoutingService,
    private authService: AuthService,
    private coreButtonGroupService: CoreButtonGroupService,
    private appService: AppService,
  ) {
    super(mls);
    this.corePageListInstanceNumber = new Date().getTime();
  }

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };

  corePageHeaderButtonClick(e: any) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        this.router.navigate(
          [
            {
              outlets: {
                dictionary: [btoa('0'), { listInstance: this.corePageListInstanceNumber }],
              },
            },
          ],
          { relativeTo: this.route.parent },
        );
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        if (this.selectedIds.length > 1) {
          this.alertService.error(this.mls.trans('SELECT_ONLY_ONE_RECORD_TO_EDIT'), alertOptions);
        }
        else {
          if (this.selectedIds.length == 1) {
            this.router.navigate(
              [
                {
                  outlets: {
                    dictionary: [btoa(this.selectedIds[0]), { listInstance: this.corePageListInstanceNumber }],
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
                      if (filter.length) {
                        filter[0].reloadFlag$.next(!filter[0].reloadFlag$.value)
                      }
                      this.selectedIds = [];
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
                      if (filter.length) {
                        filter[0].reloadFlag$.next(!filter[0].reloadFlag$.value)
                      }
                      this.selectedIds = [];
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
    return;
  }
  override ngOnInit() {
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
                      if (filter.length) {
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
  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }

  onInstanceCreated(e: number) {
    this.corePageListInstanceNumber = e;
  }
  selectedDataChange(e: any) {
    this.selectedData = e;
  }
  selectedIdsChange(e: any) {
    this.selectedIds = e;
  }
  onRowDoubleClick(e: any): void {
    console.log(e)
    this.router.navigate(
      [
        {
          outlets: {
            dictionary: [btoa(e.id), { listInstance: this.corePageListInstanceNumber }],
          },
        },
      ],
      { relativeTo: this.route.parent },
    );
    return;
  }
}
