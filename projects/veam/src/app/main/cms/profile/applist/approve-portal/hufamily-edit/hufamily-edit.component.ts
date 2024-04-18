import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BaseComponent, EnumCoreTablePipeType, EnumSortDirection, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, IInOperator, ISortItem, MultiLanguageService } from 'ngx-histaff-alpha';

import { BehaviorSubject } from "rxjs";
import { HuFamilyEditService } from './hufamily-edit.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';



@Component({
  selector: 'app-hufamily-edit',
  templateUrl: './hufamily-edit.component.html',
  styleUrls: ['./hufamily-edit.component.scss']
})
export class HufamilyEditComponent extends BaseComponent implements OnInit {
  @ViewChild('isHousehold') isHousehold!: TemplateRef<any>;
  @ViewChild('isDeduct') isDeduct!: TemplateRef<any>;
  @ViewChild('sameCompany') sameCompany!: TemplateRef<any>;
  @ViewChild('isDeduct') isDead!: TemplateRef<any>;

  @ViewChild('fullname') fullname!: TemplateRef<any>;
  fullnameTemplateRef!: TemplateRef<any>;

  @ViewChild('relationshipName') relationshipName!: TemplateRef<any>;
  relationshipNameTemplateRef!: TemplateRef<any>;

  @ViewChild('genderName') genderName!: TemplateRef<any>;
  genderNameTemplateRef!: TemplateRef<any>;

  @ViewChild('birthDate') birthDate!: TemplateRef<any>;
  birthDateTemplateRef!: TemplateRef<any>;

  @ViewChild('pitCode') pitCode!: TemplateRef<any>;
  pitCodeTemplateRef!: TemplateRef<any>;

  @ViewChild('registerDeductDate') registerDeductDate!: TemplateRef<any>;
  registerDeductDateTemplateRef!: TemplateRef<any>;

  @ViewChild('deductFrom') deductFrom!: TemplateRef<any>;
  deductFromTemplateRef!: TemplateRef<any>;

  @ViewChild('idNo') idNo!: TemplateRef<any>;
  idNoTemplateRef!: TemplateRef<any>;

  @ViewChild('deductTo') deductTo!: TemplateRef<any>;
  deductToTemplateRef!: TemplateRef<any>;

  @ViewChild('career') career!: TemplateRef<any>;
  careerTemplateRef!: TemplateRef<any>;

  @ViewChild('nationalityName') nationalityName!: TemplateRef<any>;
  nationalityNameTemplateRef!: TemplateRef<any>;

  @ViewChild('birthCerPlace') birthCerPlace!: TemplateRef<any>;
  birthCerPlaceTemplateRef!: TemplateRef<any>;

  @ViewChild('birthCerProvinceName') birthCerProvinceName!: TemplateRef<any>;
  birthCerProvinceNameTemplateRef!: TemplateRef<any>;

  @ViewChild('birthCerDistrictName') birthCerDistrictName!: TemplateRef<any>;
  birthCerDistrictNameTemplateRef!: TemplateRef<any>;

  @ViewChild('birthCerWardName') birthCerWardName!: TemplateRef<any>;
  birthCerWardNameTemplateRef!: TemplateRef<any>;

