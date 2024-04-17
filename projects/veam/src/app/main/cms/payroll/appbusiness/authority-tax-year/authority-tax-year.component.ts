import { Component, AfterViewInit, Input, TemplateRef, ViewChild } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, IFilterOperator, EnumFilterOperator, IInOperator, ISortItem, EnumSortDirection, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting, MultiLanguageService, RandomAvatarService, OrganizationService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

  
  
  @Component({
    selector: "cms-app-authority-tax-year",
    templateUrl: "./authority-tax-year.component.html",
    styleUrls: ["./authority-tax-year.component.scss"],
  })
  export class AuthorityTaxYearComponent  extends BaseComponent implements AfterViewInit {
  
    @Input() hideHeader!: boolean;
  
    /* START: Local filter params */
    orgIds!: number[];
    /* END: Local filter params */
  
    /*
    Properties being passed to core-page-list
    */
  
    title = EnumTranslateKey.UI_COMPONENT_TITLE_PA_AUTHORITY_TAX_YEAR
  
    outerParam$ = new BehaviorSubject<any>(null);
    outerFilterOperators: IFilterOperator[] = [
      {
        field: 'orgId',
        operator: EnumFilterOperator.EQUAL
      }
    ]
    outerInOperators: IInOperator[] = [
      {
        field: 'orgId',
        values: this.orgIds || []
      }
    ]

    // Sắp xếp lưới hiển thị theo cấp chức danh
    outerSort: ISortItem[] = [
      {
        field: "jobOrderNum",
        sortDirection: EnumSortDirection.ASC
      }
    ]
  
    apiDefinition: ICorePageListApiDefinition = {
      queryListRelativePath: api.PA_AUTHORITY_TAX_YEAR_QUERY_LIST,
    }
  
    crud: ICorePageListCRUD = {
      deleteIds: api.PA_AUTHORITY_TAX_YEAR_DELETE_IDS
    }
  
    avatarTemplate!: TemplateRef<any>;
  
    checkboxTemplate!: TemplateRef<any>;
    @ViewChild('isEmpRegister') isEmpRegister!: TemplateRef<any>;
    @ViewChild('isComApprove') isComApprove!: TemplateRef<any>;
    columns: ICoreTableColumnItem[] = [
      {
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE,
        field: 'jobOrderNum',
        type: 'string',
        align: 'center',
        hidden: true,
        width: 0,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
        field: 'id',
        hidden: true,
        type: 'string',
        align: 'left',
        width: 200,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_EMPLOYEE_CODE,
        field: 'employeeCode',
        type: 'string',
        align: 'left',
        width: 150,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_EMPLOYEE_NAME,
        field: 'employeeName',
        type: 'string',
        align: 'left',
        width: 250,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_POSITION_NAME,
        field: 'positionName',
        type: 'string',
        align: 'left',
        width: 200,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_DEPARTMENT_NAME,
        field: 'departmentName',
        type: 'string',
        align: 'left',
        width: 200,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_YEAR,
        field: 'year',
        type: 'string',
        align: 'left',
        width: 200,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_IS_EMP_REGISTER,
        field: 'isEmpRegister',
        type: 'string',
        align: 'left',
        width: 200,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_IS_COM_APPROVE,
        field: 'isComApprove',
        type: 'string',
        align: 'left',
        width: 200,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_REASON_REJECT,
        field: 'reasonReject',
        type: 'string',
        align: 'left',
        width: 200,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_NOTE,
        field: 'note',
        type: 'string',
        align: 'left',
        width: 200,
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_JOB_ORDER_NUM,
        field: 'jobOrderNum',
        type: 'string',
        align: 'right',
        width: 0,
        hidden: true,
      },
    ]
  
    defaultAvatar!: string;
  
    editRoute: ICorePageListEditRouting = {
        auxiliary: 'popupAux'
      }
    /* End Properties being passed to core-page-type-a */
  
    constructor(
      public override mls: MultiLanguageService,
      private ras: RandomAvatarService,
      private organizationService: OrganizationService
    ) {
      super(mls);
      this.defaultAvatar = ras.get();
  
      /* Get orgIds startup value */
      const newOrgIds: number[] = [];
      this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
      this.onOrgIdsChange(newOrgIds)
    }
  
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.columns.filter((c) => c.field === 'isEmpRegister')[0].templateRef =
                this.isEmpRegister;
            this.columns.filter((c) => c.field === 'isComApprove')[0].templateRef =
                this.isComApprove;
        });
    }
  
    onOrgIdsChange(orgIds: number[]) {
  
      this.orgIds = orgIds
      this.outerInOperators = [
        {
          field: 'orgId',
          values: orgIds
        }
      ]
    } 
  }
  