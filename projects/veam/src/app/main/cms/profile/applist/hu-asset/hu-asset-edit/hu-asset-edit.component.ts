import { Component } from '@angular/core';

import { HuAssetEditService } from './hu-asset-edit.service';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators, FormGroup } from '@angular/forms';
import { CorePageEditComponent, BaseEditComponent, ICorePageEditCRUD,ICoreFormSection, EnumFormBaseContolType, DialogService, AppService } from 'ngx-histaff-alpha';
import { BehaviorSubject, map } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-hu-asset-edit',
  standalone: true,
  imports: [
    CorePageEditComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './hu-asset-edit.component.html',
  styleUrl: './hu-asset-edit.component.scss'
})
export class HuAssetEditComponent extends BaseEditComponent {
  override entityTable = 'HU_ASSET';
  crud!:ICorePageEditCRUD;
  captionCode!: EnumTranslateKey;
  loading: boolean = false;

  sysOtherListGetByIdOject$ = new BehaviorSubject<any>(null);
  sysOtherListOptions$ = new BehaviorSubject<any>(null);
  sysOtherListGetByIdApi = api.SYS_OTHERLIST_READ;

  sections: ICoreFormSection[] = [
    {
      rows:[
          [    {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            type: 'text',
            hidden: true,
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ASSET_CODE,
            field: 'code',
            value: '',
            type: 'text',
            controlType: EnumFormBaseContolType.TEXTBOX,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ]
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ASSET_NAME,
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
            ]
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ASSET_GROUP,
            field: 'groupAssetId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.sysOtherListOptions$,
            getByIdObject$: this.sysOtherListGetByIdOject$,
            getByIdApi: this.sysOtherListGetByIdApi,
            shownFrom: "name",
            readonly: true,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
              }
            ]
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ]
      ]
    }
  ];

  constructor(
    public override dialogService: DialogService,
    private appService: AppService,
    private huAsssetService: HuAssetEditService

  ) {
    super(dialogService);
    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_ASSET;
    this.crud = {
      c: api.HU_ASSET_CREATE,
      r: api.HU_ASSET_READ,
      u: api.HU_ASSET_UPDATE,
      d: api.HU_ASSET_DELETE_IDS,
    };
  }

  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnInit(): void {
    this.loading = true;

    this.huAsssetService.getGroupAsset().pipe(map((x: any) =>{
      if(x.ok && x.status === 200){
        const options: { value: number; text: string }[] = [];
        x.body.innerBody.map((y: any) => {
          options.push({
            value: y.id,
            text: y.name
          });
        });
        return options;
      }else{
        return [];
      }
    })).subscribe((response) => {
      this.sysOtherListOptions$.next(response);
      this.loading = false;
    });
  }
}
