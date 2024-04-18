import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListEditRouting, ICorePageListCRUD, IInOperator, ICoreTableColumnItem } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-approve-hu-working',
  templateUrl: './approve-hu-working.component.html',
  styleUrls: ['./approve-hu-working.component.scss']
})


export class ApproveHuWorkingComponent implements OnInit, AfterViewInit {
  @ViewChild('reasonChange') reasonChange!: TemplateRef<any>;
  reasonChangeTemplateRef!: TemplateRef<any>;

  @ViewChild('pathFile') pathFile!: TemplateRef<any>;
  pathFileTemplateRef!: TemplateRef<any>;


  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.APPROVE_WORKING_COMPANY_QUERY_LIST,
  };

  
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };

  
  crud: ICorePageListCRUD = {
    toggleApproveIds: api.APPROVE_WORKING_COMPANY_APPROVED_HU_WORKING,
    toggleUnapproveIds: api.APPROVE_WORKING_COMPANY_UNAPPROVED_HU_WORKING
  };


  outerParam$ = new BehaviorSubject<any>(null);

  orgIds!: number[];

  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ];

  
  columns: ICoreTableColumnItem[] = [
    {
      // trường 0: Id
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30,
    },
    {
      // trường 1: trạng thái
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_STATUS,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      // trường 2: lý do
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_REASON,
      field: 'reasonChange',
      type: 'string',
      align: 'left',
      width: 200,
      templateRef: this.reasonChange
    },
    {
      // trường 3: Mã nhân viên
      caption: EnumTranslateKey.UI_TITLE_HU_CERTIFICATE_EDIT_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      // trường 4: họ và tên
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_FULLNAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    // {
    //   // trường 5: Loại quyết định
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_TYPE_NAME_CUR,
    //   field: 'typeDecision',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    // },
    // {
    //   // trường 6: Số quyết định
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_DECISIONNO,
    //   field: 'decisionNo',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    // },
    {
      // trường 7: Phòng/Ban
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      // trường 8: Vị trí chức danh
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_POSITION_SEEKER,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    // {
    //   // trường 9: Ngày hiệu lực
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_EFFECT_DATE,
    //   field: 'effectDateStr',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    // },
    // {
    //   // trường 10: Ngày hết hiệu lực
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EXPIREDATE,
    //   field: 'expireDateStr',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    // },
    // {
    //   // trường 11: Ngày thôi giữ chức danh theo QĐ
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_WORKING_PROCESS_TERMINATION_POS,
    //   field: 'ceasePositionDateStr',
    //   type: 'string',
    //   align: 'left',
    //   width: 270,
    // },
    // {
    //   // trường 12: Địa điểm làm việc
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_WORKPLACE_NAME,
    //   field: 'addressWorking',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    // },
    // {
    //   // trường 13: Đối tượng nhân viên
    //   caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPLOYEE_OBJ,
    //   field: 'employeeObjectName',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    // },
    // {
    //   // trường 14: Thời gian công tác
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_WORKING_PROCESS_WORK_TIME,
    //   field: 'workingTimeStr',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    // },
    {
      // trường 15: chức năng
      caption: EnumTranslateKey.UI_LABEL_FUNCTION_NAME,
      field: 'functionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      // trường 16: File đính kèm
      caption: EnumTranslateKey.UI_LABEL_FILE_NAME_DOWNLOAD,
      field: 'pathFile',
      type: 'string',
      align: 'left',
      width: 200,
      templateRef: this.pathFile
    }
  ]
  constructor(
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'reasonChange')[0].templateRef = this.reasonChange;
    this.columns.filter((c) => c.field === 'pathFile')[0].templateRef = this.pathFile;
  }


  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }
}
