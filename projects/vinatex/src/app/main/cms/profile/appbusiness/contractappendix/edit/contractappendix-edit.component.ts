import { Component, ViewEncapsulation, isDevMode } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AlertService, AppService, BaseEditComponent, CoreFormService, DialogService, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, EnumFormBaseContolType, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD, ICorePageEditColumnComposition, ICoreTableColumnItem, IFormatedResponse, ResponseService,noneAutoClosedAlertOptions } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, map } from 'rxjs';

@Component({
  selector: "app-contractappendix-edit",
  templateUrl: "./contractappendix-edit.component.html",
  styleUrls: ["./contractappendix-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ContractAppendixEditComponent extends BaseEditComponent {
  override entityTable = 'HU_FILECONTRACT';
  subsctiptions: Subscription[] = [];
  captionCode!: EnumTranslateKey;
  loading: boolean = false;
  countProcess: number =0;
  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;
  TypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  contractTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  contractTypeGetByIdApi = api.HU_CONTRACT_TYPE_READ;

  sysOtherlistGetByIdObject$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi = api.SYS_OTHERLIST_READ;
  groupOptionsStatus$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  wageGetByIdObject$ = new BehaviorSubject<any>(null);
  wageGetByIdApi = api.HU_WAGE_READ;

  ContractOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  contractGetByIdObject$ = new BehaviorSubject<any>(null);
  
  // đây là chỗ
  // vừa fix bug
  contractGetByIdApi = api.HU_CONTRACT_READ;
  
  defauleValueStatus: number = 993; // sửa  getIdbycode sau
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  corePageListHeight!: number;
  employeesTitle = EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_INFOR_ALLOWANCE
  allowanceOuterParam$ = new BehaviorSubject<any>(null);
  workingId!: number;
  employeeSignGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeSignGetByIdApi = api.HU_EMPLOYEE_READ;
  // Lọc trước chi HU_WORKING_SEEKER
  workingPreDefinedOuterParam$ = new BehaviorSubject<any>(null);

  sections: ICoreFormSection[] =
    [
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_CONTRACT_APPENDIX,
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              //readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_CODE,
              field: 'signerName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden: true,
            },
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ID,
              field: 'whenContractNoIsEmpty',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden: true,
              type: 'boolean'
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
              alsoBindTo: [
                { takeFrom: 'fullname', bindTo: 'employeeName' },
                { takeFrom: 'orgName', bindTo: 'orgName' },
                { takeFrom: 'positionName', bindTo: 'positionName' },
              ],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'text',
              readonly:true,
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
              // đây là Drop Down List
              // Số hợp đồng
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_CONTRACTNO,
              field: 'idContract',
              value: '',
              getByIdObject$: this.contractGetByIdObject$,
              getByIdApi: this.contractGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'contractNo',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.ContractOptions$,
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
              // loại phụ lục hợp đồng
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACTAPPENDIX_CONTRACTTYPENAME,
              field: 'appendTypeid',
              value: '',
              getByIdObject$: this.contractTypeGetByIdObject$,
              getByIdApi: this.contractTypeGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.TypeOptions$,
              type: 'number'
            },
            {
              // đây là text box
              // Số phụ lục hợp đồng
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACTAPPENDIX_CONTRACTAPPENDIXNO,
              field: 'contractNo',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            },
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
              readonly:true,

            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_SIGNER_POSITION,
              field: 'signerPosition',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,

            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EXPIREDATE,
              field: 'expireDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              readonly: true,
              type: 'date'
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_UPLOAD_FILE,
              field: 'attachmentBuffer',
              value: null,
              controlType: EnumFormBaseContolType.ATTACHMENT,
              assignTo: 'uploadFile',
              type: 'object'
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
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_ADDITIONAL_INFORMATION_EDITS,
        rows:[
          [
            {
              flexSize:12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_ADDITIONAL_INFORMATION_EDITS,
              field: 'informationEdit',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type:'text'
            }
          ]
        ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_INFOR_SALARY,
        rows:
          [
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_WAGE,
                field: 'workingId',
                value: '',
                controlType: EnumFormBaseContolType.SEEKER,
                seekerSourceType: EnumCoreFormControlSeekerSourceType.WAGE_SEEK, // <==== NEW
                preDefinedOuterParam$: this.workingPreDefinedOuterParam$,
                getByIdObject$: this.wageGetByIdObject$,
                getByIdApi: this.wageGetByIdApi,
                boundFrom: 'id',
                shownFrom: 'decisionNo',
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
                readonly:true,
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
                controlType: EnumFormBaseContolType.CURRENCY,
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
            // [
            //   {
            //     flexSize: 3,
            //     label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_SCALE_DCV_NAME,
            //     field: 'salaryScaleDcvName',
            //     value: '',
            //     controlType: EnumFormBaseContolType.TEXTBOX,
            //     disabled: true,
            //     type: 'text'
            //   },
            //   {
            //     flexSize: 3,
            //     label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_RANK_DCV_NAME,
            //     field: 'salaryRankDcvName',
            //     value: '',
            //     controlType: EnumFormBaseContolType.TEXTBOX,
            //     disabled: true,
            //     type: 'text'
            //   },
            //   {
            //     flexSize: 3,
            //     label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_LEVEL_DCV_NAME,
            //     field: 'salaryLevelDcvName',
            //     value: '',
            //     controlType: EnumFormBaseContolType.TEXTBOX,
            //     disabled: true,
            //     type: 'text'
            //   },
            //   {
            //     flexSize: 3,
            //     label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_COEFFICIENT_DCV,
            //     field: 'coefficientDcv',
            //     value: '',
            //     controlType: EnumFormBaseContolType.TEXTBOX,
            //     disabled: true,
            //     type: 'text'
            //   },
            // ],
          ]
      },

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
  //   },
  // ];

  huWorkingAllowList: any[] = [];

  whenCallIsEmptyContractNo!: boolean;

  constructor(
    private appService: AppService,
    public override dialogService: DialogService,
    private coreFormService: CoreFormService,
    private alertService: AlertService,
    private responseService: ResponseService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_CONTRACT_APPENDIX_EDIT;


    this.crud = {
      c: api.HU_CONTRACTAPPENDIX_CREATE,
      r: api.HU_CONTRACTAPPENDIX_READ,
      u: api.HU_CONTRACTAPPENDIX_UPDATE,
      d: api.HU_CONTRACTAPPENDIX_DELETE_IDS,
    };
  }
  ngOnInit(): void {
    const mainAppHeaderHeight = Number(getComputedStyle(document.documentElement).getPropertyValue('--size-header-height').replace('px', ''))
    const corePaginationHeight = Number(getComputedStyle(document.documentElement).getPropertyValue('--size-core-pagination-height').replace('px', ''))
    this.corePageListHeight = window.innerHeight - mainAppHeaderHeight - corePaginationHeight;

    this.loading = true;
    this.appService
      .get(api.HU_CONTRACTAPPENDIX_TYPE_GETLIST)
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
  ngAfterViewInit() : void{
    //debugger;
    //if((this.countProcess > 1 &&  this.form.get('id')?.value > 0) || (this.countProcess>0 && this.form.get('id')?.value === '')){
    
  }
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.form.get('employeeId')?.valueChanges.subscribe(x => {
        // Thay đổi bộ lọc trước cho Working seeker
        this.workingPreDefinedOuterParam$.next({
          employeeId: x,
          statusId: 994
        })
        //debugger;
        //var idContractObj = this.coreFormService.getFormBaseControlByName(this.sections, 'idContract');
        //this.form.get('idContract')?.patchValue('');
       // this.form.get('idContract')?.updateValueAndValidity();
        if (!!x) {
          this.appService
            .get(api.HU_CONTRACT_GETCONTRACTBYEMPPROFILE + x)
            .subscribe((res: any) => {
              const options: { value: number; text: string; }[] = [];
              //debugger;
              if(res.body.innerBody.length === 0)
              {
                this.alertService.warn("Nhân viên chưa được thêm mới hợp đồng", noneAutoClosedAlertOptions);
              }
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.contractNo
                })
              })
              //debugger;
              this.ContractOptions$.next(options);

            });

            if (
              (this.form.get("whenContractNoIsEmpty")?.value != "")
              && (this.form.get("whenContractNoIsEmpty")?.value == false)
            )
            {
              this.subsctiptions.push(
                this.appService.get(api.HU_CONTRACTAPPENDIX_GETCODE)
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
              )!
            }
            
        }
      })!
    );
    this.subsctiptions.push(
      this.form.get('idContract')?.valueChanges.subscribe(contractID => {
        if (!!contractID) {
        //reset value control
        this.form.get('workingId')?.patchValue('');
        this.form.get('shortTempSalary')?.patchValue('');
        this.form.get('salPercent')?.patchValue('');
        this.form.get('taxTableName')?.patchValue('');
        this.form.get('regionName')?.patchValue('');
        this.form.get('salaryType')?.patchValue('');
        this.form.get('salaryScaleName')?.patchValue('');
        this.form.get('salaryRankName')?.patchValue('');
        this.form.get('salaryLevelName')?.patchValue('');
        this.form.get('coefficient')?.patchValue('');
        this.form.get('salaryScaleDcvName')?.patchValue('');
        this.form.get('salaryRankDcvName')?.patchValue('');
        this.form.get('salaryLevelDcvName')?.patchValue('');
        this.form.get('coefficientDcv')?.patchValue('');
        
        // cmt dòng code này lại
        // để xem hết bug không
        // this.form.get('expireDate')?.patchValue('');
        
        this.huWorkingAllowList = [];
        if (!!contractID) {
          // cmt code lại để xem thử hết lỗi không
          // this.subsctiptions.push(
          //   this.appService.get(api.HU_CONTRACTAPPENDIX_GETEXPIREDATECONTRACT + "?contractId=" + contractID).subscribe(x => {
          //     if (x.ok && x.status === 200) {
          //       //debugger;
          //       const body: IFormatedResponse = x.body;
          //       if (body.statusCode === 200) {
          //         if(body.innerBody.contractTypeCode == 'HDLD001' || body.innerBody.contractTypeCode == 'HDLD003')
          //         //var bbbb=0;
          //         this.form.get('expireDate')?.patchValue(body.innerBody.expireDate);
          //       }
          //     }
          //   })
          // )
          this.subsctiptions.push(
            this.appService.get(api.HU_CONTRACTAPPENDIX_GETWAYGEBYSTARTDATECONTRACT + "?contractId=" + contractID).subscribe(x => {
              //debugger;
              if (x.ok && x.status === 200) {
                const body: IFormatedResponse = x.body;
                if (body.statusCode === 200) {
                  this.form.get('workingId')?.patchValue(body.innerBody.id);
                  //this.form.get('decisionNo')?.patchValue(body.innerBody.decisionNo);
                  this.wageGetByIdObject$.next(body.innerBody)
                  if(body.innerBody.shortTempSalary !== undefined){
                    this.form.get('shortTempSalary')?.patchValue(body.innerBody.shortTempSalary);
                  }
                  if(body.innerBody.salPercent !== undefined){
                  this.form.get('salPercent')?.patchValue(body.innerBody.salPercent);
                  }
                  if(body.innerBody.taxTableName !== undefined){
                  this.form.get('taxTableName')?.patchValue(body.innerBody.taxTableName);
                  }
                  if(body.innerBody.regionName !== undefined){
                  this.form.get('regionName')?.patchValue(body.innerBody.regionName);
                  }
                  if(body.innerBody.salaryType !== undefined){
                  this.form.get('salaryType')?.patchValue(body.innerBody.salaryType);
                  }
                  if(body.innerBody.salaryScaleName !== undefined){
                  this.form.get('salaryScaleName')?.patchValue(body.innerBody.salaryScaleName);
                  }
                  if(body.innerBody.salaryRankName !== undefined){
                  this.form.get('salaryRankName')?.patchValue(body.innerBody.salaryRankName);
                  }
                  if(body.innerBody.salaryLevelName !== undefined){
                  this.form.get('salaryLevelName')?.patchValue(body.innerBody.salaryLevelName);
                  }
                  if(body.innerBody.coefficient !== undefined){
                  this.form.get('coefficient')?.patchValue(body.innerBody.coefficient);
                  }
                  // if(body.innerBody.salaryScaleDcvName !== undefined){
                  // this.form.get('salaryScaleDcvName')?.patchValue(body.innerBody.salaryScaleDcvName);
                  // }
                  // if(body.innerBody.salaryRankDcvName !== undefined){
                  // this.form.get('salaryRankDcvName')?.patchValue(body.innerBody.salaryRankDcvName);
                  // }
                  // if(body.innerBody.salaryLevelDcvName !== undefined){
                  // this.form.get('salaryLevelDcvName')?.patchValue(body.innerBody.salaryLevelDcvName);
                  // }
                  // if(body.innerBody.coefficientDcv !== undefined){
                  // this.form.get('coefficientDcv')?.patchValue(body.innerBody.coefficientDcv);
                  // }
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
    this.subsctiptions.push(
      this.form.get('startDate')?.valueChanges.subscribe(x => {
        if (!!x) {
          this.form.get('signDate')?.patchValue(x);
        }
      })!
    );
    
  
/*  }else{

    this.form.get('employeeId')?.valueChanges.subscribe(x => {
      debugger;
      if (!!x) {
        // Thay đổi bộ lọc trước cho Working seeker
        this.workingPreDefinedOuterParam$.next({
          employeeId: x,
          statusId: 994
        });
      
        this.appService
          .get(api.HU_CONTRACT_GETCONTRACTBYEMPPROFILE + x)
          .subscribe((res: any) => {
            const options: { value: number; text: string; }[] = [];
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.contractNo
              })
            })
            this.ContractOptions$.next(options);
          });
      }
    })
    
} */
  
  this.countProcess++;
  if (this.form.get('statusId')?.value === 994) {
    this.form.get('employeeId')?.disable();
    this.form.get('idContract')?.disable();
    this.form.get('appendTypeid')?.disable();
    this.form.get('contractNo')?.disable();
    this.form.get('startDate')?.disable();
    this.form.get('signDate')?.disable();
    this.form.get('signId')?.disable();
    this.form.get('expireDate')?.disable();
    this.form.get('statusId')?.disable();

    // thử cmt code
    // xem hết lỗi không
    this.form.get('attachmentBuffer')?.disable();

    this.form.get('workingId')?.disable();
    this.form.get('note')?.disable();
   
  }
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  onBufferFormCreated(form: FormGroup) {
  }
}
