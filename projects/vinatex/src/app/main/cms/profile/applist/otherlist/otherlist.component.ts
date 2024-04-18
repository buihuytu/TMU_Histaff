import { Component, ViewEncapsulation, AfterViewInit, OnInit } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICoreListOption, IFilterOperator, EnumFilterOperator, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, ISysGroup } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject } from "rxjs";
import { OrtherlistEditService } from "./otherlist-service";

@Component({
  selector: 'cms-app-otherList',
  templateUrl: './otherlist.component.html',
  styleUrls: ['./otherlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OtherListComponent
  extends BaseComponent
  implements AfterViewInit, OnInit
{
  override subscriptions: Subscription[] = [];
  otherListOption: ICoreListOption[] = [];
  typeId!: number;
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'typeId',
      operator: EnumFilterOperator.EQUAL,
    },
  ];

  outerParam$ = new BehaviorSubject<any>(null);
  title = EnumTranslateKey.UI_COMPONENT_TITLE_ORTHERLIST;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_OTHERLIST_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_OTHERLIST_DELETE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: 'ContractType.ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_TYPENAME,
      field: 'typeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_OTHERLIST_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_EFFECTIVE_DATE,
      field: 'effectiveDate',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_EXPIRATION_DATE,
      field: 'expirationDate',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_IS_ACTIVE,
      field: 'isActive',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_YES_NO,
      type: 'string',
      align: 'left',
      width: 100,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private sysOtherListService: OrtherlistEditService
  ) {
    super(mls);
  }
  ngAfterViewInit() {}
  override ngOnInit(): void {
    this.subscriptions.push(
      this.sysOtherListService.GetAllGroupOtherListType().subscribe((x) => {
        if (x.ok && x.status === 200) {
          const newGroupOptions: ICoreListOption[] = [];
          (x.body.innerBody as ISysGroup[]).map((x) => {
            newGroupOptions.push({
              value: x.id,
              text: x.name,
            });
          });
          this.otherListOption = newGroupOptions;
        }
      })
    );
  }

  onOtherListTypeChange(typeId: number) {
    if (!!this.outerParam$.value) {
      const newOuterFilterParam = JSON.parse(
        JSON.stringify(this.outerParam$.value)
      );
      newOuterFilterParam['typeId'] = typeId;
      this.outerParam$.next(newOuterFilterParam);
      this.subscriptions.push();
    } else {
      this.outerParam$.next({ typeId });
    }

    this.sysOtherListService.typeId = typeId;
  }
}
// import { OtherList } from './../../../../../_models/app/list/otherlist';
// import {
//   Component,
//   OnInit,
//   ViewChild,
//   ViewEncapsulation,
//   Inject,
// } from "@angular/core";
// import { BehaviorSubject, pipe, Subject } from "rxjs";
// import { Observable } from "rxjs";
// import { Router } from "@angular/router";

// // Service Translate
// import { TranslationLoaderService } from "../../../../../common/translation-loader.service";
// import { TranslateService } from "@ngx-translate/core";
// // Import the locale files
// import { locale as english } from "./i18n/en";
// import { locale as vietnam } from "./i18n/vi";
// // Globals File
// import { Globals } from "../../../../../common/globals";
// import { Configs } from "../../../../../common/configs";
// import { Notification } from "../../../../../common/notification";
// import { L10n, setCulture } from "@syncfusion/ej2-base";
// import {
//   FilterService,
//   GridComponent,
//   VirtualScrollService,
// } from "@syncfusion/ej2-angular-grids";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { DataStateChangeEventArgs } from "@syncfusion/ej2-angular-grids";
// import { ToolbarItem, ToolbarInterface } from "../../../../../_models/index";
// import { CoreService } from "../../../../../services/core.service";
// import { ConfigService } from "../../../../../services/config.service";
// import { ModalService } from "../../../../../services/modal.service";
// import { Query } from "@syncfusion/ej2-data";
// import { TreeViewComponent } from "@syncfusion/ej2-angular-navigations";
// import {
//   ListBoxComponent,
//   CheckBoxSelection,
// } from "@syncfusion/ej2-angular-dropdowns";
// ListBoxComponent.Inject(CheckBoxSelection);
// import { IpServiceService } from "../../../../../services/ip-service.service";

// import { DropDownList } from "@syncfusion/ej2-angular-dropdowns";

// 
// import { takeUntil } from "rxjs/operators";
// setCulture("en");

// @Component({
//   selector: "cms-app-otherlist",
//   templateUrl: "./otherlist.component.html",
//   styleUrls: ["./otherlist.component.scss"],
//   providers: [FilterService, VirtualScrollService],
//   encapsulation: ViewEncapsulation.None,
// })
// export class OtherlistComponent implements OnInit {
//   toolItems$ = new BehaviorSubject<any[]>([
//     ToolbarItem.ADD, ToolbarItem.EDIT, ToolbarItem.LOCK, ToolbarItem.DELETE
//   ])

//   // Varriable Language
//   languages: any;
//   selectedLanguage: any;

//   editForm!: FormGroup;
//   public dropInstance!: DropDownList;
//   // View child Grid
//   @ViewChild("overviewgrid", { static: false })
//   public gridInstance!: GridComponent;

//   localData: any = [];
//   @ViewChild("treeView", { static: false })
//   listTreeObj!: TreeViewComponent;
//   // Toolbar Item
//   public toolbar!: ToolbarInterface[];
//   // Khai báo data
//   public data: Observable<DataStateChangeEventArgs>;
//   public state!: DataStateChangeEventArgs;
//   model: OtherList = new OtherList()
//   public modelAdd: any;
//   public modelDelete: Array<any> = [];
//   // query auto complete
//   public query = new Query();
//   // list filter

