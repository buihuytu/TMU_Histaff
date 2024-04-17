import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { BaseEditComponent, ICorePageEditCRUD, ICoreDropdownOption,ICoreFormSection, EnumFormBaseContolType, DialogService, AppService } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { SeDocumentEditService } from './se-document-edit.services';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-se-document-edit',
  templateUrl: './se-document-edit.component.html',
  styleUrls: ['./se-document-edit.component.scss']
})
export class SeDocumentEditComponent extends BaseEditComponent {

  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = "SE_DOCUMENT";
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
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_NAME,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              readonly: false,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_DOCUMENT_TYPE,
              field: 'documentType',
              value: '',
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.otherListGetByIdObject$,
              dropdownOptions$: this.otherListOption$,
              getByIdApi: this.otherListGetByApi,
              type: 'number',
              readonly: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_IS_OBLIGATORY,
              field: 'isObligatory',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'bolean',
              readonly: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_IS_PERMISSVE_UPLOAD,
              field: 'isPermissveUpload',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'bolean',
              readonly: true
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_DOCUMENT_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
            },
          ]
        ]
      }
    ];

  constructor(
    public override dialogService: DialogService,
    private slrService: SeDocumentEditService,
    private appService: AppService,
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SE_DOCUMENT_EDIT;

    this.crud = {
      c: api.SE_DOCUMENT_CREATE,
      r: api.SE_DOCUMENT_READ,
      u: api.SE_DOCUMENT_UPDATE,
      d: api.SE_DOCUMENT_DELETE_IDS,
    };

  }

  ngOnInit(): void {
    this.loading = true;
    this.slrService.getDucumentType()
      .pipe(
        map((x: any) => {
          if (x.ok && x.status === 200) {
            const options: { value: number; text: string; }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            return options;
          } else {
            return [];
          }
        })
      )
      .subscribe(response => {
        this.otherListOption$.next(response);
        this.loading = false;
      })
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.slrService.getCode()
        .pipe(
          map((f: any) => {
            let options: string = "";
            options = f.body.innerBody.code;
            return options;
          })
        )
        .subscribe((response: any) => {
          console.log(this.form.get('code'));
          if (this.form.get('code')?.value == "")
            this.form.get('code')?.patchValue(response);
        })
    );
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
