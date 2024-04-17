import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormGroup, AbstractControl } from '@angular/forms';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICoreChecklistOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumIconClass, DialogService, AppService, IFormatedResponse, CustomValidators } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-welfare-edit',
  templateUrl: './welfare-edit.component.html',
  styleUrls: ['./welfare-edit.component.scss']
})
export class WelfareEditComponent extends BaseEditComponent implements OnInit, OnDestroy {

  /* Properties to be passed into core-page-edit */

  override entityTable = "HU_WELFARE";
  loading: boolean = false;

  subscriptions: Subscription[] = [];

  groupOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsGender$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);

  genderGetByIdObject$ = new BehaviorSubject<any>(null);
  genderGetByIdApi = api.SYS_OTHERLIST_READ;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_NAME,
              field: 'name',
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
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_DATESTART,
              field: 'dateStart',
              value: new Date(),
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
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_DATEEND,
              field: 'dateEnd',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              validators: [
                // {
                //   name: 'required',
                //   validator: Validators.required,
                //   errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                // },
              ]
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_PAYMENT_DATE,
              field: 'paymentDate',
              value: new Date(),
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
          ],
          [

            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_IS_AUTO_ACTIVE,
              field: 'isAutoActive',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },

            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_IS_CAL_TAX,
              field: 'isCalTax',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
            {
              flexSize: 8,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
              textareaRows: 3
            },
          ],
        ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_WITH_CONDITIONS,
        iconClass: EnumIconClass.FEATHER_SETTINGS,
        rows: [
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_PERCENT,
              field: 'percentage',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
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
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_GENDER,
              field: 'genderId',
              value: '',
              getByIdObject$: this.genderGetByIdObject$,
              getByIdApi: this.genderGetByIdApi,
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.groupOptionsGender$,
              type: 'number',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_AGE_FROM,
              field: 'ageFrom',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'checkAgeTo',
                  validator: WelfareEditComponent.checkAgeFrom,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
                },
              ],
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_AGE_TO,
              field: 'ageTo',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'checkAgeTo',
                  validator: WelfareEditComponent.checkAgeTo,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
                },
              ],
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_SENIORITY_ABOVE,
              field: 'seniorityAbove',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'checkSeniorityHeight',
                  validator: WelfareEditComponent.checkSeniorityHeight,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
                },
              ],
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_SENIORITY_BELLOW,
              field: 'seniority',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'checkSeniorityFrom',
                  validator: WelfareEditComponent.checkSeniorityLow,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
                },
              ],
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_WORK_LEAVE_NOPAY_FROM,
              field: 'workLeaveNopayFrom',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'checkWorkLeaveNoPayFrom',
                  validator: WelfareEditComponent.checkWorkLeaveNopayFrom,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
                },
              ],
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_WORK_LEAVE_NOPAY_TO,
              field: 'workLeaveNopayTo',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'checkWorkLeaveNoPayTo',
                  validator: WelfareEditComponent.checkWorkLeaveNopayTo,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
                },
              ],
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_MONTHS_PEND_FROM,
              field: 'monthsPendFrom',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'checkMonthsPendFrom',
                  validator: WelfareEditComponent.checkMonthsPendFrom,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
                },
              ],
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_MONTHS_PEND_TO,
              field: 'monthsPendTo',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'checkMonthsPendTo',
                  validator: WelfareEditComponent.checkMonthsPendTo,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
                },
              ],
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_MONTHS_WORK_IN_YEAR,
              field: 'monthsWorkInYear',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_MONNEY,
              field: 'monney',
              value: '',
              controlType: EnumFormBaseContolType.CURRENCY,
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
        ]
      },
    ];
  constructor(
    public override dialogService: DialogService,
    private appService: AppService // CoreService is DEPRECATED!!!
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_WELFARE_EDIT;

    this.crud = {
      c: api.HU_WELFARE_CREATE,
      r: api.HU_WELFARE_READ,
      u: api.HU_WELFARE_UPDATE,
      d: api.HU_WELFARE_DELETE,
    };

  }
  ngOnInit(): void {
    this.loading = true;
    this.subscriptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'GENDER')
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
              this.groupOptionsGender$.next(options);

            }
          }
        })
    )
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;

    const idItem = this.form.get('id')?.value;
    if (!idItem) {
      this.subscriptions.push( // <== Inner push
        this.appService
          .get(api.HU_WELFARE_AUTOGEN_CODE)
          .subscribe((res: any) => {
            if (!!res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200 && !!body.innerBody) {
                this.form.get('code')?.setValue(res.body.innerBody);
              }
            }
          })
      ) // Close inner push

    } else {
      //this.form.get('userName')?.disable()
      //this.form.get('fullname')?.disable()
    }
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }
  static checkAgeFrom(age: AbstractControl) {
    let valid = true;
    let errorMessage = "";
    const minAge: number = 0;
    const fromAge = age.value;
    if (minAge > fromAge && age != null) {
      valid = false;
      errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WELFARE_ERROR_FROM_AGE_MORE_THAN_MIN_AGE
    }
    return CustomValidators.core("checkAgeFrom", valid, errorMessage)(age)

  }
  static checkAgeTo(age: AbstractControl): any | null {
    let valid = true;
    let errorMessage = "";
    const fromAge = age.parent?.get("ageFrom")?.value;
    const toAge = age.value;
    if (fromAge > toAge && age != null) {
      valid = false;
      errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WELFARE_ERROR_TO_AGE_MORE_THAN_FROM_AGE
    }
    return CustomValidators.core("checkAgeTo", valid, errorMessage)(age)
  }
  static checkSeniorityHeight(seniority: AbstractControl) {
    let valid = true;
    let errorMessage = "";
    const minSeniority: number = 0;
    const toSeniority = seniority.value;
    if (minSeniority > toSeniority && seniority != null) {
      valid = false;
      errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WELFARE_ERROR_TO_SENIORITY_MORE_THAN_FROM_SENIORITY
    }
    return CustomValidators.core("checkSeniorityFrom", valid, errorMessage)(seniority)
  }
  static checkSeniorityLow(seniority: AbstractControl) {
    let valid = true;
    let errorMessage = "";
    const fromSeniority = seniority.parent?.get("seniority")?.value;
    const toSeniority = seniority.value;
    if (fromSeniority < toSeniority && seniority.value != null) {
      valid = false;
      errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WELFARE_ERROR_FROM_SENIORITY_MORE_THAN_MIN_SENIORITY
    }
    return CustomValidators.core("checkSeniorityTo", valid, errorMessage)(seniority)
  }
  static checkWorkLeaveNopayFrom(workLeaveNopay: AbstractControl) {
    let valid = true;
    let errorMessage = "";
    const minWorkLeaveNopay: number = 0;
    const fromWorkLeaveNopay = workLeaveNopay.value;
    if (minWorkLeaveNopay > fromWorkLeaveNopay && workLeaveNopay != null) {
      valid = false;
      errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WELFARE_ERROR_FROM_WORK_LEAVE_NO_PAY_MORE_THAN_MIN_WORK_LEAVE_NO_PAY
    }
    return CustomValidators.core("checkWorkLeaveNoPayFrom", valid, errorMessage)(workLeaveNopay)
  }
  static checkWorkLeaveNopayTo(workLeaveNopay: AbstractControl) {
    let valid = true;
    let errorMessage = "";
    const fromWorkLeaveNoPay = workLeaveNopay.parent?.get("workLeaveNopayFrom")?.value
    const toWorkLeaveNopay = workLeaveNopay.value;
    if (fromWorkLeaveNoPay > toWorkLeaveNopay && workLeaveNopay.value != null) {
      valid = false;
      errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WELFARE_ERROR_TO_WORK_LEAVE_NO_PAY_MORE_THAN_FROM_WORK_LEAVE_NO_PAY
    }
    return CustomValidators.core("checkWorkLeaveNoPayTo", valid, errorMessage)(workLeaveNopay)
  }
  static checkMonthsPendFrom(monthsPend: AbstractControl) {
    let valid = true;
    let errorMessage = "";
    const minMonthsPend: number = 0;
    const fromMonthsPend = monthsPend.value;
    if (minMonthsPend > fromMonthsPend && monthsPend != null) {
      valid = false;
      errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WELFARE_ERROR_FROM_MONTHS_PEND_MORE_THAN_MIN_MONTHS_PEND
    }
    return CustomValidators.core("checkMonthsPendFrom", valid, errorMessage)(monthsPend)
  }
  static checkMonthsPendTo(monthsPend: AbstractControl) {
    let valid = true;
    let errorMessage = "";
    const fromMonthsPend = monthsPend.parent?.get("monthsPendFrom")?.value
    const toMonthsPend = monthsPend.value;
    if (fromMonthsPend > toMonthsPend && monthsPend.value != null) {
      valid = false;
      errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WELFARE_ERROR_TO_MONTHS_PEND_MORE_THAN_FROM_MONTHS_PEND
    }
    return CustomValidators.core("checkMonthsPendTo", valid, errorMessage)(monthsPend)
  }
}

