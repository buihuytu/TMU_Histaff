import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy, ViewChild, TemplateRef } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting } from "ngx-histaff-alpha";


@Component({
  selector: 'cms-app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HolidayComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_HOLIDAY;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_HOLIDAY_QUERY_LIST,
  };

  avatarTemplate!: TemplateRef<any>;

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.AT_HOLIDAY_DELETE_IDS,
    toggleActiveIds: api.AT_HOLIDAY_TOGGLE_ACTIVE_IDS,
  };

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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_HOLIDAY_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'isActive',
      hidden: true,
      type: 'boolean',
      align: 'left',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_HOLIDAY_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_HOLIDAY_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_HOLIDAY_START_DAYOFF,
      field: 'startDayoff',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_HOLIDAY_END_DAYOFF,
      field: 'endDayoff',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_HOLIDAY_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 500,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.columns.filter((c) => c.field === 'status')[0].templateRef = this.sticker

    })
  }

  ngOnDestroy(): void { }


  // khai báo thuộc tính "selectedIds"
  // để lưu mảng các id
  public selectedIds!: number[];


  // khai báo phương thức onSelectedIdsChange()
  // để lấy mảng ở ngoài giao diện
  // chính là đối tượng "e"
  // lấy được rồi thì gán vào mảng "selectedIds"
  public onSelectedIdsChange(e: any) {
    // in ra console log cái "e"
    console.log("in ra đối tượng \"e\" khi bấm vào checkbox\n:", e);

    this.selectedIds = e;
  }
}
