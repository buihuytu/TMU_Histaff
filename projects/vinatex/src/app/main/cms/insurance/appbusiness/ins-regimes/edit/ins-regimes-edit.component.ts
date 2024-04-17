import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { InsRegimesEditService } from './insregimes.edit.service';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-ins-regimes-edit',
  templateUrl: './ins-regimes-edit.component.html',
  styleUrls: ['./ins-regimes-edit.component.scss'],
})
export class InsRegimesEditComponent extends BaseEditComponent {
  override entityTable = 'INS_REGIMES';
  subscriptions: Subscription[] = [];

  loading: boolean = false;
  groupGetByIdObject$ = new BehaviorSubject<any>(null);
  groupOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupGetByIdApi = api.INS_GROUP_READ;

  calDateTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  calDateTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  calDateTypeGetByIdApi = api.INS_REGIMES_GET_DATE_TYPE;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_GROUP_ID,
            field: 'id',
            value: '',
            hidden: true,
            controlType: EnumFormBaseContolType.TEXTBOX,
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_CODE,
            field: 'code',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: true,
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_NAME,
            field: 'name',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
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
            label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_GROUP_NAME,
            field: 'insGroupId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.groupOptions$,
            getByIdObject$: this.groupGetByIdObject$,
            getByIdApi: this.groupGetByIdApi,
            shownFrom: 'name',
            readonly: false,
            type: 'string',
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
            label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_CAL_DATE_TYPE,
            field: 'calDateType',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.calDateTypeOptions$,
            getByIdObject$: this.calDateTypeGetByIdObject$,
            getByIdApi: this.calDateTypeGetByIdApi,
            shownFrom: 'name',
            readonly: false,
            type: 'string',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_CODE,
            field: 'isActive',
            value: 'true',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            hidden: true,
            readonly: true,
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_TOTAL_DAY,
            field: 'totalDay',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'min',
                validator: Validators.min(0),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_BENEFITS_LEVELS,
            field: 'benefitsLevels',
            value: 100,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'min',
                validator: Validators.min(0),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              },
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
        ],
      ],
    },
  ];

  constructor(public override dialogService: DialogService, private irsServices: InsRegimesEditService) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES;

    this.crud = {
      c: api.INS_REGIMES_CREATE,
      r: api.INS_REGIMES_READ,
      u: api.INS_REGIMES_UPDATE,
      d: api.INS_REGIMES_DELETE_IDS,
    };
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subscriptions.push(
      this.irsServices
        .CreateNewCode()
        .pipe(
          map((f: any) => {
            let options: string = '';
            options = f.body.innerBody.code;
            return options;
          }),
        )
        .subscribe((response: any) => {
          console.log(this.form.get('code'));
          if (this.form.get('code')?.value == '') this.form.get('code')?.patchValue(response);
        }),
    );
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.subscriptions.push(
        this.irsServices
          .GetInsGroup()
          .pipe(
            map((x: any) => {
              if (x.ok && x.status === 200) {
                const options: { value: number; text: string }[] = [];
                x.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name,
                  });
                });
                return options;
              } else {
                return [];
              }
            }),
          )
          .subscribe((response) => {
            this.groupOptions$.next(response);
            this.loading = false;
          }),

        this.irsServices
          .GetCalDateType()
          .pipe(
            map((x: any) => {
              if (x.ok && x.status === 200) {
                const options: { value: number; text: string }[] = [];
                x.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name,
                  });
                });
                return options;
              } else {
                return [];
              }
            }),
          )
          .subscribe((response) => {
            this.calDateTypeOptions$.next(response);
            this.loading = false;
          }),
      );
    });
  }
}
