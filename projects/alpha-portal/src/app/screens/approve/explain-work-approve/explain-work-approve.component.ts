import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, IAlertOptions, ICoreChecklistOption, EnumCoreButtonVNSCode, DialogService, LayoutService, AlertService, MultiLanguageService, UrlService } from 'ngx-histaff-alpha';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { ExplainWorkApproveService } from './explain-work-approve.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explain-work-approve',
  templateUrl: './explain-work-approve.component.html',
  styleUrls: ['./explain-work-approve.component.scss'],
})
export class ExplainWorkApproveComponent extends BaseEditComponent implements OnInit, AfterViewInit {
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };

  lang!: string;

  startDate = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_SEARCH_FROM_DATE;
  endDate = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_SEARCH_TO_DATE;
  statusSearch = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_SEARCH_STATUS;

  titleNull: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_APPROVE_OFF_TITLE_NULL;
  accordionTitle = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_ACCORDION_TITLE;
  sendTime = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_SEND_TIME;
  explainWork = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_EXPLAIN_WORK;
  explainType = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_EXPLAIN_TYPE;
  workDate = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_WORK_DATE;
  reason = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_REASON;
  note = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_NOTE;
  approve = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_APPROVE;
  reject = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_REJECT;
  leaveEarly = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_LEAVE_EARLY_AND_LEAVE_LATE;

  checkData: boolean = true;
  dateStart: Date =  new Date(new Date().getFullYear(), new Date().getMonth(), 1);
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
  
  override entityTable = 'PORTAL_REGISTER_OFF';
  subscriptions: Subscription[] = [];
  landscapeMode: any;

  buttonItems: EnumCoreButtonVNSCode[] = [EnumCoreButtonVNSCode.APPROVE, EnumCoreButtonVNSCode.REJECT];
  data: any;
  arr: any = [
    {
      id: 1,
      sendDate: '17:00 - 16.09.2023',
      typeCode: 'NB',
      dateStart: '17.09.2023',
      dateEnd: '18.09.2023',
      note: 'Nghỉ bù',
      employeeName: 'Nguyễn Văn Hoàng',
      positionName: 'Lập trình viên',
      orgName: 'Bộ phận công nghệ',
    },
    {
      id: 2,
      sendDate: '18:00 - 17.09.2023',
      typeCode: 'NB',
      dateStart: '18.09.2023',
      dateEnd: '19.09.2023',
      note: 'Nghỉ bù',
      employeeName: 'Trần Kim Chi',
      positionName: 'Quản lý nhân sự',
      orgName: 'Phòng nhân sự',
    },
    {
      id: 3,
      sendDate: '19:30 - 18.09.2023',
      typeCode: 'NBL',
      dateStart: '19.09.2023',
      dateEnd: '20.09.2023',
      note: 'Nghỉ bù',
      employeeName: 'Nguyễn Minh Trí',
      positionName: 'Tổng giám đốc',
      orgName: 'Ban quản trị',
    },
  ];
  id!: number;
  constructor(
    public override dialogService: DialogService,
    public layoutService: LayoutService,
    private explainWorkApproveService: ExplainWorkApproveService,
    private alertService: AlertService,
    public mls: MultiLanguageService,
    private router : Router,
    private urlService: UrlService
  ) {
    super(dialogService);
    if(this.router.getCurrentNavigation()?.extras?.state){
      this.id = this.router.getCurrentNavigation()?.extras?.state!['id']
      // this.title = this.router.getCurrentNavigation()?.extras?.state!['title']
    }
    urlService.currentRouteUrl$.next('/approve')
  }

  onApproveClick(id: number, appLevel: number): void {
    var note = (<HTMLInputElement>document.getElementById('note-text-area-' + id)).value;
    this.explainWorkApproveService.ApproveLeave({ id: id, note: note, appStatus: 1, appLevel: appLevel, typeCode: 'EXPLAINWORK' }).subscribe((rs: any) => {
      if (rs.ok == true && rs.body.statusCode == 200) {
        console.log(this.mls.trans(rs.body.messageCode));

        this.getRequest();

        this.alertService.success(`${this.mls.trans(rs.body.messageCode)}`, this.alertOptions);
      }
    });
  }
  onRejectClick(id: number, appLevel: number): void {
    var note = (<HTMLInputElement>document.getElementById('note-text-area-' + id)).value;
    this.explainWorkApproveService.ApproveLeave({ id: id, note: note, appStatus: 2, appLevel: appLevel, typeCode: 'EXPLAINWORK' }).subscribe((rs: any) => {
      if (rs.ok == true && rs.body.statusCode == 200) {
        this.getRequest();

        this.alertService.success(`${this.mls.trans(rs.body.messageCode)}`, this.alertOptions);
      }
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(this.mls.lang$.subscribe((x) => (this.lang = x)));
    this.subscriptions.push(
      this.layoutService.landscapeMode$.subscribe((x) => {
        this.landscapeMode = x;
        console.log(this.landscapeMode);
      }),
    );
    if(!!!this.id){
      this.getRequest();
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

  ngAfterViewInit(): void {
    if(!!this.id){
      setTimeout(() => {
        this.subscriptions.push(
          this.explainWorkApproveService.GetPortalApproveById(this.id)
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

  onFormCreated(e: FormGroup) {
    this.form = e;
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  getRequest(): void {
    this.subscriptions.push(
      this.explainWorkApproveService
        .GetById({ typeCode: 'EXPLAINWORK', statuses: [0], dateStartSearch: this.dateStart, dateEndSearch: this.dateEnd })
        .pipe(
          map((datas: any) => {
            return datas.body.innerBody;
          }),
        )
        .subscribe((response) => {
          this.data = response;
          if (this.data.length > 0) {
            this.checkData = true;
          } else this.checkData = false;
        }),
    );
  }
}
