import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';

import { BehaviorSubject, Subscription } from 'rxjs';
import { PersonnelCenterService } from '../../../../personnel-center.service';

@Component({
  selector: 'app-situation-edit',
  templateUrl: './situation-edit.component.html',
  styleUrls: ['./situation-edit.component.scss']
})
export class SituationEditComponent extends BaseEditComponent implements OnInit, OnDestroy {
  override entityTable = "HU_EMPLOYEE_CV";

  subscriptions: Subscription[] = []
  orgGetById$ = new BehaviorSubject<any>(null);
  orgGetByIdApi = api.HU_ORGANIZATION_READ;

  positionGetByIdObject$ = new BehaviorSubject<any>(null);
  positionGetByIdApi = api.HU_POSITION_READ;

  objectEmployeeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  objectEmployeeGetByIdObject$ = new BehaviorSubject<any>(null);
  objectEmployeeGetByIdApi = api.HU_FAMILY_TDCM_LIST;
  captionCode!: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_SITUATION_EDIT;
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      
      {
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden : true
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_MAIN_INCOME,
              field: 'mainIncome',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_OTHER_SOURCES,
              field: 'otherSources',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            }
          ],
         
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_LAND_GRANTED,
              field: 'landGranted',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_TAX_GRANTED_HOUSE,
              field: 'taxGrantedHouse',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_TOTAL_AREA,
              field: 'totalArea',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_SELF_PURCHASED_LAND,
              field: 'selfPurchaseLand',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_SELF_BUILD_HOUSE,
              field: 'selfBuildHouse',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_TOTAL_APP_AREA,
              field: 'totalAppArea',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_LAND_FOR_PRODUCTION,
              field: 'landForProduction',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_ADDITIONAL_INFOMATION,
              field: 'additionalInformation',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            }
          ],
        ]
      },
    ];
  constructor(
    public override dialogService: DialogService,
    private personnelCenterService: PersonnelCenterService,
    private appService: AppService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_SITUATION_EDIT;

    this.crud = {
      r: api.HU_EMPLOYEE_CV_GET_SITUATION_ID,
      u: api.HU_EMPLOYEE_CV_UPDATE_SITUATION_ID,
    };

  }

  ngOnInit(): void {
    
    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'TDCM').subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            const newObjectEmployeeOptions: ICoreDropdownOption[] = [];
            body.innerBody.map((item: any) => {
              newObjectEmployeeOptions.push({
                value: item.id,
                text: item.name
              })
            });
            this.objectEmployeeOptions$.next(newObjectEmployeeOptions);
          }
        }
      })
      
    )
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.personnelCenterService.reloadFlag$.next(true);
    this.subscriptions.map(x => x?.unsubscribe());
  }



}
