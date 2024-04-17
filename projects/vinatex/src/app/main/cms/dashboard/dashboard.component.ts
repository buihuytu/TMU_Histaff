import { Component, AfterViewInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, IFormBaseControl, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, MultiLanguageService, LayoutService, AuthService, AlertService, OrganizationService, RecursiveService, IAuthData, alertOptions } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-cms-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})

export class AppDashboardComponent extends BaseComponent implements AfterViewInit, OnDestroy {

  title: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_MAIN_DASHBOARD
  height!: number;
  chartHeight!: number;
  form!: FormGroup;
  activeIds: number[] = [];

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  orgId: IFormBaseControl = {
    //Đối tượng nhân viên
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_CODE,
    field: 'orgId',
    value: '',
    controlType: EnumFormBaseContolType.SEEKER,
    seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,
    getByIdObject$: this.employeeGetByIdObject$,
    boundFrom: 'id',
    shownFrom: 'name',
    /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
    type: 'text'
  };

  constructor(
    public override mls: MultiLanguageService,
    public layoutService: LayoutService,
    public authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    public organizationService: OrganizationService,
    private recursiveService: RecursiveService,
  ) {
    super(mls)
  }


  computeChartHeight(): void {
    this.chartHeight = this.height / 2 - 35 * 2; // 35 is chart square header height
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.layoutService.contentContainerHeight$.subscribe(x => {
      this.height = x - this.layoutService.basicSpacing * 2 - this.layoutService.corePageHeaderHeight - 50;
      this.computeChartHeight();
    })

    if (!!this.authService.data$.value?.isFirstLogin) { //change password for new user
      this.router.navigate(['cms', 'change-password', btoa((this.authService.data$.value as IAuthData).refreshToken.user)]);
      this.alertService.warn(`${this.mls.trans(EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSWORD_SHOULD_BE_CHANGED)}`, alertOptions);
    }
    this.form = new FormGroup({
      orgId: new FormControl()
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.height = this.layoutService.contentContainerHeight$.value - this.layoutService.basicSpacing * 2 - this.layoutService.corePageHeaderHeight - 50; // 50 is div h50
      this.computeChartHeight();
    })
  }
  onItemDoubleClick(e: any) {
    this.activeIds = e;
  }
}
