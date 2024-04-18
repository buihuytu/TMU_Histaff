import { Component, TemplateRef } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, MultiLanguageService } from "ngx-histaff-alpha";

@Component({
  selector: "cms-app-survey",
  templateUrl: "./survey.component.html",
  styleUrls: ["./survey.component.scss"],
})

export class SurveyComponent extends BaseComponent {

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_QUESTION;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_QUESTION_QUERY_LIST,
  }

  avatarTemplate!: TemplateRef<any>;

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_QUESTION_DELETE_IDS
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_QUESTION_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_QUESTION_EXPIRE,
      field: 'expire',
      type: 'date',
      align: 'center',
      width: 300,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_QUESTION_IS_MULTIPLE,
      field: 'isMultiple',
      type: 'boolean',
      align: 'center',
      width: 300,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_YES_NO
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_QUESTION_IS_ACTIVE,
      field: 'isActive',
      type: 'boolean',
      align: 'center',
      width: 300,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_YES_NO
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_DATE,
      field: 'createdDate',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE_TIME
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_BY,
      field: 'createdByUsername',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_UPDATED_DATE,
      field: 'updatedDate',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE_TIME
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_UPDATED_BY,
      field: 'updatedByUsername',
      type: 'string',
      align: 'left',
      width: 150,
    },
  ]

  /* End Properties being passed to core-page-type-a */

  constructor(public override mls: MultiLanguageService) { super(mls) }

}
