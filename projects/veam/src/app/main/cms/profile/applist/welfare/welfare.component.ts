import { Component, ViewEncapsulation, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, DialogService, ISortItem, EnumSortDirection } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "cms-app-welfare",
  templateUrl: "./welfare.component.html",
  styleUrls: ["./welfare.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class WelfareComponent extends BaseComponent implements AfterViewInit {

  @ViewChild('isAutoActive') isAutoActive!: TemplateRef<any>;
  @ViewChild('isCalTax') isCalTax!: TemplateRef<any>;
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /* Properties to be passed into core-page-edit */
  checkboxTemplate!: TemplateRef<any>;
  title = EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE;
  /* START: Local filter params */
  orgId!: number;
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]
  headerFirstRowHeight: number = 50;
  outerParam$ = new BehaviorSubject<any>(null);

  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]

  deleteValidateFailedMessage: EnumTranslateKey = EnumTranslateKey.UI_POPUP_INFO_CANNOT_DELETE_ACTIVE_ITEMS

  deleteValidateFn = (selectedData: any[]) => {
    const filter = selectedData.filter(x => !!x.isActive);
    if (filter.length) {

      this.dialogService.body$.next(this.deleteValidateFailedMessage);
      this.dialogService.showCancelOnly$.next(true);
      this.dialogService.busy = true;
      this.dialogService.showConfirmDialog$.next(true);

      return false;
    }
    return true;
  }

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_WELFARE_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_WELFARE_DELETE_IDS,
    toggleActiveIds: api.HU_WELFARE_CHANGESTATUS
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: 'Welfare.ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: 'Welfare.isActive',
      field: 'active',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_ACTIVE_INACTIVE,
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE,
      field: 'jobOrderNum',
      type: 'string',
      align: 'center',
      hidden: true,
      width: 0,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_DATESTART,
      field: 'dateStart',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.DATE,
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_DATEEND,
      field: 'dateEnd',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.DATE,
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_IS_AUTO_ACTIVE,
      field: 'isAutoActive',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      width: 120,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_IS_CAL_TAX,
      field: 'isCalTax',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      width: 100,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_PAYMENT_DATE,
      field: 'paymentDate',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.DATE,
      width: 125,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_MONNEY,
      field: 'monney',
      type: 'string',
      align: 'right',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_PERCENT,
      field: 'percentage',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_GENDER,
      field: 'genderId',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_AGE_FROM,
      field: 'ageFrom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_AGE_TO,
      field: 'ageTo',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_SENIORITY_BELLOW,
      field: 'seniority',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_SENIORITY_ABOVE,
      field: 'seniorityAbove',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_WORK_LEAVE_NOPAY_FROM,
      field: 'workLeaveNopayFrom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 135,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_WORK_LEAVE_NOPAY_TO,
      field: 'workLeaveNopayTo',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 135,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_MONTHS_PEND_FROM,
      field: 'monthsPendFrom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 170,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_MONTHS_PEND_TO,
      field: 'monthsPendTo',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 170,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_MONTHS_WORK_IN_YEAR,
      field: 'monthsWorkInYear',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 120,
    },
    
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private dialogService: DialogService
  ) {
    super(mls);
  }

  ngAfterViewInit(): void {
    this.columns.filter(c => c.field === 'isAutoActive')[0].templateRef = this.isAutoActive;
    this.columns.filter(c => c.field === 'isCalTax')[0].templateRef = this.isCalTax;
    const stickerFilter = this.columns.filter(c => c.field === 'active');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }
}