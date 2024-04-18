import { Component } from '@angular/core';

import { HuCompetencyPeroidEditService } from './hu-competency-period-edit.service';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators, FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageEditComponent, BaseEditComponent, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService } from 'ngx-histaff-alpha';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-hu-competency-peroid-edit',
  standalone: true,
  imports: [
    CorePageEditComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './hu-competency-peroid-edit.component.html',
  styleUrl: './hu-competency-peroid-edit.component.scss'
})
export class HuCompetencyPeroidEditComponent extends BaseEditComponent {

  override entityTable = 'HU_COMPETENCY_PERIOD';
  crud!:ICorePageEditCRUD;
  captionCode!: EnumTranslateKey;
  loading: boolean = false;

  sysOtherListGetByIdOject$ = new BehaviorSubject<any>(null);
  sysOtherListOptions$ = new BehaviorSubject<any>(null);
  sysOtherListGetByIdApi = api.SYS_OTHERLIST_READ;

  yearGetIdOject$ = new BehaviorSubject<any>(null);
  yearOptions$ = new BehaviorSubject<any>(null);
  // yearGetByIdApi = api.AT_SALARY_PERIOD_READ;

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
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_YEAR,
            field: 'year',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.yearOptions$,
            getByIdObject$: this.yearGetIdOject$,
            // getByIdApi: this.yearGetByIdApi,
            shownFrom: 'year',
            type: 'number',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMPETENCY_PERIOD_QUARTER,
            field: 'quarterId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.sysOtherListOptions$,
            getByIdObject$: this.sysOtherListGetByIdOject$,
            getByIdApi: this.sysOtherListGetByIdApi,
            shownFrom: "name",
            readonly: true,
            type: 'number',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMPETENCY_PERIOD_CODE,
            field: 'code',
            value: '',
            type: 'text',
            // disabled: true,
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
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMPETENCY_PERIOD_NAME,
            field: 'name',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            // disabled: true,
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
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMPETENCY_PERIOD_EFFECTED_DATE,
            field: 'effectedDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
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
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMPETENCY_PERIOD_EXPRIED_DATE,
            field: 'expriedDate',
            value: '',
            type: 'date',
            // disabled: true,
            controlType: EnumFormBaseContolType.DATEPICKER,
          },
        ]
      ]
    }
  ];

  constructor(
    public override dialogService: DialogService,
    private appService: AppService,
    private huCompetencyPeriodService: HuCompetencyPeroidEditService

  ) {
    super(dialogService);
    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMPETENCY_PEROID;
    this.crud = {
      c: api.HU_COMPETENCY_PERIOD_CREATE,
      r: api.HU_COMPETENCY_PERIOD_READ,
      u: api.HU_COMPETENCY_PERIOD_UPDATE,
      d: api.HU_COMPETENCY_PERIOD_DELETE_IDS,
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

    this.huCompetencyPeriodService.getPeroidYear().pipe(map((x: any) =>{
      if(x.ok && x.status === 200){
        const options: { value: number; text: number}[] = [];
        x.body.innerBody.map((y: any) => {
          options.push({
            value: y.year,
            text: y.year
          });
        });
        return options;
      }else{
        return [];
      }
    })).subscribe((response) => {
      this.yearOptions$.next(response);
      this.loading = false;
    });

    this.huCompetencyPeriodService.getQuarter().pipe(map((x: any) => {
      if(x.ok && x.status === 200){
        const options: {value: number; text: string}[]=[];
        x.body.innerBody.map((y: any) => {
          options.push({
            value: y.id,
            text: y.name,
          });
        });
        return options;
      }else{
        return [];
      }
    })).subscribe((response: any) => {
      this.sysOtherListOptions$.next(response);
      this.loading = false;
    })
  }
}
