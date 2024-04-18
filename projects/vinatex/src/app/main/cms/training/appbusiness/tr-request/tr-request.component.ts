import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, IFilterOperator, EnumFilterOperator, IInOperator, ICoreChecklistOption, ICoreDropdownOption, EnumCoreButtonVNSCode, ICorePageListApiDefinition,ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, RandomAvatarService, OrganizationService, AppService, IFormatedResponse, ICoreButtonVNS, CorePageListComponent, CorePageHeaderComponent, CoreCompositionComponent, CoreOrgTreeComponent, CoreCheckboxComponent, CoreStatusStickerComponent, CoreButtonGroupVnsComponent, CoreDropdownComponent, CoreChecklistComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-tr-request',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    CorePageListComponent,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreOrgTreeComponent,
    CoreCheckboxComponent,
    CoreStatusStickerComponent,
    CoreButtonGroupVnsComponent,
    CoreDropdownComponent,
    CoreChecklistComponent,
  ],
  templateUrl: './tr-request.component.html',
  styleUrl: './tr-request.component.scss'
})
export class TrRequestComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  @ViewChild('trCommit') trCommit!: TemplateRef<any>;
  @ViewChild('certificate') certificate!: TemplateRef<any>;

  @Input() hideHeader!: boolean;

  /* START: Local filter params */
  orgIds!: number[];
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  title = EnumTranslateKey.UI_COMPONENT_TITLE_TR_REQUEST
  outerParam$ = new BehaviorSubject<any>(null);
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL
    }
  ]
  outerInOperators: IInOperator[] = [];

  // Label
  labelList = {
    year: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_YEAR,
    status: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_STATUS,
  }

  shownFrom!: string;

  checklistStatusGetByIdObject$ = new BehaviorSubject<any>(null);
  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([
    {
      value: 993,
      text: 'Chờ phê duyệt',
      checked: false,
    },
    {
      value: 994,
      text: 'Phê duyệt',
      checked: false,
    },
  ]);

  // Drop down list
  yearPeridOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  yearPeriodGetByIdObject$ = new BehaviorSubject<any>(null);

  // Search
  year: number = (new Date()).getFullYear();
  statuses!: number[];
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
  ];

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_REQUEST_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.TR_REQUEST_DELETE_IDS,
    toggleActiveIds: api.TR_REQUEST_TOGGLE_ACTIVE_IDS,
  }

  checkboxTemplate!: TemplateRef<any>;
  avatarTemplate!: TemplateRef<any>;

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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_STATUS, // Trạng thái
      field: 'status',
      type: 'string',
      align: 'left',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_CODE, // MÃ YCĐT
      field: 'requestCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_REQUEST_SENDER_NAME, // NGƯỜI YÊU CẦU
      field: 'senderName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_REQUEST_SENDER_POSITION,  // CHỨC DANH NGƯỜI YÊU CẦU
      field: 'senderPosition',
      type: 'string',
      align: 'left',
      width: 300
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_REQUEST_SENDER_EMAIL, // EMAIL NGƯỜI GỬI YÊU CẦU
      field: 'senderEmail',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_REQUEST_SENDER_PHONE_NUMBER, // ĐIỆN THOẠI NGƯỜI GỬI YÊU CẦU
      field: 'senderPhoneNumber',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_REQUEST_DATE, // NGÀY GỬI YÊU CẦU
      field: 'requestDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 250
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TR_COURSE_NAME,  // KHÓA ĐÀO TẠO
      field: 'trCourseName',
      type: 'string',
      align: 'left',
      width: 250
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_OTHER_COURSE, // KHÓA ĐÀO TẠO KHÁC
      field: 'otherCourse',
      type: 'string',
      align: 'left',
      width: 250
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TRAIN_FORM_NAME,  // HÌNH THỨC ĐÀO TẠO
      field: 'trainFormName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TARGET_TRAIN,  // MỤC TIÊU ĐÀO TẠO
      field: 'targetTrain',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_CONTENT,  // NỘI DUNG ĐÀO TẠO
      field: 'content',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_ORG_ID,   // BAN/PHÒNG
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_EXPECTED_DATE,   // THỜI GIAN DỰ KIẾN TỪ
      field: 'expectedDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_EXPECT_DATE_TO,   // 	THỜI GIAN DỰ KIẾN ĐẾN
      field: 'expectDateTo',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_CENTERS,  // 	TRUNG TÂM ĐÀO TẠO
      field: 'centersId',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TEACHERS,  // 	GIẢNG VIÊN
      field: 'teachersId',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_EXPECTED_COST,  // 	CHI PHÍ DỰ KIẾN
      field: 'expectedCost',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TRAINER_NUMBER,  // 	SỐ HỌC VIÊN DỰ KIẾN
      field: 'trainerNumber',
      type: 'number',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TR_COMMIT,  // 	CAM KẾT ĐÀO TẠO
      field: 'trCommit',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      hideSearchBox: true,
      width: 150,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_CERTIFICATE,  // 	CHỨNG NHẬN ĐẠT ĐƯỢC
      field: 'certificate',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      hideSearchBox: true,
      width: 150,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TR_PLACE,  // NƠI ĐÀO TẠO
      field: 'trPlace',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_REMARK,  // 	GHI CHÚ
      field: 'remark',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_REASON_PORTAL,  // 	LÝ DO KHÔNG DUYỆT
      field: 'rejectReason',
      type: 'string',
      align: 'left',
      width: 300,
    }
  ]

  defaultAvatar!: string;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private ras: RandomAvatarService,
    private router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private appService: AppService, // CoreService is DEPRECATED!!!,

  ) {
    super(mls);
    this.defaultAvatar = ras.get();

    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)

    this.shownFrom = 'name';

    this.statuses = [993, 994]
  }

  ngAfterViewInit(): void {
    setTimeout(() => {

      this.getListYear();

      this.columns.filter((c) => c.field === 'trCommit')[0].templateRef =
        this.trCommit;
      this.columns.filter((c) => c.field === 'certificate')[0].templateRef =
        this.certificate;
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
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

  // Dropdown list
  getListYear() {
    this.subscriptions.push(
      this.appService
        .get(api.AT_SALARY_PERIOD_GET_YEAR)
        .subscribe((res: any) => {

          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              // ONLY THEN YOU WILL IMPLEMENT YOUR LOGICS
              const options: { value: number | null; text: string; }[] = [];
              options.push({
                value: Number(),
                text: ''
              })
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g,
                  text: g
                })
              })
              this.yearPeridOptions$.next(options);
            }
          }
        })
    )
  }

  // SEARCH
  onYearChange(year: number) {
    this.year = year;
    console.log(this.year);
  }

  onStatusChange(statuses: any[]) {
    this.statuses = statuses;
    console.log(this.statuses);
    //console.log(this.statuses.length);
  }

  onButtonClick(e: ICoreButtonVNS) {
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SEARCH) {
      this.search();
    }
  }

  search(): void {
    console.log("search");
    this.outerParam$.next({
      year: this.year
    })
    let eventFilterInOperator: IInOperator[] = [];
    const years: number[] = [];
    // vì có 2 số nên cần bảo vệ state cũ
    const currentOuterInOperators: IInOperator[] = JSON.parse(JSON.stringify(this.outerInOperators));
    years.push(this.year);

    if (this.statuses != null) {
      eventFilterInOperator.push(
        {
          field: "statusId",
          values: this.statuses
        }
      )
    }

    // lọc những field không trùng với field
    const remainOuterInOperators = currentOuterInOperators.filter(x => !!!(x.field === "year" || x.field === "statusId" || x.field === "orgId"));

    const newFilter = remainOuterInOperators.concat(eventFilterInOperator);

    // gán lại filter
    this.outerInOperators = this.outerInOperators.filter(x => !!(x.field === "orgId")).concat(newFilter);
  }
}
