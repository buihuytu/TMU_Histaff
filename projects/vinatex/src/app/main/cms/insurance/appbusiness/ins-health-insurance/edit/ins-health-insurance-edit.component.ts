import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, IFormatedResponse, DialogService, MultiLanguageService, CommonHttpRequestService, AppService, CoreFormService } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject, distinctUntilChanged, map } from "rxjs";
import { InsHealthInsuranceService } from "./ins-health-insurance.service";


@Component({
  selector: 'app-ins-health-insurance-edit',
  templateUrl: './ins-health-insurance-edit.component.html',
  styleUrls: ['./ins-health-insurance-edit.component.scss']
})
export class InsHealthInsuranceEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {

  /* Properties to be passed into core-page-edit */
  override entityTable = "INS_HEALTH_INSURANCE";


  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;

  loading: boolean = false;
  bufferForm!: FormGroup;
  subscriptions: Subscription[] = [];
  
  /*--------------------------- Employee Seeker ---------------------------*/ 
  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;
  
  /*--------------------------- Dropdown List ---------------------------*/ 
  // YEAR
  yearOptions$ = new BehaviorSubject<any>(null);
  yearGetByIdObject$ = new BehaviorSubject<any>(null);
  yearGetByIdApi = api.AT_SALARY_PERIOD_READ;

  // insContractId
  insContractIdOptions$ = new BehaviorSubject<any>([]);
  insContractIdGetByIdObject$ = new BehaviorSubject<any>(null);
  insContractIdGetByIdApi = api.INS_LIST_CONTRACT_READ;

  // familyMember
  familyMemberIdOptions$ = new BehaviorSubject<any>([]);
  familyMemberIdGetByIdObject$ = new BehaviorSubject<any>(null);
  familyMemberIdGetByIdApi = api.HU_FAMILY_READ;

  // payee
  payeeOptions$ = new BehaviorSubject<any>([]);
  payeeGetByIdObject$ = new BehaviorSubject<any>(null);
  payeeGetByIdApi = api.AT_SALARY_PERIOD_READ;

