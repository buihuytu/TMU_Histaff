import { Component, ElementRef, OnInit, ViewChild, isDevMode } from '@angular/core';

import { ProfileRecruitmentCenterService } from '../../../profile-recruitment-center.service';
import { ProfileInfoService } from '../profile-info.service';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, ICoreViewSection, EnumCoreViewItemType, MultiLanguageService, AppService, AlertService, ResponseService, IFormatedResponse, alertOptions } from 'ngx-histaff-alpha';
import { filter } from 'rxjs';

interface IINFOOTHER {
  id: number;
  reName: string;
  reRelationship: string;
  rePhone: string;
  reAddress : string;
  inName: string;
  inPhone: string;
  inNote: string;
  height: string;
  earNoseThroat: string;
  weight: string;
  dentomaxillofacial: string;
  bloodGroup: string;
  heart: string;
  bloodPressure: string;
  lungsAndChest: string;
  leftEyeVision: string;
  rightEyeVision: string;
  hepatitisB: string;
  leatherVenereal: string;
  healthType: string;
  noteSk: string;
}

@Component({
  selector: 'app-info-other',
  standalone: false,
  templateUrl: './info-other.component.html',
  styleUrl: './info-other.component.scss'
})
export class InfoOtherComponent extends BaseComponent implements OnInit {
  @ViewChild('container') container!: ElementRef;

  getCvApi: api = api.RC_CANDIDATE_CV_GET_INFO_OTHER;
  data!: IINFOOTHER;
  boundSuccess!: boolean;

  /* --------------- Thông tin người thân --------------- */
  sections1: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            // Họ tên người thân
            labelFlexSize: 0,
            flexSize: 4,
            field: 'reName',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPOYEE_NAME,
          },
          {
            // Mối quan hệ
            labelFlexSize: 0,
            flexSize: 4,
            field: 'reRelationship',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_FAMILY_MEMBER_RELATIONSHIP,
          },
          {
            // Số điện thoại
            labelFlexSize: 0,
            flexSize: 4,
            field: 'rePhone',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PHONE_NUMBER,
          }
        ],
        [
          {
            // Địa chỉ
            labelFlexSize: 0,
            flexSize: 12,
            field: 'reAddress',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_ADDRESS,
          },
        ],
      ]
    }
  ]

  /* --------------- Thông tin người giới thiệu --------------- */
  sections2: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            // Họ và tên người giới thiệu
            labelFlexSize: 0,
            flexSize: 6,
            field: 'inName',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPOYEE_NAME,
          },
          {
            // Quận/huyện thường trú
            labelFlexSize: 0,
            flexSize: 6,
            field: 'inPhone',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PHONE_NUMBER,
          },
        ],
        [
          {
            // Ghi chú
            labelFlexSize: 0,
            flexSize: 12,
            field: 'inNote',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
          }
        ],
      ]
    }
  ]

  /* --------------- Thông tin sức khỏe --------------- */
  sections3: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            // Chiều cao(cm)
            labelFlexSize: 0,
            flexSize: 4,
            field: 'height',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEIGHT,
          },
          {
            // Tai, mũi, họng 
            labelFlexSize: 0,
            flexSize: 4,
            field: 'earNoseThroat',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EAR_NOSE_THROAT,
          },
          {
            // Cân nặng(kg) 
            labelFlexSize: 0,
            flexSize: 4,
            field: 'contactAddressTemp',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_WEIGHT,
          },
        ],
        [
          {
            // Răng hàm mặt
            labelFlexSize: 0,
            flexSize: 4,
            field: 'dentomaxillofacial',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_DENTISTRY,
          },
          {
            // Nhóm máu
            labelFlexSize: 0,
            flexSize: 4,
            field: 'bloodGroup',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BLOODGROUP,
          },
          {
            // Tim 
            labelFlexSize: 0,
            flexSize: 4,
            field: 'heart',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEART,
          },
        ],
        [
          {
            // Huyết áp 
            labelFlexSize: 0,
            flexSize: 4,
            field: 'bloodPressure',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BLOOD_PRESSURE,
          },
          {
            // Phổi và ngực 
            labelFlexSize: 0,
            flexSize: 4,
            field: 'lungsAndChest',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LUNGS_AND_CHEST,
          },
          {
            // Thị lực mắt trái
            labelFlexSize: 0,
            flexSize: 4,
            field: 'leftEyeVision',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LEFT_EYE,
          },
        ],
        [
          {
            // Thị lực mắt phải
            labelFlexSize: 0,
            flexSize: 4,
            field: 'rightEyeVision',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_RIGHT_EYE,
          },
          {
            // Viêm gan B
            labelFlexSize: 0,
            flexSize: 4,
            field: 'hepatitisB',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEPATITIS_B,
          },
          {
            // Da và hoa liễu
            labelFlexSize: 0,
            flexSize: 4,
            field: 'leatherVenereal',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_OFFICAL_DATE,
          },
        ],
        [
          {
            // Loại sức khỏe 
            labelFlexSize: 0,
            flexSize: 3,
            field: 'healthType',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEATH_TYPE,
          },
          {
            // Ghi chú sức khỏe
            labelFlexSize: 0,
            flexSize: 9,
            field: 'noteSk',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
          },
        ],
      ]
    }
  ]

  constructor(
    public override mls: MultiLanguageService,
    public profileRecruitmentCenterService: ProfileRecruitmentCenterService,
    private appService: AppService,
    private alertService: AlertService,
    private responseService: ResponseService,
    private profileInfoService: ProfileInfoService
  ) {
    super(mls)
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    );
    this.subscriptions.push( // <== outer push
      this.profileRecruitmentCenterService.candidateCv$.pipe(filter(cv => !!cv)).subscribe(x => {
        this.subscriptions.push( // <== inner push
          this.appService.get(this.getCvApi + x.id).subscribe(res => {
            if (res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200) {
                this.data = body.innerBody;
                // bind data to the items the sections
                this.sections1.map(section => {
                  section.rows.map(row => {
                    row.map(item => {
                      item.value = (this.data as any)[item.field]
                    })
                  })
                })

                this.sections2.map(section => {
                  section.rows.map(row => {
                    row.map(item => {
                      item.value = (this.data as any)[item.field]
                    })
                  })
                })

                this.sections3.map(section => {
                  section.rows.map(row => {
                    row.map(item => {
                      item.value = (this.data as any)[item.field]
                    })
                  })
                })

                this.boundSuccess = true;
              } else {
                if (isDevMode()) {
                  //this.responseService.resolve(body);
                }
              }
            } else {
              if (isDevMode()) {
                this.alertService.error(this.getCvApi + x.id + ' failed!', alertOptions)
              }
            }
          })
        )
      })
    )
  }
}
