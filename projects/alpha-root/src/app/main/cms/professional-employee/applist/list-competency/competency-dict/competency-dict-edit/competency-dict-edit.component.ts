import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ListCompetencyService } from '../../list-competency.service';
import { ActivatedRoute } from '@angular/router';
import { CorePageEditComponent, BaseEditComponent, ICorePageEditCRUD, ICoreDropdownOption, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, CoreButtonGroupService, EnumCoreButtonVNSCode } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-competency-dict-edit',
  standalone: true,
  imports: [
    CorePageEditComponent,
  ],
  templateUrl: './competency-dict-edit.component.html',
  styleUrl: './competency-dict-edit.component.scss'
})
export class CompetencyDictEditComponent extends BaseEditComponent implements AfterViewInit, OnDestroy {
  loading: boolean = false;
  override entityTable = 'HU_COMPETENCY_DICT';

  captionCode!: EnumTranslateKey;
  subscriptions: Subscription[] = [];
  crud!: ICorePageEditCRUD;

  groupOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupGetByIdObject$ = new BehaviorSubject<any>(null);
  groupGetByIdApi = api.HU_COMPETENCY_GROUP_READ;

  competencyOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  competencyGetByIdObject$ = new BehaviorSubject<any>(null);
  competencyGetByIdApi = api.HU_COMPETENCY_COMPETENCY_READ;

  aspectOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  aspectGetByIdObject$ = new BehaviorSubject<any>(null);
  aspectGetByIdApi = api.HU_COMPETENCY_ASPECT_READ;

  levelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  levelGetByIdObject$ = new BehaviorSubject<any>(null);
  levelGetByIdApi = api.SYS_OTHERLIST_READ;

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
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_GROUP,
            field: 'competencyGroupId',
            value: '',
            getByIdObject$: this.groupGetByIdObject$,
            getByIdApi: this.groupGetByIdApi,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'name',
            dropdownOptions$: this.groupOptions$,
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
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_NAME_ASPECT,
            field: 'competencyAspectId',
            value: '',
            getByIdObject$: this.aspectGetByIdObject$,
            getByIdApi: this.aspectGetByIdApi,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'name',
            dropdownOptions$: this.aspectOptions$,
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
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_LEVEL,
            field: 'levelNumber',
            value: '',
            getByIdObject$: this.levelGetByIdObject$,
            getByIdApi: this.levelGetByIdApi,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'name',
            dropdownOptions$: this.levelOptions$,
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

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TRAINING_CENTER_EDIT;

    this.crud = {
      c: api.COMPETENCY_DICTIONARY_CREATE,
      r: api.COMPETENCY_DICTIONARY_READ,
      u: api.COMPETENCY_DICTIONARY_UPDATE,
      d: api.COMPETENCY_DICTIONARY_DELETE,
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
      this.listCompetencyService.getAllGroup().pipe().subscribe((x) => {
        if (x.ok && x.status === 200) {
          const options: { value: number; text: string }[] = [];
          x.body.innerBody.map((y: any) => {
            options.push({
              value: y.id,
              text: y.name,
            });
          })
          this.groupOptions$.next(options);
        }
      })

      this.listCompetencyService.getAllAspect().pipe().subscribe((x) => {
        if (x.ok && x.status === 200) {
          const options: { value: number; text: string }[] = [];
          x.body.innerBody.map((y: any) => {
            options.push({
              value: y.id,
              text: y.name,
            });
          })
          this.aspectOptions$.next(options);
        }
      })

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
      })

      this.appServices.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'COMPETENCE').pipe().subscribe((x) => {
        if (x.ok && x.status === 200) {
          const options: { value: number; text: string }[] = [];
          x.body.innerBody.map((y: any) => {
            options.push({
              value: y.id,
              text: y.name,
            });
          })
          this.levelOptions$.next(options);
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
