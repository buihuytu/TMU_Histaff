import { Component, ViewEncapsulation } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { BaseEditComponent, ICoreChecklistOption, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, PositionEditService,} from "ngx-histaff-alpha";
import { BehaviorSubject, map } from "rxjs";

@Component({
    selector: "app-position-edit",
    templateUrl: "./ortherlist-edit.component.html",
    styleUrls: ["./ortherlist-edit.component.scss"],
  })
  export class OrtherListEditComponent extends BaseEditComponent {
    
    loading: boolean = false;
    override entityTable = "SYS_ORTHER_LIST";
    checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
    scaleOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
    captionCode!: EnumTranslateKey;
    crud!: ICorePageEditCRUD;
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
                type: 'text',
                hidden : true
              }
            ],
            [
              {
                flexSize: 6,
                label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_ORGNAME,
                field: 'groupId',
                value: '',
                controlType: EnumFormBaseContolType.DROPDOWN,
                shownFrom: 'name',
                dropdownOptions$: this.scaleOptions$,
                type: 'text'
              }
            ],
            [
              {
                flexSize: 6,
                label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_CODE,
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
                label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_NAME,
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
                label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_JOB_DESC,
                field: 'jobDesc',
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
      private slrService: PositionEditService
    ) {
  
      super(dialogService);
  
      this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_POSITION_EDIT;
  
      this.crud = {
        c: api.SYS_OTHERLIST_CREATE,
        r: api.SYS_OTHERLIST_READ,
        u: api.SYS_OTHERLIST_UPDATE,
        d: api.SYS_OTHERLIST_DELETE_IDS,
      };
  
    }
  
    ngOnInit(): void {
      this.loading = true;
      this.slrService.getScales()
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
          this.scaleOptions$.next(response);
          this.loading = false;
        })
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