// import {
//   Component,
//   OnInit,
//   ViewChild,
//   ViewEncapsulation,
//   Inject,
//   AfterViewInit,
// } from "@angular/core";
// import { Subject } from "rxjs";
// import { Router, ActivatedRoute, Params } from "@angular/router";

// // Service Translate
// import { TranslationLoaderService } from "@vinatex/common/translation-loader.service";
// import { TranslateService } from "@ngx-translate/core";
// // Import the locale files
// import { locale as english } from "../i18n/en";
// import { locale as vietnam } from "../i18n/vi";
// // Globals File
// import { Globals } from "@vinatex/common/globals";
// import { Configs } from "@vinatex/common/configs";
// import { Notification } from "@vinatex/common/notification";
// 
// import { L10n, setCulture } from "@syncfusion/ej2-base";
// import {
//   FilterService,
//   VirtualScrollService,
// } from "@syncfusion/ej2-angular-grids";
// import { ToolbarItem, ToolbarInterface } from "@vinatex/_models/index";
// import { Welfare } from "@vinatex/_models/app/cms/index";

// import { CoreService } from "@vinatex/services/core.service";
// import { ConfigService } from "@vinatex/services/config.service";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { ModalService } from "@vinatex/services/modal.service";
// import { Query, Predicate, DataManager } from "@syncfusion/ej2-data";
// import { FieldSettingsModel } from "@syncfusion/ej2-dropdowns";
// import * as moment from "moment";
// 
// 
// setCulture("en");

