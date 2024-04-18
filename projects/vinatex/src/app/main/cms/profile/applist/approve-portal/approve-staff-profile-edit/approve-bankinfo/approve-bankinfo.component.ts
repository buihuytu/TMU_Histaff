import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListEditRouting, ICorePageListCRUD, IInOperator, ISortItem, EnumSortDirection, ICoreTableColumnItem, LayoutService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-approve-bankinfo',
  templateUrl: './approve-bankinfo.component.html',
  styleUrls: ['./approve-bankinfo.component.scss']
})
export class ApproveBankinfoComponent implements OnChanges, OnInit, AfterViewInit {
  @ViewChild('bankNo') bankNo!: TemplateRef<any>;
  bankNoTemplateRef!: TemplateRef<any>;

  @ViewChild('bankBranchName') bankBranchName!: TemplateRef<any>;
  bankBranchNameTemplateRef!: TemplateRef<any>;

  @ViewChild('bankName') bankName!: TemplateRef<any>;
  bankNameTemplateRef!: TemplateRef<any>;

  @ViewChild('bankNo2') bankNo2!: TemplateRef<any>;
  bankNo2TemplateRef!: TemplateRef<any>;

  @ViewChild('bankBranchName2') bankBranchName2!: TemplateRef<any>;
  bankBranchName2TemplateRef!: TemplateRef<any>;

  @ViewChild('bankName2') bankName2!: TemplateRef<any>;
  bankName2TemplateRef!: TemplateRef<any>;
  @Input() height!: number;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_EMPLOYEE_CV_EDIT_GET_ALL_BANK_INFO,
  };
  treeHeight!: number;
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  crud: ICorePageListCRUD = {
    toggleApproveIds: api.HU_EMPLOYEE_CV_EDIT_APPROVED_BANK_INFO,
    toggleUnapproveIds: api.HU_EMPLOYEE_CV_EDIT_APPROVED_BANK_INFO
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
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_BANK_NO,
      field: 'bankNo',
      type: 'string',
      align: 'left',
      width: 120,
      templateRef: this.bankNoTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_BANK_BRANCH,
      field: 'bankBranchName',
      type: 'string',
      align: 'left',
      width: 200,
      templateRef: this.bankBranchNameTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_BANK_NAME,
      field: 'bankName',
      type: 'string',
      align: 'left',
      width: 200,
      templateRef: this.bankNameTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_BANK_NO_2,
      field: 'bankNo2',
      type: 'string',
      align: 'left',
      width: 120,
      templateRef: this.bankNo2TemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_BANK_BRANCH_2,
      field: 'bankBranchName2',
      type: 'string',
      align: 'left',
      width: 200,
      templateRef: this.bankBranchName2TemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_BANK_NAME_2,
      field: 'bankName2',
      type: 'string',
      align: 'left',
      width: 200,
      templateRef: this.bankName2TemplateRef
    },
  ]
  constructor(private layoutService: LayoutService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['height']) {
      this.treeHeight = changes['height'].currentValue - this.layoutService.corePageHeaderHeight
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'bankNo')[0].templateRef = this.bankNo,
      this.columns.filter((c) => c.field === 'bankBranchName')[0].templateRef = this.bankBranchName2,
      this.columns.filter((c) => c.field === 'bankName')[0].templateRef = this.bankName
    this.columns.filter((c) => c.field === 'bankNo2')[0].templateRef = this.bankNo,
      this.columns.filter((c) => c.field === 'bankBranchName2')[0].templateRef = this.bankBranchName2,
      this.columns.filter((c) => c.field === 'bankName2')[0].templateRef = this.bankName2
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
