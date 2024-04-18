import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting } from "ngx-histaff-alpha";

@Component({
  selector: "cms-app-salarylevel",
  templateUrl: "./salarylevel.component.html",
  styleUrls: ["./salarylevel.component.scss"],
})
export class SalaryLevelComponent implements OnInit, AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_LEVEL;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_SALARY_LEVEL_QUERY_LIST,
  }

  avatarTemplate!: TemplateRef<any>;
  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_SALARY_LEVEL_DELETE_IDS,
    toggleActiveIds: api.HU_SALARY_LEVEL_TOGGLE_ACTIVE_IDS
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_SCALE_NAME,
      field: 'salaryScaleName',
      type: 'string',
      align: 'left',
      width: 250
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_RANK,
      field: 'salaryRankName',
      type: 'string',
      align: 'left',
      width: 500
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_NAME,//ten vung
      field: 'regionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_COEFFICIENT,
      field: 'coefficient',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_HOLDING_MONTH,
      field: 'holdingMonth',
      type: 'date',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_LEVEL_EFFECTIVE_DATE,
      field: 'effectiveDate',
      type: 'string',
      align: 'left',
      pipe: EnumCoreTablePipeType.DATE,
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_LEVEL_EXPIRATION_DATE,
      field: 'expirationDate',
      type: 'string',
      align: 'left',
      pipe: EnumCoreTablePipeType.DATE,
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_TOTAL_SALARY,
      field: 'totalSalary',
      type: 'number',
      align: 'left',
      width: 250,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_LEVEL_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250
    },
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor() {}
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    setTimeout(() =>{
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }

  ngOnDestroy(): void {
  }

}
