export enum api {


  // PORTAL
  SYS_GROUP_QUERY_ORG_PERMISSION_DELETE_BY_USER_ID = '/api/SysGroup/DeleteAllFunctionActionPermissionByGroupId',
  SYS_UESER_GET_USER_BY_EMPLOYEE_ID = '/api/SysUser/GetUserByEmployeeId',

  HU_EMPLOYEE_CHECK_SAME_ITIMEID = '/api/HuEmployeeCv/CheckSameItimeid?itimeId=',

  AT_DECLARE_SENIORITY_GET_TOTAL = '/api/AtDeclareSeniority/CalculateTotal',

  SE_REMINDER_SEEN_CREATE = '/api/SeReminderSeen/InsertReminderSeen',
  SE_REMINDER_SEEN_READ_ALL = '/api/SeReminderSeen/ReadAll',

  AT_TIME_TIMESHEET_MONTHY_CHECKLOCK_PERIOD = '/api/TimeSheetMonthly/CheckLock',

  PA_PAYROLLSHEET_SUM_COMPARE_PAYROLL_FUND = '/api/PaPayrollsheetSum/ComparePayrollFund',

  HU_CONTRACT_DASHBOARD_EMP_GETIDORGDISSOLVE = '/api/HuEmployeeCv/GetIdOrgDissolve',

  // IMPORT AT_SIGN_DEFAULT
  XLSX_AT_SIGN_DEFAULT_IMPORT_QUERY_LIST = '/api/AtSignDefaultImport/QueryList',
  XLSX_AT_SIGN_DEFAULT_IMPORT_SAVE = '/api/AtSignDefaultImport/Save',

  // WEBAPP

  GET_IMAGE_AS_BASE64 = '/api/File/GetImageAsBase64Url',
  FILE_LOG_FILE_LIST = '/api/File/LogFileList',
  FILE_FILE_DOWNLOAD = '/api/File/FileDownload',
  EXPORT_EXEL = '/api/ExportFile/ExportExel',
  OM_ORGANIZATION_READ = '/api/HuOrganization/GetById',

  XLSX_GENERATE_TEMPLATE = '/api/Xlsx/GenerateTemplate',
  XLSX_DOWNLOAD_TEMPLATE = '/api/Xlsx/DownloadTemplate',
  XLSX_IMPORT_TO_DB = '/api/Xlsx/ImportXlsxToDb',
  XLSX_EXPORT_CORE_PAGE_LIST_TO_EXCEL = '/api/Xlsx/ExportCorePageListGridToExcel',

  // XLSX_HU_EMPLOYEE_IMPORT
  XLSX_HU_EMPLOYEE_IMPORT_QUERY_LIST = '/api/HuEmployeeImport/QueryList',

  XLSX_AT_SWIPE_DATA_IMPORT_QUERY_LIST = '/api/AtSwipeDataImport/QueryList',

  XLSX_HU_EMPLOYEE_IMPORT_SAVE = '/api/HuEmployeeImport/Save',

  XLSX_AT_SWIPE_DATA_IMPORT_SAVE = '/api/AtSwipeDataImport/Save',

  XLSX_HU_EVALUATE_IMPORT_SAVE = '/api/HuEvaluateImport/Save',

  XLSX_HU_EVALUATE_IMPORT_QUERY_LIST = '/api/HuEvaluateImport/QueryList',
  XLSX_HU_EVALUATION_COM_IMPORT_QUERY_LIST = '/api/HuEvaluationComImport/QueryList',
  XLSX_HU_EVALUATION_COM_IMPORT_SAVE = '/api/HuEvaluationComImport/Save',

  XLSX_HU_WORKING_IMPORT_QUERY_LIST = '/api/HuWorkingImport/QueryList',
  XLSX_HU_WORKING_IMPORT_SAVE = '/api/HuWorkingImport/Save',

  XLSX_HU_EVALUATE_CONCURRENT_IMPORT_QUERY_LIST = '/api/HuEvaluateImport/EvaluateConcurrentQueryList',
  XLSX_HU_EVALUATE_CONCURRENT_IMPORT_SAVE = '/api/HuEvaluateImport/EvaluateConcurrentSave',



  // HU_ALLOWANCE_EMP_IMPORT
  XLSX_HU_ALLOWANCE_EMP_IMPORT_QUERY_LIST = '/api/HuAllowanceEmpImport/QueryList',
  XLSX_HU_ALLOWANCE_EMP_IMPORT_SAVE = '/api/HuAllowanceEmpImport/Save',

  // HU_ALLOWANCE_EMP_IMPORT
  XLSX_HU_COMMAND_IMPORT_QUERY_LIST = '/api/HuCommendImport/QueryList',
  XLSX_HU_COMMAND_IMPORT_SAVE = '/api/HuCommendImport/Save',

  // HU_WORKING_BEFORE_IMPORT
  XLSX_HU_WORKING_BEFORE_IMPORT_QUERY_LIST = '/api/HuWorkingBeforeImport/QueryList',
  XLSX_HU_WORKING_BEFORE_IMPORT_SAVE = '/api/HuWorkingBeforeImport/Save',

  HRM_OBJECT_QUERY_LIST = '/api/Object/QueryList',
  HRM_OBJECT_CREATE = '/api/Object/Create',
  HRM_OBJECT_READ = '/api/Object/GetById',
  HRM_OBJECT_UPDATE = '/api/Object/Update',
  HRM_OBJECT_DELETE = '/api/Object/Delete',
  HRM_OBJECT_DELETE_IDS = '/api/Object/DeleteIds',

  HRM_INFOTYPE_QUERY_LIST = '/api/Infotype/QueryList',
  HRM_INFOTYPE_CREATE = '/api/Infotype/Create',
  HRM_INFOTYPE_READ = '/api/Infotype/GetById',
  HRM_INFOTYPE_UPDATE = '/api/Infotype/Update',
  HRM_INFOTYPE_DELETE = '/api/Infotype/Delete',
  HRM_INFOTYPE_DELETE_IDS = '/api/Infotype/DeleteIds',

  SYS_LOGIN = '/api/authentication/ClientsLogin',
  SYS_LOGOUT = '/api/authentication/Logout',
  SYS_REFRESH_TOKEN = '/api/authentication/RefreshToken',
  SYS_TRY_TO_RESTORE_SAML_ADFS = '/api/authentication/TryToRestoreSaml2Adfs',
  SYS_SSO_GET_CODE_CHALLENGE = '/api/authentication/GetCodeChallenge',
  SYS_SHORT_LIVED_TOKEN_LOGIN = '/api/authentication/ShortLivedTokenLogin',

  SYS_LANGUAGE_READ_ALL = '/api/Language/ReadAll',
  SYS_LANGUAGE_READ_ALL_MINI = '/api/Language/ReadAllMini',
  SYS_LANGUAGE_QUERY_LIST = '/api/Language/QueryList',
  SYS_LANGUAGE_CREAT = '/api/Language/Create',
  SYS_LANGUAGE_READ = '/api/Language/GetById',
  SYS_LANGUAGE_UPDATE = '/api/Language/Update',
  SYS_LANGUAGE_DELETE = '/api/Language/Delete',
  SYS_LANGUAGE_DELETE_IDS = '/api/Language/DeleteIds',

  PORTAL_ROUTE_QUERY_LIST = '/api/PortalRoute/QueryList',
  PORTAL_ROUTE_CREAT = '/api/PortalRoute/Create',
  PORTAL_ROUTE_READ = '/api/PortalRoute/GetById',
  PORTAL_ROUTE_UPDATE = '/api/PortalRoute/Update',
  PORTAL_ROUTE_DELETE = '/api/PortalRoute/Delete',
  PORTAL_ROUTE_DELETE_IDS = '/api/PortalRoute/DeleteIds',

  SW_PUSH_SUBSCRIPTION_QUERY_LIST = '/api/SwPushSubscription/QueryList',
  SW_PUSH_SUBSCRIPTION_CREATE = '/api/SwPushSubscription/Create',
  SW_PUSH_SUBSCRIPTION_READ = '/api/SwPushSubscription/GetById',
  SW_PUSH_SUBSCRIPTION_UPDATE = '/api/SwPushSubscription/Update',
  SW_PUSH_SUBSCRIPTION_DELETE = '/api/SwPushSubscription/Delete',
  SW_PUSH_SUBSCRIPTION_IDS = '/api/SwPushSubscription/DeleteIds',
  SW_PUSH_SUBSCRIPTION_FIND_SUBSCRIPTION = '/api/SwPushSubscription/FindSubscription',

  ART_CATEGORY_ITEM_CREATE = '/api/ArtCategoryItem/Create',
  ART_CATEGORY_ITEM_READ = '/api/ArtCategoryItem/GetById',
  ART_CATEGORY_ITEM_UPDATE = '/api/ArtCategoryItem/Update',
  ART_CATEGORY_ITEM_DELETE = '/api/ArtCategoryItem/Delete',
  ART_CATEGORY_ITEM_TOGGLE_APPROVE = '/api/ArtCategoryItem/ToggleApprove',
  ART_CATEGORY_ITEM_READ_ALL = '/api/ArtCategoryItem/ReadAll',

  ART_CATEGORY_ITEM_USER_GROUP_UPDATE_RANGE = '/api/ArtCategoryItemUserGroup/UpdateRange',

  SYS_MUTATION_LOG_QUERY_LIST = '/api/SysMutationLog/QueryList',
  SYS_MUTATION_LOG_READ = '/api/SysMutationLog/GetById',
  SYS_MUTATION_LOG_UPDATE = '/api/SysMutationLog/Update',
  SYS_MUTATION_LOG_DELETE_IDS = '/api/SysMutationLog/DeleteIds',

  SYS_GROUP_READ_ALL = '/api/SysGroup/ReadAll',
  SYS_GROUP_QUERY_LIST = '/api/SysGroup/QueryList',
  SYS_GROUP_READ = '/api/SysGroup/GetById',
  SYS_GROUP_CREATE = '/api/SysGroup/Create',
  SYS_GROUP_CLONE = '/api/SysGroup/Clone',
  SYS_GROUP_UPDATE = '/api/SysGroup/Update',
  SYS_GROUP_DELETE = '/api/SysGroup/Delete',
  SYS_GROUP_DELETE_IDS = '/api/SysGroup/DeleteIds',
  SYS_GROUP_QUERY_FUNCTION_ACTION_PERMISSION_LIST = '/api/SysGroup/QueryFunctionActionPermissionList',
  SYS_GROUP_QUERY_FUNCTION_ACTION_PERMISSION_LIST_GRPC = '/api/gRPC/SysGroup/QueryFunctionActionPermissionList', // using gRPC
  SYS_GROUP_QUERY_ORG_PERMISSION_LIST = '/api/SysGroup/QueryOrgPermissionList',

  SYS_FUNCTION_QUERY_LIST = '/api/SysFunction/QueryList',
  SYS_FUNCTION_READ = '/api/SysFunction/GetById',
  SYS_FUNCTION_READ_ALL = '/api/SysFunction/ReadAll',
  SYS_FUNCTION_CREATE = '/api/SysFunction/Create',
  SYS_FUNCTION_UPDATE = '/api/SysFunction/Update',
  SYS_FUNCTION_DELETE = '/api/SysFunction/Delete',
  SYS_FUNCTION_DELETE_IDS = '/api/SysFunction/DeleteIds',
  SYS_FUNCTION_CREATE_THEN_UPDATE_FUNCTION_ID_FOR_MENU = '/api/SysFunction/CreateFunctionThenUpdateFunctionIdForMenu',
  SYS_FUNCTION_UPDATE_THEN_UPDATE_FUNCTION_ID_FOR_MENU = '/api/SysFunction/UpdateFunctionThenUpdateFunctionIdForMenu',
  SYS_FUNCTION_READ_ALL_WITH_ALL_ACTIONS = '/api/SysFunction/ReadAllWithAllActions',
  SYS_FUNCTION_READ_ALL_WITH_ALL_ACTIONS_GRPC = '/api/gRPC/SysFunction/ReadAllWithAllActions', // using gRPC

  SYS_FUNCTION_IGNORE_QUERY_LIST = '/api/SysFunctionIgnore/QueryList',
  SYS_FUNCTION_IGNORE_READ = '/api/SysFunctionIgnore/GetById',
  SYS_FUNCTION_IGNORE_READ_ALL = '/api/SysFunctionIgnore/ReadAll',
  SYS_FUNCTION_IGNORE_READ_ALL_PATH_ONLY = '/api/SysFunctionIgnore/ReadAllPathOnly',
  SYS_FUNCTION_IGNORE_CREATE = '/api/SysFunctionIgnore/Create',
  SYS_FUNCTION_IGNORE_UPDATE = '/api/SysFunctionIgnore/Update',
  SYS_FUNCTION_IGNORE_DELETE = '/api/SysFunctionIgnore/Delete',
  SYS_FUNCTION_IGNORE_DELETE_IDS = '/api/SysFunctionIgnore/DeleteIds',

  DUO_GENERIC_CSS_THEME_VAR_CREAT = '/api/DuoCssThemeVar/Create',
  DUO_GENERIC_CSS_THEME_VAR_READ_CHILDREN = '/api/DuoCssThemeVar/GetChildrenById',
  DUO_GENERIC_CSS_THEME_VAR_UPDATE = '/api/DuoCssThemeVar/Update',

  SYS_USER_QUERY_LIST = '/api/SysUser/QueryList',
  SYS_USER_READ = '/api/SysUser/GetByStringId',
  SYS_USER_READ_ALL = '/api/SysUser/ReadAll',
  SYS_USER_CREATE = '/api/SysUser/CreateUser',
  SYS_USER_UPDATE = '/api/SysUser/UpdateUser',
  SYS_USER_CHANGE_PASSWORD = '/api/SysUser/ChangePassword',
  SYS_USER_DELETE = '/api/SysUser/Delete',
  SYS_USER_DELETE_STRING_IDS = '/api/SysUser/DeleteStringIds',
  SYS_USER_QUERY_ORG_PERMISSION_LIST = '/api/SysUser/QueryOrgPermissionList',
  SYS_USER_QUERY_ORG_LIST_WITH_POSITIONS = '/api/SysUser/QueryOrgWithPositions',
  SYS_USER_QUERY_USER_ORG_PERMISSION_LIST = '/api/SysUser/QueryUserOrgPermissionList',
  SYS_USER_QUERY_FUNCTION_ACTION_PERMISSION_LIST = '/api/SysUser/QueryFunctionActionPermissionList',
  SYS_USER_SYNC_ACCOUNTS = '/api/SysUser/SynchronousAccount',
  SYS_USER_RESET_ACCOUNTS = '/api/SysUser/ResetAccount',
  SYS_USER_RESET_LOCK_ACCOUNTS = '/api/SysUser/LockAccount',
  SYS_USER_RESET_UNLOCK_ACCOUNTS = '/api/SysUser/UnlockAccount',

  SYS_USER_FUNCTION_ACTION_PERMISSION_UPDATE_RANGE = '/api/SysUserFunctionAction/UpdateUserFunctionActionPermissionRange',
  SYS_GROUP_FUNCTION_ACTION_PERMISSION_UPDATE_RANGE = '/api/SysGroupFunctionAction/UpdateGroupFunctionActionPermissionRange',
  SYS_USER_ORG_PERMISSION_UPDATE_RANGE = '/api/SysUserOrg/UpdateUserOrgPermissionRange',
  SYS_GROUP_ORG_PERMISSION_UPDATE_RANGE = '/api/SysUserGroupOrg/UpdateGroupOrgPermissionRange',

  SYS_GROUP_QUERY_GROUP_ORG_PERMISSION_LIST = '/api/SysGroup/QueryGroupOrgPermissionList',

  DEMO_ATTACHMENT_QUERY_LIST = '/api/DemoAttachment/QueryList',
  DEMO_ATTACHMENT_READ = '/api/DemoAttachment/GetById',
  DEMO_ATTACHMENT_CREATE = '/api/DemoAttachment/Create',
  DEMO_ATTACHMENT_UPDATE = '/api/DemoAttachment/Update',
  DEMO_ATTACHMENT_DELETE = '/api/DemoAttachment/Delete',
  DEMO_ATTACHMENT_DELETE_IDS = '/api/DemoAttachment/DeleteIds',
  DEMO_ATTACHMENT_GET_ATTACHMENT_STATUS_LIST = '/api/DemoAttachment/GetAttachmentStatusList',

  HU_QUESTION_QUERY_LIST = '/api/HuQuestion/QueryList',
  HU_QUESTION_READ = '/api/HuQuestion/GetById',
  HU_QUESTION_CREATE = '/api/HuQuestion/Create',
  HU_QUESTION_UPDATE = '/api/HuQuestion/Update',
  HU_QUESTION_DELETE = '/api/HuQuestion/Delete',
  HU_QUESTION_DELETE_IDS = '/api/HuQuestion/DeleteIds',

  SYS_USER_PERMISSION_QUERY_LIST = '/api/SysFunction/FunctionPermissionList',
  SYS_USER_FUNCTION_ACTION_PERMISSION_LIST = '/api/SysUser/QueryFunctionActionPermissionList',
  SYS_USER_PERMISSION_DELETE_BY_USER_ID = '/api/SysUserFunctionAction/DeleteByUserId',

  SYS_ACTION_FUNCTIONS_ACTIONS = '/api/author/actions/funcsAcitons',
  HR_GET_DASHBOARD = '/api/HuFormList/GetDashboard',

  HU_CONTRACT_TYPE_QUERY_LIST = '/api/HuContractType/QueryList',
  HU_CONTRACT_TYPE_GETLIST = '/api/HuContractType/ReadAll',
  HU_CONTRACT_TYPE_CREATE = '/api/HuContractType/Create',
  HU_CONTRACT_TYPE_READ = '/api/HuContractType/GetById',
  HU_CONTRACT_TYPE_UPDATE = '/api/HuContractType/Update',
  HU_CONTRACT_TYPE_DELETE = '/api/HuContractType/Delete',
  HU_CONTRACT_TYPE_DELETE_IDS = '/api/HuContractType/DeleteIds',
  HU_CONTRACT_TYPE_GET_CONTRACT_TYPE_SYS = '/api/HuContractType/GetListContractTypeSys',
  HU_CONTRACT_TYPE_GET_BY_ID_CONTRACT_TYPE_SYS = '/api/HuContractType/GetContractTypeSysById',
  HU_CONTRACT_TYPE_TOGGLE_ACTIVE_IDS = '/api/HuContractType/ToggleActiveIds',
  HU_CONTRACT_TYPE_CHECK_CODE_EXISTS = '/api/HuContractType/CheckCodeExists?code=',

  HU_POSITION_QUERY_LIST = '/api/HuPosition/QueryList',
  HU_POSITION_CREATE = '/api/HuPosition/Create',
  HU_POSITION_READ = '/api/HuPosition/Get',
  HU_POSITION_UPDATE = '/api/HuPosition/Update',
  HU_POSITION_DELETE = '/api/HuPosition/Delete',
  HU_POSITION_DELETE_IDS = '/api/HuPosition/DeleteIds',
  HU_POSITION_TRANSFER_POSITION = '/api/HuPosition/TransferPosition',
  HU_POSITION_READ_ALL = '/api/RcCandidateCv/GetListPos',
  HU_POSITION_CLONING_POSITION = '/api/HuPosition/CloningPosition',
  HU_POSITION_POSTION_TRANSFER_SAVE = '/api/HuPosition/PositionTransferSave',
  HU_POSITION_POSTION_TRANSFER_REVERT = '/api/HuPosition/PositionTransferRevert',
  HU_POSITION_POSTION_TRANSFER_DELETE = '/api/HuPosition/PositionTransferDelete',
  //HU_POSITION_AUTOGEN_CODE = '/api/HuPosition/AutoGenCodeHuPosition',
  HU_POSITION_AUTOGEN_CODE = '/api/HuPosition/AutoGenCode',
  HU_POSITION_SWAP = '/api/HuPosition/SwapMasterInterim',
  HU_POSITION_CHANGESTATUS = '/api/HuPosition/ChangeStatus',
  HU_POSITION_CHECKTDV = '/api/HuPosition/CheckTdv',

  HU_GROUP_POSITION_READ_ALL = '/api/Hugroupposition/GetList',
  HU_GROUP_POSITION_CREATE = '/api/Hugroupposition/Create',
  HU_GROUP_POSITION_QUERY_LIST = '/api/Hugroupposition/QueryList',
  HU_GROUP_POSITION_READ = '/api/Hugroupposition/GetById',
  HU_GROUP_POSITION_UPDATE = '/api/Hugroupposition/Update',
  HU_GROUP_POSITION_DELETE = '/api/Hugroupposition/Delete',
  HU_GROUP_POSITION_DELETE_IDS = '/api/Hugroupposition/DeleteIds',

  HU_JOB_QUERY_LIST = '/api/HuJob/QueryList',
  HU_JOB_QUERY_LIST_FOR_ORG_OVERVIEW = '/api/HuJob/QueryListForOrgOverview',
  HU_JOB_CREATE = '/api/HuJob/Create',
  HU_JOB_READ = '/api/HuJob/GetById',
  HU_JOB_UPDATE = '/api/HuJob/Update',
  HU_JOB_DELETE = '/api/HuJob/Delete',
  HU_JOB_DELETE_IDS = '/api/HuJob/DeleteIds',
  HU_JOB_GETLIST = '/api/HuJob/GetList',
  HU_JOB_CHANGESTATUS = '/api/HuJob/ChangeStatus',
  HU_JOB_GET_CODE_BY_JOB_FAMILY = '/api/HuJob/GetCodeByJobFamily?id=',

  HU_JOB_BAND_QUERY_LIST = '/api/HuJobBand/QueryList',
  HU_JOB_BAND_CREATE = '/api/HuJobBand/Create',
  HU_JOB_BAND_READ = '/api/HuJobBand/GetById',
  HU_JOB_BAND_UPDATE = '/api/HuJobBand/Update',
  HU_JOB_BAND_DELETE = '/api/HuJobBand/Delete',
  HU_JOB_BAND_DELETE_IDS = '/api/HuJobBand/DeleteIds',
  HU_JOB_BAND_GETLIST = '/api/HuJobBand/GetList',


  HU_EMPLOYEE_QUERY_LIST = '/api/HuEmployee/QueryList',
  HU_EMPLOYEE_QUERY_LIST_FOR_ORG_OVERVIEW = '/api/HuEmployee/QueryListForOrgOverview',
  HU_EMPLOYEE_CREATE = '/api/HuEmployee/Create',
  HU_EMPLOYEE_READ = '/api/HuEmployee/GetById',
  HU_EMPLOYEE_READ_ALL = '/api/HuEmployee/ReadAll',
  HU_EMPLOYEE_GET_ALL = '/api/HuEmployeeCv/GetAll',
  HU_EMPLOYEE_GET_ALL_IGNORE_CURRENT_USER = '/api/HuEmployeeCv/GetAllIgnoreCurrentUser',
  HU_EMPLOYEE_UPDATE = '/api/HuEmployee/Update',
  HU_EMPLOYEE_DELETE = '/api/HuEmployee/Delete',
  HU_EMPLOYEE_DELETE_IDS = '/api/HuEmployee/DeleteIds',
  HU_EMPLOYEE_GET_PAPERS = '/api/HuEmployeeCv/GetPapers',
  HU_EMPLOYEE_UPDATE_PAPERS = '/api/HuEmployeeCv/UpdatePapers',
  HU_EMPLOYEE_GET_BY_ID = '/api/HuEmployee/GetById?id=',
  HU_EMPLOYEE_CHECK_SAME_NAME = '/api/HuEmployeeCv/CheckSameName?name=',
  HU_EMPLOYEE_CHECK_SAME_TAXCODE = '/api/HuEmployeeCv/CheckSameTaxCode?taxCode=',
  HU_EMPLOYEE_CHECK_SAME_ID_NO = '/api/HuEmployeeCv/CheckSameIdNo?idNo=',
  HU_EMPLOYEE_QUERY_LIST_EMP = '/api/HuEmployee/QueryListEmp',

