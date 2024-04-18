import { Component } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { Subscription, map, } from 'rxjs';
import { GroupPositionEditService } from './groupposition-edit.service';
import { Validators, FormGroup } from '@angular/forms';
import { BaseEditComponent, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService } from 'ngx-histaff-alpha';


@Component({
  selector: 'app-groupposition-edit',
  templateUrl: './groupposition-edit.component.html',
  styleUrls: ['./groupposition-edit.component.scss']
})
export class GroupPositionEditComponent extends BaseEditComponent {

  /* Properties to be passed into core-page-edit */

  override entityTable = "HU_GROUP_POSITION";
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
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_POSITION_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              hidden : true
            },
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_POSITION_ID,
              field: 'isActive',
              value: 1,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_POSITION_CODE,
              field: 'code',
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
                  name: 'pattern',
                  validator: Validators.pattern('[a-zA-Z0-9]*'),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_SPECIAL_CHARACTER,
                }
              ]
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_POSITION_NAME,
              field: 'name',
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
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_POSITION_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              textareaRows: 6,
              readonly: false,
              type: 'text',    
            },
          ]
          
        ]
      }
    ];
    
  constructor(
    public override dialogService: DialogService,
    private groupPositionEditService: GroupPositionEditService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_GROUP_POSITION_EDIT;

    this.crud = {
      c: api.HU_GROUP_POSITION_CREATE,
      r: api.HU_GROUP_POSITION_READ,
      u: api.HU_GROUP_POSITION_UPDATE,
      d: api.HU_GROUP_POSITION_DELETE,
    };

  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
          this.groupPositionEditService.getGroupPositionCode()
            .pipe(
              map((f: any) => {
                let options: string = "";
                options = f.body.innerBody.code;
                return options;
              })
            )
            .subscribe(response => {
              console.log(this.form.get('code'));
              if(this.form.get('code')?.value == "") this.form.get('code')?.patchValue(response);
            })
        )!
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
