import { Component, OnInit, ViewChild, ElementRef, isDevMode } from "@angular/core";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, ICoreViewSection, EnumCoreViewItemType, EnumCoreTablePipeType, MultiLanguageService, AppService, AlertService, ResponseService, IFormatedResponse, alertOptions } from "ngx-histaff-alpha";
import { filter } from "rxjs";
import { PersonnelCenterService } from "../../../personnel-center.service";
import { ProfileInfoService } from "../profile-info.service";


interface IPoliticalOrganization{
  isUnionist : boolean; //Đoàn viên ĐTN
  unionistPosition : string; //Chức vụ ĐTN
  unionistDate : string; //	Ngày vào ĐTN
  unionistAddress : string; //Nơi vào ĐTN
  isJoinYouthGroup : string; //Đã tham gia ĐTN hay chưa
  youthGroupPosition : string; //Chức vụ công đoàn
  youthGroupDate : string; //Ngày vào công đoàn
  youthGroupAddress : string; //Nơi vào công đoàn
  youthSaveNationDate : string //Ngày vào hội thanh niên cứu quốc
  youthSaveNationPosition : string //vị trí hội thanh niên cứu quốc
  youthSaveNationAddress : string // Địa chỉ hội thanh niên cứu quốc
  isMember : boolean; //	Đảng viên
  memberPosition : string; //Chức vụ Đảng
  memberDate : string; //Ngày vào Đảng
  memberAddress : string; // Nơi vào Đảng
  livingCell : string; //Chi bộ sinh hoạt
  cardNumber : string; //Số thẻ Đảng
  politicalTheoryLevel : string; //TĐ Lý luận chính trị
  resumeNumber : string; //Số lý lịch
  vateransMemberDate : string; //Ngày vào hội cựu chiến binh
  vateransPosition : string; //Chức vụ cựu chiến binh
  vateransAddress : string; //
  enlistmentDate : string; //ngày nhập ngũ
  dischargeDate : string; //ngày xuất ngũ
  highestMilitaryPosition : string; // Quân hàm chức vụ cao nhất
  currentPartyCommittee : string; // Cấp ủy hiện nay
  partytimePartyCommittee : string; // Cấp ủy kiêm nhiệm
  governmentManagement : string // Quản lý nhà nước
}

@Component({
  selector: 'app-political-organization',
  templateUrl: './political-organization.component.html',
  styleUrls: ['./political-organization.component.scss']
})
export class PoliticalOrganizationComponent extends BaseComponent implements OnInit {

  @ViewChild('container') container!: ElementRef;

  getPoliticalBackgroundApi: api = api.HU_EMPLOYEE_CV_GET_POLITICAL_ORGANIZATION;
  data!: IPoliticalOrganization;
  boundSuccess!: boolean; 
  sections: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'youthSaveNationPosition',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_SAVE_NATION_POSITION,
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'youthSaveNationDate',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_SAVE_NATION_DATE,
            pipe : EnumCoreTablePipeType.DATE
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'youthSaveNationAddress',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_SAVE_NATION_ADDRESS,
          },
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'isUnionist',
            controlType: EnumCoreViewItemType.CHECKBOX,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_UNIONIST,
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'unionistPosition',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_UNIONIST_POSITION,
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'unionistDate',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_UNIONIST_DATE,
            pipe : EnumCoreTablePipeType.DATE
          },
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'unionistAddress',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_UNIONIST_ADDRESS,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'isJoinYouthGroup',
            controlType: EnumCoreViewItemType.CHECKBOX,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_IS_JOIN_UNION,
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'youthGroupPosition',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_GROUP_POSITION,
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'youthGroupDate',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_GROUP_DATE,
            pipe : EnumCoreTablePipeType.DATE
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'youthGroupAddress',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_GROUP_ADDRESS,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'isMember',
            controlType: EnumCoreViewItemType.CHECKBOX,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER,
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'memberPosition',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_POSITION,
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'cardNumber',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_CARD_NUMBER,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'resumeNumber',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_RESUME_NUMBER,
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'memberDate',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_DATE,
            pipe : EnumCoreTablePipeType.DATE
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'memberOfficalDate',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_OFFICAL_DATE,
            pipe : EnumCoreTablePipeType.DATE
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'livingCell',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LIVING_CELL,
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'memberAddress',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_ADDRESS,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'enlistmentDate',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_ENLISMENT_DATE,
            pipe : EnumCoreTablePipeType.DATE
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'dischargeDate',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_DISCHARGE_DATE,
            pipe : EnumCoreTablePipeType.DATE
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'highestMilitaryPosition',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_HIGHEST_MILITARY_POSITION,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'vateransPosition',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_VATERANS_POSITION,
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'vateransMemberDate',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_VATERANS_MEMBER_DATE,
            pipe : EnumCoreTablePipeType.DATE
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'vateransAddress',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_VATERANS_ADDRESS,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'politicalTheoryLevel',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_POLITICAL_THEORY_LEVEL,
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'currentPartyCommittee',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_CURRENT_PARTY_COMMITTEE,
          },
          {
            labelFlexSize: 0,
            flexSize: 3,
            field: 'partytimePartyCommittee',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PARTY_COMMITTEE,
          }
          // {
          //   labelFlexSize: 3,
          //   flexSize: 3,
          //   field: 'governmentManagement',
          //   controlType: EnumCoreViewItemType.TEXT,
          //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_GOVERMENT_MANAGEMENT,
          // },
        ]
      ]
    }
  ]

  constructor(
    private profileInfoService: ProfileInfoService,
    public override mls: MultiLanguageService,
    public personnelCenterService: PersonnelCenterService,
    private appService: AppService,
    private alertService: AlertService,
    private responseService: ResponseService,
  ) { 
    super(mls)
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    );
    this.subscriptions.push( // <== outer push
      this.personnelCenterService.employeeCv$.pipe(filter(cv => !!cv)).subscribe(x => {
        this.subscriptions.push( // <== inner push
          this.appService.get(this.getPoliticalBackgroundApi + "/" + x.id).subscribe(res => {
            if (res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200) {
                this.data = body.innerBody;
                // bind data to the items the sections
                this.sections.map(section => {
                  section.rows.map(row => {
                    row.map(item => {
                      item.value = (this.data as any)[item.field]
                    })
                  })
                })

                this.boundSuccess = true;;
              } else {
                if (isDevMode()) {
                  //this.responseService.resolve(body);
                }
              }
            } else {
              if (isDevMode()) {
                this.alertService.error(this.getPoliticalBackgroundApi + "/" + x.id + ' failed!', alertOptions)
              }
            }
          })
        )
      })
    )
  }
  
}
