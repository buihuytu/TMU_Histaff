import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { Router } from '@angular/router';
import { OvertimeApproveService } from '../approve-overtime.service';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, IAlertOptions, ICoreChecklistOption, EnumCoreButtonVNSCode, DialogService, LayoutService, AlertService, MultiLanguageService, UrlService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-overtime-approve-edit',
  templateUrl: './overtime-approve-edit.component.html',
  styleUrl: './overtime-approve-edit.component.scss'
})
export class OvertimeApproveEditComponent extends BaseEditComponent implements OnInit, AfterViewInit {
  
  alertOptions: IAlertOptions = {
    autoClose: false,
    keepAfterRouteChange: true,
  };

  lang!: string;
  titleNull:EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_APPROVE_OVERTIME_TITLE_NULL;
  registerOvertime = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_CAPTION_APPROVE_OVERTIME_TITLE;
  startDate = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_SEARCH_FROM_DATE;
  endDate = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_SEARCH_TO_DATE;

  statusApprove = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_CAPTION_APPROVE_OVERTIME_APPROVE_STATUS;
  employeeCode = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_CAPTION_APPROVE_OVERTIME_EMPLOYEE_CODE;
  employeeName = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_CAPTION_APPROVE_OVERTIME_EMPLOYEE_NAME;
  position = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_CAPTION_APPROVE_OVERTIME_POSITION;
  department = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_CAPTION_APPROVE_OVERTIME_DEPARTMENT;
  registerDate = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_CAPTION_APPROVE_OVERTIME_REGISTER_DATE;
  registerShift = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_CAPTION_APPROVE_OVERTIME_REGISTER_SHIFT;
  totalTime = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_CAPTION_APPROVE_OVERTIME_REGISTER_TOTAL_TIME;
  reason = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_CAPTION_APPROVE_OVERTIME_REASON;
  note = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_NOTE; 
  approve = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BUTTON_COMMON_APPROVE; 
  reject = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BUTTON_COMMON_REJECT; 

  override entityTable = "PORTAL_REGISTER_OFF";
  subscriptions: Subscription[] = [];
  landscapeMode : any

  checkData: boolean = true;
  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([
    {
      value: 1,
      text: this.mls.trans('common.commonstatus.approved'),
      checked: false,
    },
    {
      value: 2,
      text: this.mls.trans('common.commonstatus.rejected'), 
      checked: false,
    },
    {
      value: 0,
      text: this.mls.trans('common.commonstatus.pending'), 
      checked: false,
    },
  ]);
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.APPROVE,
    EnumCoreButtonVNSCode.REJECT
  ];
  data: any;
  arr: any = [ 
    {
      id: 1,
      statusApprove: "Chờ duyệt",
      employeeCode: "HPOT00893",
      employeeName: "NGUYỄN VĂN HIỆP",
      position: "Chuyên viên Điều phối dự án",
      department: "Công ty Thành viên - Liên kết",
      registerDate: "18:00 - 17.09.2023",
      registerShift: "Đêm",
      totalTime: "2h",
      reason: "Fix Bug",
    },
  ]
  id!: number;

  

  constructor(
    public override dialogService: DialogService,
    private layoutService : LayoutService,
    private alertService: AlertService,
    public mls: MultiLanguageService,
    public otService: OvertimeApproveService,
    private router : Router,
    private urlService: UrlService
  ) {
    super(dialogService);
    if(this.router.getCurrentNavigation()?.extras?.state){
      this.id = this.router.getCurrentNavigation()?.extras?.state!['id']
      // this.title = this.router.getCurrentNavigation()?.extras?.state!['title']
    }
    urlService.previousRouteUrl$.next('/notification')
  }
  
  ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    );
  }

  ngAfterViewInit(): void {
    if(!!this.id){
      setTimeout(() => {
        this.subscriptions.push(
          this.otService.GetPortalApproveById(this.id)
            .pipe(
              map((datas: any) => {
                return datas.body.innerBody;
              })
            )
            .subscribe(response => {
              this.data = response;
              if (this.data.length > 0) {
                this.checkData = true;
              } else this.checkData = false;
            })
        )
      })
    }
  }
}