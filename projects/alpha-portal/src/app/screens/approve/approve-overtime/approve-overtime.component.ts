import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { OvertimeApproveService } from './approve-overtime.service';
import { Router } from '@angular/router';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, IAlertOptions, ICoreChecklistOption, EnumCoreButtonVNSCode, DialogService, LayoutService, AlertService, MultiLanguageService, UrlService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-approve-overtime',
  templateUrl: './approve-overtime.component.html',
  styleUrls: ['./approve-overtime.component.scss']
})
export class ApproveOvertimeComponent extends BaseEditComponent implements OnInit, AfterViewInit {
  
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
  dateStart: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  dateEnd: Date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
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
    // {
    //   id: 2,
    //   sendDate: "18:00 - 17.09.2023",
    //   typeCode: "NB",
    //   dateStart: "18.09.2023",
    //   dateEnd: "19.09.2023",
    //   note: "Nghỉ bù",
    //   employeeName: "Trần Kim Chi",
    //   positionName: "Quản lý nhân sự",
    //   orgName: "Phòng nhân sự"
    // },
    // {
    //   id: 3,
    //   sendDate: "19:30 - 18.09.2023",
    //   typeCode: "NBL",
    //   dateStart: "19.09.2023",
    //   dateEnd: "20.09.2023",
    //   note: "Nghỉ bù",
    //   employeeName: "Nguyễn Minh Trí",
    //   positionName: "Tổng giám đốc",
    //   orgName: "Ban quản trị"
    // }
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
    }
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
    if(!!!this.id){
      this.getRequest();
    }
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

  onApproveClick(id: number, appLevel: number): void {
    var note = (<HTMLInputElement>document.getElementById("note-text-area-" + id)).value;
    this.otService
      .ApproveLeave({id: id, note: note, appStatus: 1, appLevel: appLevel, typeCode: "OVERTIME"})
      .subscribe((rs: any) => {
        if (rs.ok == true && rs.body.statusCode == 200) {
          console.log(this.mls.trans(rs.body.messageCode));
          
          this.getRequest();

          this.alertService.success(
            `${this.mls.trans(rs.body.messageCode)}`,
            this.alertOptions
          );
        }
      });
  }
  onRejectClick(id: number, appLevel: number): void {
    var note = (<HTMLInputElement>document.getElementById("note-text-area-" + id)).value;
    this.otService
      .ApproveLeave({id: id, note: note, appStatus: 2, appLevel: appLevel, typeCode: "OVERTIME"})
      .subscribe((rs: any) => {
        if (rs.ok == true && rs.body.statusCode == 200) {
          
          this.getRequest();

          this.alertService.success(
            `${this.mls.trans(rs.body.messageCode)}`,
            this.alertOptions
          );
        }
      });
  }

  getRequest(): void{
    this.subscriptions.push(
      this.otService.GetById({typeCode: "OVERTIME",  statuses: [0], dateStartSearch: this.dateStart, dateEndSearch: this.dateEnd})
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
}
