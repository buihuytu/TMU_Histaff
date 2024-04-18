import { AfterViewInit, Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, IAlertOptions, EnumCoreButtonVNSCode, EnumCoreFileUploaderType, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AlertService, MultiLanguageService, AuthService, AppService, UrlService, CorePageEditComponent, TranslatePipe, TableCellPipe } from "ngx-histaff-alpha";
import { Subscription, filter, map } from "rxjs";
import { WorkPresentService } from "../work-present.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-wage-allowance",
  standalone: true,
  imports: [
    CommonModule,
    CorePageEditComponent,
    TranslatePipe,
    TableCellPipe,
  ],
  templateUrl: "./wage-allowance.component.html",
  styleUrls: ["./wage-allowance.component.scss"],
})
export class WageAllowanceComponent
  extends BaseEditComponent
  implements OnInit, AfterViewInit {
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

  uploadFileType: EnumCoreFileUploaderType =
    EnumCoreFileUploaderType.PDF;
  fileDataControlName: string = 'avatarFileData';
  fileNameControlName: string = 'avatarFileName';
  fileTypeControlName: string = 'avatarFileType';
  lang!: string;
  checkedContent: boolean = true;
  checkedReason: boolean = true;
  checkData: boolean = true;

  decisionType: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_LABEL_WORKING_PROCESS_DECISION_TYPE;
  taxTableName: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_TAXTABLENAME;
  regionName: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_REGION_NAME;
  salaryScaleName: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_SAL_SCALE_NAME;
  effectDate: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_LABEL_WORKING_PROCESS_EFFECT_DATE;
  expireDate: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_LABEL_WORKING_PROCESS_EXPIRE_DATE;
  salaryRankName: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_SAL_RANK_NAME;
  salaryLevelName: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_SAL_LEVEL_NAME;
  coefficient: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_COEFFICIENT;
  decisionNo: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_LABEL_WORKING_PROCESS_DECISION_NO;
  effectUpsalDate: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_EFFECT_UP_SAL_DATE;
  salaryScaleDcvName: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_SAL_SCALE_DCV_NAME;
  salaryRankDcvName: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_SAL_RANK_DCV_NAME;
  salaryLevelDcvName: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_SAL_LEVEL_DCV_NAME;
  coefficientDcv: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_SAL_COEFFICIENT_DCV;
  salPercent: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_SAL_PERCENT;
  statusName: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_STATUS_NAME;
  salInsu: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_SAL_INSU;

  //phu cap
  allowanceName: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_NAME;
  coefficientAllowance: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_COEFFICIENT_ALLOWANCE;
  reasonChange: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_REASON_CHANGE;
  popupTitle: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_REQUEST_EDITING_TITLE;
  contentChange: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_CONTENT_CHANGE;
  send: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POP_UP_SEND_REQUEST;
  required: EnumTranslateKey = EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED;

  popup!: any;
  content!: any;
  reason!: any;

  subscriptions: Subscription[] = [];
  landscapeMode: any;
  crud!: ICorePageEditCRUD;
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
            value: '00044',
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
          }
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
          }
        ]
      ]
    }
  ]

  id!: number | any;
  employeeId!: any;
  getSalInsu!: number;
  data: {
    id: number;
    typeName: string;
    typeId: string; //loai to trinh - so to trinh/QD
    decisionNo: string; //loai to trinh - so to trinh/QD
    taxTableName: string; //bieu thue
    regionName: string; //vung
    salaryScaleName: string; //bang luong chuc danh
    salaryRankName: string; //ngach luong chuc danh
    salaryLevelName: string; //bac luong chuc danh
    coefficient: string; //he so chuc danh
    salaryScaleDcvName: string; //bang luong dcv
    salaryRankDcvName: string; //chuc danh cong viec/phu cap dcv
    salaryLevelDcvName: string; //muc luong dcv
    coefficientDcv: string; //he so dcv
    salPercent: string; //% luong
    effectUpsalDate: string; //ngay den han xem xet bac luong
    statusName: string; //trang thai
    effectDate: string; //ngay hieu luc
    expireDate: string; //ngay het hieu luc
    salInsu: number;// muc luong
    allowanceList: {
      id: number;
      allowanceName: string; //ten phu cap
      coefficient: string; //he so phu cap
      expireDate: string; //ngay hieu luc
      effectdate: string; //ngay het hieu luc
    }[];
  }[] = [];

  constructor(
    public override dialogService: DialogService,
    private alertService: AlertService,
    public mls: MultiLanguageService,
    private authService: AuthService,
    public appService: AppService,
    public workPresentService: WorkPresentService,
    public router: Router,
    public urlService: UrlService
  ) {
    super(dialogService);
    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SAL_ALLOWANCE_REASON_EDIT;
    this.crud = {
      c: api.PORTAL_REQUEST_CHANGE_SEND,
      r: api.HU_DISCIPLINE_READ,
      u: api.HU_DISCIPLINE_UPDATE,
      d: api.HU_DISCIPLINE_DELETE,
    };
    urlService.currentRouteUrl$.next('/profile/work-present')
  }

  ngOnInit(): void {
    this.popup = <HTMLInputElement>document.getElementById("popup1");
    console.log(this.popup);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.mls.lang$.subscribe((x) => (this.lang = x)),
        this.authService.data$.subscribe(
          (data) => (this.employeeId = data?.employeeId)
        ),
        this.appService
          .get(
            `/api/PortalRequestChange/GetSalAllowanceProcessByEmp?id=${this.employeeId}`
          )
          .subscribe((x: any) => {
            if (x.ok && x.status == 200) {
              var data = x.body.innerBody;
              this.data = data;
              if (this.data.length > 0) {
                this.checkData = true;
              } else this.checkData = false;
            }
          })
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
    // this.urlService.previousRouteUrl$.next("/profile/work-present/wage-allowance");

    this.showPopup = true;
  }

  onClickSubmit(event: any) {
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
