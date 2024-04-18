
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, DialogService, MultiLanguageService, EnumFormBaseContolType } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, map } from 'rxjs';
import { OrtherlistEditService } from '../otherlist-service';

@Component({
  selector: 'app-otherlist-edit',
  templateUrl: './otherlist-edit.component.html',
  styleUrls: ['./otherlist-edit.component.scss'],
})
export class OtherlistEditComponent
  extends BaseEditComponent
  implements OnInit, OnDestroy
{
  /* Properties to be passed into core-page-edit */

  override entityTable = 'SYS_OTHER_LIST';

  loading: boolean = false;

  subsctiptions: Subscription[] = [];

  checklistOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  scaleOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  scaleGetByIdObject$ = new BehaviorSubject<any>(null);
  scaleGetByIdApi = api.SYS_OTHERLIST_READ;
  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections!: ICoreFormSection[];
  constructor(
    // private _coreService: CoreService,
    public override dialogService: DialogService,
    private otherlistService: OrtherlistEditService,
    private mls: MultiLanguageService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_OTHERLIST_EDIT;

    this.crud = {
      c: api.SYS_OTHERLIST_CREATE,
      r: api.SYS_OTHERLIST_READ,
      u: api.SYS_OTHERLIST_UPDATE,
      d: api.SYS_OTHERLIST_DELETE_IDS,
    };
  }
  ngOnInit(): void {
    this.loading = true;
    this.otherlistService
      .getScales()
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
        })
      )
      .subscribe((response) => {
        this.scaleOptions$.next(response);
        this.loading = false;
      });

    this.sections = [
      {
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              hidden: true,
            },
          ],
          [
            {
              flexSize: 12,
              label:
                EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_TYPENAME,
              field: 'typeId',
              value: this.otherlistService.typeId,
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.scaleOptions$,
              getByIdObject$: this.scaleGetByIdObject$,
              getByIdApi: this.scaleGetByIdApi,
              shownFrom: 'name',
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(1),
                  errorMessage:
                    EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                },
              ],
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(1),
                  errorMessage:
                    EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                },
              ],
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_NAME,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(1),
                  errorMessage:
                    EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                },
              ],
            },
          ],
          [
            {
              flexSize: 12,
              label:
                EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_EFFECTIVE_DATE,
              field: 'effectDate',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ],
            },
          ],
          [
            {
              flexSize: 12,
              label:
                EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_EXPIRATION_DATE,
              field: 'expirationDate',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              // validators: [
              //   {
              //     name: 'required',
              //     validator: Validators.required,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //   },
              // ],
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_OTHERLIST_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
          ],
        ],
      },
    ];
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subsctiptions.map((x) => x?.unsubscribe());
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
// import { BehaviorSubject, Subject } from "rxjs";
// import { Router, ActivatedRoute, Params } from "@angular/router";

// // Service Translate
// import { TranslationLoaderService } from "../../../../../../common/translation-loader.service";
// import { TranslateService } from "@ngx-translate/core";
// // Import the locale files
// import { locale as english } from "../i18n/en";
// import { locale as vietnam } from "../i18n/vi";
// // Globals File
// import { Globals } from "../../../../../../common/globals";
// import { Configs } from "../../../../../../common/configs";
// import { Notification } from "../../../../../../common/notification";
// 
// import { L10n, setCulture } from "@syncfusion/ej2-base";
// import {
//   FilterService,
//   VirtualScrollService,
// } from "@syncfusion/ej2-angular-grids";
// import { ToolbarItem, ToolbarInterface } from "../../../../../../_models/index";
// import { Function } from "../../../../../../_models/app/list/index";

// import { CoreService } from "../../../../../../services/core.service";
// import { ConfigService } from "../../../../../../services/config.service";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { ModalService } from "../../../../../../services/modal.service";
// import { Query, Predicate, DataManager } from "@syncfusion/ej2-data";
// import { FieldSettingsModel } from "@syncfusion/ej2-dropdowns";
// 
// import { OtherList } from "../../../../../../_models/app/list/otherlist";
// setCulture("en");

// @Component({
//   selector: "app-otherlist-edit",
//   templateUrl: "./otherlist-edit.component.html",
//   styleUrls: ["./otherlist-edit.component.scss"],
//   providers: [FilterService, VirtualScrollService],
//   encapsulation: ViewEncapsulation.None,
// })
// export class OtherListEditComponent implements OnInit {
//   toolItems$ = new BehaviorSubject<any[]>([

//   ])

//   // Varriable Language
//   flagState$ = new BehaviorSubject<string>('');
//   // flag show popup toolbar Back
//   flagePopup = true;
//   paramId: string = "";
//   typeId: any;

//   model: OtherList = new Function();
//   modelTemp: OtherList = new Function();
//   languages: any;
//   selectedLanguage: any;

//   editForm!: FormGroup;
//   public query = new Query();
//   public fields: FieldSettingsModel = { value: "id", text: "name" };

//   //list data
//   public lstType: any[] = [];

