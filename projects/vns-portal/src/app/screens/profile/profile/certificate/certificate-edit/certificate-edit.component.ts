import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, AppService, DialogService, MultiLanguageService, AuthService, UrlService, IFormatedResponse } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject, distinctUntilChanged } from "rxjs";
import { CertificateService } from "../certificate.service";
@Component({
  selector: "app-certificate-edit",
  templateUrl: "./certificate-edit.component.html",
  styleUrls: ["./certificate-edit.component.scss"],
})
export class CertificateEditComponent extends BaseEditComponent implements OnInit , OnDestroy{
  //override entityTable = "PORTAL_CERTIFICATE";
  
  override entityTable = "HU_CERTIFICATE_EDIT";

  loading: boolean = false;
  listDataGetById!: any;
  subsctiptions: Subscription[] = [];
  employeeId!: number;

  sysOtherlistGetByIdObject$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi = api.SYS_OTHERLIST_READ;

  sysOtherlistGetByIdObject1$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi1 = api.SYS_OTHERLIST_READ;

  sysOtherlistGetByIdObject2$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi2 = api.SYS_OTHERLIST_READ;

  sysOtherlistGetByIdObject3$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi3 = api.SYS_OTHERLIST_READ;

  sysOtherlistGetByIdObject4$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi4 = api.SYS_OTHERLIST_READ;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  typeCertificateOption$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  schoolOption$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  trainTypeOption$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  levelTrainOption$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  levelOption$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
            field: "id",
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: "text",
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_NOTE,
            field: 'employeeId',
            value: this.authService.data$.value?.employeeId,
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
            hidden: true
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_IS_PRIME,
            field: "isPrime",
            value: false,
            controlType: EnumFormBaseContolType.CHECKBOX,
            readonly: false,
            type: "text",
          },
          {
            flexSize: 3,
            label:
              EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TYPECERTIFICATENAME,
            field: "typeCertificate",
            value: "",
            getByIdObject$: this.sysOtherlistGetByIdObject1$,
            getByIdApi: this.sysOtherlistGetByIdApi1,
            shownFrom: "name",
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.typeCertificateOption$,
            type: "text",
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'minLength',
                validator: Validators.minLength(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_NAME,
            field: "name",
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: "text",
            disabled: true,
            validators: [
              // {
              //   name: 'required',
              //   validator: Validators.required,
              //   errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              // },
              // {
              //   name: 'minLength',
              //   validator: Validators.minLength(1),
              //   errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              // },
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EFFECT_DATE,
            field: "effectFrom",
            value: "",
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: "date",
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TRAIN_FROM,
            field: "trainFromDate",
            value: "",
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: "date",
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TRAIN_TO,
            field: "trainToDate",
            value: "",
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: "date",
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_CONTENTTRAIN,
            field: "contentTrain",
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: "text",
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_SCHOOLNAME,
            field: "schoolId",
            value: "",
            getByIdObject$: this.sysOtherlistGetByIdObject2$,
            getByIdApi: this.sysOtherlistGetByIdApi2,
            shownFrom: "name",
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.schoolOption$,
            type: "text",
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'minLength',
                validator: Validators.minLength(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_YEAR,
            field: "year",
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: "number",
            // validators: [
            //   {
            //     name: 'required',
            //     validator: Validators.required,
            //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
            //   },
            //   {
            //     name: 'minLength',
            //     validator: Validators.minLength(1),
            //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
            //   },
            // ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_MARK,
            field: "mark",
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: "number",
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_CLASSIFICATION,
            field: "classification",
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: "text",
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TYPETRAINNAME,
            field: "typeTrain",
            value: "",
            getByIdObject$: this.sysOtherlistGetByIdObject3$,
            getByIdApi: this.sysOtherlistGetByIdApi3,
            shownFrom: "name",
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.trainTypeOption$,
            type: "text",
            //disabled: true,
            readonly: false,
            // validators: [
            //   {
            //     name: 'required',
            //     validator: Validators.required,
            //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
            //   },
            //   {
            //     name: 'minLength',
            //     validator: Validators.minLength(1),
            //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
            //   },
            // ],
          },
        ],
        [
          // {
          //   flexSize: 3,
          //   label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_MAJOR,
          //   field: "major",
          //   value: "",
          //   controlType: EnumFormBaseContolType.TEXTBOX,
          //   readonly: false,
          //   type: "text",
          //   validators: [
          //     {
          //       name: 'required',
          //       validator: Validators.required,
          //       errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
          //     },
          //     {
          //       name: 'minLength',
          //       validator: Validators.minLength(1),
          //       errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
          //     },
          //   ],
          // },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_LEVEL,
            field: "levelId",
            value: "",
            getByIdObject$: this.sysOtherlistGetByIdObject4$,
            getByIdApi: this.sysOtherlistGetByIdApi4,
            shownFrom: "name",
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.levelOption$,
            type: "number",
            disabled: true
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_LEVELTRAINNAME,
            field: "levelTrain",
            value: "",
            getByIdObject$: this.sysOtherlistGetByIdObject$,
            getByIdApi: this.sysOtherlistGetByIdApi,
            shownFrom: "name",
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.levelTrainOption$,
            type: "number",
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EXPIRE_DATE,
            field: "effectTo",
            value: "",
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: "date",
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_UPLOAD_FILE,
            field: "firstAttachmentBuffer",
            value: null,
            controlType: EnumFormBaseContolType.ATTACHMENT,
            assignTo: "fileName",
            type: "object",
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_NOTE,
            field: "remark",
            value: "",
            controlType: EnumFormBaseContolType.TEXTAREA,
            textareaRows: 3,
            readonly: false,
            type: "string",
          },
          {
            // đây là trường phê duyệt
            // dùng để phân biệt
            // bản ghi ở bảng chính
            // và bảng ghi ở bảng tạm
            flexSize: 0,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
            field: "isApprovePortal",
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: "boolean",
          }
          
        ],
        [
          {
            // đây là trường trạng thái của bản ghi
            flexSize: 0,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
            field: "statusRecord",
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            hidden: true,
            type: "string",
          },
          {
            // đây là trường trạng thái của bản ghi
            flexSize: 0,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
            field: "isSavePortal",
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            hidden: true,
            type: "bool",
          },
          {
            // đây là trường lưu ID của bảng chính HU_CERTIFICATE
            flexSize: 0,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
            field: "idHuCertificate",
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            hidden: true,
            type: "number",
          },
          // {
          //   // đây là trường lưu ID của bảng chính HU_CERTIFICATE
          //   flexSize: 0,
          //   label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
          //   field: "isEditSaved",
          //   value: "",
          //   controlType: EnumFormBaseContolType.TEXTBOX,
          //   hidden: true,
          //   type: "boolean",
          // }
        ]
      ],
    },
  ];
  constructor(
    private appService: AppService,
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private authService: AuthService,
    public certificateService: CertificateService,
    private urlService: UrlService
  ) {
    super(dialogService);
    this.crud = {
      c: api.HU_CERTIFICATE_EDIT_CREATE,
      r: api.SYS_OTHERLIST_READ,
      u: api.HU_CERTIFICATE_EDIT_SEND_APPROVE,
      d: api.HU_CERTIFICATE_EDIT_DELETE,
      s: api.HU_CERTIFICATE_PORTAL_SAVE
    };
    urlService.currentRouteUrl$.next('/profile/certificate/certificate-edit')
    urlService.previousRouteUrl$.next('/profile/certificate')
  }

  ngOnInit(): void {
    this.loading = true;
    this.subsctiptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "MAJOR")
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              options.push({
                value: null,
                text: "",
              });
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              this.levelTrainOption$.next(options);
              // END ONE LOGIC
            }
          }
        }),
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "GRADUATE_SCHOOL")
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              options.push({
                value: null,
                text: "",
              });
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              this.schoolOption$.next(options);
              // END ONE LOGIC
            }
          }
        }),

      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "LEARNING_LEVEL")
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              options.push({
                value: null,
                text: "",
              });
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              this.levelOption$.next(options);
              // END ONE LOGIC
            }
          }
        }),

      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "TRAINING_FORM")
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              options.push({
                value: null,
                text: "",
              });
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              this.trainTypeOption$.next(options);
              // END ONE LOGIC
            }
          }
        }),
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "TYPE_BCCC")
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              options.push({
                value: null,
                text: "",
              });
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              this.typeCertificateOption$.next(options);
              // END ONE LOGIC
            }
          }
        })
    );
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    if (this.certificateService.certificateId != 0) {
      this.appService.get(api.HU_CERTIFICATE_EDIT_GET_BY_ID + `?id=${this.certificateService.certificateId}`)
        .subscribe(x => {
          if (x.ok && x.status === 200) {
            this.form.patchValue(x.body.innerBody)
          }
        })
    }
    else {
      this.appService.get(api.HU_CERTIFICATE_EDIT_GET_SAVE_BY_ID + `?id=${this.certificateService.certificateEditId}`)
        .subscribe(x => {
          if (x.ok && x.status === 200) {
            this.form.patchValue(x.body.innerBody)
          }
        })
    }

    this.subsctiptions.push(
      this.form.get('typeCertificate')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x=>{
        if(!! x && x != null){
          this.appService.get(api.SYS_OTHERLIST_READ + `?id=${x}`).subscribe(v => {
            if(v.ok && v.status === 200){
              var result = v.body.innerBody;
              if(result.code === "LCT002"){
                this.form.get('name')?.enable();
                this.form.get('levelTrain')?.disable();
                this.form.get('levelId')?.disable();
              }else{
              this.form.get('name')?.disable();
              this.form.get('levelTrain')?.enable();
              this.form.get('levelId')?.enable();
            }
            }
          })
        }
      })!,
    )

  }

  ngOnDestroy(): void {
    this.certificateService.certificateId = 0;
    this.certificateService.certificateId = 0;
    this.urlService.currentRouteUrl$.next('/profile/certificate');
  }


  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngAfterViewInit(): void {
  }
}
