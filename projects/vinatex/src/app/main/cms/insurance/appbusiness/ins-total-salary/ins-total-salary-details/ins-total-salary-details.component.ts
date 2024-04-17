import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InsTotalSalaryService } from '../ins-total-salary.service';
import { EnumTranslateKey } from 'alpha-global-constants';
import { FullscreenModalLoaderComponent, CoreTabsComponent, BaseComponent, MultiLanguageService, TranslatePipe } from 'ngx-histaff-alpha';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ins-total-salary-details',
  standalone: true,
  imports: [
    FullscreenModalLoaderComponent,
    CommonModule,
    TranslatePipe,
    CoreTabsComponent,
  ],
  templateUrl: './ins-total-salary-details.component.html',
  styleUrl: './ins-total-salary-details.component.scss'
})
export class InsTotalSalaryDetailsComponent extends BaseComponent implements AfterViewInit, OnDestroy {
  loading!: boolean;

  dataInPeriod = {
    soLaoDong: {
      bhxhTang: 0, bhytTang: 0, bhtnTang: 0, bhbnnTang: 0,
      bhxhGiam: 0, bhytGiam: 0, bhtnGiam: 0, bhbnnGiam: 0,
    },
    tongQuyLuong: {
      bhxhTang: 0, bhytTang: 0, bhtnTang: 0, bhbnnTang: 0,
      bhxhGiam: 0, bhytGiam: 0, bhtnGiam: 0, bhbnnGiam: 0,
    },
    soPhaiDong: {
      bhxhTang: 0, bhytTang: 0, bhtnTang: 0, bhbnnTang: 0,
      bhxhGiam: 0, bhytGiam: 0, bhtnGiam: 0, bhbnnGiam: 0,
    },
    dieuChinh: {
      bhxhTang: 0, bhytTang: 0, bhtnTang: 0, bhbnnTang: 0,
      bhxhGiam: 0, bhytGiam: 0, bhtnGiam: 0, bhbnnGiam: 0,
    }
  }
  dataEndPeriod = {
    soLaoDong: {
      bhxhTang: 0, bhytTang: 0, bhtnTang: 0, bhbnnTang: 0,
      bhxhGiam: 0, bhytGiam: 0, bhtnGiam: 0, bhbnnGiam: 0,
    },
    tongQuyLuong: {
      bhxhTang: 0, bhytTang: 0, bhtnTang: 0, bhbnnTang: 0,
      bhxhGiam: 0, bhytGiam: 0, bhtnGiam: 0, bhbnnGiam: 0,
    },
    soPhaiDong: {
      bhxhTang: 0, bhytTang: 0, bhtnTang: 0, bhbnnTang: 0,
      bhxhGiam: 0, bhytGiam: 0, bhtnGiam: 0, bhbnnGiam: 0,
    },
    dieuChinh: {
      bhxhTang: 0, bhytTang: 0, bhtnTang: 0, bhbnnTang: 0,
      bhxhGiam: 0, bhytGiam: 0, bhtnGiam: 0, bhbnnGiam: 0,
    }
  }


  headers: EnumTranslateKey[] = [
    EnumTranslateKey.UI_PERSONNEL_PROFILE_TAB_INPERIOD_INFO,
    EnumTranslateKey.UI_PERSONNEL_PROFILE_TAB_ENDPERIOD_INFO,
  ]

  title: any = {
    empNumber: EnumTranslateKey.UI_COMPONENT_TITLE_TOTAL_SALARY_DETAIL_EMP_NUMBER,
    totalSalary: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY,
    numberToClose: EnumTranslateKey.UI_COMPONENT_TITLE_TOTAL_SALARY_DETAIL_NUMBER_TOBE_CLOSED,
    adjust: EnumTranslateKey.UI_COMPONENT_TITLE_TOTAL_SALARY_DETAIL_ADJUST,
    bhxh: EnumTranslateKey.UI_COMPONENT_TITLE_TOTAL_SALARY_DETAIL_BHXH,
    bhyt: EnumTranslateKey.UI_COMPONENT_TITLE_TOTAL_SALARY_DETAIL_BHYT,
    bhtn: EnumTranslateKey.UI_COMPONENT_TITLE_TOTAL_SALARY_DETAIL_BHTN,
    bhbnn: EnumTranslateKey.UI_COMPONENT_TITLE_TOTAL_SALARY_DETAIL_BHBNN,
    increase: EnumTranslateKey.UI_COMPONENT_TITLE_TOTAL_SALARY_DETAIL_INCREASE,
    reduce: EnumTranslateKey.UI_COMPONENT_TITLE_TOTAL_SALARY_DETAIL_REDUCE,
    previousPeriod: EnumTranslateKey.UI_COMPONENT_TITLE_TOTAL_SALARY_DETAIL_PREVIOUS,
    thisPeriod: EnumTranslateKey.UI_COMPONENT_TITLE_TOTAL_SALARY_DETAIL_THIS,
  };
  constructor(
    private router: Router,
    public override mls: MultiLanguageService,
    private route: ActivatedRoute,
    private insTotalSalaryService: InsTotalSalaryService,
  ) {
    super(mls);
  }
  ngAfterViewInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.subscriptions.push(this.mls.lang$.subscribe((x) => (this.lang = x)));
      if (!!this.insTotalSalaryService.infoPeriod) {
        this.insTotalSalaryService.getInfoByPeriod().pipe().subscribe(x => {
          if (!!x && x.status === 200) {
            const body = x.body;
            if (body.statusCode === 200) {
              this.dataInPeriod = body.innerBody;
            }
          }
        }),
          this.insTotalSalaryService.getInfoEndPeriod().pipe().subscribe(x => {
            if (!!x && x.status === 200) {
              const body = x.body;
              if (body.statusCode === 200) {
                this.dataEndPeriod = body.innerBody;
              }
            }
          })
      }
      this.loading = false;
    })
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCoreTabsHeaderClick(e: any): void {

  }

  override ngOnDestroy(): void {
    this.router.navigateByUrl('/cms/insurance/business/ins-totalsalary')
  }
}
