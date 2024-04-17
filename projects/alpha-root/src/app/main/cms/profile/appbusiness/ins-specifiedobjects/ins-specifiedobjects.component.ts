import { Component, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, AlertService, ICoreButtonVNS, EnumCoreButtonVNSCode, alertOptions } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-ins-specifiedobjects',
  templateUrl: './ins-specifiedobjects.component.html',
  styleUrls: ['./ins-specifiedobjects.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecifiedObjectsComponent extends BaseComponent {
  /* START: Local filter params */
  orgId!: number;
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]
  outerParam$ = new BehaviorSubject<any>(null);
  headerFirstRowHeight: number = 50;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_INS_SPECIFIED_OBJECTS;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.INS_SPECIFIED_OBJECTS_QUERY_LIST,
  };

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.INS_SPECIFIED_OBJECTS_DELETE_IDS,
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_EFFECTIVE_DATE,
      field: 'effectiveDateString',
      type: 'string',
      hidden: true,
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_EFFECTIVE_DATE,
      field: 'effectiveDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'right',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_CHANGE_DAY,
      field: 'changeDay',
      type: 'string',
      align: 'center',
      width: 170,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_SI_HI,
      field: 'siHi',
      type: 'number',
      align: 'right',
      width: 150,
      pipe: EnumCoreTablePipeType.NUMBER,
    },
    // {
    //   caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_UI,
    //   field: 'ui',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    //   pipe: EnumCoreTablePipeType.NUMBER,
    // },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_SI_COM,
      field: 'siCom',
      type: 'string',
      align: 'center',
      width: 95,
      pipe: EnumCoreTablePipeType.DECIMAL_TO_FIX_3,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_HI_COM,
      field: 'hiCom',
      type: 'string',
      align: 'center',
      width: 95,
      pipe: EnumCoreTablePipeType.DECIMAL_TO_FIX_3,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_UI_COM,
      field: 'uiCom',
      type: 'string',
      align: 'center',
      width: 95,
      pipe: EnumCoreTablePipeType.DECIMAL_TO_FIX_3,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_AI_OAI_EMP,
      field: 'aiOaiEmp',
      type: 'string',
      align: 'center',
      width: 115,
      pipe: EnumCoreTablePipeType.DECIMAL_TO_FIX_3,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_UI_EMP,
      field: 'uiEmp',
      type: 'string',
      align: 'center',
      width: 95,
      pipe: EnumCoreTablePipeType.DECIMAL_TO_FIX_3,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_HI_EMP,
      field: 'hiEmp',
      type: 'string',
      align: 'center',
      width: 95,
      pipe: EnumCoreTablePipeType.DECIMAL_TO_FIX_3,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_SI_EMP,
      field: 'siEmp',
      type: 'string',
      align: 'center',
      width: 95,
      pipe: EnumCoreTablePipeType.DECIMAL_TO_FIX_3,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_AI_OAI_COM,
      field: 'aiOaiCom',
      type: 'string',
      align: 'center',
      width: 115,
      pipe: EnumCoreTablePipeType.DECIMAL_TO_FIX_3,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_RETIRE_MALE,
      field: 'retireMale',
      type: 'string',
      align: 'center',
      width: 85,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_RETIRE_FEMALE,
      field: 'retireFemale',
      type: 'string',
      align: 'center',
      width: 85,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_UPDATED_BY,
      field: 'updatedByUsername',
      type: 'string',
      align: 'center',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_UPDATED_DATE,
      field: 'updatedDate',
      type: 'string',
      align: 'right',
      width: 110,
      pipe: EnumCoreTablePipeType.DATE,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  selectedData: any;
  corePageListInstanceNumber!: number;
  /* End Properties being passed to core-page-type-a */

  constructor(public override mls: MultiLanguageService,
              private alertService : AlertService,
              private router : Router,
              private route: ActivatedRoute,
    ) {
    super(mls);
    this.corePageListInstanceNumber = new Date().getTime();
  }



  onOrgIdChange(orgId: number) {
    if (!!this.outerParam$.value) {
      const newOuterParam = JSON.parse(JSON.stringify(this.outerParam$.value));
      newOuterParam['orgId'] = orgId;
      this.outerParam$.next(newOuterParam);
    } else {
      this.outerParam$.next({ orgId });
    }
  }
  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    //console.log("StaffProfileComponent onCorePageHeaderButtonClick", e)
    switch (e.code) {
        case EnumCoreButtonVNSCode.HEADER_COPY:
          if(this.selectedData.length > 1){
            this.alertService.error(`${this.mls.trans(EnumTranslateKey.NOT_SELECTED_MORE_THAN_ONE_ROW_FOR_BUTTON_COPY_DATA)}`, alertOptions)
            return;
          }
        this.router.navigate(
          [btoa('0'), { listInstance: this.corePageListInstanceNumber }],
          {
            relativeTo: this.route, state: { selectedData: this.selectedData }
          }
        );
        break;
      default:
        break;
    }
  }


  onSelectedDataChange(e: any[]) {
    this.selectedData = e;
    console.log(this.selectedData)
  }
}
