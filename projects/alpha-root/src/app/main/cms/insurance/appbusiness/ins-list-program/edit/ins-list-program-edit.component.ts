import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, MultiLanguageService, AppService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-ins-list-program-edit',
  templateUrl: './ins-list-program-edit.component.html',
  styleUrls: ['./ins-list-program-edit.component.scss']
})
export class InsListProgramEditComponent extends BaseEditComponent {

  /* Properties to be passed into core-page-edit */

  override entityTable = "INS_LIST_PROGRAM";

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  shiftOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atShiftGetByIdObject$ = new BehaviorSubject<any>(null);
  atShiftGetByIdApi = api.AT_SHIFT_READ;

  loading: boolean = false;

  subsctiptions: Subscription[] = [];

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
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
              hidden:true,
              type: 'text'
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_PROGRAM_CODE,
              field: 'code',
              value: '',
              type: 'text',
              controlType: EnumFormBaseContolType.TEXTBOX,
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_PROGRAM_NAME,
              field: 'name',
              value: '',
              type: 'text',
              controlType: EnumFormBaseContolType.TEXTBOX,
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
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_PROGRAM_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text', 
            },
          ], 
        ]
      },  
    ];
  constructor(
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private appService: AppService // CoreService is DEPRECATED!!!
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_INS_LIST_PROGRAM;

    this.crud = {
      c: api.INS_LIST_PROGRAM_CREATE,
      r: api.INS_LIST_PROGRAM_READ,
      u: api.INS_LIST_PROGRAM_UPDATE,
      d: api.INS_LIST_PROGRAM_DELETE,
    };
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
