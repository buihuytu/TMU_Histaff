import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorePageHeaderComponent, CorePageListComponent, CoreCompositionComponent, CoreStatusStickerComponent, CoreDropdownComponent, CoreButtonGroupVnsComponent, BaseComponent, EnumCoreButtonVNSCode, ICoreDropdownOption, ICorePageListApiDefinition,ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, EnumCoreTablePipeType, MultiLanguageService, AppService, LayoutService, CorePageListService, CorePageEditService, UrlService, AlertService, DialogService, RoutingService, AuthService, ICoreButtonVNS, alertOptions, ISysMutationLogBeforeAfterRequest, IIdsRequest, IFormatedResponse, TranslatePipe } from 'ngx-histaff-alpha';
import { BehaviorSubject, filter, map } from 'rxjs';
import { TrProgramService } from '../tr-program.service';
import { FormsModule } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-tr-class',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    CorePageHeaderComponent,
    CorePageListComponent,
    CoreCompositionComponent,
    CoreStatusStickerComponent,
    CoreDropdownComponent,
    CoreButtonGroupVnsComponent
  ],
  templateUrl: './tr-class.component.html',
  styleUrl: './tr-class.component.scss'
})
export class TrClassComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy{
  
  /* -------------- COMMON VARIABLE -------------- */
  
  corePageListInstanceNumber!: number;
  pendingAction!: EnumCoreButtonVNSCode;

  selectedIds: any[] = [];
  selectedData: any[] = [];
  

  /* -------------- HEADER -------------- */
  // Label
  labelList = {
    programLabel: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_PROGRAM_CODE,
  }
  // Variable
  shownFrom!: string;
  program!: number;
  
  /* -------------- Drop down list -------------- */
  // Program
  programOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  programGetByIdObject$ = new BehaviorSubject<any>(null);

  /* -------------- Header Button -------------- */
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
  ];

  /* -------------- Core-page-header -------------- */
  headerButtons: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.HEADER_CREATE,
    EnumCoreButtonVNSCode.HEADER_EDIT,
    EnumCoreButtonVNSCode.HEADER_DELETE,
    EnumCoreButtonVNSCode.HEADER_EXPORTEXEL,
  ];

  /* -------------- CORE-PAGE-LIST -------------- */

  title = EnumTranslateKey.UI_COMPONENT_TITLE_TR_CLASS;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_CLASS_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.TR_CLASS_DELETE_IDS,
    toggleActiveIds: api.TR_CLASS_TOGGLE_ACTIVE_IDS,
  };

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  outerParam$ = new BehaviorSubject<any>(null);


  /* -------------- Columns -------------- */
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_LABEL_TR_CLASS_ID,
      field: 'id',
      type: 'number',
      hidden: true,
      align: 'left',
      width: 10,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TR_CLASS_CLASS_NAME, // Tên lớp
      field: 'name',
      type: 'string',
      align: 'center',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TR_CLASS_RATIO,  // Trọng số
      field: 'ratio',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TR_CLASS_TEACHER,  // Giảng viên
      field: 'teacher',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TR_CLASS_START_DATE,   // Từ ngày
      field: 'startDate',
      type: 'date',
      align: 'left',
      width: 250,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TR_CLASS_END_DATE,  // Đến ngày
      field: 'endDate',
      type: 'string',
      align: 'left',
      width: 250,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TR_CLASS_TOTAL_DAY,  // 	Tổng số ngày
      field: 'totalDay',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TR_CLASS_TIME_FROM,  // Từ giờ
      field: 'timeFromStr',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TR_CLASS_TIME_TO,  // Đến giờ
      field: 'timeToStr',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TR_CLASS_TOTAL_TIME,  // Tổng số giờ
      field: 'totalTimeStr',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TR_CLASS_ADDRESS,  // Địa chỉ
      field: 'address',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TR_CLASS_PROVINCE,  // Tỉnh/Thành phố
      field: 'provinceName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TR_CLASS_DISTRICT,  // Quận/Huyện
      field: 'districtName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TR_CLASS_NOTE,  // Ghi chú
      field: 'note',
      type: 'string',
      align: 'left',
      width: 500,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TR_CLASS_EMAIL_CONTENT,  // Nội dung email 
      field: 'emailContent',
      type: 'string',
      align: 'left',
      width: 500,
    },
  ];

  /* -------------- Function -------------- */
  getListProgram(): void{
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

  search(): void {
    console.log("search");
    this.outerParam$.next({
      trProgramId: this.trProgramService.trProgramId$.value,
    })
    
  }

  
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

  onProgramChange(program: number): void {
    this.program = program;
    this.trProgramService.trProgramId$.next(program);
    
  }

  onButtonClick(e: ICoreButtonVNS): void {
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SEARCH) {
      this.search();
    }
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        console.log("HEADER_CREATE", this.corePageListInstanceNumber);
        this.corePageEditService.fromUrl = this.router.url;

        this.router.navigate(
          [
            'tr-class/',
            btoa('0'), { listInstance: this.corePageListInstanceNumber }
          ], 
          { relativeTo: this.route.parent, }
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
                'tr-class/',
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

  onRowDoubleClick(e: any): void {
    console.log(e);
    this.router.navigate(
      [
        'tr-class/',
        {
          outlets: {
            corePageListAux: [btoa('' + e.id), { listInstance: this.corePageListInstanceNumber }],
          },
        }
      ],
      { relativeTo: this.route },
    );
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

  override ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }
}
