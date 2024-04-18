import { Component, ViewChild, TemplateRef, AfterViewInit, Input, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@microsoft/signalr';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, IGenerateTemplateRequest, MultiLanguageService, RandomAvatarService, OrganizationService, LayoutService, AlertService, ICoreButtonVNS, EnumCoreButtonVNSCode } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-profile-recruitment',
  templateUrl: './profile-recruitment.component.html',
  styleUrl: './profile-recruitment.component.scss'
})
export class ProfileRecruitmentComponent extends BaseComponent implements AfterViewInit {
  @Input() hideHeader!: boolean;
  @Input() height!: number;

  @ViewChild('avatar') avatar!: TemplateRef<any>;
  @ViewChild('isWorkPermit') isWorkPermit!: TemplateRef<any>;
  /* START: Local filter params */
  orgIds!: number[];
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  loading!: boolean;
  title = EnumTranslateKey.UI_COMPONENT_TITLE_RC_RECRUITMENT;


  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.RC_CANDIDATE_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.RC_CANDIDATE_DELETE_IDS,
  };

  avatarTemplate!: TemplateRef<any>;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_AVATAR, // avatar ung viên
      field: 'avatar',
      type: 'string',
      align: 'center',
      hideSearchBox: true,
      width: 80,
      templateRef: this.avatarTemplate,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_CODE, // mã ứng viên
      field: 'candidateCode',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_NAME, // tên ứng viên
      field: 'fullnameVn',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.NORMALIZE_HUMAN_NAME,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_GENDER, // giới tính
      field: 'genderName',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_IS_PERMIT, // giấy phép lao động
      field: 'isWorkPermit',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_SOURCE_CANDIDATE, // nguồn ứng viên
      field: 'rcSourceRecName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_COMPANY_NAME, // tên công ty
      field: 'companyName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_POS_WISH1, // vị trí mong muốn1
      field: 'wantedLocation1Name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_POS_WISH2, // vị trí mong muốn1
      field: 'wantedLocation2Name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_LEVEL_SAL, // mức lương mong muốn
      field: 'levelSalaryWish',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_NUM_PERMIT, // số giấy phép lao động
      field: 'workPermitNo',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_PERMIT_FROM, // gpld từ
      field: 'permitStartDate',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_PERMIT_TO, // gpld đến
      field: 'permitEndDate',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_UPDATED_DATE, // ngày chỉnh sửa
      field: 'updatedDate',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_STATUS_CANDIDATE, // trạng thái tuyển dụng
      field: 'statusId',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ];

  defaultAvatar!: string;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };

  generateTemplateRequest!: IGenerateTemplateRequest;

  id: any;

  /* End Properties being passed to core-page-list */

  constructor(
    public override mls: MultiLanguageService,
    private ras: RandomAvatarService,
    private router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private http: HttpClient,
    private layoutService: LayoutService,
    private alertService: AlertService,
  ) {
    super(mls);
    this.defaultAvatar = ras.get();
  }

  override ngOnInit(): void {
    // Nếu chiều cao height của StaffProfileComponent không được truyền vào
    // Thì chiều cao của nó sẽ bằng giá trị biến thiên của contentContainerHeight$
    // trừ đi khoảng paddingBottom (basicSpacing) 
    if (!this.height) {
      this.subscriptions.push(
        this.layoutService.contentContainerHeight$.subscribe(x => {
          this.height = x - this.layoutService.basicSpacing;
        })
      )
    }
    //============================================================================
  }

  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'avatar')[0].templateRef =
      this.avatar;
  }


  onRowDoubleClick(e: any) {
    this.router.navigate([btoa(e.id.toString())], { relativeTo: this.route });
  }

  selectedIds: any[] = [];

  onSelectedIdsChange1(e: string[] | number[]) {
    this.selectedIds = e;
    console.log(this.selectedIds);
  }

  onRowClick(e: any) {
    this.id = e.id;
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    console.log('StaffProfileComponent onCorePageHeaderButtonClick', e);
    let filename = '';
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        this.router.navigate(['app-profile-recruitment-edit'], {
          relativeTo: this.route,
        });
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        this.router.navigate([btoa(this.id.toString())], {
          relativeTo: this.route,
        });
        break;
      case EnumCoreButtonVNSCode.HEADER_DELETE:
        break;
      case EnumCoreButtonVNSCode.HEADER_UPDATE:
        console.log(this.selectedIds[0]);
        break;
      default:
        break;
    }
  }
}

