import { Component, ElementRef, OnInit, ViewChild, isDevMode } from '@angular/core';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, ICoreViewSection, EnumCoreViewItemType, EnumCoreTablePipeType, MultiLanguageService, AppService, AlertService, ResponseService, IFormatedResponse, alertOptions } from 'ngx-histaff-alpha';
import { filter } from 'rxjs';
import { ProfileRecruitmentCenterService } from '../../../profile-recruitment-center.service';
import { ProfileInfoService } from '../profile-info.service';

interface ICV {
  id: number;
  gender: string;
  maritalStatus: string;
  nation: string;
  religion : string;
  nationality: string;
  birthDate: string;
  birthAddress: string;
  idNo: string;
  idDate: string;
  idDateExpire: string;
  idPlace: string;
  perAddress: string;
  perProvince: string;
  perDistrict: string;
  perWard: string;
  contactAddressTemp: string;
  contactProvinceTemp: string;
  contactDistrictTemp: string;
  contactWardTemp: string;
  perEmail: string;
  mobilePhone: string;
  finderSdt: string;
  isWorkPermit: string;
}

@Component({
  selector: 'app-candidate-cv',
  standalone: false,
  templateUrl: './candidate-cv.component.html',
  styleUrl: './candidate-cv.component.scss'
})

export class CandidateCvComponent extends BaseComponent implements OnInit {

  @ViewChild('container') container!: ElementRef;

  getCvApi: api = api.RC_CANDIDATE_CV_GET_CV;
  data!: ICV;
  boundSuccess!: boolean;

  /* --------------- Thông tin cá nhân --------------- */
  sections1: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            // Giới tính
            labelFlexSize: 0,
            flexSize: 4,
            field: 'gender',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_GENDER,
          },
          {
            // Tình trạng hôn nhân
            labelFlexSize: 0,
            flexSize: 4,
            field: 'maritalStatus',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_MARITAL_STATUS,
          },
          {
            // Dân tộc
            labelFlexSize: 0,
            flexSize: 4,
            field: 'nation',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NATION,
          }
        ],
        [
          {
            // Tôn giáo
            labelFlexSize: 0,
            flexSize: 4,
            field: 'religion',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_RELIGION,
          },
          {
            // Quốc tịch
            labelFlexSize: 0,
            flexSize: 4,
            field: 'nationality',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NATIONALITY,
          },
          {
            // Ngày sinh
            labelFlexSize: 0,
            flexSize: 4,
            field: 'birthDate',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTHDAY,
            pipe : EnumCoreTablePipeType.DATE,
          },
        ],
        [
          {
            // Nơi sinh
            labelFlexSize: 0,
            flexSize: 4,
            field: 'birthAddress',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_ADDRESS,
          },
          {
            // Số CMND/CCCD
            labelFlexSize: 0,
            flexSize: 4,
            field: 'idNo',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER,
          },
          {
            // Ngày cấp CCCD
            labelFlexSize: 0,
            flexSize: 4,
            field: 'idDate',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_DATE,
            pipe : EnumCoreTablePipeType.DATE,
          },
        ],
        [
          {
            // Ngày hết hạn CCCD
            labelFlexSize: 0,
            flexSize: 4,
            field: 'idDateExpire',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_DATE_EXPIRE,
            pipe : EnumCoreTablePipeType.DATE,
          },
          {
            // Địa chỉ cấp CCCD 
            labelFlexSize: 0,
            flexSize: 4,
            field: 'idPlace',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_ADDRESS,
          }
        ],
      ]
    }
  ]

  /* --------------- Thông tin liên hệ --------------- */
  sections2: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            // Địa chỉ thường trú
            labelFlexSize: 0,
            flexSize: 12,
            field: 'perAddress',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_ADDRESS,
          },
        ],
        [
          {
            // Tỉnh/thành phố(thường trú)
            labelFlexSize: 0,
            flexSize: 4,
            field: 'perProvince',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CITY,
          },
          {
            // Quận/huyện thường trú
            labelFlexSize: 0,
            flexSize: 4,
            field: 'perDistrict',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_DISTRICT,
          },
          {
            // Xã/phường(thường trú)
            labelFlexSize: 0,
            flexSize: 4,
            field: 'perWard',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_WARD,
          },
        ],
        [
          {
            // Địa chỉ tạm trú
            labelFlexSize: 0,
            flexSize: 12,
            field: 'contactAddressTemp',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_ADDRESS,
          }
        ],
        [
          {
            // Tỉnh/thành(tạm trú)
            labelFlexSize: 0,
            flexSize: 4,
            field: 'contactProvinceTemp',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_CITY,
          },
          {
            // Quận/huyện(tạm trú)
            labelFlexSize: 0,
            flexSize: 4,
            field: 'contactDistrictTemp',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_DISTRICT,
          },
          {
            // Xã/phường(tạm trú)
            labelFlexSize: 0,
            flexSize: 4,
            field: 'contactWardTemp',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_WARD,
          },
        ],
        [
          {
            // email cá nhân 
            labelFlexSize: 0,
            flexSize: 4,
            field: 'perEmail',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_EMAIL_PERSONAL,
          },
          {
            // SĐT di động 
            labelFlexSize: 0,
            flexSize: 4,
            field: 'mobilePhone',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_TELEPHONE,
          },
          {
            // Điện thoại cố định 
            labelFlexSize: 0,
            flexSize: 4,
            field: 'finderSdt',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_LANDLINE_PHONE,
          },
        ],
        [
          {
            // Đã có GPLĐ 
            labelFlexSize: 0,
            flexSize: 4,
            field: 'isWorkPermit',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_PERMIT,
          }
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
