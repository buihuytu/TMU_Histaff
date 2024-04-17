import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy, ViewChild, TemplateRef } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting } from "ngx-histaff-alpha";

@Component({
  selector: "cms-app-salaryrank",
  templateUrl: "./salaryrank.component.html",
  styleUrls: ["./salaryrank.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SalaryRankComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_RANK;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_SALARY_RANK_QUERY_LIST,
  }

  avatarTemplate!: TemplateRef<any>;

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_SALARY_RANK_DELETE_IDS,
    toggleActiveIds: api.HU_SALARY_RANK_TOGGLE_ACTIVE_IDS,
  }

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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_RANK_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_RANK_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_RANK_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_RANK_SCALE_NAME,
      field: 'salaryScaleName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_EFFECTIVE_DATE,
      field: 'effectiveDate',
      type: 'string',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_RANK_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 500,
    },
   
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }

  ngOnDestroy(): void {
  }

}
