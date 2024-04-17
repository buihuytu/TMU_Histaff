import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CoreFormControlBaseComponent, EnumCoreOrgTreeaAccessorMode, MultiLanguageService, OrganizationService, AppService, IFormatedResponse } from "ngx-histaff-alpha";
import { Subscription } from "rxjs";
import { DashboardService } from "../../dashboard.service";


@Component({
  selector: 'app-custom-seeker-org',
  templateUrl: './custom-seeker-org.component.html',
  styleUrls: ['./custom-seeker-org.component.scss']
})
export class CustomSeekerOrgComponent extends CoreFormControlBaseComponent implements OnInit, AfterViewInit, OnDestroy {

  lang!: string;
  treeHeight!: number;
  // ORG_TREE_CHECKBOX
  listOrgIds: number[] = [];
  accessorMode: EnumCoreOrgTreeaAccessorMode = EnumCoreOrgTreeaAccessorMode.CHECKED;

  title: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CHOOSE_UNIT;

  /* START: REQUIRED */
  @Input() boundFrom!: string; // take this field from GetById response innerBody to bind to the value
  @Input() shownFrom!: string; // take this field from GetById response innerBody to bind to the text
  /* END: REQUIRED when EMPLOYEE_SEEKER */
  @Output() onHandleClick = new EventEmitter();


  sourceOpen!: boolean;
  clearIcon: boolean = false;
  valueToShow!: string;

  subscriptions: Subscription[] = [];
  showClearIcon!: boolean;

  constructor(
    private mls: MultiLanguageService,
    public organizationService: OrganizationService,
    public dashboardService: DashboardService,
    private appService: AppService,
  ) {
    super();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.listOrgIds = [];

      this.subscriptions.push(
        this.mls.lang$.subscribe(x => this.lang = x),
      )
      this.dashboardService.originalIds$.subscribe(x => this.listOrgIds = x)
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

  onClickSeek(): void {
    this.sourceOpen = true;
  }

  onSelect(): void {
    this.listOrgIds.sort();
    this.dashboardService.originalIds$.next(this.listOrgIds);
    if (this.listOrgIds.length > 0) {
      this.appService.post(api.HU_CONTRACT_DASHBOARD_EMP_GETNAMEORGDASHBOARD, { orgIds: this.listOrgIds }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body = x.body as IFormatedResponse
          if (body.statusCode === 200) {
            this.valueToShow = body.innerBody.listName;
          }
        }
      })
    } else {
      this.valueToShow = '';
    }
    this.clearIcon = true;
    this.onHandleClick.emit(this.listOrgIds);
    this.sourceOpen = false;
  }

  onCancel(): void {
    this.sourceOpen = false;
  }

  onClickClear() {
    this.valueToShow = '';
    this.clearIcon = false;
    this.onHandleClick.emit([]);
  }
}