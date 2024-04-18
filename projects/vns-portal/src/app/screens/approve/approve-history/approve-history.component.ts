import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ApproveHistoryService } from './approve-histoy.service';
import { Router } from '@angular/router';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, IAlertOptions, DialogService, LayoutService, AlertService, MultiLanguageService, UrlService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-approve-history',
  templateUrl: './approve-history.component.html',
  styleUrls: ['./approve-history.component.scss']
})
export class ApproveHistoryComponent extends BaseEditComponent implements OnInit, AfterViewInit {
  alertOptions: IAlertOptions = {
    autoClose: false,
    keepAfterRouteChange: true,
  };

  lang!: string;
  titleNull:EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_REGISTER_HISTORY_TITLE_NULL;
  appLevel = EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_HISTORY_APP_LEVEL;
  leaveType = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_LEAVE_TYPE;
  workingDay = EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_HISTORY_WORKING_DAY;
  fromDate = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_FROM_DATE;
  toDate = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_TO_DATE;
  totalOt = EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_HISTORY_TOTAL_OT;
  timeStart = EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_HISTORY_TIME_START;
  timeEnd = EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_HISTORY_TIME_END;
  reason = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_REASON;
  approveName = EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_HISTORY_APPROVE_NAME
  approveDate = EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_HISTORY_APPROVE_DATE
  approvePos = EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_HISTORY_APPROVE_POSITION
  approveNote = EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_HISTORY_APPROVE_REASON

  sendTime = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_SEND_TIME;
  explainType = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_EXPLAIN_TYPE;
  leaveEarly = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_LEAVE_EARLY_AND_LEAVE_LATE;

  registerDetail = EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_LEAVE_EDIT_DETAIL;
  date = EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_DATE;
  dType = EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_TYPE;
  day = EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_DAY;
  shift = EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_SHIFT;
  shiftCode = EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_SHIFT_CODE;

  checkData: boolean = true;

  startDate = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_SEARCH_FROM_DATE;
  endDate = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_SEARCH_TO_DATE;
  currentDate:Date = new Date();
  dateStart: Date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
  dateEnd: Date =  new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 0);

  override entityTable = "PORTAL_APPROVE_LEAVE";
  subscriptions: Subscription[] = [];
  landscapeMode : any
  
  data: any;
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
  constructor(
    public override dialogService: DialogService,
    private layoutService : LayoutService,
    private approveHistoryService : ApproveHistoryService,
    private alertService: AlertService,
    public mls: MultiLanguageService,
    private router : Router,
    private urlService: UrlService
  ) {
    super(dialogService);
    // if(this.router.getCurrentNavigation()?.extras?.state){
    //   this.id = this.router.getCurrentNavigation()?.extras?.state!['id']
    // }
    urlService.currentRouteUrl$.next('/approve')
  }
  
  ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    );
    this.subscriptions.push(
      this.layoutService.landscapeMode$.subscribe(x => {
        this.landscapeMode = x;
        console.log(this.landscapeMode)
      })
    )
      this.getRequest();
  }

  ngAfterViewInit() :void {
    
    
  }

  onFormCreated(e: FormGroup){
   this.form = e 
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  
  getRequest(): void{
    this.subscriptions.push(
      this.approveHistoryService.ApproveHistory(this.dateStart,this.dateEnd)
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
  }
  onDateStartChange(dateStart: Date){
    this.dateStart = dateStart;
    this.dateStart.setHours(0,0,0,0)
    
    console.log(this.dateStart);
    this.getRequest();
  }

  onDateEndChange(dateEnd: Date){
    this.dateEnd = dateEnd;
    this.dateEnd.setHours(23,59,59,999)
    console.log(this.dateEnd);
    this.getRequest();
  }

}