  HU_EMPLOYEE_CV_CREATE = '/api/HuEmployeeCv/Create',
  HU_EMPLOYEE_CV_READ = '/api/HuEmployeeCv/GetById',
  HU_EMPLOYEE_CV_GET_BANK = '/api/HuEmployeeCv/GetBank',
  HU_EMPLOYEE_CV_UPDATE_BANK = '/api/HuEmployeeCv/UpdateBank',
  HU_EMPLOYEE_CV_UPDATE = '/api/HuEmployeeCv/Update',
  HU_EMPLOYEE_CV_DELETE = '/api/HuEmployeeCv/Delete',
  HU_EMPLOYEE_CV_DELETE_IDS = '/api/HuEmployeeCv/DeleteIds',

  HU_EMPLOYEE_CV_GENERAL_INFO_READ = '/api/HuEmployeeCv/GetGeneralInfo',
  HU_EMPLOYEE_CV_GENERAL_INFO_UPDATE = '/api/HuEmployeeCv/UpdateGeneralInfo',

  HU_EMPLOYEE_CV_CURRUCULUM_READ = '/api/HuEmployeeCv/GetCurruculum',
  HU_EMPLOYEE_CV_CURRUCULUM_UPDATE = '/api/HuEmployeeCv/UpdateCurruculum',


  HU_EMPLOYEE_CV_GET_BANK_INFO = '/api/HuEmployeeCv/GetBankInfo',
  HU_EMPLOYEE_CV_UPDATE_BANK_INFO = '/api/HuEmployeeCv/UpdateBankInfo',

  HU_EMPLOYEE_CV_GET_BASIC = '/api/HuEmployeeCv/GetBasic',
  HU_EMPLOYEE_CV_UPDATE_BASIC = '/api/HuEmployeeCv/UpdateBasic',

  HU_EMPLOYEE_CV_GET_ADDITIONAL_INFO = '/api/HuEmployeeCv/GetAdditonalInfo',

  HU_EMPLOYEE_CV_GET_ADDITIONAL = '/api/HuEmployeeCv/GetAdditonal',
  HU_EMPLOYEE_CV_UPDATE_ADDITIONAL = '/api/HuEmployeeCv/UpdateAdditonal',

  HU_EMPLOYEE_CV_GET_POLITICAL = '/api/HuEmployeeCv/GetPolitical',
  HU_EMPLOYEE_CV_UPDATE_POLITICAL = '/api/HuEmployeeCv/UpdatePolitical',
  HU_EMPLOYEE_CV_GET_POLITICAL_BACKGROUND = '/api/HuEmployeeCv/GetPoliticalBackground',
  HU_EMPLOYEE_CV_GET_POLITICAL_ORGANIZATION = '/api/HuEmployeeCv/GetPoliticalOrganization',
  HU_EMPLOYEE_CV_GET_POLITICAL_ORGANIZATION_ID = '/api/HuEmployeeCv/GetPoliticalOrganizationId',
  HU_EMPLOYEE_CV_UPDATE_POLITICAL_ORGANIZATION = '/api/HuEmployeeCv/UpdatePoliticalOrganizationId',
  HU_EMPLOYEE_CV_GET_POLITICAL_BY_EMPLOYEE_CV_ID = '/api/HuConcurrently/GetAllConcurrentByEmployeeCvId',

  HU_EMPLOYEE_CV_GET_EDUCATION = '/api/HuEmployeeCv/GetEducation',
  HU_EMPLOYEE_CV_GET_EDUCATION_ID = '/api/HuEmployeeCv/GetEducationId',
  HU_EMPLOYEE_CV_UPDATE_EDUCATION_ID = '/api/HuEmployeeCv/UpdateEducationId',

  HU_EMPLOYEE_CV_GET_PRESENTER = '/api/HuEmployeeCv/GetPresenter',
  HU_EMPLOYEE_CV_GET_PRESENTER_ID = '/api/HuEmployeeCv/GetPresenterId',
  HU_EMPLOYEE_CV_UPDATE_PRESENTER_ID = '/api/HuEmployeeCv/UpdatePresenterId',

  HU_EMPLOYEE_CV_GET_CONTACT = '/api/HuEmployeeCv/GetContact',
  HU_EMPLOYEE_CV_GET_CONTACT_ID = '/api/HuEmployeeCv/GetContactId',
  HU_EMPLOYEE_CV_UPDATE_CONTACT_ID = '/api/HuEmployeeCv/UpdateContactId',

  HU_EMPLOYEE_CV_GET_SITUATION = '/api/HuEmployeeCv/GetSituation',
  HU_EMPLOYEE_CV_GET_SITUATION_ID = '/api/HuEmployeeCv/GetSituationId',
  HU_EMPLOYEE_CV_UPDATE_SITUATION_ID = '/api/HuEmployeeCv/UpdateSituationId',

  HU_EMPLOYEE_CV_UPDATE_POLITICAL_BACKGROUND = '/api/HuEmployeeCv/UpdatePoliticalBackground',

  HU_EMPLOYEE_CV_GET_CV = '/api/HuEmployeeCv/GetCv',
  HU_EMPLOYEE_CV_UPDATE_CV = '/api/HuEmployeeCv/UpdateCv',

  HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST = '/api/HuEmployeeCv/GetEmployeeStatusList',

  HU_EMPLOYEE_CV_GET_2C98 = '/api/HuEmployeeCv/Get2C_TCTW_98',
  HU_EMPLOYEE_CV_GET_2C2008 = '/api/HuEmployeeCv/Get2C_BNV_2008',
  HU_EMPLOYEE_CV_GET_FILE_NAME = '/api/HuEmployeeCv/GetFileName?id=',
  HU_EMPLOYEE_CV_GET_LICENSE_BY_ID = '/api/HuEmployeeCv/GetLicenseById',

  HU_EMPLOYEE_CREATE_PROFILE_INFO = '/api/HuEmployeeCv/InsertStaffProfile',
  HU_EMPLOYEE_CHECK_POSITION_MASTER_INTERIM = '/api/HuEmployeeCv/CheckPositionMasterInterim?id=',
  HU_EMPLOYEE_UPDATE_AVATAR_EMPLOYEE = '/api/HuEmployeeCv/UpdateAvatar',
  HU_EMPLOYEE_GET_CODE = '/api/HuEmployeeCv/GetCode?code=',

  HU_SALARY_TYPE_QUERY_LIST = '/api/HuSalaryType/QueryList',
  HU_SALARY_TYPE_READ = '/api/HuSalaryType/GetById',
  HU_SALARY_TYPE_CREATE = '/api/HuSalaryType/Create',
  HU_SALARY_TYPE_UPDATE = '/api/HuSalaryType/Update',
  HU_SALARY_TYPE_DELETE = '/api/HuSalaryType/Delete',
  HU_SALARY_TYPE_DELETE_IDS = '/api/HuSalaryType/DeleteIds',
  HU_SALARY_TYPE_TOGGLE_ACTIVE_IDS = '/api/HuSalaryType/ToggleActiveIds',

  HU_CLASSIFICATION_QUERY_LIST = '/api/HuClassification/QueryList',
  HU_CLASSIFICATION_READ = '/api/HuClassification/GetById',
  HU_CLASSIFICATION_GET_BY_ID = '/api/HuClassification/GetById?id=',
  HU_CLASSIFICATION_CREATE = '/api/HuClassification/Create',
  HU_CLASSIFICATION_UPDATE = '/api/HuClassification/Update',
  HU_CLASSIFICATION_DELETE = '/api/HuClassification/Delete',
  HU_CLASSIFICATION_DELETE_IDS = '/api/HuClassification/DeleteIds',
  HU_CLASSIFICATION_TOGGLE_ACTIVE_IDS = '/api/HuClassification/ToggleActiveIds',

  HU_SALARY_RANK_QUERY_LIST = '/api/HuSalaryRank/QueryList',
  HU_SALARY_RANK_READ = '/api/HuSalaryRank/GetById',
  HU_SALARY_RANK_CREATE = '/api/HuSalaryRank/Create',
  HU_SALARY_RANK_UPDATE = '/api/HuSalaryRank/Update',
  HU_SALARY_RANK_DELETE = '/api/HuSalaryRank/Delete',
  HU_SALARY_RANK_DELETE_IDS = '/api/HuSalaryRank/DeleteIds',
  HU_SALARY_RANK_TOGGLE_ACTIVE_IDS = '/api/HuSalaryRank/ToggleActiveIds',

  // HU_SALARY_LEVEL
  HU_SALARY_LEVEL_READ = '/api/HuSalaryLevel/GetById',
  HU_SALARY_LEVEL_CREATE = '/api/HuSalaryLevel/Create',
  HU_SALARY_LEVEL_UPDATE = '/api/HuSalaryLevel/Update',
  HU_SALARY_LEVEL_DELETE = '/api/HuSalaryLevel/Delete',
  HU_SALARY_LEVEL_DELETE_IDS = '/api/HuSalaryLevel/DeleteIds',
  HU_SALARY_LEVEL_QUERY_LIST = '/api/HuSalaryLevel/QueryList',
  HU_SALARY_LEVEL_GET_SALARY_CURRENT_DATE = '/api/HuSalaryLevel/GetSalaryCurrentDate',
  HU_SALARY_LEVEL_TOGGLE_ACTIVE_IDS = '/api/HuSalaryLevel/ToggleActiveIds',

  //HU_CONCURRENTLY
  HU_CONCURRENTLY_QUERRY_LIST = '/api/HuConcurrently/QueryList',
  HU_CONCURRENTLY_DELETE_IDS = '/api/HuConcurrently/DeleteIds',
  HU_CONCURRENTLY_CREATE = '/api/HuConcurrently/Create',
  HU_CONCURRENTLY_READ = '/api/HuConcurrently/GetById',
  HU_CONCURRENTLY_UPDATE = '/api/HuConcurrently/Update',
  HU_CONCURRENTLY_DELETE = '/api/HuConcurrently/Delete',
  HU_CONCURRENTLY_QUERRY_LIST_CONCURRENT = '/api/HuConcurrently/QueryListConcurrently',
  HU_CONCURRENTLY_APPROVE = '/api/HuConcurrently/OpenConcurrentlyApprove',
  HU_CONCURRENTLY_GET_EMPLOYEE_BY_CONCURRENT = '/api/HuConcurrently/GetEmployeeByConcurrentId',
  HU_CONCURRENTLY_GET_POSITION_POLITICAL = '/api/HuConcurrently/GetPositionPolitical',


  HU_WELFARE_QUERY_LIST = '/api/HuWelfare/QueryList',
  HU_WELFARE_CREATE = '/api/HuWelfare/Create',
  HU_WELFARE_READ = '/api/HuWelfare/GetById',
  HU_WELFARE_UPDATE = '/api/HuWelfare/Update',
  HU_WELFARE_DELETE = '/api/HuWelfare/Delete',
  HU_WELFARE_DELETE_IDS = '/api/HuWelfare/DeleteIds',
  HU_WELFARE_GETLIST = '/api/HuWelfare/GetList',
  HU_WELFARE_GETLIST_AUTO = '/api/HuWelfare/GetListAuto',
  HU_WELFARE_GETLIST_IN_PERIOD = '/api/HuWelfare/GetListInPeriod',
  HU_WELFARE_AUTOGEN_CODE = '/api/HuWelfare/GetCode',
  HU_WELFARE_CHANGESTATUS = '/api/HuWelfare/ChangeStatus',

  HU_WELFARE_MNG_QUERY_LIST = '/api/HuWelfareMng/QueryList',
  HU_WELFARE_MNG_CREATE = '/api/HuWelfareMng/Create',
  HU_WELFARE_MNG_READ = '/api/HuWelfareMng/GetById',
  HU_WELFARE_MNG_UPDATE = '/api/HuWelfareMng/Update',
  HU_WELFARE_MNG_DELETE = '/api/HuWelfareMng/Delete',
  HU_WELFARE_MNG_DELETE_IDS = '/api/HuWelfareMng/DeleteIds',

  //HU_ALLOWANCE

  HU_ALLOWANCE_QUERY_LIST = '/api/HuAllowance/QueryList',
  HU_ALLOWANCE_CREATE = '/api/HuAllowance/Create',
  HU_ALLOWANCE_READ = '/api/HuAllowance/GetById',
  HU_ALLOWANCE_UPDATE = '/api/HuAllowance/Update',
  HU_ALLOWANCE_DELETE = '/api/HuAllowance/Delete',
  HU_ALLOWANCE_DELETE_IDS = '/api/HuAllowance/DeleteIds',
  HU_ALLOWANCE_GETLIST = '/api/HuAllowance/GetList',
  HU_ALLOWANCE_GETCODE = '/api/HuAllowance/GetCode',
  HU_ALLOWANCE_CHANGESTATUSAPPROVE = '/api/HuAllowance/ChangeStatusApprove',

  //HU_ALLOWANCE_EMP
  HU_ALLOWANSEEMPLOYEE_QUERY_LIST = '/api/HuAllowanceEmp/QueryList',
  HU_ALLOWANSEEMPLOYEE_CREATE = '/api/HuAllowanceEmp/Create',
  HU_ALLOWANSEEMPLOYEE_READ = '/api/HuAllowanceEmp/GetById',
  HU_ALLOWANSEEMPLOYEE_UPDATE = '/api/HuAllowanceEmp/Update',
  HU_ALLOWANSEEMPLOYEE_DELETE = '/api/HuAllowanceEmp/Delete',
  HU_ALLOWANSEEMPLOYEE_DELETE_IDS = '/api/HuAllowanceEmp/DeleteIds',
  HUALLOWANSEEMPLOYEE_GETTYPEBYID = '/api/HuAllowance/GetById?id=',
  HU_ALLOWANSEEMPLOYEE_GETLIST = '/api/HuAllowanceEmp/GetList',

  //AT_SYMBOL
  AT_SYMBOL_QUERY_LIST = '/api/AtSymbol/QueryList',
  AT_SYMBOL_READ = '/api/AtSymbol/GetById',
  AT_SYMBOL_CREATE = '/api/AtSymbol/Create',
  AT_SYMBOL_UPDATE = '/api/AtSymbol/Update',
  AT_SYMBOL_DELETE = '/api/AtSymbol/Delete',
  AT_SYMBOL_DELETE_IDS = '/api/AtSymbol/DeleteIds',
  AT_SYMBOL_GETLIST = '/api/AtSymbol/GetList',
  AT_SYMBOL_TOGGLE_ACTIVE_IDS = '/api/AtSymbol/ToggleActiveIds',

  //AT_TIME_TYPE
  AT_TIME_TYPE_READ_ALL = '/api/TimeType/ReadAll',
  AT_TIME_TYPE_QUERY_LIST = '/api/TimeType/QueryList',
  AT_TIME_TYPE_CREATE = '/api/TimeType/Create',
  AT_TIME_TYPE_READ = '/api/TimeType/GetById',
  AT_TIME_TYPE_UPDATE = '/api/TimeType/Update',
  AT_TIME_TYPE_DELETE = '/api/TimeType/Delete',
  AT_TIME_TYPE_DELETE_IDS = '/api/TimeType/DeleteIds',
  AT_TIME_TYPE_TOGGLE_IDS = '/api/TimeType/ToggleActiveIds',

  //PA_KPI_GROUP
  PA_KPI_GROUP_QUERY_LIST = '/api/KpiGroup/QueryList',
  PA_KPI_GROUP_CREATE = '/api/KpiGroup/Create',
  PA_KPI_GROUP_READ = '/api/KpiGroup/GetById',
  PA_KPI_GROUP_UPDATE = '/api/KpiGroup/Update',
  PA_KPI_GROUP_DELETE = '/api/KpiGroup/Delete',
  PA_KPI_GROUP_DELETE_IDS = '/api/KpiGroup/DeleteIds',

  //PA_LISTFUND
  PA_LISTFUND_QUERY_LIST = '/api/PaListfund/QueryList',
  PA_LISTFUND_CREATE = '/api/PaListfund/Create',
  PA_LISTFUND_UPDATE = '/api/PaListfund/Update',
  PA_LISTFUND_DELETE_IDS = '/api/PaListfund/DeleteIds',
  PA_LISTFUND_DELETE = '/api/PaListfund/Delete',
  PA_LISTFUND_READ = '/api/PaListfund/GetById',
  PA_LISTFUND_GETCOMPANYTYPES = '/api/PaListfund/GetCompanyTypes',
  PA_LISTFUND_GET_COMPANY_BY_ID = '/api/PaListfund/GetListCompany',
  PA_LISTFUND_GET_LIST = '/api/PaListfund/GetListFund',
  PA_LISTFUND_GET_LIST_BY_PERIOD_ID = '/api/PaListfund/GetListFundByPeriodId?periodId=',
  PA_LISTFUND_TOGGLE_ACTIVE_IDS = '/api/PaListfund/ToggleActiveIds',

  //PA_PHASE_ADVANCE
  PA_PHASE_ADVANCE_QUERY_LIST = '/api/PaPhaseAdvance/QueryList',
  PA_PHASE_ADVANCE_CREATE = '/api/PaPhaseAdvance/Create',
  PA_PHASE_ADVANCE_READ = '/api/PaPhaseAdvance/GetById',
  PA_PHASE_ADVANCE_UPDATE = '/api/PaPhaseAdvance/Update',
  PA_PHASE_ADVANCE_DELETE_IDS = '/api/PaPhaseAdvance/DeleteIds',
  PA_PHASE_ADVANCE_GETYEARPERIOD = '/api/PaPhaseAdvance/GetYearPeriod',
  PA_PHASE_ADVANCE_GET_SAL_PEROID_BY_ID = '/api/PaPhaseAdvance/GetYearPeriodById',
  PA_PHASE_ADVANCE_GET_SYMBOL_BY_ID = '/api/PaPhaseAdvance/GetAtSymbolById',
  PA_PHASE_ADVANCE_TOGGLE_ACTIVE_IDS = '/api/PaPhaseAdvance/ToggleActiveIds',

  //PA_PERIOD_TAX
  PA_PERIOD_TAX_QUERY_LIST = '/api/PaPeriodTax/QueryList',
  PA_PERIOD_TAX_CREATE = '/api/PaPeriodTax/Create',
  PA_PERIOD_TAX_READ = '/api/PaPeriodTax/GetById',
  PA_PERIOD_TAX_UPDATE = '/api/PaPeriodTax/Update',
  PA_PERIOD_TAX_DELETE_IDS = '/api/PaPeriodTax/DeleteIds',
  PA_PERIOD_TAX_TOGGLE_ACTIVE_IDS = '/api/PaPeriodTax/ToggleActiveIds',

  //PA_LISTSALARIES
  PA_LISTSALARIES_QUERY_LIST = '/api/PaListsalaries/QueryList',
  PA_LISTSALARIES_CREATE = '/api/PaListsalaries/Create',
  PA_LISTSALARIES_READ = '/api/PaListsalaries/GetById',
  PA_LISTSALARIES_UPDATE = '/api/PaListsalaries/Update',
  PA_LISTSALARIES_DELETE_IDS = '/api/PaListsalaries/DeleteIds',
  PA_LISTSALARIES_READ_OBJ_SAL = '/api/PaListsalaries/GetObjSal',
  PA_LISTSALARIES_READ_OBJ_IS_SAL = '/api/PaListsalaries/GetListObjSalry',
  PA_LISTSALARIES_READ_LIST_SAL_CODE = '/api/PaListsalaries/GetListSal?idSymbol=',
  PA_LISTSALARIES_GET_DATA_TYPE = '/api/PaListsalaries/GetDataType',
  PA_LISTSALARIES_GET_GROUP_TYPE = '/api/PaListsalaries/GetGroupType',
  PA_LISTSALARIES_GET_LISTSAL_BY_OBJSAL = '/api/PaListsalaries/GetListSalaries=',
  PA_LISTSALARIES_GET_NAME_CODE = '/api/PaListsalaries/GetListNameCode',
  PA_LISTSALARIES_GET_PERIOD = '/api/PaPayrollsheetTax/GetPeriodId',
  PA_LISTSALARIES_GET_LIST_OBJ = '/api/PaListsalaries/GetListObj?typeCode=',

  //HU_SALARY_SCALE
  HU_SALARY_SCALE_QUERY_LIST = '/api/HuSalaryScale/QueryList',
  HU_SALARY_SCALE_READ = '/api/HuSalaryScale/GetById',
  HU_SALARY_SCALE_CREATE = '/api/HuSalaryScale/Create',
  HU_SALARY_SCALE_UPDATE = '/api/HuSalaryScale/Update',
  HU_SALARY_SCALE_DELETE = '/api/HuSalaryScale/Delete',
  HU_SALARY_SCALE_DELETE_IDS = '/api/HuSalaryScale/DeleteIds',
  HU_SALARY_SCALE_GETCODE = '/api/HuSalaryScale/GetCode',
  HU_SALARY_SCALE_TOGGLE_ACTIVE_IDS = '/api/HuSalaryScale/ToggleActiveIds',

  //HU_TERMINATE
  HU_TERMINATE_QUERY_LIST = '/api/HuTerminate/QueryList',
  HU_TERMINATE_READ = '/api/HuTerminate/GetById',
  HU_TERMINATE_CREATE = '/api/HuTerminate/Create',
  HU_TERMINATE_UPDATE = '/api/HuTerminate/Update',
  HU_TERMINATE_DELETE = '/api/HuTerminate/Delete',
  HU_TERMINATE_DELETE_IDS = '/api/HuTerminate/DeleteIds',
  HU_TERMINATE_GET_FILE_NAME = '/api/HuTerminate/GetFileName?id=',
  HU_TERMINATE_PRINT_DECISION = '/api/HuTerminate/PrintDecision',

  //AT_HOLIDAY
  AT_HOLIDAY_QUERY_LIST = '/api/AtHoliday/QueryList',
  AT_HOLIDAY_READ = '/api/AtHoliday/GetById',
  AT_HOLIDAY_CREATE = '/api/AtHoliday/Create',
  AT_HOLIDAY_UPDATE = '/api/AtHoliday/Update',
  AT_HOLIDAY_DELETE = '/api/AtHoliday/Delete',
  AT_HOLIDAY_DELETE_IDS = '/api/AtHoliday/DeleteIds',
  AT_HOLIDAY_TOGGLE_ACTIVE_IDS = '/api/AtHoliday/ToggleActiveIds',

