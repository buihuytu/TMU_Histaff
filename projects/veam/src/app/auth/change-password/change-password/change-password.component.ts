import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';

import { 
  BaseEditComponent, 
  ICoreFormSection, 
  EnumFormBaseContolType,
  ICorePageEditCRUD,
  DialogService,
  MultiLanguageService,
  AuthService,
} from 'ngx-histaff-alpha';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends BaseEditComponent implements OnInit, OnDestroy {

  override form!: FormGroup;

  loading: boolean = false;

  subsctiptions: Subscription[] = [];

  /* Properties to be passed into core-page-edit */

  override entityTable = "TENANT_USER";

  captionCode!: EnumTranslateKey;
  //formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
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
              type: 'string',
              hidden: true // To hide id field
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_OLD_PASSWORD,
              field: 'oldPassword',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'password',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(6),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NEW_PASSWORD,
              field: 'newPassword',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'password',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(8),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NEW_PASSWORD_CONFIRM,
              field: 'confirmNewPassword',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'password',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(8),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
          ],
        ]
      }
    ];
  constructor(
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private authService: AuthService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TENANT_USER_CHANGE_PASSWORD;

    this.crud = {
      r: api.SYS_USER_READ,
      u: api.SYS_USER_CHANGE_PASSWORD,
    };

  }

  ngOnInit(): void {
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  onSubmitSuccess(e: boolean): void {
    if (e === true) {
      this.authService.stopSubscription = true;
      this.authService.data$.next({
        ...this.authService.data$.value!,
        isFirstLogin: false
      })
      this.authService.stopSubscription = false;
    }
  }

  ngOnDestroy(): void {
    this.subsctiptions.map(x => x?.unsubscribe())
  }

}