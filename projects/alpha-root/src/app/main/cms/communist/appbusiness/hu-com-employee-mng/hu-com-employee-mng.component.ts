import { Component, AfterViewInit } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, IInOperator, ICoreTableColumnItem, MultiLanguageService } from "ngx-histaff-alpha";

@Component({
  selector: 'app-hu-com-employee-mng',
  templateUrl: './hu-com-employee-mng.component.html',
  styleUrl: './hu-com-employee-mng.component.scss'
})

export class HuComEmployeeMngComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_EMPLOYEE_MNG;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_COM_EMPLOYEE_MNG_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_COM_EMPLOYEE_MNG_DELETE_IDS,
  }

  orgIds!: number[];

  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ];

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_WORKING_COM_CODE,
      field: 'ma_dang_vien',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPOYEE_NAME,
      field: 'ho_ten',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_WORKING_POS,
      field: 'chuc_danh_dang',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_PARTY_CELL,
      field: 'chi_bo_dang',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_PARTY_ACTIVITIES_PLACE,
      field: 'noi_sinh_hoat_dang',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_GOVERNMENT_POSITIONS,
      field: 'chuc_danh_chinh_quyen',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_DATE,
      field: 'ngay_vao_dang',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_MEMBER_OFFICAL_DATE,
      field: 'ngay_vao_dang_chinh_thuc',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_DAY_RECEPTION,
      field: 'ngay_tiep_nhan',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_PARTY_MEMBER_PROFILE_NUMBER,
      field: 'so_ly_lich_dang_vien',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_CARD_NUMBER,
      field: 'so_the_dang',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_BIRTH_DATE,
      field: 'ngay_sinh',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_GENDER,
      field: 'gioi_tinh',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_HOME_TOWN,
      field: 'que_quan',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT_ID_NO,
      field: 'so_cmnd_cccd',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_STATUS_ID,
      field: 'trang_thai',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_EMPLOYEE_STATUS_DETAILS,
      field: 'chi_tiet_trang_thai_nhan_vien',
      type: 'string',
      align: 'left',
      width: 220,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'id',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'orgId',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1,
    }
  ]

  constructor(
    public override mls: MultiLanguageService
  ) {
    super(mls);
  }

  ngAfterViewInit(): void {

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