  //AT_REGISTER_LEAVE
  AT_REGISTER_LEAVE_QUERY_LIST = '/api/AtRegisterLeave/QueryList',
  AT_REGISTER_LEAVE_READ = '/api/AtRegisterLeave/GetById',
  AT_REGISTER_LEAVE_READVER2 = '/api/AtRegisterLeave/GetByIdVer2',
  AT_REGISTER_LEAVE_CREATE = '/api/AtRegisterLeave/CreateVer2',
  AT_REGISTER_LEAVE_UPDATE = '/api/AtRegisterLeave/Update',
  AT_REGISTER_LEAVE_UPDATEVER2 = '/api/AtRegisterLeave/UpdateVer2',
  AT_REGISTER_LEAVE_DELETE = '/api/AtRegisterLeave/Delete',
  AT_REGISTER_LEAVE_DELETE_IDS = '/api/AtRegisterLeave/DeleteIds',
  AT_REGISTER_LEAVE_LIST_TYPE_OFF = '/api/AtRegisterLeave/GetListTypeOff',
  AT_REGISTER_LEAVE_TYPE_OFF_BYID = '/api/AtRegisterLeave/GetListTypeOffById',
  AT_REGISTER_LEAVE_EXPORT = '/api/AtRegisterLeave/ExportTempImportBasic',
  AT_REGISTER_LEAVE_IMPORT = '/api/AtRegisterLeave/ImportRegisterLeave',
  AT_REGISTER_LEAVE_GETSIGN = '/api/AtRegisterLeave/GetWorkSignName',
  //AT_DECLARE_SENIORITY
  AT_DECLARE_SENIORITY_QUERY_LIST = '/api/AtDeclareSeniority/QueryList',
  AT_DECLARE_SENIORITY_READ = '/api/AtDeclareSeniority/GetById',
  AT_DECLARE_SENIORITY_CREATE = '/api/AtDeclareSeniority/Create',
  AT_DECLARE_SENIORITY_UPDATE = '/api/AtDeclareSeniority/Update',
  AT_DECLARE_SENIORITY_DELETE = '/api/AtDeclareSeniority/Delete',
  AT_DECLARE_SENIORITY_DELETE_IDS = '/api/AtDeclareSeniority/DeleteIds',
  AT_DECLARE_SENIORITY_EXPORT = '/api/AtDeclareSeniority/ExportTempImportBasic',
  AT_DECLARE_SENIORITY_IMPORT = '/api/AtDeclareSeniority/ImportDeclareSeniority',
  //AT_OVERTIME
  AT_OVERTIME_QUERY_LIST = '/api/AtRegisterOverTime/QueryList',
  AT_OVERTIME_READ = '/api/AtRegisterOverTime/GetById',
  AT_OVERTIME_CREATE = '/api/AtRegisterOverTime/Create',
  AT_OVERTIME_UPDATE = '/api/AtRegisterOverTime/Update',
  AT_OVERTIME_DELETE = '/api/AtRegisterOverTime/Delete',
  AT_OVERTIME_DELETE_IDS = '/api/AtRegisterOverTime/DeleteIds',
  AT_OVERTIME_EXPORT = '/api/AtRegisterOverTime/ExportTempImportBasic',
  AT_OVERTIME_IMPORT = '/api/AtRegisterOverTime/ImportRegisterOT',
  //AT_ENTITLEMENT
  AT_ENTITLEMENT_QUERY_LIST = '/api/Entitlement/QueryList',
  AT_ENTITLEMENT_CALCULATE = '/api/Entitlement/Calculate',
  AT_ENTITLEMENT_DELETE = '/api/Entitlement/Delete',
  //SYS_OTHER_LIST
  SYS_OTHERLIST_QUERY_LIST = '/api/SysOrtherList/QueryList',
  SYS_OTHERLIST_CREATE = '/api/SysOrtherList/Create',
  SYS_OTHERLIST_READ = '/api/SysOrtherList/GetById',
  SYS_OTHERLIST_UPDATE = '/api/SysOrtherList/Update',
  SYS_OTHERLIST_DELETE = '/api/SysOrtherList/Delete',
  SYS_OTHERLIST_DELETE_IDS = '/api/SysOrtherList/DeleteIds',
  SYS_OTHERLIST_GETOTHERLISTBYTYPE_MULTIPLE = "/api/SysOrtherList/GetOtherListByTypeMultiple",
  SYS_OTHERLIST_GETOTHERLISTBYTYPE = '/api/SysOrtherList/GetOtherListByType?typeCode=',
  SYS_OTHERLIST_GET_SCALE = '/api/SysOrtherList/GetScales',
  SYS_OTHERLIST_GET_CODE = '/api/SysOrtherList/GetCode',
  SYS_OTHERLIST_GET_STATUS = '/api/SysOrtherList/GetOtherListByType?typeCode=DECISION_STATUS',
  SYS_OTHERLIST_GET_EMP_STATUS = '/api/SysOrtherList/GetOtherListByType?typeCode=WORKDAY_STATUS',
  SYS_OTHER_LIST_GET_STATUS_LIST = '/api/HuCommend/GetStatusList',
  SYS_OTHER_LIST_ACTIVE = '/api/SysOrtherList/ToggleActiveIds',
  SYS_OTHER_LIST_GET_ID_STATUS_BY_CODE = "/api/SysOrtherList/GetIdStatusByCode?code=",

  //SYS_OTHER_LIST_TYPE
  SYS_OTHERLIST_TYPE_QUERY_LIST = '/api/SysOtherlistType/QueryList',
  SYS_OTHERLIST_TYPE_CREATE = '/api/SysOtherlistType/Create',
  SYS_OTHERLIST_TYPE_READ = '/api/SysOtherlistType/GetById',
  SYS_OTHERLIST_TYPE_UPDATE = '/api/SysOtherlistType/Update',
  SYS_OTHERLIST_TYPE_DELETE = '/api/SysOtherlistType/Delete',
  SYS_OTHERLIST_TYPE_DELETE_IDS = '/api/SysOtherlistType/DeleteIds',
  SYS_OTHERLIST_TYPE_GETALLTYPE = '/api/SysOtherlistType/GetAllType',

  //SYS_FUNCTION_GROUP
  SYS_FUNCTION_GROUP_QUERY_LIST = '/api/SysFunctionGroup/QueryList',
  SYS_FUNCTION_GROUP_CREATE = '/api/SysFunctionGroup/Create',
  SYS_FUNCTION_GROUP_READ = '/api/SysFunctionGroup/GetById',
  SYS_FUNCTION_GROUP_READ_ALL = '/api/SysFunctionGroup/ReadAll',
  SYS_FUNCTION_GROUP_UPDATE = '/api/SysFunctionGroup/Update',
  SYS_FUNCTION_GROUP_DELETE = '/api/SysFunctionGroup/Delete',
  SYS_FUNCTION_GROUP_DELETE_IDS = '/api/SysFunctionGroup/DeleteIds',

  //SYS_MODULE
  SYS_MODULE_QUERY_LIST = '/api/SysModule/QueryList',
  SYS_MODULE_CREATE = '/api/SysModule/Create',
  SYS_MODULE_READ = '/api/SysModule/GetById',
  SYS_MODULE_READ_ALL = '/api/SysModule/ReadAll',
  SYS_MODULE_UPDATE = '/api/SysModule/Update',
  SYS_MODULE_DELETE = '/api/SysModule/Delete',
  SYS_MODULE_DELETE_IDS = '/api/SysModule/DeleteIds',

  //SYS_ACTION
  SYS_ACTION_QUERY_LIST = '/api/SysAction/QueryList',
  SYS_ACTION_CREATE = '/api/SysAction/Create',
  SYS_ACTION_READ = '/api/SysAction/GetById',
  SYS_ACTION_READ_ALL = '/api/SysAction/ReadAll',
  SYS_ACTION_UPDATE = '/api/SysAction/Update',
  SYS_ACTION_DELETE = '/api/SysAction/Delete',
  SYS_ACTION_DELETE_IDS = '/api/SysAction/DeleteIds',

  //SYS_FUNCTION_ACTION
  SYS_FUNCTION_ACTION_QUERY_LIST = '/api/SysFunctionAction/QueryList',
  SYS_FUNCTION_ACTION_CREATE = '/api/SysFunctionAction/Create',
  SYS_FUNCTION_ACTION_READ = '/api/SysFunctionAction/GetById',
  SYS_FUNCTION_ACTION_UPDATE = '/api/SysFunctionAction/Update',
  SYS_FUNCTION_ACTION_DELETE_IDS = '/api/SysFunctionAction/DeleteIds',
  SYS_FUNCTION_ACTION_DELETE = '/api/SysFunctionAction/Delete',
  SYS_FUNCTION_ACTION_UPDATE_RANGE_RENEW = '/api/SysFunctionAction/UpdateSysFunctionActionRange',

  // SYS_CSS_VAR
  CSS_VAR_QUERY_LIST = '/api/CssVar/QueryList',
  CSS_VAR_CREATE = '/api/CssVar/Create',
  CSS_VAR_READ = '/api/CssVar/GetById',
  CSS_VAR_UPDATE = '/api/CssVar/Update',
  CSS_VAR_DELETE_IDS = '/api/CssVar/DeleteIds',

  //INS_SPECIFIED_OBJECTS
  INS_SPECIFIED_OBJECTS_QUERY_LIST = '/api/InsSpecifiedObjects/QueryList',
  INS_SPECIFIED_OBJECTS_CREATE = '/api/InsSpecifiedObjects/Create',
  INS_SPECIFIED_OBJECTS_UPDATE = '/api/InsSpecifiedObjects/Update',
  INS_SPECIFIED_OBJECTS_READ = '/api/InsSpecifiedObjects/GetById',
  INS_SPECIFIED_OBJECTS_DELETE = '/api/InsSpecifiedObjects/Delete',
  INS_SPECIFIED_OBJECTS_DELETE_IDS = '/api/InsSpecifiedObjects/DeleteIds',

  //INS_TYPE
  INS_TYPE_QUERY_LIST = '/api/InsType/QueryList',
  INS_TYPE_CREATE = '/api/InsType/Create',
  INS_TYPE_UPDATE = '/api/InsType/Update',
  INS_TYPE_READ = '/api/InsType/GetById',
  INS_TYPE_READ_BY = '/api/InsType/GetInsTypeById',
  INS_TYPE_DELETE_IDS = '/api/InsType/DeleteIds',
  INS_TYPE_TOGGLE_ACTIVE_IDS = '/api/InsType/ToggleActiveIds',
  INS_TYPE_GET_OTHER_LIST_OBJ_KEYBY_TYPE = '/api/SysOrtherList/GetOtherListByType?typeCode=BDBH',

  //INS_WHEREHEALTH
  INS_WHEREHEALTH_QUERY_LIST = '/api/InsWhereHealTh/QueryList',
  INS_WHEREHEALTH_CREATE = '/api/InsWhereHealTh/Create',
  INS_WHEREHEALTH_UPDATE = '/api/InsWhereHealTh/Update',
  INS_WHEREHEALTH_READ = '/api/InsWhereHealTh/GetById',
  INS_WHEREHEALTH_GET_CODE = '/api/InsWhereHealTh/GetCode',
  INS_WHEREHEALTH_DELETE_IDS = '/api/InsWhereHealTh/DeleteIds',
  INS_WHEREHEALTH_READ_ALL = '/api/InsWhereHealTh/ReadAll',
  INS_WHEREHEALTH_TOGGLE_ACTIVE_IDS = '/api/InsWhereHealTh/ToggleActiveIds',

  // CSS_THEME
  CSS_THEME_QUERY_LIST = '/api/CssTheme/QueryList',
  CSS_THEME_CREATE = '/api/CssTheme/Create',
  CSS_THEME_READ = '/api/CssTheme/GetById',
  CSS_THEME_UPDATE = '/api/CssTheme/Update',
  CSS_THEME_DELETE_IDS = '/api/CssTheme/DeleteIds',

  //HU_TERMINATE AKA LEAVEJOB
  HU_LEAVEJOB_QUERY_LIST = '/api/HuTerminate/QueryList',
  HU_LEAVEJOB_READ = '/api/HuTerminate/GetById',
  HU_LEAVEJOB_CREATE = '/api/HuTerminate/Create',
  HU_LEAVEJOB_UPDATE = '/api/HuTerminate/Update',
  HU_LEAVEJOB_DELETE = '/api/HuTerminate/Delete',
  HU_LEAVEJOB_DELETE_IDS = '/api/HuTerminate/DeleteIds',
  HU_LEAVEJOB_CHANGESTATUSAPPROVE = '/api/HuTerminate/ChangeStatusApprove',
  HU_LEAVEJOB_PRINT = '/api/HuTerminate/Print',

  //HU_WORKING - DECISION
  HU_DECISION_QUERY_LIST = '/api/HuWorking/QueryList',
  HU_DECISION_READ = '/api/HuWorking/GetById',
  HU_DECISION_CREATE = '/api/HuWorking/Create',
  HU_DECISION_UPDATE = '/api/HuWorking/Update',
  HU_DECISION_DELETE = '/api/HuWorking/Delete',
  HU_DECISION_DELETE_IDS = '/api/HuWorking/DeleteIds',
  HU_DECISION_GETWORKINGOLD = '/api/HuWorking/GetWorkingOld?empId=',
  HU_DECISION_CHECKDECISIONMASTER = '/api/HuWorking/checkDecisionMaster',
  HU_DECISION_GETDECISIONNOWORKING = '/api/HuWorking/GetDecisionNoWorking',
  HU_DECISION_CHANGESTATUSAPPROVE = '/api/HuWorking/ChangeStatusApprove',
  HU_DECISION_PRINT = '/api/HuWorking/PrintHuWorking',
  HU_DECISION_FILE_NAME = '/api/HuWorking/GetFileName?id=',

  ///HU_WORKING - WAGE
  HU_WAGE_QUERY_LIST = '/api/HuWorking/QueryListWage',
  HU_WAGE_READ = '/api/HuWorking/GetWageById',
  HU_WAGE_CREATE = '/api/HuWorking/CreateWage',
  HU_WAGE_UPDATE = '/api/HuWorking/UpdateWage',
  HU_WAGE_DELETE = '/api/HuWorking/DeleteWage',
  HU_WAGE_DELETE_IDS = '/api/HuWorking/DeleteIdsWage',
  HU_WAGE_EXPIRE_SHORT_TEMP = '/api/HuWorking/CalculateExpireShortTemp?empId=',
  HU_WAGE_CHANGESTATUSAPPROVE = '/api/HuWorking/ChangeStatusApproveWage',
  HU_WAGE_PRINT = '/api/HuWorking/PrintHuWorking',
  HU_WAGE_GET_FILENAME = '/api/HuWorking/GetFileName',

  //AT_TERMINAL
  AT_TERMINAL_QUERY_LIST = '/api/AtTerminal/QueryList',
  AT_TERMINAL_READ = '/api/AtTerminal/GetById',
  AT_TERMINAL_CREATE = '/api/AtTerminal/Create',
  AT_TERMINAL_UPDATE = '/api/AtTerminal/Update',
  AT_TERMINAL_DELETE = '/api/AtTerminal/Delete',
  AT_TERMINAL_DELETE_IDS = '/api/AtTerminal/DeleteIds',
  AT_TERMINAL_TOGGLE_ACTIVE_IDS = '/api/AtTerminal/ToggleActiveIds',
  AT_TERMINAL_GET_NEW_CODE = '/api/AtTerminal/GetNewCode',

  //AT_PERIOD_STANDARD
  AT_PERIOD_STANDARD_QUERY_LIST = '/api/AtPeriodStandard/QueryList',
  AT_PERIOD_STANDARD_READ = '/api/AtPeriodStandard/GetById',
  AT_PERIOD_STANDARD_CREATE = '/api/AtPeriodStandard/Create',
  AT_PERIOD_STANDARD_UPDATE = '/api/AtPeriodStandard/Update',
  AT_PERIOD_STANDARD_DELETE = '/api/AtPeriodStandard/Delete',
  AT_PERIOD_STANDARD_DELETE_IDS = '/api/AtPeriodStandard/DeleteIds',
  AT_PERIOD_STANDARD_GET_SALARY_PERIOD = '/api/AtPeriodStandard/GetPeriod',
  AT_PERIOD_STANDARD_GET_SALARY_PERIOD_BY_ID = '/api/AtPeriodStandard/GetPeriodById',
  AT_PERIOD_STANDARD_TOGGLE_ACTIVE_IDS = '/api/AtPeriodStandard/ToggleActiveIds',

  //AT_SETUP_TIME_EMP
  AT_SETUP_TIME_EMP_QUERY_LIST = '/api/AtSetupTimeEmp/QueryList',
  AT_SETUP_TIME_EMP_READ = '/api/AtSetupTimeEmp/GetById',
  AT_SETUP_TIME_EMP_CREATE = '/api/AtSetupTimeEmp/Create',
  AT_SETUP_TIME_EMP_UPDATE = '/api/AtSetupTimeEmp/Update',
  AT_SETUP_TIME_EMP_DELETE = '/api/AtSetupTimeEmp/Delete',
  AT_SETUP_TIME_EMP_DELETE_IDS = '/api/AtSetupTimeEmp/DeleteIds',
  AT_SETUP_TIME_EMP_TOGGLE_ACTIVE_IDS = '/api/AtSetupTimeEmp/ToggleActiveIds',

  //AT_TIME_EXPLANATION
  AT_TIME_EXPLANATION_QUERY_LIST = '/api/AtTimeExplanation/QueryList',
  AT_TIME_EXPLANATION_READ = '/api/AtTimeExplanation/GetById',
  AT_TIME_EXPLANATION_CREATE = '/api/AtTimeExplanation/Create',
  AT_TIME_EXPLANATION_UPDATE = '/api/AtTimeExplanation/Update',
  AT_TIME_EXPLANATION_DELETE = '/api/AtTimeExplanation/Delete',
  AT_TIME_EXPLANATION_DELETE_IDS = '/api/AtTimeExplanation/DeleteIds',
  AT_TIME_EXPLANATION_GET_SALARY_PERIOD = '/api/AtTimeExplanation/GetListSalaryPeriod',

  HU_POSITION_BY_ORGID = '/api/HuPosition/GetPositionByOrgId?orgId=',
  HU_SALARY_TYPE_GETLIST = '/api/HuSalarytype/GetList',
  HU_SALARY_RANK_BYSCALEID = '/api/HuSalaryRank/GetRankByScaleId?scaleId=',
  HU_SALARY_RANK_GETCODE = '/api/HuSalaryRank/GetCode',
  HU_SALARY_LEVEL_GETCODE = '/api/HuSalaryLevel/GetCode',
  HU_SALARY_LEVEL_BYRANKID = '/api/HuSalaryLevel/GetLevelByRankId?rankId=',
  HU_SALARY_SCALE_GETLIST = '/api/HuSalaryScale/GetList',

  //HU_WORKING_BEFORE
  HU_WORKING_BEFORE_QUERY_LIST = '/api/HuWorkingBefore/QueryList',
  HU_WORKING_BEFORE_CREATE = '/api/HuWorkingBefore/Create',
  HU_WORKING_BEFORE_READ = '/api/HuWorkingBefore/GetById',
  HU_WORKING_BEFORE_UPDATE = '/api/HuWorkingBefore/Update',
  HU_WORKING_BEFORE_DELETE = '/api/HuWorkingBefore/Delete',
  HU_WORKING_BEFORE_DELETE_IDS = '/api/HuWorkingBefore/DeleteIds',
  //  HU_FAMILY
  HU_FAMILY_QUERY_LIST = '/api/HuFamily/QueryList',
  HU_FAMILY_CREATE = '/api/HuFamily/Create',
  HU_FAMILY_READ = '/api/HuFamily/GetById',
  HU_FAMILY_UPDATE = '/api/HuFamily/Update',
  HU_FAMILY_DELETE = '/api/HuFamily/Delete',
  HU_FAMILY_DELETE_IDS = '/api/HuFamily/DeleteIds',
  HU_FAMILY_CHANGE_STATUS = '/api/HuFamily/ChangeStatusApprove',
  HU_FAMILY_RELATIONSHIP_READ = '/api/SysOrtherList/GetOtherListByType?typeCode',
  HU_FAMILY_RELATIONSHIP_LIST = '/api/SysOrtherList/GetOtherListByType?typeCode=RELATIONSHIP',
  HU_FAMILY_NATIONALITY_LIST = '/api/HuFamily/GetNationality',
  HU_FAMILY_STATUS = '/api/SysOrtherList/GetOtherListByType?typeCode=FAMILY_STATUS',
  HU_NATION_LIST = '/api/SysOrtherList/GetOtherListByType?typeCode=NATION',
  HU_NATIONALITY_LIST = '/api/SysOrtherList/GetOtherListByType?typeCode=NATIONALITY',
  HU_RELIGION_LIST = '/api/SysOrtherList/GetOtherListByType?typeCode=RELIGION',
  HU_FAMILY_GENDER_LIST = '/api/SysOrtherList/GetOtherListByType?typeCode=GENDER',
  HU_FAMILY_TDCM_LIST = '/api/SysOrtherList/GetOtherListByType?typeCode=TDCM',
  HU_FAMILY_GET_GENDER = '/api/SysOrtherList/GetGender',
  HU_FAMILY_GET_LIST_FAMILY_MEMBER = '/api/HuFamily/GetListFamilyMember?employeeId=',

  //HU_FAMILY_EDIT
  HU_FAMILY_EDIT_QUERY_LIST = '/api/ApproveHuFamilyEdit/QueryList',
  HU_FAMILY_EDIT_READ = '/api/ApproveHuFamilyEdit/GetById',
  HU_FAMILY_EDIT_UPDATE = '/api/ApproveHuFamilyEdit/Update',
  HU_FAMILY_EDIT_APPROVE = '/api/ApproveHuFamilyEdit/ApproveHuFamilyEdit',
  HU_FAMILY_EDIT_UNAPPROVE = '/api/ApproveHuFamilyEdit/UnapproveHuFamilyEdit',
  HU_FAMAILY_EDIT_GET_STATUS_APPROVE = '/api/SysOrtherList/GetStatusApproveHuFamilyEdit',

  HU_FAMILY_PROVINCE_READ = '/api/HuFamily/GetProvinceById',
  HU_FAMILY_PROVINCE_LIST = '/api/HuFamily/GetProvince',
  HU_FAMILY_DISTRICT_READ = '/api/HuFamily/GetDistrictById',
  HU_FAMILY_DISTRICT_LIST = '/api/HuFamily/GetDistrictByProvince?id=',
  HU_FAMILY_WARD_READ = '/api/HuFamily/GetWardById',
  HU_FAMILY_WARD_LIST = '/api/HuFamily/GetWardByDistrict?id=',

  //HU_DISCIPLINE
  HU_DISCIPLINE_QUERY_LIST = '/api/HuDiscipline/QueryList',
  HU_DISCIPLINE_STATUS_LIST = '/api/SysOrtherList/GetOtherListByType?typeCode=DECISION_STATUS',
  HU_DISCIPLINE_DISCIPLINE_OBJ_LIST = '/api/SysOrtherList/GetOtherListByType?typeCode=DISCIPLINE_OBJ',
  HU_DISCIPLINE_PERIOD_LIST = '/api/SysOrtherList/GetOtherListByType',
  HU_DISCIPLINE_CREATE = '/api/HuDiscipline/Create',
  HU_DISCIPLINE_READ = '/api/HuDiscipline/GetById',
  HU_DISCIPLINE_UPDATE = '/api/HuDiscipline/Update',
  HU_DISCIPLINE_DELETE = '/api/HuDiscipline/Delete',
  HU_DISCIPLINE_DELETE_IDS = '/api/HuDiscipline/DeleteIds',
  HU_DISCIPLINE_CHANGESTATUSAPPROVE = '/api/HuDiscipline/ChangeStatusApprove',

  //HU_BANK
  HU_BANK_READ = '/api/HuBank/GetById',
  HU_BANK_READ_ALL = '/api/HuBank/ReadAll',
  HU_BANK_CREATE = '/api/HuBank/Create',
  HU_BANK_UPDATE = '/api/HuBank/Update',
  HU_BANK_DELETE = '/api/HuBank/Delete',
  HU_BANK_DELETE_IDS = '/api/HuBank/DeleteIds',
  HU_BANK_QUERY_LIST = '/api/HuBank/QueryList',
  HU_BANK_TOGGLE_ACTIVE_IDS = '/api/HuBank/ToggleActiveIds',

  //HU_BANK_BRANCH
  HU_BANK_BRANCH_READ = '/api/HuBankBranch/GetById',
  HU_BANK_BRANCH_CREATE = '/api/HuBankBranch/Create',
  HU_BANK_BRANCH_UPDATE = '/api/HuBankBranch/Update',
  HU_BANK_BRANCH_DELETE = '/api/HuBankBranch/Delete',
  HU_BANK_BRANCH_DELETE_IDS = '/api/HuBankBranch/DeleteIds',
  HU_BANK_BRANCH_TOGGLE_ACTIVE_IDS = '/api/HuBankBranch/ToggleActiveIds',
  HU_BANK_BRANCH_QUERY_LIST = '/api/HuBankBranch/QueryList',
  HU_BANK_BRANCH_BY_BANK_ID = '/api/HuBankBranch/GetBrankByBankId?id=',
  // HU_BANK_BRANCH_READ_ALL = '/api/HuBankBranch/ReadAll',

