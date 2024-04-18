import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreTablePipeType, DialogService } from 'ngx-histaff-alpha';
import { OrganizationLevelService } from '../organization-level.service';

@Component({
  selector: 'app-organization-level-edit',
  templateUrl: './organization-level-edit.component.html',
  styleUrls: ['./organization-level-edit.component.scss']
})
export class OrganizationLevelEditComponent  extends BaseEditComponent implements OnInit, OnDestroy {



  override entityTable = "HU_ORGANIZATION";

  loading: boolean = false;

  subsctiptions: Subscription[] = [];

  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;

  orgLevelGetByIdObject$ = new BehaviorSubject<any>(null);
  orgLevelGetByIdApi = api.HU_ORG_LEVEL_READ;

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
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORG_LEVEL_CODE,
              field: 'code',
              value: null,
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORG_LEVEL_NAME,
              field: 'name',
              value: null,
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
            // {
            //   flexSize: 6,
            //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORG_LEVEL_ORDER_NUM,
            //   field: 'orderNum',
            //   value: null,
            //   controlType: EnumFormBaseContolType.TEXTBOX,
            //   pipe: EnumCoreTablePipeType.NUMBER,
            //   readonly: false,
            //   type: 'number',
            //   validators: [
            //     {
            //       name: 'required',
            //       validator: Validators.required,
            //       errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
            //     }
            //   ]
            // },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORG_LEVEL_NOTE,
              field: 'note',
              value: null,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
            },
          ],
        ]
      }
    ];


  constructor(

    private organizationLevelService: OrganizationLevelService,
    public override dialogService: DialogService,
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_ORG_LEVEL_EDIT;

    this.crud = {
      c: api.HU_ORG_LEVEL_CREATE,
      r: api.HU_ORG_LEVEL_READ,
      u: api.HU_ORG_LEVEL_UPDATE,
      d: api.HU_ORG_LEVEL_DELETE,
    };

  }

  /* Properties to be passed into core-page-edit */

  ngOnInit(): void {
  }


  onCorePageHeaderButtonClick(e: any): void {

  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* GET form refference */
  onFormRefCreated(e: any): void {
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subsctiptions.map(x => x?.unsubscribe())
  }

}