// @Component({
//   selector: "app-welfare-edit",
//   templateUrl: "./welfare-edit.component.html",
//   styleUrls: ["./welfare-edit.component.scss"],
//   providers: [FilterService, VirtualScrollService],
//   encapsulation: ViewEncapsulation.None,
// })
// export class WelfareEditComponent implements OnInit {
//   // Varriable Language
//   flagState = "";
//   // flag show popup toolbar Back
//   flagePopup = true;
//   paramId = "";

//   model: Welfare = new Welfare();
//   modelTemp: Welfare = new Welfare();
//   languages: any;
//   selectedLanguage: any;
//   mode: any;
//   editForm!: FormGroup;
//   public query = new Query();
//   public fields: FieldSettingsModel = { value: "id", text: "name" };

//   // Toolbar Item
//   public toolbar!: ToolbarInterface[];

//   // Private
//   private _unsubscribeAll: Subject<any>;
//   lstContractTypes: any;

//   /**
//    * Constructor
//    *
//    */
//   constructor(
//     private _coreService: CoreService,
//     private modalService: ModalService,
//     private notification: Notification,
//     private globals: Globals,
//     public configs: Configs,
//     public router: Router,
//     private _formBuilder: FormBuilder,
//     public activatedRoute: ActivatedRoute,
//     private _translateService: TranslateService,
//     private _configService: ConfigService,
//     private _tlaTranslationLoaderService: TranslationLoaderService
//   ) {
//     // Get Route Param
//     this.activatedRoute.params.subscribe((params: Params) => {
//       const paramId = params["id"];
//       // Nếu trạng thái chỉnh sửa thì Get dữ liệu
//       if (paramId !== "new") {
//         const objParam = window.atob(paramId);
//         const paramUrl = JSON.parse(objParam);
//         if (paramUrl && paramUrl.id) {
//           this.paramId = paramUrl.id;
//           this.flagState = paramUrl.type;
//         } else {
//           // Xu ly redirect
//           this.router.navigate(["/errors/404"]);
//         }
//       } else {
//         this.flagState = "new";
//       }
//     });

//     // Set language
//     this.languages = this.globals.languages;

//     this._configService._configSubject.next("true");
//     // Load file language
//     this._tlaTranslationLoaderService.loadTranslations(vietnam, english);

//     this.editForm = this._formBuilder.group({
//       name: ["", [Validators.required, Validators.maxLength(51)]],
//       code: [
//         "",
//         [
//           Validators.required,
//           Validators.maxLength(31),
//           this.globals.checkExistSpace,
//         ],
//       ],

//       money: ["", [Validators.required]],
//       seniority: [""],
//       dateStart: ["", [Validators.required]],
//       dateEnd: [""],
//       note: [""],
//       contractTypes: ["", [Validators.required]],
//     });

//     // Set the private defaults
//     this._unsubscribeAll = new Subject();
//     L10n.load(this.configs.languageGrid);
//   }

//   /**
//    * On init
//    */
//   ngOnInit(): void {
//     // Set the selected language from default languages
//     this.selectedLanguage = _.find(this.languages, {
//       id: this._translateService.currentLang,
//     });
//

//     // Build toolbar
//     this.buildToolbar();

