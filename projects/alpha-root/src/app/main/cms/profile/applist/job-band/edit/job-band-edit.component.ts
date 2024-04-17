import { Component, ViewEncapsulation } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreChecklistOption, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
  selector: "app-job-band-edit",
  templateUrl: "./job-band-edit.component.html",
  styleUrls: ["./job-band-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class JobBandEditComponent extends BaseEditComponent {


  loading: boolean = false;
  override entityTable = "HU_JOB_BAND";
  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  groupJobBandOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  subsctiptions: Subscription[] = [];

  groupJobBandGetByIdObject$ = new BehaviorSubject<any>(null);
  groupJobBandGetByIdApi = api.HU_GROUP_POSITION_READ;

  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_BAND_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              hidden : true
            }
          ],
         
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_BAND_NAMEVN,
              field: 'nameVn',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },            
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_BAND_NAMEEN,
              field: 'nameEn',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },            
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_BAND_LEVELFROM,
              field: 'levelFrom',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },            
          ],
        ]
      }
    ];
  scaleOptions$: BehaviorSubject<ICoreDropdownOption[]> | undefined;

  constructor(
    public override dialogService: DialogService,
    private appService: AppService // CoreService is DEPRECATED!!!
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_JOB_BAND_EDIT;

    this.crud = {
      c: api.HU_JOB_BAND_CREATE,
      r: api.HU_JOB_BAND_READ,
      u: api.HU_JOB_BAND_UPDATE,
      d: api.HU_JOB_BAND_DELETE,
    };

  }

  ngOnInit(): void {
    this.loading = true;
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}
