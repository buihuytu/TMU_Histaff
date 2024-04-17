import { Component, ElementRef, OnInit, ViewChild, isDevMode } from '@angular/core';
import { ProfileInfoService } from '../profile-info.service';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, ICoreViewSection, EnumCoreViewItemType, EnumCoreTablePipeType, MultiLanguageService, AppService, AlertService, ResponseService, IFormatedResponse, alertOptions } from 'ngx-histaff-alpha';
import { filter } from 'rxjs';
import { ProfileRecruitmentCenterService } from '../../../profile-recruitment-center.service';

interface IWISH {
  id: number;
  posWish1: string;
  posWish2: string;
  probationSalary: string;
  wishSalary : string;
  desiredWorkplace: string;
  startDateWork: string;
  levelDesired: string;
  numExperience: string;
  isHsvHv: string;
  otherSuggestions: string;
}

@Component({
  selector: 'app-wish',
  standalone: false,
  templateUrl: './wish.component.html',
  styleUrl: './wish.component.scss'
})
export class WishComponent extends BaseComponent implements OnInit {
  @ViewChild('container') container!: ElementRef;

  getCvApi: api = api.RC_CANDIDATE_CV_GET_WISH;
  data!: IWISH;
  boundSuccess!: boolean;

  sections: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            // Vị trí mong muốn 1
            labelFlexSize: 0,
            flexSize: 6,
            field: 'posWish1',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_POS_WISH1,
          },
          {
            // Vị trí mong muốn 2
            labelFlexSize: 0,
            flexSize: 6,
            field: 'posWish2',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_POS_WISH2,
          },
        ],
        [
          {
            // Mức lương thử việc
            labelFlexSize: 0,
            flexSize: 6,
            field: 'probationSalary',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_PROBATION_SALARY,
          },
          {
            // Mức lương mong muốn
            labelFlexSize: 0,
            flexSize: 6,
            field: 'wishSalary',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_WISH_SALARY,
          },
        ],
        [
          {
            // Nơi làm việc mong muốn
            labelFlexSize: 0,
            flexSize: 12,
            field: 'desiredWorkplace',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_DESIRED_WORKPLACE,
          },
        ],
        [
          {
            // Ngày bắt đầu làm việc
            labelFlexSize: 0,
            flexSize: 6,
            field: 'startDateWork',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_STARTDATE,
            pipe : EnumCoreTablePipeType.DATE,
          },
          {
            // Cấp bậc mong muốn
            labelFlexSize: 0,
            flexSize: 6,
            field: 'levelDesired',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_LEVEL_DESIRED,
          },
        ],
        [
          {
            // Số năm kinh nghiệm
            labelFlexSize: 0,
            flexSize: 6,
            field: 'numExperience',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_NUM_EXPERIENCE,
          },
          {
            // Đã từng làm HSV/HV
            labelFlexSize: 0,
            flexSize: 6,
            field: 'isHsvHv',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_HSV_HV,
          },
        ],
        [
          {
            // Đề nghị khác
            labelFlexSize: 0,
            flexSize: 12,
            field: 'otherSuggestions',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_OTHER_SUGGESTIONS,
            pipe : EnumCoreTablePipeType.DATE,
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
                this.alertService.error(this.getCvApi + x.id + ' failed!', alertOptions)
              }
            }
          })
        )
      })
    )
  }
}
