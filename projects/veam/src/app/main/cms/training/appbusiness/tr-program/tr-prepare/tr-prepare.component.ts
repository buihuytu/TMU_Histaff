import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorePageHeaderComponent, CorePageListComponent, CoreCompositionComponent, CoreStatusStickerComponent, CoreDropdownComponent, CoreButtonGroupVnsComponent, BaseComponent, ICorePageListApiDefinition,ICorePageListCRUD, EnumCoreButtonVNSCode, ICoreDropdownOption, ICoreTableColumnItem, ICorePageListEditRouting, MultiLanguageService, AppService, LayoutService, CorePageListService, CorePageEditService, UrlService, AlertService, DialogService, RoutingService, AuthService, ISysMutationLogBeforeAfterRequest, IIdsRequest, IFormatedResponse, ICoreButtonVNS, alertOptions, TranslatePipe } from 'ngx-histaff-alpha';
import { BehaviorSubject, filter, map } from 'rxjs';
import { TrProgramService } from '../tr-program.service';
import { FormsModule } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';


@Component({
  selector: 'app-tr-prepare',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TranslatePipe,
    CorePageHeaderComponent,
    CorePageListComponent,
    CoreCompositionComponent,
    CoreStatusStickerComponent,
    CoreDropdownComponent,
    CoreButtonGroupVnsComponent
  ],
  templateUrl: './tr-prepare.component.html',
  styleUrl: './tr-prepare.component.scss'
})
export class TrPrepareComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PREPARE;
  corePageListInstanceNumber!: number;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_PREPARE_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.TR_PREPARE_DELETE_IDS,
    toggleActiveIds: api.TR_PREPARE_TOGGLE_ACTIVE_IDS,
  };

  // Dialog
  pendingAction!: EnumCoreButtonVNSCode;
  shownFrom!: string;

  // Button
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
  ];

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
  }

  /* Drop down list */
  // Program
  programOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  programGetByIdObject$ = new BehaviorSubject<any>(null);

  program!: number;

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
      caption: EnumTranslateKey.UI_LABEL_TR_PREPARE_CODE_PREPARE_NAME,
      field: 'trListPrepareName',
      type: 'string',
      align: 'center',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TR_PREPARE_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TR_PREPARE_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 500,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };

  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService,
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
    this.shownFrom = "name";

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
                      if (filter.length) {
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
    setTimeout(() => {
      this.getListProgram();
  
      this.trProgramService.trProgramId$.subscribe(x => {
        this.program = x;
      })
  
      this.outerParam$.next({
        trProgramId: this.trProgramService.trProgramId$.value,
      })
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

  onInstanceCreated(e: any) {
    this.corePageListInstanceNumber = e;
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        console.log("HEADER_CREATE", this.corePageListInstanceNumber);
        this.corePageEditService.fromUrl = this.router.url;

        this.router.navigate(
          [
            'tr-prepare/',
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
                'tr-prepare/',
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

  getListProgram(): void {
    this.subscriptions.push(
      this.trProgramService
        .getListProgram()
        .pipe(
          map((x: any) => {
            const options: { value: number; text: string; code: string }[] = [];
            options.push({
              value: Number(),
              text: '',
              code: ''
            })
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
                code: g.code,
              });
            });
            return options;
          })
        )
        .subscribe((response) => {
          this.programOptions$.next(response);
        })
    );
  }

  onProgramChange(program: number): void {
    this.program = program;
    this.trProgramService.trProgramId$.next(program);

  }

  onButtonClick(e: ICoreButtonVNS): void {
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SEARCH) {
      this.search();
    }
  }

  onRowDoubleClick(e: any): void {
    this.router.navigate(
      [
        'tr-prepare/',
        {
          outlets: {
            corePageListAux: [btoa('' + e.id), { listInstance: this.corePageListInstanceNumber }],
          },
        }
      ],
      { relativeTo: this.route },
    );
  }

  search(): void {
    console.log("search");
    this.outerParam$.next({
      trProgramId: this.trProgramService.trProgramId$.value,
    })
  }

  override ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }
}
