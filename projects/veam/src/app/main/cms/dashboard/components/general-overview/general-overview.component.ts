import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService, AppService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-general-overview',
  templateUrl: './general-overview.component.html',
  styleUrls: ['./general-overview.component.scss']
})
export class GeneralOverviewComponent extends BaseComponent implements OnChanges, OnInit, AfterViewInit {
  override lang!: string;
  @Input() orgIds!: number[];
  generalInfo = [
    {
      text: EnumTranslateKey.DASHBOARD_TITLE_TOTAL_EMPLOYEE,//'Tổng số nhân viên hiện tại'
      value: 0,
      urlAsset: 'assets/icon/group.svg'
    },
    {
      text: EnumTranslateKey.DASHBOARD_TITLE_NEW_EMPLOYEE_IN_MONTH,//'Nhân viên tuyển mới trong tháng'
      value: 0,
      urlAsset: 'assets/icon/person-plus.svg'
    },
    {
      text: EnumTranslateKey.DASHBOARD_TITLE_TER_EMPLOYEE_IN_MONTH,//'Nhân viên nghỉ việc trong tháng'
      value: 0,
      urlAsset: 'assets/icon/person-minus.svg'
    },
    {
      text: EnumTranslateKey.DASHBOARD_TITLE_AVERAGE_AGE_EMPLOYEE,//'Tuổi lao động bình quân'
      value: 0,
      urlAsset: 'assets/icon/group.svg'
    },
  ]
  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService
  ) {
    super(mls)
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.appService.post(api.DASHBOARD_GENERAL_INFORMATION, { orgIds: [] }).subscribe(x => {
        if (x.ok && x.status === 200) {
          this.generalInfo[0].value = x.body.innerBody.totalEmp;
          this.generalInfo[1].value = x.body.innerBody.newEmpInMonth;
          this.generalInfo[2].value = x.body.innerBody.terEmpInMonth;
          this.generalInfo[3].value = x.body.innerBody.averageAge;
        }
      })
    })
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x),
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orgIds']) {
      this.appService.post(api.DASHBOARD_GENERAL_INFORMATION, { orgIds: this.orgIds }).subscribe(x => {
        if (x.ok && x.status === 200) {
          this.generalInfo[0].value = x.body.innerBody.totalEmp;
          this.generalInfo[1].value = x.body.innerBody.newEmpInMonth;
          this.generalInfo[2].value = x.body.innerBody.terEmpInMonth;
          this.generalInfo[3].value = x.body.innerBody.averageAge;
        }
      })
    }
  }
}
