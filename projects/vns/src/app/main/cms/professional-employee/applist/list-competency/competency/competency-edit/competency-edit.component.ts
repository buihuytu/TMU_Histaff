import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageEditComponent, BaseEditComponent, ICorePageEditCRUD, ICoreDropdownOption, ICoreFormSection, EnumFormBaseContolType, DialogService } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, map } from 'rxjs';
import { ListCompetencyService } from '../../list-competency.service';
import { TrainingCenterEditService } from '../../../../../training/appbusiness/trainingcenter/edit/training-center.edit.service';

@Component({
  selector: 'app-competency-edit',
  standalone: true,
  imports: [
    CorePageEditComponent
  ],
  templateUrl: './competency-edit.component.html',
  styleUrl: './competency-edit.component.scss'
})
export class CompetencyEditComponent extends BaseEditComponent implements OnInit, OnDestroy, AfterViewInit{
  loading: boolean = false;
  override entityTable = 'HU_COMPETENCY_GROUP';

  defPhone: string = '';
  defPhoneContactPerson: string = '';

  captionCode!: EnumTranslateKey;
  subscriptions: Subscription[] = [];
  crud!: ICorePageEditCRUD;

  // Drop down list
  competencyGroupGetByIdApi = api.HU_COMPETENCY_GROUP_READ;
  competencyGroupGetByIdObject$ = new BehaviorSubject<any>(null);
  competencyGroupOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

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
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COMPETENCY_GROUP_COMPETENCY,
            field: 'competencyGroupId',
            value: '',
            type: 'string',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdApi: this.competencyGroupGetByIdApi,
            getByIdObject$: this.competencyGroupGetByIdObject$,
            dropdownOptions$: this.competencyGroupOptions$,
            shownFrom: 'name',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COMPETENCY_CODE,
            field: 'code',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COMPETENCY_NAME,
            field: 'name',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ],
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COMPETENCY_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
      ],
    },
  ];

  constructor(
    public override dialogService: DialogService,
    public trainingCenterEditService: TrainingCenterEditService,
    public listCompetencyService: ListCompetencyService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMPETENCY;

    this.crud = {
      c: api.HU_COMPETENCY_CREATE,
      r: api.HU_COMPETENCY_READ,
      u: api.HU_COMPETENCY_UPDATE,
      d: api.HU_COMPETENCY_DELETE,
    };
  }
  
  getListCompetencyGroup(){
    this.subscriptions.push(
      this.listCompetencyService
        .getAllGroup()
        .pipe(
          map((x: any) => {
            const options: { value: number; text: string; }[] = [];
            options.push({
              value: Number(),
              text: '',
            })
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
              });
            });
            return options;
          })
        )
        .subscribe((response) => {
          this.competencyGroupOptions$.next(response);
        })
    );
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  
  ngOnInit(): void { 

  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getListCompetencyGroup();
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }
}
