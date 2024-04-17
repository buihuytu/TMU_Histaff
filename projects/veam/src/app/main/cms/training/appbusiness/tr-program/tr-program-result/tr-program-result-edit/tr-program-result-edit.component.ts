import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, FormGroup, FormsModule } from '@angular/forms';
import { CorePageEditComponent, BaseEditComponent, ICorePageEditColumnComposition, ICorePageEditCRUD,ICoreDropdownOption, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, MultiLanguageService, AppService } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, map } from 'rxjs';
import { TrProgramService } from '../../tr-program.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-tr-program-result-edit',
  standalone: true,
  imports: [
    CommonModule,
    CorePageEditComponent,
    FormsModule
  ],
  templateUrl: './tr-program-result-edit.component.html',
  styleUrl: './tr-program-result-edit.component.scss'
})
export class TrProgramResultEditComponent extends BaseEditComponent {
  override entityTable = "TR_PREPARE";

  loading: boolean = false;

  subsctiptions: Subscription[] = [];

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  subscriptions: Subscription[] = [];


  /*--------------------------- Employee Seeker ---------------------------*/
  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  /*--------------------------- Dropdown List ---------------------------*/
  prepareListGetByIdApi = api.SYS_OTHERLIST_READ;
  prepareListGetByIdObject$ = new BehaviorSubject<any>(null);
  prepareListOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

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
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'trProgramId',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_LABEL_TR_PREPARE_CODE_PREPARE_NAME,
              field: 'trListPrepareId',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.prepareListGetByIdApi,
              getByIdObject$: this.prepareListGetByIdObject$,
              dropdownOptions$: this.prepareListOptions$,
              shownFrom: 'name',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_LABEL_TR_PREPARE_EMPLOYEE_CODE,   // Mã NV
              field: 'employeeId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,

              /* 
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
              */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              getByIdObject$: this.employeeGetByIdObject$,
              getByIdApi: this.employeeGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'code',
              alsoBindTo: [
                { takeFrom: 'fullname', bindTo: 'employeeName' },
              ],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
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
              label: EnumTranslateKey.UI_LABEL_TR_PREPARE_EMPLOYEE_NAME,
              field: 'employeeName',
              value: '',
              type: 'text',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
          ],
        ]
      },
    ];
  constructor(
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private appService: AppService, // CoreService is DEPRECATED!!!
    private trProgramService: TrProgramService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PREPARE;

    this.crud = {
      c: api.TR_PREPARE_CREATE,
      r: api.TR_PREPARE_READ,
      u: api.TR_PREPARE_UPDATE,
      d: api.TR_PREPARE_DELETE,
    };
  }

  getListDesc() {
    this.subscriptions.push(
      this.trProgramService
        .getALLListPrepareByKey()
        .pipe(
          map((x: any) => {
            const options: { value: number; text: string; code: string }[] = [];
            options.push({
              value: Number(),
              text: '',
              code: '',
            })
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
                code: g.code,
              });
            });
            return options;
          })
        )
        .subscribe((response) => {
          this.prepareListOptions$.next(response);
        })
    );
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.getListDesc();
    if (this.trProgramService.trProgramId$.value != null) {
      this.form.get('trProgramId')?.patchValue(this.trProgramService.trProgramId$.value);
    }
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }
}