//   // Private
//   private _unsubscribeAll: Subject<any>;
//   pageIndex: number = 0;
//   button: any;
//   nodeSelected: any;

//   field: any = { value: 'id', text: 'name'}

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
//     private _translateService: TranslateService,
//     private _configService: ConfigService,
//     private ip: IpServiceService,
//     private _tlaTranslationLoaderService: TranslationLoaderService
//   ) {
//     this.data = _coreService;
//     // Set language
//     this.languages = this.globals.languages;

//     this._configService._configSubject.next("true");
//     // Load file language
//     this._tlaTranslationLoaderService.loadTranslations(vietnam, english);

//     // Set the private defaults
//     this._unsubscribeAll = new Subject();
//     L10n.load(this.configs.languageGrid);
// }
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
//     this.getTreeView();
//     // Load List Data
//     this._coreService.organization
//       .pipe(takeUntil(this._unsubscribeAll))
//       .subscribe((model: any) => {
//         this.nodeSelected = model.id;
//         this.getListData();
//       });
//     setTimeout(() => {
//       this._coreService.organizationSelect.next(true);
//     }, 100);
//   }

//   viewRecord = (event: any) => {
//     this.modelAdd = event.rowData;
//     const objParamAdd = { id: this.modelAdd.id, type: "view" };
//     const paramAdd = window.btoa(JSON.stringify(objParamAdd));
//     this.router.navigate(["/cms/profile/list/otherlist/", paramAdd]);
//   };

//   // GetListData
//   getListData = (): void => {
//     const state = { skip: 0, take: 20 };
//     let extraParams: any[] = [];
//     if (this.nodeSelected) {
//       extraParams.push({
//         field: "TypeId",
//         value: this.nodeSelected,
//       });
//     }
//     this._coreService.execute(state, "hr/otherlist/GetAllByType",extraParams);
//   };

//   public dataStateChange(state: DataStateChangeEventArgs): void {
//     this.pageIndex = Math.floor(state.skip! / state.take!);
//     let extraParams: any[] = [];
//     if (this.nodeSelected) {
//       extraParams.push({
//         field: "TypeId",
//         value: this.nodeSelected,
//       });
//     }
//     this._coreService.execute(state, "hr/otherlist/GetAllByType", extraParams);
//   }
//   // Event Click Toolbar
//   clickToolbar = (itemButton: any): void => {
//     const buttonId = itemButton.id;
//     let selectDeletes = this.gridInstance.getSelectedRecords();

//     switch (buttonId) {
//       case ToolbarItem.ADD:
//         this.router.navigate(["/cms/profile/list/otherlist/new"]);
//         break;
//       case ToolbarItem.EDIT:
//         const selectRows = this.gridInstance.getSelectedRecords();
//         if (selectRows && selectRows.length > 0) {
//           this.modelAdd = selectRows[0];
//           const objParamAdd = { id: this.modelAdd.id, type: "edit" };
//           const paramAdd = window.btoa(JSON.stringify(objParamAdd));
//           this.router.navigate([
//             "/cms/profile/list/otherlist/",
//             paramAdd,
//           ]);
//         } else {
//           this.notification.warning("notify.NO_RECORD_SELECT");
//         }
//         break;
//       case ToolbarItem.DELETE:
//         if (selectDeletes && selectDeletes.length > 0) {
//           this.modelDelete = selectDeletes;
//           this.modalService.open("confirm-delete-modal");
//         } else {
//           this.notification.warning("notify.NO_RECORD_SELECT");
//         }
//         break;
//       case ToolbarItem.LOCK:
//         if (selectDeletes && selectDeletes.length > 0) {
//           let ids = selectDeletes.map((i: any) => i.id);
//           this._coreService
//             .Post("hr/otherlist/ChangeStatus", ids)
//             .subscribe((res: any) => {
//               if (res.statusCode == 200) {
//                 this.notification.lockSuccess();
//                 this.gridInstance.refresh();
//               } else {
//                 this.notification.lockError();
//               }
//             });
//         } else {
//           this.notification.warning("notify.NO_RECORD_SELECT");
//         }
//         break;
//       default:
//         break;
//     }
//   };

//   confirmDelete = (status: any): void => {
//     if (status === "cancel") {
//       this.modalService.close("confirm-delete-modal");
//     } else {
//       let lstDeleteIds = _.map(this.modelDelete, "id");
//       if (lstDeleteIds.length > 0) {
//         this._coreService
//           .Post("hr/otherlist/Delete", lstDeleteIds)
//           .subscribe((success: any) => {
//             if (success.statusCode == "200") {
//               this.notification.deleteSuccess();
//               this.modalService.close("confirm-delete-modal");
//               this.gridInstance.clearSelection();
//               this.gridInstance.refresh();
//             }
//             else {
//               this.notification.deleteError();
//               this.modalService.close("confirm-delete-modal");
//             }

//           });
//       }
//     }
//   };
//   nodeSelecting(e: any) {
//     this.nodeSelected = Number(e.nodeData.id);
//     this.getListData();
//   }
//   getTreeView() {
//     this._coreService.Get("hr/otherlist/GetOtherListTreeView").subscribe((res: any) => {
//       this.localData = res.data;
//       this.loadTreeView();
//     });
//   }
//   loadTreeView() {
//     const x = setInterval(() => {
//       if (this.listTreeObj && this.listTreeObj.fields) {
//         this.listTreeObj.fields = {
//           dataSource: this.localData,
//           id: "id",
//           text: "name",
//         };
//         clearInterval(x);
//       }
//     }, 100);
//   }
// }
