import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

import { ProfileRecruitmentEditService } from './profile-recruitment-edit.service';
import { FamilyEditService } from '../../../../../../main/cms/profile/appbusiness/family/family-edit/family-edit.service';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreButtonVNS, IAlertOptions, ICoreAccordionItem, EnumCoreButtonVNSCode, ICoreDropdownOption, EnumCoreFileUploaderType, IFormBaseControl, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, DialogService, AppService, AlertService, RandomAvatarService, MultiLanguageService, ResponseService, CorePageListService, CoreFormService, CoreAccordionService, IFormatedResponse, CustomValidators } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, distinctUntilChanged, forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile-recruitment-edit',
  templateUrl: './profile-recruitment-edit.component.html',
  styleUrl: './profile-recruitment-edit.component.scss'
})
export class ProfileRecruitmentEditComponent extends BaseEditComponent implements OnInit, AfterViewInit {
  // @Output() onSubmit = new EventEmitter();
  @Output() buttonClick = new EventEmitter<ICoreButtonVNS>();
  @Output() onCancal = new EventEmitter();
  alertOptions: IAlertOptions = {
    autoClose: false,
    keepAfterRouteChange: false,
  };
  lang!: string;
  loading!: boolean
  manualHeightList!: boolean;
  heightList: number[] = [];
  heightListVisible: number[] = [];
  defaultAvatar!: string;
  sectors!: ICoreAccordionItem[];
  override form!: FormGroup;
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SAVE,
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL,
  ];
  apiParams: string[] = [
    'GENDER',
    'CANDIDATE_SOURCE',
    'OBJECT_EMPLOYEE',
    'NATION',
    'NATIONALITY',
    'FAMILY_STATUS',
    'RELIGION',
    'EDUCATION_LEVEL',
    'LEARNING_LEVEL', 
    'MAJOR', 
    'TRAINING_FORM', 
    'GRADUATE_SCHOOL', 
    'LANGUAGE',
    'LANGUAGE_LEVEL',
    'RC_COMPUTER_LEVEL',
    'DESC_CLASSIFICATION',
    'RELATION',
    'HEALTH_TYPE'
  ];

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  orgGetByIdObject$ = new BehaviorSubject<any>(null);
  orgGetByIdApi = api.HU_ORGANIZATION_READ;

  sCandidateObjectGetByIdApi = api.SYS_OTHERLIST_READ;
  sCandidateObjectGetById$ = new BehaviorSubject<any>(null);
  sCandidateObjectOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  genderGetById$ = new BehaviorSubject<any>(null);
  genderGetByIdApi = api.HU_FAMILY_GENDER_LIST;
  genderOption$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  nationGetById$ = new BehaviorSubject<any>(null);
  nationGetByIdApi = api.HU_NATION_LIST;
  nationOption$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  nationalityGetById$ = new BehaviorSubject<any>(null);
  nationalityGetByIdApi = api.HU_FAMILY_NATIONALITY_LIST;
  nationalityOption$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  maritalStatusGetById$ = new BehaviorSubject<any>(null);
  maritalStatusGetByIdApi = api.HU_FAMILY_STATUS;
  maritalStatusOption$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  religionGetById$ = new BehaviorSubject<any>(null);
  religionGetByIdApi = api.HU_RELIGION_LIST;
  religionOption$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  uploadFileType: EnumCoreFileUploaderType =
    EnumCoreFileUploaderType.IMAGE_AVATAR;
  fileDataControlName: string = 'avatarFileData';
  fileNameControlName: string = 'avatarFileName';
  fileTypeControlName: string = 'avatarFileType';
  subsctiptions: Subscription[] = [];

  identityAddressOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  identityAddressGetById$ = new BehaviorSubject<any>(null);
  identityAddressGetByIdApi = api.HU_FAMILY_PROVINCE_READ;

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

  healthTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  healthTypeGetById$ = new BehaviorSubject<any>(null);
  healthTypeGetByIdApi = api.SYS_OTHERLIST_READ;

  typeClassificationIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  typeClassificationIdGetById$ = new BehaviorSubject<any>(null);
  typeClassificationIdGetByIdApi = api.SYS_OTHERLIST_READ;

  languageOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  languageGetById$ = new BehaviorSubject<any>(null);
  languageGetByIdApi = api.SYS_OTHERLIST_READ;

  languageLevelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  languageLevelGetById$ = new BehaviorSubject<any>(null);
  languageLevelGetByIdApi = api.SYS_OTHERLIST_READ;

  perCityOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  perCityGetById$ = new BehaviorSubject<any>(null);
  perCityGetByIdApi = api.HU_FAMILY_PROVINCE_READ;

  perDistrictOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  perDistrictGetById$ = new BehaviorSubject<any>(null);
  perDistrictGetByIdApi = api.HU_FAMILY_DISTRICT_READ;

  perWardOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  perWardGetById$ = new BehaviorSubject<any>(null);
  perWardGetByIdApi = api.HU_FAMILY_WARD_READ;

  contactProvinceTempOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  contactProvinceTempGetById$ = new BehaviorSubject<any>(null);
  contactProvinceTempGetByIdApi = api.HU_FAMILY_PROVINCE_READ;
  
  contactWardTempOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  contactWardTempGetById$ = new BehaviorSubject<any>(null);
  contactWardTempGetByIdApi =api.HU_FAMILY_WARD_READ;

  contactDistrictTempOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  contactDistrictTempGetById$ = new BehaviorSubject<any>(null);
  contactDistrictTempGetByIdApi = api.HU_FAMILY_DISTRICT_READ;

  posWish1Options$ = new BehaviorSubject<ICoreDropdownOption[]>([])
  posWish1GetByIdObject$ = new BehaviorSubject<any>(null)
  posWish1GetByIdApi = api.HU_POSITION_READ

  posWish2Options$ = new BehaviorSubject<ICoreDropdownOption[]>([])
  posWish2GetByIdObject$ = new BehaviorSubject<any>(null)
  posWish2GetByIdApi = api.HU_POSITION_READ

  reRelationshipOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  reRelationshipGetById$ = new BehaviorSubject<any>(null);
  reRelationshipGetByIdApi = api.SYS_OTHERLIST_READ;

  /*-------------------------------- Accodion Thông tin chung -------------------------------- */
  avatar: IFormBaseControl = {
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_AVATAR,
    field: 'image',
    value: '',
    controlType: EnumFormBaseContolType.FILEUPLOADER,
    type: 'text',
    uploadFileType: EnumCoreFileUploaderType.IMAGE_AVATAR,
    fileDataControlName: 'avatarFileData',
    fileNameControlName: 'avatarFileName',
    fileTypeControlName: 'avatarFileType',
  };
  avatarFileData: IFormBaseControl = {
    flexSize: 0,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_AVATAR_FILEDATA,
    field: 'avatarFileData',
    value: "",
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'string',
    hidden: true // To hide
  };
  avatarFileName: IFormBaseControl = {
    flexSize: 0,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_AVATAR_FILENAME,
    field: 'avatarFileName',
    value: "",
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'string',
    hidden: true // To hide
  }
  avatarFileType: IFormBaseControl = {
    flexSize: 0,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_AVATAR_FILETYPE,
    field: 'avatarFileType',
    value: "",
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'string',
    hidden: true // To hide
  };

  //mã ứng viên - RC_CANDIDATE
  candidateCode: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'candidateCode',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_CODE,
    type: 'string',
    value: '',
    readonly:true,
  };

  //họ và tên ứng viên - RC_CANDIDATE
  fullnameVn: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'fullnameVn',
    label:
      EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_NAME,
    type: 'string',
    value: '',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
    blur$: new BehaviorSubject<any>(null),
    focus$: new BehaviorSubject<any>(null),
  };
  
  //phòng ban - RC_CANDIDATE
  orgId: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.SEEKER,
    seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,
    multiMode:false,
    getByIdObject$: this.orgGetByIdObject$,
    getByIdApi: this.orgGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    alsoBindTo: [
      //{ takeFrom: 'orgName', bindTo: 'orgId' },
      { takeFrom: 'orgName', bindTo: 'department' },
      // { takeFrom: 'empLmName', bindTo: 'directManagement' },
      // { takeFrom: 'lmNameId', bindTo: 'directManagementId' },
    ],
    field: 'orgId',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_ORG_NAME,
    type: 'number',
    value: '',
  };

  //nguồn ứng viên - RC_CANDIDATE
  rcSourceRecId: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'rcSourceRecId',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_SOURCE_CANDIDATE,
    getByIdObject$: this.sCandidateObjectGetById$,
    getByIdApi: this.sCandidateObjectGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.sCandidateObjectOptions$,
    type: 'string',
    value: '',
    readonly:true,
  };

  /*-------------------------------- Start Accodion SƠ YẾU LÍ LỊCH -------------------------------- */

  /* --------------- Thông tin cá nhân --------------- */
  //Giới tính - RC_CANDIDATE
  genderId: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'genderId',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_GENDER,
    type: 'string',
    value: '',
    getByIdObject$: this.genderGetById$,
    getByIdApi: this.genderGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.genderOption$,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };

  //Tình trạng hôn nhân - RC_CANDIDATE_CV
  maritalStatus: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'maritalStatus',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_MARITAL_STATUS,
    type: 'string',
    value: '',
    getByIdObject$: this.maritalStatusGetById$,
    getByIdApi: this.maritalStatusGetByIdApi,
    shownFrom: 'name',
    boundFrom: 'id',
    dropdownOptions$: this.maritalStatusOption$,
  };

  //Dân tộc - RC_CANDIDATE_CV
  nationId: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'nationId',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NATION,
    type: 'number',
    value: '',
    getByIdObject$: this.nationGetById$,
    getByIdApi: this.nationGetByIdApi,
    shownFrom: 'name',
    boundFrom: 'id',
    dropdownOptions$: this.nationOption$,
  };

  //Tôn giáo - RC_CANDIDATE_CV
  religionId: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'religionId',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_RELIGION,
    type: 'string',
    value: '',
    dropdownOptions$: this.religionOption$,
    getByIdObject$: this.religionGetById$,
    getByIdApi: this.religionGetByIdApi,
    shownFrom: 'name',
    boundFrom: 'id',
  };

  //Quốc tịch - RC_CANDIDATE_CV
  nationalityId: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'nationalityId',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NATIONALITY,
    type: 'string',
    value: '', 
    getByIdObject$: this.nationalityGetById$,
    getByIdApi: this.nationalityGetByIdApi,
    shownFrom: 'name',
    boundFrom: 'id',
    dropdownOptions$: this.nationalityOption$,
  };

  //Ngày sinh - RC_CANDIDATE_CV
  birthDate: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'birthDate',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTHDAY,
    type: 'date',
    pipe: EnumCoreTablePipeType.DATE_TIME,
    value: '',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };

  //Nơi sinh - RC_CANDIDATE_CV
  birthAddress: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'birthAddress',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_ADDRESS,
    type: 'string',
    value: '',
  };
  
  //Số CMND/CCCD - RC_CANDIDATE_CV
  idNo: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'idNo',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER,
    type: 'string',
    value: '',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
      {
        name: 'validateLengthId',
        validator: ProfileRecruitmentEditComponent.validateLengthId,
        errorMessage: EnumTranslateKey.UI_COMPONENT_TITLE_CHECK_LENGTH_INDENTITY,
      },
      {
        name: 'validateSpace',
        validator: ProfileRecruitmentEditComponent.validateSpace,
        errorMessage: EnumTranslateKey.UI_COMPONENT_TITLE_CHECK_CONTAINS_SPACE,
      },
    ],
  };

  //Ngày cấp CCCD - RC_CANDIDATE_CV
  idDate: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'idDate',
    label:EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_DATE,
    type: 'date',
    value: '',
    pipe: EnumCoreTablePipeType.DATE_TIME,
  };

  //Ngày hết hạn CCCD - RC_CANDIDATE_CV
  idDateExpire: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'idDateExpire',
    label:EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_DATE_EXPIRE,
    type: 'date',
    value: '',
    pipe: EnumCoreTablePipeType.DATE_TIME,
  };

  //Địa chỉ cấp CCCD - RC_CANDIDATE_CV
  idPlace: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'idPlace',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_ADDRESS,
    getByIdObject$: this.identityAddressGetById$,
    getByIdApi: this.identityAddressGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.identityAddressOptions$,
    type: 'number',
    value: '',
  };
  /* --------------------------------------------- */
  
  
  /* --------------- Thông tin liên hệ --------------- */
  // Địa chỉ thường trú - RC_CANDIDATE_CV
  perAddress: IFormBaseControl = {
    flexSize: 12,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'perAddress',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_ADDRESS,
    type: 'string',
    value: '',
  };

  // Tỉnh/thành phố(thường trú) - RC_CANDIDATE_CV
  perProvince: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'perProvince',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CITY,
    getByIdObject$: this.perCityOptions$,
    getByIdApi: this.perCityGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.perCityOptions$,
    type: 'number',
    value: '',
  };

  // Quận/huyện thường trú - RC_CANDIDATE_CV
  perDistrict: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'perDistrict',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_DISTRICT,
    getByIdObject$: this.perDistrictGetById$,
    getByIdApi: this.perDistrictGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.perDistrictOptions$,
    type: 'number',
    value: '',
  };

  // Xã/phường(thường trú) - RC_CANDIDATE_CV
  perWard: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'perWard',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_WARD,
    getByIdObject$: this.perWardGetById$,
    getByIdApi: this.perWardGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.perWardOptions$,
    type: 'number',
    value: '',
  };

  // Địa chỉ tạm trú - RC_CANDIDATE_CV
  contactAddressTemp: IFormBaseControl = {
    flexSize: 12,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'contactAddressTemp',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_ADDRESS,
    type: 'string',
    value: '',
  };

  // Tỉnh/thành(tạm trú) - RC_CANDIDATE_CV
  contactProvinceTemp: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'contactProvinceTemp',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_CITY,
    getByIdObject$: this.contactProvinceTempGetById$,
    getByIdApi: this.contactProvinceTempGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.contactProvinceTempOptions$,
    type: 'number',
    value: '',
  };

  // Quận/huyện(tạm trú) - RC_CANDIDATE_CV
  contactDistrictTemp: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'contactDistrictTemp',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_DISTRICT,
    getByIdObject$: this.contactDistrictTempGetById$,
    getByIdApi: this.contactDistrictTempGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.contactDistrictTempOptions$,
    type: 'number',
    value: '',
  };

  // Xã/phường(tạm trú) - RC_CANDIDATE_CV
  contactWardTemp: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'contactWardTemp',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_WARD,
    getByIdObject$: this.contactWardTempGetById$,
    getByIdApi: this.contactWardTempGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.contactWardTempOptions$,
    type: 'number',
    value: '',
  };

  // email cá nhân - RC_CANDIDATE_CV
  perEmail: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'perEmail',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_EMAIL_PERSONAL,
    type: 'string',
    value: '',
  };

  // SĐT di động - RC_CANDIDATE_CV
  mobilePhone: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'mobilePhone',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_TELEPHONE,
    type: 'string',
    value: '',
  };

  // Điện thoại cố định - RC_CANDIDATE_CV
  finderSdt: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'finderSdt',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_LANDLINE_PHONE,
    type: 'string',
    value: '',
  };

  // Đã có GPLĐ - RC_CANDIDATE_CV
  isWorkPermit: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.CHECKBOX,
    field: 'isWorkPermit',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_IS_PERMIT,
    type: 'boolean',
    value: '',
  };

  /* --------------------------------------------- */
  /*-------------------------------- End Accodion SƠ YẾU LÍ LỊCH -------------------------------- */
  

  /*-------------------------------- Start Accodion THÔNG TIN TRÌNH ĐỘ -------------------------------- */
  /* --------------- Thông tin cá nhân --------------- */
  //Trình độ văn hóa - RC_CANDIDATE_CV
  educationLevelId: IFormBaseControl = {  
    flexSize: 4,
    value: '',
    field: 'educationLevelId',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_EDUCATION_LEVEL,
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
    ]
  };

  //Trình độ học vấn - RC_CANDIDATE_CV
  learningLevelId: IFormBaseControl = {  
    flexSize: 4,
    value: '',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LEARNING_LEVEL,
    field: 'learningLevelId',
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
  };

  //Trường học - RC_CANDIDATE_CV
  graduateSchoolId: IFormBaseControl = {  
    flexSize: 4,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SCHOOLE,
    field: 'graduateSchoolId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.graduateSchoolGetById$,
    getByIdApi: this.graduateSchoolGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.graduateSchoolOptions$,
  };

  //Chuyên ngành - RC_CANDIDATE_CVRC_CANDIDATE_CV
  majorId: IFormBaseControl = { 
    flexSize: 4,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MAJOR_ID,
    field: 'majorId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.majorIdGetById$,
    getByIdApi: this.majorIdGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.majorIdOptions$,
  }

  //Năm tốt nghiệp - RC_CANDIDATE_CV
  yearGraduation: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'yearGraduation',
    label: EnumTranslateKey.UI_TITLE_HU_CERTIFICATE_EDIT_YEAR,
    type: 'string',
    value: '',
  };

  //xếp loại - RC_CANDIDATE_CV
  rating: IFormBaseControl = {
    flexSize: 4,
    field: 'rating',
    controlType: EnumFormBaseContolType.TEXTBOX,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_RATING,
    type: 'string',
    value: '',
  };


  /* --------------- Trình độ tin học --------------- */
  // trình độ tin học - RC_CANDIDATE_CV
  rcComputerLevelId: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'rcComputerLevelId',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_COMPUTER_SKILL,
    type: 'number',
    value: '',
    getByIdObject$: this.rcComputerLevelIdGetById$,
    getByIdApi: this.rcComputerLevelIdGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.rcComputerLevelIdOptions$,
  };

  // Loại xếp loại/chứng chỉ - RC_CANDIDATE_CV
  typeClassificationId: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'typeClassificationId',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_TYPE_CLASSIFICATION_ID,
    type: 'number',
    value: '',
    getByIdObject$: this.typeClassificationIdGetById$,
    getByIdApi: this.typeClassificationIdGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.typeClassificationIdOptions$,
  };

  /* --------------- Trình độ ngoại ngữ --------------- */
  // Ngôn ngữ (tham số ht) - RC_CANDIDATE_CV
  languageId: IFormBaseControl = {  
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LANGUAGE_1,
    flexSize: 4,
    field: 'languageId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.languageGetById$,
    getByIdApi: this.languageGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.languageOptions$,
  };

  // Trình độ ngoại ngữ - RC_CANDIDATE_CV
  languageLevelId: IFormBaseControl = {  
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LANGUAGE_LEVEL_1,
    flexSize: 4,
    field: 'languageLevelId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.languageLevelGetById$,
    getByIdApi: this.languageLevelGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.languageLevelOptions$,
  };

  // Điểm số/xếp loại - RC_CANDIDATE_CV
  mark: IFormBaseControl = {
    flexSize: 4,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'mark',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_MARK,
    type: 'string',
    value: '',
  };
  /* --------------------------------------------- */
  /*-------------------------------- End Accodion THÔNG TIN TRÌNH ĐỘ -------------------------------- */

  /*-------------------------------- Start Accodion NGUYỆN VỌNG -------------------------------- */
  /* --------------- Thông tin nguyện vọng --------------- */

  // Vị trí mong muốn 1 - RC_CANDIDATE_CV
  posWish1Id: IFormBaseControl = {  
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_POS_WISH1,
    field: 'posWish1Id',
    value: null,
    controlType: EnumFormBaseContolType.DROPDOWN,
    dropdownOptions$: this.posWish1Options$,
    getByIdObject$: this.posWish1GetByIdObject$,
    getByIdApi: api.HU_POSITION_READ,
    shownFrom: 'name',
    type: 'number',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      }
    ]
  }

  // Vị trí mong muốn 2 - RC_CANDIDATE_CV
  posWish2Id: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'posWish2Id',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_POS_WISH2,
    type: 'number',
    value: '',
    getByIdObject$: this.posWish2GetByIdObject$,
    getByIdApi: api.HU_POSITION_READ,
    shownFrom: 'name',
    dropdownOptions$: this.posWish2Options$,
  };

   // Mức lương thử việc - RC_CANDIDATE_CV
  probationSalary: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.CURRENCY,
    field: 'probationSalary',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_PROBATION_SALARY,
    type: 'number',
    value: '',
  };

  // Mức lương mong muốn - RC_CANDIDATE_CV
  wishSalary: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.CURRENCY,
    field: 'wishSalary',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_WISH_SALARY,
    type: 'number',
    value: '',
  };

  // Nơi làm việc mong muốn - RC_CANDIDATE_CV
  desiredWorkplace: IFormBaseControl = { 
    flexSize: 12,
    controlType: EnumFormBaseContolType.TEXTAREA,
    field: 'desiredWorkplace',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_DESIRED_WORKPLACE,
    type: 'string',
    value: '',
  };

  // Ngày bắt đầu làm việc - RC_CANDIDATE_CV
  startDateWork: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'startDateWork',
    label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_STARTDATE,
    type: 'date',
    value: '',
    pipe: EnumCoreTablePipeType.DATE,
  };

  // Cấp bậc mong muốn - RC_CANDIDATE_CV
  levelDesired: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'levelDesired',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_LEVEL_DESIRED,
    type: 'string',
    value: '',
  };
  // Số năm kinh nghiệm - RC_CANDIDATE_CV
  numExperience: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'numExperience',
    label:
      EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_NUM_EXPERIENCE,
    type: 'string',
    value: '',
  };

  // Đã từng làm HSV/HV - RC_CANDIDATE_CV
  isHsvHv: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.CHECKBOX,
    field: 'isHsvHv',
    label:
      EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_IS_HSV_HV,
    type: 'bool',
    value: false,
  };

  // Đề nghị khác - RC_CANDIDATE_CV
  otherSuggestions: IFormBaseControl = { 
    flexSize: 12,
    controlType: EnumFormBaseContolType.TEXTAREA,
    field: 'otherSuggestions',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_OTHER_SUGGESTIONS,
    type: 'string',
    value: '',
  };
  

  /* --------------------------------------------- */
  /*-------------------------------- End Accodion NGUYỆN VỌNG -------------------------------- */

  /*-------------------------------- Start Accodion THÔNG TIN KHÁC -------------------------------- */
  /* --------------- Thông tin người thân --------------- */
  // Họ tên người thân - RC_CANDIDATE_CV
  reName: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'reName',
    label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPOYEE_NAME,
    type: 'string',
    value: '',
  };

  // Mối quan hệ - RC_CANDIDATE_CV
  reRelationship: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'reRelationship',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_FAMILY_MEMBER_RELATIONSHIP,
    type: 'number',
    value: '',
    getByIdObject$: this.reRelationshipGetById$,
    getByIdApi: this.reRelationshipGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.reRelationshipOptions$,
  };

  // Số điện thoại - RC_CANDIDATE_CV
  rePhone: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'rePhone',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PHONE_NUMBER,
    type: 'string',
    value: '',
  };

  // Địa chỉ - RC_CANDIDATE_CV
  reAddress: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTAREA,
    field: 'reAddress',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_ADDRESS,
    type: 'string',
    value: '',
  };

  /* --------------- Thông tin người giới thiệu --------------- */

  // Họ và tên người giới thiệu - RC_CANDIDATE_CV
  inName: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'inName',
    label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPOYEE_NAME,
    type: 'string',
    value: '',
  }

  // SĐT người giới thiệu - RC_CANDIDATE_CV
  inPhone: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'inPhone',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PHONE_NUMBER,
    type: 'string',
    value: '',
  }

  // Ghi chú - RC_CANDIDATE_CV
  inNote: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTAREA,
    field: 'inNote',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
    type: 'string',
    value: '',
  }

  // Chiều cao(cm) - RC_CANDIDATE_CV
  height: IFormBaseControl = { 
    flexSize: 4,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'height',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEIGHT,
    type: 'string',
    value: '',
  }

  // Tai, mũi, họng - RC_CANDIDATE_CV
  earNoseThroat: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'earNoseThroat',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EAR_NOSE_THROAT,
    type: 'string',
    value: '',
  }

  // Cân nặng(kg) - RC_CANDIDATE_CV
  weight: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'weight',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_WEIGHT,
    type: 'string',
    value: '',
  }

  // Răng hàm mặt - RC_CANDIDATE_CV
  dentomaxillofacial: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'dentomaxillofacial',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_DENTISTRY,
    type: 'string',
    value: '',
  }

  // Nhóm máu - RC_CANDIDATE_CV
  bloodGroup: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'bloodGroup',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BLOODGROUP,
    type: 'string',
    value: '',
  }

  // Tim - RC_CANDIDATE_CV
  heart: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'heart',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEART,
    type: 'string',
    value: '',
  }

  // Huyết áp - RC_CANDIDATE_CV
  bloodPressure: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'bloodPressure',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BLOOD_PRESSURE,
    type: 'string',
    value: '',
  }

  // Phổi và ngực - RC_CANDIDATE_CV
  lungsAndChest: IFormBaseControl = { // Phổi và ngực
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'lungsAndChest',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LUNGS_AND_CHEST,
    type: 'string',
    value: '',
  }

  // Thị lực mắt trái - RC_CANDIDATE_CV
  leftEyeVision: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'leftEyeVision',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LEFT_EYE,
    type: 'string',
    value: '',
  }

  // Thị lực mắt phải - RC_CANDIDATE_CV
  rightEyeVision: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'rightEyeVision',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_RIGHT_EYE,
    type: 'string',
    value: '',
  }

  // Viêm gan B - RC_CANDIDATE_CV
  hepatitisB: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'hepatitisB',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEPATITIS_B,
    type: 'string',
    value: '',
  }

  // Da và hoa liễu - RC_CANDIDATE_CV
  leatherVenereal: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'leatherVenereal',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_OFFICAL_DATE,
    type: 'string',
    value: '',
  }

  // Loại sức khỏe - RC_CANDIDATE_CV
  healthType: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'healthType',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEATH_TYPE,
    type: 'number',
    value: '',
    getByIdObject$: this.healthTypeGetById$,
    getByIdApi: this.healthTypeGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.healthTypeOptions$,
  }

  // Ghi chú sức khỏe - RC_CANDIDATE_CV
  noteSk: IFormBaseControl = { 
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'noteSk',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
    type: 'string',
    value: '',
  }


  checkError$ = new BehaviorSubject<boolean>(false);
  listInstance!: number;
  // arrayBasic: any[] = [];
  // arrayCv: any[] = [];
  // arrayContact:  any[] = [];
  // arrayInfo: any[] = [];
  textValidate: any;
  textValidateTaxCode: any;
  validateidNoNumber: any;
  

  constructor(
    private route: ActivatedRoute,
    public override dialogService: DialogService,
    private fb: FormBuilder,
    private appService: AppService,
    private alertService: AlertService,
    private randomAvatarService: RandomAvatarService,
    private mls: MultiLanguageService,
    private router: Router,
    private responseService: ResponseService,
    private corePageListService : CorePageListService,
    private coreFormService: CoreFormService,
    private coreAccordionService: CoreAccordionService,
    private profileRecruitment: ProfileRecruitmentEditService,
    private rcRecruitmentService: ProfileRecruitmentEditService,
    private familyEditService : FamilyEditService,
  ) {
    super(dialogService);
    this.sectors = this.profileRecruitment.sectors;
    this.defaultAvatar = this.randomAvatarService.get();
  }

  ngOnInit(): void {
    this.createForm();
    this.subsctiptions.push(
      this.mls.lang$.subscribe(x => this.lang = x),
    )
    this.listInstance = this.corePageListService.instances[0]?.instanceNumber;
    // this.profileRecruitment.listInstance$.next(this.listInstance)
  }

  ngAfterViewInit() : void{
    setTimeout(() => {
      // Load drop down list SYS_ORTHER_LIST
      this.getAllValueDropdownSysOrtherList();
      // this.getCode();
      this.formInitStringValue = JSON.stringify(this.form.getRawValue());
      
      this.subsctiptions.push(
        this.rcRecruitmentService
        .getListPos(api.HU_POSITION_READ_ALL)
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
          const options: { value: number | null; text: string; }[] = [];
          res.body.innerBody.map((g: any) => {
            options.push({
              value: g.id,
              text: g.name
            })
          })
          this.posWish1Options$.next(options);
          this.posWish2Options$.next(options);
        }}
        })
      )

      // Nơi cấp CMND/CCCD + Thành phố thường trú + Tỉnh/Thành phố tạm trú
      this.subsctiptions.push(
        this.familyEditService
        .GetProvince(api.HU_FAMILY_PROVINCE_LIST)
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string; }[] = [];
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name
                })
              })
              this.perCityOptions$.next(options);
              this.contactProvinceTempOptions$.next(options);
              this.identityAddressOptions$.next(options);
            }
          }
        })
      )
      
      // Quận huyện thường trú
      this.subsctiptions.push( // <== Outer push
        this.form.get('perProvince')?.valueChanges.subscribe(x => {
          if (!!x) {
            this.subsctiptions.push( // <== Inner push
                this.appService
                .get(api.HU_FAMILY_DISTRICT_LIST + x)
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
                      this.perDistrictOptions$.next(options);
                    }
                  }
                })
            )
          }
        })!
      )

      // Quận/Huyện tạm trú
      this.subsctiptions.push( // <== Outer push
        this.form.get('contactProvinceTemp')?.valueChanges.subscribe(x => {
          if (!!x) {
            this.subsctiptions.push( // <== Inner push
                this.appService
                .get(api.HU_FAMILY_DISTRICT_LIST + x)
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
                      this.contactDistrictTempOptions$.next(options);
                    }
                  }
                })
            )
          }
        })!
      )
  
      // Xã phường thường trú
      this.form.get('perDistrict')?.valueChanges.subscribe(x => {
        if (!!x) {
          this.subsctiptions.push( // <== Inner push
              this.appService
              .get(api.HU_FAMILY_WARD_LIST + x)
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
                    this.perWardOptions$.next(options);
                  }
                }
              })
          )
        }
      })!

      // Xã phường tạm trú
      this.form.get('contactDistrictTemp')?.valueChanges.subscribe(x => {
        if (!!x) {
          this.subsctiptions.push( // <== Inner push
              this.appService
              .get(api.HU_FAMILY_WARD_LIST + x)
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
                    this.contactWardTempOptions$.next(options);
                  }
                }
              })
          )
        }
      })!
      
      // Vị trí mong muốn 1 
      this.form.get('posWish1Id')?.valueChanges.subscribe(x => {
        if (!!x) {
          this.subsctiptions.push( // <== Inner push
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
          this.subsctiptions.push( // <== Inner push
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
    })
    
    this.subsctiptions.push(
      this.form.get('idNo')?.valueChanges.subscribe(x => {
        if(!!x && x != this.validateidNoNumber){
          this.appService.get(api.HU_EMPLOYEE_CHECK_SAME_ID_NO + this.form.get('idNo')?.value).subscribe(y => {
            if(!!y && y.status == 200){
              if(!!y.body.innerBody){
                this.validateidNoNumber = y.body.innerBody;
              }else{
                this.validateidNoNumber = null;
              }
            }
          })
        }
      })!

    )
    this.subsctiptions.push(
      this.form.get('allowedNameDuplicate')?.valueChanges.subscribe(x => {
        if(x == true){
          this.textValidate = null;
        }else{
          this.appService.get(api.HU_EMPLOYEE_CHECK_SAME_NAME + this.form.get('name')?.value).subscribe(y => {
            if(!!y && y.status == 200){
              if(!!y.body.innerBody){
                this.textValidate = y.body.innerBody;
              }else{
                this.textValidate = null;
              }
            }
          })
        }
      })!
    )
      this.subsctiptions.push(
        this.coreAccordionService.heightList$?.subscribe(x => {
          if(x.length > 0){
            this.heightList = x;
            // if(this.heightList[0] > 450){//cái đầu lớn hơn 400 thì trừ đi 20 từng cái
              // this.heightList.map(x => {
              //   x = x - 90;
              //   this.heightListVisible.push(x)
              // })
              // // this.heightListVisible = this.heightList;
              // this.manualHeightList = true;
            // } 

            // console.log('this.heightListthis.heightListthis.heightListthis.heightListthis.heightList',this.heightList)
          }
        })
      )
      this.subsctiptions.push(
        this.form.statusChanges.pipe(distinctUntilChanged()).subscribe(x => {
          if(x == "VALID"){
            this.alertService.alerts$.next([])
          }
        })
      )
  }

  private toggleReloadFlagForTheCaller(id: number): void {

    const instancesFilter = this.corePageListService.instances.filter(
      (x) => x.instanceNumber === this.listInstance
    );
    if (!!instancesFilter.length) {
      const instance = instancesFilter[0];
      instance.id$.next(id);
      instance.reloadFlag$?.next(!instance.reloadFlag$.value);
    }
  }

  getAllValueDropdownSysOrtherList() {
    forkJoin(
      this.apiParams.map((param) =>
        this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + param)
      )
    ).subscribe((responses) => {
      responses.forEach((item, index) => {
        if (item.body.statusCode == 200 && item.ok == true) {
          const options: { value: number | null; text: string }[] = [];
          item.body.innerBody.map((g: any) => {
            options.push({
              value: g.id,
              text: g.name,
            });
          });
          const param = this.apiParams[index];
          switch (param) {
            case 'CANDIDATE_SOURCE':  // Nguồn ứng viên
              this.sCandidateObjectOptions$.next(options);
              break;
            case 'GENDER':  // Giới tính
              this.genderOption$.next(options);
              break;        
            case 'FAMILY_STATUS':   // Tình trạng hôn nhân
              this.maritalStatusOption$.next(options);
              break;
            case 'NATION':  // Dân tộc
              this.nationOption$.next(options);
              break;
            case 'RELIGION':  // Tôn giáo
              this.religionOption$.next(options);
              break;
            case 'NATIONALITY': // Quốc tịch
              this.nationalityOption$.next(options);
              break;
            case 'EDUCATION_LEVEL': // Trình độ văn hóa
              this.educationLevelOptions$.next(options);
              break;
            case 'LEARNING_LEVEL': // Trình độ học vấn 
              this.learningLevelOptions$.next(options);
              break;
            case 'GRADUATE_SCHOOL': // Trường học
              this.graduateSchoolOptions$.next(options);
              break;
            case 'MAJOR': // Chuyên ngành
              this.majorIdOptions$.next(options);
              break;
            case 'RC_COMPUTER_LEVEL':  // Trình độ tin học
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
            case 'RELATION':  // Mối quan hệ
              this.reRelationshipOptions$.next(options);
              break;
            case 'HEALTH_TYPE':  // Loại sức khỏe
              this.healthTypeOptions$.next(options);
              break;
            default:
              break;
          }
        }
      });
    });
  }

  createForm() {
    this.form = this.fb.group({
      avatar: [null],
      avatarFileData: [null],
      avatarFileName: [null],
      avatarFileType: [null],
      candidateCode: [null],
      fullnameVn: [null, [Validators.required]],
      orgId: [null],
      rcSourceRecId: [null],
      genderId: [null, [Validators.required]],
      maritalStatus: [null],
      nationId: [null],
      religionId: [null],
      nationalityId: [null],
      birthDate: [null, [Validators.required]],
      birthAddress: [null],
      idNo: [null, [Validators.required, ProfileRecruitmentEditComponent.validateLengthId,  ProfileRecruitmentEditComponent.validateSpace]],
      idDate: [null],
      idDateExpire: [null],
      idPlace: [null],
      perAddress: [null],
      perProvince: [null],
      perDistrict: [null],
      perWard: [null],
      contactAddressTemp: [null],
      contactProvinceTemp: [null],
      contactDistrictTemp: [null],
      contactWardTemp: [null],
      perEmail: [null],
      mobilePhone: [null],
      finderSdt: [null],
      isWorkPermit: [null],
      educationLevelId: [null],
      learningLevelId: [null],
      graduateSchoolId: [null],
      majorId: [null],
      yearGraduation: [null],
      rating: [null],
      rcComputerLevelId: [null],
      typeClassificationId: [null],
      languageId: [null],
      languageLevelId: [null],
      mark: [null],
      posWish1Id: [null, [Validators.required]],
      posWish2Id: [null],
      probationSalary: [null],
      wishSalary: [null],
      desiredWorkplace: [null],
      startDateWork: [null],
      levelDesired: [null],
      numExperience: [null],
      isHsvHv: [null],
      otherSuggestions: [null],
      reName: [null],
      reRelationship: [null],
      rePhone: [null],
      reAddress: [null],
      inName: [null],
      inPhone: [null],
      inNote: [null],
      height: [null],
      earNoseThroat: [null],
      weight: [null],
      dentomaxillofacial: [null],
      bloodGroup: [null],
      heart: [null],
      bloodPressure: [null],
      lungsAndChest: [null],
      leftEyeVision: [null],
      rightEyeVision: [null],
      hepatitisB: [null],
      leatherVenereal: [null],
      healthType: [null],
      noteSk: [null],      
    });
  }

  static validateLengthId(control : AbstractControl) : any | null{
    let valid = true;
    const value = control?.value;
    if ((value?.length === 9 || value?.length === 12)) {
      return null; // Hợp lệ
    }
      valid = false;
      let errorMessage = EnumTranslateKey.UI_COMPONENT_TITLE_CHECK_LENGTH_INDENTITY_1;
      return CustomValidators.core('validateLengthId', valid, errorMessage)(control);
  }

  static validateSpace(control : AbstractControl) : any | null{
    let valid = true;
    const value = control?.value;
    if(!value?.includes(' ')){
      return null;
    }else{
      valid = false;
      let errorMessage = EnumTranslateKey.UI_COMPONENT_TITLE_CHECK_CONTAINS_SPACE;
      return CustomValidators.core('validateSpace', valid, errorMessage)(control);
    }
  }

  onButtonClick(e: ICoreButtonVNS): void {
    if (e.code == EnumCoreButtonVNSCode.NONE_HEADER_CANCEL) {
      this.onCancelLocal();
    }
    if (e.code == EnumCoreButtonVNSCode.NONE_HEADER_SAVE) {
      this.onFormSubmit();
      
    }
    this.buttonClick.emit(e);
  }

  onCancelLocal() {
    this.router.navigateByUrl('/cms/recruitment/business/rc-candidate');
  }

  onFormSubmit() {
    debugger;
    // in ra cái đối tượng Form
    console.log("robot: in ra cái đối tượng Form:\n", this.form);


    this.checkError$.next(true);
    const request = this.form.getRawValue();
    if(!!this.textValidate){
      return;
    }
    
    if (!!this.form.valid) {
      // this.onSubmit.emit(this.form?.getRawValue());
      this.loading = true;
      this.profileRecruitment
        .InsertProfileRecruitment(request)
        .subscribe((rs: any) => {
          if (rs.ok == true && rs.body.statusCode == 200) {
            this.toggleReloadFlagForTheCaller(rs.body.innerBody)
            this.formInitStringValue = JSON.stringify(this.form.getRawValue())
            this.profileRecruitment.listInstance$.next(this.listInstance)
            this.loading = false;
            this.router.navigate(['../'],{ relativeTo: this.route, state: { id: rs.body.innerBody, instanceNumber: this.listInstance } });
          }else{
            return
          }
          
        });
    }else{
      this.alertService.error(
        this.mls.trans(EnumTranslateKey.UI_COMPONENT_TITLE_NOT_CORRECTLY_INFOMATION_YET),
        this.alertOptions
      );
      let arrayControl = Object.keys(this.form.controls)
        for(let i = 0;i < arrayControl.length;i++){
         let invalid = this.form.get(arrayControl[i])?.status
          if(invalid == "INVALID"){
           let checkClass = document.getElementsByClassName(arrayControl[i]) as HTMLCollection
           
           if(!!!this.manualHeightList){
             if(checkClass.length > 0){
              if(checkClass[0].classList.contains("basic")){
                this.profileRecruitment.sectors[0].open = true
                this.heightList[0] = this.heightList[0] + 10
                // checkBasic = false
              }
              if(checkClass[0].classList.contains("cv")){
                this.profileRecruitment.sectors[1].open = true
                this.heightList[1] = this.heightList[1] + 70
                // checkCv = false
              }
              if(checkClass[0].classList.contains("contact")){
                this.profileRecruitment.sectors[6].open = true
                this.heightList[6] = this.heightList[6] + 90
                // this.arrayContact.push(arrayControl[i])
                // checkContact = false
              }
              // if(checkClass[0].classList.contains("info")){
              //   this.profileRecruitment.sectors[2].open = true
              //   this.heightList[2] = this.heightList[2] + 120
              //   // this.arrayInfo.push(arrayControl[i])
              //   // checkInfo = false
              // }
              this.heightList[3] = this.heightList[3]
              this.heightList[4] = this.heightList[4] + 15
              this.heightList[5] = this.heightList[5]
              this.heightList[2] = this.heightList[2] + 20
              this.heightList[7] = this.heightList[7]+ 15
              this.heightList[8] = this.heightList[8]+ 20
             }
            }
          
          }
        }

        this.heightListVisible = this.heightList;
        this.manualHeightList = true
    }
  }
  onAccordionItemClick(e: ICoreAccordionItem): void { }

  onAccordionItemClickEdit(e: ICoreAccordionItem): void {
  }
  ngOnDestroy(): void {
    this.subsctiptions.map(x => x?.unsubscribe())
  }
}
