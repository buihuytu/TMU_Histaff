import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TransportDataService } from '../transport-data.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, AuthService, UrlService, IFormatedResponse } from 'ngx-histaff-alpha';


@Component({
  selector: 'app-additional-info-edit',
  templateUrl: './additional-info-edit.component.html',
  styleUrls: ['./additional-info-edit.component.scss']
})
export class AdditionalInfoEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {

  override entityTable = 'PORTAL_CONTACT_INFO';
  subcriptions: Subscription[] = []
  crud!: ICorePageEditCRUD;
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
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_ADDITIONAL_INFO_PASS_NO,
            field: 'passNo',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string'
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_ADDITIONAL_INFO_PASS_DATE,
            field: 'passDate',
            value: null,
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date'
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_ADDITIONAL_INFO_PASS_EXPIRE,
            field: 'passExpire',
            value: null,
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date'
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_ADDITIONAL_INFO_PASS_PLACE,
            field: 'passPlace',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string'
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_ADDITIONAL_INFO_VISA_NO,
            field: 'visaNo',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string'
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_ADDITIONAL_INFO_VISA_DATE,
            field: 'visaDate',
            value: null,
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date'
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_ADDITIONAL_INFO_VISA_EXPIRE,
            field: 'visaExpire',
            value: null,
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date'
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_ADDITIONAL_INFO_VISA_PLACE,
            field: 'visaPlace',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string'
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_NOTE,
            field: 'employeeId',
            value: this.authService.data$.value?.employeeId,
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
            hidden: true
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_NOTE,
            field: 'isSaveAdditionalInfo',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'bool',
            hidden: true
          },
        ]

      ]
    }
  ]

  constructor(public override dialogService: DialogService,
    private appService: AppService,
    private authService: AuthService,
    private transportDataService: TransportDataService,
    private urlService: UrlService
  ) {
    super(dialogService);
    this.crud = {
      c: api.HU_EMPLOYEE_CV_EDIT_INSERT_ADDITINAL_INFO,
      r: api.HU_EMPLOYEE_READ,
      u: api.HU_EMPLOYEE_CV_EDIT_INSERT_ADDITINAL_INFO,
      s: api.HU_EMPLOYEE_CV_EDIT_ADDITIONAL_INFO_SAVE
    }
  }
  
  ngOnInit(): void {
    console.log(this.authService.data$.value?.employeeId);
    this.urlService.previousRouteUrl$.next('/profile/staff-profile/additional-info')
  }

  onFormCreated(e: FormGroup) {
    this.form = e;
    if(this.transportDataService.addtionalInfoId != 0){
      this.subcriptions.push(
        this.appService.get(api.HU_EMPLOYEE_GET_ADDITIONAL_INFO_SAVE_BY_ID + `?id=${this.transportDataService.addtionalInfoId}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.innerBody) {
                this.form.patchValue(body.innerBody)
              }
            }
          })
      )
    }else{
      this.subcriptions.push(
        this.appService.get(api.HU_EMPLOYEE_GET_ADDITIONAL_INFO_BY_EMPLOYEE_ID + `?employeeId=${this.authService.data$.value?.employeeId}`)
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
    this.formInitStringValue = e
  }
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
      this.transportDataService.addtionalInfoId = 0;
      this.urlService.currentRouteUrl$.next('/profile/staff-profile/additional-info')
  }
}
