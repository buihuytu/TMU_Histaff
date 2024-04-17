import { Component, OnChanges, OnInit, AfterViewInit, ViewChild, TemplateRef, Input, SimpleChanges } from "@angular/core";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListEditRouting, ICorePageListCRUD, IInOperator, ISortItem, EnumSortDirection, ICoreTableColumnItem, LayoutService, OrganizationService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-approve-education',
  templateUrl: './approve-education.component.html',
  styleUrls: ['./approve-education.component.scss']
})
export class ApproveEducationComponent implements OnChanges, OnInit, AfterViewInit {
  @ViewChild('educationLevel') educationLevel!: TemplateRef<any>;
  educationLevelTemplateRef!: TemplateRef<any>;

  @ViewChild('computerSkill') computerSkill!: TemplateRef<any>;
  computerSkillTemplateRef!: TemplateRef<any>;

  @ViewChild('license') license!: TemplateRef<any>;
  licenseTemplateRef!: TemplateRef<any>;
  @Input() height!: number;

  treeHeight!: number;
  // @ViewChild('learningLevel') learningLevel!: TemplateRef<any>;
  // learningLevelTemplateRef!: TemplateRef<any>;

  // @ViewChild('qualificationName') qualificationName!: TemplateRef<any>;
  // qualificationNameTemplateRef!: TemplateRef<any>;

  // @ViewChild('qualificationName2') qualificationName2!: TemplateRef<any>;
  // qualificationName2TemplateRef!: TemplateRef<any>;

  // @ViewChild('qualificationName3') qualificationName3!: TemplateRef<any>;
  // qualificationName3TemplateRef!: TemplateRef<any>;

  // @ViewChild('traningFormName') traningFormName!: TemplateRef<any>;
  // traningFormNameTemplateRef!: TemplateRef<any>;

  // @ViewChild('trainingFormName2') trainingFormName2!: TemplateRef<any>;
  // trainingFormName2TemplateRef!: TemplateRef<any>;

  // @ViewChild('trainingFormName3') trainingFormName3!: TemplateRef<any>;
  // trainingFormName3TemplateRef!: TemplateRef<any>;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_EMPLOYEE_CV_EDIT_GET_ALL_EDUCATION,
  };
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  crud: ICorePageListCRUD = {
    toggleApproveIds: api.HU_EMPLOYEE_CV_EDIT_APPROVED_EDUCATION,
    toggleUnapproveIds: api.HU_EMPLOYEE_CV_EDIT_APPROVED_EDUCATION,
  };
  orgIds: number[] = [];
  outerParam$ = new BehaviorSubject<any>(null);
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ];
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE,
      field: 'jobOrderNum',
      type: 'string',
      align: 'center',
      hidden: true,
      width: 0,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_STATUS,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_EMPLOYEE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_EMPLOYEE_NAME,
      field: 'fullname',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_EDUCATION_LEVEL,
      field: 'educationLevel',
      type: 'string',
      align: 'left',
      width: 130,
      templateRef: this.educationLevel
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_COMPUTER_SKILL,
      field: 'computerSkill',
      type: 'string',
      align: 'left',
      width: 130,
      templateRef: this.computerSkill
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LICENSE,
      field: 'license',
      type: 'string',
      align: 'left',
      width: 130,
      templateRef: this.license
    }
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_LEARNING_LEVEL,
    //   field: 'learningLevel',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    //   templateRef: this.learningLevelTemplateRef
    // },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_EDUCATION_LEVEL,
    //   field: 'qualificationName',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    //   templateRef: this.qualificationNameTemplateRef
    // },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_LEARNING_LEVEL,
    //   field: 'qualificationName2',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    //   templateRef: this.qualificationName2TemplateRef
    // },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_EDUCATION_LEVEL,
    //   field: 'qualificationName3',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    //   templateRef: this.qualificationName3TemplateRef
    // },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_LEARNING_LEVEL,
    //   field: 'trainingFormName',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    //   templateRef: this.traningFormNameTemplateRef
    // },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_EDUCATION_LEVEL,
    //   field: 'trainingFormName2',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    //   templateRef: this.trainingFormName2TemplateRef
    // },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_LEARNING_LEVEL,
    //   field: 'trainingFormName3',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    //   templateRef: this.trainingFormName3TemplateRef
    // },

  ]
  constructor(
    private layoutService: LayoutService,
    private organizationService: OrganizationService
  ) { 
    const newOrgIds: number[] = [];
    organizationService.status$.value.activeKeys.map(x => {
      newOrgIds.push(Number(x))
    });
    this.onOrgIdsChange(newOrgIds);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!!changes['height']) {
      this.treeHeight = changes['height'].currentValue - this.layoutService.corePageHeaderHeight
    }
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'educationLevel')[0].templateRef = this.educationLevel;
    this.columns.filter((c) => c.field === 'computerSkill')[0].templateRef = this.computerSkill;
    this.columns.filter((c) => c.field === 'license')[0].templateRef = this.license;
    // this.columns.filter((c) => c.field === 'learningLevel')[0].templateRef = this.learningLevel;
    // this.columns.filter((c) => c.field === 'qualificationName')[0].templateRef = this.qualificationName;
    // this.columns.filter((c) => c.field === 'qualificationName2')[0].templateRef = this.qualificationName2;
    // this.columns.filter((c) => c.field === 'qualificationName3')[0].templateRef = this.qualificationName3;
    // this.columns.filter((c) => c.field === 'trainingFormName')[0].templateRef = this.traningFormName;
    // this.columns.filter((c) => c.field === 'trainingFormName2')[0].templateRef = this.trainingFormName2;
    // this.columns.filter((c) => c.field === 'trainingFormName3')[0].templateRef = this.trainingFormName3;
  }

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }

}
