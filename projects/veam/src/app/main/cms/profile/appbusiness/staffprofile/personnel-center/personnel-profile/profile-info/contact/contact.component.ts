import { Component, OnInit, isDevMode } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICoreViewSection, EnumCoreViewItemType, MultiLanguageService, AppService, AlertService, ResponseService, IFormatedResponse, alertOptions } from 'ngx-histaff-alpha';
import { filter } from 'rxjs';
import { PersonnelCenterService } from '../../../personnel-center.service';
import { ProfileInfoService } from '../profile-info.service';

interface IContact {
  isHost:string;
  householdNumber : string;
  householdCode : string;
  address : string;
  province : string;
  district : string;
  ward : string;
  curAddress : string;
  curProvince : string;
  curDistrict : string;
  curWard : string;
  telephone : string;
  landlinePhone : string;
  emailCompany : string;
  emailPersonal : string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends BaseComponent implements OnInit  {

  getPoliticalBackgroundApi: api = api.HU_EMPLOYEE_CV_GET_CONTACT;
  data!: IContact;
  boundSuccess!: boolean; 
  sections: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'isHost',
            controlType: EnumCoreViewItemType.CHECKBOX,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_HOST,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'householdNumber',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_HOUSEHOLD_NUMBER,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'householdCode',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_HOUSEHOLD_CODE,
          }
          
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'address',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_ADDRESS,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'province',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CITY,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'district',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_DISTRICT,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'ward',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_WARD,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'curAddress',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_ADDRESS,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'curProvince',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_CITY,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'curWard',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_WARD,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'curDistrict',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_DISTRICT,
          },
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'telephone',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_TELEPHONE,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'landlinePhone',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_LANDLINE_PHONE,
          }
        ],
        [
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'emailCompany',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_EMAIL_COMPANY,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'emailPersonal',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_EMAIL_PERSONAL,
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
