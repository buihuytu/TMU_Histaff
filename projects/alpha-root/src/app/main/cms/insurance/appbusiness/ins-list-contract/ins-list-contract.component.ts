import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-ins-list-contract',
  templateUrl: './ins-list-contract.component.html',
  styleUrls: ['./ins-list-contract.component.scss']
})
export class InsListContractComponent implements OnInit, AfterViewInit, OnDestroy {

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_INS_LIST_CONTRACT;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.INS_LIST_CONTRACT_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.INS_LIST_CONTRACT_DELETE_IDS
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_GROUP_ID,
      field: 'id',
      type: 'number',
      hidden: true,
      align: 'left',
      width: 10,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_NO,
      field: 'contractInsNo',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_YEAR,
      field: 'year',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_ORG_INS,
      field: 'orgInsuranceName',
      type: 'string',
      align: 'left',
      width: 240,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_START_DATE,
      field: 'startDate',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_EXPIRE_DATE,
      field: 'expireDate',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_VALCO,
      field: 'valCo',
      type: 'string',
      align: 'center',
      width: 150,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_BYDATE,
      field: 'buyDate',
      type: 'string',
      align: 'center',
      width: 120,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
    
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      
    })
  }
  ngOnDestroy(): void { }
}
