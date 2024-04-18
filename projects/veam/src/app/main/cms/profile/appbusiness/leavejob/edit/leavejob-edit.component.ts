import { Component, ViewEncapsulation, OnInit, OnDestroy } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, MultiLanguageService, AppService, IFormatedResponse } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject, distinctUntilChanged } from "rxjs";

@Component({
  selector: 'app-leavejob-edit',
  templateUrl: './leavejob-edit.component.html',
  styleUrls: ['./leavejob-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeaveJobEditComponent extends BaseEditComponent implements OnInit, OnDestroy {

  /* Properties to be passed into core-page-edit */

  override entityTable = "HU_TERMINATE";

  loading: boolean = false;

  subscriptions: Subscription[] = [];

  groupOptionsReason$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsType$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  groupOptionsStatus$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  groupReasonGetByIdObject$ = new BehaviorSubject<any>(null);
  groupReasonGetByIdApi = api.SYS_OTHERLIST_READ;

  groupTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  groupTypeGetByIdApi = api.SYS_OTHERLIST_READ;

  groupStatusGetByIdObject$ = new BehaviorSubject<any>(null);
  groupStatusGetByIdApi = api.SYS_OTHERLIST_READ;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  signGetByIdObject$ = new BehaviorSubject<any>(null);
  signGetByIdApi = api.HU_EMPLOYEE_READ;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
          ],
        ],
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EMPLOYEE_INFOR,
        rows:
          [
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EMPLOYEE_CODE,
                field: 'employeeId',
                value: '',
                controlType: EnumFormBaseContolType.SEEKER,

                /* 
                  START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                  we must pass the three properties bellow:
                 */
                seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
                getByIdObject$: this.employeeGetByIdObject$,
                getByIdApi: this.employeeGetByIdApi,
                boundFrom: 'id',
                shownFrom: 'code',
                alsoBindTo: [{ takeFrom: 'fullname', bindTo: 'employeeName' },
                { takeFrom: 'orgName', bindTo: 'orgName' },
                { takeFrom: 'positionName', bindTo: 'positionName' },
                { takeFrom: 'joinDate', bindTo: 'joinDate' }],
                /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
                type: 'text',
                readonly: true,
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ]
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EMPLOYEE_NAME,
                field: 'employeeName',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'text',
                disabled: true,
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_ORG_NAME,
                field: 'orgName',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'text',
                disabled: true,
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_TITLE_NAME,
                field: 'positionName',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'text',
                disabled: true,
              },
            ],
            [{
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_JOIN_DATE,
              field: 'joinDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              disabled: true,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_CONTRACT_NO,
              field: 'contractNo',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_CONTRACT_DATESTART,
              field: 'dateStart',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              disabled: true,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_CONTRACT_DATEEND,
              field: 'dateEnd',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              disabled: true,
            },
            ],
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_SENIORITY,
                field: 'seniority',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'text',
                disabled: true,
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_LASTDATE,
                field: 'lastDate',
                value: '',
                controlType: EnumFormBaseContolType.DATEPICKER,
                type: 'date',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ],
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE,
                field: 'effectDate',
                value: '',
                controlType: EnumFormBaseContolType.DATEPICKER,
                type: 'date',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ]
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_LEAVEJOB_ATTACHED_APPLICATION_FOR_LAVE,
                field: 'fileBuffer',
                value: null,
                controlType: EnumFormBaseContolType.ATTACHMENT,
                assignTo: 'fileName',
                type: 'object',
              }
            ],
          ],
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_INFOR,
        rows:
          [
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_SENDDATE,
                field: 'sendDate',
                value: '',
                controlType: EnumFormBaseContolType.DATEPICKER,
                type: 'date',
              },

              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_REASONID,
                field: 'reasonId',
                value: '',
                getByIdObject$: this.groupReasonGetByIdObject$,
                getByIdApi: this.groupReasonGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsReason$,
                type: 'number',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ]
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_TERREASON,
                field: 'terReason',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'text',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_AVG_SAL_SIX_MO,
                field: 'avgSalSixMo',
                value: '',
                controlType: EnumFormBaseContolType.CURRENCY,
                type: 'number',
              },
            ],
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_CAL_SEVERANCE_ALLOWANCE,
                field: 'isCalSeveranceAllowance',
                value: '',
                controlType: EnumFormBaseContolType.CHECKBOX,
                type: 'boolean',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_SEVERANCE_ALLOWANCE,
                field: 'severanceAllowance',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'number',
                disabled:true
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_PAYMENT_REMAINING_DAY,
                field: 'paymentRemainingDay',
                value: '',
                controlType: EnumFormBaseContolType.CURRENCY,
                type: 'number',
                disabled: true
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_BLACK_LIST,
                field: 'isBlackList',
                value: '',
                controlType: EnumFormBaseContolType.CHECKBOX,
                type: 'boolean'
              }
            ],
          ],
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_APPROVE_INFOR,
        rows:
          [
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_TYPEID,
                field: 'typeId',
                value: '',
                getByIdObject$: this.groupTypeGetByIdObject$,
                getByIdApi: this.groupTypeGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsType$,
                type: 'number',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ]
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_DECISIONNO,
                field: 'decisionNo',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'text',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ]
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_NOTICENO,
                field: 'noticeNo',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'text',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_UPLOAD_FILE,
                field: 'attachmentBuffer',
                value: null,
                controlType: EnumFormBaseContolType.ATTACHMENT,
                assignTo: 'attachment',
                type: 'object',
              },
            ],
            [

              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_SIGNDATE,
                field: 'signDate',
                value: '',
                controlType: EnumFormBaseContolType.DATEPICKER,
                type: 'date',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_SIGNERNAME,
                field: 'signId',
                value: '',
                controlType: EnumFormBaseContolType.SEEKER,

                /* 
                  START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                  we must pass the three properties bellow:
                  */
                seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
                getByIdObject$: this.signGetByIdObject$,
                getByIdApi: this.signGetByIdApi,
                boundFrom: 'id',
                shownFrom: 'fullname',
                alsoBindTo: [{ takeFrom: 'positionName', bindTo: 'signerPosition' }],
                /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
                type: 'text',
                readonly: true,
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_SIGNER_POSITION,
                field: 'signerPosition',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'text',
                disabled: true,
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_STATUS,
                field: 'statusId',
                value: 993,
                getByIdObject$: this.groupStatusGetByIdObject$,
                getByIdApi: this.groupStatusGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsStatus$,
                type: 'number',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ]
              },
            ],
          ],
      },
    ];
  constructor(
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private appService: AppService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_LEAVEJOB_EDIT;

    this.crud = {
      c: api.HU_LEAVEJOB_CREATE,
      r: api.HU_LEAVEJOB_READ,
      u: api.HU_LEAVEJOB_UPDATE,
      d: api.HU_LEAVEJOB_DELETE,
    };

  }

  ngOnInit(): void {

    this.loading = true;
    // Start PUSHING 1st subscriptions
    this.subscriptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'STATUS')
        .subscribe((res: any) => {

          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              // ONLY THEN YOU WILL IMPLEMENT YOUR LOGICS
              const options: { value: number | null; text: string; }[] = [];
              options.push({
                value: Number(),
                text: ''
              })
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name
                })
              })
              this.groupOptionsStatus$.next(options);

            }
          }
        })
    ) // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()

    // Start PUSHING 2ND subscriptions
    this.subscriptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'TER_REASON')
        .subscribe((res: any) => {

          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              // ONLY THEN YOU WILL IMPLEMENT YOUR LOGICS
              const options: { value: number | null; text: string; }[] = [];
              options.push({
                value: Number(),
                text: ''
              })
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name
                })
              })
              this.groupOptionsReason$.next(options);

            }
          }
        })
    ) // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()    
    // Start PUSHING 2ND subscriptions
    this.subscriptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'TYPE_TER_REASON')
        .subscribe((res: any) => {

          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              // ONLY THEN YOU WILL IMPLEMENT YOUR LOGICS
              const options: { value: number | null; text: string; }[] = [];
              options.push({
                value: Number(),
                text: ''
              })
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name
                })
              })
              this.groupOptionsType$.next(options);

            }
          }
        })
    ) // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()    
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;

    this.subscriptions.push(
      this.form.get('lastDate')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x && typeof x.getDate === 'function') {
          var newEffectDate = new Date(x);
          var joinDate = this.form.get('joinDate')?.value;
          this.form.get('effectDate')?.patchValue(new Date(newEffectDate.setDate(newEffectDate.getDate() + 1)));
          if (!!joinDate){
            joinDate = new Date(joinDate);
            var newDate = x; 
            var joinDateString = `${joinDate.getDate()}/${joinDate.getMonth()+1}/${joinDate.getFullYear()}`; 
            var newDateString = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
            this.subscriptions.push( // <== Inner push
              this.appService
              .get("/api/HuTerminate/CalculateSeniority?dStart1="+ joinDateString +"&dStop1=" + newDateString)
              .subscribe((res: any) => {
                if (!!res.ok && res.status === 200) {
                  const body: IFormatedResponse = res.body
                  if (body.statusCode === 200 && !!body.innerBody) {
                    this.form.get('seniority')?.patchValue(body.innerBody);
                  }
                }
            }))
          }
          if (this.form.get('lastDate')?.value) {
            this.form.get('paymentRemainingDay')?.patchValue('0');
            const lastDate = new Date(this.form.get('lastDate')?.value);
            var lastDateString = `${lastDate.getDate()}/${lastDate.getMonth()+1}/${lastDate.getFullYear()}`;
            this.subscriptions.push( 
              this.appService
                .get("/api/HuTerminate/GetPeroidId?emp=" + this.form.get('employeeId')?.value + "&lastDate=" + lastDateString)
                .subscribe((res: any) => {
                  if (!!res.ok && res.status === 200) {
                    const body: IFormatedResponse = res.body
                    if (body.statusCode === 200 && !!body.innerBody) {
                      this.form.get('paymentRemainingDay')?.patchValue(body.innerBody);
                    }
                  }
                }))
          }
          
        } else {

        }
      })!
    )
    this.form.get('effectDate')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
      this.form.get('contractNo')?.patchValue('');
      this.form.get('dateStart')?.patchValue(null);
      this.form.get('dateEnd')?.patchValue(null);
      if (!!x) {
        if (!!this.form.get('employeeId')?.value) {
          const date = new Date(x);
          var dateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
          this.subscriptions.push( // <== Inner push
            this.appService
              .get(api.HU_CONTRACT_GET_LAST + this.form.get('employeeId')?.value + "&date=" + dateString
              )
              .subscribe((res: any) => {
                if (!!res.ok && res.status === 200) {
                  const body: IFormatedResponse = res.body
                  if (body.statusCode === 200 && !!body.innerBody) {
                    this.form.get('contractNo')?.patchValue(body.innerBody.contractNo);
                    this.form.get('dateStart')?.patchValue(body.innerBody.startDate);
                    this.form.get('dateEnd')?.patchValue(body.innerBody.expireDate);
                  }
                }
              }))
        }

      } else {

      }

    })!
    this.form.get('isCalSeveranceAllowance')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
      if (!!x) {
        this.form.get('severanceAllowance')?.enable();
      }else{
        this.form.get('severanceAllowance')?.patchValue('');
        this.form.get('severanceAllowance')?.disable();
      }
    })!

    this.form.get('employeeId')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
      this.form.get('contractNo')?.patchValue('');
      this.form.get('dateStart')?.patchValue(null);
      this.form.get('dateEnd')?.patchValue(null);
      if (!!x) {
        if (!!this.form.get('effectDate')?.value) {
          const effectDate = new Date(this.form.get('effectDate')?.value);
          var effectDateString = `${effectDate.getDate()}/${effectDate.getMonth()+1}/${effectDate.getFullYear()}`;
          this.subscriptions.push( // <== Inner push
            this.appService
              .get(api.HU_CONTRACT_GET_LAST + x + "&date=" + effectDateString)
              .subscribe((res: any) => {
                if (!!res.ok && res.status === 200) {
                  const body: IFormatedResponse = res.body
                  if (body.statusCode === 200 && !!body.innerBody) {
                    this.form.get('contractNo')?.patchValue(body.innerBody.contractNo);
                    this.form.get('dateStart')?.patchValue(body.innerBody.startDate);
                    this.form.get('dateEnd')?.patchValue(body.innerBody.expireDate);
                  }
                }
              }))
        }

      } else {

      }

    })!
      this.form.get('id')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        setTimeout(() => {
        if (!!x && !!this.form.get('statusId')?.value && this.form.get('statusId')?.value == 994) {
          this.form.get('employeeId')?.disable();
          this.form.get('lastDate')?.disable();
          this.form.get('effectDate')?.disable();
          this.form.get('sendDate')?.disable();
          this.form.get('reasonId')?.disable();
          this.form.get('terReason')?.disable();
          this.form.get('isCalSeveranceAllowance')?.disable();
          this.form.get('avgSalSixMo')?.disable();
          this.form.get('severanceAllowance')?.disable();
          this.form.get('paymentRemainingDay')?.disable();
          this.form.get('typeId')?.disable();
          this.form.get('decisionNo')?.disable();
          this.form.get('noticeNo')?.disable();
          this.form.get('attachmentBuffer')?.disable();
          this.form.get('signDate')?.disable();
          this.form.get('signId')?.disable();
          this.form.get('statusId')?.disable();
        }
      }, 1500);
      })!

  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngAfterViewInit(): void {
    this.form.get("signId")?.valueChanges.subscribe(x => {
      if (x == null) {
        this.form.get("signerPosition")?.patchValue(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }
}
