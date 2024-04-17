import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AppService, BaseEditComponent, DialogService, EnumFormBaseContolType, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription } from 'rxjs';


interface OptionContext {
  value: number;
  text: string;
}

@Component({
  selector: 'app-tr-lecture-edit',
  templateUrl: './tr-lecture-edit.component.html',
  styleUrl: './tr-lecture-edit.component.scss'
})

export class TrLectureEditComponent extends BaseEditComponent {
  override entityTable = 'TR_LECTURE';
  
  subscriptions: Subscription[] = [];
  
  captionCode!: EnumTranslateKey;


  // "drop down list" to choose "trCenter"
  trCenterGetByIdApi = api.GET_BY_ID_TR_CENTER;
  trCenterGetByIdObject$ = new BehaviorSubject<any>(null);
  trCenterOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  

  loading: boolean = false;
  
  crud!: ICorePageEditCRUD;

  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ID,
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
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_TRAINING_CENTER,
              field: 'trCenterId',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.trCenterGetByIdApi,
              getByIdObject$: this.trCenterGetByIdObject$,
              dropdownOptions$: this.trCenterOptions$,
              shownFrom: 'name',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_TEACHER_CODE,
              field: 'teacherCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_TEACHER_NAME,
              field: 'teacherName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PHONE_NUMBER,
              field: 'phoneNumber',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_EMAIL,
              field: 'email',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_ADDRESS_CONTACT,
              field: 'addressContact',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_SUPPLIER_CODE,
              field: 'supplierCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_SUPPLIER_NAME,
              field: 'supplierName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_WEBSITE,
              field: 'website',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_TYPE_OF_SERVICES_PROVIDED,
              field: 'typeOfService',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_LECTURER_PROFILE,
              field: 'attachmentBuffer',
              value: null,
              controlType: EnumFormBaseContolType.ATTACHMENT,
              assignTo: 'nameOfFile',
              type: 'object',
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_INTERNAL_LECTURER,
              field: 'isInternalTeacher',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean'
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
            },
          ]
        ]
      }
    ];

  constructor (
    public override dialogService: DialogService,
    private appService: AppService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TR_LECTURE_EDIT;

    this.crud = {
      c: api.TR_LECTURE_CREATE,
      r: api.TR_LECTURE_READ,
      u: api.TR_LECTURE_UPDATE,
      d: api.TR_LECTURE_DELETE,
    };
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.appService.get("/api/TrLecture/GetDropDownTrainingCenter").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.trCenterOptions$.next(options);
      })
    );
  }

  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}