//     if (this.flagState === "view") {
//       this.editForm.disable();
//     }
//     if (this.flagState === "edit") {
//       this.editForm.get("code")!.disable();
//     }
//     async.waterfall(
//       [
//         (cb: any) => {
//           if (this.paramId) {
//             this._coreService
//               .Get("hr/Welfare/get?id=" + this.paramId)
//               .subscribe((res: any) => {
//                 this.modelTemp = res.data;
//                 cb();
//               });
//           } else {
//             cb();
//           }
//         },
//         (cb: any) => {
//           this._coreService.Get("hr/contracttype/GetList").subscribe((res: any) => {
//             this.lstContractTypes = res.data;
//             cb();
//           });
//         },
//       ],
//       (err: any, ok: any) => {
//         this.model = _.cloneDeep(this.modelTemp);
//         //delete this.modelTemp;
//       }
//     );

//     this.mode = "CheckBox";
//   }

//   // Build Toolbar
//   buildToolbar = () => {
//     setTimeout(() => {
//       let toolbarList: any[] = [];
//       if (this.flagState === "view") {
//         toolbarList = [ToolbarItem.BACK, ToolbarItem.EDIT];
//       }
//       if (this.flagState === "new") {
//         toolbarList = [ToolbarItem.BACK, ToolbarItem.SAVE];
//       }
//       if (this.flagState === "edit") {
//         toolbarList = [ToolbarItem.BACK, ToolbarItem.SAVE];
//       }
//       this.toolbar = this.globals.buildToolbar("welfare", toolbarList!);
//     }, 200);
//   };

//   // Event Click Toolbar
//   clickToolbar = (itemButton: any): void => {
//     const buttonId = itemButton.id;
//     switch (buttonId) {
//       case ToolbarItem.BACK:
//         if (this.editForm.dirty && this.editForm.touched) {
//           this.flagePopup = false;
//         }
//         if (
//           (this.editForm.dirty && this.editForm.touched) ||
//           this.flagePopup === false
//         ) {
//           this.modalService.open("confirm-back-modal");
//         }
//         if (this.flagePopup === true) {
//           this.router.navigate(["cms/profile/list/welfare"]);
//         }
//         break;
//       case ToolbarItem.ADD:
//         break;
//       case ToolbarItem.SAVE:
//         this.saveData();
//         break;
//       case ToolbarItem.EDIT:
//         this.flagState = "edit";
//         this.flagePopup = true;
//         this.editForm.enable();
//         this.editForm.get("code")!.disable();
//         this.buildToolbar();
//         break;
//       case ToolbarItem.DELETE:
//         break;
//       case ToolbarItem.COPY:
//         break;
//       default:
//         break;
//     }
//   };
//   // lưu data open popup
//   saveData = () => {
//     if (!this.editForm.valid) {
//       this.notification.formInvalid();
//       this.editForm.markAllAsTouched();
//       return;
//     }

