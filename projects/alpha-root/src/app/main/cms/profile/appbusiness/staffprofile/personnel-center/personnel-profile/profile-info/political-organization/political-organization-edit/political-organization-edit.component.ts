import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreTablePipeType, DialogService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject } from 'rxjs';
import { PersonnelCenterService } from '../../../../personnel-center.service';

@Component({
  selector: 'app-political-organization-edit',
  templateUrl: './political-organization-edit.component.html',
  styleUrls: ['./political-organization-edit.component.scss']
})
export class PoliticalOrganizationEditComponent extends BaseEditComponent implements OnInit, OnDestroy {

  override entityTable = "HU_EMPLOYEE_CV";

  subscriptions: Subscription[] = []
  orgGetById$ = new BehaviorSubject<any>(null);
  orgGetByIdApi = api.HU_ORGANIZATION_READ;

  positionGetByIdObject$ = new BehaviorSubject<any>(null);
  positionGetByIdApi = api.HU_POSITION_READ;

  governmentManagementOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  governmentManagementGetById$ = new BehaviorSubject<any>(null);
  governmentManagementGetByIdApi = api.SYS_OTHERLIST_READ;

  objectEmployeeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  objectEmployeeGetByIdObject$ = new BehaviorSubject<any>(null);
  objectEmployeeGetByIdApi = api.SYS_OTHERLIST_READ;
  crud!: ICorePageEditCRUD;
  captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_POLITICAL_ORGAN_EDIT;
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
              hidden: true
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_UNIONIST,
              field: 'isUnionist',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'bool',
              pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_UNIONIST_POSITION,
              field: 'unionistPosition',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_UNIONIST_DATE,
              field: 'unionistDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              pipe: EnumCoreTablePipeType.DATE_TIME,
              type: 'date'
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_UNIONIST_ADDRESS,
              field: 'unionistAddress',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            }
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_IS_JOIN_UNION,
              field: 'isJoinYouthGroup',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'bool',
              pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_GROUP_POSITION,
              field: 'youthGroupPosition',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_GROUP_ADDRESS,
              field: 'youthGroupAddress',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_GROUP_DATE,
              field: 'youthGroupDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
            },


          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_SAVE_NATION_DATE,
              field: 'youthSave',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              hidden: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_SAVE_NATION_DATE,
              field: 'youthSaveNationDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_SAVE_NATION_POSITION,
              field: 'youthSaveNationPosition',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_SAVE_NATION_ADDRESS,
              field: 'youthSaveNationAddress',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER,
              field: 'isMember',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'bool',
              pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_POSITION,
              field: 'memberPosition',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_DATE,
              field: 'memberDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date'
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_ADDRESS,
              field: 'memberAddress',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
          ],
          [

            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_RESUME_NUMBER,
              field: 'resumeNumber',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_OFFICAL_DATE,
              field: 'memberOfficalDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date'
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LIVING_CELL,
              field: 'livingCell',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_CARD_NUMBER,
              field: 'cardNumber',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },


          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_RESUME_NUMBER,
              field: 'resumeNumber2',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_ENLISMENT_DATE,
              field: 'enlistmentDate', //Ngày nhập ngũ
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date'
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_DISCHARGE_DATE,
              field: 'dischargeDate', //ngày xuất ngũ
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date'
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_HIGHEST_MILITARY_POSITION,
              field: 'highestMilitaryPosition', //Quân hàm chức vụ cao nhất
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },



          ],
          // [
          // {
          //   flexSize: 6,
          //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_GOVERMENT_MANAGEMENT,
          //   field: 'governmentManagementId',
          //   value: '',
          //   controlType: EnumFormBaseContolType.DROPDOWN,
          //   getByIdObject$: this.governmentManagementGetById$,
          //   getByIdApi: this.governmentManagementGetByIdApi,
          //   boundFrom: 'id',
          //   shownFrom: 'name',
          //   dropdownOptions$: this.governmentManagementOptions$,
          // },

          // ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_RESUME_NUMBER,
              field: 'resumeNumber3',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_VATERANS_POSITION,
              field: 'vateransPosition',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_VATERANS_MEMBER_DATE,
              field: 'vateransMemberDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date'
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_VATERANS_ADDRESS,
              field: 'vateransAddress', //địa chỉ vào hội cựu chiến binh
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_RESUME_NUMBER,
              field: 'resumeNumber4',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_POLITICAL_THEORY_LEVEL,
              field: 'politicalTheoryLevel',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_CURRENT_PARTY_COMMITTEE,
              field: 'currentPartyCommittee', //cấp ủy hiện nay
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PARTY_COMMITTEE,
              field: 'partytimePartyCommittee', //Cấp ủy kiêm nhiệm
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
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



    this.crud = {
      r: api.HU_EMPLOYEE_CV_GET_POLITICAL_ORGANIZATION_ID,
      u: api.HU_EMPLOYEE_CV_UPDATE_POLITICAL_ORGANIZATION,
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
    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'QLNN').subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            const newGovernmentManagementOptions: ICoreDropdownOption[] = [];
            body.innerBody.map((item: any) => {
              newGovernmentManagementOptions.push({
                value: item.id,
                text: item.name
              })
            });
            this.governmentManagementOptions$.next(newGovernmentManagementOptions);
          }
        }
      })

    )
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    console.log(this.form.get('id')?.value);
    setTimeout(() => {
      if (!!this.form.get('id')?.value) {
        this.subscriptions.push(
          this.appService.get(api.HU_EMPLOYEE_CV_GET_POLITICAL_BY_EMPLOYEE_CV_ID + `?employeeCvId=${this.form.get('id')?.value}`)
            .subscribe(x => {
              if (x.ok && x.status === 200) {
                const result: { id: number, sysCode: string }[] = []
                if (x.body.statusCode === 200) {
                  x.body.innerBody.map((y: any) => {
                    result.push({
                      id: y.id,
                      sysCode: y.sysCode
                    })
                  })
                }
                result.filter((x) => {
                  if (x.sysCode === '00290') {
                    this.form.get('unionistPosition')?.disable()
                  }
                  else if (x.sysCode === '00291') {
                    this.form.get('youthGroupPosition')?.disable()
                  }
                  else if (x.sysCode === '00292') {
                    this.form.get('memberPosition')?.disable()
                  }
                  else {
                    this.form.get('unionistPosition')?.enable()
                    this.form.get('youthGroupPosition')?.enable()
                    this.form.get('memberPosition')?.enable()
                  }
                })
              }
            })
        )
      }
    })
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
