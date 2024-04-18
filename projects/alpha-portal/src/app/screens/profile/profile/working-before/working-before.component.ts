import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnumTranslateKey } from 'alpha-global-constants';
import { AppService, AuthService, DialogService, MultiLanguageService } from 'ngx-histaff-alpha';
import { BaseEditComponent, IAlertOptions, AlertService } from 'ngx-histaff-alpha';
import { Subscription } from 'rxjs';
import { WorkingBeforeService } from './working-before.edit.service';

@Component({
  selector: 'app-working-before',
  templateUrl: './working-before.component.html',
  styleUrls: ['./working-before.component.scss'],
})
export class WorkingBeforeComponent extends BaseEditComponent implements OnInit, AfterViewInit {
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };

  lang!: string;
  checkedContent: boolean = true;
  checkedReason: boolean = true;
  checkData: boolean = true;

  titleNull: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORK_PAST_PORTAL_TITLE_NULL;
  titleName: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_TITLE_NAME;
  title: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_WORKING_BEFORE_EDIT;
  fromDate: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_FROM_DATE;
  endDate: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_END_DATE;
  seniority: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_SENIORITY;
  mainDuty: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_MAIN_DUTY;
  terReason: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_TER_REASON;
  reasonChange: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_REASON_CHANGE;
  contentChange: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_CONTENT_CHANGE;
  popupTitle: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_REQUEST_EDITING_TITLE;
  send: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_SEND_REQUEST;
  required: EnumTranslateKey = EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED;

  popup!: any;
  content!: any;
  reason!: any;

  override entityTable = 'PORTAL_HU_WORKING_BEFORE_REQUEST';
  subscriptions: Subscription[] = [];
  landscapeMode: any;

  id!: number | any;
  employeeId!: any;

  data: {
    id: number;
    titleName: string;
    fromDate: string;
    endDate: string;
    terReason: string;
    seniority: string;
    mainDuty: string;
    orgName: string;
    companyName: string;
  }[] = [];
  constructor(
    public override dialogService: DialogService,
    private alertService: AlertService,
    public mls: MultiLanguageService,
    private authService: AuthService,
    public appService: AppService,
    public workingBeforeService: WorkingBeforeService,
  ) {
    super(dialogService);
  }

  ngOnInit(): void {
    this.popup = <HTMLInputElement>document.getElementById('popup1');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.mls.lang$.subscribe((x) => (this.lang = x)),

        this.authService.data$.subscribe((data) => (this.employeeId = data?.employeeId)),

        this.appService.get(`/api/HuWorkingBefore/GetWorkingBeforeByEmployee?id=${this.employeeId}`).subscribe((x: any) => {
          if (x.ok && x.status == 200) {
            var data = x.body.innerBody;
            this.data = data;
            if (this.data.length > 0) {
              this.checkData = true;
            } else this.checkData = false;
          }
        }),
      );
    });
  }

  onFormCreated(e: FormGroup) {
    this.form = e;
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  onHandleItemClick(id: number) {
    this.popup.style.visibility = 'visible';
    this.popup.style.opacity = '1';
    this.id = id;
  }
  onHandleSend(): void {
    // if (!!content) {
    //   this.checkedReason = false;
    //   this.checkedContent = false;
    // }
    const payload = {
      employeeId: this.employeeId,
      idChange: this.id,
      sysOtherCode: '00042',
      contentChange: this.content,
      reasonChange: this.reason,
    };
    this.subscriptions.push(
      this.workingBeforeService.SendRequest(payload).subscribe((x) => {
        if (x.ok && x.status == 200) {
          this.alertService.info(this.mls.trans(x.body.messageCode, this.lang), this.alertOptions)
        } else {
          this.alertService.info(this.mls.trans(x.body.messageCode, this.lang), this.alertOptions)
        }
        this.onClose();
      }),
    );
  }
  onClose(): void {
    this.popup.style.visibility = 'hidden';
    this.popup.style.opacity = '0';
    this.reset();
  }
  reset(): void {
    this.id = null;
    this.reason = null;
    this.content = null;
  }
}
