import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListEditRouting, ICorePageListCRUD, IInOperator, ISortItem, EnumSortDirection, ICoreTableColumnItem, LayoutService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-approve-contract',
  templateUrl: './approve-contract.component.html',
  styleUrls: ['./approve-contract.component.scss']
})
export class ApproveContractComponent implements OnChanges, OnInit, AfterViewInit {
  @ViewChild('address') address!: TemplateRef<any>;
  addressTemplateRef!: TemplateRef<any>;

  @ViewChild('provinceName') provinceName!: TemplateRef<any>;
  provinceNameTemplateRef!: TemplateRef<any>;

  @ViewChild('districtName') districtName!: TemplateRef<any>;
  districtNameTemplateRef!: TemplateRef<any>;

  @ViewChild('wardName') wardName!: TemplateRef<any>;
  wardNameTemplateRef!: TemplateRef<any>;

  @ViewChild('curAddress') curAddress!: TemplateRef<any>;
  curAddressTemplateRef!: TemplateRef<any>;

  @ViewChild('curProvinceName') curProvinceName!: TemplateRef<any>;
  curProvinceNameTemplateRef!: TemplateRef<any>;

  @ViewChild('curDistrictName') curDistrictName!: TemplateRef<any>;
  curDistrictNameTemplateRef!: TemplateRef<any>;

  @ViewChild('curWardName') curWardName!: TemplateRef<any>;
  curWardNameTemplateRef!: TemplateRef<any>;

  @ViewChild('mobilePhone') mobilePhone!: TemplateRef<any>;
  mobilePhoneTemplateRef!: TemplateRef<any>;

  @ViewChild('mobilePhoneLand') mobilePhoneLand!: TemplateRef<any>;
  mobilePhoneLandTemplateRef!: TemplateRef<any>;

  @ViewChild('email') email!: TemplateRef<any>;
  emailTemplateRef!: TemplateRef<any>;
  @Input() height!: number;

  treeHeight!: number;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_EMPLOYEE_CV_EDIT_GET_ALL_CONTACT,
  };

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  crud: ICorePageListCRUD = {
    toggleApproveIds: api.HU_EMPLOYEE_CV_EDIT_APPROVED_CONTACT,
    toggleUnapproveIds: api.HU_EMPLOYEE_CV_EDIT_UNAPPROVED_CONTACT
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
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_ADDRESS,
      field: 'address',
      type: 'string',
      align: 'left',
      width: 200,
      templateRef: this.addressTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_PROVINCE_NAME,
      field: 'provinceName',
      type: 'string',
      align: 'left',
      width: 100,
      templateRef: this.provinceNameTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_DISTRICT_NAME,
      field: 'districtName',
      type: 'string',
      align: 'left',
      width: 120,
      templateRef: this.districtNameTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_WARD_NAME,
      field: 'wardName',
      type: 'string',
      align: 'left',
      width: 120,
      templateRef: this.wardNameTemplateRef
    }, {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_CUR_ADDRESS,
      field: 'curAddress',
      type: 'string',
      align: 'left',
      width: 120,
      templateRef: this.curAddressTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_CUR_PROVINCE_NAME,
      field: 'curProvinceName',
      type: 'string',
      align: 'left',
      width: 100,
      templateRef: this.curProvinceNameTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_CUR_DISTRICT_NAME,
      field: 'curDistrictName',
      type: 'string',
      align: 'left',
      width: 120,
      templateRef: this.curDistrictNameTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_CUR_WARD_NAME,
      field: 'curWardName',
      type: 'string',
      align: 'left',
      width: 120,
      templateRef: this.curWardNameTemplateRef
    }, {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_MOBILE_PHONE,
      field: 'mobilePhone',
      type: 'string',
      align: 'left',
      width: 100,
      templateRef: this.mobilePhoneTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_LANDLINE_PHONE,
      field: 'mobilePhoneLand',
      type: 'string',
      align: 'left',
      width: 100,
      templateRef: this.mobilePhoneLandTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_EMAIL,
      field: 'email',
      type: 'string',
      align: 'left',
      width: 150,
      templateRef: this.emailTemplateRef
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
    this.columns.filter((c) => c.field === 'address')[0].templateRef = this.address,
      this.columns.filter((c) => c.field === 'provinceName')[0].templateRef = this.provinceName,
      this.columns.filter((c) => c.field === 'districtName')[0].templateRef = this.districtName,
      this.columns.filter((c) => c.field === 'wardName')[0].templateRef = this.wardName,
      this.columns.filter((c) => c.field === 'curAddress')[0].templateRef = this.curAddress,
      this.columns.filter((c) => c.field === 'curProvinceName')[0].templateRef = this.curProvinceName,
      this.columns.filter((c) => c.field === 'curDistrictName')[0].templateRef = this.curDistrictName,
      this.columns.filter((c) => c.field === 'curWardName')[0].templateRef = this.curWardName,
      this.columns.filter((c) => c.field === 'mobilePhone')[0].templateRef = this.mobilePhone,
      this.columns.filter((c) => c.field === 'mobilePhoneLand')[0].templateRef = this.mobilePhoneLand,
      this.columns.filter((c) => c.field === 'email')[0].templateRef = this.email
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
