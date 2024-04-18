import { Component, OnInit, isDevMode } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICoreTableColumnItem, EnumCoreTablePipeType, EnumCoreButtonVNSCode, IXlsxImportObject, ISortItem, EnumSortDirection, MultiLanguageService, CorePageListService, AlertService, AppService, noneAutoClosedAlertOptions, ICoreButtonVNS, IFormatedResponse, alertOptions } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-staffprofile-import',
  templateUrl: './staffprofile-import.component.html',
  styleUrls: ['./staffprofile-import.component.scss'],
})
export class StaffprofileImportComponent extends BaseComponent implements OnInit {

  captionCode: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_STAFF_PROFILE_IMPORT

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.XLSX_HU_EMPLOYEE_IMPORT_QUERY_LIST,
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      type: 'number',
      align: 'right',
      hidden: true,
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_IMPORT_INSERT_ON,
      field: 'xlsxInsertOn',
      type: 'date',
      align: 'left',
      width: 160,
      pipe: EnumCoreTablePipeType.DATE_TIME,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_IMPORT_FILE_NAME,
      field: 'xlsxFileName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_IMPORT_ROW,
      field: 'xlsxRow',
      type: 'number',
      align: 'center',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_ORGNAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 500,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_POSITION,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 500,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_ITIME_CODE,
      field: 'itimeId',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_EMPLOYEE_OBJECT,
      field: 'employeeObjectName',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_FULLNAME,
      field: 'fullname',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_OTHER_NAME,
      field: 'otherName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_GENDER_ID,
      field: 'genderName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_NATIONALITY_ID,
      field: 'nationalityName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_DOMICILE,
      field: 'domicile',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_NATIVE_ID,
      field: 'nativeName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BIRTH_DATE,
      field: 'birthDate',
      type: 'string',
      align: 'left',
      width: 120,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BIRTH_PLACE,
      field: 'birthPlace',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BIRTH_REGIS_ADDRESS,
      field: 'birthRegisAddress',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_ID_NO,
      field: 'idNo',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_ID_DATE,
      field: 'idDate',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_ID_PLACE,
      field: 'idPlaceName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_PROVINCE_ID,
      field: 'provinceName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_DISTRICT_ID,
      field: 'districtName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_WARD_ID,
      field: 'wardName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_ADDRESS,
      field: 'address',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_CUR_PROVINCE_ID,
      field: 'curProvinceName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_CUR_DISTRICT_ID,
      field: 'curDistrictName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_CUR_WARD_ID,
      field: 'curWardName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_CUR_ADDRESS,
      field: 'curAddress',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_EMAIL,
      field: 'email',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_MARITAL_STATUS_ID,
      field: 'maritalStatusName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_CUR_ADDRESS,
      field: 'idNo',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_EMAIL,
      field: 'idDate',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_MARITAL_STATUS_ID,
      field: 'idPlaceName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_CUR_ADDRESS,
      field: 'passNo',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_EMAIL,
      field: 'passDate',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_MARITAL_STATUS_ID,
      field: 'passExpire',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_MARITAL_STATUS_ID,
      field: 'passPlace',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_IS_MEMBER,
      field: 'isMember',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_ID,
      field: 'bankName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_BRANCH,
      field: 'bankBranchName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'bankNo',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_ID,
      field: 'bankName2',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_BRANCH,
      field: 'bankBranchName2',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'bankNo2',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'taxCode',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'taxCodeDate',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'taxCodeAddressName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'bloodGroup',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'height',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'weight',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'bloodPressure',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'healthType',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'leftEye',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'rightEye',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'heart',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'examinationDate',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'healthNotes',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'visaNo',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'visaDate',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'visaExpire',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'visaPlace',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'insurenceAreaName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'insurenceNumber',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'insCardNumber',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'insWhereHealthName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'familyMember',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'familyPolicy',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'schoolOfWork',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'veterans',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'titleConferred',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'prisonNote',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'familyDetail',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'yellowFlag',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'relations',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'youthSaveNationPosition',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'youthSaveNationDate',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'youthSaveNationAddress',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'isUnionist',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_YES_NO
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'unionistAddress',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'unionistDate',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'unionistPosition',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'isJoinYouthGroup',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'youthGroupPosition',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'youthGroupAddress',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'isMember',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'memberPosition',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'memberAddress',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'memberDate',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'memberOfficalDate',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'livingCell',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'cardNumber',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'resumeNumber',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'enlistmentDate',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'disChargeDate',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'highestMilitaryPosition',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'vateransPosition',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'vateransMemberDate',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'vateransAddress',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'politicalTheory',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'currentPartyCommittee',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'partytimePartyCommittee',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'educationLevelName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'computerSkillName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'license',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'householdNumber',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'householdCode',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'mobilePhone',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'mobilePhoneLand',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'workEmail',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'email',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'mainIncome',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'otherSources',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'landGranted',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'taxGrantedHouse',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'totalArea',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'selfPurcharseLand',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'selfBuildHouse',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'landForProduction',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_BANK_NO,
      field: 'additionalInformation',
      type: 'string',
      align: 'left',
      width: 100,
    },
  ]

  callerListInstance!: number;

  shownButtonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SAVE,
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL
  ]

  importPreviewOuterParam!: IXlsxImportObject;
  loading!: boolean;

  outerSort: ISortItem[] = [
    {
      field: 'xlsxRow',
      sortDirection: EnumSortDirection.ASC
    }
  ];

  constructor(
    public override mls: MultiLanguageService,
    private router: Router,
    private route: ActivatedRoute,
    private corePageListService: CorePageListService,
    private alertService: AlertService,
    private appService: AppService,
  ) {
    super(mls);
    const navigation = this.router.getCurrentNavigation();

    this.importPreviewOuterParam = navigation?.extras?.state!['importPreviewOuterParam'];

    this.callerListInstance = Number(
      this.route.snapshot.paramMap.get('listInstance')!
    );

    const instancesFilter = this.corePageListService.instances.filter(
      (x) => x.instanceNumber === this.callerListInstance
    );
    if (!!instancesFilter.length) {
      const instance = instancesFilter[0];
    } else {
      if (isDevMode()) {
        this.alertService.info(`CorePageList instances do not include number ${this.callerListInstance}`, noneAutoClosedAlertOptions)
      }
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCoreButtonGroupVNSClick(e: ICoreButtonVNS) {
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_CANCEL) {
      this.onCancel();
    } else if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SAVE) {

      this.loading = true;

      this.subscriptions.push(
        this.appService.post(api.XLSX_HU_EMPLOYEE_IMPORT_SAVE, this.importPreviewOuterParam).subscribe(x => {
          this.loading = false;
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              const instanceFilter = this.corePageListService.instances.filter(x => x.instanceNumber === this.callerListInstance)
              if (!!instanceFilter.length) {
                instanceFilter[0].reloadFlag$.next(!instanceFilter[0].reloadFlag$.value)
              }
              this.onCancel();
            } else {
              this.alertService.info(this.mls.trans(body.messageCode, this.lang), alertOptions)
            }
          } else {
            console.log("Save failed", x)
          }
        })

      )
    }
  }
}
