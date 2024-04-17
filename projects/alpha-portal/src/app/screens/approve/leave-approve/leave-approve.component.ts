import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, IAlertOptions, EnumCoreButtonVNSCode, DialogService, LayoutService, AlertService, MultiLanguageService, UrlService } from "ngx-histaff-alpha";
import { Subscription, map } from "rxjs";
import { LeaveApproveService } from "./leave-approve.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-leave-approve',
  templateUrl: './leave-approve.component.html',
  styleUrls: ['./leave-approve.component.scss']
})
export class LeaveApproveComponent extends BaseEditComponent implements OnInit, AfterViewInit {

  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 3000
  };

  lang!: string;
  titleNull: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_APPROVE_OFF_TITLE_NULL;
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
  landscapeMode: any

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
    public layoutService: LayoutService,
    private leaveApproveService: LeaveApproveService,
    private alertService: AlertService,
    public mls: MultiLanguageService,
    private router: Router,
    private urlService: UrlService
  ) {
    super(dialogService);
    if (this.router.getCurrentNavigation()?.extras?.state) {
      this.id = this.router.getCurrentNavigation()?.extras?.state!['id']
      this.title = this.router.getCurrentNavigation()?.extras?.state!['title']
    }
    urlService.currentRouteUrl$.next('/approve')
  }


  onApproveClick(id: number, appLevel: number): void {
    var note = (<HTMLInputElement>document.getElementById("note-text-area-" + id)).value;
    this.leaveApproveService
      .ApproveLeave({ id: id, note: note, appStatus: 1, appLevel: appLevel, typeCode: "OFF" })
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
    this.leaveApproveService
      .ApproveLeave({ id: id, note: note, appStatus: 2, appLevel: appLevel, typeCode: "OFF" })
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
    if (!!!this.id) {
      this.getRequest();
    }
  }

  ngAfterViewInit(): void {
    if (!!this.id) {
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

  onDateStartChange(dateStart: Date) {
    this.dateStart = dateStart;
    this.dateStart.setHours(0, 0, 0, 0)

    console.log(this.dateStart);
    this.getRequest();
  }

  onDateEndChange(dateEnd: Date) {
    this.dateEnd = dateEnd;
    this.dateEnd.setHours(23, 59, 59, 999)
    console.log(this.dateEnd);
    this.getRequest();
  }

  onFormCreated(e: FormGroup) {
    this.form = e
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  getRequest(): void {
    this.subscriptions.push(
      this.leaveApproveService.GetById({ typeCode: "OFF", statuses: [0], dateStartSearch: this.dateStart, dateEndSearch: this.dateEnd })
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
