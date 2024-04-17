import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TrainingCenterEditService } from '../../../../../../cms/training/appbusiness/trainingcenter/edit/training-center.edit.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageEditComponent, BaseEditComponent, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService } from 'ngx-histaff-alpha';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-group-competency-edit',
  standalone: true,
  imports: [
    CorePageEditComponent
  ],
  templateUrl: './group-competency-edit.component.html',
  styleUrl: './group-competency-edit.component.scss'
})
export class GroupCompetencyEditComponent extends BaseEditComponent {
  loading: boolean = false;
  override entityTable = 'HU_COMPETENCY_GROUP';

  defPhone: string = '';
  defPhoneContactPerson: string = '';

  captionCode!: EnumTranslateKey;
  subscriptions: Subscription[] = [];
  crud!: ICorePageEditCRUD;
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
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COMPETENCY_GROUP_CODE,
            field: 'code',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COMPETENCY_GROUP_NAME,
            field: 'name',
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
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMPETENCY_GROUP;

    this.crud = {
      c: api.HU_COMPETENCY_GROUP_CREATE,
      r: api.HU_COMPETENCY_GROUP_READ,
      u: api.HU_COMPETENCY_GROUP_UPDATE,
      d: api.HU_COMPETENCY_GROUP_DELETE,
    };
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
