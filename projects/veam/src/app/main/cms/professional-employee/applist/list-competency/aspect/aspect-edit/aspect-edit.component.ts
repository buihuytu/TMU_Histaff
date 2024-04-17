import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ListCompetencyService } from '../../list-competency.service';
import { CorePageEditComponent, BaseEditComponent, ICorePageEditCRUD, ICoreDropdownOption, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, CoreButtonGroupService, EnumCoreButtonVNSCode } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-aspect-edit',
  standalone: true,
  imports: [
    CorePageEditComponent,
  ],
  templateUrl: './aspect-edit.component.html',
  styleUrl: './aspect-edit.component.scss'
})
export class AspectEditComponent extends BaseEditComponent implements AfterViewInit, OnDestroy {
  loading: boolean = false;
  override entityTable = 'HU_COMPETENCY_ASPECT';

  captionCode!: EnumTranslateKey;
  subscriptions: Subscription[] = [];
  crud!: ICorePageEditCRUD;

  competencyOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  competencyGetByIdObject$ = new BehaviorSubject<any>(null);
  competencyGetByIdApi = api.HU_COMPETENCY_COMPETENCY_READ;

  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_ID,
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            field: 'id',
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_CODE_ASPECT,
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            field: 'code',
            readonly: true,
            type: 'text',
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
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_NAME_ASPECT,
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            field: 'name',
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
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_NAME_COMPETENCY,
            field: 'competencyId',
            value: '',
            getByIdObject$: this.competencyGetByIdObject$,
            getByIdApi: this.competencyGetByIdApi,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'name',
            dropdownOptions$: this.competencyOptions$,
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COMPETENCY_GROUP_NAME,
            field: 'competencyGroupName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: true,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          }
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_DESCRIBE_LEVEL,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTAREA,
            type: 'text',
            textareaRows: 2,
          },
        ],
      ],
    },
  ];
  insteances!: number;
  constructor(
    public override dialogService: DialogService,
    public listCompetencyService: ListCompetencyService,
    public appServices: AppService,
    private coreButtonGroupService: CoreButtonGroupService,
    private route: ActivatedRoute,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_ASPECT;

    this.crud = {
      c: api.HU_COMPETENCY_ASPECT_CREATE,
      r: api.HU_COMPETENCY_ASPECT_READ,
      u: api.HU_COMPETENCY_ASPECT_UPDATE,
      d: api.HU_COMPETENCY_ASPECT_DELETE,
    };
    this.insteances = this.route.snapshot.params['listInstance'];
  }
  ngOnDestroy(): void {
    this.coreButtonGroupService.instances.push({
      instanceNumber: this.insteances,
      mustBeHidden$: new BehaviorSubject<EnumCoreButtonVNSCode[]>([]),
    });
  }
  ngAfterViewInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.listCompetencyService.getAllCompetency().pipe().subscribe((x) => {
        if (x.ok && x.status === 200) {
          const options: { value: number; text: string }[] = [];
          x.body.innerBody.map((y: any) => {
            options.push({
              value: y.id,
              text: y.name,
            });
          })
          this.competencyOptions$.next(options);
        }
      }),

        this.appServices.get(api.HU_COMPETENCY_ASPECT_CREATE_NEW_CODE).pipe().subscribe((x) => {
          if (!!x.ok && x.status === 200) {
            const body = x.body.innerBody;
            if (!!this.form.get('id')?.value) this.form.get('code')?.setValue(body.code);
          }
        })
    })
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  ngOnInit(): void { }
}
