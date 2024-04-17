import { Component, ElementRef, OnInit, ViewChild, isDevMode } from '@angular/core';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, ICoreViewSection, EnumCoreViewItemType, MultiLanguageService, AppService, AlertService, ResponseService, IFormatedResponse, alertOptions } from 'ngx-histaff-alpha';
import { filter } from 'rxjs';
import { ProfileRecruitmentCenterService } from '../../../profile-recruitment-center.service';
import { ProfileInfoService } from '../profile-info.service';


interface ILevelInfo {
  id: number;
  educationLevel: string;
  learningLevel: string;
  graduateSchool: string;
  majorId: string;
  yearGraduation: string;
  rating: string;
  rcComputerLevel: string;
  typeClassification: string;
  language: string;
  languageLevel: string;
  mark: string;
}

@Component({
  selector: 'app-level-info',
  standalone: false,
  templateUrl: './level-info.component.html',
  styleUrl: './level-info.component.scss'
})
export class LevelInfoComponent extends BaseComponent implements OnInit {

  @ViewChild('container') container!: ElementRef;

  getCvApi: api = api.RC_CANDIDATE_CV_GET_LEVEL_INFO;
  data!: ILevelInfo;
  boundSuccess!: boolean;

  /* --------------- Thông tin cá nhân --------------- */
  sections1: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            // Trình độ văn hóa
            labelFlexSize: 0,
            flexSize: 4,
            field: 'educationLevel',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_EDUCATION_LEVEL,
          },
          {
            // Trình độ học vấn
            labelFlexSize: 0,
            flexSize: 4,
            field: 'learningLevel',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LEARNING_LEVEL,
          },
          {
            // Trường học
            labelFlexSize: 0,
            flexSize: 4,
            field: 'graduateSchool',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SCHOOLE,
          }
        ],
        [
          {
            // Chuyên ngành
            labelFlexSize: 0,
            flexSize: 4,
            field: 'majorId',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MAJOR_ID,
          },
          {
            // Năm tốt nghiệp
            labelFlexSize: 0,
            flexSize: 4,
            field: 'yearGraduation',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_MARITAL_STATUS,
          },
          {
            // xếp loại
            labelFlexSize: 0,
            flexSize: 4,
            field: 'rating',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_RATING,
          }
        ],
      ]
    }
  ]

  /* --------------- Trình độ tin học --------------- */
  sections2: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            // trình độ tin học
            labelFlexSize: 0,
            flexSize: 12,
            field: 'rcComputerLevel',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_COMPUTER_SKILL,
          },
          {
            // Loại xếp loại/chứng chỉ
            labelFlexSize: 0,
            flexSize: 12,
            field: 'typeClassification',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_TYPE_CLASSIFICATION_ID,
          },
        ],
      ]
    }
  ]

  /* --------------- Trình độ ngoại ngữ --------------- */
  sections3: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            // Ngôn ngữ
            labelFlexSize: 0,
            flexSize: 12,
            field: 'language',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LANGUAGE_1,
          },
          {
            // Trình độ ngoại ngữ
            labelFlexSize: 0,
            flexSize: 12,
            field: 'languageLevel',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LANGUAGE_LEVEL_1,
          },
          {
            // Điểm số/xếp loại
            labelFlexSize: 0,
            flexSize: 12,
            field: 'mark',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_MARK,
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
