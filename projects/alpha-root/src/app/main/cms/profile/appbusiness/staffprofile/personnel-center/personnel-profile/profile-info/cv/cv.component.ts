import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, isDevMode } from '@angular/core';
import { ProfileInfoService } from '../profile-info.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICoreViewSection, EnumCoreViewItemType, EnumCoreTablePipeType, MultiLanguageService, AppService, AlertService, ResponseService, IFormatedResponse, alertOptions } from 'ngx-histaff-alpha';
import { filter } from 'rxjs';
import { PersonnelCenterService } from '../../../personnel-center.service';


interface ICV {
  id: number;
  gender: string;
  birthDay: string;
  nationality: string;
  nation: string;
  domicile : string;
  birthPlace : string;
  religion : string;
  maritalStatus : string;
  identityNumber : string;
  dateIdentity : string;
  addressIdentity : string;
  taxCode : string;
  taxCodeDate :string;
  taxCodeAddress : string;
  bloodGroup :string;
  height:string;
  weight:string;
  bloodPressure : string;
  healthType : string;
  leftEye : string;
  rightEye : string;
  heart : string;
  examinationDate : string;
  healthNotes : string;
}
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent extends BaseComponent implements OnInit {

  @ViewChild('container') container!: ElementRef;

  getCvApi: api = api.HU_EMPLOYEE_CV_GET_CV;
  data!: ICV;
  boundSuccess!: boolean;

  sections: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            // note: đây là trường giới tính
            labelFlexSize: 0,
            flexSize: 4,
            field: 'gender',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_GENDER_NAME,
          },
          {
            // đây là ngày sinh
            labelFlexSize: 0,
            flexSize: 4,
            field: 'birthDay',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_BIRTH_DATE,
            pipe : EnumCoreTablePipeType.DATE,
          },
          {
            // đây là dân tộc
            labelFlexSize: 0,
            flexSize: 4,
            field: 'nation',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NATION,
          }
        ],
        [
          {
            // đây là quốc tịch
            labelFlexSize: 0,
            flexSize: 4,
            field: 'nationality',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NATIONALITY,
          },
          {
            // nơi đăng ký giấy khai sinh
            labelFlexSize: 0,
            flexSize: 4,
            field: 'birthRegisAddress',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_REGIS_ADDRESS,
          }
        ],
        [
          {
            // đây là nguyên quán
            labelFlexSize: 0,
            flexSize: 4,
            field: 'domicile',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_DOMICILE,
          },
          {
            // đây là nơi sinh
            labelFlexSize: 0,
            flexSize: 4,
            field: 'birthPlace',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_ADDRESS,
          }
        ],
        [
          {
            // đây là tôn giáo
            labelFlexSize: 0,
            flexSize: 4,
            field: 'religion',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_RELIGION,
          },
          {
            // đây là tình trạng hôn nhân
            labelFlexSize: 0,
            flexSize: 4,
            field: 'maritalStatus',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_MARITAL_STATUS,
          },
          {
            // đây là số CMND/CCCD
            labelFlexSize: 0,
            flexSize: 4,
            field: 'identityNumber',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER,
          }
        ],
        [
          {
            // đây là ngày cấp CMND/CCCD
            labelFlexSize: 0,
            flexSize: 4,
            field: 'dateIdentity',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_DATE,
            pipe : EnumCoreTablePipeType.DATE,
          },
          {
            // đây là nơi cấp CMND/CCCD
            labelFlexSize: 0,
            flexSize: 4,
            field: 'addressIdentity',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_ADDRESS,
          }
        ],
        [
          {
            // đây là mã số thuế
            labelFlexSize: 0,
            flexSize: 4,
            field: 'taxCode',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TAX_CODE,
          },
          {
            // đây là ngày cấp mã số thuế
            labelFlexSize: 0,
            flexSize: 4,
            field: 'taxCodeDate',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TAX_CODE_DATE,
            pipe : EnumCoreTablePipeType.DATE,
          },
          {
            // đây là nơi cấp mã số thuế
            labelFlexSize: 0,
            flexSize: 4,
            field: 'taxCodeAddress',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TAX_CODE_ADDRESS,
          }
        ],
        [
          {
            // đây là nhóm máu
            labelFlexSize: 0,
            flexSize: 4,
            field: 'bloodGroup',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BLOODGROUP,
          },
          {
            // đây là chiều cao
            labelFlexSize: 0,
            flexSize: 4,
            field: 'height',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEIGHT,
          },
          {
            // đây là cân nặng
            labelFlexSize: 0,
            flexSize: 4,
            field: 'weight',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_WEIGHT,
          }
        ],
        [
          {
            // đây là huyết áp
            labelFlexSize: 0,
            flexSize: 4,
            field: 'bloodPressure',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BLOOD_PRESSURE,
          },
          {
            // đây là loại sức khỏe
            labelFlexSize: 0,
            flexSize: 4,
            field: 'healthType',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEATH_TYPE,
          },
          {
            // đây là mắt trái
            labelFlexSize: 0,
            flexSize: 4,
            field: 'leftEye',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LEFT_EYE,
          }
        ],
        [
          {
            // đây là mắt phải
            labelFlexSize: 0,
            flexSize: 4,
            field: 'rightEye',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_RIGHT_EYE,
          },
          {
            // đây là tim
            labelFlexSize: 0,
            flexSize: 4,
            field: 'heart',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEART,
          },
          {
            // đây là ngày khám
            labelFlexSize: 0,
            flexSize: 4,
            field: 'examinationDate',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_DATE_MEDICAL_EXAM,
            pipe : EnumCoreTablePipeType.DATE,
          }
        ],
        [
          {
            // đây là ghi chú sức khỏe
            labelFlexSize: 0,
            flexSize: 12,
            field: 'healthNotes',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEALTH_NOTE,
          }
        ]
      ]
    }
  ]

  constructor(
    public override mls: MultiLanguageService,
    public personnelCenterService: PersonnelCenterService,
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
      this.personnelCenterService.employeeCv$.pipe(filter(cv => !!cv)).subscribe(x => {
        this.subscriptions.push( // <== inner push
          this.appService.get(this.getCvApi + "/" + x.id).subscribe(res => {
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

                this.boundSuccess = true;
              } else {
                if (isDevMode()) {
                  //this.responseService.resolve(body);
                }
              }
            } else {
              if (isDevMode()) {
                this.alertService.error(this.getCvApi + "/" + x.id + ' failed!', alertOptions)
              }
            }
          })
        )
      })
    )
  }
  
}