//   // Toolbar Item
//   public toolbar!: ToolbarInterface[];

//   // Private
//   private _unsubscribeAll: Subject<any>;
//   lstApplication: any;
//   lstGroup: any;
//   lstModule: any;

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
//         if (paramUrl && paramUrl.id && paramUrl.type != "new") {
//           this.paramId = paramUrl.id;
//           this.flagState$.next(paramUrl.type);
//         }
//         else if(paramUrl && paramUrl.type == "new"){
//           this.flagState$.next(paramUrl.type);
//           this.typeId = paramUrl.id
//         } else {
//           // Xu ly redirect
//           this.router.navigate(["/errors/404"]);
//         }
//       } else {
//         this.flagState$.next("new");
//       }
//     });

//     // Set language
//     this.languages = this.globals.languages;

//     this._configService._configSubject.next("true");
//     // Load file language
//     this._tlaTranslationLoaderService.loadTranslations(vietnam, english);

//     this.editForm = this._formBuilder.group({
//       code: [
//         "",
//         [
//           Validators.required,
//           Validators.maxLength(30),
//           Validators.pattern(/^[-+\/.,_a-zA-Z0-9]+$/),
//         ],
//       ],
//       name: [
//         "",
//         [
//           Validators.required,
//           this.globals.noWhitespaceValidator,
//           Validators.maxLength(300),
//         ],
//       ],
//       type: ["", Validators.required],
//       order: [""],
//       note: [""],
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

//     this.flagState$.subscribe(x => {
//       let toolbarList: any[] = [];
//       if (x === "view") {
//         toolbarList = [
//           ToolbarItem.BACK,
//           ToolbarItem.EDIT,
//         ];
//         this.editForm.disable();
//       }
//       if (x === "new") {
//         toolbarList = [
//           ToolbarItem.BACK,
//           ToolbarItem.SAVE,
//         ];
//       }
//       if (x === "edit") {
//         toolbarList = [
//           ToolbarItem.BACK,
//           ToolbarItem.SAVE,
//         ];
//         this.editForm.get("code")!.disable();
//         this.editForm.get("type")!.disable();

//       }

//       this.toolItems$.next(toolbarList);

//     })

//     async.waterfall(
//       [
//         (cb: any) => {
//           if (this.paramId) {
//             this._coreService
//               .Get("hr/otherlist/get?id=" + this.paramId)
//               .subscribe((res: any) => {
//                 this.model = res.data;
//                 cb();
//               });
//           } else {
//             cb();
//           }
//         },
//         (cb: any) => {
//           this._coreService
//             .Get("hr/otherlist/GetAllType")
//             .subscribe((res: any) => {
//               this.lstType = res.data;
//               cb();
//             });
//         },
//         (cb: any) => {
//           this._coreService.Get("package/module/GetAll").subscribe((res: any) => {
//             this.lstModule = res.data;
//             cb();
//           });
//         },
//       ],
//       (err: any, ok: any) => {
//         this.model = _.cloneDeep(this.modelTemp);
//         //delete this.modelTemp;
//         if(this.flagState$.value == "new")
//         {
//           this.model.typeId = this.typeId;
//         }
//       }
//     );
//   }

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
//           this.router.navigate(["/cms/profile/list/otherlist"]);
//         }
//         break;
//       case ToolbarItem.ADD:
//         break;
//       case ToolbarItem.SAVE:
//         this.saveData();
//         break;
//       case ToolbarItem.EDIT:
//         this.flagState$.next("edit");
//         this.flagePopup = true;
//         this.editForm.enable();
//         this.editForm.get("code")!.disable();
//         this.editForm.get("type")!.disable();
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
//       this.notification.warning("Lưu không thành công!");
//       this.editForm.markAllAsTouched();
//     } else {
//       if (this.flagState$.value === "new") {
//         this._coreService.Post("hr/otherlist/add", this.model).subscribe(
//           (res: any) => {
//             if (res.statusCode == 200) {
//               this.notification.addSuccess();
//               this.router.navigate(["/cms/profile/list/otherlist"]);
//             } else {
//               this.notification.addError();
//             }
//           },
//           (error: any) => {
//             this.notification.addError();
//           }
//         );
//       } else {
//         this._coreService.Post("hr/otherlist/update", this.model).subscribe(
//           (res: any) => {
//             if (res.statusCode == 200) {
//               this.notification.editSuccess();
//               this.router.navigate(["/cms/profile/list/otherlist"]);
//             } else {
//               this.notification.addError();
//             }
//           },
//           (error: any) => {
//             this.notification.editSuccess();
//           }
//         );
//       }
//     }
//   };

//   confirmBack = (status: any): void => {
//     if (status === "cancel") {
//       this.modalService.close("confirm-back-modal");
//     } else {
//       this.modalService.close("confirm-back-modal");
//       this.router.navigate(["/cms/profile/list/otherlist"]);
//     }
//   };
//   onFiltering = (e: any, lst: any) =>{

//   }
//   confirmDelete= (status: any): void => {
//   }
// }
