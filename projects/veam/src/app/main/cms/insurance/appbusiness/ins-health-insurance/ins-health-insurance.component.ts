import { Component, AfterViewInit, ViewChild, TemplateRef, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, IFilterOperator, EnumFilterOperator, IInOperator, ISortItem, EnumSortDirection, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, RandomAvatarService, OrganizationService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";


@Component({
  selector: 'app-ins-health-insurance',
  templateUrl: './ins-health-insurance.component.html',
  styleUrls: ['./ins-health-insurance.component.scss']
})
export class InsHealthInsuranceComponent extends BaseComponent implements AfterViewInit {

  @ViewChild('sticker') sticker!: TemplateRef<any>;
  @Input() hideHeader!: boolean;

  /* START: Local filter params */
  orgIds!: number[];
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  title = EnumTranslateKey.UI_COMPONENT_TITLE_INS_HEALTH_INSURANCE
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

  // Sắp xếp lưới hiển thị theo cấp chức danh
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.INS_HEALTH_INSURANCE_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.INS_HEALTH_INSURANCE_DELETE_IDS,
    toggleActiveIds: api.INS_HEALTH_INSURANCE_TOGGLE_ACTIVE_IDS,
  }

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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_EMPLOYEE_CODE, // Mã NV
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_EMPLOYEE_NAME, // Họ và tên
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_EMPLOYEE_DATE_OF_BIRTH,  // Ngày sinh
      field: 'birthDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_EMPLOYEE_IDENTITY_NO, // Số CMND
      field: 'idNo',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_EMPLOYEE_DEPARTMENT, // Ban/Phòng
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_EMPLOYEE_POSITION, // Vị trí
      field: 'posName',
      type: 'string',
      align: 'left',
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_YEAR,  // Năm
      field: 'year',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_CONTRACT_NO, // Số HĐ bảo hiểm
      field: 'insContractNo',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_INS_UNIT,  // Đơn vị bảo hiểm
      field: 'orgInsurance',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_CONTRACT_VALUE,  // Giá trị hợp đồng
      field: 'valCo',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_CONTRACT_FROM_DATE,  // Hợp đồng từ ngày
      field: 'startDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_CONTRACT_TO_DATE,   // Hợp đồng đến ngày
      field: 'expireDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_INS_PROGRAM,   // Chương trình bảo hiểm  
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_MONEY,   // 	Số tiền
      field: 'moneyIns',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_FAMILY_MEMBER_NAME,  // 	Họ tên người thân  
      field: 'familyMemberName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_FAMILY_MEMBER_RELATIONSHIP,  // 	Mối quan hệ
      field: 'relationshipName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_FAMILY_MEMBER_DATE_OF_BIRTH,  // 	Ngày sinh
      field: 'familyMemberBirthDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_FAMILY_MEMBER_IDENTITY_NO,  // 	Số CMND
      field: 'familyMemberIdNo',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_PAYEE,  // 	Đối tượng chi trả
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_JOIN_DATE,  // 	Ngày tham gia
      field: 'joinDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_EFFECTIVE_DATE,  // 	Ngày hiệu lực
      field: 'effectDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_INS_AMOUNT,  // 	Số tiền bảo hiểm
      field: 'moneyIns',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_REDUCE_DATE,  // 	Ngày báo giảm
      field: 'reduceDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_REFUND,  // 	Số tiền hoàn lại
      field: 'refund',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_RECEIVE_DATE,  // 	Ngày nhận tiền
      field: 'dateReceiveMoney',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_RECEIVER,  // 		Người nhận tiền
      field: 'empReceiveMoney',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_NOTE,  // 			Ghi chú
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_JOB_ORDER_NUM, 
      field: 'jobOrderNum',
      type: 'string',
      align: 'right',
      width: 0,
      hidden: true,
    },
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
    private organizationService: OrganizationService
  ) {
    super(mls);
    this.defaultAvatar = ras.get();

    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
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

}
