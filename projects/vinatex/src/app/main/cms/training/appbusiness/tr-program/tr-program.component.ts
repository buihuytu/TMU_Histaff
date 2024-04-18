import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { TrPrepareComponent } from "./tr-prepare/tr-prepare.component";
import { TrProgramCommitComponent } from "./tr-program-commit/tr-program-commit.component";
import { TrProgramResultComponent } from "./tr-program-result/tr-program-result.component";
import { TrClassComponent } from './tr-class/tr-class.component';
import { TrClassResultComponent } from './tr-class-result/tr-class-result.component';

import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TrProgramResultEditComponent } from './tr-program-result/tr-program-result-edit/tr-program-result-edit.component';
import { CorePageListComponent, CorePageHeaderComponent, CoreCompositionComponent, CoreStatusStickerComponent, CoreOrgTreeComponent, CoreCheckboxComponent, CoreButtonGroupVnsComponent, CoreDatePickerComponent, CoreTabsComponent, BaseComponent, EnumCoreButtonVNSCode, ICorePageListApiDefinition,IInOperator, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, OrganizationService, LayoutService, CorePageEditService, AlertService, ICoreButtonVNS, alertOptions, TranslatePipe } from 'ngx-histaff-alpha';
import { TrProgramService } from './tr-program.service';
import { FormsModule } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-tr-program',
  standalone: true,
  templateUrl: './tr-program.component.html',
  styleUrl: './tr-program.component.scss',
  imports: [
    CorePageListComponent,
    CommonModule,
    TranslatePipe,
    FormsModule,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreStatusStickerComponent,
    CoreOrgTreeComponent,
    CoreCheckboxComponent,
    CoreButtonGroupVnsComponent,
    CoreDatePickerComponent,
    CoreTabsComponent,
    TrPrepareComponent,
    TrProgramCommitComponent,
    TrProgramResultComponent,
    TrClassComponent,
    TrClassResultComponent,
    TrProgramResultEditComponent
  ]
})
export class TrProgramComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  title = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM;
  coreTabsHeight!: number;
  headers: EnumTranslateKey[] = [
    EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM,
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_BUTTON_PREPARE_COURSE,
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_BUTTON_INFO_CLASS,
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_BUTTON_RESULT_DETAIL,
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_BUTTON_RESULT_COURSE,
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_BUTTON_TRAINING_COMMIT,

  ]
  headerButtons: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.HEADER_CREATE,
    EnumCoreButtonVNSCode.HEADER_EDIT,
    EnumCoreButtonVNSCode.HEADER_DELETE,
    EnumCoreButtonVNSCode.HEADER_EXPORTEXEL,
  ];
  errorRequired = EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED;


  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_PROGRAM_QUERY_LIST,
  };
  orgIds!: number[];
  avatarTemplate!: TemplateRef<any>;
  outerInOperators: IInOperator[] = [];
  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.TR_PROGRAM_DELETE_IDS,
    toggleActiveIds: api.TR_PROGRAM_TOGGLE_ACTIVE_IDS,
  };

  compositionHeight!: number;
  treeHeight!: number;
  tableHeight!: number;

  corePageListInstanceNumber!: number;
  disabled!: boolean;

  // SEARCH
  dateStart!: Date;
  dateEnd!: Date;
  labelList = {
    dateStart: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_DATE_START,
    dateEnd: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_DATE_END,
    prepareCourse: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_BUTTON_PREPARE_COURSE,
    infoClass: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_BUTTON_INFO_CLASS,
    resultDetail: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_BUTTON_RESULT_DETAIL,
    resultCourse: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_BUTTON_RESULT_COURSE,
    traningCommit: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_BUTTON_TRAINING_COMMIT,
  }

  // Validator Form
  showRequiredDateStart: boolean = false;
  showRequiredDateEnd: boolean = false;

  // Button
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
  ];

  @ViewChild('certificate') certificate!: TemplateRef<any>;
  @ViewChild('trCommit') trCommit!: TemplateRef<any>;
  @ViewChild('trAfterTrain') trAfterTrain!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;

  selectedIds: any[] = [];

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
      caption: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_CODE,
      field: 'trProgramCode',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_YEAR,
      field: 'year',
      type: 'string',
      align: 'left',
      width: 60,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_DETAIL_TYPE_PROGRAM,
      field: 'planName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TRAINING_COURSE,
      field: 'trCourseName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_DETAIL_TYPE_TRAIN,
      field: 'trTypeName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_TRAINING_FILED,
      field: 'trTrainField',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_PROPERTIES,
      field: 'propertiesNeedId',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_CONTENTTRAIN,
      field: 'content',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_FROM_DATE,
      field: 'startDate',
      type: 'string',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_TO_DATE,
      field: 'endDate',
      type: 'string',
      align: 'left',
      pipe: EnumCoreTablePipeType.DATE,
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_STUDENT_NUM,
      field: 'studentNumber',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_COSTS,
      field: 'costStudent',
      type: 'string',
      align: 'left',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_CENTER,
      field: 'centerName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_CERTIFICATIONS_ACHIEVED,
      field: 'certificate',
      type: 'string',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'left',
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_COMMITMENT_TO_TRAINING,
      field: 'trCommit',
      type: 'string',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'left',
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_POST_TRAINING_EVALUATION,
      field: 'trAfterTrain',
      type: 'string',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'left',
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_ADDRESS_TRAINING,
      field: 'venue',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 150,
    },

  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
    private layoutService: LayoutService,
    private corePageEditService: CorePageEditService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private trProgramService: TrProgramService,
  ) {
    super(mls);
    this.corePageListInstanceNumber = new Date().getTime();

    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
  }

  override ngOnInit(): void { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.columns.filter((c) => c.field === 'certificate')[0].templateRef = this.certificate;
      this.columns.filter((c) => c.field === 'trCommit')[0].templateRef = this.trCommit;
      this.columns.filter((c) => c.field === 'trAfterTrain')[0].templateRef = this.trAfterTrain;

      this.subscriptions.push(
        this.layoutService.contentContainerHeight$.subscribe(x => {
          this.coreTabsHeight = x - this.layoutService.basicSpacing - this.layoutService.corePageHeaderHeight
          this.compositionHeight = x - this.layoutService.corePageHeaderHeight - this.layoutService.basicSpacing;
          this.treeHeight = this.compositionHeight;
          this.tableHeight = this.compositionHeight - 186 - 20 - this.layoutService.corePaginationHeight;
        })
      )
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

  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        this.corePageEditService.fromUrl = this.router.url;

        this.router.navigate([btoa('0'), { listInstance: this.corePageListInstanceNumber }], {
          relativeTo: this.route.parent,
        });
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        console.log("HEADER_EDIT");
        break;
      case EnumCoreButtonVNSCode.HEADER_DELETE:
        console.log("HEADER_DELETE");
        break;
      default:
        break;
    }
  }

  // SEARCH
  onDateStartChange(dateStart: Date): void {
    this.dateStart = dateStart;
    console.log(this.dateStart);
  }

  onDateEndChange(dateEnd: Date): void {
    this.dateEnd = dateEnd;
    console.log(this.dateEnd);
  }

  onButtonClick(e: ICoreButtonVNS): void {
    if (this.checkParamValue() == true) {
      console.log("SEARCH");
    }
  }

  onSelectedIdsChange(e: string[] | number[]) {
    this.selectedIds = e;
    console.log(this.selectedIds);
  }

  listButton: any[] = [
    {
      text: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_BUTTON_PREPARE_COURSE,
      url: 'tr-prepare/'
    },
    {
      text: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_BUTTON_INFO_CLASS,
      url: 'tr-class/'
    },
    {
      text: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_BUTTON_RESULT_DETAIL,
      url: ''
    },
    {
      text: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_BUTTON_RESULT_COURSE,
      url: 'tr-request-result/'
    },
    {
      text: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_IS_COMMIT_TRAIN,
      url: 'tr-program-commit/'
    },
  ]

  onButtonOpenPageClick(e: any): void {
    console.log("onButtonOpenPageClick: ", e);
    if (this.selectedIds.length == 0) {
      this.alertService.error(this.mls.trans('NO_SELECTED_ID_TO_CREATE'), alertOptions);
    }
    else if (this.selectedIds.length > 1) {
      this.alertService.error(this.mls.trans('SELECT_ONLY_ONE_RECORD_TO_EDIT'), alertOptions);
    }
    else {
      this.router.navigate(
        [
          e.url,
          // btoa('' + this.selectedIds[0]), 
          // { listInstance: this.corePageListInstanceNumber }
        ],
        {
          relativeTo: this.route.parent,
        });
    }
  }

  checkParamValue(): boolean {
    this.resetCheckParam()
    let flagCheck: boolean = true;
    this.showRequiredDateStart = !this.dateStart ? true : false;
    this.showRequiredDateEnd = !this.dateEnd ? true : false;
    if (this.showRequiredDateStart == false && this.showRequiredDateEnd == false) {
      flagCheck = true;
    }
    else {
      flagCheck = false;
    }
    return flagCheck;
  }

  resetCheckParam(): void {
    this.showRequiredDateStart = false;
    this.showRequiredDateEnd = false;
  }

  onCoreTabsHedaerClick(e: any): void {
    this.trProgramService.tabActiveIndex = e.index
    this.trProgramService.tabActiveHeader = e.header
  }

  override ngOnDestroy(): void {

    if (!this.router.url.includes('/cms/training/business/tr-program')) {
      this.trProgramService.trProgramId$.next(0);
    }
  }
}