  @ViewChild('note') note!: TemplateRef<any>;
  noteTemplateRef!: TemplateRef<any>;
  headerFirstRowHeight: number = 50;
  checkboxTemplate!: TemplateRef<any>;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_FAMILY_EDIT_QUERY_LIST

  };
  showDialog!: boolean;
  title: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT;
  corePageListInstanceNumber!: number;
  selectedIds: string[] | number[] = [];
  salPeriod!: number;
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_APPROVE_FAMILY_EDIT_DATE_SEND,
      field: 'createdDate',
      type: 'string',
      align: 'center',
      width: 120,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_POSITON_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_FULL_NAME,
      field: 'fullname',
      type: 'string',
      align: 'left',
      width: 180,
      templateRef: this.fullnameTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_RELATIONSHIP,
      field: 'relationshipName',
      type: 'string',
      align: 'left',
      width: 120,
      templateRef: this.relationshipNameTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_GENDER,
      field: 'genderName',
      type: 'string',
      align: 'left',
      width: 75,
      templateRef: this.genderNameTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_BIRTHDATE,
      field: 'birthDate',
      type: 'string',
      align: 'center',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE,
      templateRef: this.birthDateTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_PIT_CODE,
      field: 'pitCode',
      type: 'string',
      align: 'center',
      width: 120,
      templateRef: this.pitCodeTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_SAME_COMPANY,
      field: 'sameCompany',
      type: 'bool',
      align: 'center',
      width: 100,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,

    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_IS_DEAD,
      field: 'isDead',
      type: 'bool',
      align: 'center',
      width: 60,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,


    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_IS_DEDUCT,
      field: 'isDeduct',
      type: 'bool',
      align: 'center',
      width: 80,
      templateRef: this.checkboxTemplate,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,

    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_REGISTER_DEDUCT_DATE,
      field: 'registerDeductDate',
      type: 'string',
      align: 'center',
      width: 120,
      templateRef: this.registerDeductDateTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_DEDUCT_FROM,
      field: 'deductFrom',
      type: 'string',
      align: 'center',
      width: 120,
      templateRef: this.deductFromTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_DEDUCT_TO,
      field: 'deductTo',
      type: 'string',
      align: 'center',
      width: 120,
      templateRef: this.deductToTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_IS_HOUSE_HOLD,
      field: 'isHousehold',
      type: 'bool',
      align: 'center',
      width: 80,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_ID_NO,
      field: 'idNo',
      type: 'string',
      align: 'left',
      width: 120,
      templateRef: this.idNoTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_CARRER,
      field: 'career',
      type: 'string',
      align: 'left',
      width: 150,
      templateRef: this.careerTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_NATIONNALLY,
      field: 'nationalityName',
      type: 'string',
      align: 'left',
      width: 120,
      templateRef: this.nationalityNameTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_BIRTH_CER_PLACE,
      field: 'birthCerPlace',
      type: 'string',
      align: 'left',
      width: 150,
      templateRef: this.birthCerPlaceTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_BIRH_CER_PROVINCE,
      field: 'birthCerProvinceName',
      type: 'string',
      align: 'left',
      width: 150,
      templateRef: this.birthCerProvinceNameTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_BIRH_CER_DISTRICT,
      field: 'birthCerDistrictName',
      type: 'string',
      align: 'left',
      width: 150,
      templateRef: this.birthCerDistrictNameTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_BIRH_CER_WARD,
      field: 'birthCerWardName',
      type: 'string',
      align: 'left',
      width: 150,
      templateRef: this.birthCerWardNameTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_BIRH_CER_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
      templateRef: this.noteTemplateRef
    },
  ]
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_EVALUATE_DELETE_IDS,
    toggleApproveIds: api.HU_FAMILY_EDIT_APPROVE,
    toggleUnapproveIds: api.HU_FAMILY_EDIT_APPROVE
  };

  constructor(
    public override mls: MultiLanguageService,
    private huFamilyEdit: HuFamilyEditService
  ) {
    super(mls);
  }
  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe((x) => (this.lang = x)));
  }
  ngAfterViewInit(): void {
    this.columns.filter(c => c.field === 'isHousehold')[0].templateRef = this.isHousehold;
    this.columns.filter(c => c.field === 'isDeduct')[0].templateRef = this.isDeduct;
    this.columns.filter(c => c.field === 'isDead')[0].templateRef = this.isDead;
    this.columns.filter(c => c.field === 'sameCompany')[0].templateRef = this.sameCompany;
    this.columns.filter(c => c.field === 'fullname')[0].templateRef = this.fullname;
    this.columns.filter(c => c.field === 'relationshipName')[0].templateRef = this.relationshipName;
    this.columns.filter(c => c.field === 'genderName')[0].templateRef = this.genderName;
    this.columns.filter(c => c.field === 'birthDate')[0].templateRef = this.birthDate;
    this.columns.filter(c => c.field === 'pitCode')[0].templateRef = this.pitCode;
    this.columns.filter(c => c.field === 'registerDeductDate')[0].templateRef = this.registerDeductDate;
    this.columns.filter(c => c.field === 'deductFrom')[0].templateRef = this.deductFrom;
    this.columns.filter(c => c.field === 'deductTo')[0].templateRef = this.deductTo;
    this.columns.filter(c => c.field === 'idNo')[0].templateRef = this.idNo;
    this.columns.filter(c => c.field === 'career')[0].templateRef = this.career;
    this.columns.filter(c => c.field === 'nationalityName')[0].templateRef = this.nationalityName;
    this.columns.filter(c => c.field === 'birthCerPlace')[0].templateRef = this.birthCerPlace;
    this.columns.filter(c => c.field === 'birthCerProvinceName')[0].templateRef = this.birthCerProvinceName;
    this.columns.filter(c => c.field === 'birthCerDistrictName')[0].templateRef = this.birthCerDistrictName;
    this.columns.filter(c => c.field === 'birthCerWardName')[0].templateRef = this.birthCerWardName;
    this.columns.filter(c => c.field === 'note')[0].templateRef = this.note
  }

  onRowClick(e: any) {
    this.huFamilyEdit.familyId = e.id
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
