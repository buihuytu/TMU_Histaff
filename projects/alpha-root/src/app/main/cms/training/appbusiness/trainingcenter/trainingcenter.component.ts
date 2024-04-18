import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem } from 'ngx-histaff-alpha';

@Component({
  selector: 'cms-app-trainingcenter',
  templateUrl: './trainingcenter.component.html',
  styleUrls: ['./trainingcenter.component.scss'],
})
export class TrainingCenterComponent implements OnInit, AfterViewInit, OnDestroy {
  /*  
  Properties being passed to core-page-list
  */
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  title = EnumTranslateKey.UI_COMPONENT_TRAINING_CENTER;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_CENTER_QUERY_LIST,
  };

  avatarTemplate!: TemplateRef<any>;

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.TR_CENTER_DELETE_IDS,
    toggleActiveIds: api.TR_CENTER_TOGGLE_ACTIVE_IDS,
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
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_IS_ACTIVE,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_CODE,
      field: 'codeCenter',
      type: 'string',
      align: 'left',
      width: 150,
      hidden: true,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_NAME,
      field: 'nameCenter',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_TRAINING_FILED,
      field: 'trainingField',
      type: 'string',
      align: 'left',
      width: 300,
    },
    // {
    //   caption: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_ADDRESS,
    //   field: 'address',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    // },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_PHONE,
      field: 'phone',
      type: 'string',
      align: 'left',
      width: 200,
    },
    // {
    //   caption: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_REPRESENTATIVE,
    //   field: 'representative',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    //   hidden: true,
    // },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_CONTACT_PERSON,
      field: 'contactPerson',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_PHONE_CONTACT_PERSON,
      field: 'phoneContactPerson',
      type: 'string',
      align: 'left',
      width: 200,
      hidden: true,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_WEBSITE,
      field: 'website',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_FILE_NAME,
      field: 'attachedFile',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
    
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor() { }

  ngOnInit(): void { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }
  ngOnDestroy(): void { }
}