  //HU_CERTIFICATE
  HU_CERTIFICATE_READ = '/api/HuCertificateList/GetById',
  HU_CERTIFICATE_CREATE = '/api/HuCertificateList/Create',
  HU_CERTIFICATE_UPDATE = '/api/HuCertificateList/Update',
  HU_CERTIFICATE_DELETE = '/api/HuCertificateList/Delete',
  HU_CERTIFICATE_DELETE_IDS = '/api/HuCertificateList/DeleteIds',
  HU_CERTIFICATE_QUERY_LIST = '/api/HuCertificateList/QueryList',
  HU_CERTIFICATE_GET_ID_OF_TYPE_CERTIFICATE = '/api/HuCertificateList/GetIdOfTypeCertificateByCode?code=',

  //HU_CONTRACT
  HU_CONTRACT_QUERY_LIST = '/api/HuContract/QueryList',
  HU_CONTRACT_QUERY_LIST_IMPORT = '/api/HuContractImport/QueryList',///api/HuContract/QueryListImport
  HU_CONTRACT_CREATE = '/api/HuContract/Create',
  HU_CONTRACT_READ = '/api/HuContract/GetById',
  HU_CONTRACT_UPDATE = '/api/HuContract/Update',
  HU_CONTRACT_DELETE = '/api/HuContract/Delete',
  HU_CONTRACT_DELETE_IDS = '/api/HuContract/DeleteIds',
  HU_CONTRACT_GEBYEMPLOYEEID = '/api/HuContract/GetByEmployeeId?EmployeeId=',
  HU_CONTRACT_GETCONTRACTBYEMPPROFILE = '/api/HuContract/GetContractByEmpProfile?EmployeeId=',
  HU_CONTRACT_GETCODE = '/api/HuContract/GetCode',
  HU_CONTRACT_GET_LAST = '/api/HuContract/GetLastContract?empId=',
  HU_CONTRACT_GETLISTTYPE = '/api/HuContract/GetContractType',
  HU_CONTRACT_GETWAYGEBYSTARTDATECONTRACT = '/api/HuContract/GetWageByStartDateContract?empId=',
  HU_CONTRACT_CHANGESTATUSAPPROVE = '/api/HuContract/ChangeStatusApprove',
  HU_CONTRACT_PRINT = '/api/HuContract/PrintContractInfo',
  HU_CONTRACT_SAVE_IMPORT = '/api/HuContractImport/Save',///api/HuContract/Save -- test
  HU_CONTRACT_IS_RECEIVE = '/api/HuContract/IsReceive',///api/HuContract/Save -- test
  HU_CONTRACT_LIQUIDATE_CONTRACT = "/api/HuContract/LiquidationContract",
  HU_CONTRACT_GET_PROBATION_CONTRACT = '/api/HuContract/PrintProbationContract',
  HU_CONTRACT_GET_FILE_NAME = '/api/HuContract/GetFileName?id=',
  HU_CONTRACT_GET_LIST_CONTRACT_TYPE_BY_ID = '/api/HuContractType/GetListContractTypeById',

  //HU_CONTRACTAPPENDIX
  HU_CONTRACTAPPENDIX_QUERY_LIST = '/api/HuContractAppendix/QueryList',
  HU_CONTRACTAPPENDIX_QUERY_LIST_IMPORT = '/api/HuFileContractImport/QueryList',
  HU_CONTRACTAPPENDIX_CREATE = '/api/HuContractAppendix/Create',
  HU_CONTRACTAPPENDIX_READ = '/api/HuContractAppendix/GetById',
  HU_CONTRACTAPPENDIX_UPDATE = '/api/HuContractAppendix/Update',
  HU_CONTRACTAPPENDIX_DELETE = '/api/HuContractAppendix/Delete',
  HU_CONTRACTAPPENDIX_DELETE_IDS = '/api/HuContractAppendix/DeleteIds',
  HU_CONTRACTAPPENDIX_TYPE_GETLIST = '/api/HuContractType/GetContractAppendixType',
  HU_CONTRACTAPPENDIX_GETCODE = '/api/HuContractAppendix/GetCode',
  HU_CONTRACT_GETCONTRACTAPPENDIXBYEMPPROFILE = '/api/HuContractAppendix/GetContractAppendixByEmpProfile?EmployeeId=',
  HU_CONTRACTAPPENDIX_QUERY_LIST_FOR_OVERVIEW = '/api/HuContractAppendix/GetAllowanceWageById',
  HU_CONTRACTAPPENDIX_GETWAYGEBYSTARTDATECONTRACT = '/api/HuContractAppendix/GetWageByContract',
  HU_CONTRACTAPPENDIX_GETEXPIREDATECONTRACT = '/api/HuContractAppendix/GetExpiteDateByContract',
  HU_CONTRACTAPPENDIX_CHANGESTATUSAPPROVE = '/api/HuContractAppendix/ChangeStatusApprove',
  HU_CONTRACTAPPENDIX_SAVE_IMPORT = '/api/HuFileContractImport/Save',

  HU_CONTRACTAPPENDIX_PRINT = '/api/HuContractAppendix/PrintContractAppendix',
  //PA_SALARY_IMPORT
  PA_SALARY_IMPORT_GET_LIST_SAL_BY_ID = '/api/PaSalImport/GetListSalaries?id=',

  //INS_GROUP
  INS_GROUP_QUERY_LIST = '/api/InsGroup/QueryList',
  INS_GROUP_READ = '/api/InsGroup/GetById',
  INS_GROUP_CREATE = '/api/InsGroup/Create',
  INS_GROUP_UPDATE = '/api/InsGroup/Update',
  INS_GROUP_DELETE = '/api/InsGroup/Delete',
  INS_GROUP_DELETE_IDS = '/api/InsGroup/DeleteIds',
  INS_GROUP_TOGGLER_ACTIVE_IDS = '/api/InsGroup/ToggleActiveIds',

  //INS_INFORMATION
  INS_INFORMATION_QUERY_LIST = '/api/InsInformation/QueryList',
  INS_INFORMATION_READ = '/api/InsInformation/GetById',
  INS_INFORMATION_READ_BY_ID = '/api/InsInformation/GetById?id=',

  INS_INFORMATION_GET_BHXHSTATUS_BY_ID = '/api/InsInformation/GetBhxhStatusById',
  INS_INFORMATION_GET_BHYTSTATUS_BY_ID = '/api/InsInformation/GetBhYtStatusById',
  INS_INFORMATION_GET_INS_WHEREHEALTH_BY_ID = '/api/InsInformation/GetInsWhereHealthById',
  INS_INFORMATION_CREATE = '/api/InsInformation/Create',
  INS_INFORMATION_UPDATE = '/api/InsInformation/Update',
  INS_INFORMATION_DELETE = '/api/InsInformation/Delete',
  INS_INFORMATION_DELETE_IDS = '/api/InsInformation/DeleteIds',

  //INS_REGIMES
  INS_REGIMES_QUERY_LIST = '/api/InsREGIMES/QueryList',
  INS_REGIMES_READ = '/api/InsREGIMES/GetById',
  INS_REGIMES_CREATE = '/api/InsREGIMES/Create',
  INS_REGIMES_UPDATE = '/api/InsREGIMES/Update',
  INS_REGIMES_DELETE = '/api/InsREGIMES/Delete',
  INS_REGIMES_DELETE_IDS = '/api/InsREGIMES/DeleteIds',
  INS_REGIMES_GET_DATE_TYPE = '/api/InsREGIMES/GetCalDateTypeById',
  INS_REGIMES_CHANGESTATUSAPPROVE = '/api/InsREGIMES/ChangeStatusApprove',
  //INS_REGIMES_MND
  INS_REGIMES_MNG_QUERY_LIST = '/api/InsRegimesMng/QueryList',
  INS_REGIMES_MNG_READ = '/api/InsRegimesMng/GetById',
  INS_REGIMES_MNG_GET_BY_ID = '/api/InsRegimesMng/GetById?id=',
  INS_REGIMES_MNG_CREATE = '/api/InsRegimesMng/Create',
  INS_REGIMES_MNG_UPDATE = '/api/InsRegimesMng/Update',
  INS_REGIMES_MNG_DELETE = '/api/InsRegimesMng/Delete',
  INS_REGIMES_MNG_DELETE_IDS = '/api/InsRegimesMng/DeleteIds',
  INS_REGIMES_MNG_GET_REGIMES = '/api/InsRegimesMng/GetRegimes',
  INS_REGIMES_MNG_GET_TIEN_CHEDO = '/api/InsRegimesMng/SpsTienCheDo',
  INS_REGIMES_MNG_GET_ACCUUMULATE_Day = '/api/InsRegimesMng/GetAccumulateDay',
  INS_REGIMES_MNG_GET_TIEN_BH6TH = '/api/InsRegimesMng/SpsTienBHTH',

  SYS_MENU_READ_ALL = '/api/SysMenu/ReadAll',
  SYS_MENU_READ_ALL_ACTIVE = '/api/SysMenu/ReadAllActive',
  SYS_MENU_QUERY_LIST = '/api/SysMenu/QueryList',
  SYS_MENU_CREAT = '/api/SysMenu/Create',
  SYS_MENU_READ = '/api/SysMenu/GetById',
  SYS_MENU_UPDATE = '/api/SysMenu/Update',
  SYS_MENU_DELETE = '/api/SysMenu/Delete',
  SYS_MENU_DELETE_IDS = '/api/SysMenu/DeleteIds',
  SYS_MENU_GET_PERMITTED_LINEAR_LIST = '/api/SysMenu/GetPermittedLinearList',

  //INS_CHANGE
  INS_CHANGE_QUERY_LIST = '/api/InsChange/QueryList',
  INS_CHANGE_READ = '/api/InsChange/GetById',
  INS_CHANGE_CREATE = '/api/InsChange/Create',
  INS_CHANGE_UPDATE = '/api/InsChange/Update',
  INS_CHANGE_DELETE = '/api/InsChange/Delete',
  INS_CHANGE_DELETE_IDS = '/api/InsChange/DeleteIds',
  INS_CHANGE_UNIT_INSURANCE = '/api/InsChange/GetOtherListInsType',
  INS_CHANGE_INS_TYPE = '/api/InsChange/GetTypeInsChange',
  INS_CHANGE_GET_BY_ID = '/api/InsChange/GetById?id=',
  INS_CHANGE_MANUAL_LOAD = '/api/InsChange/SpsInsArisingManualLoad',
  INS_CHANGE_MANUAL_LOAD2 = '/api/InsChange/SpsInsArisingManualLoad2',
  INS_CHANGE_MANUAL_GET = '/api/InsChange/SpsInsArisingManualGet',
  INS_CHANGE_MANUAL_GET2 = '/api/InsChange/SpsInsArisingManualGet2',
  //HU_COMPANY
  HU_COMPANY_QUERY_LIST = '/api/HuCompany/QueryList',
  HU_COMPANY_CREATE = '/api/HuCompany/Create',
  HU_COMPANY_READ = '/api/HuCompany/GetById',
  HU_COMPANY_READ_ALL = '/api/HuCompany/ReadAll',
  HU_COMPANY_UPDATE = '/api/HuCompany/Update',
  HU_COMPANY_DELETE = '/api/HuCompany/Delete',
  HU_COMPANY_DELETE_IDS = '/api/HuCompany/DeleteIds',
  HU_COMPANY_SUBMIT_ACTIVE = '/api/HuCompany/SubmitActivate',
  HU_COMPANY_SUBMIT_STOP_ACTIVE = '/api/HuCompany/SubmitStopActivate',
  HU_COMPANY_TOGGLE_ACTIVE_IDS = '/api/HuCompany/ToggleActiveIds',

  HU_ORGANIZATION_QUERY_LIST = '/api/HuOrganization/QueryList',
  HU_ORGANIZATION_CREATE = '/api/HuOrganization/Create',
  HU_ORGANIZATION_READ = '/api/HuOrganization/GetById',
  HU_ORGANIZATION_UPDATE = '/api/HuOrganization/Update',
  HU_ORGANIZATION_DELETE = '/api/HuOrganization/Delete',
  HU_ORGANIZATION_DELETE_IDS = '/api/HuOrganization/DeleteIds',
  HU_ORGANIZATION_TOGGLE_ACTIVE_IDS = '/api/HuOrganization/ToggleActiveIds',
  HU_ORGANIZATION_TOGGLE_ACTIVE_IDS2 = '/api/HuOrganization/ToggleActiveIds2',
  HU_ORGANIZATION_GET_NEW_CODE = '/api/HuOrganization/GetNewCode',
  HU_ORGANIZATION_UPDATE2 = '/api/HuOrganization/Update2',

  HU_ORG_LEVEL_QUERY_LIST = '/api/HuOrgLevel/QueryList',
  HU_ORG_LEVEL_CREATE = '/api/HuOrgLevel/Create',
  HU_ORG_LEVEL_READ = '/api/HuOrgLevel/GetById',
  HU_ORG_LEVEL_READ_ALL = '/api/HuOrgLevel/ReadAll',
  HU_ORG_LEVEL_UPDATE = '/api/HuOrgLevel/Update',
  HU_ORG_LEVEL_DELETE = '/api/HuOrgLevel/Delete',
  HU_ORG_LEVEL_DELETE_IDS = '/api/HuOrgLevel/DeleteIds',
  HU_ORG_LEVEL_TOGGLE_ACTIVE_IDS = '/api/HuOrgLevel/ToggleActiveIds',

  TR_CENTER_QUERY_LIST = '/api/TrCenter/QueryList',
  TR_CENTER_CREATE = '/api/TrCenter/Create',
  TR_CENTER_READ = '/api/TrCenter/GetById',
  TR_CENTER_READ_ALL = '/api/TrCenter/ReadAll',
  TR_CENTER_UPDATE = '/api/TrCenter/Update',
  TR_CENTER_DELETE = '/api/TrCenter/Delete',
  TR_CENTER_DELETE_IDS = '/api/TrCenter/DeleteIds',
  TR_CENTER_TOGGLE_ACTIVE_IDS = '/api/TrCenter/ToggleActiveIds',
  TR_CENTER_GET_LIST_TRAINING_CENTER = '/api/TrCenter/GetListTrainingCenter',

  AT_SHIFT_QUERY_LIST = '/api/AtShift/QueryList',
  AT_SHIFT_CREATE = '/api/AtShift/Create',
  AT_SHIFT_READ = '/api/AtShift/GetById',
  AT_SHIFT_READ_ALL = '/api/AtShift/GetAll',
  AT_SHIFT_UPDATE = '/api/AtShift/Update',
  AT_SHIFT_DELETE = '/api/AtShift/Delete',
  AT_SHIFT_DELETE_IDS = '/api/AtShift/DeleteIds',
  AT_SHIFT_GETTIMETYPES = '/api/AtShift/GetListTimeType',
  AT_SHIFT_GETLISTTOIMPORT = '/api/AtShift/GetListToImport',
  AT_SHIFT_TIME_TYPE = '/api/AtShift/GetListTimeType',
  AT_SHIFT_TIME_TYPE_BY_ID = '/api/AtShift/GetListTimeTypeById',
  AT_SHIFT_GET_TIME_TYPE_BY_ID = '/api/AtShift/GetTimeTypeById',
  AT_SHIFT_TOGGLE_ACTIVE_IDS = '/api/AtShift/ToggleActiveIds',
  AT_SHIFT_SUBMIT_ACTIVE = '/api/AtShift/SubmitActivate',
  AT_SHIFT_SUBMIT_STOP_ACTIVE = '/api/AtShift/SubmitStopActivate',

  //AT_SALARY_PERIOD
  AT_SALARY_PERIOD_QUERY_LIST = '/api/AtSalaryPeriod/QueryList',
  AT_SALARY_PERIOD_CREATE_RANGE = '/api/AtSalaryPeriod/CreateRange',
  AT_SALARY_PERIOD_CREATE = '/api/AtSalaryPeriod/Create',
  AT_SALARY_PERIOD_READ = '/api/AtSalaryPeriod/GetById',
  AT_SALARY_PERIOD_READ_ALL = '/api/AtSalaryPeriod/ReadAll',
  AT_SALARY_PERIOD_UPDATE = '/api/AtSalaryPeriod/Update',
  AT_SALARY_PERIOD_DELETE = '/api/AtSalaryPeriod/Delete',
  AT_SALARY_PERIOD_DELETE_IDS = '/api/AtSalaryPeriod/DeleteIds',
  AT_SALARY_PERIOD_CREATE_WITH_LIST_AT_ORG_PERIOD = '/api/AtSalaryPeriod/AddNewWithAtOrgPeriods',
  AT_SALARY_PERIOD_UPDATE_WITH_LIST_AT_ORG_PERIOD = '/api/AtSalaryPeriod/UpdateWithAtOrgPeriods',
  AT_SALARY_PERIOD_GET_LIST_IN_YEAR = '/api/AtSalaryPeriod/GetListSalaryInYear',
  AT_SALARY_PERIOD_GET_LIST_PERIOD = '/api/AtSalaryPeriod/GetListSalaryPeriod',
  AT_SALARY_PERIOD_GET_YEAR = '/api/AtSalaryPeriod/GetYear',
  AT_SALARY_PERIOD_GET_ALL_MONTH_BY_YEAR = '/api/AtSalaryPeriod/GetAllMonthByYear',
  AT_SALARY_PERIOD_GET_CURRENT_PERIOD = '/api/AtWorksign/GetCurrentPeriodSalary',
  AT_SALARY_PERIOD_TOGGLE_ACTIVE_IDS = '/api/AtSalaryPeriod/ToggleActiveIds',
  //AT_SWIPE_DATA
  AT_SWIPE_DATA_QUERY_LIST = '/api/AtSwipeData/QueryList',
  AT_SWIPE_DATA_QUERY_DELETE_IDS = '/api/AtSwipeData/DeleteIds',

  //INS_REGION
  INS_REGION_QUERY_LIST = '/api/InsRegion/QueryList',
  INS_REGION_CREATE = '/api/InsRegion/Create',
  INS_REGION_READ = '/api/InsRegion/GetById',
  INS_REGION_DELETE = '/api/InsRegion/Delete',
  INS_REGION_UPDATE = '/api/InsRegion/Update',
  INS_REGION_DELETE_IDS = '/api/InsRegion/DeleteIds',
  INS_REGION_TOGGLE_ACTIVE_IDS = '/api/InsRegion/ToggleActiveIds',

  //TR_COURSE
  TR_COURSE_QUERY_LIST = '/api/TrCourse/QueryList',
  TR_COURSE_CREATE = '/api/TrCourse/Create',
  TR_COURSE_READ = '/api/TrCourse/GetById',
  TR_COURSE_DELETE = '/api/TrCourse/Delete',
  TR_COURSE_UPDATE = '/api/TrCourse/Update',
  TR_COURSE_DELETE_IDS = '/api/TrCourse/DeleteIds',
  TR_COURSE_TOGGLE_ACTIVE_IDS = '/api/TrCourse/ToggleActiveIds',
  TR_COURSE_GET_LIST_COURSE = '/api/TrCourse/GetListCourse',

  //TR_PLAN
  TR_PLAN_QUERY_LIST = '/api/TrPlan/QueryList',
  TR_PLAN_READ = '/api/TrPlan/GetById',
  TR_PLAN_CREATE = '/api/TrPlan/Create',
  TR_PLAN_UPDATE = '/api/TrPlan/Update',
  TR_PLAN_DELETE_IDS = '/api/TrPlan/DeleteIds',
  TR_PLAN_GET_CODE = '/api/TrPlan/GetCode',
  TR_PLAN_GET_PRINT = '/api/TrPlan/PrintPlan',
  TR_PLAN_GET_COST_BY_ID = '/api/TrPlan/GetCostByIdCourse',
  TR_PLAN_GET_BY_TYPE_ID = '/api/TrPlan/GetJobFamily',

  //HU_COMMEND
  HU_COMMEND_QUERY_LIST = '/api/HuCommend/QueryList',
  HU_COMMEND_READ = '/api/HuCommend/GetById',
  HU_COMMEND_READ_BY_ID = '/api/HuCommend/GetById?id=',
  HU_COMMEND_CREATE = '/api/HuCommend/Create',
  HU_COMMEND_UPDATE = '/api/HuCommend/Update',
  HU_COMMEND_DELETE_IDS = '/api/HuCommend/DeleteIds',
  HU_COMMEND_COMMEND_OBJ = '/api/SysOrtherList/GetOtherListByType?typeCode=DTKT',
  HU_COMMEND_GET_LIST_COMMEND_BY_EMPLOYEE = '/api/HuCommend/GetListCommendByEmployee?employeeId=',
  HU_DISCIPLINE_AWARD_TITLE_LIST = '/api/SysOrtherList/GetOtherListByType?typeCode=DHKT',
  HU_COMMEND_APPROVE_ACTIVE = '/api/HuCommendEmployee/OpenApproveCommend',
  //HU_COMMEND_EMPLOYEE
  HU_COMMEND_EMPLOYEE_DELETE_IDS = '/api/HuCommendEmployee/DeleteIds',
  //SE_LDAP
  SE_LDAP_QUERY_LIST = '/api/SeLdap/QueryList',
  SE_LDAP_READ = '/api/SeLdap/GetById',
  SE_LDAP_CREATE = '/api/SeLdap/Create',
  SE_LDAP_UPDATE = '/api/SeLdap/Update',
  SE_LDAP_DELETE_IDS = '/api/SeLdap/DeleteIds',

  //SE_PROCESS
  SE_PROCESS_QUERY_LIST = '/api/Seprocess/QueryList',
  SE_PROCESS_READ = '/api/Seprocess/GetById',
  SE_PROCESS_CREATE = '/api/Seprocess/Create',
  SE_PROCESS_UPDATE = '/api/Seprocess/Update',
  SE_PROCESS_DELETE_IDS = '/api/Seprocess/DeleteIds',
  SE_PROCESS_GET_PROCESS_TYPE_BY_ID = '/api/Seprocess/GetProcessTypeById',

  //SE_AUTHORIZE_APPROVE
  SE_AUTHORIZE_APPROVE_QUERY_LIST = '/api/SeAuthorizeApprove/QueryList',
  SE_AUTHORIZE_APPROVE_READ = '/api/SeAuthorizeApprove/GetById',
  SE_AUTHORIZE_APPROVE_CREATE = '/api/SeAuthorizeApprove/Create',
  SE_AUTHORIZE_APPROVE_UPDATE = '/api/SeAuthorizeApprove/Update',
  SE_AUTHORIZE_APPROVE_DELETE_IDS = '/api/SeAuthorizeApprove/DeleteIds',
  SE_AUTHORIZE_APPROVE_GET_LEVEL_ORDER_BY_ID = '/api/SeAuthorizeApprove/GetLevelOrderById',

  //SE_PPROCESS_APPROVE
  SE_PROCESS_APPROVE_QUERY_LIST = '/api/SeProcessApprove/QueryList',
  SE_PROCESS_APPROVE_READ = '/api/SeProcessApprove/GetById?id=',
  SE_PROCESS_APPROVE_UPDATE = '/api/SeProcessApprove/Update',
  SE_PROCESS_APPROVE_CREATE = '/api/SeProcessApprove/Create',
  SE_PROCESS_APPROVE_DELETE_IDS = '/api/SeProcessApprove/DeleteIds',
  SE_PROCESS_APPROVE_DELETE_BY_IDS = '/api/SeProcessApprove/DeleteByIds',

