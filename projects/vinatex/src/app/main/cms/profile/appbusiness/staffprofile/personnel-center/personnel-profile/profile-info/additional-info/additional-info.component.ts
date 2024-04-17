import { Component, ElementRef, OnInit, ViewChild, isDevMode } from '@angular/core';
import { ProfileInfoService } from '../profile-info.service';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, ICoreViewSection, EnumCoreViewItemType, EnumCoreTablePipeType, MultiLanguageService, AppService, AlertService, ResponseService, IFormatedResponse, alertOptions } from 'ngx-histaff-alpha';
import { filter } from 'rxjs';
import { PersonnelCenterService } from '../../../personnel-center.service';


interface IAdditionalInfo{
  passport : string;
  passDate : string;
  passDateExpired : string;
  passAddress : string;
  visa : string;
  visaDate : string;
  visaDateExpired:string;
  visaAddress : string;
  laborBookNumber : string;
  laborBookDate : string;
  laborBookDateExpired : string; //ngày hết hạn sổ lao động
  laborBookAddress : string; //địa chỉ cấp số lao động
  carrer : string; //nghề nghiệp
  insArea : string; // vùng bảo hiểm
  insNumber : string; //số bảo hiểm
  healthCareAddress : string; //địa chỉ nơi khám chữa bệnh
  insCardNumber : string; // số thẻ bảo hiểm y tế
  familyMember : string; //thành phần gia đình
  familyPolicy : string; //gia đình chính sách
  veterans : string; // thương binh
  politicalTheory : string; //lý luận chính trị
  careerBeforeRecruitment : string; // nghề nghiệp trước khi tuyển dụng
  titleConferred : string //danh hiệu được phong
  schoolOfWork : string //Sở trường công tác
}

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss']
})


export class AdditionalInfoComponent extends BaseComponent implements OnInit {

  @ViewChild('container') container!: ElementRef;
  getAdditionalApi: api = api.HU_EMPLOYEE_CV_GET_ADDITIONAL_INFO;
  data!: IAdditionalInfo;
  boundSuccess!: boolean; 
  sections: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'passport',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'passDate',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_DATE,
            pipe : EnumCoreTablePipeType.DATE,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'passDateExpired',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_DATE_EXPERIOD,
            pipe : EnumCoreTablePipeType.DATE,
          },
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 12,
            field: 'passAddress',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_ADDRESS,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'visa',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_VISA,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'visaDate',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_VISA_DATE,
            pipe : EnumCoreTablePipeType.DATE,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'visaDateExpired',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_VISA_DATE_EXPERIOD,
            pipe : EnumCoreTablePipeType.DATE,

          },
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'visaAddress',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_VISA_ADDRESS,
          } 
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'insArea',
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_INSURENCE_AREA,
            controlType: EnumCoreViewItemType.TEXT,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'insNumber',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_INSURENCE_NUMBER,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'insCardNumber',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_INSURENCE_CARD_NUMBER,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'insWhereHealthName',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_MEDICAL_EXAM_PLACE,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'laborBookNumber',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LABOR_BOOK_NUMBER,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'laborBookDate',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LABOR_BOOK_DATE,
            pipe : EnumCoreTablePipeType.DATE,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'laborBookDateExpired',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LABOR_BOOK_DATE_EXPERIOD,
            pipe : EnumCoreTablePipeType.DATE,
          }
        ],
        // [
        //   {
        //     labelFlexSize: 0,
        //     flexSize: 4,
        //     field: 'carrer',
        //     controlType: EnumCoreViewItemType.TEXT,
        //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LABOR_CAREER,
        //   },
        //   {
        //     labelFlexSize: 0,
        //     flexSize: 4,
        //     field: 'laborBookAddress',
        //     controlType: EnumCoreViewItemType.TEXT,
        //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LABOR_BOOK_ADDRESS,
        //   },
        //   {
        //     labelFlexSize: 0,
        //     flexSize: 4,
        //     field: 'careerBeforeRecruitment',
        //     controlType: EnumCoreViewItemType.TEXT,
        //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_CREATE_BEFORE_RECUITMENT,
        //   }
        // ],
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'familyMember',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_FAMILY_NUMBER,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'familyPolicy',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_FAMILY_MATTER,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'schoolOfWork',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_CREATE_SCHOOL_OF_WORK,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'veterans',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_VETERANS,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'titleConferred',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TITLE_CONFERRED,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'politicalTheory',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_SOCIAL_THEORY,
          }
        ],
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
          this.appService.get(this.getAdditionalApi + "/" + x.id).subscribe(res => {
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
                this.alertService.error(this.getAdditionalApi + "/" + x.id + ' failed!', alertOptions)
              }
            }
          })
        )
      })
    )
  }

}
