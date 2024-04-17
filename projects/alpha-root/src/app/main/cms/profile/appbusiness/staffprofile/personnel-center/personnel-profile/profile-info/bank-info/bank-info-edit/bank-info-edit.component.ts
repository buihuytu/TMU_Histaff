import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';

import { PersonnelCenterService } from '../../../../personnel-center.service';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-bank-info-edit',
  templateUrl: './bank-info-edit.component.html',
  styleUrls: ['./bank-info-edit.component.scss']
})
export class BankInfoEditComponent extends BaseEditComponent implements OnInit, OnDestroy {

  /* Properties to be passed into core-page-edit */

  override entityTable = "HU_EMPLOYEE_CV";

  subscriptions: Subscription[] = []

  bankOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([])
  bankGetByIdObject$ = new BehaviorSubject<any>(null)
  bankOptions2$ = new BehaviorSubject<ICoreDropdownOption[]>([])
  bankGetByIdObject2$ = new BehaviorSubject<any>(null)

  bankBranhOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([])
  bankBranhGetByIdObject$ = new BehaviorSubject<any>(null)

  bankBranhOptions2$ = new BehaviorSubject<ICoreDropdownOption[]>([])
  bankBranhGetByIdObject2$ = new BehaviorSubject<any>(null)
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
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
              hidden: true,
              type: 'number'
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ACCOUNT_BANK_NAME,
              field: 'accountBankName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string'
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_ID,
              field: 'bankId',
              value: null,
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.bankOptions$,
              getByIdObject$: this.bankGetByIdObject$,
              getByIdApi: api.HU_BANK_READ,
              shownFrom: 'name',
              type: 'number',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_BRANCH_1,
              field: 'bankBranchId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.bankBranhOptions$,
              getByIdObject$: this.bankBranhGetByIdObject$,
              getByIdApi: api.HU_BANK_BRANCH_READ,
              boundFrom: 'id',
              shownFrom: 'name',
              type: 'number',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO_1,
              field: 'bankNo',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_ID,
              field: 'bankId2',
              value: null,
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.bankOptions2$,
              getByIdObject$: this.bankGetByIdObject2$,
              getByIdApi: api.HU_BANK_READ,
              shownFrom: 'name',
              type: 'number',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_BRANCH_2,
              field: 'bankBranchId2',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.bankBranhOptions2$,
              getByIdObject$: this.bankBranhGetByIdObject2$,
              getByIdApi: api.HU_BANK_BRANCH_READ,
              shownFrom: 'name',
              boundFrom: 'id',
              type: 'number',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO_2,
              field: 'bankNo2',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
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

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_BANK_INFO_EDIT;

    this.crud = {
      r: api.HU_EMPLOYEE_CV_GET_BANK,
      u: api.HU_EMPLOYEE_CV_UPDATE_BANK,
    };

  }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.subscriptions.push(
      this.appService.get(api.HU_BANK_READ_ALL).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            const newBankOptions: ICoreDropdownOption[] = [];
            body.innerBody.map((item: any) => {
              newBankOptions.push({
                value: item.id,
                text: item.name
              })
            });
            this.bankOptions$.next(newBankOptions);
            this.bankOptions2$.next(newBankOptions);
          }
        }
      })
    )
    this.subscriptions.push(
      this.appService.get(api.HU_BANK_READ_ALL).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            const newBankOptions: ICoreDropdownOption[] = [];
            body.innerBody.map((item: any) => {
              newBankOptions.push({
                value: item.id,
                text: item.name
              })
            });
            this.bankOptions$.next(newBankOptions);
            this.bankOptions2$.next(newBankOptions);
          }
        }
      })
    )
    this.form.get('bankId')?.valueChanges.subscribe(x => {
      if (!!x) {
        this.subscriptions.push( // <== Inner push
          this.appService
            .get(api.HU_BANK_BRANCH_BY_BANK_ID + x)
            .subscribe((res: any) => {
              if (!!res.ok && res.status === 200) {
                const body: IFormatedResponse = res.body
                if (body.statusCode === 200 && !!body.innerBody) {
                  const options: { value: number | null; text: string }[] = [];
                  res.body.innerBody.map((g: any) => {
                    options.push({
                      value: g.id,
                      text: g.name,
                    })
                  })
                  this.bankBranhOptions$.next(options);
                }
              }
            })
        )
      }
    })!

    this.form.get('bankId2')?.valueChanges.subscribe(x => {
      if (!!x) {
        this.subscriptions.push( // <== Inner push
          this.appService
            .get(api.HU_BANK_BRANCH_BY_BANK_ID + x)
            .subscribe((res: any) => {
              if (!!res.ok && res.status === 200) {
                const body: IFormatedResponse = res.body
                if (body.statusCode === 200 && !!body.innerBody) {
                  const options: { value: number | null; text: string }[] = [];
                  res.body.innerBody.map((g: any) => {
                    options.push({
                      value: g.id,
                      text: g.name,
                    })
                  })
                  this.bankBranhOptions2$.next(options);
                }
              }
            })
        )
      }
    })!
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