  //AT_SIGN_DEFAULT
  AT_SIGN_DEFAULT_QUERY_LIST = '/api/AtSignDefault/QueryList',
  AT_SIGN_DEFAULT_READ = '/api/AtSignDefault/GetById',
  AT_SIGN_DEFAULT_CREATE = '/api/AtSignDefault/Create',
  AT_SIGN_DEFAULT_UPDATE = '/api/AtSignDefault/Update',
  AT_SIGN_DEFAULT_DELETE_IDS = '/api/AtSignDefault/DeleteIds',
  AT_SIGN_DEFAULT_DELETE = '/api/AtSignDefault/Delete',
  AT_SIGN_DEFAULT_TOGGLE_ACTIVE_IDS = '/api/AtSignDefault/ToggleActiveIds',

  //PA_LIST_FUND_SOURCE
  PA_LIST_FUND_SOURCE_QUERY_LIST = '/api/PaListFundSource/QueryList',
  PA_LIST_FUND_SOURCE_READ = '/api/PaListFundSource/GetById',
  PA_LIST_FUND_SOURCE_READ_ALL = '/api/PaListFundSource/ReadAll',
  PA_LIST_FUND_SOURCE_CREATE = '/api/PaListFundSource/Create',
  PA_LIST_FUND_SOURCE_UPDATE = '/api/PaListFundSource/Update',
  PA_LIST_FUND_SOURCE_DELETE_IDS = '/api/PaListFundSource/DeleteIds',
  PA_LIST_FUND_SOURCE_TOGGLE_ACTIVE_IDS = '/api/PaListFundSource/ToggleActiveIds',
  PA_LIST_FUND_SOURCE_GET_COMPANY_BY_ID = '/api/PaListFundSource/GetCompanyById',

  //PA_PAYROLL_FUND
  PA_PAYROLL_FUND_QUERY_LIST = '/api/PaPayrollFund/QueryList',
  PA_PAYROLL_FUND_READ = '/api/PaPayrollFund/GetById',
  PA_PAYROLL_FUND_CREATE = '/api/PaPayrollFund/Create',
  PA_PAYROLL_FUND_UPDATE = '/api/PaPayrollFund/Update',
  PA_PAYROLL_FUND_DELETE_IDS = '/api/PaPayrollFund/DeleteIds',

  //HU_NATION
  HU_NATION_QUERY_LIST = '/api/HuNationList/QueryList',
  HU_NATION_CREATE = '/api/HuNationList/Create',
  HU_NATION_READ = '/api/HuNationList/GetById',
  HU_NATION_READ_ALL = '/api/HuNationList/ReadAll',
  HU_NATION_UPDATE = '/api/HuNationList/Update',
  HU_NATION_DELETE = '/api/HuNationList/Delete',
  HU_NATION_DELETE_IDS = '/api/HuNationList/DeleteIds',
  HU_NATION_NEW_CODE = '/api/HuNationList/CreateNewCode',
  HU_NATION_SUBMIT_ACTIVE = '/api/HuNationList/SubmitActivate',
  HU_NATION_SUBMIT_STOP_ACTIVE = '/api/HuNationList/SubmitStopActivate',
  HU_NATION_TOGGLE_ACTIVE_IDS = '/api/HuNationList/ToggleActiveIds',

  //HU_PROVINCE
  HU_PROVINCE_QUERY_LIST = '/api/HuProvinceList/QueryList',
  HU_PROVINCE_CREATE = '/api/HuProvinceList/Create',
  HU_PROVINCE_READ = '/api/HuProvinceList/GetById',
  HU_PROVINCE_READ_ALL = '/api/HuProvinceList/ReadAll',
  HU_PROVINCE_UPDATE = '/api/HuProvinceList/Update',
  HU_PROVINCE_DELETE = '/api/HuProvinceList/Delete',
  HU_PROVINCE_DELETE_IDS = '/api/HuProvinceList/DeleteIds',
  HU_PROVINCE_NEW_CODE = '/api/HuProvinceList/CreateNewCode',
  HU_PROVINCE_SUBMIT_ACTIVE = '/api/HuProvinceList/SubmitActivate',
  HU_PROVINCE_SUBMIT_STOP_ACTIVE = '/api/HuProvinceList/SubmitStopActivate',
  HU_PROVINCE_TOGGLE_ACTIVE_IDS = '/api/HuProvinceList/ToggleActiveIds',

  //HU_DISTRICT
  HU_DISTRICT_QUERY_LIST = '/api/HuDistrict/QueryList',
  HU_DISTRICT_CREATE = '/api/HuDistrict/Create',
  HU_DISTRICT_READ = '/api/HuDistrict/GetById',
  HU_DISTRICT_READ_ALL = '/api/HuDistrict/ReadAll',
  HU_DISTRICT_UPDATE = '/api/HuDistrict/Update',
  HU_DISTRICT_DELETE = '/api/HuDistrict/Delete',
  HU_DISTRICT_DELETE_IDS = '/api/HuDistrict/DeleteIds',
  HU_DISTRICT_NEW_CODE = '/api/HuDistrict/CreateNewCode',
  HU_DISTRICT_GET_SCALES_PROVINCE = '/api/HuProvinceList/GetScalesProvince?naId=',
  HU_DISTRICT_SUBMIT_ACTIVE = '/api/HuDistrict/SubmitActivate',
  HU_DISTRICT_SUBMIT_STOP_ACTIVE = '/api/HuDistrict/SubmitStopActivate',
  AT_DISTRICT_TOGGLER_ACTIVE_IDS = '/api/HuDistrict/ToggleActiveIds',

  //HU_WARD
  HU_WARD_QUERY_LIST = '/api/HuWard/QueryList',
  HU_WARD_CREATE = '/api/HuWard/Create',
  HU_WARD_READ = '/api/HuWard/GetById',
  HU_WARD_READ_ALL = '/api/HuWard/ReadAll',
  HU_WARD_UPDATE = '/api/HuWard/Update',
  HU_WARD_DELETE = '/api/HuWard/Delete',
  HU_WARD_DELETE_IDS = '/api/HuWard/DeleteIds',
  HU_WARD_GET_SCALES_DISTRICT = '/api/HuWard/GetScalesDistrict?disId=',
  HU_WARD_GET_SCALES_PROVINCE = '/api/HuWard/GetScalesProvince?disId=',
  HU_WARD_NEW_CODE = '/api/HuWard/CreateNewCode',
  HU_WARD_SUBMIT_ACTIVE = '/api/HuWard/SubmitActivate',
  HU_WARD_SUBMIT_STOP_ACTIVE = '/api/HuWard/SubmitStopActivate',
  HU_WARD_TOGGLER_ACTIVE_IDS = '/api/HuWard/ToggleActiveIds',

  //HU_WELFARE_AUTO
  HU_WELFARE_AUTO_QUERY_LIST = '/api/HuWelfareAuto/QueryList',
  HU_WELFARE_AUTO_CREATE = '/api/HuWelfareAuto/Create',
  HU_WELFARE_AUTO_READ = '/api/HuWelfareAuto/GetById',
  HU_WELFARE_AUTO_UPDATE = '/api/HuWelfareAuto/Update',
  HU_WELFARE_AUTO_DELETE_IDS = '/api/HuWelfareAuto/DeleteIds',
  HU_WELFARE_AUTO_CALCULATE = '/api/HuWelfareAuto/Calculate?orgId=',

  // AT_SHIFT_SORT
  AT_SHIFT_SORT_GET_LIST = '/api/AtWorksign/GetList',
  AT_SHIFT_SORT_READ = '/api/AtWorksign/GetById',
  AT_SHIFT_SORT_CREATE = '/api/AtWorksign/Create',
  AT_SHIFT_SORT_UPDATE = '/api/AtWorksign/Update',
  AT_SHIFT_SORT_DELETE = '/api/AtWorksign/DeleteWorksigns',
  AT_SHIFT_SORT_DELETE_IDS = '/api/AtWorksign/DeleteIds',
  AT_SHIFT_SORT_GET_EMP_INFO = '/api/AtWorksign/GetEmployeeInfo',
  AT_SHIFT_SORT_GET_SHIFT_DEFAULT = '/api/AtWorksign/GetShiftDefault',
  AT_SHIFT_SORT_EXPORT_TEMP = '/api/AtWorksign/ExportTempImportShiftSort',
  AT_SHIFT_SORT_IMPORT_TEMP = '/api/AtWorksign/ImportShiftSort',

  //AT_ORG_PERIOD
  AT_ORG_PERIOD_READ_ALL_BY_NUMBER_KEY = '/api/AtOrgPeriod/ReadAllOrgByPeriodId',
  AT_SHIFT_SORT_QUERY_LIST = '/api/AtWorksign/QueryList',

  // PA_LISTSAL
  PA_LISTSAL_QUERY_LIST = '/api/PaListSal/QueryList',
  PA_LISTSAL_CREATE = '/api/PaListSal/Create',
  PA_LISTSAL_READ = '/api/PaListSal/GetById',
  PA_LISTSAL_READ_ALL = '/api/PaListSal/ReadAll',
  PA_LISTSAL_UPDATE = '/api/PaListSal/Update',
  PA_LISTSAL_DELETE = '/api/PaListSal/Delete',
  PA_LISTSAL_DELETE_IDS = '/api/PaListSal/DeleteIds',
  PA_LISTSAL_TOGGLE_ACTIVE_IDS = '/api/PaListSal/ToggleActiveIds',

  //SE_REMINDER
  SE_REMINDER_CREATERANGE = '/api/SeReminder/CreateRange',
  SE_REMINDER_UPDATERANGE = '/api/SeReminder/UpdateRange',
  SE_REMINDER_READALL = '/api/SeReminder/ReadAll',
  SE_REMINDER_GETREMIND = '/api/SeReminder/GetRemind',
  SE_REMINDER_GETHISTORYORGID = '/api/SeReminder/GetHistoryOrgId',
  //INS_ARISING
  INS_ARISING_QUERY_LIST = '/api/InsArising/QueryList',
  INS_ARISING_CREATE = '/api/InsArising/Create',
  INS_ARISING_READ = '/api/InsArising/GetById',
  INS_ARISING_UPDATE = '/api/InsArising/Update',
  INS_ARISING_DELETE = '/api/InsArising/Delete',
  INS_ARISING_DELETE_IDS = '/api/InsArising/DeleteIds',
  INS_ARISING_INS_TYPE_READ = '/api/InsArising/GetInsTypeById',
  INS_ARISING_INS_TYPE_LIST = '/api/InsArising/GetInsTypeList',

  // HU_EVALUATION_COM
  HU_EVALUATION_COM_QUERY_LIST = '/api/HuEvaluationCom/QueryList',
  HU_EVALUATION_COM_READ = '/api/HuEvaluationCom/GetById',
  HU_EVALUATION_COM_CREATE = '/api/HuEvaluationCom/Create',
  HU_EVALUATION_COM_UPDATE = '/api/HuEvaluationCom/Update',
  HU_EVALUATION_COM_DELETE = '/api/HuEvaluationCom/Delete',
  HU_EVALUATION_COM_DELETE_IDS = '/api/HuEvaluationCom/DeleteIds',
  HU_EVALUATION_COM_GETWORKINGOLD = '/api/HuEvaluationCom/GetWorkingOld?empId=',
  LAY_XEP_LOAI_DANH_GIA = '/api/HuEvaluationCom/GetXepLoaiById',

  //HU_EVALUATE
  HU_EVALUATE_QUERY_LIST = '/api/HuEvaluate/QueryList',
  HU_EVALUATE_READ = '/api/HuEvaluate/GetById',
  HU_EVALUATE_CREATE = '/api/HuEvaluate/Create',
  HU_EVALUATE_UPDATE = '/api/HuEvaluate/Update',
  HU_EVALUATE_DELETE_IDS = '/api/HuEvaluate/DeleteIds',
  HU_EVALUATE_QUERY_LIST_WORKING_BEFORE = '/api/PortalRequestChange/QueryListApproveWorkingBefore',
  HU_EVALUATE_APPROVE_IDS = '/api/PortalRequestChange/ApproveWorkingBefore',

  //AT_SIGN_DEFAULT
  AT_TIME_TIMESHEET_DAILY_QUERY_LIST = '/api/AtTimeTimesheetDaily/QueryList',
  AT_TIME_TIMESHEET_DAILY_READ = '/api/AtTimeTimesheetDaily/GetById',
  AT_TIME_TIMESHEET_DAILY_CREATE = '/api/AtTimeTimesheetDaily/Create',
  AT_TIME_TIMESHEET_DAILY_UPDATE = '/api/AtTimeTimesheetDaily/Update',
  AT_TIME_TIMESHEET_DAILY_DELETE_IDS = '/api/AtTimeTimesheetDaily/DeleteIds',
  AT_TIME_TIMESHEET_DAILY_DELETE = '/api/AtTimeTimesheetDaily/Delete',
  AT_TIME_TIMESHEET_DAILY_GET_LIST_TIME_SHEET = '/api/AtTimeTimesheetDaily/GetListTimeSheet',
  AT_TIME_TIMESHEET_DAILY_GET_IMPORT_EDIT = '/api/AtTimeTimesheetDaily/GetByImportEdit',
  AT_TIME_TIMESHEET_DAILY_UPDATE_IMPORT_EDIT = '/api/AtTimeTimesheetDaily/UpdateImportEdit',
  AT_TIME_TIMESHEET_DAILY_CALCULATE = '/api/AtTimeTimesheetDaily/Calculate',
  AT_TIME_TIMESHEET_DAILY_CONFIRM = '/api/AtTimeTimesheetDaily/Confirm',
  AT_TIME_TIMESHEET_DAILY_EXPORT_TEMP = '/api/AtTimeTimesheetDaily/ExportTempImportTimeSheet',
  AT_TIME_TIMESHEET_DAILY_IMPORT_TEMP = '/api/AtTimeTimesheetDaily/ImportTimeSheetDaily',


  // AT_TIMESHEET_MONTHLY
  AT_TIME_TIMESHEET_MONTHY_QUERY_LIST = '/api/TimeSheetMonthly/QueryList',
  AT_TIME_TIMESHEET_MONTHY_GET_BY_EMP_ID = '/api/TimeSheetMonthly/GetByEmployeeId',
  AT_TIME_TIMESHEET_MONTHY_CALCULATE = '/api/TimeSheetMonthly/Calculate',
  AT_TIME_TIMESHEET_MONTHY_LOCK_PERIOD = '/api/TimeSheetMonthly/Lock',

  //SYS_PA_FORMULA
  SYS_PA_FORMULA_QUERY_LIST = '/api/SysPaFormula/QueryList',
  SYS_PA_FORMULA_READ = '/api/SysPaFormula/GetById',
  SYS_PA_FORMULA_CREATE = '/api/SysPaFormula/Create',
  SYS_PA_FORMULA_UPDATE = '/api/SysPaFormula/Update',
  SYS_PA_FORMULA_DELETE = '/api/SysPaFormula/Delete',
  SYS_PA_FORMULA_DELETE_IDS = '/api/SysPaFormula/DeleteIds',
  SYS_PA_FORMULA_TOGGLER_ACTIVE_IDS = '/api/SysPaFormula/ToggleActiveIds',
  SYS_PA_FORMULA_CHECK_VALID = '/api/SysPaFormula/CheckFormula',

  // SYS_CONFIGURATION_COMMON
  SYS_CONFIGURATION_COMMON_QUERY_LIST = '/api/SysConfigurationCommon/QueryList',
  SYS_CONFIGURATION_COMMON_CREATE = '/api/SysConfigurationCommon/Create',
  SYS_CONFIGURATION_COMMON_READ = '/api/SysConfigurationCommon/GetById',
  SYS_CONFIGURATION_COMMON_UPDATE = '/api/SysConfigurationCommon/Update',
  SYS_CONFIGURATION_COMMON_DELETE = '/api/SysConfigurationCommon/Delete',
  SYS_CONFIGURATION_COMMON_DELETE_IDS = '/api/SysConfigurationCommon/DeleteIds',

  //PA_SAL_IMPORT
  PA_SAL_IMPORT_QUERY_LIST = '/api/PaSalImport/QueryList',
  PA_SAL_IMPORT_EXPORT_TEMP = '/api/PaSalImport/ExportTempImportSalary',
  PA_SAL_IMPORT_IMPORT_TEMP = '/api/PaSalImport/ImportTempSalary',

  //PA_SAL_IMPORT_BACKDATE
  PA_SAL_IMPORT_BACKDATE_QUERY_LIST = '/api/PaSalImportBackdate/QueryList',
  PA_SAL_IMPORT_BACKDATE_EXPORT_TEMP = '/api/PaSalImportBackdate/ExportTempImportSalary',
  PA_SAL_IMPORT_IMPORT_BACKDATE_TEMP = '/api/PaSalImportBackdate/ImportTempSalary',
  PA_SAL_IMPORT_BACKDATE_LST_PERIOD = '/api/PaSalImportBackdate/GetListSalaryInYear',

  //PA_SAL_IMPORT_ADD
  PA_SAL_IMPORT_ADD_QUERY_LIST = '/api/PaSalImportAdd/QueryList',
  PA_SAL_IMPORT_ADD_GET_LIST_SALARIES_BY_ID = '/api/PaSalImportAdd/GetListSalaries?id=',
  PA_SAL_IMPORT_ADD_EXPORT_TEMP = '/api/PaSalImportAdd/ExportTempImportSalary',
  PA_SAL_IMPORT_ADD_IMPORT_TEMP = '/api/PaSalImportAdd/ImportTempSalary',
  PA_SAL_IMPORT_ADD_GET_OBJ_SAL = '/api/PaSalImportAdd/GetObjSalAdd',

  //PPA_TAX_ANNUAL_IMPORT
  PA_TAX_ANNUAL_IMPORT_QUERY_LIST = '/api/PaTaxAnnualImport/QueryList',
  PA_TAX_ANNUAL_IMPORT_GET_LIST_SAL_BY_ID = '/api/PaTaxAnnualImport/GetListSalaries?id=',
  PA_TAX_ANNUAL_EXPORT = '/api/PaTaxAnnualImport/ExportTemp',
  PA_TAX_ANNUAL_IMPORT = '/api/PaTaxAnnualImport/ImportTemp',
  PA_TAX_ANNUAL_IMPORT_GET_OBJ = '/api/PaTaxAnnualImport/GetObjSalTax',
  //thuế tháng
  PA_IMPORT_MONTHLY_TAX_QUERY_LIST = '/api/PaImportMonthlyTax/QueryList',
  PA_IMPORT_MONTHLY_TAX_EXPORT_TEMP = '/api/PaImportMonthlyTax/ExportTempImportTax',
  PA_IMPORT_MONTHLY_TAX_IMPORT_TEMP = '/api/PaImportMonthlyTax/ImportTempTax',
  PA_IMPORT_MONTHLY_TAX_GET_OBJ = '/api/PaImportMonthlyTax/GetObjSalTax',
  PA_IMPORT_TAX_MONTH_GET_TAX_DATE = '/api/PaImportMonthlyTax/GetTaxDate?periodId=',
  // PA_PAYROLLSHEET_SUM
  PA_PAYROLLSHEET_SUM_GET_DYNAMIC_NAME = '/api/PaPayrollsheetSum/GetDynamicName',
  PA_PAYROLLSHEET_SUM_GET_LIST = '/api/PaPayrollsheetSum/GetList',
  PA_PAYROLLSHEET_SUM_CHANGE_STATUS_PAROX = '/api/PaPayrollsheetSum/ChangeStatusParox',
  PA_PAYROLLSHEET_SUM_HANDLE_REQUEST = '/api/PaPayrollsheetSum/HandleRequest',
  PA_PAYROLLSHEET_SUM_CHECK_REQUEST = '/api/PaPayrollsheetSum/CheckRequest?id=',


  // DYNAMIC REPORT
  DYNAMIC_REPORT_GET_VIEW_LIST = '/api/HuDynamicReport/GetViewList',
  DYNAMIC_REPORT_GET_VIEW_LIST_DYNAMIC_FORM = '/api/HuDynamicReport/GetViewListDynamicForm?tableName=',
  GET_DYNAMIC_CONDITION_BY_DYNAMIC_REPORT_ID = '/api/HuDynamicCondition/GetDynamicConditionByViewId?viewId=',
  GET_DYNAMIC_REPORT_DLT_BY_DYNAMIC_REPORT_ID = '/api/HuDynamicReportDtl/GetAllByViewId?viewId=',
  GET_DYNAMIC_REPORT_CHILD_BY_FID = '/api/HuDynamicReport/GetAllByFid?fid=',
  GET_DYNAMIC_REPORT_DETAIL_TOTAL_BY_ID = '/api/HuDynamicReportDtl/GetDynamicDetailTotalById?id=',
  CREATE_DYNAMIC_REPORT = '/api/HuDynamicReport/Create',
  GET_COLUMN_LIST = '/api/HuDynamicReport/GetColumnList',
  GET_COLUMN_LIST_DYNAMIC_FORM = '/api/HuDynamicReport/GetColumnListDynamicForm',
  GET_ALL_REPORT_BY_VIEW_NAME = '/api/HuDynamicReport/ReadAllByViewName?viewName=',
  GET_LIST_BY_CONDITION_TO_EXPORT = '/api/HuDynamicReport/GetListByConditionToExport',
  EXPORT_EXEL_DYNAMIC_REPORT = '/api/HuDynamicReport/ExportExelDynamicReport',
  GET_DYNAMIC_BY_ID = '/api/HuDynamicReport/GetById?id=',
  DELETE_DYNAMIC_REPORT = '/api/HuDynamicReport/DeleteIds',
  GET_COLUMN_BY_TYPE_ID = '/api/HuMergeField/GetColumnListByTypeId?typeId=',
  GET_FILE_TEMPLATE_DYNAMIC_FORM = '/api/HuDynamicReport/GetFileTemplate',
  SEARCH_FOR_TABLE_LEFT_DYNAMIC_FORM = '/api/HuDynamicReport/SearchForTableLeftDynamicForm',
  SEARCH_FOR_TABLE_RIGHT_DYNAMIC_FORM = '/api/HuDynamicReport/SearchForTableRightDynamicForm',
  REPLACE_FILE_DYNAMIC_WITH_NAME = '/api/HuDynamicReport/ReplaceFileDynamicWithName',
  EXPORT_WORD_BY_TEMPLATE = '/api/HuDynamicReport/ExportWordByTemplate',
  GET_OTHER_LIST_DYNAMIC_FORM = '/api/HuDynamicReport/GetOtherListByTypeDynamicForm?typeCode=',

  //AT_OTHER_LIST
  AT_OTHER_LIST_QUERY_LIST = '/api/AtOtherList/QueryList',
  AT_OTHER_LIST_READ = '/api/AtOtherList/GetById',
  AT_OTHER_LIST_CREATE = '/api/AtOtherList/Create',
  AT_OTHER_LIST_UPDATE = '/api/AtOtherList/Update',
  AT_OTHER_LIST_DELETE_IDS = '/api/AtOtherList/DeleteIds',
  AT_OTHER_LIST_TOGGLER_ACTIVE_IDS = '/api/AtOtherList/ToggleActiveIds',

  //PA_CALCULATE_TAX_MONTH
  PA_CALCULATE_TAX_MONTH_GET_TAX_DATE = '/api/PaPayrollsheetTax/GetTaxDate',
  PA_CALCULATE_TAX_MONTH_GET_DYNAMIC_NAME = '/api/PaPayrollsheetTax/GetDynamicName',
  PA_CALCULATE_TAX_MONTH_GET_LIST = '/api/PaPayrollsheetTax/GetList',
  PA_CALCULATE_TAX_MONTH_CHANGE_STATUS_PAROX = '/api/PaPayrollsheetTax/ChangeStatusParox',
  PA_CALCULATE_TAX_MONTH_HANDLE_REQUEST = '/api/PaPayrollsheetTax/HandleRequest',
  PA_CALCULATE_TAX_MONTH_CHECK_REQUEST = '/api/PaPayrollsheetTax/CheckRequest?id=',
  PA_CALCULATE_TAX_MONTH_GET_MONTH = '/api/PaPayrollsheetTax/GetMonth',
  PA_CALCULATE_TAX_MONTH_GET_OBJ = '/api/PaPayrollsheetTax/GetObjSal',
  PA_CALCULATE_TAX_MONTH_CHANGE_STATUS_PAROX_TAX_MONTH = "/api/PaPayrollsheetTax/ChangeStatusParoxTaxMonth",

