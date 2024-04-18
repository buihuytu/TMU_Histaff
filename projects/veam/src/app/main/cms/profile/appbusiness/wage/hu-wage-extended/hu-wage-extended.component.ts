import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AlertService, AppService, CoreOrgTreeComponent, CorePageListComponent, CorePageListService, CoreStatusStickerComponent, EnumCoreButtonVNSCode, EnumCoreTablePipeType, EvaluateDialogComponent, EvaluateDialogService, ICoreButtonVNS, ICoreTableColumnItem, MultiLanguageService, OrganizationService, RandomAvatarService, WageComponent } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-hu-wage-extended',
  standalone: true,
  imports: [
    NgIf,
    EvaluateDialogComponent,
    FormsModule,
    WageComponent,
    CorePageListComponent,
    CoreOrgTreeComponent,
    CoreStatusStickerComponent],
  templateUrl: './hu-wage-extended.component.html',
  styleUrl: './hu-wage-extended.component.scss'
})
export class HuWageExtendedComponent extends WageComponent {
  override selectedIds!: number[];
  loading!: boolean;


  override columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_JOB_ORDER_NUM,
      field: 'jobOrderNum',
      type: 'number',
      align: 'right',
      width: 0,
      hidden: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_STATUS,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 120,

    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EFFECTDATE,
      field: 'effectDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'right',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EXPIREDATE,
      field: 'expireDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_TYPE_NAME,
      field: 'typeName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_DECISIONNO,
      field: 'decisionNo',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EXPIRE_UPSAL_DATE,
      field: 'expireUpsalDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_REASON_UPSAL,
      field: 'reasonUpsal',
      type: 'string',
      align: 'left',
      width: 110,
    },
  ]


  override onSelectedIdsChangeeee(e: number[]): void {
    this.selectedIds = e

  }
  override onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    let filename = "";
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_PRINT:
        if (this.selectedIds.length > 1) {
          this.alertService.warn(this.mls.trans(EnumTranslateKey.ADD_ARREARS_INF), this.alertOptions)
        }
        else {
          this.http.get(api.HU_WAGE_GET_FILENAME + `?id=${this.selectedIds[0]}`).subscribe((response: any) => {
            filename = response.innerBody;
          });

          this.loading = true;

          this.http
            .get(api.HU_WAGE_PRINT, {
              responseType: 'blob',
              params: { id: this.selectedIds[0] }
            })
            .subscribe((response: Blob) => {
              if (response.type === 'application/octet-stream') {
                const downloadUrl = URL.createObjectURL(response);
                
                const link = document.createElement('a');
                
                link.href = downloadUrl;
                
                link.setAttribute('download', filename + '.doc');
                
                document.body.appendChild(link);
                
                link.click();
                
                document.body.removeChild(link);
                
                URL.revokeObjectURL(downloadUrl);
              }
              else {
                const reader = new FileReader();
                
                reader.onload = () => {
                  const jsonBody = reader.result as string;
                  
                  const data = JSON.parse(jsonBody);
                  
                  if (data.statusCode == 200) {
                    this.alertService.success(data.messageCode, this.alertOptions);
                  }
                  else {
                    // this.alertService.error(data.messageCode, alertOptions);
                  }
                };

                reader.readAsText(response);
              }

              this.loading = false;
            });
        }
        break;
      default:
        break;

    }
  }

  override mls = inject(MultiLanguageService);
  override ras = inject(RandomAvatarService);
  override organizationService = inject(OrganizationService);
  override appService = inject(AppService);
  override alertService = inject(AlertService);
  override corePageListService = inject(CorePageListService);
  override http = inject(HttpClient);
  override evaluateDialogService = inject(EvaluateDialogService);

}