//     let param = this.convertModel(this.model);
//     if (moment(param.dateStart).isSameOrAfter(param.dateEnd)) {
//       this.notification.warning("Ngày hết hiệu lực phải lớn hơn ngày hiệu lực");
//       return;
//     }
//     if (this.flagState === "new") {
//       this._coreService.Post("hr/welfare/add", param).subscribe(
//         (res: any) => {
//           if (res.statusCode == 400) {
//             this.notification.checkErrorMessage(res.message);
//           } else {
//             this.notification.addSuccess();
//             this.router.navigate(["/cms/profile/list/welfare"]);
//           }
//         },
//         (error: any) => {
//           this.notification.addError();
//         }
//       );
//     } else {
//       this._coreService.Post("hr/welfare/Update", param).subscribe(
//         (res: any) => {
//           if (res.statusCode == 400) {
//             this.notification.checkErrorMessage(res.message);
//           } else {
//             this.notification.editSuccess();
//             this.router.navigate(["/cms/profile/list/welfare"]);
//           }
//         },
//         (error: any) => {
//           this.notification.editError();
//         }
//       );
//     }
//   };
//   convertModel(param: any) {
//     let model = _.cloneDeep(param);
//     model.dateStart = moment(model.dateStart).format("MM/DD/YYYY").toString();
//     model.dateEnd = moment(model.dateEnd).format("MM/DD/YYYY").toString();
//     return model;
//   }
//   // change date
//   changeDate = (model: any) => {
//     setTimeout(() => {
//       const idDate = "#" + model + "_input";
//       const value = $(idDate).val();
//       var patt = new RegExp(
//         "q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m"
//       );
//       if (value.length === 0) {
//         this.editForm.get(model)!.setErrors({ required: true });
//         return;
//       } else if (value.length > 0 && patt.test(value.toLowerCase()) === true) {
//         this.editForm.get(model)!.setErrors({ incorrect: true });
//         return;
//       } else if (value.length > 10) {
//         this.editForm.get(model)!.setErrors({ incorrect: true });
//         return;
//       } else {
//         this.editForm.get(model)!.clearValidators();
//       }
//       if (
//         value &&
//         ((value.length === 8 && value.indexOf("/") === -1) ||
//           (value.length === 6 && value.indexOf("/") === -1) ||
//           (value.length === 10 && value.indexOf("/") > -1))
//       ) {
//         if (value.indexOf("-") === -1) {
//           const returnDate = this.globals.replaceDate(value);
//           // (this.model as any)[model] = returnDate;
//           if (returnDate && returnDate.length > 0) {
//             $(idDate).val(returnDate);
//             const dateParts: any = returnDate.split("/");
//             (this.model as any)[model] = new Date(
//               +dateParts[2],
//               dateParts[1] - 1,
//               +dateParts[0]
//             );
//             this.editForm.get(model)!.clearValidators();
//           }
//         }
//       }
//     }, 200);
//   };
//   changeDateNoRequire = (model: any) => {
//     setTimeout(() => {
//       const idDate = "#" + model + "_input";
//       const value = $(idDate).val();
//       var patt = new RegExp(
//         "q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m"
//       );
//       var patt1 = new RegExp(
//         /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.]/
//       );
//       // check nhập sai năm
//       if(value && value.indexOf("/") != -1)
//       {
//         let valueArray = value.split("/");
//         if(valueArray.length != 3)
//         {
//           this.editForm.get(model)!.setErrors({ incorrect: true });
//           return;
//         }
//         if(valueArray[0].length != 2 || valueArray[1].length != 2 || valueArray[2].length != 4)
//         {
//           this.editForm.get(model)!.setErrors({ incorrect: true });
//           return;
//         }
//       }
//       if(value)
//       {
//         let FindSpace = value.indexOf(" ");
//          if (FindSpace != -1) {
//         this.editForm.get(model)!.setErrors({ incorrect: true });
//         return;
//       } else
//       if (value.length > 0 && (patt.test(value.toLowerCase()) === true || patt1.test(value.toLowerCase()) === true)) {
//         this.editForm.get(model)!.setErrors({ incorrect: true });
//         return;
//       } else if (value.length > 10) {
//         this.editForm.get(model)!.setErrors({ incorrect: true });
//         return;
//       } else {
//         this.editForm.get(model)!.setErrors(null);
//       }
//       }
//       if (
//         value &&
//         ((value.length === 8 && value.indexOf("/") === -1) ||
//           (value.length === 6 && value.indexOf("/") === -1) ||
//           (value.length === 10 && value.indexOf("/") > -1))
//       ) {
//         if (value.indexOf("-") === -1) {
//           const returnDate = this.globals.replaceDate(value);
//           // (this.model as any)[model] = returnDate;
//           if (returnDate && returnDate.length > 0) {
//             $(idDate).val(returnDate);
//             const dateParts: any = returnDate.split("/");
//             (this.model as any)[model] = new Date(
//               +dateParts[2],
//               dateParts[1] - 1,
//               +dateParts[0]
//             );
//             this.editForm.get(model)!.clearValidators();
//           }
//         }
//       }
//     }, 200);
//   };
//   // confirm delete
//   confirmDelete = (status: any): void => {
//     if (status === "cancel") {
//       this.modalService.close("confirm-delete-modal");
//     } else {
//       this._coreService
//         .Delete("app-item/delete-many?ids=" + this.model.id, {
//           ip_address: "123456",
//           channel_code: "W",
//         })
//         .subscribe((success: any) => {
//           this.notification.deleteSuccess();
//           this.modalService.close("confirm-delete-modal");
//           this.router.navigate(["/cms/profile/list/welfare"]);
//         });
//     }
//   };
//   confirmBack = (status: any): void => {
//     if (status === "cancel") {
//       this.modalService.close("confirm-back-modal");
//     } else {
//       this.modalService.close("confirm-back-modal");
//       this.router.navigate(["/cms/profile/list/welfare"]);
//     }
//   };
//   // filter type
//   // change date
//   public onFiltering(e: any, a: any) {
//     e.preventDefaultAction = true;
//     const predicate = new Predicate("name", "contains", e.text, true, true);
//     this.query = new Query();
//     this.query = e.text !== "" ? this.query.where(predicate) : this.query;
//     e.updateData(a, this.query);
//   }
// }
