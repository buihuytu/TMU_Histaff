import { Component, AfterViewInit, Output, EventEmitter, SimpleChanges, Input } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, IInOperator, ICoreTableColumnItem, MultiLanguageService, CorePageListService } from "ngx-histaff-alpha";

@Component({
  selector: 'app-screen-right',
  templateUrl: './screen-right.component.html',
  styleUrl: './screen-right.component.scss'
})

export class ScreenRightComponent extends BaseComponent implements AfterViewInit {
  @Input() whenInstanceNumberChange: any;
  @Input() huCompetencyPeriodId: any;

  @Output() selectedIdsChange = new EventEmitter();

  title = EnumTranslateKey.UI_COMPONENT_TITLE_SCREEN_RIGHT;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.PE_EMPLOYEE_ASSESSMENT_QUERY_LIST,
  };

  listInstance!: number;

  outerInOperators: IInOperator[] | null = null;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_TITLE_HU_CERTIFICATE_EDIT_EMPLOYEE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_EMPLOYEE_NAME,
      field: 'fullName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'id',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'huCompetencyPeriodId',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1,
    }
  ];

  constructor(
    public override mls: MultiLanguageService,
    public corePageListService: CorePageListService
  ) {
    super(mls);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Xử lý logic khi giá trị của whenInstanceNumberChange thay đổi
    if (changes["whenInstanceNumberChange"]) {
      console.log('Giá trị của whenInstanceNumberChange đã thay đổi:', changes["whenInstanceNumberChange"].currentValue);

      const listInstances = this.corePageListService.instances.filter((x: any) => {
        return x.instanceNumber === this.listInstance;
      });

      if (!!listInstances.length) {
        listInstances[0].reloadFlag$.next(!!!listInstances[0].reloadFlag$.value);
      }
    }


    // Xử lý logic khi giá trị của huCompetencyPeriodId thay đổi
    if (changes["huCompetencyPeriodId"]) {
      if (!!changes["huCompetencyPeriodId"].currentValue) {
        var arr: any = this.outerInOperators?.filter(x => x.field != 'huCompetencyPeriodId');

        if (!!arr) {
          this.outerInOperators = arr;

          this.outerInOperators?.push({
            field: 'huCompetencyPeriodId',
            values: [changes["huCompetencyPeriodId"].currentValue]
          });
        }
        else {
          this.outerInOperators = [
            {
              field: 'huCompetencyPeriodId',
              values: [changes["huCompetencyPeriodId"].currentValue]
            }
          ]
        }
      }
      else {
        this.outerInOperators = [
          {
            field: 'huCompetencyPeriodId',
            values: [-1]
          }
        ]
      }
    }
  }

  ngAfterViewInit(): void {

  }

  onSelectedIdsChange(e: any) {
    this.selectedIdsChange.emit(e)
  }

  onInstanceCreated(e: number) {
    this.listInstance = e;
  }
}