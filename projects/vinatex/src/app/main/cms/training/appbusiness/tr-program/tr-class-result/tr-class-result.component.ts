import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CorePageHeaderComponent, CorePageListComponent, CoreCompositionComponent, CoreStatusStickerComponent, CoreDropdownComponent, CoreButtonGroupVnsComponent, BaseComponent, ICorePageListApiDefinition,ICorePageListCRUD, EnumCoreButtonVNSCode, ICoreDropdownOption, ICoreTableColumnItem, ICorePageListEditRouting, MultiLanguageService, AppService, LayoutService, CorePageListService, CorePageEditService, UrlService, AlertService, DialogService, RoutingService, AuthService, ICoreButtonVNS, alertOptions, TranslatePipe } from 'ngx-histaff-alpha';
import { BehaviorSubject, map } from 'rxjs';
import { TrProgramService } from '../tr-program.service';
import { FormsModule } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslatePipe,
    CorePageHeaderComponent,
    CorePageListComponent,
    CoreCompositionComponent,
    CoreStatusStickerComponent,
    CoreDropdownComponent,
    CoreButtonGroupVnsComponent
  ],
    selector: 'app-tr-class-result',
    templateUrl: './tr-class-result.component.html',
    styleUrl: './tr-class-result.component.scss',
})
export class TrClassResultComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_RESULT;
  nullTitle = EnumTranslateKey.NULL;
  corePageListInstanceNumber!: number;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_PROGRAM_RESULT_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.TR_PROGRAM_RESULT_DELETE_IDS,
    toggleActiveIds: api.TR_PROGRAM_RESULT_TOGGLE_ACTIVE_IDS,
  };
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
  // Dialog
  pendingAction!: EnumCoreButtonVNSCode;
  shownFrom!: string;

  // Label
  labelList = {
    programLabel: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_PROGRAM_CODE,
  }

  /* Drop down list */
  // Year
  programOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  programGetByIdObject$ = new BehaviorSubject<any>(null);

  program!: number;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30,
    },
    // {
    //   caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REIMURSEMENT_IS_LOCK,//khoa
    //   field: 'isReserves',
    //   type: 'string',
    //   align: 'left',
    //   width: 100,
    // },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_STUDENT_CODE,//ma hv
      field: 'empCode',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_EMPLOYEE_NAME,//ho va ten
      field: 'empName',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_ORG_NAME,//phong ban
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_POSITION_NAME,//chuc danh
      field: 'posName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_MARK,//diem so
      field: 'remark',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MODULE_NOTE,//ghi chu
      field: 'note',
      type: 'string',
      align: 'left',
      width: 80,
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
  }
  ngAfterViewInit(): void {
    this.getListProgram();
    this.trProgramService.trProgramId$.subscribe(x => {
      this.program = x;
    })
    this.outerParam$.next({
      trProgramId: this.trProgramService.trProgramId$.value,
    })
  }
  override ngOnDestroy(): void {
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
    if (this.program != null) {
      this.outerParam$.next({
        trProgramId: this.program
      });
    }
  }

  onRowDoubleClick(e: any): void {
    this.router.navigate(
      [
        {
          outlets: {
            programResult: [btoa('' + e.id), { listInstance: this.corePageListInstanceNumber }],
          },
        }
      ],
      { relativeTo: this.route.parent },
    );
  }
  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        console.log("HEADER_CREATE", this.route);
        this.corePageEditService.fromUrl = this.router.url;

        this.router.navigate(
          [
            {
              outlets: {
                programResult: [btoa('0'), { listInstance: this.corePageListInstanceNumber }],
              },
            },
          ],
          { relativeTo: this.route.parent },
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
                    programResult: [btoa('' + this.selectedIds[0]), { listInstance: this.corePageListInstanceNumber }],
                  },
                }
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
}
