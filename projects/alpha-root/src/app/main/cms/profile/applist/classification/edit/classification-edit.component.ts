import {
  Component,
  ViewEncapsulation
} from "@angular/core";
import { BehaviorSubject, Subscription, map} from "rxjs";
import { Validators, FormGroup } from "@angular/forms";

import { ClassificationEditService } from './classification-edit.service';
import { BaseEditComponent, DialogService, EnumFormBaseContolType, FunctionEditService, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD,} from "ngx-histaff-alpha";
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: "app-classification-edit",
  templateUrl: "./classification-edit.component.html",
  styleUrls: ["./classification-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ClassificationEditComponent extends BaseEditComponent {

  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = "HU_CLASSIFICATION";

  subsctiptions: Subscription[] = [];
  classificationTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  classificationTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  classificationTypeGetByIdApi = api.SYS_OTHERLIST_READ;
  classificationLevelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  classificationLevelGetByIdObject$ = new BehaviorSubject<any>(null);
  classificationLevelGetByIdApi = api.SYS_OTHERLIST_READ;
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              hidden: true
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CLASSIFICATION_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
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
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CLASSIFICATION_TYPE,
              field: 'classificationType',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.classificationTypeGetByIdObject$,
              getByIdApi: this.classificationTypeGetByIdApi,
              shownFrom: 'name',
              dropdownOptions$: this.classificationTypeOptions$,
              type: 'number'
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CLASSIFICATION_LEVEL,
              field: 'classificationLevel',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.classificationLevelGetByIdObject$,
              getByIdApi: this.classificationLevelGetByIdApi,
              shownFrom: 'name',
              dropdownOptions$: this.classificationLevelOptions$,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.min(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CLASSIFICATION_POINT_FROM,
              field: 'pointFrom',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              // validators: [
              //   {
              //     name: 'required',
              //     validator: Validators.required,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //   },
              //   {
              //     name: 'minLength',
              //     validator: Validators.minLength(1),
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              //   },
              // ]
              hidden: true,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CLASSIFICATION_POINT_TO,
              field: 'pointTo',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              // validators: [
              //   {
              //     name: 'required',
              //     validator: Validators.required,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //   },
              //   {
              //     name: 'minLength',
              //     validator: Validators.minLength(1),
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                // },
              // ]
              hidden: true,
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CLASSIFICATION_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            }
          ]
        ]
      }
    ];

  constructor(
    public override dialogService: DialogService,
    private classificationEditService: ClassificationEditService,
    private fncService: FunctionEditService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_CLASSIFICATION_EDIT;

    this.crud = {
      c: api.HU_CLASSIFICATION_CREATE,
      r: api.HU_CLASSIFICATION_READ,
      u: api.HU_CLASSIFICATION_UPDATE,
      d: api.HU_CLASSIFICATION_DELETE,
    };

  }

  ngOnInit(): void {
    this.loading = true;
    this.subsctiptions.push(
      this.classificationEditService.getClassificationTypeList()
        .pipe(
          map((f: any) => {
            const options: { value: number; text: string; }[] = [];
            f.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            return options;
          })
        )
        .subscribe(response => {
          this.classificationTypeOptions$.next(response);
          this.loading = false;
        })
    );
    this.subsctiptions.push(
      this.classificationEditService.getClassificationLevelList()
        .pipe(
          map((f: any) => {
            const options: { value: number; text: string; }[] = [];
            f.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            return options;
          })
        )
        .subscribe(response => {
          this.classificationLevelOptions$.next(response);
          this.loading = false;
        })
    );
    this.subsctiptions.push(
      this.classificationEditService.getCode()
        .pipe(
          map((f: any) => {
            let code = "";
            code = f.body.innerBody.code;
            return code;
          })
        )
        .subscribe(response => {
          this.form.get('code')?.patchValue(response);
          this.loading = false;
        })
    );
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
