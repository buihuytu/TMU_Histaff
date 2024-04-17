import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting, AppService, CorePageListService, ICoreButtonVNS, EnumCoreButtonVNSCode, IFormatedResponse } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-hu-nation',
  templateUrl: './hu-nation.component.html',
  styleUrls: ['./hu-nation.component.scss']
})
export class HuNationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_NATION;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_NATION_QUERY_LIST,
  }

  avatarTemplate!: TemplateRef<any>;

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_NATION_DELETE_IDS,
    toggleActiveIds: api.HU_NATION_TOGGLE_ACTIVE_IDS
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
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_NATION_IS_ACTIVE,
      field: 'isActiveStr',
      type: 'string',
      align: 'center',
      width: 130
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_NATION_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_NATION_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_NATION_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 500
    },
   
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    private appService: AppService,
    public corePageListService: CorePageListService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'isActiveStr');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }

  ngOnDestroy(): void {
  }


  // khai báo thuộc tính "selectedIds"
  // để lưu mảng các id
  public selectedIds!: number[];


  // khai báo phương thức
  public onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    // in ra console log cái đối tượng "e"
    console.log("StaffProfileComponent onCorePageHeaderButtonClick", e);

    debugger;

    switch (e.code) {
      // khi bấm áp dụng
      case EnumCoreButtonVNSCode.HEADER_ACTIVATE:
        // viết code xử lý
        // khi bấm button áp dụng

        console.log("bạn đã bấm áp dụng");
        console.log("mảng selectedIds sau khi lấy được:\n", this.selectedIds);

        debugger;

        // post cái mảng id lên server
        this.appService.post(api.HU_NATION_SUBMIT_ACTIVE, this.selectedIds).subscribe(x => {

          // chỗ này là copy code
          if (x.ok && x.status === 200) {
            // khai báo biến "body"
            const body: IFormatedResponse = x.body

            if (body.statusCode === 200) {
              // sử dụng reloadFlag$
              // để cập nhật lưới ở ngoài giao diện

              // kiểu bản đầu có 4 bản ghi
              // sau khi phê duyệt 1 bản ghi
              // thì cập nhật lại cái lưới
              // để hiển thị ra 3 bản ghi

              this.corePageListService.instances[0].reloadFlag$.next(!this.corePageListService.instances[0].reloadFlag$.value)


              // sau khi post lên server thành công
              // thì xóa hết dữ liệu trong mảng chứa "id" đi
              this.selectedIds = [];
            }
            else {
              // ...
            }
          }
          else {
            // ...
          }

        });

        break;


      // khi bấm ngừng áp dụng
      case EnumCoreButtonVNSCode.HEADER_INACTIVATE:
        // viết code xử lý
        // khi bấm button ngừng áp dụng

        console.log("bạn đã bấm ngừng áp dụng");
        console.log("mảng selectedIds sau khi lấy được:\n", this.selectedIds);

        debugger;

        // post cái mảng id lên server
        this.appService.post(api.HU_NATION_SUBMIT_STOP_ACTIVE, this.selectedIds).subscribe(x => {

          // chỗ này là copy code
          if (x.ok && x.status === 200) {
            // khai báo biến "body"
            const body: IFormatedResponse = x.body

            if (body.statusCode === 200) {
              // sử dụng reloadFlag$
              // để cập nhật lưới ở ngoài giao diện

              // kiểu bản đầu có 4 bản ghi
              // sau khi phê duyệt 1 bản ghi
              // thì cập nhật lại cái lưới
              // để hiển thị ra 3 bản ghi

              this.corePageListService.instances[0].reloadFlag$.next(!this.corePageListService.instances[0].reloadFlag$.value)


              // sau khi post lên server thành công
              // thì xóa hết dữ liệu trong mảng chứa "id" đi
              this.selectedIds = [];
            }
            else {
              // ...
            }
          }
          else {
            // ...
          }

        });

        break;


      default:
        break;
    }
  }


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
