import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, distinctUntilChanged, map } from 'rxjs';
import { SeDocumentInfoService } from '../../se-document-info.service';
import { SeDocumentInfoEditService } from '../se-document-edit-info.services';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup } from '@angular/forms';
import { BaseEditComponent, ICorePageEditCRUD, ICoreDropdownOption,ICoreFormSection, EnumFormBaseContolType, DialogService, AppService } from 'ngx-histaff-alpha';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-se-document-info-up',
  templateUrl: './se-document-info-up.component.html',
  styleUrls: ['./se-document-info-up.component.scss']
})
export class SeDocumentInfoUpComponent extends BaseEditComponent implements AfterViewInit {

  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = "SE_DOCUMENT_INFO";
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  subsctiptions: Subscription[] = [];

  otherListGetByIdObject$ = new BehaviorSubject<any>(null);
  otherListOption$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  otherListGetByApi = api.SYS_OTHERLIST_READ;
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
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'empId',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'documentId',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'isPermissveUpload',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'bool'
            },

          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_INFO_SUBMIT_DATE,
              field: 'subDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_INFO_FILE,
              field: 'attachedFileBuffer',
              value: "",
              controlType: EnumFormBaseContolType.ATTACHMENT,
              assignTo: 'attachedFile',
              type: 'object',
              valueToShow : '',
              //disabled: true
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ],
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_INFO_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'string',
              readonly: false,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_INFO_FILE,
              field: 'attachedFile',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              hidden: true
            },
          ],
        ]
      }
    ];
  empId: number;
  documentId!: number;
  isPermissveUpload!: boolean;

  constructor(
    public override dialogService: DialogService,
    private appService: AppService,
    private seDocumentInfoService: SeDocumentInfoService,
    private seDocumentInfoEditService: SeDocumentInfoEditService,
    private route: ActivatedRoute
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SE_DOCUMENT_EDIT;

    this.crud = {
      c: api.SE_DOCUMENT_INFO_CREATE,
      r: api.SE_DOCUMENT_INFO_READ,
      u: api.SE_DOCUMENT_INFO_UPDATE,
      d: api.SE_DOCUMENT_INFO_DELETE_IDS,
    };
    this.empId = this.seDocumentInfoEditService.empId;
    this.documentId = this.seDocumentInfoService.documentId;
    this.isPermissveUpload = this.seDocumentInfoEditService.isPermissveUpload;
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subsctiptions.push(
        this.appService.get(`${api.SE_DOCUMENT_INFO_GETBYID}?id=${Number(atob(this.route.snapshot.params['id']))}&empId=${this.empId}`).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body = x.body.innerBody;
            this.form.patchValue(body);
            this.sections.map((section) => {
              section.rows.map((row) => {
                row.map((control) => {
                  if (control.controlType === EnumFormBaseContolType.ATTACHMENT) {
                    control.valueToShow = this.form.get('attachedFile')?.value
                  }
                });
              });
            });
          }
        })
      )
    })
  }

  ngOnInit(): void {
    this.loading = true;
  }
  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.form.get('attachedFileBuffer')?.patchValue(this.form.get('attachedFile')?.value);
    this.form.get('isPermissveUpload')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
    if (!!!x) {
        this.form.get('attachedFileBuffer')?.disable()
        this.form.get('attachedFileBuffer')?.clearValidators();
        this.form.get('attachedFileBuffer')?.updateValueAndValidity();
      }
    })

    this.form.get('attachedFile')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x=>{
      if(x != null){
        this.form.get('attachedFileBuffer')?.clearValidators();
        this.form.get('attachedFileBuffer')?.updateValueAndValidity();
      }
    })

  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}

