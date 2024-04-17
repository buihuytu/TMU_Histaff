import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService } from 'ngx-histaff-alpha';
import { Subscription, map } from 'rxjs';





@Component({
  selector: "app-salaryscale-edit",
  templateUrl: "./salaryscale-edit.component.html",
  styleUrls: ["./salaryscale-edit.component.scss"],
})
export class SalaryScaleEditComponent extends BaseEditComponent 
  {
   /* Properties to be passed into core-page-edit */

   override entityTable = "HU_SALARY_SCALE";
  
   captionCode!: EnumTranslateKey;
   formComposition!: ICorePageEditColumnComposition[][];
   crud!: ICorePageEditCRUD;
   subsctiptions: Subscription[] = [];
   sections: ICoreFormSection[] =
     [
       {
         rows: [
           [
             {
               flexSize: 6,
               label: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_ID,
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
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              disabled: true,
             
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_NAME,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
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
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_EFFECTIVE_DATE,
              field: 'effectiveDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
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
              label: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_EXPIRATION_DATE,
              field: 'expirationDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',

            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_IS_TABLE_SCORE,
              field: 'isTableScore',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean'
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_SCALE_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
            },
          ]
             
        ]
         
       }
     ];
   constructor(
     public override dialogService: DialogService,
     private appService: AppService,
   ) {
 
     super(dialogService);
 
     this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_SCALE_EDIT;
 
     this.crud = {
       c: api.HU_SALARY_SCALE_CREATE,
       r: api.HU_SALARY_SCALE_READ,
       u: api.HU_SALARY_SCALE_UPDATE,
       d: api.HU_SALARY_SCALE_DELETE,
     };
 
   }
 
   /* GET FormGroup Instance */
   onFormCreated(e: FormGroup): void {
     this.form = e;
     this.subsctiptions.push(
      this.appService.get(api.HU_SALARY_SCALE_GETCODE)
        .pipe(
          map((f: any) => {
            let options: string = "";
            options = f.body.innerBody.code;
            return options;
          })
        )
        .subscribe(response => {
          if(this.form.get('code')?.value == "") this.form.get('code')?.patchValue(response);
        })
    )!
   }
 
   /* To allow form to be deactivated */
   onFormReinit(e: string): void {
     this.formInitStringValue = e;
   }
 
}
