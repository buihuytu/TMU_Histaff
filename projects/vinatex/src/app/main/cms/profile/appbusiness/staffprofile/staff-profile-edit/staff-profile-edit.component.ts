import { Component, OnInit, AfterViewInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreButtonVNS, IAlertOptions, ICoreAccordionItem, EnumCoreButtonVNSCode, ICoreDropdownOption, EnumCoreFileUploaderType, IFormBaseControl, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, DialogService, AppService, AlertService, RandomAvatarService, MultiLanguageService, ResponseService, CorePageListService, CoreFormService, CoreAccordionService, IFormatedResponse, CustomValidators } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription, distinctUntilChanged, forkJoin } from "rxjs";
import { FamilyEditService } from "../../family/family-edit/family-edit.service";
import { StaffProfileEditService } from "./staff-profile-edit.service";

@Component({
  selector: 'app-staff-profile-edit',
  templateUrl: './staff-profile-edit.component.html',
  styleUrls: ['./staff-profile-edit.component.scss'],
})
export class StaffProfileEditComponent extends BaseEditComponent implements OnInit, AfterViewInit {
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
    'OBJECT_EMPLOYEE',
    'GENDER',
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
    "BLX",
    "RC_COMPUTER_LEVEL"
  ];

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  positionGetByIdObject$ = new BehaviorSubject<any>(null);
  positionGetByIdApi = api.HU_POSITION_READ;

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

  employeeObjectGetByIdApi = api.HU_ORGANIZATION_READ;
  employeeObjectGetById$ = new BehaviorSubject<any>(null);
  employeeObjectOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  uploadFileType: EnumCoreFileUploaderType =
    EnumCoreFileUploaderType.IMAGE_AVATAR;
  fileDataControlName: string = 'avatarFileData';
  fileNameControlName: string = 'avatarFileName';
  fileTypeControlName: string = 'avatarFileType';
  subsctiptions: Subscription[] = [];

  identityAddressOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  identityAddressGetById$ = new BehaviorSubject<any>(null);
  identityAddressGetByIdApi = api.HU_FAMILY_PROVINCE_READ;

  taxCodeAddressOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  taxCodeAddressGetById$ = new BehaviorSubject<any>(null);
  taxCodeAddressGetByIdApi = api.HU_FAMILY_PROVINCE_READ;

  insWhereHealthOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  insWhereHealthGetById$ = new BehaviorSubject<any>(null);
  insWhereHealthGetByIdApi = api.INS_WHEREHEALTH_READ;

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

  cityOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  cityGetById$ = new BehaviorSubject<any>(null);
  cityGetByIdApi = api.HU_FAMILY_PROVINCE_READ;

  districtOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  districtGetById$ = new BehaviorSubject<any>(null);
  districtGetByIdApi = api.HU_FAMILY_DISTRICT_READ;

  wardOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  wardGetById$ = new BehaviorSubject<any>(null);
  wardGetByIdApi = api.HU_FAMILY_WARD_READ;

  curCityOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  curCityGetById$ = new BehaviorSubject<any>(null);
  curCityGetByIdApi = api.HU_FAMILY_PROVINCE_READ;

  curWardOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  curWardGetById$ = new BehaviorSubject<any>(null);
  curWardGetByIdApi = api.HU_FAMILY_WARD_READ;

  curDistrictOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  curDistrictGetById$ = new BehaviorSubject<any>(null);
  curDistrictGetByIdApi = api.HU_FAMILY_DISTRICT_READ;

  bankOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([])
  bankGetByIdObject$ = new BehaviorSubject<any>(null)
  bankOptions2$ = new BehaviorSubject<ICoreDropdownOption[]>([])
  bankGetByIdObject2$ = new BehaviorSubject<any>(null)

  bankBranhOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([])
  bankBranhGetByIdObject$ = new BehaviorSubject<any>(null)

  bankBranhOptions2$ = new BehaviorSubject<ICoreDropdownOption[]>([])
  bankBranhGetByIdObject2$ = new BehaviorSubject<any>(null)

  computerSkillGetByIdObject$ = new BehaviorSubject<any>(null);
  computerSkillGetByIdApi = api.HU_EMPLOYEE_CV_GET_LICENSE_BY_ID;
  computerSkillOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  licenseGetByIdObject$ = new BehaviorSubject<any>(null);
  licenseGetByIdApi = api.HU_EMPLOYEE_CV_GET_LICENSE_BY_ID;
  licenseOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);


  ///Sector 1
  avatar: IFormBaseControl = {
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_AVATAR,
    field: 'avatar',
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
  name: IFormBaseControl = {
    //họ và tên nhân viên
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'name',
    label:
      EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_FIRST_AND_LAST_NAME,
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
  otherName: IFormBaseControl = {
    //Tên gọi khác
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'otherName',
    label:
      EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_OTHER_NAME,
    type: 'string',
    value: '',
  };
  code: IFormBaseControl = {
    //mã nhân viên
    flexSize: 4,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'code',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_CODE_ID,
    type: 'string',
    value: '',
    readonly: true,
  };
  profileCode: IFormBaseControl = {
    //mã hồ sơ
    flexSize: 4,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'profileCode',
    label:
      EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_PROFILE_CODE,
    type: 'string',
    readonly: true,
    value: this.code.value,
  };
  isNotContract: IFormBaseControl = {
    //là đối tượng không kết giao hợp đồng
    flexSize: 4,
    controlType: EnumFormBaseContolType.CHECKBOX,
    field: 'isNotContract',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_IS_NOT_CONTRACT,
    type: 'string',
    value: '',
  };
  dateJoinCompany: IFormBaseControl = {
    // Ngày vào công ty
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'dateJoinCompany',
    label: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_JOIN_DATE,
    type: 'string',
    value: '',
    readonly: true,
  };
  dateOfficialContract: IFormBaseControl = {
    // Ngày vào chính thức
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'dateOfficialContract',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_OFFICAL_DATE,
    type: 'string',
    value: '',
    readonly: true
  };
  titlePosition: IFormBaseControl = {
    //vị trí chức danh
    flexSize: 6,
    controlType: EnumFormBaseContolType.SEEKER,
    seekerSourceType: EnumCoreFormControlSeekerSourceType.POSITION_SEEK,
    multiMode: false,
    getByIdObject$: this.positionGetByIdObject$,
    getByIdApi: this.positionGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'nameOnProfileEmployee',
    alsoBindTo: [
      { takeFrom: 'orgName', bindTo: 'department' },
      { takeFrom: 'empLmName', bindTo: 'directManagement' },
      { takeFrom: 'lmNameId', bindTo: 'directManagementId' },
      { takeFrom: 'comCode', bindTo: 'comCode' },
      { takeFrom: 'orgId', bindTo: 'orgId' },
      { takeFrom: 'lmJobName', bindTo: 'directManagementPosition' },
      { takeFrom: 'company', bindTo: 'company' },
      { takeFrom: 'workAddress', bindTo: 'addressWorking' },
      { takeFrom: 'insurenceArea', bindTo: 'insurenceArea' },
      { takeFrom: 'insurenceAreaId', bindTo: 'insurenceAreaId' },
      { takeFrom: 'stockCode', bindTo: 'stockCode' },

    ],
    field: 'titlePosition',
    label:
      EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_TITLE_POSITION,
    type: 'number',
    value: '',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  company: IFormBaseControl = {
    //Công ty
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'company',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_COMPANY,
    type: 'string',
    value: '',
    readonly: true,
  };
  stockCode: IFormBaseControl = {
    //Công ty
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'stockCode',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_COMPANY,
    type: 'string',
    value: '',
    readonly:true,
    hidden: true
  };
  addressWorking: IFormBaseControl = {
    //Địa chỉ làm việc
    flexSize: 12,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'addressWorking',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_ADDRESS_WORKING,
    type: 'string',
    value: '',
    readonly: true,
  };
  employeeObjectId: IFormBaseControl = {
    //Đối tượng nhân viên
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'employeeObjectId',
    getByIdObject$: this.employeeObjectGetById$,
    getByIdApi: this.employeeObjectGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.employeeObjectOptions$,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLYEE_OBJECT,
    type: 'string',
    value: '',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  department: IFormBaseControl = {
    //Phòng ban
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'department',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_DEPARTMENT,
    type: 'string',
    value: '',
    readonly: true,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  itimeId: IFormBaseControl = {
    //Chấm công
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'itimeId',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TIME_KEEPING,
    type: 'string',
    value: '',
  };
  directManagementPosition: IFormBaseControl = {
    //Chức danh quản lý trực tiếp
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'directManagementPosition',
    label:
      EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_DIRECT_MANAGEMENT_POSITION,
    type: 'string',
    value: '',
    readonly: true,
  };
  directManagement: IFormBaseControl = {
    //Quản lý trực tiếp
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'directManagement',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_DIRECT_MANAGEMENT,
    type: 'string',
    value: '',
    readonly: true,
  };
  directManagementId: IFormBaseControl = {
    //Quản lý trực tiếp
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'directManagementId',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_DIRECT_MANAGEMENT,
    type: 'string',
    value: '',
    readonly: true,
    hidden: true
  };
  ///End Sector 1///

  ///Sector 2
  genderId: IFormBaseControl = {
    //Giới tính
    flexSize: 3,
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
  birthDay: IFormBaseControl = {
    //Ngày sinh
    flexSize: 3,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'birthDay',
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
  nationId: IFormBaseControl = {
    //Dân tộc
    flexSize: 3,
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
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  nationalityId: IFormBaseControl = {
    //Quốc tịch
    flexSize: 3,
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
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  birthRegisAddress: IFormBaseControl = {
    //Nơi đăng ký giấy khai sinh
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'birthRegisAddress',
    label:
      EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_REGIS_ADDRESS,
    type: 'string',
    value: '',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };

  domicile: IFormBaseControl = {
    //Nguyên quán
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'domicile',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_DOMICILE,
    type: 'string',
    value: '',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  birthAddress: IFormBaseControl = {
    //Nơi sinh
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'birthAddress',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_ADDRESS,
    type: 'string',
    value: '',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  religionId: IFormBaseControl = {
    //Tôn giáo
    flexSize: 6,
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
  maritalStatusId: IFormBaseControl = {
    //Tình trạng hôn nhân
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'maritalStatusId',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_MARITAL_STATUS,
    type: 'string',
    value: '',
    getByIdObject$: this.maritalStatusGetById$,
    getByIdApi: this.maritalStatusGetByIdApi,
    shownFrom: 'name',
    boundFrom: 'id',
    dropdownOptions$: this.maritalStatusOption$,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  identityNumber: IFormBaseControl = {
    //Số CMND/CCCD
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'identityNumber',
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
        validator: StaffProfileEditComponent.validateLengthId,
        errorMessage: EnumTranslateKey.UI_COMPONENT_TITLE_CHECK_LENGTH_INDENTITY,
      },
      {
        name: 'validateSpace',
        validator: StaffProfileEditComponent.validateSpace,
        errorMessage: EnumTranslateKey.UI_COMPONENT_TITLE_CHECK_CONTAINS_SPACE,
      },
      // {
      //   name: 'validateSameFullName',
      //   validator: StaffProfileEditComponent.validateSameFullName,
      //   errorMessage: EnumTranslateKey.UI_COMPONENT_TITLE_CHECK_CONTAINS_SPACE,
      // },
    ],
  };
  identityNumberDate: IFormBaseControl = {
    //Ngày cấp CCCD
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'identityNumberDate',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_DATE,
    type: 'date',
    value: '',
    pipe: EnumCoreTablePipeType.DATE_TIME,
  };
  identityNumberAddress: IFormBaseControl = {
    //Địa chỉ cấp CCCD
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'identityNumberAddress',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_ADDRESS,
    getByIdObject$: this.identityAddressGetById$,
    getByIdApi: this.identityAddressGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.identityAddressOptions$,
    type: 'number',
    value: '',
  };
  taxCode: IFormBaseControl = {
    //Mã số thuế
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'taxCode',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TAX_CODE,
    type: 'string',
    value: '',
    // validators: [
    //   {
    //     name: 'required',
    //     validator: Validators.required,
    //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
    //   },
    //   {
    //     name: 'validateLengthTaxCode',
    //     validator: StaffProfileEditComponent.validateLengthTaxCode,
    //     errorMessage: EnumTranslateKey.UI_COMPONENT_TITLE_CHECK_LENGTH_INDENTITY,
    //   },
    //   {
    //     name: 'validateSpace',
    //     validator: StaffProfileEditComponent.validateSpace,
    //     errorMessage: EnumTranslateKey.UI_COMPONENT_TITLE_CHECK_CONTAINS_SPACE,
    //   },
    // ],

  };
  taxCodeDate: IFormBaseControl = {
    //Ngày cấp mã số thuế
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'taxCodeDate',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TAX_CODE_DATE,
    type: 'date',
    value: '',
    pipe: EnumCoreTablePipeType.DATE_TIME,
  };
  taxCodeDateAddress: IFormBaseControl = {
    //Địa chỉ cấp mã số thuế
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'taxCodeDateAddress',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TAX_CODE_ADDRESS,
    type: 'number',
    value: '',
    getByIdObject$: this.taxCodeAddressGetById$,
    getByIdApi: this.taxCodeAddressGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.taxCodeAddressOptions$,
  };
  healCheckUps: IFormBaseControl = {
    //Số lần khám sức khỏe
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'healCheckUps',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_HEALTH_CHECK_UPS,
    type: 'number',
    value: '',
  };
  healthRatingResult: IFormBaseControl = {
    //Kêt quả khám sức khỏe
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'healthRatingResult',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_HEALTH_RATING_RESULT,
    type: 'string',
    value: '',
  };
  // bloodGroup: IFormBaseControl = {
  //   //Nhóm máu
  //   flexSize: 6,
  //   controlType: EnumFormBaseContolType.TEXTBOX,
  //   field: 'bloodGroup',
  //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BLOODGROUP,
  //   type: 'string',
  //   value: '',
  // };
  // height: IFormBaseControl = {
  //   //Chiều cao
  //   flexSize: 6,
  //   controlType: EnumFormBaseContolType.TEXTBOX,
  //   field: 'height',
  //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEIGHT,
  //   type: 'string',
  //   value: '',
  // };
  // weight: IFormBaseControl = {
  //   //Cân nặng
  //   flexSize: 6,
  //   controlType: EnumFormBaseContolType.TEXTBOX,
  //   field: 'weight',
  //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_WEIGHT,
  //   type: 'string',
  //   value: '',
  // };
  // bloodPressure: IFormBaseControl = {
  //   //Huyết áp
  //   flexSize: 6,
  //   controlType: EnumFormBaseContolType.TEXTBOX,
  //   field: 'bloodPressure',
  //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BLOOD_PRESSURE,
  //   type: 'string',
  //   value: '',
  // };
  // healthType: IFormBaseControl = {
  //   //Loại sức khỏe
  //   flexSize: 6,
  //   controlType: EnumFormBaseContolType.TEXTBOX,
  //   field: 'healthType',
  //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEATH_TYPE,
  //   type: 'string',
  //   value: '',
  // };
  // leftEye: IFormBaseControl = {
  //   //Mắt trái
  //   flexSize: 6,
  //   controlType: EnumFormBaseContolType.TEXTBOX,
  //   field: 'leftEye',
  //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LEFT_EYE,
  //   type: 'string',
  //   value: '',
  // };
  // rightEye: IFormBaseControl = {
  //   //Mắt phải
  //   flexSize: 6,
  //   controlType: EnumFormBaseContolType.TEXTBOX,
  //   field: 'rightEye',
  //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_RIGHT_EYE,
  //   type: 'string',
  //   value: '',
  // };
  // heart: IFormBaseControl = {
  //   //Tim
  //   flexSize: 6,
  //   controlType: EnumFormBaseContolType.TEXTBOX,
  //   field: 'heart',
  //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEART,
  //   type: 'string',
  //   value: '',
  // };
  dateMedicalExam: IFormBaseControl = {
    //Ngày khám chữa bệnh
    flexSize: 3,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'dateMedicalExam',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_DATE_MEDICAL_EXAM,
    type: 'string',
    value: '',
    pipe: EnumCoreTablePipeType.DATE_TIME,
  };
  healthNotes: IFormBaseControl = {
    //Ghi chú sức khỏe
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'healthNotes',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEALTH_NOTE,
    type: 'string',
    value: '',
  };
  ///End Sector 2

  //Sector 3
  passport: IFormBaseControl = {
    //Hộ chiếu
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'passport',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT,
    type: 'string',
    value: '',
  };
  passportDate: IFormBaseControl = {
    //Ngày cấp hộ chiếu
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'passportDate',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_DATE,
    type: 'string',
    value: '',
    pipe: EnumCoreTablePipeType.DATE_TIME,
  };
  passportDateExperiod: IFormBaseControl = {
    //Ngày hết hạn hộ chiếu
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'passportDateExperiod',
    label:
      EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_DATE_EXPERIOD,
    type: 'string',
    value: '',
    pipe: EnumCoreTablePipeType.DATE_TIME,
  };
  passportAddress: IFormBaseControl = {
    //Địa chỉ cấp hộ chiếu
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'passportAddress',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_ADDRESS,
    type: 'string',
    value: '',
  };
  visa: IFormBaseControl = {
    //Visa
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'visa',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_VISA,
    type: 'string',
    value: '',
  };
  visaDate: IFormBaseControl = {
    //ngày cấp visa
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'visaDate',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_VISA_DATE,
    type: 'string',
    value: '',
    pipe: EnumCoreTablePipeType.DATE_TIME,
  };
  visaDateExperiod: IFormBaseControl = {
    //Ngày hết hạn visa
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'visaDateExperiod',
    label:
      EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_VISA_DATE_EXPERIOD,
    type: 'string',
    value: '',
    pipe: EnumCoreTablePipeType.DATE_TIME,
  };
  visaAddress: IFormBaseControl = {
    // Địa chỉ cấp visa
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'visaAddress',
    label:
      EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_VISA_ADDRESS,
    type: 'string',
    value: '',
  };
  laborBookNumber: IFormBaseControl = {
    //Số sổ lao động
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'laborBookNumber',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LABOR_BOOK_NUMBER,
    type: 'string',
    value: '',
  };
  laborBookDate: IFormBaseControl = {
    //Ngày cấp sổ lao động
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'laborBookDate',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LABOR_BOOK_DATE,
    type: 'string',
    value: '',
    pipe: EnumCoreTablePipeType.DATE_TIME,
  };
  laborBookDateExperiod: IFormBaseControl = {
    //Ngày hết hạn sổ lao động
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'laborBookDateExperiod',
    label:
      EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LABOR_BOOK_DATE_EXPERIOD,
    type: 'string',
    value: '',
    pipe: EnumCoreTablePipeType.DATE_TIME,
  };
  laborBookAddress: IFormBaseControl = {
    //Nơi cấp sổ lao động
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'laborBookAddress',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LABOR_BOOK_ADDRESS,
    type: 'string',
    value: '',
  };
  career: IFormBaseControl = {
    //Ngành nghề
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'career',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LABOR_CAREER,
    type: 'string',
    value: '',
  };
  careerBeforeRecruitment: IFormBaseControl = {
    //Ngành nghề trước khi tuyển dụng
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'careerBeforeRecruitment',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_CREATE_BEFORE_RECUITMENT,
    type: 'string',
    value: '',
  };
  insurenceArea: IFormBaseControl = {
    //Vùng bảo hiểm
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'insurenceArea',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_INSURENCE_AREA,
    type: 'string',
    value: '',
    readonly: true,
  };

  insurenceAreaId: IFormBaseControl = {
    //Vùng bảo hiểm ID
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'insurenceAreaId',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_INSURENCE_AREA,
    type: 'string',
    value: '',
    readonly: true,
    hidden: true
  };
  insurenceNumber: IFormBaseControl = {
    //Số bảo hiểm xã hội
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'insurenceNumber',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_INSURENCE_NUMBER,
    type: 'string',
    value: '',
    // validators: [
    //   {
    //     name: 'required',
    //     validator: Validators.required,
    //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
    //   },
    // ],
  };
  medicalExamPlace: IFormBaseControl = {
    //Nơi khám chữa bệnh
    flexSize: 6,
    controlType: EnumFormBaseContolType.DROPDOWN,
    field: 'insWhereHealthId',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_MEDICAL_EXAM_PLACE,
    getByIdObject$: this.insWhereHealthGetById$,
    getByIdApi: this.insWhereHealthGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.insWhereHealthOptions$,
    type: 'number',
    value: '',
  };
  insurenceCardNumber: IFormBaseControl = {
    //Số sổ bảo hiểm (lúc trc là số thẻ sau lại là số sổ)
    // bảo hiểm y tế
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'insurenceCardNumber',
    label:
      EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_INSURENCE_CARD_NUMBER,
    type: 'string',
    value: '',
    // validators: [
    //   {
    //     name: 'required',
    //     validator: Validators.required,
    //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
    //   },
    // ],
  };
  familyMember: IFormBaseControl = {
    //Thành phần gia đình
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'familyMember',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_FAMILY_NUMBER,
    type: 'string',
    value: '',
  };
  familyMatters: IFormBaseControl = {
    //Gia đình chính sách
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'familyMatters',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_FAMILY_MATTER,
    type: 'string',
    value: '',
  };
  veterans: IFormBaseControl = {
    //Thương binh
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'veterans',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_VETERANS,
    type: 'string',
    value: '',
  };
  socialTheory: IFormBaseControl = {
    //Lý luận xã hội
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'socialTheory',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_SOCIAL_THEORY,
    type: 'string',
    value: '',
  };
  titleConferred: IFormBaseControl = {
    //Danh hiệu được phong
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'titleConferred',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TITLE_CONFERRED,
    type: 'string',
    value: '',
  };
  forteWork: IFormBaseControl = {
    //Sở trường công tác
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'forteWork',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_FORTE_WORK,
    type: 'string',
    value: '',
  };

  //End sector 3

  //sector 4
  notePrison: IFormBaseControl = {
    //Ghi chú nếu đã từng ngồi tù
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTAREA,
    field: 'notePrison',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_NOTE_PRISON,
    type: 'string',
    value: '',
  };
  relatives: IFormBaseControl = {
    //Thân nhân
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTAREA,
    field: 'relatives',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_RELATIVES,
    type: 'string',
    value: '',
  };
  yellowFlag: IFormBaseControl = {
    //Có tham gia chế độ cũ 
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTAREA,
    field: 'yellowFlag',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_IS_YELLOW_FLAG,
    type: 'string',
    value: '',
  };

  relations: IFormBaseControl = {
    //Có quan hệ với nước ngoài
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTAREA,
    field: 'relations',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_RELATIONS,
    type: 'string',
    value: '',
  };
  //End Sector 4

  //Sector 5
  isUnionist: IFormBaseControl = { //Đoàn viên
    flexSize: 6,
    controlType: EnumFormBaseContolType.CHECKBOX,
    field: 'isUnionist',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_UNIONIST,
    type: 'string',
    value: '',
  }

  unionistPosition: IFormBaseControl = { //Chức vụ ĐTN
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'unionistPosition',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_UNIONIST_POSITION,
    type: 'string',
    value: '',
  }


  unionistDate: IFormBaseControl = { //	Ngày vào ĐTN
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'unionistDate',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_UNIONIST_DATE,
    type: 'date',
    value: '',
  }

  unionistAddress: IFormBaseControl = { //	Ngày vào ĐTN
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'unionistAddress',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_UNIONIST_ADDRESS,
    type: 'string',
    value: '',
  }

  isJoinYouthGroup: IFormBaseControl = { // Đã tham gia công đoàn
    flexSize: 6,
    controlType: EnumFormBaseContolType.CHECKBOX,
    field: 'isJoinYouthGroup',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_IS_JOIN_UNION,
    type: 'string',
    value: '',
  }
  youthGroupPosition: IFormBaseControl = { //Vị trí trong công đoàn
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'youthGroupPosition',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_GROUP_POSITION,
    type: 'string',
    value: '',
  }
  youthGroupAddress: IFormBaseControl = { //địa chỉ công đoàn
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'youthGroupAddress',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_GROUP_ADDRESS,
    type: 'string',
    value: '',
  }
  youthGroupDate: IFormBaseControl = { //Ngày vào công đoàn
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'youthGroupDate',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_GROUP_DATE,
    type: 'date',
    value: '',
  }
  youthSaveNationPosition: IFormBaseControl = { //vị trí hội thanh niên cứu quốc
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'youthSaveNationPosition',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_SAVE_NATION_POSITION,
    type: 'string',
    value: '',
  }
  youthSaveNationAddress: IFormBaseControl = { //vị trí hội thanh niên cứu quốc
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'youthSaveNationAddress',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_SAVE_NATION_ADDRESS,
    type: 'string',
    value: '',
  }

  isMember: IFormBaseControl = { // Là Đảng viên
    flexSize: 6,
    controlType: EnumFormBaseContolType.CHECKBOX,
    field: 'isMember',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER,
    type: 'string',
    value: '',
  }
  memberPosition: IFormBaseControl = { // Vị trí trong Đảng
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'memberPosition',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_POSITION,
    type: 'string',
    value: '',
  }
  memberAddress: IFormBaseControl = { // địa chỉ vào Đảng
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'memberAddress',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_ADDRESS,
    type: 'string',
    value: '',
  }
  memberDate: IFormBaseControl = { // ngày vào Đảng
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'memberDate',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_DATE,
    type: 'string',
    value: '',
  }
  memberOfficalDate: IFormBaseControl = { // ngày vào chính thức
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'memberOfficalDate',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_OFFICAL_DATE,
    type: 'string',
    value: '',
  }
  youthSaveNationDate: IFormBaseControl = { // ngày vào hội thanh niên cứu quốc
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'youthSaveNationDate',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_YOUTH_SAVE_NATION_DATE,
    type: 'date',
    value: '',
  }

  livingCell: IFormBaseControl = { // chi bộ sinh hoạt
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'livingCell',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LIVING_CELL,
    type: 'string',
    value: '',
  }
  cardNumber: IFormBaseControl = { // ngày vào Đảng
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'cardNumber',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_CARD_NUMBER,
    type: 'string',
    value: '',
  }
  politicalTheoryLevel: IFormBaseControl = {  //TĐ Lý luận chính trị
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'politicalTheoryLevel',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_POLITICAL_THEORY_LEVEL,
    type: 'string',
    value: '',
  }
  resumeNumber: IFormBaseControl = {  //Số lý lịch
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'resumeNumber',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_RESUME_NUMBER,
    type: 'string',
    value: '',
  }
  vateransMemberDate: IFormBaseControl = {  //Ngày vào hội cựu chiến binh
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'vateransMemberDate',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_VATERANS_MEMBER_DATE,
    type: 'string',
    value: '',
  }
  vateransPosition: IFormBaseControl = {  //Chức vụ hội cựu chiến binh
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'vateransPosition',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_VATERANS_POSITION,
    type: 'string',
    value: '',
  }
  vateransAddress: IFormBaseControl = {  //Địa chỉ hội cựu chiến binh
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'vateransAddress',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_VATERANS_ADDRESS,
    type: 'string',
    value: '',
  }
  enlistmentDate: IFormBaseControl = {  //Ngày nhập ngũ
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'enlistmentDate',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_ENLISMENT_DATE,
    type: 'string',
    value: '',
  }
  dischargeDate: IFormBaseControl = {  //Ngày xuất ngũ
    flexSize: 6,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'dischargeDate',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_DISCHARGE_DATE,
    type: 'string',
    value: '',
  }

  highestMilitaryPosition: IFormBaseControl = {  //Chức vụ cao nhất trong quân đội
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'highestMilitaryPosition',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_HIGHEST_MILITARY_POSITION,
    type: 'string',
    value: '',
  }
  currentPartyCommittee: IFormBaseControl = {  //Cấp ủy hiện nay
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'currentPartyCommittee',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_CURRENT_PARTY_COMMITTEE,
    type: 'string',
    value: '',
  }
  partytimePartyCommittee: IFormBaseControl = {  //Cấp ủy kiêm nhiệm
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'partytimePartyCommittee',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PARTY_COMMITTEE,
    type: 'string',
    value: '',
  }
  //End Sector 5
  //Sector 6
  educationLevelId: IFormBaseControl = {  //Trình độ văn hóa
    flexSize: 6,
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
  }
  levelId: IFormBaseControl = {  //Trình độ ngoại ngữ
    flexSize: 6,
    value: '',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_LEVEL_ID,
    field: 'levelId',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.learningLevelGetById$,
    getByIdApi: this.learningLevelGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.learningLevelOptions$,
  }
  computerSkillId: IFormBaseControl = {  //kỹ năng máy tính
    flexSize: 6,
    value: '',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_COMPUTER_SKILL,
    field: 'computerSkillId',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.computerSkillGetByIdObject$,
    getByIdApi: this.computerSkillGetByIdApi,
    dropdownOptions$: this.computerSkillOptions$,
    shownFrom: 'name',
  }
  licenseId: IFormBaseControl = {  //bằng lái xe
    flexSize: 6,
    value: '',
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LICENSE,
    field: 'licenseId',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.licenseGetByIdObject$,
    getByIdApi: this.licenseGetByIdApi,
    dropdownOptions$: this.licenseOptions$,
    shownFrom: 'name',
  }
  qualificationId: IFormBaseControl = {  //Trình độ chuyên môn
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_QUALIFICATION_1,
    flexSize: 6,
    field: 'qualificationId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.qualificationGetById$,
    getByIdApi: this.qualificationGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.qualificationOptions$,
  }

  qualificationId2: IFormBaseControl = {  //Trình độ chuyên môn 2
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_QUALIFICATION_2,
    flexSize: 6,
    field: 'qualificationId2',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.qualificationGetById2$,
    getByIdApi: this.qualificationGetByIdApi2,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.qualificationOptions2$,
  }
  qualificationId3: IFormBaseControl = {  //Trình độ chuyên môn 3
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_QUALIFICATION_3,
    flexSize: 6,
    field: 'qualificationId3',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.qualificationGetById3$,
    getByIdApi: this.qualificationGetByIdApi3,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.qualificationOptions3$,
  }
  trainingFormId: IFormBaseControl = {  //Trình độ chuyên môn 3
    flexSize: 4,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_TRAINING_FORM_1,
    field: 'trainingFormId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.trainingFormGetById$,
    getByIdApi: this.trainingFormGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.trainingFormOptions$,
  }
  trainingFormId2: IFormBaseControl = {  //Trình độ chuyên môn 3
    flexSize: 4,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_TRAINING_FORM_2,
    field: 'trainingFormId2',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.trainingFormGetById2$,
    getByIdApi: this.trainingFormGetByIdApi2,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.trainingFormOptions2$,
  }
  trainingFormId3: IFormBaseControl = {  //Trình độ chuyên môn 3
    flexSize: 4,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_TRAINING_FORM_3,
    field: 'trainingFormId3',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.trainingFormGetById3$,
    getByIdApi: this.trainingFormGetByIdApi3,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.trainingFormOptions3$,
  }
  schoolId: IFormBaseControl = {  //Trường học
    flexSize: 4,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_SCHOOLE_1,
    field: 'schoolId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.graduateSchoolGetById$,
    getByIdApi: this.graduateSchoolGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.graduateSchoolOptions$,
  }
  schoolId2: IFormBaseControl = {  //Trường học
    flexSize: 4,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_SCHOOLE_2,
    field: 'schoolId2',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.graduateSchoolGetById2$,
    getByIdApi: this.graduateSchoolGetByIdApi2,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.graduateSchoolOptions2$,
  }
  schoolId3: IFormBaseControl = {  //Trường học
    flexSize: 4,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_SCHOOLE_3,
    field: 'schoolId3',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.graduateSchoolGetById3$,
    getByIdApi: this.graduateSchoolGetByIdApi3,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.graduateSchoolOptions3$,
  }
  languageId: IFormBaseControl = {  //Ngoại ngữ
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LANGUAGE_1,
    flexSize: 6,
    field: 'languageId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.languageGetById$,
    getByIdApi: this.languageGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.languageOptions$,
  }
  languageId2: IFormBaseControl = {  //Ngoại ngữ
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LANGUAGE_2,
    flexSize: 6,
    field: 'languageId2',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.languageGetById2$,
    getByIdApi: this.languageGetByIdApi2,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.languageOptions2$,
  }
  languageId3: IFormBaseControl = {  //Ngoại ngữ
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LANGUAGE_3,
    flexSize: 6,
    field: 'languageId3',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.languageGetById3$,
    getByIdApi: this.languageGetByIdApi3,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.languageOptions3$,
  }
  languageLevelId: IFormBaseControl = {  //Trình độ ngoại ngữ
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LANGUAGE_LEVEL_1,
    flexSize: 6,
    field: 'languageLevelId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.languageLevelGetById$,
    getByIdApi: this.languageLevelGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.languageLevelOptions$,
  }
  languageLevelId2: IFormBaseControl = {  //Trình độ ngoại ngữ
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LANGUAGE_LEVEL_2,
    flexSize: 6,
    field: 'languageLevelId2',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.languageLevelGetById2$,
    getByIdApi: this.languageLevelGetByIdApi2,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.languageLevelOptions2$,
  }
  languageLevelId3: IFormBaseControl = {  //Trình độ ngoại ngữ
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LANGUAGE_LEVEL_3,
    flexSize: 6,
    field: 'languageLevelId3',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.languageLevelGetById3$,
    getByIdApi: this.languageLevelGetByIdApi3,
    boundFrom: 'id',
    shownFrom: 'name',
    dropdownOptions$: this.languageLevelOptions3$,
  }


  //End sector 6

  // sector 7
  presenter: IFormBaseControl = {  //Người giới thiệu
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PRESENTER,
    field: 'presenter',
    controlType: EnumFormBaseContolType.SEEKER,
    seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
    getByIdObject$: this.employeeGetByIdObject$,
    getByIdApi: this.employeeGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'fullname',
    type: 'number',
    value: '',
    alsoBindTo: [{ takeFrom: 'addressReffererEmployee', bindTo: 'presenterAddress' },
    { takeFrom: 'mobilePhone', bindTo: 'presenterPhoneNumber' }],
  }
  presenterAddress: IFormBaseControl = {  //Địa chỉ người giới thiệu
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PRESENTER_ADDRESS,
    field: 'presenterAddress',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    readonly: true
  }

  presenterPhoneNumber: IFormBaseControl = {  //Số đth người giới thiệu
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PHONE_NUMBER,
    field: 'presenterPhoneNumber',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    readonly: true
  }
  //End sector 7

  //sector 8
  isHost: IFormBaseControl = {  //Là chủ hộ
    flexSize: 6,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_HOST,
    field: 'isHost',
    value: '',
    controlType: EnumFormBaseContolType.CHECKBOX,
  }
  householdNumber: IFormBaseControl = {  //Số hộ gia đình
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_HOUSEHOLD_NUMBER,
    field: 'householdNumber',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
  }
  householdCode: IFormBaseControl = {  //Mã hộ gia đình
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_HOUSEHOLD_CODE,
    field: 'householdCode',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
  }
  address: IFormBaseControl = {  //Địa chỉ
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_ADDRESS,
    field: 'address',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  }
  provinceId: IFormBaseControl = {  //Mã tỉnh thành
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CITY,
    field: 'provinceId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    dropdownOptions$: this.cityOptions$,
    shownFrom: 'name',
    boundFrom: 'id',
    getByIdObject$: this.cityGetById$,
    getByIdApi: this.cityGetByIdApi,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  }
  districtId: IFormBaseControl = {  //Mã quận huyện
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_DISTRICT,
    field: 'districtId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    dropdownOptions$: this.districtOptions$,
    shownFrom: 'name',
    boundFrom: 'id',
    getByIdObject$: this.districtGetById$,
    getByIdApi: this.districtGetByIdApi,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  }
  wardId: IFormBaseControl = {  //Mã xã phường
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_WARD,
    field: 'wardId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    dropdownOptions$: this.wardOptions$,
    shownFrom: 'name',
    boundFrom: 'id',
    getByIdObject$: this.wardGetById$,
    getByIdApi: this.wardGetByIdApi,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  }
  curAddress: IFormBaseControl = {  //địa chỉ tạm trú
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_ADDRESS,
    field: 'curAddress',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,

  }
  curProvinceId: IFormBaseControl = {  //tỉnh thành tạm trú
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_CITY,
    field: 'curProvinceId',
    value: '',
    shownFrom: 'name',
    boundFrom: 'id',
    controlType: EnumFormBaseContolType.DROPDOWN,
    dropdownOptions$: this.curCityOptions$,
    getByIdObject$: this.curCityGetById$,
    getByIdApi: this.curCityGetByIdApi,
  }
  curDistrictId: IFormBaseControl = {  //quận huyện tạm trú
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_DISTRICT,
    field: 'curDistrictId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    dropdownOptions$: this.curDistrictOptions$,
    shownFrom: 'name',
    boundFrom: 'id',
    getByIdObject$: this.curDistrictGetById$,
    getByIdApi: this.curDistrictGetByIdApi,
  }
  curWardId: IFormBaseControl = {  //xã phường tạm trú
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_WARD,
    field: 'curWardId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    dropdownOptions$: this.curWardOptions$,
    shownFrom: 'name',
    boundFrom: 'id',
    getByIdObject$: this.curWardGetById$,
    getByIdApi: this.curWardGetByIdApi,
  }

  telephone: IFormBaseControl = {  //điện thoại di động
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_TELEPHONE,
    field: 'telephone',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
  }
  landlinePhone: IFormBaseControl = {  //điện thoại bàn
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_LANDLINE_PHONE,
    field: 'landlinePhone',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
  }
  emailCompany: IFormBaseControl = {  //Email công ty
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_EMAIL_COMPANY,
    field: 'emailCompany',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
  }
  emailPersonal: IFormBaseControl = {  //Email cá nhân
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_EMAIL_PERSONAL,
    field: 'emailPersonal',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
  }

  //End sector 8

  //sector 9
  bankId: IFormBaseControl = {  //tên ngân hàng
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_ID,
    field: 'bankId',
    value: null,
    controlType: EnumFormBaseContolType.DROPDOWN,
    dropdownOptions$: this.bankOptions$,
    getByIdObject$: this.bankGetByIdObject$,
    getByIdApi: api.HU_BANK_READ,
    shownFrom: 'name',
    type: 'number',
  }
  bankId2: IFormBaseControl = {  //tên ngân hàng 2
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_ID_2,
    field: 'bankId2',
    value: null,
    controlType: EnumFormBaseContolType.DROPDOWN,
    dropdownOptions$: this.bankOptions2$,
    getByIdObject$: this.bankGetByIdObject2$,
    getByIdApi: api.HU_BANK_READ,
    shownFrom: 'name',
    type: 'number',
  }

  bankBranchId: IFormBaseControl = {  //chi nhánh ngân hàng
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_BRANCH_1,
    field: 'bankBranchId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    dropdownOptions$: this.bankBranhOptions$,
    getByIdObject$: this.bankBranhGetByIdObject$,
    getByIdApi: api.HU_BANK_BRANCH_READ,
    boundFrom: 'id',
    shownFrom: 'name',
    type: 'number',
  }
  bankBranchId2: IFormBaseControl = {  //chi nhánh ngân hàng 2
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_BRANCH_2,
    field: 'bankBranchId2',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    dropdownOptions$: this.bankBranhOptions2$,
    getByIdObject$: this.bankBranhGetByIdObject2$,
    getByIdApi: api.HU_BANK_BRANCH_READ,
    shownFrom: 'name',
    boundFrom: 'id',
    type: 'number',
  }
  bankName: IFormBaseControl = {  //Tên tài khoảng ngân hàng
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NAME,
    field: 'bankName',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'text',
  }
  bankNo: IFormBaseControl = {  //Số tài khoản
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO_1,
    field: 'bankNo',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'text',
  }
  bankNo2: IFormBaseControl = {  //Số tài khoản 2
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO_2,
    field: 'bankNo2',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'text',
  }
  //End sector 9

  //sector 10
  mainIncome: IFormBaseControl = {  //Thu nhập chính của gia đình
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_MAIN_INCOME,
    field: 'mainIncome',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
  }
  otherSources: IFormBaseControl = {  //Thu nhập nguồn khác
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_OTHER_SOURCES,
    field: 'otherSources',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
  }
  landGranted: IFormBaseControl = {  //Đất được cấp
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_LAND_GRANTED,
    field: 'landGranted',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
  }
  taxGrantedHouse: IFormBaseControl = {  //Loại nhà được cấp thuế
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_TAX_GRANTED_HOUSE,
    field: 'taxGrantedHouse',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
  }
  totalArea: IFormBaseControl = {  //Tổng diện tích
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_TOTAL_AREA,
    field: 'totalArea',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
  }
  selfPurchaseLand: IFormBaseControl = {  //Đất tự mua
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_SELF_PURCHASED_LAND,
    field: 'selfPurchaseLand',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
  }
  selfBuildHouse: IFormBaseControl = {  //Loại nhà tự mua tự xây
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_SELF_BUILD_HOUSE,
    field: 'selfBuildHouse',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
  }
  totalAppArea: IFormBaseControl = {  //Thu nhập nguồn khác
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_TOTAL_APP_AREA,
    field: 'totalAppArea',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
  }
  landForProduction: IFormBaseControl = {  //Đất sản xuất kinh doanh
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_LAND_FOR_PRODUCTION,
    field: 'landForProduction',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
  }
  additionalInformation: IFormBaseControl = {  //Thông tin bổ sung hoàn cảnh kinh tế
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_ADDITIONAL_INFOMATION,
    field: 'additionalInformation',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
  }
  allowedNameDuplicate: IFormBaseControl = {  //Cho phép nhập trùng tên
    flexSize: 12,
    label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_ALLOWED_SAME_NAME,
    field: 'allowedNameDuplicate',
    value: '',
    controlType: EnumFormBaseContolType.CHECKBOX,
  }
  //End sector 10

  checkError$ = new BehaviorSubject<boolean>(false);
  listInstance!: number;
  // arrayBasic: any[] = [];
  // arrayCv: any[] = [];
  // arrayContact:  any[] = [];
  // arrayInfo: any[] = [];
  textValidate: any;
  textValidateTaxCode: any;
  validateidentityNumber: any;


  constructor(
    private route: ActivatedRoute,
    public override dialogService: DialogService,
    private fb: FormBuilder,
    private appService: AppService,
    private staffProfileEditService: StaffProfileEditService,
    private alertService: AlertService,
    private randomAvatarService: RandomAvatarService,
    private mls: MultiLanguageService,
    private router: Router,
    private responseService: ResponseService,
    private familyEditService: FamilyEditService,
    private corePageListService: CorePageListService,
    private coreFormService: CoreFormService,
    private coreAccordionService: CoreAccordionService,


  ) {
    super(dialogService);
    this.sectors = this.staffProfileEditService.sectors;

    // Ẩn thông tin người giới thiệu (Tiến BA)
    // this.sectors = this.sectors.filter(x => x.id !== "referrer");
    // tester Tuấn Anh yêu cầu ẩn "cái dấu sao bắt buộc"
    // this.sectors.forEach(x => {
    //   // viết code xử lý nghiệp vụ
    //   // ẩn cái dấu * đi
    //   if(x.id == "info"){
    //     x.required = false;
    //   }
    // });
    this.defaultAvatar = this.randomAvatarService.get();
  }

  ngOnInit(): void {
    this.createForm();
    this.subsctiptions.push(
      this.mls.lang$.subscribe(x => this.lang = x),
    )
    this.listInstance = this.corePageListService.instances[0]?.instanceNumber;
    // this.staffProfileEditService.listInstance$.next(this.listInstance)
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getAllValueDropdown();
      // this.getCode();
      this.formInitStringValue = JSON.stringify(this.form.getRawValue());
      this.subsctiptions.push(
        this.appService.get(api.INS_WHEREHEALTH_READ_ALL).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body
            if (body.statusCode === 200) {
              const options: { value: number; text: string }[] = [];
              body.innerBody.map((get: any) => {
                options.push({
                  value: get.id,
                  text: get.nameVn,
                });
              });
              this.insWhereHealthOptions$.next(options);
            } else {
              //this.responseService.resolve(body)
            }
          } else {
            //this.alertService.error(JSON.stringify(x), this.alertOptions)
          }
        }
        ))
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
                this.cityOptions$.next(options);
                this.curCityOptions$.next(options);
                this.identityAddressOptions$.next(options);
                this.taxCodeAddressOptions$.next(options);
              }
            }
          })
      )

      this.subsctiptions.push( // <== Outer push
        this.form.get('provinceId')?.valueChanges.subscribe(x => {
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
                      this.districtOptions$.next(options);
                    }
                  }
                })
            )
          }
        })!
      )
      this.subsctiptions.push( // <== Outer push
        this.form.get('curProvinceId')?.valueChanges.subscribe(x => {
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
                      this.curDistrictOptions$.next(options);
                    }
                  }
                })
            )
          }
        })!
      )

      this.form.get('districtId')?.valueChanges.subscribe(x => {
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
                    this.wardOptions$.next(options);
                  }
                }
              })
          )
        }
      })!
      this.form.get('curDistrictId')?.valueChanges.subscribe(x => {
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
                    this.curWardOptions$.next(options);
                  }
                }
              })
          )
        }
      })!
      this.subsctiptions.push(
        this.appService.get(api.HU_BANK_READ_ALL).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              const newBankOptions: ICoreDropdownOption[] = [];
              body.innerBody.map((item: any) => {
                newBankOptions.push({
                  value: item.id,
                  text: item.name
                })
              });
              this.bankOptions$.next(newBankOptions);
              this.bankOptions2$.next(newBankOptions);
            }
          }
        })
      )
      this.form.get('bankId')?.valueChanges.subscribe(x => {
        if (!!x) {
          this.subsctiptions.push( // <== Inner push
            this.appService
              .get(api.HU_BANK_BRANCH_BY_BANK_ID + x)
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
                    this.bankBranhOptions$.next(options);
                  }
                }
              })
          )
        }
      })!

      this.form.get('bankId2')?.valueChanges.subscribe(x => {
        if (!!x) {
          this.subsctiptions.push( // <== Inner push
            this.appService
              .get(api.HU_BANK_BRANCH_BY_BANK_ID + x)
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
                    this.bankBranhOptions2$.next(options);
                  }
                }
              })
          )
        }
      })!

      this.subsctiptions.push(
        this.form.get('name')?.valueChanges.subscribe(rs => {
          this.form.get('bankName')?.setValue(this.removeDiacriticsAndToUpper(this.form.get('name')?.value))
        })!
      )

    })


    // this.name.blur$?.subscribe(x => {
    //   if(!!x){
    //       this.appService.get(api.HU_EMPLOYEE_CHECK_SAME_NAME + this.form.get('name')?.value).subscribe(y => {
    //         if(!!y && y.status == 200){
    //           if(!!y.body.innerBody && !!!this.form.get('allowedNameDuplicate')?.value){
    //             this.textValidate = y.body.innerBody;
    //           }else{
    //             this.textValidate = null;
    //           }

    //         }
    //       })
    //   }

    // })
    // this.name.focus$?.subscribe(x => {
    //   if(!!x){
    //       this.appService.get(api.HU_EMPLOYEE_CHECK_SAME_NAME + this.form.get('name')?.value).subscribe(y => {
    //         if(!!y && y.status == 200){
    //           if(!!y.body.innerBody && !!this.form.get('allowedNameDuplicate')?.value){
    //             this.textValidate = y.body.innerBody;
    //           }else{
    //             this.textValidate = null;
    //           }

    //         }
    //       })
    //   }

    // })

    this.subsctiptions.push(
      this.form.get('name')?.valueChanges.subscribe(x => {
        if (!!x && x != this.textValidate) {
          this.appService.get(api.HU_EMPLOYEE_CHECK_SAME_NAME + this.form.get('name')?.value).subscribe(y => {
            if (!!y && y.status == 200) {
              if (!!y.body.innerBody && !!!this.form.get('allowedNameDuplicate')?.value) {
                this.textValidate = y.body.innerBody;
              } else {
                this.textValidate = null;
              }
            }
          })
        }
      })!

    )
    // this.subsctiptions.push(
    //   this.form.get('taxCode')?.valueChanges.subscribe(x => {
    //     if(!!x && x != this.textValidateTaxCode){
    //       this.appService.get(api.HU_EMPLOYEE_CHECK_SAME_TAXCODE + this.form.get('taxCode')?.value).subscribe(y => {
    //         if(!!y && y.status == 200){
    //           if(!!y.body.innerBody){
    //             this.textValidateTaxCode = y.body.innerBody;
    //           }else{
    //             this.textValidateTaxCode = null;
    //           }
    //         }
    //       })
    //     }
    //   })!

    // )
    this.subsctiptions.push(
      this.form.get('identityNumber')?.valueChanges.subscribe(x => {
        if (!!x && x != this.validateidentityNumber) {
          this.appService.get(api.HU_EMPLOYEE_CHECK_SAME_ID_NO + this.form.get('identityNumber')?.value).subscribe(y => {
            if (!!y && y.status == 200) {
              if (!!y.body.innerBody) {
                this.validateidentityNumber = y.body.innerBody;
              } else {
                this.validateidentityNumber = null;
              }
            }
          })
        }
      })!

    )
    this.subsctiptions.push(
      this.form.get('allowedNameDuplicate')?.valueChanges.subscribe(x => {
        if (x == true) {
          this.textValidate = null;
        } else {
          this.appService.get(api.HU_EMPLOYEE_CHECK_SAME_NAME + this.form.get('name')?.value).subscribe(y => {
            if (!!y && y.status == 200) {
              if (!!y.body.innerBody) {
                this.textValidate = y.body.innerBody;
              } else {
                this.textValidate = null;
              }
            }
          })
        }
      })!
    )
    this.subsctiptions.push(
      this.coreAccordionService.heightList$?.subscribe(x => {
        if (x.length > 0) {
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
        if (x == "VALID") {
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

  getAllValueDropdown() {
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
            case 'RC_COMPUTER_LEVEL':
              this.computerSkillOptions$.next(options);
              break;
            case 'BLX':
              this.licenseOptions$.next(options);
              break;
            case 'OBJECT_EMPLOYEE':
              this.employeeObjectOptions$.next(options);
              break;
            case 'GENDER':
              this.genderOption$.next(options);
              break;
            case 'NATION':
              this.nationOption$.next(options);
              break;
            case 'NATIONALITY':
              this.nationalityOption$.next(options);
              // let valueDefault = {
              //   name : 'Việt Nam'
              // }
              // this.nationalityGetById$.next(valueDefault)
              break;
            case 'FAMILY_STATUS':
              this.maritalStatusOption$.next(options);
              break;
            case 'RELIGION':
              this.religionOption$.next(options);
              break;
            case 'LANGUAGE_LEVEL':
              this.learningLevelOptions$.next(options);
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
            case 'EDUCATION_LEVEL':
              this.educationLevelOptions$.next(options);
              break;
            default:
              break;
          }
        }
      });
    });
  }

  // getCode() {
  //   this.subsctiptions.push(
  //     this.form.get('comCode')?.valueChanges.subscribe((x) => {
  //       this.staffProfileEditService
  //         .GetCode(this.form.get('comCode')?.value)
  //         .subscribe((response: any) => {
  //           let newCodeEmployee = response.body.innerBody.code;
  //           if(newCodeEmployee != null){
  //             this.form.get('code')?.setValue(newCodeEmployee);
  //             this.profileCode.readonly = false
  //             this.form.get('profileCode')?.enable();
  //             this.form.get('profileCode')?.setValue(newCodeEmployee);
  //           }
  //         });
  //     })!
  //   );
  // }

  removeDiacriticsAndToUpper(inputString: string) {
    const diacriticsMap: { [key: string]: string } = {
      'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
      'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
      'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
      'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
      'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
      'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
      'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
      'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
      'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
      'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
      'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
      'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
      'đ': 'd'
    };
    Object.keys(diacriticsMap).forEach(x => {
      if (inputString.includes(x)) {
        inputString = inputString.toLowerCase().replace(/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/g, match => diacriticsMap[match])
        inputString = inputString.toUpperCase()
      }
    })

    return inputString
  }

  createForm() {
    // CODE CŨ
    // this.form = this.fb.group({
    //   comCode: [null],
    //   orgId: [null],
    //   avatar: [null],
    //   avatarFileName: [null],
    //   avatarFileData: [null],
    //   avatarFileType: [null],
    //   name: [null, [Validators.required]],
    //   code: [null],
    //   otherName: [null],
    //   employeeCode: [null],
    //   profileCode: [null],
    //   isNotContract: [null],
    //   titlePosition: [null, [Validators.required]],
    //   addressWorking: [null],
    //   employeeObjectId: [null, [Validators.required]],
    //   department: [null, [Validators.required]],
    //   directManagementPosition: [null],
    //   itimeCode: [null],
    //   directManagement: [null],
    //   directManagementId : [null],
    //   company: [null],

    //   genderId: [null, [Validators.required]],
    //   birthDay: [null, [Validators.required]],
    //   nationId: [null],
    //   nationalityId: [null],
    //   birthRegisAddress: [null],
    //   domicile: [null],
    //   birthAddress: [null],
    //   religionId: [null],
    //   maritalStatusId: [null],
    //   identityNumber: [null, [Validators.required, StaffProfileEditComponent.validateLengthId,  StaffProfileEditComponent.validateSpace]],
    //   identityNumberDate: [null],
    //   identityNumberAddress: [null],
    //   taxCode: [null],
    //   taxCodeDate: [null],
    //   taxCodeDateAddress: [null],
    //   bloodGroup: [null],
    //   height: [null],
    //   weight: [null],
    //   bloodPressure: [null],
    //   healthType: [null],
    //   leftEye: [null],
    //   rightEye: [null],
    //   heart: [null],
    //   dateMedicalExam: [null],
    //   healthNotes: [null],

    //   passport: [null],
    //   passportDate: [null],
    //   passportDateExperiod: [null],
    //   passportAddress: [null],
    //   visa: [null],
    //   visaDate: [null],
    //   visaDateExperiod: [null],
    //   visaAddress: [null],
    //   laborBookNumber: [null],
    //   laborBookDate: [null],
    //   laborBookDateExperiod: [null],
    //   laborBookAddress: [null],
    //   career: [null],
    //   careerBeforeRecruitment: [null],
    //   insurenceArea: [null],
    //   insurenceAreaId: [null],
    //   insurenceNumber: [null, [Validators.required]],
    //   medicalExamPlace: [null],
    //   insurenceCardNumber: [null, [Validators.required]],
    //   familyMember: [null],
    //   familyMatters: [null],
    //   veterans: [null],
    //   socialTheory: [null],
    //   titleConferred: [null],
    //   forteWork: [null],
    //   notePrison: [null],
    //   relatives: [null],
    //   relations: [null],
    //   yellowFlag: [null],
    //   isUnionist: [null],
    //   unionistPosition: [null],
    //   unionistDate: [null],
    //   unionistAddress: [null],
    //   isJoinYouthGroup: [null],
    //   youthGroupPosition: [null],
    //   youthGroupDate : [null],
    //   youthGroupAddress: [null],
    //   youthSaveNationDate : [null],
    //   youthSaveNationPosition: [null],
    //   youthSaveNationAddress: [null],

    //   isMember: [null],
    //   memberPosition: [null],
    //   memberAddress: [null],
    //   memberDate: [null],
    //   memberOfficalDate: [null],
    //   livingCell: [null],
    //   cardNumber: [null],
    //   politicalTheoryLevel: [null],
    //   resumeNumber: [null],
    //   vateransMemberDate: [null],
    //   vateransPosition: [null],
    //   vateransAddress: [null],
    //   enlistmentDate: [null],
    //   dischargeDate: [null],
    //   highestMilitaryPosition: [null],
    //   currentPartyCommittee: [null],
    //   partytimePartyCommittee: [null],
    //   educationLevelId: [null],
    //   learningLevelId: [null],
    //   computerSkill: [null],
    //   license: [null],
    //   qualificationId: [null],
    //   qualificationId2: [null],
    //   qualificationId3: [null],
    //   trainingFormId: [null],
    //   trainingFormId2: [null],
    //   trainingFormId3: [null],
    //   schoolId: [null],
    //   schoolId2: [null],
    //   schoolId3: [null],
    //   languageId: [null],
    //   languageId2: [null],
    //   languageId3: [null],
    //   languageLevelId: [null],
    //   languageLevelId2: [null],
    //   languageLevelId3: [null],
    //   presenter: [null],
    //   presenterPhoneNumber: [null],
    //   presenterAddress: [null],
    //   isHost: [null],
    //   householdNumber: [null],
    //   householdCode: [null],
    //   address: [null,[Validators.required]],
    //   provinceId: [null,[Validators.required]],
    //   districtId: [null,[Validators.required]],
    //   wardId: [null,[Validators.required]],
    //   curAddress: [null],
    //   curProvinceId: [null],
    //   curDistrictId: [null],
    //   curWardId: [null],
    //   telephone: [null],
    //   landlinePhone: [null],
    //   emailCompany: [null],
    //   emailPersonal: [null],
    //   bankId: [null],
    //   bankName: [null],
    //   bankBranchId: [null],
    //   bankNo: [null],
    //   bankId2: [null],
    //   bankBranchId2: [null],
    //   bankNo2: [null],
    //   mainIncome: [null],
    //   otherSources: [null],
    //   landGranted: [null],
    //   taxGrantedHouse: [null],
    //   totalArea: [null],
    //   selfPurchaseLand: [null],
    //   selfBuildHouse: [null],
    //   totalAppArea: [null],
    //   landForProduction: [null],
    //   additionalInformation: [null],
    //   allowedNameDuplicate: [null],
    // });


    this.form = this.fb.group({
      comCode: [null],
      orgId: [null],
      avatar: [null],
      avatarFileName: [null],
      avatarFileData: [null],
      avatarFileType: [null],
      name: [null, [Validators.required]],
      code: [null],
      otherName: [null],
      employeeCode: [null],
      profileCode: [null],
      isNotContract: [null],
      titlePosition: [null, [Validators.required]],
      addressWorking: [null],
      employeeObjectId: [null, [Validators.required]],
      department: [null, [Validators.required]],
      directManagementPosition: [null],
      itimeId: [null],
      directManagement: [null],
      directManagementId: [null],
      company: [null],
      stockCode : [null],
      genderId: [null, [Validators.required]],
      birthDay: [null, [Validators.required]],
      nationId: [null],
      nationalityId: [null],
      birthRegisAddress: [null],
      domicile: [null],
      birthAddress: [null],
      religionId: [null],
      maritalStatusId: [null],
      identityNumber: [null, [Validators.required, StaffProfileEditComponent.validateLengthId, StaffProfileEditComponent.validateSpace]],
      identityNumberDate: [null],
      identityNumberAddress: [null],
      taxCode: [null],
      taxCodeDate: [null],
      taxCodeDateAddress: [null],
      bloodGroup: [null],
      height: [null],
      weight: [null],
      bloodPressure: [null],
      healthType: [null],
      leftEye: [null],
      rightEye: [null],
      heart: [null],
      dateMedicalExam: [null],
      healthNotes: [null],

      passport: [null],
      passportDate: [null],
      passportDateExperiod: [null],
      passportAddress: [null],
      visa: [null],
      visaDate: [null],
      visaDateExperiod: [null],
      visaAddress: [null],
      laborBookNumber: [null],
      laborBookDate: [null],
      laborBookDateExperiod: [null],
      laborBookAddress: [null],
      career: [null],
      careerBeforeRecruitment: [null],
      insurenceArea: [null],
      insurenceAreaId: [null],
      insurenceNumber: [null],
      medicalExamPlace: [null],
      insurenceCardNumber: [null],
      familyMember: [null],
      familyMatters: [null],
      veterans: [null],
      socialTheory: [null],
      titleConferred: [null],
      forteWork: [null],
      notePrison: [null],
      relatives: [null],
      relations: [null],
      yellowFlag: [null],
      isUnionist: [null],
      unionistPosition: [null],
      unionistDate: [null],
      unionistAddress: [null],
      isJoinYouthGroup: [null],
      youthGroupPosition: [null],
      youthGroupDate: [null],
      youthGroupAddress: [null],
      youthSaveNationDate: [null],
      youthSaveNationPosition: [null],
      youthSaveNationAddress: [null],

      isMember: [null],
      memberPosition: [null],
      memberAddress: [null],
      memberDate: [null],
      memberOfficalDate: [null],
      livingCell: [null],
      cardNumber: [null],
      politicalTheoryLevel: [null],
      resumeNumber: [null],
      vateransMemberDate: [null],
      vateransPosition: [null],
      vateransAddress: [null],
      enlistmentDate: [null],
      dischargeDate: [null],
      highestMilitaryPosition: [null],
      currentPartyCommittee: [null],
      partytimePartyCommittee: [null],
      educationLevelId: [null],
      learningLevelId: [null],
      computerSkillId: [null],
      licenseId: [null],
      qualificationId: [null],
      qualificationId2: [null],
      qualificationId3: [null],
      trainingFormId: [null],
      trainingFormId2: [null],
      trainingFormId3: [null],
      schoolId: [null],
      schoolId2: [null],
      schoolId3: [null],
      languageId: [null],
      languageId2: [null],
      languageId3: [null],
      languageLevelId: [null],
      languageLevelId2: [null],
      languageLevelId3: [null],
      presenter: [null],
      presenterPhoneNumber: [null],
      presenterAddress: [null],
      isHost: [null],
      householdNumber: [null],
      householdCode: [null],
      address: [null, [Validators.required]],
      provinceId: [null, [Validators.required]],
      districtId: [null, [Validators.required]],
      wardId: [null, [Validators.required]],
      curAddress: [null],
      curProvinceId: [null],
      curDistrictId: [null],
      curWardId: [null],
      telephone: [null],
      landlinePhone: [null],
      emailCompany: [null],
      emailPersonal: [null],
      bankId: [null],
      bankName: [null],
      bankBranchId: [null],
      bankNo: [null],
      bankId2: [null],
      bankBranchId2: [null],
      bankNo2: [null],
      mainIncome: [null],
      otherSources: [null],
      landGranted: [null],
      taxGrantedHouse: [null],
      totalArea: [null],
      selfPurchaseLand: [null],
      selfBuildHouse: [null],
      totalAppArea: [null],
      landForProduction: [null],
      additionalInformation: [null],
      allowedNameDuplicate: [null],
    });
  }

  static validateLengthId(control: AbstractControl): any | null {
    let valid = true;
    const value = control?.value;
    if ((value?.length === 9 || value?.length === 12)) {
      return null; // Hợp lệ
    }
    valid = false;
    let errorMessage = EnumTranslateKey.UI_COMPONENT_TITLE_CHECK_LENGTH_INDENTITY_1;
    return CustomValidators.core('validateLengthId', valid, errorMessage)(control);
  }
  // static validateLengthTaxCode(control : AbstractControl) : any | null{
  //   let valid = true;
  //   const value = control?.value;
  //   if ((value?.length === 10 || value?.length === 13)) {
  //     return null; // Hợp lệ
  //   }
  //     valid = false;
  //     let errorMessage = EnumTranslateKey.UI_COMPONENT_TITLE_CHECK_LENGTH_INDENTITY_2;
  //     return CustomValidators.core('validateLengthTaxCode', valid, errorMessage)(control);
  // }

  static validateSpace(control: AbstractControl): any | null {
    let valid = true;
    const value = control?.value;
    if (!value?.includes(' ')) {
      return null;
    } else {
      valid = false;
      let errorMessage = EnumTranslateKey.UI_COMPONENT_TITLE_CHECK_CONTAINS_SPACE;
      return CustomValidators.core('validateSpace', valid, errorMessage)(control);
    }
  }


  // validateSameFullName(control : AbstractControl) : any | null {
  //   // let valid = true;
  //   // const value = control?.value;
  //   let valid = false;
  //   let errorMessage = this.textValidate;
  //   return CustomValidators.core('validateSameFullName', valid, errorMessage)(control);
  // }


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
    this.router.navigateByUrl('/cms/profile/business/staffprofile');
  }

  onFormSubmit() {
    // in ra cái đối tượng Form
    console.log("robot: in ra cái đối tượng Form:\n", this.form);


    this.checkError$.next(true);
    const request = this.form.getRawValue();
    if (!!this.textValidate) {
      return;
    }

    if (!!this.form.valid) {
      debugger
      // this.onSubmit.emit(this.form?.getRawValue());
      this.loading = true;
      this.staffProfileEditService
        .InsertStaffProfile(request)
        .subscribe((rs: any) => {
          if (rs.ok == true && rs.body.statusCode == 200) {
            this.toggleReloadFlagForTheCaller(rs.body.innerBody)
            this.formInitStringValue = JSON.stringify(this.form.getRawValue())
            this.staffProfileEditService.listInstance$.next(this.listInstance)
            this.loading = false;
            this.router.navigate(['../'], { relativeTo: this.route, state: { id: rs.body.innerBody, instanceNumber: this.listInstance } });
          } else {
            return
          }

        });
    } else {
      this.alertService.error(
        this.mls.trans(EnumTranslateKey.UI_COMPONENT_TITLE_NOT_CORRECTLY_INFOMATION_YET),
        this.alertOptions
      );
      let arrayControl = Object.keys(this.form.controls)
      for (let i = 0; i < arrayControl.length; i++) {
        let invalid = this.form.get(arrayControl[i])?.status
        if (invalid == "INVALID") {
          let checkClass = document.getElementsByClassName(arrayControl[i]) as HTMLCollection

          if (!!!this.manualHeightList) {
            if (checkClass.length > 0) {
              if (checkClass[0].classList.contains("basic")) {
                this.staffProfileEditService.sectors[0].open = true
                this.heightList[0] = this.heightList[0] + 10
                // checkBasic = false
              }
              if (checkClass[0].classList.contains("cv")) {
                this.staffProfileEditService.sectors[1].open = true
                this.heightList[1] = this.heightList[1] + 70
                // checkCv = false
              }
              if (checkClass[0].classList.contains("contact")) {
                this.staffProfileEditService.sectors[6].open = true
                this.heightList[6] = this.heightList[6] + 90
                // this.arrayContact.push(arrayControl[i])
                // checkContact = false
              }
              // if(checkClass[0].classList.contains("info")){
              //   this.staffProfileEditService.sectors[2].open = true
              //   this.heightList[2] = this.heightList[2] + 120
              //   // this.arrayInfo.push(arrayControl[i])
              //   // checkInfo = false
              // }
              this.heightList[3] = this.heightList[3]
              this.heightList[4] = this.heightList[4] + 15
              this.heightList[5] = this.heightList[5]
              this.heightList[2] = this.heightList[2] + 20
              this.heightList[7] = this.heightList[7] + 15
              this.heightList[8] = this.heightList[8] + 20
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
