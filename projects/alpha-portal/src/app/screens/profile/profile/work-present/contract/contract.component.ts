import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, IAlertOptions, EnumCoreButtonVNSCode, ICoreFormSection, EnumFormBaseContolType, DialogService, AlertService, MultiLanguageService, AuthService, AppService, UrlService, IFormatedResponse, TranslatePipe, CorePageEditComponent, TableCellPipe } from 'ngx-histaff-alpha';
import { Subscription } from 'rxjs';
import { WorkingBeforeService } from '../../working-before/working-before.edit.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    CorePageEditComponent,
    TableCellPipe,
  ],
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent extends BaseEditComponent implements OnInit, AfterViewInit {
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };

  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.SEND,
    EnumCoreButtonVNSCode.CANCEL
  ];

  showPopup!: boolean;
  record!: any;

  lang!: string;
  checkedContent: boolean = true;
  checkedReason: boolean = true;
  checkData: boolean = true;

  accordionTitle = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_ACCORDION_TITLE;
  sendTime = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_SEND_TIME;
  registerLeave = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_REGISTER_LEAVE;
  leaveType = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_LEAVE_TYPE;
  fromDate = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_FROM_DATE;
  toDate = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_TO_DATE;
  note = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_NOTE;
  approve = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_APPROVE;
  reject = EnumTranslateKey.PWA_HOME_MENU_ITEM_LEAVE_APPROVE_REJECT;

  titleNull: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_PORTAL_TITLE_NULL;
  contractNo: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_CONTRACTNO;
  salInsu: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_SAL_INSU;
  contractType: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_CONTRACTTYPENAME;
  contractAppendixNo: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACTAPPENDIX_CONTRACTAPPENDIXNO;
  signDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_SIGNDATE;
  startDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STARTDATE;
  expireDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EXPIREDATE;
  reasonChange: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_REASON_CHANGE;
  contentChange: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_CONTENT_CHANGE;
  send: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_SEND_REQUEST;
  required: EnumTranslateKey = EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED;
  popupTitle: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_REQUEST_EDITING_TITLE;
  allowanceName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACTAPPENDIX_ALLOWANCE_NAME;
  coefficient: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACTAPPENDIX_COEFFICIENT;

  popup!: any;
  content!: any;
  reason!: any;

  override entityTable = 'PORTAL_REQUEST_CHANGE';
  subscriptions: Subscription[] = [];
  landscapeMode: any;

  id!: number | any;
  employeeId!: any;
  getSalInsu!: number;
  data: {
    id: number;
    contractNo: string;
    startDate: string;
    expireDate: string;
    contractType: string;
    salInsu: number;
    appendix: {
      id: number;
      contractAppendixNo: string;
      startDate: string;
      expireDate: string;
      contractType: string;
      signDate: string;
      contractId: number;
      salInsu: number;
      coefficient: number;
      allowanceName: string;
    }[];
  }[] = [];

  appendixList: {
    id: number;
    contractAppendixNo: string;
    startDate: string;
    expireDate: string;
    contractType: string;
    signDate: string;
    contractId: number;
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
            value: '00045',
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
    this.appendixList = [];
    this.data = [];
    urlService.currentRouteUrl$.next('/profile/work-present')
  }

  ngOnInit(): void {
    this.popup = <HTMLInputElement>document.getElementById('popup1');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.mls.lang$.subscribe((x) => (this.lang = x)),

        this.authService.data$.subscribe((data) => (this.employeeId = data?.employeeId)),

        this.appService
          .get(`/api/HuContract/GetContractByEmpProfile2?EmployeeId=${this.employeeId}`)
          .subscribe((x: any) => {
            if (x.ok && x.status == 200) {
              var data = x.body.innerBody;
              this.data = data;
              if (this.data.length > 0) {
                this.checkData = true;
              } else this.checkData = false;
            }
          }),

      );
      this.subscriptions.push(
        this.appService.get(`/api/PortalRequestChange/GetSalInsuByEmployeeId?employeeId=${this.employeeId}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body
              this.getSalInsu = body.innerBody.salInsu
              console.log(this.getSalInsu);

            }
          })
      )
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
