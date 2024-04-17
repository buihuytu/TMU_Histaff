import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { FormGroup } from '@angular/forms';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';
import { PersonnelCenterService } from '../../../../personnel-center.service';

@Component({
  selector: 'app-political-background-edit',
  templateUrl: './political-background-edit.component.html',
  styleUrls: ['./political-background-edit.component.scss']
})
export class PoliticalBackgroundEditComponent  extends BaseEditComponent implements OnInit, OnDestroy  {

  override entityTable = "HU_EMPLOYEE_CV";

  subscriptions: Subscription[] = []
  orgGetById$ = new BehaviorSubject<any>(null);
  orgGetByIdApi = api.HU_ORGANIZATION_READ;

  positionGetByIdObject$ = new BehaviorSubject<any>(null);
  positionGetByIdApi = api.HU_POSITION_READ;

  objectEmployeeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  objectEmployeeGetByIdObject$ = new BehaviorSubject<any>(null);
  objectEmployeeGetByIdApi = api.HU_FAMILY_TDCM_LIST;
  captionCode!: EnumTranslateKey.UI_COMPONENT_TITLE_POLITICAL_BACKGROUND_EDIT;
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
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_NOTE_PRISON,
              field: 'prisonNote',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FAMILY_DETAIL,
              field: 'familyDetail',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_IS_YELLOW_FLAG,
              field: 'yellowFlag',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_RELATIONS,
              field: 'relations',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
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

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_POLITICAL_BACKGROUND_EDIT;

    this.crud = {
      r: api.HU_EMPLOYEE_CV_GET_POLITICAL,
      u: api.HU_EMPLOYEE_CV_UPDATE_POLITICAL,
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
