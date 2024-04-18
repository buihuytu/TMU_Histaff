import { Component, AfterViewInit } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, EnumCoreTablePipeType, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, MultiLanguageService,} from "ngx-histaff-alpha";


@Component({
  selector: 'app-tr-lecture',
  templateUrl: './tr-lecture.component.html',
  styleUrl: './tr-lecture.component.scss'
})

export class TrLectureComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_TR_LECTURE

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_LECTURE_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.TR_LECTURE_DELETE_IDS,
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_TEACHER_CODE,
      field: 'teacherCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_TEACHER_NAME,
      field: 'teacherName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_TRAINING_CENTER,
      field: 'trCenterName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PHONE_NUMBER,
      field: 'phoneNumber',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_EMAIL,
      field: 'email',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_ADDRESS_CONTACT,
      field: 'addressContact',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_SUPPLIER_CODE,
      field: 'supplierCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_SUPPLIER_NAME,
      field: 'supplierName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_WEBSITE,
      field: 'website',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_TYPE_OF_SERVICES_PROVIDED,
      field: 'typeOfService',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TYPE_IS_ACTIVE,
      field: 'isApply',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_ACTIVE_INACTIVE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'id',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1,
    }
  ]

  constructor(
    public override mls: MultiLanguageService
  ) {
    super(mls);
  }

  ngAfterViewInit(): void {

  }
}