import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, MultiLanguageService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'cms-app-seldap',
  templateUrl: './se-ldap.component.html',
  styleUrls: ['./se-ldap.component.scss'],
})
export class SeLdapComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SE_LDAP;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SE_LDAP_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.SE_LDAP_DELETE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: 'id',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_LDAP_LDAP_NAME,
      field: 'ldapName',
      type: 'string',
      align: 'left',
      width: 350,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_LDAP_DOMAIN_NAME,
      field: 'domainName',
      type: 'string',
      align: 'left',
      width: 350,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_LDAP_BASE_DN,
      field: 'baseDn',
      type: 'string',
      align: 'left',
      width: 500,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_SE_LDAP_PORT,
      field: 'port',
      type: 'number',
      align: 'left',
      width: 250,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(public override mls: MultiLanguageService) {
    super(mls);
  }
  ngAfterViewInit(): void {}

  onOrgIdChange(orgId: number) {}
}
