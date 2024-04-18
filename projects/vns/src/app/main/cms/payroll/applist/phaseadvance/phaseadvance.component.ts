import { Component, ViewEncapsulation, AfterViewInit, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { IFilterOperator, EnumFilterOperator, IInOperator, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, OrganizationService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-phase-advance',
  templateUrl: './phaseadvance.component.html',
  styleUrls: ['./phaseadvance.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PhaseAdvanceComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /* START: Local filter params */
  orgIds!: number[];
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]
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

  title = EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.PA_PHASE_ADVANCE_QUERY_LIST,
  };

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.PA_PHASE_ADVANCE_DELETE_IDS,
    toggleActiveIds: api.PA_PHASE_ADVANCE_TOGGLE_ACTIVE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'center',
      width: 30,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_YEAR,
      field: 'year',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_DAY,
      field: 'phaseDay',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_FROM_DATE,
      field: 'fromDate',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_TO_DATE,
      field: 'toDate',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_SALARY_PERIOD,
      field: 'periodName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_NAME_BONUS,
      field: 'nameVn',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_SYMBOL_BONUS,
      field: 'symbolName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_MONTH_LBS,
      field: 'monthLbs',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_SENIORITY,
      field: 'seniority',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_STATUS,
      field: 'status',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(
    private organizationService: OrganizationService
  ) {
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.columns.filter((c) => c.field === 'status')[0].templateRef = this.sticker

    })
  }
  ngOnDestroy(): void {
  }
}
