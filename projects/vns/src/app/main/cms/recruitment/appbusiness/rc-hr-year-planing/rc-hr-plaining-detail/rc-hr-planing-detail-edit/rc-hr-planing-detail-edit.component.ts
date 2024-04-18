import { AfterViewInit, Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { RcHrYearPlaningService } from '../rc-hr-year-plaining.service';
import { BaseEditComponent, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, CoreFormService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-rc-hr-planing-detail-edit',
  templateUrl: './rc-hr-planing-detail-edit.component.html',
  styleUrl: './rc-hr-planing-detail-edit.component.scss'
})
export class RcHrPlaningDetailEditComponent extends BaseEditComponent implements AfterViewInit {

  override entityTable = 'RC_HR_PLANING_DETAIL';
  subscriptions: Subscription[] = [];
  loading: boolean = false;

  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;

  id!: number;

  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_ID,
            field: 'yearPlanId',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_ID,
            field: 'orgId',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_YEAR_BOUNDARY,
            field: 'year',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: true,
            type: 'text',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_VERSION,
            field: 'version',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: true,
            type: 'text',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EFFECT_DATE,
            field: 'effectDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            disabled: true,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_ORG_NAME,
            field: 'orgName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: true,
            type: 'text',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_QUICK_BOUNDARIES,
            field: 'quickBoundary',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_QUICK,
            field: 'quick',
            value: '',
            controlType: EnumFormBaseContolType.BUTTON,
            type: 'button',
            click$: new BehaviorSubject<any>(null),
          },
        ],
        [
          {
            flexSize: 2,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T1,
            field: 'month1',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: false,
            type: 'number',
          },
          {
            flexSize: 2,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T2,
            field: 'month2',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: false,
            type: 'number',
          },
          {
            flexSize: 2,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T3,
            field: 'month3',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: false,
            type: 'number',
          },
          {
            flexSize: 2,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T4,
            field: 'month4',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: false,
            type: 'number',
          },
          {
            flexSize: 2,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T5,
            field: 'month5',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: false,
            type: 'number',
          },
          {
            flexSize: 2,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T6,
            field: 'month6',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: false,
            type: 'number',
          },
        ],
        [
          {
            flexSize: 2,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T7,
            field: 'month7',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: false,
            type: 'number',
          },
          {
            flexSize: 2,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T8,
            field: 'month8',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: false,
            type: 'number',
          },
          {
            flexSize: 2,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T9,
            field: 'month9',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: false,
            type: 'number',
          },
          {
            flexSize: 2,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T10,
            field: 'month10',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: false,
            type: 'number',
          },
          {
            flexSize: 2,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T11,
            field: 'month11',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: false,
            type: 'number',
          },
          {
            flexSize: 2,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T12,
            field: 'month12',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: false,
            type: 'text',
          },
        ],
      ],
    },
  ];

  constructor(
    public override dialogService: DialogService,
    public appService: AppService,
    private route: ActivatedRoute,
    private coreFormService: CoreFormService,
    private rcHrYearPlaningService: RcHrYearPlaningService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_DETAIL;

    this.crud = {
      c: api.RC_PLANING_DETAIL_CREATE,
      r: api.RC_PLANING_DETAIL_READ,
      u: api.RC_PLANING_DETAIL_UPDATE,
      d: api.RC_PLANING_DETAIL_DELETE_IDS,
    };

    this.id = Number(atob(this.route.snapshot.params['id']));
  }
  ngAfterViewInit(): void {
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    const yearPlan = this.rcHrYearPlaningService.yearPlaning$.value
    this.form.patchValue(yearPlan);
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnInit(): void {
    this.loading = true;

    this.coreFormService.getFormBaseControlByName(this.sections, 'quick')?.click$?.subscribe(x => {
      const quickBoundary = this.form?.get('quickBoundary')?.value;
      if (!!quickBoundary) {
        for (let i = 1; i < 13; i++) {
          this.form.get(`month${i}`)?.setValue(quickBoundary);
        }
      }
    })
  }

}
