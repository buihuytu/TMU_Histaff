import { AfterViewChecked, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService, BaseEditComponent, DialogService, EnumCoreTablePipeType, EnumFormBaseContolType, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD, ICorePageListApiDefinition, ICorePageListEditRouting, ICoreTableColumnItem, UrlService } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { SeDocumentInfoEditService } from './se-document-edit-info.services';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-se-document-edit-info',
  templateUrl: './se-document-edit-info.component.html',
  styleUrls: ['./se-document-edit-info.component.scss']
})
export class SeDocumentInfoEditComponent extends BaseEditComponent implements AfterViewChecked {

  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = "SE_DOCUMENT_INFO";
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  subsctiptions: Subscription[] = [];
  @ViewChild('isObligatory') isObligatory!: TemplateRef<any>;
  @ViewChild('isPermissveUpload') isPermissveUpload!: TemplateRef<any>;
  @ViewChild('isSubmit') isSubmit!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;
  otherListGetByIdObject$ = new BehaviorSubject<any>(null);
  otherListOption$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  otherListGetByApi = api.SYS_OTHERLIST_READ;
  headerFirstRowHeight:number=50;
  apiDefinition: ICorePageListApiDefinition = {
    // queryListRelativePath: api.SE_DOCUMENT_INFO_QUERY_LIST_DOCUMENT,
    queryListRelativePath: api.SE_DOCUMENT_INFO_QUERY_LIST,
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 150,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_NAME,
      field: 'documentName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_DOCUMENT_TYPE,
      field: 'documentType',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_IS_PERMISSVE_UPLOAD,
      field: 'isPermissveUpload',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      hideSearchBox: true,
      width: 95,
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
      width: 95,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_INFO_SUBMIT_DATE,
      field: 'subDate',
      type: 'date',
      align: 'left',
      width: 250,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_INFO_IS_SUBMIT,
      field: 'isSubmit',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      hideSearchBox: true,
      width: 130,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_INFO_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_INFO_FILE,
      field: 'attachedFile',
      type: 'string',
      align: 'left',
      width: 300,
    },
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_EMPLOYEE_CODE,
              field: 'codeEmp',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_FULLNAME,
              field: 'nameEmp',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              disabled: true
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_ORG_NAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_POSITION_NAME,
              field: 'posName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              disabled: true
            },
          ],
        ]
      }
    ];

  outerParam$ = new BehaviorSubject<any>(null);
  
  constructor(
    public override dialogService: DialogService,
    private slrService: SeDocumentInfoEditService,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private urlService: UrlService,
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SE_DOCUMENT_EDIT;

    this.crud = {
      c: api.SE_DOCUMENT_INFO_CREATE,
      r: api.SE_DOCUMENT_INFO_GET_BY_EMP,
      u: api.SE_DOCUMENT_INFO_UPDATE,
      d: api.SE_DOCUMENT_INFO_DELETE_IDS,
    };
    this.outerParam$.next({
      empId: Number(atob(this.route.snapshot.params['id']))
    })
    this.slrService.empId = Number(atob(this.route.snapshot.params['id']));
  }

  ngOnInit(): void {
    this.loading = true;
    
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

    ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'isObligatory')[0].templateRef =
      this.isObligatory;
    this.columns.filter((c) => c.field === 'isPermissveUpload')[0].templateRef =
      this.isPermissveUpload;
    this.columns.filter((c) => c.field === 'isSubmit')[0].templateRef =
      this.isSubmit;

      
  }
  ngAfterViewChecked(){
    if(!this.router.url.includes('corePageListAux')){
      this.urlService.previousRouteUrl$.next('/cms/system/se-document-info')
    }
  }

}