  // PA_PAYROLLSHEET_SUM_SUB
  PA_PAYROLLSHEET_SUM_SUB_GET_DYNAMIC_NAME = '/api/PaPayrollsheetSumSub/GetDynamicName',
  PA_PAYROLLSHEET_SUM_SUB_GET_LIST = '/api/PaPayrollsheetSumSub/GetList',
  PA_PAYROLLSHEET_SUM_SUB_CHANGE_STATUS_PAROX_SUB = '/api/PaPayrollsheetSumSub/ChangeStatusParoxSub',
  PA_PAYROLLSHEET_SUM_SUB_HANDLE_REQUEST = '/api/PaPayrollsheetSumSub/HandleRequest',
  PA_PAYROLLSHEET_SUM_SUB_CHECK_REQUEST = '/api/PaPayrollsheetSumSub/CheckRequest?id=',
  PA_PAYROLLSHEET_SUM_SUB_GET_PHASE_ADVANCE = '/api/PaPayrollsheetSumSub/GetPhaseAdvance',
  PA_PAYROLLSHEET_SUM_SUB_GET_PHASE_ADVANCE_BY_ID = '/api/PaPayrollsheetSumSub/GetPhaseAdvanceById',
  PA_PAYROLLSHEET_SUM_SUB_GET_OBJ_SALARY_SUB_GROUP = '/api/PaPayrollsheetSumSub/GetObjSalPayrollSubGroup',

  // PA_PAYROLLSHEET_SUM_BACKDATE
  PA_PAYROLLSHEET_SUM_BACKDATE_GET_DYNAMIC_NAME = '/api/PaPayrollsheetSumBackdate/GetDynamicName',
  PA_PAYROLLSHEET_SUM_BACKDATE_GET_LIST = '/api/PaPayrollsheetSumBackdate/GetList',
  PA_PAYROLLSHEET_SUM_BACKDATE_CHANGE_STATUS_PAROX_BACKDATE = '/api/PaPayrollsheetSumBackdate/ChangeStatusParoxBackdate',
  PA_PAYROLLSHEET_SUM_BACKDATE_HANDLE_REQUEST = '/api/PaPayrollsheetSumBackdate/HandleRequest',
  PA_PAYROLLSHEET_SUM_BACKDATE_CHECK_REQUEST = '/api/PaPayrollsheetSumBackdate/CheckRequest?id=',
  PA_PAYROLLSHEET_SUM_BACKDATE_GET_NEXT_PERIOD = '/api/PaPayrollsheetSumBackdate/GetNextPeriod?periodId=',
  PA_PAYROLLSHEET_SUM_BACKDATE_GET_LIST_IN_YEAR = '/api/PaPayrollsheetSumBackdate/GetListSalaryInYear',
  PA_PAYROLLSHEET_SUM_BACKDATE_GET_OBJ_SALARY_SUB_GROUP = '/api/PaPayrollsheetSumBackdate/GetObjSalPayrollBackdateGroup',


  // PA_PAYROLL_TAX_YEAR
  PA_PAYROLL_TAX_YEAR_GET_DYNAMIC_NAME = '/api/PaPayrollTaxYear/GetDynamicName',
  PA_PAYROLL_TAX_YEAR_GET_LIST = '/api/PaPayrollTaxYear/GetList',
  PA_PAYROLL_TAX_YEAR_HANDLE_REQUEST = '/api/PaPayrollTaxYear/HandleRequest',
  PA_PAYROLL_TAX_YEAR_CHECK_REQUEST = '/api/PaPayrollTaxYear/CheckRequest?id=',
  PA_PAYROLL_TAX_YEAR_GET_OBJ_SALARY_TAX_GROUP = '/api/PaPayrollTaxYear/GetObjSalTaxGroup',
  PA_PAYROLL_TAX_YEAR_LOCK = '/api/PaPayrollTaxYear/ChangeStatusParoxTaxYear',

  // HU_EMPLOYEE_CV_EDIT
  HU_EMPLOYEE_CV_EDIT_QUERY_LIST = '/api/HuEmployeeCvEdit/QueryList',
  HU_EMPLOYEE_CV_EDIT_GET_ALL_CV = '/api/ApproveHuEmployeeCvEdit/QueryListCvEdit',
  HU_EMPLOYEE_CV_EDIT_GET_ALL_CONTACT = '/api/ApproveHuEmployeeCvEdit/QueryListContactEdit',
  HU_EMPLOYEE_CV_EDIT_GET_ALL_ADDITIONAL_INFO = '/api/ApproveHuEmployeeCvEdit/QueryListAdditionalInfoEdit',
  HU_EMPLOYEE_CV_EDIT_GET_ALL_BANK_INFO = '/api/ApproveHuEmployeeCvEdit/QueryListBankInfoEdit',
  HU_EMPLOYEE_CV_EDIT_GET_ALL_EDUCATION = '/api/ApproveHuEmployeeCvEdit/QueryListEducationEdit',
  // HU_EMPLOYEE_CV_EDIT_GET_ALL_CV_EDIT = '/api/ApproveHuEmployeeCvEdit/GetAllCvEdit',
  HU_EMPLOYEE_CV_EDIT_APPROVED_CV = '/api/ApproveHuEmployeeCvEdit/ApproveCvEdit',
  HU_EMPLOYEE_CV_EDIT_APPROVED_CONTACT = '/api/ApproveHuEmployeeCvEdit/ApproveContactEdit',
  HU_EMPLOYEE_CV_EDIT_UNAPPROVED_CONTACT = '/api/ApproveHuEmployeeCvEdit/ApproveContactEdit',
  HU_EMPLOYEE_CV_EDIT_APPROVED_ADDINATIONAL_INFO = '/api/ApproveHuEmployeeCvEdit/ApproveAdditionalEdit',
  HU_EMPLOYEE_CV_EDIT_APPROVED_BANK_INFO = '/api/ApproveHuEmployeeCvEdit/ApproveBankInfoEdit',
  HU_EMPLOYEE_CV_EDIT_APPROVED_EDUCATION = '/api/ApproveHuEmployeeCvEdit/ApproveEducationEdit',
  HU_EMPLOYEE_CV_GENERAL_INFO_UPDATE2 = '/api/HuEmployeeCv/UpdateGeneralInfo2',

  // DASHBOARD DATA
  HU_EMPLOYEE_CV_DASHBOARD_GENDER = '/api/HuEmployeeCv/GetGenderDashboard',
  HU_CONTRACT_TYPE_DASHBOARD_CONTRACT = '/api/HuContractType/GetContractDashboard',
  HU_CONTRACT_DASHBOARD_INSCHANGE = '/api/InsChange/GetInschangeDashboard',
  HU_CONTRACT_DASHBOARD_EMP_MONTH = '/api/HuEmployeeCv/GetEmpMonthDashboard ',
  HU_CONTRACT_DASHBOARD_NEW_EMP_MONTH = '/api/HuEmployeeCv/GetNewEmpMonthDashboard ',
  HU_CONTRACT_DASHBOARD_EMP_SENIORITY = '/api/HuEmployeeCv/GetEmpSeniorityDashboard',
  HU_CONTRACT_DASHBOARD_EMP_GETNATIVEINFOMATIONDASHBOARD = '/api/HuEmployeeCv/GetNativeInfomationDashboard',
  HU_CONTRACT_DASHBOARD_EMP_GETMEMBERINFOMATIONDASHBOARD = '/api/HuEmployeeCv/GetIsMemberInfomationDashboard',
  HU_CONTRACT_DASHBOARD_EMP_GETJOBINFOMATIONDASHBOARD = '/api/HuEmployeeCv/GetJobInfomationDashboard',
  HU_CONTRACT_DASHBOARD_EMP_GETPOSITIONINFOMATIONDASHBOARD = '/api/HuEmployeeCv/GetPositionInfomationDashboard',
  HU_CONTRACT_DASHBOARD_EMP_GETLEVELINFOMATIONDASHBOARD = '/api/HuEmployeeCv/GetLevelInfomationDashboard',
  HU_CONTRACT_DASHBOARD_EMP_GETWORKINGAGEINFOMATIONDASHBOARD = '/api/HuEmployeeCv/GetWorkingAgeInfomationDashboard',
  HU_CONTRACT_DASHBOARD_EMP_GETNAMEORGDASHBOARD = '/api/HuEmployeeCv/GetNameOrgDashboard',

  // XLSX_REPORT
  XLSX_REPORT_GET_LIST_REPORT = '/api/XlsxReport/GetListReport',
  XLSX_REPORT_GET_REPORT = '/api/XlsxReport/GetReport',

  // TR_REQUEST_YEAR
  TR_REQUEST_YEAR_QUERY_LIST = '/api/TrRequestYear/QueryList',
  TR_REQUEST_YEAR_READ = '/api/TrRequestYear/GetById',
  TR_REQUEST_YEAR_CREATE = '/api/TrRequestYear/Create',
  TR_REQUEST_YEAR_UPDATE = '/api/TrRequestYear/Update',
  TR_REQUEST_YEAR_DELETE = '/api/TrRequestYear/Delete',
  TR_REQUEST_YEAR_DELETE_IDS = '/api/TrRequestYear/DeleteIds',
  TR_REQUEST_YEAR_LIST_TRAINING_COURSE = '/api/TrRequestYear/GetDropDownListTrainingCourse',
  TR_REQUEST_YEAR_LIST_COMPANY = '/api/TrRequestYear/GetDropDownListCompany',

  // HU_CERTIFICATE_EDIT
  HU_CERTIFICATE_EDIT_QUERY_LIST = '/api/HuCertificateEdit/QueryList',
  HU_CERTIFICATE_EDIT_DELETE_IDS = '/api/HuCertificateEdit/DeleteIds',
  HU_CERTIFICATE_EDIT_APPROVE_RECORDS = '/api/HuCertificateEdit/ApproveHuCertificateEdit',
  HU_CERTIFICATE_EDIT_READ = '/api/HuCertificateEdit/GetByIdWebApp',
  HU_CERTIFICATE_EDIT_UPDATE = '/api/HuCertificateEdit/Update',
  HU_CERTIFICATE_EDIT_STATUS_APPROVE = '/api/HuCertificateEdit/GetListNameOfApproveById',
  HU_CERTIFICATE_EDIT_UNAPPROVE_RECORDS = '/api/HuCertificateEdit/UnapproveHuCertificateEdit',

  // APPROVE_WORKING_COMPANY
  APPROVE_WORKING_COMPANY_QUERY_LIST = "/api/PortalApproveWorkingCompany/GetAllRecord",
  APPROVE_WORKING_COMPANY_APPROVED_HU_WORKING = '/api/PortalApproveWorkingCompany/ApproveHuWorking',
  APPROVE_WORKING_COMPANY_UNAPPROVED_HU_WORKING = '/api/PortalApproveWorkingCompany/UnapproveHuWorking',

  // PA_AUTHORITY_TAX_YEAR
  PA_AUTHORITY_TAX_YEAR_QUERY_LIST = '/api/PaAuthorityTaxYear/QueryList',
  PA_AUTHORITY_TAX_YEAR_READ = '/api/PaAuthorityTaxYear/GetById',
  PA_AUTHORITY_TAX_YEAR_CREATE = '/api/PaAuthorityTaxYear/Create',
  PA_AUTHORITY_TAX_YEAR_UPDATE = '/api/PaAuthorityTaxYear/Update',
  PA_AUTHORITY_TAX_YEAR_DELETE_IDS = '/api/PaAuthorityTaxYear/DeleteIds',


  //IMPORT WELFAREMNG
  XLSX_HU_WELFARE_MNG_IMPORT_QUERY_LIST = '/api/HuWelfareMngImport/QueryList',
  XLSX_HU_WELFARE_MNG_IMPORT_SAVE = '/api/HuWelfareMngImport/Save',
  XLSX_HU_CERTIFICATE_IMPORT_QUERY_LIST = '/api/HuCertificateImport/QueryList',
  XLSX_HU_CERTIFICATE_IMPORT_SAVE = '/api/HuCertificateImport/Save',


  // INS_INFORMATION_IMPORT
  XLSX_INS_INFORMATION_IMPORT_QUERY_LIST = '/api/InsInformationImport/QueryList',
  XLSX_INS_INFORMATION_IMPORT_SAVE = '/api/InsInformationImport/Save',

  // HU_WORKING_HSL_PC_IMPORT
  XLSX_HU_WORKING_HSL_PC_IMPORT_QUERY_LIST = '/api/HuWorkingHslPcImport/QueryList',
  XLSX_HU_WORKING_HSL_PC_IMPORT_SAVE = '/api/HuWorkingHslPcImport/Save',

  //SE_DOCUMENT
  SE_DOCUMENT_QUERY_LIST = '/api/SeDocument/QueryList',
  SE_DOCUMENT_READ = '/api/SeDocument/GetById',
  SE_DOCUMENT_CREATE = '/api/SeDocument/Create',
  SE_DOCUMENT_UPDATE = '/api/SeDocument/Update',
  SE_DOCUMENT_DELETE_IDS = '/api/SeDocument/DeleteIds',
  SE_DOCUMENT_TOGGLER_ACTIVE_IDS = '/api/SeDocument/ToggleActiveIds',
  SE_DOCUMENT_GETCODE = '/api/SeDocument/GetCode',

  //SE_DOCUMENT_INFO
  SE_DOCUMENT_INFO_QUERY_LIST = '/api/SeDocumentInfo/QueryList',
  SE_DOCUMENT_INFO_READ = '/api/SeDocumentInfo/GetById',
  SE_DOCUMENT_INFO_GETBYID = '/api/SeDocumentInfo/GetIdEmp',
  SE_DOCUMENT_INFO_CREATE = '/api/SeDocumentInfo/Create',
  SE_DOCUMENT_INFO_GET_BY_EMP = '/api/SeDocumentInfo/GetByIdEmp',
  SE_DOCUMENT_INFO_UPDATE = '/api/SeDocumentInfo/Update',
  SE_DOCUMENT_INFO_DELETE_IDS = '/api/SeDocumentInfo/DeleteIds',

  //DashBoard General Information
  DASHBOARD_GENERAL_INFORMATION = '/api/HuEmployeeCv/GetGeneralInfomationDashboard',
  SE_DOCUMENT_INFO_QUERY_LIST_DOCUMENT = '/api/SeDocumentInfo/GetListDocument',

  // HU_FAMILY_IMPORT
  XLSX_HU_FAMILY_IMPORT_QUERY_LIST = '/api/HuFamilyImport/QueryList',
  XLSX_HU_FAMILY_IMPORT_SAVE = '/api/HuFamilyImport/Save',

  // INS_LIST_PROGRAM
  INS_LIST_PROGRAM_QUERY_LIST = '/api/InsListProgram/QueryList',
  INS_LIST_PROGRAM_READ = '/api/InsListProgram/GetById',
  INS_LIST_PROGRAM_CREATE = '/api/InsListProgram/Create',
  INS_LIST_PROGRAM_UPDATE = '/api/InsListProgram/Update',
  INS_LIST_PROGRAM_DELETE_IDS = '/api/InsListProgram/DeleteIds',
  INS_LIST_PROGRAM_DELETE = '/api/InsListProgram/Delete',
  INS_LIST_PROGRAM_TOGGLE_ACTIVE_IDS = '/api/InsListProgram/ToggleActiveIds',

  // INS_HEALTH_INSURANCE
  INS_HEALTH_INSURANCE_QUERY_LIST = '/api/InsHealthInsurance/QueryList',
  INS_HEALTH_INSURANCE_READ = '/api/InsHealthInsurance/GetById',
  INS_HEALTH_INSURANCE_CREATE = '/api/InsHealthInsurance/Create',
  INS_HEALTH_INSURANCE_UPDATE = '/api/InsHealthInsurance/Update',
  INS_HEALTH_INSURANCE_DELETE_IDS = '/api/InsHealthInsurance/DeleteIds',
  INS_HEALTH_INSURANCE_DELETE = '/api/InsHealthInsurance/Delete',
  INS_HEALTH_INSURANCE_TOGGLE_ACTIVE_IDS = '/api/InsHealthInsurance/ToggleActiveIds',

  // RC_EXAMS
  RC_EXAMS_QUERY_LIST = '/api/RcExams/QueryList',
  RC_EXAMS_READ = '/api/RcExams/GetById',
  RC_EXAMS_CREATE = '/api/RcExams/Create',
  RC_EXAMS_UPDATE = '/api/RcExams/Update',
  RC_EXAMS_DELETE = '/api/RcExams/Delete',
  RC_EXAMS_DELETE_IDS = '/api/RcExams/DeleteIds',

  // PE_EMPLOYEE_ASSESSMENT
  PE_EMPLOYEE_ASSESSMENT_QUERY_LIST = '/api/PeEmployeeAssessment/QueryList',
  PE_EMPLOYEE_ASSESSMENT_READ = '/api/PeEmployeeAssessment/GetById',
  PE_EMPLOYEE_ASSESSMENT_CREATE = '/api/PeEmployeeAssessment/Create',
  PE_EMPLOYEE_ASSESSMENT_UPDATE = '/api/PeEmployeeAssessment/Update',
  PE_EMPLOYEE_ASSESSMENT_DELETE = '/api/PeEmployeeAssessment/Delete',
  PE_EMPLOYEE_ASSESSMENT_DELETE_IDS = '/api/PeEmployeeAssessment/DeleteIds',
  PE_EMPLOYEE_ASSESSMENT_QUERY_LIST_SCREEN_LEFT = '/api/UnassignedEmployee/QueryList',

  // PE_CAPACITY_FRAMEWORK
  PE_CAPACITY_FRAMEWORK_QUERY_LIST = '/api/PeCapacityFramework/QueryList',
  PE_CAPACITY_FRAMEWORK_READ = '/api/PeCapacityFramework/GetById',
  PE_CAPACITY_FRAMEWORK_CREATE = '/api/PeCapacityFramework/Create',
  PE_CAPACITY_FRAMEWORK_UPDATE = '/api/PeCapacityFramework/Update',
  PE_CAPACITY_FRAMEWORK_DELETE = '/api/PeCapacityFramework/Delete',
  PE_CAPACITY_FRAMEWORK_DELETE_IDS = '/api/PeCapacityFramework/DeleteIds',
  PE_CAPACITY_FRAMEWORK_TOGGLER_ACTIVE_IDS = '/api/PeCapacityFramework/ToggleActiveIds',

  // AS_PROJECT
  AS_PROJECT_QUERY_LIST = '/api/AsProject/QueryList',
  AS_PROJECT_READ = '/api/AsProject/GetById',
  AS_PROJECT_CREATE = '/api/AsProject/Create',
  AS_PROJECT_UPDATE = '/api/AsProject/Update',
  AS_PROJECT_DELETE = '/api/AsProject/Delete',
  AS_PROJECT_DELETE_IDS = '/api/AsProject/DeleteIds',
  AS_PROJECT_TOGGLER_ACTIVE_IDS = '/api/AsProject/ToggleActiveIds',

  //INS_LIST_CONTRACT
  INS_LIST_CONTRACT_QUERY_LIST = '/api/InsListContract/QueryList',
  INS_LIST_CONTRACT_READ = '/api/InsListContract/GetById',
  INS_LIST_CONTRACT_CREATE = '/api/InsListContract/Create',
  INS_LIST_CONTRACT_UPDATE = '/api/InsListContract/Update',
  INS_LIST_CONTRACT_DELETE = '/api/InsListContract/Delete',
  INS_LIST_CONTRACT_DELETE_IDS = '/api/InsListContract/DeleteIds',
  INS_LIST_CONTRACT_GET_LIST_BY_YEAR = '/api/InsListContract/GetInsListContract?year=',

  //AT_SETUP_WIFI
  AT_SETUP_WIFI_QUERY_LIST = '/api/AtSetupWifi/QueryList',
  AT_SETUP_WIFI_READ = '/api/AtSetupWifi/GetById',
  AT_SETUP_WIFI_CREATE = '/api/AtSetupWifi/Create',
  AT_SETUP_WIFI_UPDATE = '/api/AtSetupWifi/Update',
  AT_SETUP_WIFI_DELETE = '/api/AtSetupWifi/Delete',
  AT_SETUP_WIFI_DELETE_IDS = '/api/AtSetupWifi/DeleteIds',
  AT_SETUP_WIFI_TOGGLE_ACTIVE_IDS = '/api/AtSetupWifi/ToggleActiveIds',

  //AT_SETUP_GPS
  AT_SETUP_GPS_QUERY_LIST = '/api/AtSetupGps/QueryList',
  AT_SETUP_GPS_READ = '/api/AtSetupGps/GetById',
  AT_SETUP_GPS_CREATE = '/api/AtSetupGps/Create',
  AT_SETUP_GPS_UPDATE = '/api/AtSetupGps/Update',
  AT_SETUP_GPS_DELETE = '/api/AtSetupGps/Delete',
  AT_SETUP_GPS_DELETE_IDS = '/api/AtSetupGps/DeleteIds',
  AT_SETUP_GPS_TOGGLE_ACTIVE_IDS = '/api/AtSetupGps/ToggleActiveIds',

  // RC_REQUEST
  RC_REQUEST_QUERY_LIST = '/api/RcRequest/QueryList',
  RC_REQUEST_READ = '/api/RcRequest/GetById',
  RC_REQUEST_CREATE = '/api/RcRequest/Create',
  RC_REQUEST_UPDATE = '/api/RcRequest/Update',
  RC_REQUEST_DELETE = '/api/RcRequest/Delete',
  RC_REQUEST_DELETE_IDS = '/api/RcRequest/DeleteIds',
  RC_REQUEST_READ_WORK_ADDRESS = '/api/RcRequest/ReadWorkAddress',

  // HU_BLACKLIST
  HU_BLACKLIST_QUERY_LIST = '/api/HuBlacklist/QueryList',
  HU_BLACKLIST_READ = '/api/HuBlacklist/GetById',
  HU_BLACKLIST_CREATE = '/api/HuBlacklist/Create',
  HU_BLACKLIST_UPDATE = '/api/HuBlacklist/Update',
  HU_BLACKLIST_DELETE = '/api/HuBlacklist/Delete',
  HU_BLACKLIST_DELETE_IDS = '/api/HuBlacklist/DeleteIds',

  // RC_YEAR_PLANING
  RC_YEAR_PLANING_QUERY_LIST = '/api/RcHrYearPlaning/QueryList',
  RC_YEAR_PLANING_READ = '/api/RcHrYearPlaning/GetById',
  RC_YEAR_PLANING_CREATE = '/api/RcHrYearPlaning/Create',
  RC_YEAR_PLANING_UPDATE = '/api/RcHrYearPlaning/Update',
  RC_YEAR_PLANING_DELETE = '/api/RcHrYearPlaning/Delete',
  RC_YEAR_PLANING_DELETE_IDS = '/api/RcHrYearPlaning/DeleteIds',
  RC_YEAR_PLANING_GETYEAR = '/api/RcHrYearPlaning/GetYear',
  RC_YEAR_PLANING_GET_ALL = '/api/RcHrYearPlaning/GetAllPlaning',

