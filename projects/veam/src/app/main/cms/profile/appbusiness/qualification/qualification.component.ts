import { Component, ViewEncapsulation, AfterViewInit, ViewChild, TemplateRef, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, IGenerateTemplateRequest, ISortItem, EnumSortDirection, IFilterOperator, EnumFilterOperator, IInOperator, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, RandomAvatarService, OrganizationService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QualificationComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('isPrime') isPrime!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;

  @ViewChild('isLicense') isLicense!: TemplateRef<any>;
  checkboxTemplate2!: TemplateRef<any>;

  generateTemplateRequest!: IGenerateTemplateRequest;
  headerFirstRowHeight: number = 60;

  datePeriodComparisonFor: string = 'effectFrom';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EFFECT_DAY;
  statusInclusionFor: string = 'workStatusId';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_EMPLOYEE_STATUS;
  workStatusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;

  @Input() hideHeader!: boolean;
  outerSort: ISortItem[] = [
    {
      field: "jobOderNum",
      sortDirection: EnumSortDirection.ASC
    },
    {
      field: "year",
      sortDirection: EnumSortDirection.DESC
    }
  ]
  orgIds!: number[];

  title = EnumTranslateKey.UI_COMPONENT_TITLE_CERTIFICATE
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

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_CERTIFICATE_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_CERTIFICATE_DELETE_IDS,
  }

  avatarTemplate!: TemplateRef<any>;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE,
      field: 'jobOderNum',
      type: 'number',
      align: 'center',
      hidden: true,
      width: 0,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EMPLOYEE_NAME,
      field: 'employeeFullName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TITLE_NAME,
      field: 'titleName',
      type: 'string',
      align: 'left',
      width: 330,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TYPECERTIFICATENAME,
      field: 'typeCertificateName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_IS_PRIME,
      field: 'isPrime',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      width: 100,
      readonly:true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_IS_LICENSE_ENGLISH,
      field: 'isLicense',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      width: 100,
      readonly:true,
      templateRef: this.checkboxTemplate2,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TRAIN_FROM,
      field: 'trainFromDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TRAIN_TO,
      field: 'trainToDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EFFECT_DATE,
      field: 'effectFrom',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EXPIRE_DATE,
      field: 'effectTo',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_LEVEL,
      field: 'levelName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_MAJOR,
      field: 'major',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_LEVELTRAINNAME,
      field: 'levelTrainName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_CONTENTTRAIN,
      field: 'contentTrain',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_SCHOOLNAME,
      field: 'schoolName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_YEAR,
      field: 'yearStr',
      type: 'string',
      align: 'left',
      width: 65,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_MARK,
      field: 'markStr',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TYPETRAINNAME,
      field: 'typeTrainName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private ras: RandomAvatarService,
    private organizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(mls);
        const newOrgIds: number[] = [];
        this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
        this.onOrgIdsChange(newOrgIds)
  }
  ngAfterViewInit(): void {
    this.columns.filter(c => c.field === 'isPrime')[0].templateRef = this.isPrime;
    this.columns.filter(c => c.field === 'isLicense')[0].templateRef = this.isLicense;
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

  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: 'HU_CERTIFICATE',
        lang: x
      }
    })
  }
}