  sections: ICoreFormSection[] =
  [
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_INS_HEALTH_INSURANCE_INFOR_INS,
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_ID,
            field: 'id',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'number'
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_EMPLOYEE_CODE,   // Mã NV
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
            { takeFrom: 'positionName', bindTo: 'posName' },
            { takeFrom: 'orgId', bindTo: 'orgId' },
            { takeFrom: 'birthDate', bindTo: 'birthDate' },
            { takeFrom: 'idNo', bindTo: 'idNo' },
            ],
            /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
            type: 'text',
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_EMPLOYEE_NAME,   // Họ và tên
            field: 'employeeName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_EMPLOYEE_DEPARTMENT,   // Ban/Phòng
            field: 'orgName', 
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_EMPLOYEE_POSITION,   // Vị trí
            field: 'posName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
            disabled: true,
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_EMPLOYEE_DATE_OF_BIRTH,    // Ngày sinh
            field: 'birthDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            readonly: false,
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_EMPLOYEE_IDENTITY_NO,    // Số CMND
            field: 'idNo',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_YEAR,     // Năm
            field: 'year',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            type: 'number',
            getByIdObject$: this.yearGetByIdObject$,
            getByIdApi: this.yearGetByIdApi,
            shownFrom: 'text',
            dropdownOptions$: this.yearOptions$,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ]
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_CONTRACT_NO,   // Số HĐ bảo hiểm
            field: 'insContractId',
            value: null,
            controlType: EnumFormBaseContolType.DROPDOWN,
            type: 'number',
            getByIdObject$: this.insContractIdGetByIdObject$,
            getByIdApi: this.insContractIdGetByIdApi,
            shownFrom: 'text',
            dropdownOptions$: this.insContractIdOptions$,
            disabled: true,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ]
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_INS_UNIT,   // Đơn vị bảo hiểm
            field: 'orgInsuranceName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_CONTRACT_FROM_DATE,   // Hợp đồng từ ngày
            field: 'startDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_CONTRACT_TO_DATE,  // Hợp đồng đến ngày
            field: 'expireDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_CONTRACT_VALUE,    // Giá trị hợp đồng
            field: 'valCo',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_IS_INS_MEMBER,   // 	BH người thân
            field: 'checkBhnt',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
        ]
      ]
    },
    {
      rows: [
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_FAMILY_MEMBER_NAME,   // Họ tên người thân  
            field: 'familyId',
            value: 0,
            controlType: EnumFormBaseContolType.DROPDOWN,
            type: 'number',
            getByIdObject$: this.familyMemberIdGetByIdObject$,
            getByIdApi: this.familyMemberIdGetByIdApi,
            shownFrom: 'text',
            dropdownOptions$: this.familyMemberIdOptions$,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ]
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_FAMILY_MEMBER_RELATIONSHIP,    // 	Mối quan hệ
            field: 'relationshipName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_FAMILY_MEMBER_DATE_OF_BIRTH,   // 	Ngày sinh
            field: 'familyMemberBirthDate',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_FAMILY_MEMBER_IDENTITY_NO,    // 	Số CMND
            field: 'familyMemberIdNo',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
        ],
      ],
    },
    {
      rows: [
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_PAYEE,   // Đối tượng chi trả 
            field: 'dtChitra',
            value: null,
            controlType: EnumFormBaseContolType.DROPDOWN,
            type: 'text',
            getByIdObject$: this.payeeGetByIdObject$,
            getByIdApi: this.payeeGetByIdApi,
            shownFrom: 'text',
            dropdownOptions$: this.payeeOptions$,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ]
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_JOIN_DATE,    // 	Ngày tham gia
            field: 'joinDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_EFFECTIVE_DATE,   // 	Ngày hiệu lực
            field: 'effectDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ]
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_INS_AMOUNT,    // 	Số tiền bảo hiểm
            field: 'moneyIns',
            value: '',
            controlType: EnumFormBaseContolType.CURRENCY,
            pipe: EnumCoreTablePipeType.NUMBER,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ]
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_REDUCE_DATE,    // 	Ngày báo giảm
            field: 'reduceDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_REFUND,    // 	Số tiền hoàn lại
            field: 'refund',
            value: '',
            controlType: EnumFormBaseContolType.CURRENCY,
            pipe: EnumCoreTablePipeType.NUMBER,
            type: 'number',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_RECEIVE_DATE,   // 	Ngày nhận tiền
            field: 'dateReceiveMoney',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_RECEIVER,    // 	Người nhận tiền
            field: 'empReceiveMoney',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string',
          },
        ],
      ],
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_INS_HEALTH_INSURANCE_INFOR_REQUIRE_RECEIVE_MONEY,
      rows: [
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.NULL,
            field: 'insClaimInsurances',
            value: [],
            controlType: EnumFormBaseContolType.GRIDBUFFER,
            type: 'children',
            // When using EnumFormBaseContolType.GRIDBUFFER
            gridBufferFormSections: [
              {
                rows: [
                  [
                    {
                      flexSize: 4,
                      label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_MEDICAL_DATE,    // 	Ngày khám bệnh
                      field: 'examineDate',
                      value: '',
                      controlType: EnumFormBaseContolType.DATEPICKER,
                      type: 'date',
                    },
                    {
                      flexSize: 4,
                      label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_DISEASE_NAME,  //   Tên bệnh
                      field: 'diseaseName',
                      value: '',
                      controlType: EnumFormBaseContolType.TEXTBOX,
                      type: 'string',
                    },
                    {
                      flexSize: 4,
                      label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_REQUIRE_AMOUNT,  // Số tiền YC bối thường
                      field: 'amountOfClaims',
                      value: '',
                      controlType: EnumFormBaseContolType.TEXTBOX,
                      type: 'number',
                    },
                  ],
                  [
                    {
                      flexSize: 4,
                      label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_COMPENSATION_AMOUNT_RECEIVED,  // Số tiền được bồi thường
                      field: 'amountOfCompensation',
                      value: '',
                      controlType: EnumFormBaseContolType.TEXTBOX,
                      type: 'text',
                    },
                    {
                      flexSize: 4,
                      label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_COMPENSATION_DATE,   // Ngày bồi thường
                      field: 'compensationDate',
                      value: '',
                      controlType: EnumFormBaseContolType.DATEPICKER,
                      type: 'date',
                    },
                    {
                      flexSize: 4,
                      label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_NOTE,    // Ghi chú
                      field: 'note',
                      value: '',
                      controlType: EnumFormBaseContolType.TEXTBOX,
                      type: 'text',
                    },
                  ]
                ]
              }
            ],
            gridBufferTableColumns: [
              {
                caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_ID,
                field: 'id',
                hidden: true,
                type: 'string',
                align: 'left',
                width: 30,
              },
              {
                caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_MEDICAL_DATE,  // 	Ngày khám bệnh
                field: 'examineDate',
                pipe: EnumCoreTablePipeType.DATE,
                type: 'date',
                align: 'left',
                width: 200 * 2,
              },
              {
                caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_DISEASE_NAME,  //   Tên bệnh
                field: 'diseaseName', 
                type: 'string',
                align: 'left',
                width: 200 * 2,
              },
              {
                caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_REQUIRE_AMOUNT,  // Số tiền YC bối thường
                field: 'amountOfClaims',
                type: 'number',
                align: 'left',
                width: 200 * 2,
              },
              {
                caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_COMPENSATION_AMOUNT_RECEIVED,  // Số tiền được bồi thường
                field: 'amountOfCompensation',
                pipe: EnumCoreTablePipeType.DATE,
                type: 'date',
                align: 'left',
                width: 200 * 2,
              },
              {
                caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_COMPENSATION_DATE,   // Ngày bồi thường
                field: 'compensationDate',
                pipe: EnumCoreTablePipeType.DATE,
                type: 'date',
                align: 'left',
                width: 200 * 2,
              },
              {
                caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_NOTE,    // Ghi chú
                field: 'note',  
                type: 'string',
                align: 'left',
                width: 200 * 2,
              },
            ]
          },
        ]
      ]
    },
  ];

  // Chuyển hàm callback thành arrow function. Và đặt định nghĩa này trước khi khai báo phần Sections cho form chính
  // Nếu dùng "onBufferFormCreated(form: FormGroup) {} như cũ thì từ this.appService sẽ bị undefined
  onBufferFormCreated = (form: FormGroup) => {

    this.bufferForm = form;
    
    this.subscriptions.push(
      this.bufferForm
        .get('examineDate')
        ?.valueChanges
        .subscribe((x) => {
          if (this.bufferForm.get('amountOfClaims')?.value == null || this.bufferForm.get('amountOfClaims')?.value == "")
          {
            this.bufferForm.get('amountOfClaims')?.setValue(this.bufferForm.get('amountOfClaims')?.value);
          }

          if (this.bufferForm.get('amountOfCompensation')?.value == null || this.bufferForm.get('amountOfCompensation')?.value == "")
          {
            this.bufferForm.get('amountOfCompensation')?.setValue(this.bufferForm.get('amountOfCompensation')?.value);
          }

          if (this.bufferForm.get('compensationDate')?.value == null || this.bufferForm.get('compensationDate')?.value == "")
          {
            this.bufferForm.get('compensationDate')?.setValue(this.bufferForm.get('compensationDate')?.value);
          }
        })!,

    );
  }
  responseContracts: any;
  responseYear: any;
    
  /*====================== Function for Dropdown List ======================*/
  getListYear() {
    this.loading = true;
    this.subscriptions.push(
      this.appService.get(api.AT_SALARY_PERIOD_GET_YEAR).subscribe((res: any) => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string; }[] = [];
            options.push({
              value: Number(),
              text: ''
            })
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g,
                text: g
              })
            })
            this.responseYear = options
            this.yearOptions$.next(options);
          }
        }
      })
    )
  }

  getInsListContract() {
    console.log(this.form.get('year')?.value);
    this.form.get('year')?.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {

      if (this.form.get('year')?.value != null && this.form.get('year')?.value != "") {
        this.form.get('insContractId')?.enable();
      } else {
        this.form.get('insContractId')?.setValue(null);
        this.form.get('insContractId')?.disable();
      }
      if(!!x){
        this.insHealthInsuranceService
        .getInsListContract(x)
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string }[] = [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.contractInsNo,
                });
              });
              return options;
            } else {
              return [];
            }
          }),
        )
        .subscribe((response) => {
        //  this.form.get('insContractId')?.setValue(null);
        debugger
          this.insContractIdOptions$.next(response);
          this.responseContracts = response
        });
      }
      else{
        this.form.get('insContractId')?.setValue(null);
        this.form.get('insContractId')?.disable();
      }
      
    })
  }

  getInfoInsContract(){
    this.form.get('insContractId')?.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {
      if(!!x){
        this.insHealthInsuranceService
        .getInfoInsContract(x)
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              //this.form.patchValue(body.innerBody);
              this.form.get('orgInsuranceName')?.patchValue(body.innerBody.orgInsuranceName);
              this.form.get('startDate')?.patchValue(body.innerBody.startDate);
              this.form.get('expireDate')?.patchValue(body.innerBody.expireDate);
              this.form.get('valCo')?.patchValue(body.innerBody.valCo);
            }
          }
        })
      }
      else{
        this.form.get('orgInsuranceName')?.setValue(null);
        this.form.get('startDate')?.setValue(null);
        this.form.get('expireDate')?.setValue(null);
        this.form.get('valCo')?.setValue(null);
      }
      
    })
  }

  getListFamilyMember(){
    this.form.get('employeeId')?.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {

      if (this.form.get('employeeId')?.value != null && this.form.get('employeeId')?.value != "") {
        this.form.get('familyId')?.enable();
      } else {
        this.form.get('familyId')?.setValue(null);
        this.form.get('familyId')?.disable();
      }
      if(!!x){
        this.insHealthInsuranceService
        .getListFamilyMember(x)
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string }[] = [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              return options;
            } else {
              return [];
            }
          }),
        )
        .subscribe((response) => {
          // this.form.get('familyId')?.setValue(null);
          this.familyMemberIdOptions$.next(response);
        });
      }
      else{
        this.form.get('familyId')?.setValue(null);
        this.form.get('familyId')?.disable();
      }
      
    })
  }

  getInfoFamilyMember(){
    this.form.get('familyId')?.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {
      if(!!x){
        this.insHealthInsuranceService
        .getInfoFamilyMember(x)
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              this.form.get('relationshipName')?.patchValue(body.innerBody.relationshipName);
              this.form.get('familyMemberBirthDate')?.patchValue(body.innerBody.birthDate);
              this.form.get('familyMemberIdNo')?.patchValue(body.innerBody.idNo);
            }
          }
        })
      }
      else{
        this.form.get('relationshipName')?.setValue(null);
        this.form.get('familyMemberBirthDate')?.setValue(null);
        this.form.get('familyMemberIdNo')?.setValue(null);
      }
      
    })
  }

  getListPayee(){
    this.subscriptions.push(
      this.insHealthInsuranceService
        .getALLPayeeByKey()
        .pipe(
          map((x: any) => {
            const options: { value: number; text: string; code: string }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
                code: g.code,
              });
            });
            return options;
          })
        )
        .subscribe((response) => {
          this.payeeOptions$.next(response);
        })
    );
  }

  constructor(
    //private _coreService: CoreService,
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private commonHttpRequestService: CommonHttpRequestService,
    private appService: AppService, // CoreService is DEPRECATED!!!
    private insHealthInsuranceService: InsHealthInsuranceService,
    private coreFormService: CoreFormService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_INS_HEALTH_INSURANCE_EDIT;

    this.crud = {
      c: api.INS_HEALTH_INSURANCE_CREATE,
      r: api.INS_HEALTH_INSURANCE_READ,
      u: api.INS_HEALTH_INSURANCE_UPDATE,
      d: api.INS_HEALTH_INSURANCE_DELETE_IDS,
    };
   }

  onFormCreated(e: FormGroup): void {
    this.form = e;
    console.log(this.form);

    setTimeout(() => {      
      if (this.form.get('id')?.value !== 0) {
        this.form.get('employeeId')?.disable();

      }
    }, 1500)

    this.form.get("familyId")?.valueChanges.subscribe((x: any) => {
      // Kiểm tra x có giá trị không null hoặc undefined
      if (x) {
        this.form.get('familyId')?.setValue(x);
      }
    });

    setTimeout(() => {
      if (this.form.get('id')?.value === 0) {
        var familyIdObj = this.coreFormService.getFormBaseControlByName(
          this.sections,
          'familyId'
        );
        var relationshipNameObj = this.coreFormService.getFormBaseControlByName(
          this.sections,
          'relationshipName'
        );
        var familyMemberBirthDateObj = this.coreFormService.getFormBaseControlByName(
          this.sections,
          'familyMemberBirthDate'
        );
        var familyMemberIdNoObj = this.coreFormService.getFormBaseControlByName(
          this.sections,
          'familyMemberIdNo'
        );

        if (familyIdObj) {
          familyIdObj.hidden = true;
          familyIdObj.flexSize = 0;
        }
        if (relationshipNameObj) {
          relationshipNameObj.hidden = true;
          relationshipNameObj.flexSize = 0;
        }
        if (familyMemberBirthDateObj) {
          familyMemberBirthDateObj.hidden = true;
          familyMemberBirthDateObj.flexSize = 0;
        }
        if (familyMemberIdNoObj) {
          familyMemberIdNoObj.hidden = true;
          familyMemberIdNoObj.flexSize = 0;
        }
      }
    }, 10);
    this.subscriptions.push(
      this.form.get('checkBhnt')?.valueChanges.subscribe((x) => {
        var familyIdObj = this.coreFormService.getFormBaseControlByName(
          this.sections,
          'familyId'
        );
        var relationshipNameObj = this.coreFormService.getFormBaseControlByName(
          this.sections,
          'relationshipName'
        );
        var familyMemberBirthDateObj = this.coreFormService.getFormBaseControlByName(
          this.sections,
          'familyMemberBirthDate'
        );
        var familyMemberIdNoObj = this.coreFormService.getFormBaseControlByName(
          this.sections,
          'familyMemberIdNo'
        );
        
        if (x) {
          if (familyIdObj) {
            familyIdObj.hidden = false;
            familyIdObj.flexSize = 3;
            this.form.get('familyId')?.reset();
          }
          if (relationshipNameObj) {
            relationshipNameObj.hidden = false;
            relationshipNameObj.flexSize = 3;
            this.form.get('relationshipName')?.reset();
          }
          if (familyMemberBirthDateObj) {
            familyMemberBirthDateObj.hidden = false;
            familyMemberBirthDateObj.flexSize = 3;
            this.form.get('familyMemberBirthDate')?.reset();
          }
          if (familyMemberIdNoObj) {
            familyMemberIdNoObj.hidden = false;
            familyMemberIdNoObj.flexSize = 3;
            this.form.get('familyMemberIdNo')?.reset();
          }
        } else {
          if (familyIdObj) {
            familyIdObj.hidden = true;
            familyIdObj.flexSize = 0;
            this.form.get('familyId')?.patchValue(null);
          }
          if (relationshipNameObj) {
            relationshipNameObj.hidden = true;
            relationshipNameObj.flexSize = 0;
            this.form.get('relationshipName')?.patchValue(null);
          }
          if (familyMemberBirthDateObj) {
            familyMemberBirthDateObj.hidden = true;
            familyMemberBirthDateObj.flexSize = 0;
            this.form.get('familyMemberBirthDate')?.patchValue(null);
          }
          if (familyMemberIdNoObj) {
            familyMemberIdNoObj.hidden = true;
            familyMemberIdNoObj.flexSize = 0;
            this.form.get('familyMemberIdNo')?.patchValue(null);
          }
        }
      })!
    );

    

    setTimeout(() => {
      const valsYear = this.responseYear.filter((x : any) => x.value == this.form.get('year')?.value)
      this.yearGetByIdObject$.next(valsYear[0])
      const vals = this.responseContracts.filter((x : any) => x.value == this.form.get('insContractId')?.value)
      this.insContractIdGetByIdObject$.next(vals[0])
      
    },1000)
          
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnInit(): void {
  }
  
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getListYear();

      this.getInsListContract();

      this.getInfoInsContract();

      this.getListFamilyMember();

      this.getInfoFamilyMember();

      this.getListPayee();
    }, 1000);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

}
