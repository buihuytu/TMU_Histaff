import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, AbstractControl, FormGroup } from '@angular/forms';
import { Subscription, BehaviorSubject, forkJoin } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditCRUD, ICoreDropdownOption, ICoreFormSection, EnumFormBaseContolType, EnumCoreTablePipeType, DialogService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';
//import { FamilyEditService } from '../../../../../../../../../cms/profile/appbusiness/family/family-edit/family-edit.service';

@Component({
  selector: 'app-wish-edit',
  standalone: false,
  templateUrl: './wish-edit.component.html',
  styleUrl: './wish-edit.component.scss'
})
export class WishEditComponent extends BaseEditComponent implements OnInit, OnDestroy {
  override entityTable = "RC_CANDIDATE_CV";

  subscriptions: Subscription[] = []
  
  captionCode!: EnumTranslateKey.UI_COMPONENT_TITLE_WISH_EDIT;
  crud!: ICorePageEditCRUD;

  posWish1Options$ = new BehaviorSubject<ICoreDropdownOption[]>([])
  posWish1GetById$ = new BehaviorSubject<any>(null)
  posWish1GetByIdApi = api.HU_POSITION_READ

  posWish2Options$ = new BehaviorSubject<ICoreDropdownOption[]>([])
  posWish2GetById$ = new BehaviorSubject<any>(null)
  posWish2GetByIdApi = api.HU_POSITION_READ

  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden : true
            },
          ],
          [
            // Vị trí mong muốn 1 - RC_CANDIDATE_CV
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_POS_WISH1,
              field: 'posWish1Id',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.posWish1GetById$,
              getByIdApi: this.posWish1GetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              type: 'number',
              dropdownOptions$: this.posWish1Options$,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            // Vị trí mong muốn 2 - RC_CANDIDATE_CV
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_POS_WISH2,
              field: 'posWish2Id',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.posWish2GetById$,
              getByIdApi: this.posWish2GetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              type: 'number',
              dropdownOptions$: this.posWish2Options$,
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
            // Mức lương thử việc - RC_CANDIDATE_CV
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_PROBATION_SALARY,
              field: 'probationSalary',
              value: '',
              type: 'number',
              controlType: EnumFormBaseContolType.CURRENCY,
            },
            // Mức lương mong muốn - RC_CANDIDATE_CV
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_WISH_SALARY,
              field: 'wishSalary',
              value: '',
              type: 'number',
              controlType: EnumFormBaseContolType.CURRENCY,
            },
          ],
          [
            // Nơi làm việc mong muốn - RC_CANDIDATE_CV
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_DESIRED_WORKPLACE,
              field: 'desiredWorkplace',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.TEXTAREA,
            },
          ],
          [
            // Ngày bắt đầu làm việc - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_STARTDATE,
              field: 'startDateWork',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              pipe: EnumCoreTablePipeType.DATE,
            },
            // Cấp bậc mong muốn - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_LEVEL_DESIRED,
              field: 'levelDesired',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            // Số năm kinh nghiệm - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_NUM_EXPERIENCE,
              field: 'numExperience',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
          ],
          [
            // Đã từng làm HSV/HV - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_IS_HSV_HV,
              field: 'isHsvHv',
              value: false,
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'bool',
            },
          ],
          [
            // Cấp bậc mong muốn - RC_CANDIDATE_CV
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_OTHER_SUGGESTIONS,
              field: 'otherSuggestions',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.TEXTAREA,
            },
          ],
        ]
      },
    ];

  constructor(
    public override dialogService: DialogService,
    private appService: AppService,
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_WISH_EDIT;

    this.crud = {
      r: api.RC_CANDIDATE_CV_GET_WISH_BY_ID,
      u: api.RC_CANDIDATE_CV_UPDATE_WISH,
    };

  }

  ngOnInit(): void {
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    console.log(this.form)
    
  }

  ngAfterViewInit(){
    // Vị trí mong muốn 1 
    this.form.get('posWish1Id')?.valueChanges.subscribe(x => {
      if (!!x) {
        this.subscriptions.push( // <== Inner push
            this.appService
            .get(api.HU_POSITION_READ + x)
            .subscribe((res: any) => {
              if (!!res.ok && res.status === 200) {
                const body: IFormatedResponse = res.body
                if (body.statusCode === 200 && !!body.innerBody) {
                  const options: { value: number | null; text: string }[] = [];
                  res.body.innerBody.map((g: any) => {
                    options.push({
                      value: g.id,
                      text: g.name,
                    })
                  })
                  this.posWish1Options$.next(options);
                }
              }
            })
        )
      }
    })!

    // Vị trí mong muốn 2
    this.form.get('posWish2OId')?.valueChanges.subscribe(x => {
      if (!!x) {
        this.subscriptions.push( // <== Inner push
            this.appService
            .get(api.HU_POSITION_READ + x)
            .subscribe((res: any) => {
              if (!!res.ok && res.status === 200) {
                const body: IFormatedResponse = res.body
                if (body.statusCode === 200 && !!body.innerBody) {
                  const options: { value: number | null; text: string }[] = [];
                  res.body.innerBody.map((g: any) => {
                    options.push({
                      value: g.id,
                      text: g.name,
                    })
                  })
                  this.posWish2Options$.next(options);
                }
              }
            })
        )
      }
    })!
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
  }
}
