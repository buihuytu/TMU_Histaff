import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition,ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, AppService, CorePageListService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-se-document',
  templateUrl: './se-document.component.html',
  styleUrls: ['./se-document.component.scss']
})
export class SeDocumentComponent implements OnInit {

  title = EnumTranslateKey.UI_COMPONENT_TITLE_SE_DOCUMENT;
  @ViewChild('isObligatory') isObligatory!: TemplateRef<any>;
  @ViewChild('isPermissveUpload') isPermissveUpload!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;
  headerFirstRowHeight: number = 50;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SE_DOCUMENT_QUERY_LIST,
  }


  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.SE_DOCUMENT_DELETE_IDS,
    toggleActiveIds: api.SE_DOCUMENT_TOGGLER_ACTIVE_IDS
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE,
      field: 'jobOrderNum',
      type: 'string',
      align: 'center',
      hidden: true,
      width: 0,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 130
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_DOCUMENT_TYPE,
      field: 'documentTypeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_IS_PERMISSVE_UPLOAD,
      field: 'isPermissveUpload',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      hideSearchBox: true,
      width: 130,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_IS_OBLIGATORY,
      field: 'isObligatory',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      hideSearchBox: true,
      width: 130,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_IS_ACTIVE,
      field: 'status',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 500
    }
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    private appService: AppService,
    public corePageListService: CorePageListService
  ) { }

  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'isObligatory')[0].templateRef =
      this.isObligatory;
    this.columns.filter((c) => c.field === 'isPermissveUpload')[0].templateRef =
      this.isPermissveUpload;
  }
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

}
