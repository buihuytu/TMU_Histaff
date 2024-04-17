import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LeaveApproveService } from '../leave-approve.service';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, IAlertOptions, EnumCoreButtonVNSCode, DialogService, LayoutService, AlertService, MultiLanguageService, UrlService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-leave-approve-edit',
  templateUrl: './leave-approve-edit.component.html',
  styleUrl: './leave-approve-edit.component.scss'
})
export class LeaveApproveEditComponent extends BaseEditComponent implements OnInit,AfterViewInit {

  alertOptions: IAlertOptions = {
    autoClose: false,
    keepAfterRouteChange: true,
  };

  lang!: string;
  titleNull:EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_APPROVE_OFF_TITLE_NULL;
  accordionTitle = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_ACCORDION_TITLE;
  sendTime = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_SEND_TIME;
  registerLeave = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_REGISTER_LEAVE;
  leaveType = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_LEAVE_TYPE;
  fromDate = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_FROM_DATE;
  toDate = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_TO_DATE;
  reason = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_REASON;
  registerDetail = EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_LEAVE_EDIT_DETAIL;
  note = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_NOTE; 
  approve = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_APPROVE; 
  reject = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_REJECT; 


  date = EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_DATE;
  dType = EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_TYPE;
  day = EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_DAY;
  shift = EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_SHIFT;
  shiftCode = EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_SHIFT_CODE;

  startDate = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_SEARCH_FROM_DATE;
  endDate = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_SEARCH_TO_DATE;

  checkData: boolean = true;
  dateStart: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  dateEnd: Date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  override entityTable = "PORTAL_REGISTER_OFF";
  subscriptions: Subscription[] = [];
  landscapeMode : any
  
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.APPROVE,
    EnumCoreButtonVNSCode.REJECT
  ];
  data: any;
  listDetail: any;
  arr: any = [ 
    {
      id: 1,
      sendDate: "17:00 - 16.09.2023",
      typeCode: "NB",
      dateStart: "17.09.2023",
      dateEnd: "18.09.2023",
      note: "Nghỉ bù",
      employeeName: "Nguyễn Văn Hoàng",
      positionName: "Lập trình viên",
      orgName: "Bộ phận công nghệ"
    },
    {
      id: 2,
      sendDate: "18:00 - 17.09.2023",
      typeCode: "NB",
      dateStart: "18.09.2023",
      dateEnd: "19.09.2023",
      note: "Nghỉ bù",
      employeeName: "Trần Kim Chi",
      positionName: "Quản lý nhân sự",
      orgName: "Phòng nhân sự"
    },
    {
      id: 3,
      sendDate: "19:30 - 18.09.2023",
      typeCode: "NBL",
      dateStart: "19.09.2023",
      dateEnd: "20.09.2023",
      note: "Nghỉ bù",
      employeeName: "Nguyễn Minh Trí",
      positionName: "Tổng giám đốc",
      orgName: "Ban quản trị"
    }
  ]
  id!: number;
  title!: string;
  constructor(
    public override dialogService: DialogService,
    private layoutService : LayoutService,
    private leaveApproveService : LeaveApproveService,
    private alertService: AlertService,
    public mls: MultiLanguageService,
    private router : Router,
    private urlService: UrlService
  ) {
    super(dialogService);
    if(this.router.getCurrentNavigation()?.extras?.state){
      this.id = this.router.getCurrentNavigation()?.extras?.state!['id']
      this.title = this.router.getCurrentNavigation()?.extras?.state!['title']
    }
    urlService.previousRouteUrl$.next('/notification')
  }
  
  ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    );
  }

  ngAfterViewInit() :void {
    if(!!this.id){
      setTimeout(() => {
        this.subscriptions.push(
          this.leaveApproveService.GetPortalApproveById(this.id)
            .pipe(
              map((datas: any) => {
                return datas.body.innerBody;
              })
            )
            .subscribe(response => {
              this.data = response;
              this.dateStart = this.data[0].dateStart
              this.dateEnd = this.data[0].dateEnd
              if (this.data.length > 0) {
                this.checkData = true;
              } else this.checkData = false;
            })
        )
      })
    }
    
  }

  onFormCreated(e: FormGroup){
   this.form = e 
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}

