import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, AbstractControl, FormGroup } from '@angular/forms';
import { Subscription, BehaviorSubject, forkJoin } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { FamilyEditService } from '../../../../../../../../profile/appbusiness/family/family-edit/family-edit.service';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-level-info-edit',
  standalone: false,
  templateUrl: './level-info-edit.component.html',
  styleUrl: './level-info-edit.component.scss'
})
export class LevelInfoEditComponent extends BaseEditComponent implements OnInit, OnDestroy{
  override entityTable = "RC_CANDIDATE_CV";

  subscriptions: Subscription[] = []
  
  educationLevelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  educationLevelGetById$ = new BehaviorSubject<any>(null);
  educationLevelGetByIdApi = api.SYS_OTHERLIST_READ;

  learningLevelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  learningLevelGetById$ = new BehaviorSubject<any>(null);
  learningLevelGetByIdApi = api.SYS_OTHERLIST_READ;

  trainingFormOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  trainingFormGetById$ = new BehaviorSubject<any>(null);
  trainingFormGetByIdApi = api.SYS_OTHERLIST_READ;

  majorIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  majorIdGetById$ = new BehaviorSubject<any>(null);
  majorIdGetByIdApi = api.SYS_OTHERLIST_READ;

  graduateSchoolOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  graduateSchoolGetById$ = new BehaviorSubject<any>(null);
  graduateSchoolGetByIdApi = api.SYS_OTHERLIST_READ;

  rcComputerLevelIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  rcComputerLevelIdGetById$ = new BehaviorSubject<any>(null);
  rcComputerLevelIdGetByIdApi = api.SYS_OTHERLIST_READ;

  typeClassificationIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  typeClassificationIdGetById$ = new BehaviorSubject<any>(null);
  typeClassificationIdGetByIdApi = api.SYS_OTHERLIST_READ;

  languageOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  languageGetById$ = new BehaviorSubject<any>(null);
  languageGetByIdApi = api.SYS_OTHERLIST_READ;

  languageLevelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  languageLevelGetById$ = new BehaviorSubject<any>(null);
  languageLevelGetByIdApi = api.SYS_OTHERLIST_READ;

  captionCode!: EnumTranslateKey.UI_COMPONENT_TITLE_LEVEL_INFO_EDIT;
  crud!: ICorePageEditCRUD;

