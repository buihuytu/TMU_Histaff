import {
  Component,
  ViewEncapsulation,
  Inject,
  TemplateRef,
  AfterViewInit,
  ViewChild
} from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, EnumCoreTablePipeType, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem,} from "ngx-histaff-alpha";

@Component({
  selector: "cms-app-allowance",
  templateUrl: "./allowance.component.html",
  styleUrls: ["./allowance.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AllowanceComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_ALLOWANCE
  @ViewChild('isInsurance') isInsurance!: TemplateRef<any>;
  @ViewChild('isCoefficient') isCoefficient!: TemplateRef<any>;
  @ViewChild('isSal') isSal!: TemplateRef<any>;
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  checkboxTemplate!: TemplateRef<any>;
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_ALLOWANCE_DELETE_IDS,
    toggleActiveIds: api.HU_ALLOWANCE_CHANGESTATUSAPPROVE
  }
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  columns: ICoreTableColumnItem[] = [
    {
      caption: 'ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 10,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_STATUS,
      field: 'isActiveStr',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 240,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_TYPE,
      field: 'typeName',
      type: 'string',
      align: 'left',
      width: 210,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ISINSURANCE,
      field: 'isInsurance',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      // width: 200,
      readonly:true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ISCOEFICIENT,
      field: 'isCoefficient',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      // width: 200,
      readonly:true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ISSAL,
      field: 'isSal',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      // width: 200,
      readonly:true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 310,
    },
    
  ]
  ngAfterViewInit(): void {
    this.columns.filter(c => c.field === 'isInsurance')[0].templateRef = this.isInsurance;
    this.columns.filter(c => c.field === 'isCoefficient')[0].templateRef = this.isCoefficient;
    this.columns.filter(c => c.field === 'isSal')[0].templateRef = this.isSal;
    const stickerFilter = this.columns.filter(c => c.field === 'isActiveStr');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_ALLOWANCE_QUERY_LIST,
  }
}
