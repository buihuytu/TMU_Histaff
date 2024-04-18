import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting } from "ngx-histaff-alpha";

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit, AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_BANK;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_BANK_QUERY_LIST,
  }

  avatarTemplate!: TemplateRef<any>;
  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_BANK_DELETE_IDS,
    toggleActiveIds: api.HU_BANK_TOGGLE_ACTIVE_IDS,
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_IS_ACTIVE,
      field:  'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 350,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_SHORT_NAME,
      field: 'shortName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250,
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
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }
}
