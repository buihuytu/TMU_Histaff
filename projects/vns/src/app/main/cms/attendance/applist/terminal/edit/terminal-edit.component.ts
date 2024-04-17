import { Component } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { TerminalEditService } from "./terminal.edit.service";
import { Subscription, map } from "rxjs";
import { Validators, FormGroup } from "@angular/forms";
import { BaseEditComponent, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService } from "ngx-histaff-alpha";

@Component({
    selector: "app-terminal-edit",
    templateUrl: "./terminal-edit.component.html",
    styleUrls: ["./terminal-edit.component.scss"]
})
export class TerminalEditComponent extends BaseEditComponent{
    /* Properties to be passed into core-page-edit */
    override entityTable = "AT_TERMINAL";

    loading: boolean = false;
    newCode!:string;

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
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_CODE,
              field: 'terminalCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_NAME,
              field: 'terminalName',
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
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_ADDRESS_PLACE,
              field: 'addressPlace',
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
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_PORT,
              field: 'terminalPort',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_IP,
              field: 'terminalIp',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_PASS,
              field: 'pass',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_STATUS,
              field: 'isActive',
              value: 1,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text'
            }
          ]
        ]
      }
    ];

    constructor(
        public override dialogService: DialogService,
        private teService: TerminalEditService
    ){
        super(dialogService);

        this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_TERMINAL;

        this.crud = {
            c: api.AT_TERMINAL_CREATE,
            r: api.AT_TERMINAL_READ,
            u: api.AT_TERMINAL_UPDATE,
            d: api.AT_TERMINAL_DELETE,
        };
    }

    /* GET FormGroup Instance */
    onFormCreated(e: FormGroup): void {
        this.form = e;
        this.subsctiptions.push(
          this.teService.getCode()
            .pipe(
              map((f: any) => {
                let options: string = "";
                options = f.body.innerBody.code;
                return options;
              })
            )
            .subscribe(response => {
              console.log(this.form.get('terminalCode'));
              if(this.form.get('terminalCode')?.value == "") 
                this.form.get('terminalCode')?.patchValue(response);
            })
        )!
    }

    /* To allow form to be deactivated */
    onFormReinit(e: string): void {
        this.formInitStringValue = e;
    }

    ngOnInit(): void{
      this.loading = true;
    }
}