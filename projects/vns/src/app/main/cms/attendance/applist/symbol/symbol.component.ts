import { Component, OnInit, OnDestroy, AfterViewInit, TemplateRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, AlertService } from "ngx-histaff-alpha";

@Component({
  selector: 'cms-app-symbol',
  templateUrl: './symbol.component.html',
  styleUrls: ['./symbol.component.scss'],
})
export class SymbolComponent implements OnInit, OnDestroy, AfterViewInit {

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_SYMBOL;
  corePageListInstanceNumber!: number;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_SYMBOL_QUERY_LIST,
  };

  avatarTemplate!: TemplateRef<any>;

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.AT_SYMBOL_DELETE_IDS,
    toggleActiveIds: api.AT_SYMBOL_TOGGLE_ACTIVE_IDS,
  };

  checkboxTemplate!: TemplateRef<any>;
  @ViewChild('isOff') isOff!: TemplateRef<any>;
  @ViewChild('isHolidayCal') isHolidayCal!: TemplateRef<any>;
  @ViewChild('isInsArising') isInsArising!: TemplateRef<any>;
  @ViewChild('isPortal') isPortal!: TemplateRef<any>;
  @ViewChild('isRegister') isRegister!: TemplateRef<any>;
  @ViewChild('isHaveSal') isHaveSal!: TemplateRef<any>;
  @ViewChild('sticker') sticker!: TemplateRef<any>;


  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_STATUS,
      field: 'isActiveStr',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_WORKING_HOUR,
      field: 'workingHour',
      type: 'number',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_IS_OFF,
      field: 'isOff',
      type: 'bool',
      align: 'center',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,
      hideSearchBox: true,
      readonly: true,
      width: 150,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_IS_HOLIDAY_CAL,
      field: 'isHolidayCal',
      type: 'bool',
      align: 'left',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,
      readonly: true,
      hideSearchBox: true,
      width: 150,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_IS_INS_ARISING,
      field: 'isInsArising',
      type: 'bool',
      align: 'left',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,
      readonly: true,
      hideSearchBox: true,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_IS_PORTAL,
      field: 'isPortal',
      type: 'bool',
      align: 'left',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,
      readonly: true,
      hideSearchBox: true,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_IS_REGISTER,
      field: 'isRegister',
      type: 'bool',
      align: 'left',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,
      readonly: true,
      hideSearchBox: true,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_IS_HAVE_SAL,
      field: 'isHaveSal',
      type: 'bool',
      align: 'left',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,
      readonly: true,
      hideSearchBox: true,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_STATUS,
      field: 'isActiveStr',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(
    public mls: MultiLanguageService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.corePageListInstanceNumber = new Date().getTime();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.columns.filter((c) => c.field === 'isOff')[0].templateRef =
        this.isOff;
      this.columns.filter((c) => c.field === 'isHolidayCal')[0].templateRef =
        this.isHolidayCal;
      this.columns.filter((c) => c.field === 'isInsArising')[0].templateRef =
        this.isInsArising;
      this.columns.filter((c) => c.field === 'isPortal')[0].templateRef =
        this.isPortal;
      this.columns.filter((c) => c.field === 'isRegister')[0].templateRef =
        this.isRegister;
      this.columns.filter((c) => c.field === 'isHaveSal')[0].templateRef =
        this.isHaveSal;
      const stickerFilter = this.columns.filter(c => c.field === 'isActiveStr');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  // onRowDoubleClick(e: any) {
  //   console.log(e);
  //   if (!e.isActive) {
  //     this.alertService.error(
  //       this.mls.trans(
  //         EnumTranslateKey.UI_NOTIFICATION_CAN_NOT_EDIT_RECORD_NOT_APPROVE
  //       ),
  //       alertOptions
  //     );
  //   } else {
  //     this.router.navigate(
  //       [
  //         {
  //           outlets: {
  //             corePageListAux: [
  //               btoa(e.id),
  //               { listInstance: this.corePageListInstanceNumber },
  //             ],
  //           },
  //         },
  //       ],
  //       { relativeTo: this.route }
  //     );
  //   }
  // }

  // onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
  //   switch (e.code) {
  //     case EnumCoreButtonVNSCode.HEADER_CREATE:
  //       this.router.navigate(
  //         [
  //           {
  //             outlets: {
  //               corePageListAux: [
  //                 btoa('0'),
  //                 { listInstance: this.corePageListInstanceNumber },
  //               ],
  //             },
  //           },
  //         ],
  //         { relativeTo: this.route }
  //       );
  //       break;
  //     default:
  //       break;
  //   }
  // }
}
