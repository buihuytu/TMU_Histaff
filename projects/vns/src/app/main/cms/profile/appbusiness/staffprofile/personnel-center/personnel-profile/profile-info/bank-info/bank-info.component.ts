import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, isDevMode } from '@angular/core';
import { ProfileInfoService } from '../profile-info.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICoreViewSection, EnumCoreViewItemType, MultiLanguageService, AppService, AlertService, ResponseService, IFormatedResponse, alertOptions } from 'ngx-histaff-alpha';
import { filter } from 'rxjs';
import { PersonnelCenterService } from '../../../personnel-center.service';

interface IBankInfo {
  id: number;
  bankId: number;
  bankName: string;
  bankBranch: string;
  bankNo: string;
}

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss']
})
export class BankInfoComponent extends BaseComponent implements OnInit {

  @ViewChild('container') container!: ElementRef;

  getBankInfoApi: api = api.HU_EMPLOYEE_CV_GET_BANK_INFO;
  data!: IBankInfo;
  boundSuccess!: boolean;

  sections: ICoreViewSection[] = [
    {
      rows: [
        [
          {
            labelFlexSize: 0,
            flexSize: 12,
            field: 'accountBankName',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ACCOUNT_BANK_NAME,
          },
        ],
        [
          
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'bankName',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_NAME_1,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'bankBranch',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_BRANCH_1,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'bankNo',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO_1,
          }
        ],
        
        [
          
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'bankName2',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_NAME_2,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'bankBranch2',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_BRANCH_2,
          },
          {
            labelFlexSize: 0,
            flexSize: 4,
            field: 'bankNo2',
            controlType: EnumCoreViewItemType.TEXT,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO_2,
          },
        ],
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
          this.appService.get(this.getBankInfoApi + "/" + x.id).subscribe(res => {
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
                this.alertService.error(this.getBankInfoApi + "/" + x.id + ' failed!', alertOptions)
              }
            }
          })
        )
      })
    )
  }

}