  apiParams : string[] = ['EDUCATION_LEVEL', 'LEARNING_LEVEL', 'MAJOR', 'TRAINING_FORM', 'GRADUATE_SCHOOL', 'RC_COMPUTER_LEVEL', 'DESC_CLASSIFICATION','LANGUAGE', 'LANGUAGE_LEVEL' ];
  optionsMap: { [key: string]: BehaviorSubject<any[]> } = {};
  sections: ICoreFormSection[] =
    [
      /* --------------- Thông tin cá nhân --------------- */
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_PERSONAL_INFORMATION,
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
            //Trình độ văn hóa - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_EDUCATION_LEVEL,
              field: 'educationLevelId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.educationLevelGetById$,
              getByIdApi: this.educationLevelGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              type: 'number',
              dropdownOptions$: this.educationLevelOptions$,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            //Trình độ học vấn - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LEARNING_LEVEL,
              field: 'learningLevelId',
              value: '',
              type: 'number',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.learningLevelGetById$,
              getByIdApi: this.learningLevelGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.learningLevelOptions$,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            //Trường học - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SCHOOLE,
              field: 'graduateSchoolId',
              value: '',
              type: 'number',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.graduateSchoolGetById$,
              getByIdApi: this.graduateSchoolGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.graduateSchoolOptions$,
            }
          ],
          [
            //Chuyên ngành - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MAJOR_ID,
              field: 'majorId',
              value: '',
              type: 'number',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.majorIdGetById$,
              getByIdApi: this.majorIdGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.majorIdOptions$,
            },
            //Năm tốt nghiệp - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_TITLE_HU_CERTIFICATE_EDIT_YEAR,
              field: 'yearGraduation',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            //xếp loại - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_RATING,
              field: 'rating',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
            },
          ],
        ]
      },
      /* --------------- Trình độ tin học --------------- */
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_CONTACT_INFO,
        rows: [
          [
            // trình độ tin học - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_COMPUTER_SKILL,
              controlType: EnumFormBaseContolType.DROPDOWN,
              field: 'rcComputerLevelId',
              type: 'number',
              value: '',
              getByIdObject$: this.rcComputerLevelIdGetById$,
              getByIdApi: this.rcComputerLevelIdGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.rcComputerLevelIdOptions$,
            },
            // Loại xếp loại/chứng chỉ - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_TYPE_CLASSIFICATION_ID,
              field: 'typeClassificationId',
              controlType: EnumFormBaseContolType.DROPDOWN,
              type: 'number',
              value: '',
              getByIdObject$: this.typeClassificationIdGetById$,
              getByIdApi: this.typeClassificationIdGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.typeClassificationIdOptions$,
            },
          ],
        ]
      },
      /* --------------- Trình độ ngoại ngữ --------------- */
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_CONTACT_INFO,
        rows: [
          [
            // trình độ tin học - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LANGUAGE_1,
              controlType: EnumFormBaseContolType.DROPDOWN,
              field: 'languageId',
              type: 'number',
              value: '',
              getByIdObject$: this.languageGetById$,
              getByIdApi: this.languageGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.languageOptions$,
            },
            // Trình độ ngoại ngữ - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LANGUAGE_LEVEL_1,
              field: 'languageLevelId',
              controlType: EnumFormBaseContolType.DROPDOWN,
              type: 'number',
              value: '',
              getByIdObject$: this.languageLevelGetById$,
              getByIdApi: this.languageLevelGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.languageLevelOptions$,
            },
            // Điểm số/xếp loại - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_MARK,
              field: 'mark',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              value: '',
            },
          ],
        ]
      }
    ];

  constructor(
    public override dialogService: DialogService,
    private appService: AppService,
    private familyEditService : FamilyEditService,
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_LEVEL_INFO_EDIT;

    this.crud = {
      r: api.RC_CANDIDATE_CV_GET_LEVEL_INFO_BY_ID,
      u: api.RC_CANDIDATE_CV_UPDATE_LEVEL_INFO,
    };

  }

  ngOnInit(): void {
  }

  getAllValueDropdown() {
    forkJoin(this.apiParams.map(param => this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + param)))
      .subscribe(responses => {
        responses.forEach((item, index) => {
          if (item.body.statusCode == 200 && item.ok == true) {
            const options: { value: number | null; text: string; }[] = [];
            item.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              });
            });
            const param = this.apiParams[index];
            switch (param) {
              case 'EDUCATION_LEVEL': // Trình độ văn hóa
                this.educationLevelOptions$.next(options);
                break;
              case 'LEARNING_LEVEL':  // Trình độ học vấn 
                this.learningLevelOptions$.next(options);
                break;
              case 'GRADUATE_SCHOOL': // Trường học
                this.graduateSchoolOptions$.next(options);
                break;
              case 'MAJOR':   // Chuyên ngành
                this.majorIdOptions$.next(options);
                break;
              case 'RC_COMPUTER_LEVEL':   // Trình độ tin học
                this.rcComputerLevelIdOptions$.next(options);
                break;
              case 'DESC_CLASSIFICATION': // Loại chứng chỉ
                this.typeClassificationIdOptions$.next(options);
                break;
              case 'LANGUAGE':  // Ngoại ngữ 
                this.languageOptions$.next(options);
                break;
              case 'LANGUAGE_LEVEL':  // Trình độ ngoại ngữ
                this.languageLevelOptions$.next(options);
                break;
              default:
                break;
            }
          }

        });
      });
  }

 

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    console.log(this.form)
    
  }

  ngAfterViewInit(){
    this.getAllValueDropdown();
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
  }
}
