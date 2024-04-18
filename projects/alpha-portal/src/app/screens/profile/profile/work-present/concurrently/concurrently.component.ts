import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, IAlertOptions, EnumCoreButtonVNSCode, ICoreFormSection, EnumFormBaseContolType, DialogService, AlertService, MultiLanguageService, AuthService, AppService, UrlService, CorePageEditComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { Subscription } from 'rxjs';
import { WorkingBeforeService } from '../../working-before/working-before.edit.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-concurrently',
  standalone: true,
  imports: [
    CommonModule,
    CorePageEditComponent,
    TranslatePipe,
  ],
  templateUrl: './concurrently.component.html',
  styleUrls: ['./concurrently.component.scss'],
})
export class ConcurrentlyComponent extends BaseEditComponent implements OnInit, AfterViewInit {
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };

  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.SEND,
    EnumCoreButtonVNSCode.CANCEL
  ];

  override entityTable = 'PORTAL_REQUEST_CHANGE';

  showPopup!: boolean;
  record!: any;

  lang!: string;
  checkedContent: boolean = true;
  checkedReason: boolean = true;
  checkData: boolean = true;

  titleNull: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONCURRENTLY_PORTAL_TITLE_NULL;
  orgConcurrentName: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_ORG_NAME;
  positionConcurrentName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_CONTRACTNO;
  effectiveDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STARTDATE;
  expirationDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EXPIREDATE;
  timeConcurrent: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_TIME_CONCURRENTLY;
  reasonChange: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_REASON_CHANGE;
  contentChange: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_CONTENT_CHANGE;
  send: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_SEND_REQUEST;
  required: EnumTranslateKey = EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED;
  popupTitle: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_REQUEST_EDITING_TITLE;

  popup!: any;
  content!: any;
  reason!: any;

  subscriptions: Subscription[] = [];
  landscapeMode: any;

  id!: number | any;
  employeeId!: any;

  data: {
    id: number;
    orgConcurrentName: string;
    positionConcurrentName: string;
    effectiveDate: string;
    expirationDate: string;
    contractType: string;
    statusId: any;
    timeConcurrentYear: string;
    timeConcurrentMonth: string;
    timeNull:string;
  }[] = [];

  captionCode!: EnumTranslateKey;

  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_ID,
            field: 'id',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            hidden: true,
            type: 'number'
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_ID,
            field: 'sysOtherCode',
            value: '00046',
            controlType: EnumFormBaseContolType.TEXTBOX,
            hidden: true,
            type: 'string'
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_ID,
            field: 'idChange',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            hidden: true,
            type: 'number'
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_ID,
            field: 'employeeId',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            hidden: true,
            type: 'number'
          }
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_REASON_CHANGE,
            field: 'reasonChange',
            value: '',
            controlType: EnumFormBaseContolType.TEXTAREA,
            type: 'string'
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_UPLOAD_FILE,
            field: 'attachmentBuffer',
            value: null,
            controlType: EnumFormBaseContolType.ATTACHMENT,
            assignTo: 'fileName',
            type: 'object',
          },
        ]
      ]
    }
  ];

  constructor(
    public override dialogService: DialogService,
    private alertService: AlertService,
    public mls: MultiLanguageService,
    private authService: AuthService,
    public appService: AppService,
    public urlService: UrlService,
    public workingBeforeService: WorkingBeforeService,
  ) {
    super(dialogService);
    urlService.currentRouteUrl$.next('/profile/work-present');
  }

  ngOnInit(): void {
    this.popup = <HTMLInputElement>document.getElementById('popup1');
    console.log(this.popup);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.mls.lang$.subscribe((x) => (this.lang = x)),

        this.authService.data$.subscribe((data) => (this.employeeId = data?.employeeId)),

        this.appService
          .get(`/api/PortalRequestChange/GetConcurrentlyByEmpId?id=${this.employeeId}`)
          .subscribe((x: any) => {
            if (x.ok && x.status == 200) {
              var data = x.body.innerBody;

              data.map((x: any) => {
                (x.timeConcurrentYear = x.timeConcurrentYear > 0 ? x.timeConcurrentYear + ' năm' : '');
                  (x.timeConcurrentMonth = x.timeConcurrentMonth > 0 ? x.timeConcurrentMonth + ' tháng' : '');
                  if(x.timeConcurrentYear ==="" && x.timeConcurrentMonth ===""){
                    x.timeConcurrentMonth ="0 tháng"
                  }
                  this.data.push(x);
              });
              // this.data = data;
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

    this.form.get('id')?.setValue(this.record.id);
    this.form.get('employeeId')?.setValue(this.record.employeeId);
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }



  onHandleItemClick(record: any) {
    this.record = record;
    // this.urlService.previousRouteUrl$.next("/profile/work-present/contract");

    this.showPopup = true;
  }

  onClickSubmit(event: any) {
    //LAM MUA LAM GIO O DAY

    if (!!event) {
      var payloadData = JSON.parse(event);

      payloadData.idChange = payloadData.id;
      payloadData.id = null;

      this.appService.post(api.PORTAL_REQUEST_CHANGE_SEND, payloadData).subscribe(x => {
        if (x.ok && x.status == 200) {
          // show alert success
          this.alertService.info(this.mls.trans(x.body.messageCode, this.lang), this.alertOptions);
        } else {
          // show alert fail
          this.alertService.info(this.mls.trans(x.body.messageCode, this.lang), this.alertOptions);
        }
      });

      this.showPopup = false;
    }
  }

  onClickCancel(event: any) {
    //LAM MUA LAM GIO O DAY

    this.showPopup = false;
  }
}