  // RC_PLANING_DETAIL
  RC_PLANING_DETAIL_QUERY_LIST = '/api/RcHrPlaningDetail/QueryList',
  RC_PLANING_DETAIL_READ = '/api/RcHrPlaningDetail/GetById',
  RC_PLANING_DETAIL_CREATE = '/api/RcHrPlaningDetail/Create',
  RC_PLANING_DETAIL_UPDATE = '/api/RcHrPlaningDetail/Update',
  RC_PLANING_DETAIL_DELETE = '/api/RcHrPlaningDetail/Delete',
  RC_PLANING_DETAIL_DELETE_IDS = '/api/RcHrPlaningDetail/DeleteIds',
  RC_PLANING_DETAIL_GET_ALL_POSITION_BY_ORGS = '/api/RcHrPlaningDetail/GetAllPositionByOrgs',

  // SE_CONFIG
  SE_CONFIG_QUERY_LIST = '/api/SeConfig/QueryList',
  SE_CONFIG_READ = '/api/SeConfig/GetById',
  SE_CONFIG_CREATE = '/api/SeConfig/Create',
  SE_CONFIG_UPDATE = '/api/SeConfig/Update',
  SE_CONFIG_DELETE_IDS = '/api/SeConfig/DeleteIds',
  SE_CONFIG_DELETE = '/api/SeConfig/Delete',
  SE_CONFIG_TOGGLE_ACTIVE_IDS = '/api/SeConfig/ToggleActiveIds',

  // AT_TIME_WORK_STANDARD
  AT_TIME_WORK_STANDARD_QUERY_LIST = '/api/AtTimeWorkStandard/QueryList',
  AT_TIME_WORK_STANDARD_READ = '/api/AtTimeWorkStandard/GetById',
  AT_TIME_WORK_STANDARD_CREATE = '/api/AtTimeWorkStandard/Create',
  AT_TIME_WORK_STANDARD_UPDATE = '/api/AtTimeWorkStandard/Update',
  AT_TIME_WORK_STANDARD_DELETE = '/api/AtTimeWorkStandard/Delete',
  AT_TIME_WORK_STANDARD_DELETE_IDS = '/api/AtTimeWorkStandard/DeleteIds',

  // INS_MATERNITY_MNG
  INS_MATERNITY_MNG_QUERY_LIST = '/api/InsMaternityMng/QueryList',
  INS_MATERNITY_MNG_READ = '/api/InsMaternityMng/GetById',
  INS_MATERNITY_MNG_CREATE = '/api/InsMaternityMng/Create',
  INS_MATERNITY_MNG_UPDATE = '/api/InsMaternityMng/Update',
  INS_MATERNITY_MNG_DELETE_IDS = '/api/InsMaternityMng/DeleteIds',
  INS_MATERNITY_MNG_DELETE = '/api/InsMaternityMng/Delete',
  INS_MATERNITY_MNG_TOGGLE_ACTIVE_IDS = '/api/InsMaternityMng/ToggleActiveIds',

  // TR_LECTURE
  TR_LECTURE_QUERY_LIST = '/api/TrLecture/QueryList',
  TR_LECTURE_READ = '/api/TrLecture/GetById',
  TR_LECTURE_CREATE = '/api/TrLecture/Create',
  TR_LECTURE_UPDATE = '/api/TrLecture/Update',
  TR_LECTURE_DELETE = '/api/TrLecture/Delete',
  TR_LECTURE_DELETE_IDS = '/api/TrLecture/DeleteIds',
  GET_BY_ID_TR_CENTER = "/api/TrLecture/GetByIdTrCenter",
  TR_LECTURE_GET_LIST_TEACHER_BY_CENTER = '/api/TrLecture/GetListTeacherByCenter',

  // TR_ASSESSMENT_RESULT
  TR_ASSESSMENT_RESULT_QUERY_LIST = '/api/TrAssessmentResult/QueryList',
  TR_ASSESSMENT_RESULT_READ = '/api/TrAssessmentResult/GetById',
  TR_ASSESSMENT_RESULT_CREATE = '/api/TrAssessmentResult/Create',
  TR_ASSESSMENT_RESULT_UPDATE = '/api/TrAssessmentResult/Update',
  TR_ASSESSMENT_RESULT_DELETE = '/api/TrAssessmentResult/Delete',
  TR_ASSESSMENT_RESULT_DELETE_IDS = '/api/TrAssessmentResult/DeleteIds',

  // TR_RESULT_EVALUATION
  TR_RESULT_EVALUATION_QUERY_LIST = '/api/TrResultEvaluation/QueryList',
  TR_RESULT_EVALUATION_READ = '/api/TrResultEvaluation/GetById',
  TR_RESULT_EVALUATION_CREATE = '/api/TrResultEvaluation/Create',
  TR_RESULT_EVALUATION_UPDATE = '/api/TrResultEvaluation/Update',
  TR_RESULT_EVALUATION_DELETE = '/api/TrResultEvaluation/Delete',
  TR_RESULT_EVALUATION_DELETE_IDS = '/api/TrResultEvaluation/DeleteIds',
  TR_RESULT_EVALUATION_QUERY_LIST_FOR_EMPLOYEE = '/api/TrResultEvaluation/QueryListForEmployee',

  // TR_PROGRAM_COMMIT
  TR_PROGRAM_COMMIT_QUERY_LIST = '/api/TrProgramCommit/QueryList',
  TR_PROGRAM_COMMIT_READ = '/api/TrProgramCommit/GetById',
  TR_PROGRAM_COMMIT_CREATE = '/api/TrProgramCommit/Create',
  TR_PROGRAM_COMMIT_UPDATE = '/api/TrProgramCommit/Update',
  TR_PROGRAM_COMMIT_DELETE = '/api/TrProgramCommit/Delete',
  TR_PROGRAM_COMMIT_DELETE_IDS = '/api/TrProgramCommit/DeleteIds',

  // HU_COM_EMPLOYEE_MNG
  HU_COM_EMPLOYEE_MNG_QUERY_LIST = '/api/HuComEmployeeMng/QueryList',
  HU_COM_EMPLOYEE_MNG_READ = '/api/HuComEmployeeMng/GetById',
  HU_COM_EMPLOYEE_MNG_CREATE = '/api/HuComEmployeeMng/Create',
  HU_COM_EMPLOYEE_MNG_UPDATE = '/api/HuComEmployeeMng/Update',
  HU_COM_EMPLOYEE_MNG_DELETE = '/api/HuComEmployeeMng/Delete',
  HU_COM_EMPLOYEE_MNG_DELETE_IDS = '/api/HuComEmployeeMng/DeleteIds',

  // TR_CRITERIA
  TR_CRITERIA_QUERY_LIST = '/api/TrCriteria/QueryList',
  TR_CRITERIA_READ = '/api/TrCriteria/GetById',
  TR_CRITERIA_CREATE = '/api/TrCriteria/Create',
  TR_CRITERIA_UPDATE = '/api/TrCriteria/Update',
  TR_CRITERIA_DELETE_IDS = '/api/TrCriteria/DeleteIds',
  TR_CRITERIA_DELETE = '/api/TrCriteria/Delete',
  TR_CRITERIA_TOGGLE_ACTIVE_IDS = '/api/TrCriteria/ToggleActiveIds',
  TR_CRITERIA_GET_LIST_CRITERIA = '/api/TrCriteria/GetListCriteria',

  // TR_CLASSIFICATION
  TR_CLASSIFICATION_QUERY_LIST = '/api/TrClassification/QueryList',
  TR_CLASSIFICATION_READ = '/api/TrClassification/GetById',
  TR_CLASSIFICATION_CREATE = '/api/TrClassification/Create',
  TR_CLASSIFICATION_UPDATE = '/api/TrClassification/Update',
  TR_CLASSIFICATION_DELETE_IDS = '/api/TrClassification/DeleteIds',
  TR_CLASSIFICATION_DELETE = '/api/TrClassification/Delete',
  TR_CLASSIFICATION_TOGGLE_ACTIVE_IDS = '/api/TrClassification/ToggleActiveIds',

  //RC_CANDIDATE
  RC_CANDIDATE_QUERY_LIST = '/api/RcCandidate/QueryList',
  RC_CANDIDATE_READ = '/api/RcCandidate/GetById',
  RC_CANDIDATE_CREATE = '/api/RcCandidate/Create',
  RC_CANDIDATE_INSERT_PROFILE_RECRUIMENT = '/api/RcCandidate/InsertProfileCANDIDATE',
  RC_CANDIDATE_UPDATE = '/api/RcCandidate/Update',
  RC_CANDIDATE_DELETE = '/api/RcCandidate/Delete',
  RC_CANDIDATE_DELETE_IDS = '/api/RcCandidate/DeleteIds',
  RC_CANDIDATE_GET_LIST_POS = '/api/RcCandidate/GetListPos',

  //RC_CANDIDATE_CV
  RC_CANDIDATE_CV_QUERY_LIST = '/api/RcCandidateCv/QueryList',
  RC_CANDIDATE_CV_READ = '/api/RcCandidateCv/GetById',
  RC_CANDIDATE_CV_CREATE = '/api/RcCandidateCv/Create',
  RC_CANDIDATE_CV_INSERT_PROFILE_RECRUIMENT = '/api/RcCandidateCv/InsertProfileCANDIDATE',
  RC_CANDIDATE_CV_UPDATE = '/api/RcCandidateCv/Update',
  RC_CANDIDATE_CV_DELETE = '/api/RcCandidateCv/Delete',
  RC_CANDIDATE_CV_DELETE_IDS = '/api/RcCandidateCv/DeleteIds',
  RC_CANDIDATE_CV_GET_LIST_POS = '/api/RcCandidateCv/GetListPos',
  RC_CANDIDATE_UPDATE_AVATAR_EMPLOYEE = '/api/RcCandidateCv/UpdateAvatar',

  RC_CANDIDATE_CV_GET_CV = '/api/RcCandidateCv/GetCv?employeeCvId=',
  RC_CANDIDATE_CV_GET_CV_BY_ID = '/api/RcCandidateCv/GetCvById',
  RC_CANDIDATE_CV_UPDATE_CV = '/api/RcCandidateCv/UpdateCv',

  RC_CANDIDATE_CV_GET_LEVEL_INFO = '/api/RcCandidateCv/GetLevelInfo?employeeCvId=',
  RC_CANDIDATE_CV_GET_LEVEL_INFO_BY_ID = '/api/RcCandidateCv/GetLevelInfoById',
  RC_CANDIDATE_CV_UPDATE_LEVEL_INFO = '/api/RcCandidateCv/UpdateLevelInfo',

  RC_CANDIDATE_CV_GET_WISH = '/api/RcCandidateCv/GetWish?employeeCvId=',
  RC_CANDIDATE_CV_GET_WISH_BY_ID = '/api/RcCandidateCv/GetWishById',
  RC_CANDIDATE_CV_UPDATE_WISH = '/api/RcCandidateCv/UpdateWish',

  RC_CANDIDATE_CV_GET_INFO_OTHER = '/api/RcCandidateCv/GetInfoOther?employeeCvId=',
  RC_CANDIDATE_CV_GET_INFO_OTHER_BY_ID = '/api/RcCandidateCv/GetInfoOtherById',
  RC_CANDIDATE_CV_UPDATE_INFO_OTHER = '/api/RcCandidateCv/UpdateInfoOther',

  // TR_SETTING_CRI_COURSE
  TR_SETTING_CRI_COURSE_QUERY_LIST = '/api/TrSettingCriCourse/QueryList',
  TR_SETTING_CRI_COURSE_READ = '/api/TrSettingCriCourse/GetById',
  TR_SETTING_CRI_COURSE_CREATE = '/api/TrSettingCriCourse/Create',
  TR_SETTING_CRI_COURSE_UPDATE = '/api/TrSettingCriCourse/Update',
  TR_SETTING_CRI_COURSE_DELETE_IDS = '/api/TrSettingCriCourse/DeleteIds',
  TR_SETTING_CRI_COURSE_DELETE = '/api/TrSettingCriCourse/Delete',
  TR_SETTING_CRI_COURSE_TOGGLE_ACTIVE_IDS = '/api/TrSettingCriCourse/ToggleActiveIds',

  // TR_TRANNING_RECORD
  TR_TRANNING_RECORD_QUERY_LIST = '/api/TrTranningRecord/QueryList',
  TR_TRANNING_RECORD_READ = '/api/TrTranningRecord/GetById',
  TR_TRANNING_RECORD_CREATE = '/api/TrTranningRecord/Create',
  TR_TRANNING_RECORD_UPDATE = '/api/TrTranningRecord/Update',
  TR_TRANNING_RECORD_DELETE = '/api/TrTranningRecord/Delete',
  TR_TRANNING_RECORD_DELETE_IDS = '/api/TrTranningRecord/DeleteIds',

  // TR_PROGRAM
  TR_PROGRAM_QUERY_LIST = '/api/TrProgram/QueryList',
  TR_PROGRAM_READ = '/api/TrProgram/GetById',
  TR_PROGRAM_CREATE = '/api/TrProgram/Create',
  TR_PROGRAM_UPDATE = '/api/TrProgram/Update',
  TR_PROGRAM_DELETE_IDS = '/api/TrProgram/DeleteIds',
  TR_PROGRAM_DELETE = '/api/TrProgram/Delete',
  TR_PROGRAM_TOGGLE_ACTIVE_IDS = '/api/TrProgram/ToggleActiveIds',
  TR_PROGRAM_GET_LIST_PROGRAM = '/api/TrProgram/GetListProgram',

  // TR_REQUEST
  TR_REQUEST_QUERY_LIST = '/api/TrRequest/QueryList',
  TR_REQUEST_READ = '/api/TrRequest/GetById',
  TR_REQUEST_CREATE = '/api/TrRequest/Create',
  TR_REQUEST_UPDATE = '/api/TrRequest/Update',
  TR_REQUEST_DELETE_IDS = '/api/TrRequest/DeleteIds',
  TR_REQUEST_DELETE = '/api/TrRequest/Delete',
  TR_REQUEST_TOGGLE_ACTIVE_IDS = '/api/TrRequest/ToggleActiveIds',

  // INS_TOTALSALARY
  INS_TOTALSALARY_QUERY_LIST = '/api/InsTotalsalary/QueryList',
  INS_TOTALSALARY_READ = '/api/InsTotalsalary/GetById',
  INS_TOTALSALARY_CREATE = '/api/InsTotalsalary/Create',
  INS_TOTALSALARY_UPDATE = '/api/InsTotalsalary/Update',
  INS_TOTALSALARY_DELETE_IDS = '/api/InsTotalsalary/DeleteIds',
  INS_TOTALSALARY_DELETE = '/api/InsTotalsalary/Delete',
  INS_TOTALSALARY_CALCULATE = '/api/InsTotalsalary/Calculate',

  // TR_REIBURSEMENT
  TR_REIMBURSEMENT_QUERY_LIST = '/api/TrReimbursement/QueryList',
  TR_REIMBURSEMENT_GET_LIST_PROGRAM = '/api/TrReimbursement/GetListProgram',


  //SYS_MAIL_TEMPLATE
  SYS_MAIL_TEMPLATE_QUERY_LIST = '/api/SysMailTemplate/QueryList',

  SYS_MAIL_TEMPLATE_CREATE = '/api/SysMailTemplate/Create',
  SYS_MAIL_TEMPLATE_READ = '/api/SysMailTemplate/GetById',
  SYS_MAIL_TEMPLATE_UPDATE = '/api/SysMailTemplate/Update',
  SYS_MAIL_TEMPLATE_DELETE_IDS = '/api/SysMailTemplate/DeleteIds',

  // TR_PREPARE
  TR_PREPARE_QUERY_LIST = '/api/TrPrepare/QueryList',
  TR_PREPARE_READ = '/api/TrPrepare/GetById',
  TR_PREPARE_CREATE = '/api/TrPrepare/Create',
  TR_PREPARE_UPDATE = '/api/TrPrepare/Update',
  TR_PREPARE_DELETE_IDS = '/api/TrPrepare/DeleteIds',
  TR_PREPARE_DELETE = '/api/TrPrepare/Delete',
  TR_PREPARE_TOGGLE_ACTIVE_IDS = '/api/TrPrepare/ToggleActiveIds',

  // TR_CLASS
  TR_CLASS_QUERY_LIST = '/api/TrClass/QueryList',
  TR_CLASS_READ = '/api/TrClass/GetById',
  TR_CLASS_CREATE = '/api/TrClass/Create',
  TR_CLASS_UPDATE = '/api/TrClass/Update',
  TR_CLASS_DELETE_IDS = '/api/TrClass/DeleteIds',
  TR_CLASS_DELETE = '/api/TrClass/Delete',
  TR_CLASS_TOGGLE_ACTIVE_IDS = '/api/TrClass/ToggleActiveIds',

  // TR_PREPARE
  TR_PROGRAM_RESULT_QUERY_LIST = '/api/TrProgramResult/QueryList',
  TR_PROGRAM_RESULT_READ = '/api/TrProgramResult/GetById',
  TR_PROGRAM_RESULT_CREATE = '/api/TrProgramResult/Create',
  TR_PROGRAM_RESULT_UPDATE = '/api/TrProgramResult/Update',
  TR_PROGRAM_RESULT_DELETE_IDS = '/api/TrProgramResult/DeleteIds',
  TR_PROGRAM_RESULT_DELETE = '/api/TrProgramResult/Delete',
  TR_PROGRAM_RESULT_TOGGLE_ACTIVE_IDS = '/api/TrProgramResult/ToggleActiveIds',

  // HU_COM_CASSIFICATION
  HU_COM_CASSIFICATION_QUERY_LIST = '/api/HuComClassification/QueryList',
  HU_COM_CASSIFICATION_READ = '/api/HuComClassification/GetById',
  HU_COM_CASSIFICATION_CREATE = '/api/HuComClassification/Create',
  HU_COM_CASSIFICATION_UPDATE = '/api/HuComClassification/Update',
  HU_COM_CASSIFICATION_DELETE_IDS = '/api/HuComClassification/DeleteIds',
  HU_COM_CASSIFICATION_DELETE = '/api/HuComClassification/Delete',

  //HU_COMPETENCY_PEROID
  HU_COMPETENCY_PERIOD_QUERY_LIST = '/api/HuCompetencyPeriod/QueryList',
  HU_COMPETENCY_PERIOD_READ = '/api/HuCompetencyPeriod/GetById',
  HU_COMPETENCY_PERIOD_CREATE = '/api/HuCompetencyPeriod/Create',
  HU_COMPETENCY_PERIOD_UPDATE = '/api/HuCompetencyPeriod/Update',
  HU_COMPETENCY_PERIOD_DELETE_IDS = '/api/HuCompetencyPeriod/DeleteIds',
  HU_COMPETENCY_PERIOD_DELETE = '/api/HuCompetencyPeriod/Delete',
  HU_COMPETENCY_PERIOD_TOGGLE_ACTIVE_IDS = '/api/HuCompetencyPeriod/ToggleActiveIds',
  /// HU_COMPETENCY_DICTIONARY
  COMPETENCY_DICTIONARY_QUERY_LIST = '/api/HuCompetencyDict/QueryList',
  COMPETENCY_DICTIONARY_CREATE = '/api/HuCompetencyDict/Create',
  COMPETENCY_DICTIONARY_READ = '/api/HuCompetencyDict/GetById',
  COMPETENCY_DICTIONARY_READ_ALL = '/api/HuCompetencyDict/ReadAll',
  COMPETENCY_DICTIONARY_UPDATE = '/api/HuCompetencyDict/Update',
  COMPETENCY_DICTIONARY_DELETE = '/api/HuCompetencyDict/Delete',
  COMPETENCY_DICTIONARY_DELETE_IDS = '/api/HuCompetencyDict/DeleteIds',
  COMPETENCY_DICTIONARY_TOGGLE_ACTIVE_IDS = '/api/HuCompetencyDict/ToggleActiveIds',

  // HU_COMPETENCY_GROUP
  HU_COMPETENCY_GROUP_QUERY_LIST = '/api/HuCompetencyGroup/QueryList',
  HU_COMPETENCY_GROUP_READ = '/api/HuCompetencyGroup/GetById',
  HU_COMPETENCY_GROUP_CREATE = '/api/HuCompetencyGroup/Create',
  HU_COMPETENCY_GROUP_UPDATE = '/api/HuCompetencyGroup/Update',
  HU_COMPETENCY_GROUP_DELETE_IDS = '/api/HuCompetencyGroup/DeleteIds',
  HU_COMPETENCY_GROUP_DELETE = '/api/HuCompetencyGroup/Delete',
  HU_COMPETENCY_GROUP_TOGGLE_ACTIVE_IDS = '/api/HuCompetencyGroup/ToggleActiveIds',

  //HU_COM_COMMEND
  HU_COM_COMMEND_QUERY_LIST = '/api/HuComCommend/QueryList',
  HU_COM_COMMEND_CREATE = '/api/HuComCommend/Create',
  HU_COM_COMMEND_READ = '/api/HuComCommend/GetById',
  HU_COM_COMMEND_UPDATE = '/api/HuComCommend/Update',
  HU_COM_COMMEND_DELETE_IDS = '/api/HuComCommend/DeleteIds',

  //HU_ASSET
  HU_ASSET_QUERY_LIST = '/api/HuAsset/QueryList',
  HU_ASSET_READ = '/api/HuAsset/GetById',
  HU_ASSET_CREATE = '/api/HuAsset/Create',
  HU_ASSET_UPDATE = '/api/HuAsset/Update',
  HU_ASSET_DELETE_IDS = '/api/HuAsset/DeleteIds',
  HU_ASSET_DELETE = '/api/HuAsset/Delete',
  HU_ASSET_TOGGLE_ACTIVE_IDS = '/api/HuAsset/ToggleActiveIds',

  //HU_ASSET_MNG
  HU_ASSET_MNG_QUERY_LIST = '/api/HuAssetMng/QueryList',
  HU_ASSET_MNG_READ = '/api/HuAssetMng/GetById',
  HU_ASSET_MNG_CREATE = '/api/HuAssetMng/Create',
  HU_ASSET_MNG_UPDATE = '/api/HuAssetMng/Update',
  HU_ASSET_MNG_DELETE_IDS = '/api/HuAssetMng/DeleteIds',
  HU_ASSET_MNG_DELETE = '/api/HuAssetMng/Delete',
  HU_ASSET_MNG_TOGGLE_ACTIVE_IDS = '/api/HuAssetMng/ToggleActiveIds',

  // HU_COMPETENCY_GROUP
  HU_COMPETENCY_COMPETENCY_QUERY_LIST = '/api/HuCompetency/QueryList',
  HU_COMPETENCY_COMPETENCY_READ = '/api/HuCompetency/GetById',
  HU_COMPETENCY_COMPETENCY_CREATE = '/api/HuCompetency/Create',
  HU_COMPETENCY_COMPETENCY_UPDATE = '/api/HuCompetency/Update',
  HU_COMPETENCY_COMPETENCY_DELETE_IDS = '/api/HuCompetency/DeleteIds',
  HU_COMPETENCY_COMPETENCY_DELETE = '/api/HuCompetency/Delete',
  HU_COMPETENCY_COMPETENCY_TOGGLE_ACTIVE_IDS = '/api/HuCompetency/ToggleActiveIds',

  // HU_COMPETENCY_GROUP
  HU_COMPETENCY_ASPECT_QUERY_LIST = '/api/HuCompetencyAspect/QueryList',
  HU_COMPETENCY_ASPECT_READ = '/api/HuCompetencyAspect/GetById',
  HU_COMPETENCY_ASPECT_CREATE = '/api/HuCompetencyAspect/Create',
  HU_COMPETENCY_ASPECT_CREATE_NEW_CODE = '/api/HuCompetencyAspect/CreateNewCode',
  HU_COMPETENCY_ASPECT_UPDATE = '/api/HuCompetencyAspect/Update',
  HU_COMPETENCY_ASPECT_DELETE_IDS = '/api/HuCompetencyAspect/DeleteIds',
  HU_COMPETENCY_ASPECT_DELETE = '/api/HuCompetencyAspect/Delete',
  HU_COMPETENCY_ASPECT_TOGGLE_ACTIVE_IDS = '/api/HuCompetencyAspect/ToggleActiveIds',

