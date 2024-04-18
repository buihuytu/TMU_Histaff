import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, AuthService, UrlService, IFormatedResponse } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BankInfoService } from '../bank-info.service';

@Component({
  selector: 'app-bank-info-edit',
  templateUrl: './bank-info-edit.component.html',
  styleUrls: ['./bank-info-edit.component.scss']
})
export class BankInfoEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {

  subcriptions: Subscription[] = [];

  bankIdGetByIdObject$ = new BehaviorSubject<any>(null);
  bankIdGetByIdApi = api.HU_BANK_READ;
  bankIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  bankId2GetByIdObject$ = new BehaviorSubject<any>(null);
  bankId2GetByIdApi = api.HU_BANK_READ;
  bankId2Options$ = new BehaviorSubject<any>(null);

  bankBranchIdGetByIdObject$ = new BehaviorSubject<any>(null);
  bankBranchIdGetByIdApi = api.HU_BANK_BRANCH_READ;
  bankBranchIdOptions$ = new BehaviorSubject<any>(null);

  bankBranchId2GetByIdObject$ = new BehaviorSubject<any>(null);
  bankBranchId2GetByIdApi = api.HU_BANK_BRANCH_READ;
  bankBranchId2Options$ = new BehaviorSubject<any>(null);

  override entityTable = "PORTAL_BANK_INFO";
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            hidden: true,
            type: 'number'
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_FULL_NAME,
            field: 'fullName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string',
            readonly: true,
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_TAX_CODE,
            field: 'taxCode',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
            readonly: true,
          },
        ]
      ],
    },

    {
      rows: [
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_BANK_NAME_1,
            field: 'bankId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.bankIdGetByIdObject$,
            getByIdApi: this.bankIdGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.bankIdOptions$,
            type: 'number'
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_BANK_BRANCH_1,
            field: 'bankBranchId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.bankBranchIdOptions$,
            getByIdObject$: this.bankBranchIdGetByIdObject$,
            getByIdApi: this.bankBranchIdGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'name',
            type: 'number',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_BANK_NO_1,
            field: 'bankNo',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number'
          }
        ]
      ],
    },
    {
      rows: [
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_BANK_NAME_2,
            field: 'bankId2',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.bankId2GetByIdObject$,
            getByIdApi: this.bankId2GetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.bankId2Options$,
            type: 'number'
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_BANK_BRANCH_2,
            field: 'bankBranchId2',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.bankBranchId2Options$,
            getByIdObject$: this.bankBranchId2GetByIdObject$,
            getByIdApi: this.bankBranchId2GetByIdApi,
            boundFrom: 'id',
            shownFrom: 'name',
            type: 'number',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_BANK_NO_2,
            field: 'bankNo2',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number'
          },
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
            field: 'isSaveBankInfo',
            value: null,
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'bool',
            hidden: true
          },
        ]
      ]
    }
  ]
  constructor(public dilogService: DialogService,
    private appService: AppService,
    private authService: AuthService,
    private bankInfoService: BankInfoService,
    public urlService: UrlService,) {
    super(dilogService);

    this.crud = {
      c: api.HU_EMPLOYEE_CV_EDIT_INSERT_BANK_INFO,
      r: api.HU_EMPLOYEE_GET_BANK_INFO_BY_EMPLOYEE_ID,
      u: api.HU_EMPLOYEE_CV_EDIT_INSERT_BANK_INFO,
      s: api.HU_EMPLOYEE_CV_EDIT_BANK_INFO_SAVE
    }
  }

  ngOnInit(): void {
    this.urlService.previousRouteUrl$.next('/profile/staff-profile/bank-info');
    this.subcriptions.push(
      this.appService.get(api.HU_BANK_READ_ALL).subscribe(x => {
        const body: IFormatedResponse = x.body
        if (x.ok && x.status === 200) {
          const newOptions: ICoreDropdownOption[] = [];
          body.innerBody.map((y: any) => {
            newOptions.push({
              value: y.id,
              text: y.name,
            })
          });
          this.bankIdOptions$.next(newOptions);
          this.bankId2Options$.next(newOptions);
        }
      })
    )
    this.form.get('bankId')?.valueChanges.subscribe(x => {
      if (!!x) {
        this.subcriptions.push(
          this.appService.get(api.HU_BANK_BRANCH_BY_BANK_ID + x)
            .subscribe((res: any) => {
              if (res.ok && res.status === 200) {
                const body: IFormatedResponse = res.body;
                if (body.statusCode === 200) {
                  const newOptions: ICoreDropdownOption[] = [];
                  res.body.innerBody.map((y: any) => {
                    newOptions.push({
                      value: y.id,
                      text: y.name
                    })
                  })
                  this.bankBranchIdOptions$.next(newOptions)
                }
              }
            })
        )
      }
    })!

    this.form.get('bankId2')?.valueChanges.subscribe(x => {
      if (!!x) {
        this.subcriptions.push(
          this.appService.get(api.HU_BANK_BRANCH_BY_BANK_ID + x)
            .subscribe((res: any) => {
              if (res.ok && res.status === 200) {
                const body: IFormatedResponse = res.body;
                if (body.statusCode === 200) {
                  const newOptions: ICoreDropdownOption[] = [];
                  res.body.innerBody.map((y: any) => {
                    newOptions.push({
                      value: y.id,
                      text: y.name
                    })
                  })
                  this.bankBranchId2Options$.next(newOptions)
                }
              }
            })
        )
      }
    })
  }
  ngAfterViewInit(): void {
    this.subcriptions.push(
      this.appService.get(api.HU_BANK_READ_ALL).subscribe(x => {
        const body: IFormatedResponse = x.body
        if (x.ok && x.status === 200) {
          const newOptions: ICoreDropdownOption[] = [];
          body.innerBody.map((y: any) => {
            newOptions.push({
              value: y.id,
              text: y.name,
            })
          });
          this.bankIdOptions$.next(newOptions);
          this.bankId2Options$.next(newOptions);
        }
      })
    )
    this.form.get('bankId')?.valueChanges.subscribe(x => {
      if (!!x) {
        this.subcriptions.push(
          this.appService.get(api.HU_BANK_BRANCH_BY_BANK_ID + x)
            .subscribe((res: any) => {
              if (res.ok && res.status === 200) {
                const body: IFormatedResponse = res.body;
                if (body.statusCode === 200) {
                  const newOptions: ICoreDropdownOption[] = [];
                  res.body.innerBody.map((y: any) => {
                    newOptions.push({
                      value: y.id,
                      text: y.name
                    })
                  })
                  this.bankBranchIdOptions$.next(newOptions)
                }
              }
            })
        )
      }
    })!

    this.form.get('bankId2')?.valueChanges.subscribe(x => {
      if (!!x) {
        this.subcriptions.push(
          this.appService.get(api.HU_BANK_BRANCH_BY_BANK_ID + x)
            .subscribe((res: any) => {
              if (res.ok && res.status === 200) {
                const body: IFormatedResponse = res.body;
                if (body.statusCode === 200) {
                  const newOptions: ICoreDropdownOption[] = [];
                  res.body.innerBody.map((y: any) => {
                    newOptions.push({
                      value: y.id,
                      text: y.name
                    })
                  })
                  this.bankBranchId2Options$.next(newOptions)
                }
              }
            })
        )
      }
    })

  }
  onFormCreated(e: FormGroup) {
    this.form = e;
    if (this.bankInfoService.bankInfoId != 0) {
      this.subcriptions.push(
        this.appService.get(api.HU_EMPLOYEE_CV_EDIT_BANK_INFO_INFO_GET_SAVE_BY_ID + `?id=${this.bankInfoService.bankInfoId}`).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body
            this.form.patchValue(body.innerBody)
          }
        })
      )
    }
    else {
      this.subcriptions.push(
        this.appService.get(api.HU_EMPLOYEE_GET_BANK_INFO_BY_EMPLOYEE_ID + `?employeeId=${this.authService.data$.value?.employeeId}`).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body
            this.form.patchValue(body.innerBody)
          }
        })
      )
    }
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e
  }
  ngOnDestroy(): void {
    this.bankInfoService.bankInfoId = 0;
    this.urlService.currentRouteUrl$.next('/profile/staff-profile/bank-info')
  }
}
