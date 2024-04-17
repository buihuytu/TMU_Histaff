import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageListComponent, CoreOrgTreeComponent, CoreCompositionComponent, BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, IInOperator, ICoreTableColumnItem, MultiLanguageService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-hu-com-planning-manage',
  standalone: true,
  imports: [
    CorePageListComponent,
    CoreOrgTreeComponent,
    CoreCompositionComponent,
    FormsModule
  ],
  templateUrl: './hu-com-planning-manage.component.html',
  styleUrl: './hu-com-planning-manage.component.scss'
})
export class HuComPlanningManageComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_COM_PLANNING_MANAGE_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_COM_PLANNING_MANAGE_DELETE_IDS,
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
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_EMP_NUM_INFO_COM,//SO LY LICH DANG VIEN
      field: 'id',
      type: 'string',
      align: 'left',
      width: 200,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_EMP_NUM_INFO_COM,//SO LY LICH DANG VIEN
      field: 'numInfoCom',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_EMP_NAME,//HO VA TEN
      field: 'empName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_EMP_BIRTH_DAY,//NGAY SINH
      field: 'birthDay',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_EMP_AFFILIATD_PARTY_COM,//DANH BO TRUC THUOC
      field: 'partyCom',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_EMP_PARTY_BRANCH,//CHI BO DANG
      field: 'partyBranch',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_POSITION_NAME,//CHUC DANH 
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_PARTY_TITLE,//CHUC DANH ĐẢNG
      field: 'partyTitle',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_PLANNING_TITLE,//CHUC QUY HOACH
      field: 'planningTitle',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_TERM_FROM_YEAR,//NHIEM KY TU NAM
      field: 'ternFromYear',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_TERM_TO_YEAR,//NHIEM KY DEN NAM
      field: 'termToYear',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_TYPE_OF_PLANNING,//LOAI QUY HOACH
      field: 'typeOfPlanning',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_EVALUATE,//DANH GIA
      field: 'evaluate',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_NUM_DECISION,//SO QUYT DINH
      field: 'numSecision',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_SIGNER,//NGUOI KY
      field: 'empSigner',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_SIGNER_POSITION,//CHUC DANH NGUOI KY
      field: 'positionSigner',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_SIGN_DAY,//NGAY KY
      field: 'signDay',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_PLANNING_MANAGE_NOTE,//GHI CHU
      field: 'note',
      type: 'string',
      align: 'left',
      width: 220,
    },
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
