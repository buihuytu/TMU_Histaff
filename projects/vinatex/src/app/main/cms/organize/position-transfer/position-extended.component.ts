import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { TranslatePipe, CorePageListComponent, CoreHeaderParamsComponent, CoreFormControlSeekerComponent, CoreChecklistComponent, PositionComponent, ICoreParamControl, IFilterOperator, IInOperator, ICoreTableColumnItem, ICoreChecklistOption, EnumCoreFormControlSeekerSourceType, IFormatedResponse } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-position-extended',
  standalone: true,
  imports: [
    CorePageListComponent,
    CoreHeaderParamsComponent,
    CoreFormControlSeekerComponent,
    CommonModule,
    FormsModule,
    CoreChecklistComponent,
    TranslatePipe,
  ],
  templateUrl: './position-extended.component.html',
  styleUrl: './position-extended.component.scss'
})
export class PositionExtendedComponent extends PositionComponent implements OnInit, AfterViewInit {
  @Input() isLoadData!: boolean;
  @Output() override onInstanceCreated = new EventEmitter<number>();
  

  chooseEmployee: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CHOOSE_EMPLOYEE;
  chooseChair: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CHOOSE_CHAIR;
  chooseOrg: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CHOOSE_ORG
  paramRows!: ICoreParamControl[][];
  filterOperators!: IFilterOperator[];
  override selectedIds!: number[];
  selectOrgId!: number;
  override outerInOperators: IInOperator[] | null = [
    {
      field: 'orgId',
      values: this.orgIds || [],
    },
    {
      field: 'masterName',
      values: []
    },
    {
      field: 'master',
      values: []
    },
  ];

  corePageListHeight!: number;
  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;
  columnExtend: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 90,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_MASTER,
      field: 'masterName',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_INTERIM,
      field: 'interimName',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_COMPANY,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_COMPANY,
      field: 'statusChair',
      type: 'string',
      align: 'left',
      width: 50,
      hidden: true
    },
  ];
  chairOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  override subscriptions: Subscription[] = [];
  // onNgModelChange = (ngModel: string, value: any) => {
  //   let field: string;
  //   let operator: EnumFilterOperator;
  //   let eventFilterOperator: IFilterOperator;

  //   field = ngModel;

  //   switch (ngModel) {
  //     case 'fromDate':
  //       operator = EnumFilterOperator.GREATER_THAN_OR_EQUAL;
  //       if (value != null) {
  //         value.setDate(value.getUTCDate());
  //         value.setUTCHours(0, 0, 0);
  //       }
  //       eventFilterOperator = {
  //         field,
  //         operator,
  //         dateTimeValue: value,
  //       };
  //       break;
  //     case 'endDate':
  //       operator = EnumFilterOperator.LESS_THAN_OR_EQUAL;
  //       if (value != null) {
  //         value.setDate(value.getUTCDate());
  //         value.setUTCHours(23, 59, 59);
  //       }
  //       eventFilterOperator = {
  //         field,
  //         operator,
  //         dateTimeValue: value,
  //       };
  //       break;
  //     default:
  //       return;
  //   }

  //   // vì có 2 date nên cần bảo vệ state cũ
  //   const currentOuterFilterOperators: IFilterOperator[] = JSON.parse(
  //     JSON.stringify(this.filterOperators)
  //   );

  //   // lọc những field không trùng với field và operator
  //   const remainOuterFilterOperators = currentOuterFilterOperators.filter(
  //     (x) => !!!(x.field === field && x.operator === operator)
  //   );

  //   // thêm lại event vừa xảy ra
  //   remainOuterFilterOperators.push(eventFilterOperator);

  //   // gán lại filter
  //   this.filterOperators = remainOuterFilterOperators;
  // };
  employeeId!: number;
  employeeSeekerType: EnumCoreFormControlSeekerSourceType = EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK;
  orgSeekerType: EnumCoreFormControlSeekerSourceType = EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK;
  chair!: number;
  override onOrgIdsChange(orgIds: number[]): void {
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    if (!!this.isLoadData) {
      this.onOrgIdsChange([1])
    } else {
      this.onOrgIdsChange([0])
    }
  }
  override ngAfterViewInit(): void {

    setTimeout(() => {

      this.columns.filter((c) => c.field === 'isTDV')[0].templateRef = this.isTDV;
      this.columns.filter((c) => c.field === 'isNotot')[0].templateRef = this.isNotot;
      const stickerFilter = this.columns.filter(c => c.field === 'active');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
      this.corePageListHeight =
        this.layoutService.contentContainerHeight$.value
        - 54.5 /* paramHeight*/
        - 15 /* margin-bottm */
        - this.layoutService.basicSpacing
      // - this.layoutService.corePaginationHeight

      this.subscriptions.push(
        this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + `CHAIR_TYPE`)
          .subscribe((x) => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body
              if (body.statusCode === 200) {
                const newObj: ICoreChecklistOption[] = [];
                body.innerBody.map((y: any) => {
                  newObj.push({
                    value: y.id,
                    text: y.name,
                    checked: false
                  })
                })
                this.chairOptions$.next(newObj)
              }
            }
          })
      )
    })


  }
  onEmployeeChange($event: number) {
    this.outerInOperators = [
      {
        field: 'master',
        values: [$event]
      },
      
    ]
  }
  onOrgChange($event: number) {
    this.selectOrgId = $event;
    this.positionTransferService.selectOrgId = $event;
    this.onOrgIdsChange([$event])
  }
  onChairChange($event: any[]) {
    if ($event.length != 0) {
      if ($event.length == 2) {
        this.outerInOperators = [{
          field: 'statusChair',
          values: [1, 2, 3]
        }]
      }
      else {
        this.subscriptions.push(
          this.appService.get(api.SYS_OTHERLIST_READ + `?id=${$event}`)
            .subscribe(x => {
              if (x.ok && x.status === 200 && x.body.statusCode === 200) {

                if (x.body.innerBody.code === 'MASTER') {
                  this.outerInOperators = [{
                    field: 'statusChair',
                    values: [2, 3]
                  }]
                } else if (x.body.innerBody.code === 'INTERIM') {
                  this.outerInOperators = [{
                    field: 'statusChair',
                    values: [1, 3]
                  }]
                } else {
                  this.outerInOperators = [{
                    field: 'concurrentStatus',
                    values: [1]
                  }]
                }
              }
            })
        )
      }
    }
    else {
      this.outerInOperators = [{
        field: 'orgId',
        values: [1]
      }]
    }
  }

  override onSelectedIdsChangeeee(e: number[]): void {
    this.selectedIds = e;
    this.positionTransferService.selectedIds = e
  }

  override onInstanceCreatedLocal(event: number) {
    this.listInstance = event;
    this.onInstanceCreated.emit(event);
  }

}
