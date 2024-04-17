import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageListComponent, CorePageHeaderComponent, CoreCompositionComponent, CoreOrgTreeComponent, CoreStatusStickerComponent, BaseComponent, IFilterOperator, EnumFilterOperator, IInOperator, ISortItem, EnumSortDirection, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, RandomAvatarService, OrganizationService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ins-maternity-mng',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CorePageListComponent,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreOrgTreeComponent,
    CoreStatusStickerComponent
  ],
  templateUrl: './ins-maternity-mng.component.html',
  styleUrl: './ins-maternity-mng.component.scss'
})
export class InsMaternityMngComponent extends BaseComponent implements AfterViewInit{
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  @Input() hideHeader!: boolean;

  /* START: Local filter params */
  orgIds!: number[];
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  title = EnumTranslateKey.UI_COMPONENT_TITLE_INS_MATERNITY_MNG
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
    queryListRelativePath: api.INS_MATERNITY_MNG_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.INS_MATERNITY_MNG_DELETE_IDS,
    toggleActiveIds: api.INS_MATERNITY_MNG_TOGGLE_ACTIVE_IDS,
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_EMPLOYEE_CODE, // Mã NV
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_EMPLOYEE_NAME, // Họ và tên
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_EMPLOYEE_DEPARTMENT, // Ban/Phòng
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 250
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_EMPLOYEE_POSITION, // Vị trí
      field: 'posName',
      type: 'string',
      align: 'left',
      width: 250
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_FROM_DATE,  // Nghỉ sinh từ ngày
      field: 'fromDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_TO_DATE, // Nghỉ sinh tới ngày
      field: 'toDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_FROM_DATE_ENJOY,  // Ngày hưởng chế độ thai sản
      field: 'fromDateEnjoy',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_TO_DATE_ENJOY,  // Ngày kết thúc hưởng chế độ thai sản
      field: 'toDateEnjoy',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_TIEN_TAM_UNG,  // Tiền tạm ứng
      field: 'tienTamUng',
      type: 'number',
      pipe: EnumCoreTablePipeType.NUMBER,
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_IS_NGHI_THAI_SAN,   // Nghỉ thai sản
      field: 'isNghiThaiSan',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_NGAY_DI_LAM_SOM,   // Ngày đi làm sớm 
      field: 'ngayDiLamSom',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_INSURANCE_NO,   // 	Số sổ bảo hiểm
      field: 'insuranceNo',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_NGAY_DU_SINH,  // 	Ngày dự sinh  
      field: 'ngayDuSinh',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_MNG_SO_CON,  // 	Số con
      field: 'soCon',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_NOTE,  // 	Ghi chú
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
