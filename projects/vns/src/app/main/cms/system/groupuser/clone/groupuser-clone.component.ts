import { Component, OnInit, isDevMode } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AlertService, noneAutoClosedAlertOptions } from 'ngx-histaff-alpha';


@Component({
  selector: 'app-groupuser-clone',
  templateUrl: './groupuser-clone.component.html',
  styleUrls: ['./groupuser-clone.component.scss']
})
export class GroupuserCloneComponent extends BaseEditComponent {

  /* Properties to be passed into core-page-edit */

  override entityTable = "SYS_GROUP";

  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_USER_CLONE_FROM,
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_USER_CLONE_SOURCE,
              field: 'cloneFrom',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
              tooltip: EnumTranslateKey.UI_TOOLTIP_CLONE_A_GROUP_WILL_COPY_ITS_PERMISSIONS_AT_THE_TIME
            },
          ],
        ],
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_USER_NEW_GROUP,
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_USER_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_USER_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_USER_NAME,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_GROUP_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
              textareaRows: 5
            },
          ],
        ]
      }
    ];

  cloneSource: any;

  constructor(
    public override dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_GROUP_USER_CLONE;

    this.crud = {
      c: api.SYS_GROUP_CLONE, // sao chép thay vì thêm mới
      r: api.SYS_GROUP_READ,
      u: api.SYS_GROUP_UPDATE,
      d: api.SYS_GROUP_DELETE,
    };

    let navigation = this.router?.getCurrentNavigation()
    if (navigation) {
      const extras = navigation.extras;
      if (!!extras && 'state' in extras) {
        if (!!extras.state && 'selectedData' in extras.state!) {
          this.cloneSource = extras.state['selectedData'][0];
        }
      } else {
        if (isDevMode()) {
          this.alertService.info("selectedData not found in extras.state", noneAutoClosedAlertOptions);
        }
      }
    }

  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.form.get('cloneFrom')?.patchValue(this.cloneSource.name);
    this.formInitStringValue = JSON.stringify(this.form.getRawValue())
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
