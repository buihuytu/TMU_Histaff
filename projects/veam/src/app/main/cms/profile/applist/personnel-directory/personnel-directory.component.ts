import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AlertService, AppService, BaseComponent, CoreButtonGroupVnsComponent, CoreDropdownComponent, CoreHeaderParamsComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageListComponent, CoreStatusStickerComponent, CoreTableComponent, EnumCoreButtonVNSCode, EnumCoreTablePipeType, EnumFilterOperator, EnumFormBaseContolType, EnumSortDirection, FullscreenModalLoaderComponent, IAlertOptions, ICoreButtonVNS, ICoreDropdownOption, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreParamControl, ICoreTableColumnItem, IFilterOperator, IFormatedResponse, IGenerateTemplateRequest, IInOperator, ISortItem, MultiLanguageService, OrganizationService, TranslatePipe, alertOptions } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-personnel-directory',
  standalone: true,
  imports: [
    FormsModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreOrgTreeComponent,
    CoreTableComponent,
    TranslatePipe,
    CoreButtonGroupVnsComponent,
    FullscreenModalLoaderComponent,
    CoreStatusStickerComponent,
    CommonModule,
    CoreHeaderParamsComponent,
    CoreDropdownComponent
  ],
  templateUrl: './personnel-directory.component.html',
  styleUrl: './personnel-directory.component.scss'
})
export class PersonnelDirectoryComponent extends BaseComponent {

  orgIds!: number[];
  loading!: boolean;
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */
  datePeriodComparisonFor: string = 'joinDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STARTDATE_FILTER;
  statusInclusionFor: string = 'workStatusId';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_CORE_PARAMS_EMPLOYEE_STATUS_IN;
  statusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;
  corePageListInstanceNumber!: number;
  id: any;

  // objectSalOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  // objectSalGetByIdObject$ = new BehaviorSubject<any>(null);
  // objectSalGetByIdApi = api.PA_LISTSALARIES_READ_OBJ_SAL;

  // listSalariesInclusionFor: string = 'objSalId';
  // listSalariesInclusionForLabelKey: EnumTranslateKey =
  //   EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_OBJSAL_NAME;
  // listSalariesOptionsApi: api = api.PA_LISTSALARIES_READ_OBJ_SAL;

  objPeriodId!: number;
  shownFrom!: string;
  onObjectSal!: number;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_DIRECTORY
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
    queryListRelativePath: api.HU_EMPLOYEE_PERSONNEL_DIRECTOTY_QUERY_LIST,
  }
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_PLANNING_DELETE_IDS,
  }
  selectedIds: number[] = [];
  listInstance!: number;
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };
  paramRows!: ICoreParamControl[][];

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
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE,
      field: 'jobOrderNum',
      type: 'number',
      align: 'center',
      hidden: true,
      width: 0,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EMPLOYEECODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EMPLOYEENAME,
      field: 'fullname',
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_BIRTH_DATE,
      field: 'birthDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_GENDER,
      field: 'genderName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PHONE_NUMBER,
      field: 'mobilePhone',
      type: 'string',
      align: 'left',
      width: 250,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_EMAIL,
      field: 'email',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_EMAIL_COMPANY,
      field: 'workEmail',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_CORE_PARAMS_COMMON_STATUS_IN,
      field: 'workStatusName',
      type: 'string',
      align: 'center',
      width: 200,
    },
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-list */
  override subscriptions: Subscription[] = [];
  //generateTemplateRequest!: IGenerateTemplateRequest;
  constructor(
    public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
  ) {
    super(mls);
    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
    //this.corePageListInstanceNumber = new Date().getTime();
  }


  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      
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

  onRowClick(e: any) {
    this.id = e.id
  }

  // customizeSelectedIdsChange(e: number[]): void {
  //   this.selectedIds = e;
  // }


}
