import { Component } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { Router } from "@angular/router";
import { Validators, FormGroup } from "@angular/forms";
import { BaseEditComponent, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreTablePipeType, DialogService, AppService } from "ngx-histaff-alpha";
import { Subscription, distinctUntilChanged } from "rxjs";

@Component({
    selector: "app-ins-specifiedobjects-edit",
    templateUrl: "./ins-specifiedobjects-edit.component.html",
    styleUrls: ["./ins-specifiedobjects-edit.component.scss"]
})
export class SpecifiedObjectsEditComponent extends BaseEditComponent{
    /* Properties to be passed into core-page-edit */
    override entityTable = "INS_SPECIFIED_OBJECTS";

    loading: boolean = false;
    defMonth: string = '';

    captionCode!: EnumTranslateKey;
    formComposition!: ICorePageEditColumnComposition[][];
    subsctiptions: Subscription[] = [];
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
              hidden: true,
              type: 'text'
            }
          ],
        ],
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_EFFECTIVE_DATE,
        rows:[
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_EFFECTIVE_DATE,
              field: 'effectiveDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              readonly: false,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_CHANGE_DAY,
              field: 'changeDay',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              pipe: EnumCoreTablePipeType.NUMBER,
              readonly: false,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'min',
                  validator: Validators.min(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
                },
                {
                  name: 'max',
                  validator: Validators.max(31),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MAX,
                },
              ]
            },
          ],
        ]
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_CEILING,
        rows: [
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_SI_HI_EDIT,
              field: 'siHi',
              value: '',
              controlType: EnumFormBaseContolType.CURRENCY,
              readonly: false,
              type: 'number',
            },
            // {
            //   flexSize: 3,
            //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_UI_EDIT,
            //   field: 'ui',
            //   value: '',
            //   controlType: EnumFormBaseContolType.TEXTBOX,
            //   readonly: false,
            //   type: 'text',
            // },
          ],
        ],
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_COMPANY,
        rows:[
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_UI_COM,
              field: 'uiCom',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_HI_COM,
              field: 'hiCom',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
                flexSize: 3,
                label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_SI_COM,
                field: 'siCom',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                readonly: false,
                type: 'text',
                validators: [
                    {
                      name: 'required',
                      validator: Validators.required,
                      errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                    }
                  ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_AI_OAI_COM,
              field: 'aiOaiCom',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
          ],
        ], 
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_EMP,
        rows:[
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_UI_EMP,
              field: 'uiEmp',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_HI_EMP,
              field: 'hiEmp',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
                flexSize: 3,
                label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_SI_EMP,
                field: 'siEmp',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                readonly: false,
                type: 'text',
                validators: [
                    {
                      name: 'required',
                      validator: Validators.required,
                      errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                    }
                  ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_AI_OAI_EMP,
              field: 'aiOaiEmp',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            }, 
          ],
        ], 
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_AGE,
        rows:[
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_RETIRE_MALE,
              field: 'retireMale',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_RETIRE_FEMALE,
              field: 'retireFemale',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            }, 
          ],
        ], 
      },
      {
        updateModeOnly: true,
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_UPDATED_BY,
              field: 'updatedByUsername',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              textareaRows: 12,
              readonly: true,
              type: 'text',
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_UPDATED_DATE,
              field: 'updatedDate',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              pipe: EnumCoreTablePipeType.DATE
            },
          ]
        ]
      }
    ];
  selectedData: any;

    constructor(
        public override dialogService: DialogService,
        private router : Router,
        private appService : AppService
    ){
        super(dialogService);
        if(this.router.getCurrentNavigation()?.extras?.state){
          this.selectedData = this.router.getCurrentNavigation()?.extras.state!['selectedData'];
        }
        this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_INS_SPECIFIED_OBJECTS;

        this.crud = {
            c: api.INS_SPECIFIED_OBJECTS_CREATE,
            r: api.INS_SPECIFIED_OBJECTS_READ,
            u: api.INS_SPECIFIED_OBJECTS_UPDATE,
            d: api.INS_SPECIFIED_OBJECTS_DELETE,
        };
    }

    /* GET FormGroup Instance */
    onFormCreated(e: FormGroup): void {
      this.form = e;
      const regex: any = /^[0-9]+$/;

      this.subsctiptions.push(

        (this.defMonth = this.form.get('changeDay')?.value),
        //check money
        this.form
          .get('changeDay')
          ?.valueChanges.pipe(distinctUntilChanged())
          .subscribe((x) => {
            setTimeout(() => {
              if (regex.test(this.form.get('changeDay')?.value) || this.form.get('changeDay')?.value == '') {
                this.defMonth = this.form.get('changeDay')?.value;
              }
              this.form.get('changeDay')?.setValue(this.defMonth);
            }, 50);
          })!
      )
    }

    /* To allow form to be deactivated */
    onFormReinit(e: string): void {
        this.formInitStringValue = e;
    }

    ngAfterViewInit(){
      setTimeout(() => {
        this.subsctiptions.push(
          this.appService.get(api.INS_SPECIFIED_OBJECTS_READ + `?id=${this.selectedData[0].id}`).subscribe((rs : any) => {
            this.form.patchValue(rs.body.innerBody)
            this.form.get('id')?.setValue(0)
            this.form.get('effectiveDate')?.setValue(null)
          })
        )
      })
    }

}