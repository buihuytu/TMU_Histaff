import { CommonModule } from "@angular/common";
import { Component, AfterViewInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, CoreAccordionComponent, CoreCompositionComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageListComponent, EnumCoreTablePipeType, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, IInOperator, MultiLanguageService } from "ngx-histaff-alpha";

@Component({
  selector: 'app-org-hoang',
  standalone: true,
  imports: [
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreOrgTreeComponent,
    CoreAccordionComponent,
    CoreCompositionComponent,
    FormsModule
  ],
  templateUrl: './org-hoang.component.html',
  styleUrl: './org-hoang.component.scss'
})

export class OrgHoangComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_ORG_HOANG;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_ORGANIZATION_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_ORGANIZATION_DELETE_IDS,
    toggleActiveIds: api.HU_ORGANIZATION_TOGGLE_ACTIVE_IDS2
  };

  orgIds!: number[];

  // outerInOperators: IInOperator[] = [
  //   {
  //     field: 'orgId',
  //     values: this.orgIds || []
  //   }
  // ];

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_STATUS,
      field: 'statusString',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_CODE_ORG,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_ORG_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_PARENT_ID,
      field: 'parentName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'id',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1,
    }
  ];

  constructor(
    public override mls: MultiLanguageService
  ) {
    super(mls);
  }

  ngAfterViewInit(): void {

  }

  // onOrgIdsChange(orgIds: number[]) {
  //   this.orgIds = orgIds;
  //   this.outerInOperators = [
  //     {
  //       field: 'orgId',
  //       values: orgIds,
  //     },
  //   ];
  // }
}