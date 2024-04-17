import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, forkJoin } from 'rxjs';
import { PersonnelCenterService } from '../../../../personnel-center.service';

@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.scss']
})
export class EducationEditComponent extends BaseEditComponent implements OnInit, OnDestroy {

  override entityTable = "HU_EMPLOYEE_CV";
  apiParams: string[] = ['EDUCATION_LEVEL', 'LEARNING_LEVEL', 'MAJOR', 'TRAINING_FORM', 'GRADUATE_SCHOOL', 'LANGUAGE','LANGUAGE_LEVEL', "BLX", "RC_COMPUTER_LEVEL"];

  subscriptions: Subscription[] = []

  educationLevelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  educationLevelGetById$ = new BehaviorSubject<any>(null);
  educationLevelGetByIdApi = api.SYS_OTHERLIST_READ;

  learningLevelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  learningLevelGetById$ = new BehaviorSubject<any>(null);
  learningLevelGetByIdApi = api.SYS_OTHERLIST_READ;

  

  qualificationOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  qualificationGetById$ = new BehaviorSubject<any>(null);
  qualificationGetByIdApi = api.SYS_OTHERLIST_READ;

  qualificationOptions2$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  qualificationGetById2$ = new BehaviorSubject<any>(null);
  qualificationGetByIdApi2 = api.SYS_OTHERLIST_READ;

  qualificationOptions3$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  qualificationGetById3$ = new BehaviorSubject<any>(null);
  qualificationGetByIdApi3 = api.SYS_OTHERLIST_READ;

  trainingFormOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  trainingFormGetById$ = new BehaviorSubject<any>(null);
  trainingFormGetByIdApi = api.SYS_OTHERLIST_READ;

  trainingFormOptions2$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  trainingFormGetById2$ = new BehaviorSubject<any>(null);
  trainingFormGetByIdApi2 = api.SYS_OTHERLIST_READ;

  trainingFormOptions3$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  trainingFormGetById3$ = new BehaviorSubject<any>(null);
  trainingFormGetByIdApi3 = api.SYS_OTHERLIST_READ;

  graduateSchoolOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  graduateSchoolGetById$ = new BehaviorSubject<any>(null);
  graduateSchoolGetByIdApi = api.SYS_OTHERLIST_READ;

  graduateSchoolOptions2$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  graduateSchoolGetById2$ = new BehaviorSubject<any>(null);
  graduateSchoolGetByIdApi2 = api.SYS_OTHERLIST_READ;

  graduateSchoolOptions3$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  graduateSchoolGetById3$ = new BehaviorSubject<any>(null);
  graduateSchoolGetByIdApi3 = api.SYS_OTHERLIST_READ;


  languageOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  languageGetById$ = new BehaviorSubject<any>(null);
  languageGetByIdApi = api.SYS_OTHERLIST_READ;
  languageOptions2$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  languageGetById2$ = new BehaviorSubject<any>(null);
  languageGetByIdApi2 = api.SYS_OTHERLIST_READ;
  languageOptions3$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  languageGetById3$ = new BehaviorSubject<any>(null);
  languageGetByIdApi3 = api.SYS_OTHERLIST_READ;

  languageLevelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  languageLevelGetById$ = new BehaviorSubject<any>(null);
  languageLevelGetByIdApi = api.SYS_OTHERLIST_READ;

  languageLevelOptions2$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  languageLevelGetById2$ = new BehaviorSubject<any>(null);
  languageLevelGetByIdApi2 = api.SYS_OTHERLIST_READ;

  languageLevelOptions3$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  languageLevelGetById3$ = new BehaviorSubject<any>(null);
  languageLevelGetByIdApi3 = api.SYS_OTHERLIST_READ;

  computerSkillGetByIdObject$ = new BehaviorSubject<any>(null);
  computerSkillGetByIdApi = api.HU_EMPLOYEE_CV_GET_LICENSE_BY_ID;
  computerSkillOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  
  licenseGetByIdObject$ = new BehaviorSubject<any>(null);
  licenseGetByIdApi = api.HU_EMPLOYEE_CV_GET_LICENSE_BY_ID;
  licenseOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  
  captionCode : EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_EDUCATION_EDIT;
  crud!: ICorePageEditCRUD;
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
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_EDUCATION_LEVEL,
              field: 'educationLevelId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.educationLevelGetById$,
              getByIdApi: this.educationLevelGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.educationLevelOptions$,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ],
            },
            {
              // trình độ tin học
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_COMPUTER_SKILL,
              field: 'computerSkillId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.computerSkillGetByIdObject$,
              getByIdApi: this.computerSkillGetByIdApi,
              dropdownOptions$: this.computerSkillOptions$,
              shownFrom: 'name'
            },
            {
              // bằng lái xe
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LICENSE,
              field: 'licenseId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.licenseGetByIdObject$,
              getByIdApi: this.licenseGetByIdApi,
              dropdownOptions$: this.licenseOptions$,
              shownFrom: 'name'
            },
            {
              // bằng lái xe
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_LEVEL_ID,
              field: 'levelId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.learningLevelGetById$,
              getByIdApi: this.learningLevelGetByIdApi,
              dropdownOptions$: this.learningLevelOptions$,
              shownFrom: 'name'
            }
          ]
        ]
      },
    ];
  constructor(
    public override dialogService: DialogService,
    private personnelCenterService: PersonnelCenterService,
    private appService: AppService
  ) {

    super(dialogService);


    this.crud = {
      r: api.HU_EMPLOYEE_CV_GET_EDUCATION_ID,
      u: api.HU_EMPLOYEE_CV_UPDATE_EDUCATION_ID,
    };

  }

  ngOnInit(): void {
    this.getAllValueDropdown()
  }

  getAllValueDropdown() {
      forkJoin(this.apiParams.map(param => this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + param)))
        .subscribe(responses => {
          responses.forEach((item, index) => {
            if (item.body.statusCode == 200 && item.ok == true) {
              const options: { value: number | null; text: string}[] = [];
              item.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name
                });
              });
              const param = this.apiParams[index];
              switch (param) {
                case 'EDUCATION_LEVEL':
                  this.educationLevelOptions$.next(options);
                  break;
                case 'LANGUAGE_LEVEL':
                  this.learningLevelOptions$.next(options);
                  break;
                case 'RC_COMPUTER_LEVEL':
                    this.computerSkillOptions$.next(options);
                    break;
                case 'BLX':
                    this.licenseOptions$.next(options);
                    break;
                case 'MAJOR':
                  this.qualificationOptions$.next(options);
                  this.qualificationOptions2$.next(options);
                  this.qualificationOptions3$.next(options);
                  break;
                case 'TRAINING_FORM':
                  this.trainingFormOptions$.next(options);
                  this.trainingFormOptions2$.next(options);
                  this.trainingFormOptions3$.next(options);
                  break;
                case 'GRADUATE_SCHOOL':
                  this.graduateSchoolOptions$.next(options);
                  this.graduateSchoolOptions2$.next(options);
                  this.graduateSchoolOptions3$.next(options);
                  break;
                case 'LANGUAGE':
                  this.languageOptions$.next(options);
                  this.languageOptions2$.next(options);
                  this.languageOptions3$.next(options);
                  break;
                case 'LANGUAGE_LEVEL':
                  this.languageLevelOptions$.next(options);
                  this.languageLevelOptions2$.next(options);
                  this.languageLevelOptions3$.next(options);
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
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.personnelCenterService.reloadFlag$.next(true);
    this.subscriptions.map(x => x?.unsubscribe());
  }

}
