import { Component, OnDestroy, OnInit, } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting, AlertService, MultiLanguageService, ICoreButtonVNS, EnumCoreButtonVNSCode, alertOptions } from "ngx-histaff-alpha";


@Component({
  selector: "cms-app-groupuser",
  templateUrl: "./groupuser.component.html",
  styleUrls: ["./groupuser.component.scss"]
})
export class GroupUserComponent implements OnInit, OnDestroy {

  title = EnumTranslateKey.UI_COMPONENT_TITLE_GROUP_USER;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_GROUP_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_GROUP_DELETE_IDS
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30,
    },
    {
      caption: 'GroupUser.STT',
      field: 'id',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: 'GroupUser.CODE',
      field: 'code',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: 'GroupUser.NAME',
      field: 'name',
      type: 'string',
      align: 'left',
      width: 500,
    },
    {
      caption: 'GroupUser.STATUS',
      field: 'status',
      type: 'string',
      align: 'left',
      width: 500,
    }
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  selectedData!: any[];
  corePageListInstanceNumber!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService : AlertService,
    public mls: MultiLanguageService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onInstanceCreated(e: any) {
    this.corePageListInstanceNumber = e;
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    if (e.code === EnumCoreButtonVNSCode.HEADER_COPY) {
      if(this.selectedData.length > 1){
        this.alertService.error(`${this.mls.trans(EnumTranslateKey.NOT_SELECTED_MORE_THAN_ONE_ROW_FOR_BUTTON_COPY_DATA)}`, alertOptions)
        return;
      }
      this.router.navigate(
        [ 
          {
            outlets: {
              corePageListAux: [
                "clone",
                { listInstance: this.corePageListInstanceNumber },
              ],
            },
          },
        ],
        { relativeTo: this.route, state: { selectedData: this.selectedData } }
      );

    }
  }

  onSelectedDataChange(e: any[]) {
    this.selectedData = e;
  }
}
