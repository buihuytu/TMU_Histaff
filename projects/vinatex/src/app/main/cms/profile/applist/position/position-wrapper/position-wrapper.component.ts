import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnumTranslateKey } from 'alpha-global-constants';
import { CoreCheckboxComponent, CoreOrgTreeComponent, CorePageListComponent, CoreStatusStickerComponent, EnumCoreTablePipeType, ICoreTableColumnItem, PositionComponent } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-position-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CorePageListComponent,
    CoreStatusStickerComponent,
    CoreCheckboxComponent,
    CoreOrgTreeComponent,
  ],
  templateUrl: './position-wrapper.component.html',
  styleUrl: './position-wrapper.component.scss'
})
export class PositionWrapperComponent extends PositionComponent {
  // @ViewChild('isTDV')  isTDV!: TemplateRef<any>;
  @ViewChild('sticker2') sticker2!: TemplateRef<any>;
    
  override columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_IS_ACTIVE,
      field: 'active',
      type: 'string',
      align: 'center',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_MASTER,
      field: 'masterName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_INTERIM,
      field: 'interimName',
      type: 'string',
      align: 'left',
      width: 200,
    },    
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_ORGNAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_LM_JOB,
      field: 'lmJobName',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_LM,
      field: 'lmName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_CSM_JOB,
      field: 'csmJobName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_CSM,
      field: 'csmName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_IS_TDV,
      field: 'isTDV',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      width: 200,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_IS_NOT_OT,
      field: 'isNotot',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      width: 200,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_EFFECTIVE_DATE,
      field: 'effectiveDate',
      pipe: EnumCoreTablePipeType.DATE,
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_JOB_DESC,
      field: 'jobDesc',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ];

  override ngAfterViewInit(): void {
    setTimeout(() => {
      this.columns.filter((c) => c.field === 'isTDV')[0].templateRef = this.isTDV;
      this.columns.filter((c) => c.field === 'isNotot')[0].templateRef = this.isNotot;
      const stickerFilter = this.columns.filter(c => c.field === 'active');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker2;
    });
  }


}
