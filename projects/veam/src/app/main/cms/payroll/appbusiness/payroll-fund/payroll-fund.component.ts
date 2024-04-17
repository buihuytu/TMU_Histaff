import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { IOrgTreeItem, ICoreDropdownOption, ICoreListOption, IFilterOperator, EnumFilterOperator, IInOperator, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, ISysGroup } from 'ngx-histaff-alpha';
import { PayrollFundEditService } from './payroll-fund-edit/payroll-fund.edit.service';

@Component({
  selector: 'app-payroll-fund',
  templateUrl: './payroll-fund.component.html',
  styleUrls: ['./payroll-fund.component.scss'],
})
export class PayrollFundComponent implements OnInit, OnDestroy {
  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_PA_PAYROLL_FUND;
  companyIds!: number;
  data!: IOrgTreeItem[];
  companyOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  outerParam$ = new BehaviorSubject<any>(null);
  groupOptions: ICoreListOption[] = [];

  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'companyId',
      operator: EnumFilterOperator.EQUAL,
    },
  ];
  outerInOperators: IInOperator[] = [
    {
      field: 'companyId',
      values: [this.companyIds] || [],
    },
  ];

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.PA_PAYROLL_FUND_QUERY_LIST,
  };

  avatarTemplate!: TemplateRef<any>;

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.PA_PAYROLL_FUND_DELETE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_ID,
      field: 'id',
      type: 'number',
      hidden: true,
      align: 'left',
      width: 10,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_PAYROLL_FUND_YEAR,
      field: 'year',
      type: 'number',
      align: 'left',
      width: 70,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_PAYROLL_FUND_COMPANY_NAME,
      field: 'companyName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_PAYROLL_FUND_MONTH,
      field: 'month',
      type: 'string',
      align: 'right',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_PAYROLL_FUND_LIST_FUND_NAME,
      field: 'listFundName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_PAYROLL_FUND_LIST_FUND_SOURCE_NAME,
      field: 'listFundSourceName',
      type: 'string',
      align: 'left',
      width: 220,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_PAYROLL_FUND_AMOUNT,
      field: 'amount',
      type: 'string',
      align: 'right',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_PAYROLL_FUND_APPROVAL_DATE,
      field: 'approvalDate',
      type: 'string',
      align: 'right',
      pipe: EnumCoreTablePipeType.DATE,
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_PAYROLL_FUND_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(private pfeService: PayrollFundEditService) {
    // this.onCompanyIdsChange(68);
  }

  ngOnInit(): void {
    this.pfeService
      .getCompany()
      .pipe(
        map((x: any) => {
          if (x.ok && x.status === 200) {
            const newGroupOptions: ICoreListOption[] = [];
            (x.body.innerBody as ISysGroup[]).map((x) => {
              newGroupOptions.push({
                value: x.id,
                text: x.name,
              });
            });

            return newGroupOptions;
          } else {
            return [];
          }
        }),
      )
      .subscribe((response) => {
        this.groupOptions = response;
      });
  }

  ngOnDestroy(): void {}

  // onCompanyIdsChange(companyIds: number) {
  //   this.companyIds = companyIds;
  //   console.log(companyIds);
  //   this.outerInOperators = [
  //     {
  //       field: 'companyId',
  //       values: [companyIds],
  //     },
  //   ];
  // }
}
