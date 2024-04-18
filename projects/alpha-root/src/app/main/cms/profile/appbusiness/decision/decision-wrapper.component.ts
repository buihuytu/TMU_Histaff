import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AlertService, BaseComponent, DecisionComponent, EnumCoreButtonVNSCode, EnumSortDirection, ICoreButtonVNS, MultiLanguageService, OrganizationService, RandomAvatarService, alertOptions } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-decision-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    DecisionComponent,
  ],
  templateUrl: './decision-wrapper.component.html',
  styleUrl: './decision-wrapper.component.scss'
})
export class DecisionWrapperComponent extends BaseComponent  {

  id: any;
  selectedData!: any[];
  corePageListInstanceNumber!: number;

  constructor(
    public override mls: MultiLanguageService,
    private ras: RandomAvatarService,
    private router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private http: HttpClient,
    private alertService: AlertService,
  ) {
    super(mls);
    this.corePageListInstanceNumber = new Date().getTime();
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {

    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        break;
      case EnumCoreButtonVNSCode.HEADER_PRINT:

        let filename = '';
        this.http.get(api.HU_DECISION_FILE_NAME + this.id.toString()).subscribe((response: any) => {
          filename = response.innerBody;
        });
        this.http.get(api.HU_DECISION_PRINT, {
          responseType: 'blob',
          params: { id: this.id.toString() }
        }).subscribe((response: Blob) => {
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
              this.alertService.warn(data.messageCode, alertOptions);
            };
            reader.readAsText(response);
          }

        });
        break;
      case EnumCoreButtonVNSCode.HEADER_COPY:
        if (this.selectedData.length > 1) {
          this.alertService.error(`${this.mls.trans(EnumTranslateKey.NOT_SELECTED_MORE_THAN_ONE_ROW_FOR_BUTTON_COPY_DATA)}`, alertOptions)
          return;
        }
        this.router.navigate(
          [btoa('0'), { listInstance: this.corePageListInstanceNumber }],
          {
            relativeTo: this.route, state: { selectedData: this.selectedData }
          }
        );
        break;
      default:
        break;
    }
  }

  onRowClick(e: any): void {
    this.id = e;
  }

  onSelectedDataChange(e: any[]) {
    this.selectedData = e;
    console.log(this.selectedData)
  }

}
