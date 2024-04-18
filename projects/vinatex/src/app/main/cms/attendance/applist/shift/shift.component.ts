import { Component, ViewEncapsulation, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, IAlertOptions, ICorePageListEditRouting, MultiLanguageService, AlertService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";



@Component({
  selector: 'cms-app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShiftComponent extends BaseComponent implements AfterViewInit {

  title = EnumTranslateKey.UI_COMPONENT_TITLE_SHIFT;

  @ViewChild('isBoquacc') isBoquacc!: TemplateRef<any>;
  @ViewChild('isNight') isNight!: TemplateRef<any>;
  @ViewChild('isSunday') isSunday!: TemplateRef<any>;
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;
  stichkerTemplate!: TemplateRef<any>;

  corePageListInstanceNumber!: number;
  outerParam$ = new BehaviorSubject<any>(null);

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_SHIFT_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.AT_SHIFT_DELETE_IDS,
    toggleActiveIds: api.AT_SHIFT_TOGGLE_ACTIVE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: 'Shift.ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_IS_ACTIVE,
      field: 'isActiveStr',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_TIME_TYPE_ID,
      field: 'timeTypeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_HOURS_START,
      field: 'hoursStart',
      type: 'string',
      align: 'left',
      pipe: EnumCoreTablePipeType.TIME_HHMM,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_HOURS_STOP,
      field: 'hoursStop',
      type: 'string',
      align: 'left',
      pipe: EnumCoreTablePipeType.TIME_HHMM,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_BREAKS_FROM,
      field: 'breaksFrom',
      type: 'string',
      align: 'left',
      pipe: EnumCoreTablePipeType.TIME_HHMM,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_BREAKS_TO,
      field: 'breaksTo',
      type: 'string',
      align: 'left',
      pipe: EnumCoreTablePipeType.TIME_HHMM,
      width: 150,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_TIME_LATE,
      field: 'timeLate',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_TIME_EARLY,
      field: 'timeEarly',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_IS_BREAK,
      field: 'isBoquacc',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      hideSearchBox: true,
      width: 150,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_IS_SUNDAY,
      field: 'isSunday',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      hideSearchBox: true,
      width: 150,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_IS_NIGHT,
      field: 'isNight',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      hideSearchBox: true,
      width: 150,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_MIN_HOUR,
      field: 'minHoursWork',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_REMARK,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_IS_ACTIVE,
    //   field: 'isActive',
    //   type: 'string',
    //   align: 'left',
    //   pipe: EnumCoreTablePipeType.BOOLEAN_TO_ACTIVE_INACTIVE,
    //   width: 150,
    // },
    
  ];
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
  };

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(mls);
    this.corePageListInstanceNumber = new Date().getTime();
  }
  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'isBoquacc')[0].templateRef =
      this.isBoquacc;
    this.columns.filter((c) => c.field === 'isSunday')[0].templateRef =
      this.isSunday;
    this.columns.filter((c) => c.field === 'isNight')[0].templateRef =
      this.isNight;
    this.columns.filter((c) => c.field === 'isActiveStr')[0].templateRef = this.sticker
  }

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
