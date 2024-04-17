import { Component, ViewEncapsulation, isDevMode } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AlertService, AppService, BaseEditComponent, CoreFormService, DialogService, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, EnumFormBaseContolType, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD, ICorePageEditColumnComposition, ICoreTableColumnItem, IFormatedResponse, MultiLanguageService, OrganizationService, ResponseService } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, distinctUntilChanged, map, filter } from 'rxjs';


@Component({
  selector: 'cms-profile-contractinfor-edit',
  templateUrl: './contractinfor-edit.component.html',
  styleUrls: ['./contractinfor-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContractInforEditComponent extends BaseEditComponent {
  override entityTable = 'HU_CONTRACT';
  subsctiptions: Subscription[] = [];
  captionCode!: EnumTranslateKey;
  loading: boolean = false;
  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;
  TypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  contractTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  contractTypeGetByIdApi = api.HU_CONTRACT_TYPE_READ;

  contractTypeNameOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  contractTypeNameGetByIdObject$ = new BehaviorSubject<any>(null);
  contractTypeNameGetByIdApi = api.HU_CONTRACT_TYPE_READ;

  sysOtherlistGetByIdObject$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi = api.SYS_OTHERLIST_READ;
  groupOptionsStatus$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  wageGetByIdObject$ = new BehaviorSubject<any>(null);
  wageGetByIdApi = api.HU_WAGE_READ;
  defauleValueStatus: number = 993; // sửa  getIdbycode sau
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  huWorkingAllowList: any[] = [];
  allowanceOuterParam$ = new BehaviorSubject<any>(null);
  workingId!: number;
  // Lọc trước chi HU_WORKING_SEEKER
  workingPreDefinedOuterParam$ = new BehaviorSubject<any>({ approvedStatus: true });
  employeeSignGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeSignGetByIdApi = api.HU_EMPLOYEE_READ;
  sections: ICoreFormSection[] =
    [
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_CONTRACT,
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ID,
              field: 'orgId',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden: true,
              type: 'text'
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EMPLOYEE_CODE,
              field: 'employeeId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              getByIdObject$: this.employeeGetByIdObject$,
              getByIdApi: this.employeeGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'code',
              alsoBindTo: [{ takeFrom: 'fullname', bindTo: 'employeeName' },
              { takeFrom: 'orgName', bindTo: 'orgName' },
              { takeFrom: 'positionName', bindTo: 'positionName' },
              { takeFrom: 'orgId', bindTo: 'orgId' },
                /* { takeFrom: 'contractNo', bindTo: 'contractTypeId' }, */
              ],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'text',
              readonly: true,
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
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_CONTRACTTYPENAME,
              field: 'contractTypeId',
              value: '',
              getByIdObject$: this.contractTypeGetByIdObject$,
              getByIdApi: this.contractTypeGetByIdApi,
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.TypeOptions$,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            // {
            //   flexSize: 3,
            //   label: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_CONTRACT_TYPE_ID,
            //   field: 'contractTypeName',
            //   value: '',
            //   getByIdObject$: this.contractTypeNameGetByIdObject$,
            //   getByIdApi: this.contractTypeNameGetByIdApi,
            //   shownFrom: 'name',
            //   controlType: EnumFormBaseContolType.DROPDOWN,
            //   dropdownOptions$: this.contractTypeNameOptions$,
            //   type: 'number',
            //   validators: [
            //     {
            //       name: 'required',
            //       validator: Validators.required,
            //       errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
            //     }
            //   ]
            // },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STARTDATE,
              field: 'startDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              readonly: false,
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
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EXPIREDATE,
              field: 'expireDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              readonly: true,
              type: 'date',
            },

          ],
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_CODE,
              field: 'signerName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden: true,
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_STATUS,
              field: 'statusId',
              value: this.defauleValueStatus,
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.groupOptionsStatus$,
              getByIdObject$: this.sysOtherlistGetByIdObject$,
              getByIdApi: this.sysOtherlistGetByIdApi,
              shownFrom: 'name',
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
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_CONTRACTNO,
              field: 'contractNo',
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
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_SIGNERNAME,
              field: 'signId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,

              /* 
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
               */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              getByIdObject$: this.employeeSignGetByIdObject$,
              getByIdApi: this.employeeSignGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'fullname',
              alsoBindTo: [{ takeFrom: 'fullname', bindTo: 'signerName' },
              { takeFrom: 'positionName', bindTo: 'signerPosition' }],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'text',
              readonly: true,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_SIGNER_POSITION,
              field: 'signerPosition',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              //readonly: true, // We will update this field programatically
              type: 'text',
              disabled: true,
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_SIGNDATE,
              field: 'signDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_UPLOAD_FILE,
              field: 'uploadFileBuffer',
              value: null,
              controlType: EnumFormBaseContolType.ATTACHMENT,
              assignTo: 'uploadFile',
              type: 'object',
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
            },
          ],
        ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_INFOR_SALARY,
        rows:
          [
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_WAGE, // cần chỉnh lại
                field: 'workingId', // cần chỉnh lại
                value: '',
                controlType: EnumFormBaseContolType.SEEKER,
                seekerSourceType: EnumCoreFormControlSeekerSourceType.WAGE_SEEK, // <==== NEW
                preDefinedOuterParam$: this.workingPreDefinedOuterParam$,
                getByIdObject$: this.wageGetByIdObject$, // cần chỉnh lại
                getByIdApi: this.wageGetByIdApi, // cần chỉnh lại
                boundFrom: 'id', // cần chỉnh lại
                shownFrom: 'decisionNo', // cần chỉnh lại
                alsoBindTo: [
                  { takeFrom: 'shortTempSalary', bindTo: 'shortTempSalary' },
                  { takeFrom: 'salPercent', bindTo: 'salPercent' },
                  { takeFrom: 'taxTableName', bindTo: 'taxTableName' },
                  { takeFrom: 'regionName', bindTo: 'regionName' },
                  { takeFrom: 'salaryType', bindTo: 'salaryType' },
                  { takeFrom: 'salaryScaleName', bindTo: 'salaryScaleName' },
                  { takeFrom: 'salaryRankName', bindTo: 'salaryRankName' },
                  { takeFrom: 'salaryLevelName', bindTo: 'salaryLevelName' },
                  { takeFrom: 'coefficient', bindTo: 'coefficient' },
                  { takeFrom: 'salaryScaleDcvName', bindTo: 'salaryScaleDcvName' },
                  { takeFrom: 'salaryRankDcvName', bindTo: 'salaryRankDcvName' },
                  { takeFrom: 'salaryLevelDcvName', bindTo: 'salaryLevelDcvName' },
                  { takeFrom: 'coefficientDcv', bindTo: 'coefficientDcv' },
                ],
                /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
                type: 'text',
                readonly: true,
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
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SHORT_TEMP_SALARY,
                field: 'shortTempSalary',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                disabled: true,
                type: 'number'
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_SAL_PERCENT,
                field: 'salPercent',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                disabled: true,
                type: 'number'
              },
            ],
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_TAXTABLE,
                field: 'taxTableName',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                disabled: true,
                type: 'text'
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_REGION,
                field: 'regionName',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                disabled: true,
                type: 'text'
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_TYPE_NAME,
                field: 'salaryType',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                disabled: true,
                type: 'text'
              },
            ],
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_SCALE_NAME,
                field: 'salaryScaleName',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                disabled: true,
                type: 'text'
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_RANK_NAME,
                field: 'salaryRankName',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                disabled: true,
                type: 'text'
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_LEVEL_NAME,
                field: 'salaryLevelName',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                disabled: true,
                type: 'text'
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_COEFFICIENT,
                field: 'coefficient',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                disabled: true,
                type: 'text'
              },
            ],
            [
              {
                flexSize: 0,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_COEFFICIENT_DCV,
                field: 'isReceive',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                disabled: true,
                hidden: true,
                type: 'text'
              },
            ],
          ]
      },
      // {
      //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_INFOR_ALLOWANCE,
      //   rows: [
      //   ]
      // },
    ];
  // columnsAllowance: ICoreTableColumnItem[] = [
  //   {
  //     caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_ID,
  //     field: 'id',
  //     hidden: true,
  //     type: 'string',
  //     align: 'left',
  //     width: 30,
  //   },
  //   {
  //     caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_ALLOWANCE_ID,
  //     field: 'allowanceName',  // hiển thị cột này, muốn vậy phần BE cần join để lấy ra cột này
  //     type: 'string',
  //     align: 'left',
  //     width: 400,
  //   },
  //   {
  //     caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_COEFFICIENT,
  //     field: 'coefficient',
  //     pipe: EnumCoreTablePipeType.NUMBER,
  //     type: 'number',
  //     align: 'left',
  //     width: 300,
  //   },
  //   {
  //     caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_EFFECTDATE,
  //     field: 'effectdate',
  //     pipe: EnumCoreTablePipeType.DATE,
  //     type: 'date',
  //     align: 'left',
  //     width: 300,
  //   },
  //   {
  //     caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_EXPIREDATE,
  //     field: 'expireDate',
  //     pipe: EnumCoreTablePipeType.DATE,
  //     type: 'date',
  //     align: 'left',
  //     width: 300,
  //   }
  // ]
  
  constructor(
    private appService: AppService,
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private coreFormService: CoreFormService,
    private alertService: AlertService,
    private responseService: ResponseService,
    private organizationService : OrganizationService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_CONTRACT_EDIT;

    this.crud = {
      c: api.HU_CONTRACT_CREATE,
      r: api.HU_CONTRACT_READ,
      u: api.HU_CONTRACT_UPDATE,
      d: api.HU_CONTRACT_DELETE_IDS,
    };
  }
  ngOnInit(): void {
    this.loading = true;
    this.appService
      .get(api.HU_CONTRACT_GETLISTTYPE)
      .subscribe((res: any) => {
        const options: { value: number; text: string; }[] = [];
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        })
        this.TypeOptions$.next(options);
        this.loading = false;
      });
    this.appService
      .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'STATUS')
      .subscribe((res: any) => {
        const options: { value: number; text: string; }[] = [];
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        })
        this.groupOptionsStatus$.next(options);
      })
  }
  ngAfterViewInit(): void {
    setTimeout(() => {

    })
  }
  onFormCreated(e: FormGroup): void {
    this.form = e;

    this.subsctiptions.push(
      // this.form.get('employeeId')?.valueChanges.pipe(distinctUntilChanged())
      // // .pipe(
      // //   filter((_) => {
      // //     const touched = this.form.get('employeeId')?.touched;
      // //     return !!touched;
      // //   }),
      // // )
      // .subscribe((x) => {
      //   if (!!x) {
      //     this.appService
      //       .post(api.HU_CONTRACT_IS_RECEIVE, {
      //         employeeId: x,
      //       })
      //       .subscribe((res: any) => {
      //         if (!!res.ok && res.status === 200) {
      //           const body: IFormatedResponse = res.body;
      //           if (body.statusCode === 200) {
      //             const confirm = window.confirm(this.mls.trans('COMMON.CONFIRM.SPONTANEOUS.DECISION.TO.RECEIVE') + '?');
      //             if (confirm) {
      //               this.form.get('isReceive')?.setValue(1);
      //             } else {
      //               this.form.get('isReceive')?.setValue(0);
      //             }
      //           } else if (body.statusCode != 204) {
      //             this.form.get('isReceive')?.setValue(0);
      //           } else if (body.statusCode == 204) {
      //             this.form.get('isReceive')?.setValue(1);
      //           }
      //         }
      //       });
      //   }
      // })!,
      this.form.get('employeeId')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          // this.form.get('workingId')?.patchValue('');
          // this.form.get('shortTempSalary')?.patchValue('');
          // this.form.get('salPercent')?.patchValue('');
          // this.form.get('taxTableName')?.patchValue('');
          // this.form.get('regionName')?.patchValue('');
          // this.form.get('salaryType')?.patchValue('');
          // this.form.get('salaryScaleName')?.patchValue('');
          // this.form.get('salaryRankName')?.patchValue('');
          // this.form.get('salaryLevelName')?.patchValue('');
          // this.form.get('coefficient')?.patchValue('');
          // this.form.get('salaryScaleDcvName')?.patchValue('');
          // this.form.get('salaryRankDcvName')?.patchValue('');
          // this.form.get('salaryLevelDcvName')?.patchValue('');
          // this.form.get('coefficientDcv')?.patchValue('');
          //this.form.get('expireDate')?.patchValue(undefined);
          this.workingPreDefinedOuterParam$.next({
            employeeId: x,
            statusId: 994
          })
          
          this.subsctiptions.push(
            this.appService.get(api.HU_CONTRACT_GETCODE + `?id=${x}`)
              .pipe(
                map((f: any) => {
                  let options: string = "";
                  options = f.body.innerBody.code;
                  return options;
                })
              )
              .subscribe(response => {
                if (this.form.get('contractNo')?.value == "") this.form.get('contractNo')?.patchValue(response);
              })
          )
          if (!!this.form.get('statusId')?.value && this.form.get('statusId')?.value == "993") {
            this.appService
              .post(api.HU_CONTRACT_IS_RECEIVE, {
                employeeId: x,
              })
              .subscribe((res: any) => {
                if (!!res.ok && res.status === 200) {
                  const body: IFormatedResponse = res.body;
                  if (body.statusCode === 200) {
                    const confirm = window.confirm(this.mls.trans('COMMON.CONFIRM.SPONTANEOUS.DECISION.TO.RECEIVE') + '?');
                    if (confirm) {
                      this.form.get('isReceive')?.setValue(1);
                    } else {
                      this.form.get('isReceive')?.setValue(0);
                    }
                  } else {
                    this.form.get('isReceive')?.setValue(0);
                  }
                }
              });
          }
        }
      })!
    );

    this.subsctiptions.push(
      this.form.get('signId')?.valueChanges.subscribe(x => {
        if(!!x){
          this.organizationService.status$.value.activeKeys[0] = this.form.get('orgId')?.value.toString()
        }
         
      })!
    )


    this.subsctiptions.push(
      this.form.get('contractTypeId')?.valueChanges.pipe(
        filter((_) => {
          const touched = this.form.get('contractTypeId')?.touched;
          return !!touched;
        }),
      ).subscribe(x => {
        if (!!x) {
          if (isNaN(Date.parse(this.form.get('startDate')?.value)) === false) {
            //get enddate
            this.subsctiptions.push(
              this.appService.get(api.HU_CONTRACT_TYPE_READ + "?id=" + this.form.get('contractTypeId')?.value)
                .pipe(
                  map((f: any) => {
                    let options: string = "";
                    options = f.body.innerBody.period;
                    return options;
                  })
                )
                .subscribe(response => {
                  //if(this.form.get('contractNo')?.value == "") this.form.get('contractNo')?.patchValue(response);
                  //debugger;
                  if (isNaN(parseInt(response)) === false) {
                    var dateExpire = new Date(this.form.get('startDate')?.value);
                    this.form.get('expireDate')?.patchValue(new Date(dateExpire.setMonth(dateExpire.getMonth() + parseInt(response))));
                  } else {
                    //this.form.get('expireDate')?
                  }
                })
            )!
          }
          // this.subsctiptions.push(
          //   this.appService.get(api.HU_CONTRACT_GET_LIST_CONTRACT_TYPE_BY_ID + `?id=${x}`).subscribe(x =>{
          //     if(x.ok && x.status === 200 && x.body.statusCode === 200){
          //       const options: {value: number, text: string}[] = [];
          //       x.body.innerBody.map((y: any) => {
          //         options.push({
          //           value: y.id,
          //           text: y.name
          //         })
          //       });
          //       this.contractTypeNameOptions$.next(options)
          //     }
          //   })
          // )
        }
      })!
    )
    this.subsctiptions.push(
      this.form.get('startDate')?.valueChanges.pipe(
        filter((_) => {
          const touched = this.form.get('startDate')?.touched;
          return !!touched;
        }),
      ).subscribe(x => {
        if (!!x) {
          this.form.get('signDate')?.patchValue(x);
          this.subsctiptions.push(
            this.appService.get(api.HU_CONTRACT_GETWAYGEBYSTARTDATECONTRACT + this.form.get('employeeId')?.value + "&date=" + new Date(x).toLocaleDateString("en-US")).subscribe(x => {
              if (x.ok && x.status === 200) {
                const body: IFormatedResponse = x.body;
                if (body.statusCode === 200) {
                  this.form.get('workingId')?.patchValue(body.innerBody.id);
                  //this.form.get('decisionNo')?.patchValue(body.innerBody.decisionNo);
                  this.wageGetByIdObject$.next(body.innerBody)
                  if (body.innerBody.shortTempSalary !== undefined) {
                    this.form.get('shortTempSalary')?.patchValue(body.innerBody.shortTempSalary);
                  }
                  if (body.innerBody.salPercent !== undefined) {
                    this.form.get('salPercent')?.patchValue(body.innerBody.salPercent);
                  }
                  if (body.innerBody.taxTableName !== undefined) {
                    this.form.get('taxTableName')?.patchValue(body.innerBody.taxTableName);
                  }
                  if (body.innerBody.regionName !== undefined) {
                    this.form.get('regionName')?.patchValue(body.innerBody.regionName);
                  }
                  if (body.innerBody.salaryType !== undefined) {
                    this.form.get('salaryType')?.patchValue(body.innerBody.salaryType);
                  }
                  if (body.innerBody.salaryScaleName !== undefined) {
                    this.form.get('salaryScaleName')?.patchValue(body.innerBody.salaryScaleName);
                  }
                  if (body.innerBody.salaryRankName !== undefined) {
                    this.form.get('salaryRankName')?.patchValue(body.innerBody.salaryRankName);
                  }
                  if (body.innerBody.salaryLevelName !== undefined) {
                    this.form.get('salaryLevelName')?.patchValue(body.innerBody.salaryLevelName);
                  }
                  if (body.innerBody.coefficient !== undefined) {
                    this.form.get('coefficient')?.patchValue(body.innerBody.coefficient);
                  }
                  //load grid allowance
                  let _workingId = body.innerBody.id;
                  if (_workingId > 0) {
                    this.subsctiptions.push(
                      this.appService.get(api.HU_CONTRACTAPPENDIX_QUERY_LIST_FOR_OVERVIEW + "?workingId=" + _workingId).subscribe(x => {
                        if (x.ok && x.status === 200) {
                          const body: IFormatedResponse = x.body;
                          if (body.statusCode === 200) {
                            this.huWorkingAllowList = body.innerBody;
                          } else {
                            //this.responseService.resolve(body);
                          }
                        } else {
                          if (isDevMode()) {
                            //this.alertService.error(JSON.stringify(x, null, 2), noneAutoClosedAlertOptions);
                          }
                        }
                      })
                    )
                  } else {
                    this.huWorkingAllowList = [];
                  }
                  this.workingId = _workingId
                  this.allowanceOuterParam$.next({ _workingId })
                } else {
                  //this.responseService.resolve(body);
                }
              } else {
                if (isDevMode()) {
                  //this.alertService.error(JSON.stringify(x, null, 2), noneAutoClosedAlertOptions);
                }
              }
            })
          )


          if (isNaN(parseInt(this.form.get('contractTypeId')?.value)) === false) {
            //get enddate
            this.subsctiptions.push(
              this.appService.get(api.HU_CONTRACT_TYPE_READ + "?id=" + this.form.get('contractTypeId')?.value)
                .pipe(
                  map((f: any) => {
                    let options: string = "";
                    options = f.body.innerBody.period;
                    return options;
                  })
                )
                .subscribe(response => {
                  //if(this.form.get('contractNo')?.value == "") this.form.get('contractNo')?.patchValue(response);
                  //debugger;
                  if (isNaN(parseInt(response)) === false) {
                    var dateExpire = new Date(x);
                    this.form.get('expireDate')?.patchValue(new Date(dateExpire.setMonth(dateExpire.getMonth() + parseInt(response))));
                  } else {
                    //this.form.get('expireDate')?
                  }
                })
            )!
          }
        }
      })!

    );
    this.subsctiptions.push(
      this.form.get('workingId')?.valueChanges.subscribe(workingId => {
        if (!!workingId) {

          if (workingId > 0) {
            this.subsctiptions.push(
              this.appService.get(api.HU_CONTRACTAPPENDIX_QUERY_LIST_FOR_OVERVIEW + "?workingId=" + workingId).subscribe(x => {
                if (x.ok && x.status === 200) {
                  const body: IFormatedResponse = x.body;
                  if (body.statusCode === 200) {
                    this.huWorkingAllowList = body.innerBody;
                  } else {
                    //this.responseService.resolve(body);
                  }
                } else {
                  if (isDevMode()) {
                    //this.alertService.error(JSON.stringify(x, null, 2), noneAutoClosedAlertOptions);
                  }
                }
              })
            )
          } else {
            this.huWorkingAllowList = [];
          }
          this.workingId = workingId
          this.allowanceOuterParam$.next({ workingId })
        }
      })!
    );
    if (this.form.get('statusId')?.value === 994) {
      this.form.disable();
      // this.form.get('employeeId')?.disable();
      // this.form.get('contractTypeId')?.disable();
      // this.form.get('contractNo')?.disable();
      // this.form.get('startDate')?.disable();
      // this.form.get('signDate')?.disable();
      // this.form.get('signId')?.disable();
      // this.form.get('expireDate')?.disable();
      // this.form.get('statusId')?.disable();
      // this.form.get('uploadFileBuffer')?.disable();

      // this.form.get('workingId')?.disable();
      // this.form.get('note')?.disable();

    }

  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  onBufferFormCreated(form: FormGroup) {
  }
}