  // HU_COMPETENCY
  HU_COMPETENCY_QUERY_LIST = '/api/HuCompetency/QueryList',
  HU_COMPETENCY_READ = '/api/HuCompetency/GetById',
  HU_COMPETENCY_CREATE = '/api/HuCompetency/Create',
  HU_COMPETENCY_UPDATE = '/api/HuCompetency/Update',
  HU_COMPETENCY_DELETE_IDS = '/api/HuCompetency/DeleteIds',
  HU_COMPETENCY_DELETE = '/api/HuCompetency/Delete',
  HU_COMPETENCY_TOGGLE_ACTIVE_IDS = '/api/HuCompetency/ToggleActiveIds',

  //HU_COM_PLANNING_MANAGE
  HU_COM_PLANNING_MANAGE_QUERY_LIST = '/api/HuComPlanningManage/QueryList',
  HU_COM_PLANNING_MANAGE_READ = '/api/HuComPlanningManage/GetById',
  HU_COM_PLANNING_MANAGE_CREATE = '/api/HuComPlanningManage/Create',
  HU_COM_PLANNING_MANAGE_UPDATE = '/api/HuComPlanningManage/Update',
  HU_COM_PLANNING_MANAGE_DELETE_IDS = '/api/HuComPlanningManage/DeleteIds',
  HU_COM_PLANNING_MANAGE_DELETE = '/api/HuComPlanningManage/Delete',
  HU_COM_PLANNING_MANAGE_TOGGLE_ACTIVE_IDS = '/api/HuComPlanningManage/ToggleActiveIds',

  //PORTAL_HISTORY_REGISTER
  PORTAL_REGISTER_OFF_GET_REGISTER_HISTORY = '/api/PortalRegisterOff/RegisterHistory',
  PORTAL_REGISTER_OFF_GET_REGISTER_HISTORY_BY_ID = '/api/PortalRegisterOff/GetRegisterHistoryById?id=',
  PORTAL_REGISTER_OFF_GET_REGISTER_BY_ID = '/api/PortalRegisterOff/GetRegisterById?id=',

  //AT_TIME_TIMESHEET_DAILY
  AT_TIME_TIMESHEET_DAILY_GET_ATTANDENT_NOTE_BY_MONTH = '/api/PortalAtTimeTimesheetDaily/GetAttendantNoteByMonth',
  AT_TIME_TIMESHEET_DAILY_GET_ATTANDENT_BY_DAY = '/api/PortalAtTimeTimesheetDaily/GetAttendatByDay',
  AT_TIME_TIMESHEET_DAILY_GET_LIST_SYMBOL_TYPE = '/api/PortalAtTimeTimesheetDaily/GetListSymbolType',
  AT_TIME_TIMESHEET_DAILY_INSERT_EXPLAIN_TIME = '/api/PortalAtTimeTimesheetDaily/InsertExplainTime',

  //PORTAL_REGISTER_OFF
  PORTAL_REGISTER_OFF_QUERY_LIST = '/api/PortalRegisterOff/QueryList',
  PORTAL_REGISTER_OFF_CREATE = '/api/PortalRegisterOff/Create',
  PORTAL_REGISTER_OFF_REGISTER_OFF_DETAIL = '/api/PortalRegisterOff/RegisterOff',
  PORTAL_REGISTER_OFF_READ = '/api/PortalRegisterOff/Read',
  PORTAL_REGISTER_OFF_UPDATE = '/api/PortalRegisterOff/Update',
  PORTAL_REGISTER_OFF_DELETE = '/api/PortalRegisterOff/Delete',
  PORTAL_REGISTER_OFF_GET_TOTAL_OT_MONTH = '/api/PortalRegisterOff/GetTotalOtMonth',
  PORTAL_REGISTER_OFF_GET_LEAVE_DAY = '/api/PortalRegisterOff/GetLeaveDay',

  //PORTAL_HU_WORKING_BEFORE_REQUEST
  PORTAL_HU_WORKING_BEFORE_REQUEST_SEND = '/api/PortalHuWorkingBeforeRequest/SendRequest',
  //PORTAL_STAFF_PROFILE
  PORTAL_PROFILE_INFO = '/api/PortalStaffProfile/GetProfileInfoByPortal2',
  PORTAL_REQUEST_CHANGE_SEND = '/api/PortalRequestChange/SendRequest',

  // HU_EVALUATE
  HU_EVALUATE_GET_BY_EMPLOYEE_ID = '/api/PortalEvaluate/GetByEmployeeId?employeeId=',
  HU_EMPLOYEE_GET_PROFILE_EDUCATION = '/api/PortalStaffProfile/GetEducationByPortal?employeeId=',
  HU_EMPLOYEE_GET_PROFILE_EDUCATION_CORRECT = '/api/PortalStaffProfile/GetEducationByPortalCorrect?id=',
  HU_EMPLOYEE_GET_CURRICULUM_BY_ID_CORRECT = '/api/PortalStaffProfile/GetHuEmployeeCvEditCorrectById',
  HU_EMPLOYEE_GET_CURRICULUM = '/api/PortalStaffProfile/GetCurriculumByPortal?employeeId=',
  HU_EMPLOYEE_GET_CURRICULUM_APPROVING = '/api/PortalStaffProfile/GetHuEmployeeCvEditCvApproving?employeeId=',
  HU_EMPLOYEE_GET_CURRICULUM_BY_ID = '/api/PortalStaffProfile/GetHuEmployeeCvEditById',
  HU_EMPLOYEE_GET_CURRICULUM_BY_EMPLOYEE_ID = '/api/PortalStaffProfile/GetHuEmployeeCvSave',
  HU_EMPLOYEE_GET_CURRICULUM_SAVE_BY_ID = '/api/PortalStaffProfile/GetHuEmployeeCvEditCvSaveById',
  HU_EMPLOYEE_GET_CURRICULUM_UNAPPROVE_BY_ID = '/api/PortalStaffProfile/GetHuEmployeeCvUnapprove',
  HU_EMPLOYEE_CV_EDIT_CV_DELETE = '/api/HuEmployeeCvEdit/Delete',
  HU_EMPLOYEE_CV_EDIT_BANK_INFO_INFO_GET_SAVE_BY_ID_2 = '/api/PortalStaffProfile/GetHuEmployeeCvEditBankInfoById?id=',
  HU_EMPLOYEE_GET_BANK_INFO_BY_EMPLOYEE_ID = '/api/PortalStaffProfile/GetBankInfoByEmployeeId',
  HU_EMPLOYEE_GET_BANK_INFO_APPROVING_BY_EMPLOYEE_ID = '/api/PortalStaffProfile/GetHuEmployeeCvEditBankInfoApproving',
  HU_EMPLOYEE_CV_EDIT_BANK_INFO_GET_ALL_SAVE = '/api/PortalStaffProfile/GetHuEmployeeCvEditBankInfoSave',
  HU_EMPLOYEE_CV_EDIT_BANK_INFO_GET_UNAPPROVE = '/api/PortalStaffProfile/GetHuEmployeeCvEditBankInfoUnapprove',

  HU_EMPLOYEE_CV_EDIT_CREATE = '/api/PortalStaffProfile/InsertEducationHuEmployeeCvEdt',
  HU_EMPLOYEE_CV_EDIT_READ = '/api/HuEmployeeCvEdit/GetById',
  HU_EMPLOYEE_CV_EDIT_UPDATE = '/api/HuEmployeeCvEdit/Update',
  HU_EMPLOYEE_CV_EDIT_DELETE = '/api/HuEmployeeCvEdit/Delete',
  HU_EMPLOYEE_CV_EDIT_SAVE_EDUCATION = '/api/PortalStaffProfile/SaveEducationHuEmployeeCvEdit',
  HU_CURRICULUM_CREATE_AS_UPDATE = '/api/PortalStaffProfile/InsertCvHuEmployeeCvEdit',
  HU_EMPLOYEE_CV_EDIT_CV_SAVE = '/api/PortalStaffProfile/SaveCvHuEmployeeCvEdit',

  HU_FAMILY_GET_ALL_FAMILY_EDIT_REFUSE_BY_EMPLOYEE = '/api/PortalHuFamilyEdit/GetHuFamilyEditRefuse',
  PORTAL_HU_FAMILY_EDIT_DELETE_IDS = '/api/PortalHuFamilyEdit/DeleteIds',
  PORTAL_HU_FAMILY_EDIT_GET_SAVE_BY_ID_CORRECT = '/api/PortalHuFamilyEdit/GetHuFamilyEditByIdCorrect?id=',
  HU_FAMILY_GET_ALL_FAMILY_EDIT_BY_EMPLOYEE = '/api/PortalHuFamilyEdit/GetHuFamilyEditNotApproved',
  HU_FAMILY_GET_ALL_FAMILY_EDIT_SAVE_BY_EMPLOYEE = '/api/PortalHuFamilyEdit/GetHuFamilyEditSave',
  HU_FAMILY_GET_ALL_FAMILY_BY_EMPLOYEE = '/api/PortalHuFamily/GetAllFamilyByEmployee',

  PORTAL_HU_FAMILY_CREATE = '/api/PortalHuFamilyEdit/InsertHuFamilyEdit',
  PORTAL_HU_FAMILY_READ = '/api/PortalHuFamily/GetById',
  PORTAL_HU_FAMILY_UPDATE = '/api/PortalHuFamilyEdit/InsertHuFamilyEdit',
  PORTAL_HU_FAMILY_DELETE = '/api/PortalHuFamily/Delete',
  PORTAL_HU_FAMILY_DELETE_BY_ID = '/api/PortalHuFamily/DeleteGetById',
  PORTAL_HU_FAMILY_SAVE = '/api/PortalHuFamilyEdit/SaveHuFamilyEdit',
  PORTAL_HU_FAMILY_EDIT_GET_SAVE_BY_ID = '/api/PortalHuFamilyEdit/GetHuFamilyEditSaveById',

  //PORTAL_CERTIFICATE/EDIT
  PORTAL_CERTIFICATE_CREATE = '/api/PortalCertificate/Create',
  PORTAL_CERTIFICATE_READ = '/api/PortalCertificate/GetById',
  PORTAL_CERTIFICATE_UPDATE = '/api/PortalCertificate/Update',
  PORTAL_CERTIFICATE_DELETE = '/api/PortalCertificate/Delete',
  PORTAL_CERTIFICATE_DELETE_IDS = '/api/PortalCertificate/DeleteIds',
  PORTAL_CERTIFICATE_GET_LIST_CERTIFICATE = '/api/HuCertificateEdit/GetListCertificate',//
  HU_CERTIFICATE_PORTAL_READ_GET_BY_EMP_ID = '/api/HuCertifiCateList/GetCertificateByEmployee',
  HU_CERTIFICATE_PORTAL_GET_BY_ID = '/api/HuCertifiCateEdit/GetByIdCertificate?id=',
  HU_CERTIFICATE_PORTAL_READ_GET_IS_APPROVE = '/api/HuCertifiCateEdit/GetCertificateIsApprove',
  HU_CERTIFICATE_PORTAL_READ_GET_IS_SAVE = '/api/HuCertifiCateEdit/GetCertificateIsSave',
  HU_CERTIFICATE_PORTAL_SAVE = '/api/HuCertifiCateEdit/Save',
  HU_CERTIFICATE_PORTAL_GET_BY_ID_SAVE = '/api/HuCertifiCateEdit/GetByIdCertificate',
  HU_CERTIFICATE_EDIT_DELETE_BY_ID = '/api/HuCertifiCateEdit/DeleteIds',
  HU_CERTIFICATE_EDIT_QUERY_LIST_REFUSE = '/api/HuCertifiCateEdit/GetCertificateApproving',
  HU_CERTIFICATE_EDIT_GET_BY_ID = '/api/HuCertifiCateEdit/GetCertificateById',
  HU_CERTIFICATE_EDIT_GET_SAVE_BY_ID = '/api/HuCertifiCateEdit/GetCertificateEditSaveById',
  HU_CERTIFICATE_EDIT_GET_UNAPPROVE = '/api/HuCertifiCateEdit/GetCertificateUnapprove',

  //PORTAL_LEAVE_APPROVE
  PORTAL_OVERTIME_APPROVE = '/api/PortalApproveLeave/Approve',
  PORTAL_OVERTIME_APPROVE_GET_BY_ID = '/api/PortalApproveLeave/GetById',

  // HU_CERTIFICATE_EDIT
  HU_CERTIFICATE_EDIT_CREATE = '/api/HuCertificateEdit/SendApproveCertificate',
  HU_CERTIFICATE_EDIT_SEND_APPROVE = '/api/HuCertificateEdit/SendApproveCertificate',
  HU_CERTIFICATE_EDIT_DELETE = '/api/HuCertificateEdit/Delete',
  HU_CERTIFICATE_EDIT_SEND_PORTAL_EDIT = "/api/HuCertificateEdit/SendUpdateHuCertificateEdit",
  HU_CERTIFICATE_EDIT_CLICK_SAVE = "/api/HuCertificateEdit/ClickSave",

  HU_EMPLOYEE_CV_EDIT_INSERT_BANK_INFO = '/api/PortalStaffProfile/InsertBankInfoHuEmployeeCvEdit',
  HU_EMPLOYEE_CV_EDIT_BANK_INFO_SAVE = '/api/PortalStaffProfile/SaveBankInfoHuEmployeeCvEdit',
  HU_EMPLOYEE_CV_EDIT_BANK_INFO_INFO_GET_SAVE_BY_ID = '/api/PortalStaffProfile/GetHuEmployeeCvEditBankInfoById',

  HU_EMPLOYEE_GET_CONTACT_BY_EMPLOYEE_ID = '/api/PortalStaffProfile/GetContactByEmployeeId',
  HU_EMPLOYEE_GET_CONTACT_APPROVING_BY_EMPLOYEE_ID = '/api/PortalStaffProfile/GetHuEmployeeCvEditContactApproving',
  HU_EMPLOYEE_GET_CONTACT_APPROVING_BY_EMPLOYEE_ID_CORRECT = '/api/PortalStaffProfile/GetHuEmployeeCvEditContactCorrect?id=',
  HU_EMPLOYEE_GET_ADDITIONAL_INFO_BY_EMPLOYEE_ID = '/api/PortalStaffProfile/GetHuEmployeeCvAdditionalInfoByEmployeeId',
  HU_EMPLOYEE_GET_ADDITIONAL_INFO_APPROVING_BY_EMPLOYEE_ID = '/api/PortalStaffProfile/GetHuEmployeeCvAdditionalInfoApproving',
  HU_EMPLOYEE_GET_ADDITIONAL_INFO_SAVE_BY_EMPLOYEE_ID = '/api/PortalStaffProfile/GetHuEmployeeCvEditAdditionalInfoSave',
  HU_EMPLOYEE_GET_ADDITIONAL_INFO_SAVE_BY_EMPLOYEE_ID_EDIT = '/api/PortalStaffProfile/GetHuEmployeeCvEditAdditionalInfoSaveEdit?id=',
  HU_EMPLOYEE_GET_ADDITIONAL_INFO_SAVE_BY_ID = '/api/PortalStaffProfile/GetHuEmployeeCvEditAddtionalInfoById',

  HU_EMPLOYEE_CV_EDIT_CONTACT_INFO_GET_ALL_SAVE = '/api/PortalStaffProfile/GetHuEmployeeCvEditContactSave',
  HU_EMPLOYEE_CV_EDIT_CONTACT_INFO_GET_SAVE_BY_ID = '/api/PortalStaffProfile/GetHuEmployeeCvEditContactSaveById',
  HU_EMPLOYEE_CV_EDIT_ADDITIONAL_INFO_SAVE = '/api/PortalStaffProfile/SaveAdditionalInfoHuEmployeeCvEdit',
  HU_EMPLOYEE_CV_EDIT_ADDITIONAL_INFO_GET_ALL_SAVE = '/api/PortalStaffProfile/GetHuEmployeeCvEditAdditionalInfoSave?employeeId=',
  HU_EMPLOYEE_CV_EDIT_ADDITIONAL_INFO_GET_SAVE_BY_ID = '/api/PortalStaffProfile/GetHuEmployeeCvEditAddtionalInfoById',
  HU_EMPLOYEE_CV_EDIT_CV_CONTACT_GET_UNAPPROVE = '/api/PortalStaffProfile/GetHuEmployeeCvEditContactUnapprove',
  HU_EMPLOYEE_CV_EDIT_CV_ADDITIONAL_INFO_GET_UNAPPROVE = '/api/PortalStaffProfile/GetHuEmployeeCvAdditionalInfoUnapprove',

  HU_EMPLOYEE_CV_EDIT_INSERT_CONTACT_INFO = '/api/PortalStaffProfile/InsertContactHuEmployeeCvEdit',
  HU_EMPLOYEE_CV_EDIT_CONTACT_INFO_SAVE = '/api/PortalStaffProfile/SaveContactHuEmployeeCvEdit',
  HU_EMPLOYEE_CV_EDIT_INSERT_ADDITINAL_INFO = '/api/PortalStaffProfile/InsertAdditionalInfoHuEmployeeCvEdit',

  HU_EMPLOYEE_CV_EDIT_INSUARENCE_INFO_APPROVING = '/api/PortalStaffProfile/GetHuEmployeeCvEditInsuarenceApproving',
  HU_EMPLOYEE_CV_EDIT_INSUARENCE_INFO_GET_ALL_SAVE = '/api/PortalStaffProfile/GetHuEmployeeCvEditInsurenceSave',
  HU_EMPLOYEE_CV_EDIT_INSUARENCE_INFO_BY_EMPLOYEE_ID = '/api/PortalStaffProfile/GetInsuarenceInfoByEmployeeId',

  HU_EMPLOYEE_CV_EDIT_INSERT_INSUARENCE_INFO = '/api/PortalStaffProfile/InsertInsuarenceInfoHuEmployeeCvEdit',
  HU_EMPLOYEE_CV_EDIT_INSUARENCE_INFO_SAVE = '/api/PortalStaffProfile/SaveHuEmpoyeeCvEditInsurence',
  HU_EMPLOYEE_CV_EDIT_INSUARENCE_INFO_GET_SAVE_BY_ID = '/api/PortalStaffProfile/GetInsurenceSaveById',

  // NOTIFY_PORTAL
  GET_ALL_NOTIFY = '/api/AtNotification/GetNotify?employeeId=',
  GET_COUNT_NOTIFY_UNREAD = '/api/AtNotification/GetCountNotifyUnRead?employeeId=',
  POST_NOTIFICATION_UPDATE = '/api/AtNotification/Update',

  //PORTAL_HOME_SCREEN
  PORTAL_COMING_SOON_BIRTHDAY_LIST = '/api/PortalHuEmployeeCv/ComingSoonBirthdayList',
  PORTAL_COMING_SOON_OFF_EMPLOYEE_LIST = '/api/PortalRegisterLeave/WillLeaveInNextSevenDay',
  PORTAL_AT_ENTILEMENT_GET_ENTITLEMENT = '/api/PortalAtEntitlement/GetEntitlement',
  PORTAL_AT_ENTILEMENT_GET_HISTORY_APPROVE = '/api/AtNotification/GetHistoryApprove',

  HU_EMPLOYEE_PORTAL_PROFILE = "/api/HuProfileEmployee/GetInfoEmployee",
  HU_EMPLOYEE_CV_PORTAL_QUERY_LIST = '/api/PortalHuEmployeeCv/QueryList',
  HU_EMPLOYEE_CV_GET_CONTRACT_DETAIL = '/api/PortalHuEmployeeCv/GetContractDetail',
  SYS_USER_CHANGE_PASSWOR_PORTAL = '/api/SysUser/ChangePasswordPortal',

  //PORTAL_LEAVE_APPROVE
  PORTAL_LEAVE_APPROVE = '/api/PortalApproveLeave/Approve',
  PORTAL_LEAVE_APPROVE_GET_BY_ID = '/api/PortalApproveLeave/GetByIdVer2',
  PORTAL_LEAVE_APPROVE_GET_PORTAL_BY_ID = '/api/PortalApproveLeave/GetPortalApproveById?id=',
  PORTAL_LEAVE_APPROVE_GET_REGISTER_BY_ID = '/api/PortalApproveLeave/GetRegisterById?id=',

  //PORTAL_HISTORY_APPROVE
  PORTAL_REGISTER_OFF_GET_APPROVE_HISTORY = '/api/PortalApproveLeave/ApproveHistory',
  PORTAL_REGISTER_OFF_GET_APPROVE_HISTORY_BY_ID = '/api/PortalApproveLeave/GetApproveHistoryById',

  HU_WORKING_PROCESS_FILE_NAME = '/api/HuWorking/GetFileNameWorkingProcess?id=',
  HU_WORKING_PROCESS_PRINT = '/api/HuWorking/PrintWorkingProcess',

  GET_SALARY_MINIMUM_OF_REGION = "/api/HuWorking/GetSalaryMinimumOfRegion",

  APPENDIX_CONTRACT_FILE_NAME = '/api/HuContractAppendix/GetFileName?id=',
  APPENDIX_CONTRACT_PRINT = '/api/HuContractAppendix/PrintAppendixContract',

  PORTAL_ROUTE_READ_ALL_MINI = '/api/PortalRoute/ReadAllMini',



  // HU_PLANNING
  HU_PLANNING_QUERY_LIST = '/api/Huplanning/QueryList',
  HU_PLANNING_CREATE = '/api/Huplanning/Create',
  HU_PLANNING_READ = '/api/HuPlanning/GetById',
  HU_PLANNING_READ_BY_ID = '/api/HuPlanning/GetById?id=',
  HU_PLANNING_UPDATE = '/api/HuPlanning/Update',
  HU_PLANNING_DELETE = '/api/HuPlanning/Delete',
  HU_PLANNING_DELETE_IDS = '/api/HuPlanning/DeleteIds',
  HU_PLANNING_GET_JOB_APP_LEVEL = '/api/HuPlanning/GetAppLevel',
  HU_PLANNING_GET_CERTIFICATE_BY_EMP = '/api/HuPlanning/GetCertificateByEmp',

  // HU_PERSONNEL_DIRECTORY
  HU_EMPLOYEE_PERSONNEL_DIRECTOTY_QUERY_LIST = '/api/HuEmployee/QueryListPersonnelDirectory',
  HU_EMPLOYEE_PERSONNEL_DIRECTOTY_READ = '/api/HuEmployee/GetPersonnelDirectoryById',

  //HU_PERSONNEL_PLANING
  HU_PERSONNEL_PLANING_QUERY_LIST = '/api/HuPersonnelPlaning/QueryList',
  HU_PERSONNEL_PLANING_CREATE = '/api/HuPersonnelPlaning/Create',
  HU_PERSONNEL_PLANING_READ = '/api/HuPersonnelPlaning/GetById',
  HU_PERSONNEL_PLANING_UPDATE = '/api/HuPersonnelPlaning/Update',
  HU_PERSONNEL_PLANING_DELETE_ID = '/api/HuPersonnelPlaning/DeleteIds',
  HU_PERSONNEL_PLANING_GET_TOTAL_EMPLOYEE_BY_ORG_ID = '/api/HuPersonnelPlaning/GetTotalEmployeeByOrgId',
  HU_PERSONNEL_PLANING_CHANGE_STATUS = '/api/HuPersonnelPlaning/ChangeStatus',

  //HU_PERSONNEL_PLANING_IMPORT
  XLSX_HU_PERSONNEL_PLANING_IMPORT_QUERY_LIST = '/api/HuPersonnelPlaningImport/QueryList',
  XLSX_HU_PERSONNEL_PLANING_IMPORT_SAVE = '/api/HuPersonnelPlaningImport/Save',
}
