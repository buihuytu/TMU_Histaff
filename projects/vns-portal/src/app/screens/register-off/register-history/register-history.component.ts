import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription, map } from 'rxjs';
import { RegisterHistoryService } from './register-history.service';
import { Router } from '@angular/router';
import { AlertService, BaseEditComponent, DialogService, IAlertOptions, LayoutService, MultiLanguageService } from 'ngx-histaff-alpha';
import { EnumTranslateKey } from 'alpha-global-constants';

@Component({
  selector: 'app-register-history',
  templateUrl: './register-history.component.html',
  styleUrls: ['./register-history.component.scss']
})
export class RegisterHistoryComponent extends BaseEditComponent implements OnInit, AfterViewInit {
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
  override entityTable = "PORTAL_REGISTER_OFF";
  subscriptions: Subscription[] = [];
  landscapeMode : any
  
  data: any;
  id!: number;
  constructor(
    public override dialogService: DialogService,
    private layoutService : LayoutService,
    private registerHistoryService : RegisterHistoryService,
    private alertService: AlertService,
    public mls: MultiLanguageService,
    private router : Router
  ) {
    super(dialogService);
    if(this.router.getCurrentNavigation()?.extras?.state){
      this.id = this.router.getCurrentNavigation()?.extras?.state!['id']
    }
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
    if(!!!this.id){
      this.getRequest();
    }
  }

  ngAfterViewInit() :void {
    if(!!this.id){
      setTimeout(() => {
        this.registerHistoryService.getRegisterHistoryById(this.id).pipe(
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
      })
    }
  }

  onFormCreated(e: FormGroup){
   this.form = e 
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  
  getRequest(): void{
    this.subscriptions.push(
      this.registerHistoryService.RegisterHistory(this.dateStart,this.dateEnd)
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
