import { Component, ViewEncapsulation, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "cms-app-salaryscale",
  templateUrl: "./salaryscale.component.html",
  styleUrls: ["./salaryscale.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SalaryScaleComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('isTableScore') isTableScore!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /* START: Local filter params */
  orgId!: number;
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_SCALE

  outerParam$ = new BehaviorSubject<any>(null);
  headerFirstRowHeight: number = 50;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_SALARY_SCALE_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_SALARY_SCALE_DELETE_IDS,
    toggleActiveIds: api.HU_SALARY_SCALE_TOGGLE_ACTIVE_IDS,
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 400,
    },
    {
      // trường trạng thái
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'isActive',
      hidden: true,
      type: 'boolean',
      align: 'left',
      width: 10,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_IS_ACTIVE,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_EFFECTIVE_DATE,
      field: 'effectiveDate',
      type: 'string',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_EXPIRATION_DATE,
      field: 'expirationDate',
      type: 'string',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_IS_TABLE_SCORE,
      field: 'isTableScore',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      width: 130,
      readonly:true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
    },
   
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
  ) {
    super(mls);
  }
  ngAfterViewInit(): void {
    this.columns.filter(c => c.field === 'isTableScore')[0].templateRef = this.isTableScore;
    const stickerFilter = this.columns.filter(c => c.field === 'status');
        if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }

  onOrgIdChange(orgId: number) {
    if (!!this.outerParam$.value) {
      const newOuterParam = JSON.parse(JSON.stringify(this.outerParam$.value))
      newOuterParam['orgId'] = orgId;
      this.outerParam$.next(newOuterParam);
    } else {
      this.outerParam$.next({ orgId });
    }
  }
}
