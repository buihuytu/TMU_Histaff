import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListEditRouting, ICorePageListCRUD, IInOperator, ISortItem, EnumSortDirection, ICoreTableColumnItem, EnumCoreTablePipeType, MultiLanguageService, LayoutService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-approve-additinal-info',
  templateUrl: './approve-additinal-info.component.html',
  styleUrls: ['./approve-additinal-info.component.scss']
})
export class ApproveAdditinalInfoComponent extends BaseComponent implements OnChanges, OnInit, AfterViewInit {
  @ViewChild('passNo') passNo!: TemplateRef<any>;
  passNoTemplateRef!: TemplateRef<any>;

  @ViewChild('passDate') passDate!: TemplateRef<any>;
  passDateTemplateRef!: TemplateRef<any>;

  @ViewChild('passExpire') passExpire!: TemplateRef<any>;
  passExpireTemplateRef!: TemplateRef<any>;

  @ViewChild('passPlace') passPlace!: TemplateRef<any>;
  passPlaceTemplateRef!: TemplateRef<any>;

  @ViewChild('visaNo') visaNo!: TemplateRef<any>;
  visaNoTemplateRef!: TemplateRef<any>;

  @ViewChild('visaDate') visaDate!: TemplateRef<any>;
  visaDateTemplateRef!: TemplateRef<any>;

  @ViewChild('visaPlace') visaPlace!: TemplateRef<any>;
  visaPlaceTemplateRef!: TemplateRef<any>;
  @Input() height!: number;

  workPermitPlaceTemplateRef!: TemplateRef<any>;
  treeHeight!: number;
  override lang = 'vi';
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_EMPLOYEE_CV_EDIT_GET_ALL_ADDITIONAL_INFO,
  };

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };

  crud: ICorePageListCRUD = {
    toggleApproveIds: api.HU_EMPLOYEE_CV_EDIT_APPROVED_ADDINATIONAL_INFO,
    toggleUnapproveIds: api.HU_EMPLOYEE_CV_EDIT_APPROVED_ADDINATIONAL_INFO
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
      width: 240,
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
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_PASS_NO,
      field: 'passNo',
      type: 'string',
      align: 'left',
      width: 80,
      templateRef: this.passNoTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_PASS_DATE,
      field: 'passDate',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE,
      templateRef: this.passDateTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_PASS_EXPIRE,
      field: 'passExpire',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE,
      templateRef: this.passExpireTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_PASS_PLACE,
      field: 'passPlace',
      type: 'string',
      align: 'left',
      width: 200,
      templateRef: this.passPlaceTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_VISA_NO,
      field: 'visaNo',
      type: 'string',
      align: 'left',
      width: 120,
      templateRef: this.visaNoTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_VISA_DATE,
      field: 'visaDate',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE,
      templateRef: this.visaDateTemplateRef

    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_VISA_PLACE,
      field: 'visaPlace',
      type: 'string',
      align: 'left',
      width: 200,
      templateRef: this.visaPlaceTemplateRef
    },


  ]


  constructor(public override mls: MultiLanguageService,
    private layoutSerivce: LayoutService) {
    super(mls)
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['height']) {
      this.treeHeight = changes['height'].currentValue - this.layoutSerivce.corePageHeaderHeight
    }
  }
  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'passNo')[0].templateRef = this.passNo,
      this.columns.filter((c) => c.field === 'passDate')[0].templateRef = this.passDate,
      this.columns.filter((c) => c.field === 'passExpire')[0].templateRef = this.passExpire,
      this.columns.filter((c) => c.field === 'passPlace')[0].templateRef = this.passPlace,
      this.columns.filter((c) => c.field === 'visaNo')[0].templateRef = this.visaNo,
      this.columns.filter((c) => c.field === 'visaDate')[0].templateRef = this.visaDate,
      this.columns.filter((c) => c.field === 'visaPlace')[0].templateRef = this.visaPlace
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
