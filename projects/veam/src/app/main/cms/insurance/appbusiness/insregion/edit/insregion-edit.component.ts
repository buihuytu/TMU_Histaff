import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreTablePipeType, DialogService, AppService } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, map } from 'rxjs';
import { InsRegionEditService } from './insregion.edit.service';


@Component({
  selector: 'app-region-edit',
  templateUrl: './insregion-edit.component.html',
  styleUrls: ['./insregion-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InsRegionEditComponent
  extends BaseEditComponent
  implements AfterViewInit
{
  /* Properties to be passed into core-page-edit */
  override entityTable = 'INS_REGION';

  loading: boolean = false;
  subscriptions: Subscription[] = [];
  insRegionGetByIdObject$ = new BehaviorSubject<any>(null);
  insRegionGetByIdApi = api.SYS_OTHERLIST_READ;
  insregionOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_NAME,
            field: 'areaId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.insregionOptions$,
            getByIdObject$: this.insRegionGetByIdObject$,
            shownFrom: 'name',
            getByIdApi: this.insRegionGetByIdApi,
            readonly: false,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_MONEY,
            field: 'money',
            value: null,
            controlType: EnumFormBaseContolType.CURRENCY,
            pipe: EnumCoreTablePipeType.NUMBER,
            readonly: false,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_EFFECT_DATE,
            field: 'effectDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            readonly: false,
            type: 'date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              // {
              //   name: 'checkEffectiveDate',
              //   validator: InsRegionEditComponent.checkDate,
              //   errorMessage:
              //     EnumTranslateKey.UI_FORM_CONTROL_ERROR_START_DATE_MORE_THAN_TO_DATE,
              // },
            ],
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_EXPRIVED_DATE,
            field: 'exprivedDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            readonly: false,
            type: 'date',
            hidden: true,
            validators: [
              // {
              //   name: 'checkExprivedDate',
              //   validator: InsRegionEditComponent.checkDate,
              //   errorMessage:
              //     EnumTranslateKey.UI_FORM_CONTROL_ERROR_END_DATE_MORE_THAN_TO_DATE,
              // },
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_CEILING_UI,
            field: 'ceilingUi',
            value: null,
            controlType: EnumFormBaseContolType.CURRENCY,
            pipe: EnumCoreTablePipeType.NUMBER,
            disabled: true,
            type: 'number',
          }
        ],
      ],
    },
  ];

  constructor(
    public override dialogService: DialogService,
    public appService: AppService,
    private slrService: InsRegionEditService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGION;

    this.crud = {
      c: api.INS_REGION_CREATE,
      r: api.INS_REGION_READ,
      u: api.INS_REGION_UPDATE,
      d: api.INS_REGION_DELETE,
    };
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subscriptions.push(
      this.form.get('money')?.valueChanges.subscribe(x =>{
        this.calculator()
      })!
    )
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;

  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = true;
      this.slrService
        .getSysOrtherList()
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string }[] = [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.areaId,
                  text: g.name,
                });
              });
              return options;
            } else {
              return [];
            }
          })
        )
        .subscribe((response) => {
          this.insregionOptions$.next(response);
          this.loading = false;
        });
    });
  }

  private calculator(){
    let num = 20;
    if(this.form.get('money')?.value != null){
      let moneyCeilingUi = this.form.get('money')?.value * num
      this.form.get('ceilingUi')?.setValue(moneyCeilingUi)
    }
  }

  // static checkDate(control: AbstractControl): any | null {
  //   let valid = true;
  //   let errorMessage: string = '';
  //   const startDate = new Date(control.parent?.get('effectDate')?.value);
  //   const endDate = new Date(control.parent?.get('exprivedDate')?.value);
    
  //   if (new Date(startDate.toLocaleDateString('en-US')) > new Date(endDate.toLocaleDateString('en-US'))) {
  //     valid = false;
  //     errorMessage =
  //       EnumTranslateKey.UI_FORM_CONTROL_INSURANCE_REGIMES_MNG_ERROR_START_DATE_MORE_THAN_END_DATE;
  //   }
  //   if (new Date(endDate.toLocaleDateString('en-US')) < new Date(startDate.toLocaleDateString('en-US'))) {
  //     valid = false;
  //     errorMessage =
  //       EnumTranslateKey.UI_FORM_CONTROL_INSURANCE_REGIMES_MNG_ERROR_END_DATE_LESS_THAN_START_DATE;
  //   }
  //   return CustomValidators.core('checkDate', valid, errorMessage)(control);
  // }
}
