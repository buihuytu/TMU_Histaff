import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { InsuarenceInfoService } from '../insuarence-info-edit.service';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditCRUD, ICoreDropdownOption, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, AuthService, IFormatedResponse } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-insuarence-info-edit',
  templateUrl: './insuarence-info-edit.component.html',
  styleUrls: ['./insuarence-info-edit.component.scss']
})
export class InsuarenceInfoEditComponent extends BaseEditComponent implements OnInit, OnDestroy {
  override entityTable = 'PORTAL_INSUARENCE_INFO';
  subcriptions: Subscription[] = []
  crud!: ICorePageEditCRUD;
  insWherehealthIdGetByIdObject$ = new BehaviorSubject<any>(null);
  insWherehealthIdGetByIdApi = api.INS_WHEREHEALTH_READ;
  insWherehealthIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_ID,
            field: 'id',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'number'
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_INSUARENCE_NUMBER,
            field: 'insurenceNumber',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string'
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_INS_WHEREHEALTH_NAME,
            controlType: EnumFormBaseContolType.DROPDOWN,
            field: 'insWherehealthId',
            getByIdObject$: this.insWherehealthIdGetByIdObject$,
            getByIdApi: this.insWherehealthIdGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'nameVn',
            dropdownOptions$: this.insWherehealthIdOptions$,
            type: 'number',
            value: '',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_INS_CARD_NUMBER,
            field: 'insCardNumber',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string'
          },
        ],
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_NOTE,
            field: 'employeeId',
            value: this.authService.data$.value?.employeeId,
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
            hidden: true
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_NOTE,
            field: 'isSaveInsurence',
            value: null,
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'bool',
            hidden: true
          },
        ]
      ]
    }
  ]

  constructor(public dialogSerivce: DialogService,
    private appService: AppService,
    private authService: AuthService,
    private insuarenceInfoService: InsuarenceInfoService) {
    super(dialogSerivce)
    this.crud = {
      c: api.HU_EMPLOYEE_CV_EDIT_INSERT_INSUARENCE_INFO,
      r: api.HU_EMPLOYEE_READ,
      u: api.HU_EMPLOYEE_CV_EDIT_INSERT_INSUARENCE_INFO,
      d: api.HU_EMPLOYEE_DELETE,
      s: api.HU_EMPLOYEE_CV_EDIT_INSUARENCE_INFO_SAVE
    }
  }
  ngOnInit(): void {

    this.subcriptions.push(
      this.appService.get(api.INS_WHEREHEALTH_READ_ALL)
        .subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              const options: ICoreDropdownOption[] = [];
              body.innerBody.map((y: any) => {
                options.push({
                  value: y.id,
                  text: y.nameVn,
                })
              });
              this.insWherehealthIdOptions$.next(options)
            }
          }
        })
    )
  }
  onFormCreated(e: FormGroup) {
    this.form = e;
    if (this.insuarenceInfoService.insurenceId != 0) {
      this.subcriptions.push(
        this.appService.get(api.HU_EMPLOYEE_CV_EDIT_INSUARENCE_INFO_GET_SAVE_BY_ID + `?id=${this.insuarenceInfoService.insurenceId}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.innerBody) {
                this.form.patchValue(body.innerBody)
              }
            }
          })
      )
    }
    else {
      this.subcriptions.push(
        this.appService.get(api.HU_EMPLOYEE_CV_EDIT_INSUARENCE_INFO_BY_EMPLOYEE_ID + `?employeeId=${this.authService.data$.value?.employeeId}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.innerBody) {
                this.form.patchValue(body.innerBody)
              }
            }
          })
      )
    }
  }

  onFormReinit(e: string): void {
    this.formInitStringValue = e;

  }
  ngOnDestroy(): void {
    this.insuarenceInfoService.insurenceId = 0
  }
}
