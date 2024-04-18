import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, MultiLanguageService } from 'ngx-histaff-alpha';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-demo-attachment-edit',
  templateUrl: './demo-attachment-edit.component.html',
  styleUrls: ['./demo-attachment-edit.component.scss']
})
export class DemoAttachmentEditComponent extends BaseEditComponent implements OnInit, OnDestroy {

  loading: boolean = false;

  subsctiptions: Subscription[] = [];

  /* #region Properties to be passed into core-page-edit */

  override entityTable = "DEMO_ATTACHMENT";

  captionCode!: EnumTranslateKey;

  crud!: ICorePageEditCRUD;

  leftSectionsFlexSize: number = 3;
  leftSections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_IDS,
              field: 'orgIds',
              value: [],
              controlType: EnumFormBaseContolType.ORGTREECHECK,
              type: 'any',
            }
          ]
        ]
      }
    ]


  sections: ICoreFormSection[] =
    [
      {
        // caption: ...,
        // iconClass: ...,
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: 0,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              hidden: true // To hide id field
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_NAME,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_ATTACHMENT1,
              field: 'firstAttachmentBuffer',
              value: null,
              controlType: EnumFormBaseContolType.ATTACHMENT,
              assignTo: 'firstAttachment',
              type: 'object',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_ATTACHMENT1,
              field: 'secondAttachmentBuffer',
              value: null,
              controlType: EnumFormBaseContolType.ATTACHMENT,
              assignTo: 'secondAttachment',
              type: 'object',
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_EFFECT_DATE,
              field: 'effectDate',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
            }
          ]
        ]
      }
    ];
  constructor(
    public override dialogService: DialogService,
    private mls: MultiLanguageService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_DEMO_ATTACHMENT_EDIT;

    this.crud = {
      c: api.DEMO_ATTACHMENT_CREATE,
      r: api.DEMO_ATTACHMENT_READ,
      u: api.DEMO_ATTACHMENT_UPDATE,
      d: api.DEMO_ATTACHMENT_DELETE,
    };

  }
  /* #endregion Properties to be passed into core-page-edit */

  ngOnInit(): void {
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.form.get('effectDate')?.valueChanges.subscribe(x => {
      
      console.group("TEST DATE REFFERENCE");
      console.log("x before setDate", x)
      var newDate = x.setDate(x.getDate() + 1);
      console.log("newDate", newDate);
      console.log("x after setDate", x);
      console.groupEnd();
      
    })
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    console.log("onFormReinit", e)
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subsctiptions.map(x => x?.unsubscribe())
  }

}
