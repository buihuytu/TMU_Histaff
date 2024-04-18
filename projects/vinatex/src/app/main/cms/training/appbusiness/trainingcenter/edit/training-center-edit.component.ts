import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, AbstractControl } from '@angular/forms';
import { BaseEditComponent, DialogService, EnumFormBaseContolType, ICoreFormSection, ICorePageEditCRUD } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { TrainingCenterEditService } from './training-center.edit.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';


@Component({
  selector: 'app-training-center-edit',
  templateUrl: './training-center-edit.component.html',
  styleUrls: ['./training-center-edit.component.scss'],
})
export class TrainingCenterEditComponent extends BaseEditComponent {
  loading: boolean = false;
  override entityTable = 'TR_CENTER';

  defPhone: string = '';
  defPhoneContactPerson: string = '';

  captionCode!: EnumTranslateKey;
  subscriptions: Subscription[] = [];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_ID,
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            field: 'id',
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_CODE,
            field: 'codeCenter',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            type: 'text',
            hidden: true,
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_NAME,
            field: 'nameCenter',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
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
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_TRAINING_FILED,
            field: 'trainingField',
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
              },
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_ADDRESS,
            field: 'address',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_PHONE,
            field: 'phone',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
        ],
        [
          // {
          //   flexSize: 6,
          //   label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_REPRESENTATIVE,
          //   field: 'representative',
          //   value: '',
          //   controlType: EnumFormBaseContolType.TEXTBOX,
          //   type: 'text',
          // },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_CONTACT_PERSON,
            field: 'contactPerson',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_WEBSITE,
            field: 'website',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
        [
          // {
          //   flexSize: 6,
          //   label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_PHONE_CONTACT_PERSON,
          //   field: 'phoneContactPerson',
          //   value: '',
          //   controlType: EnumFormBaseContolType.TEXTBOX,
          //   readonly: false,
          //   type: 'text',
          //   validators: [
          //     {
          //       name: 'required',
          //       validator: Validators.required,
          //       errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
          //     },
          //     {
          //       name: 'max',
          //       validator: Validators.max(9999999999),
          //       errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MAX,
          //     },
          //     {
          //       name: 'min',
          //       validator: Validators.min(0),
          //       errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
          //     },

          //   ],
          // },

        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_ATTACHED_FILE,
            field: 'attachedFileBuffer',
            value: '',
            controlType: EnumFormBaseContolType.ATTACHMENT,
            assignTo: 'attachedFile',
            type: 'string',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
      ],
    },
  ];

  constructor(
    public override dialogService: DialogService,
    public trainingCenterEditService: TrainingCenterEditService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TRAINING_CENTER_EDIT;

    this.crud = {
      c: api.TR_CENTER_CREATE,
      r: api.TR_CENTER_READ,
      u: api.TR_CENTER_UPDATE,
      d: api.TR_CENTER_DELETE,
    };
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    const regex: any = /^[0-9]+$/;

    this.subscriptions.push(
      (this.defPhone = this.form.get('phone')?.value),
      (this.defPhoneContactPerson = this.form.get('defPhoneContactPerson')?.value),
      this.form
        .get('phone')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          setTimeout(() => {
            if (regex.test(this.form.get('phone')?.value) || this.form.get('phone')?.value == '') {
              this.defPhone = this.form.get('phone')?.value;
            }
            this.form.get('phone')?.setValue(this.defPhone);
          }, 50);
        })!,

      this.form
        .get('phoneContactPerson')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          setTimeout(() => {
            if (
              regex.test(this.form.get('phoneContactPerson')?.value) ||
              this.form.get('phoneContactPerson')?.value == ''
            ) {
              this.defPhoneContactPerson = this.form.get('phoneContactPerson')?.value;
            }
            this.form.get('phoneContactPerson')?.setValue(this.defPhoneContactPerson);
          }, 50);
        })!,

      // this.trainingCenterEditService
      //   .CreateNewCode()
      //   .pipe(
      //     map((f: any) => {
      //       let options: string = '';
      //       options = f.body.innerBody.code;
      //       return options;
      //     }),
      //   )
      //   .subscribe((response: any) => {
      //     if (this.form.get('codeCenter')?.value == '') this.form.get('codeCenter')?.patchValue(response);
      //   }),
    );
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  ngOnInit(): void { }
}
