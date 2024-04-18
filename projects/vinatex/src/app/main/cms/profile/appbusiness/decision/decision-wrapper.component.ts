import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AlertService, AppService, BaseComponent, CoreButtonGroupService, CoreOrgTreeComponent, CorePageListComponent, CoreStatusStickerComponent, DecisionComponent, EnumCoreButtonVNSCode, EnumSortDirection, ICoreButtonDropdownOption, ICoreButtonVNS, ICorePageListCRUD, MultiLanguageService, OrganizationService, RandomAvatarService, alertOptions } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-decision-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    CorePageListComponent,
    CoreOrgTreeComponent,
    CoreStatusStickerComponent,
    FormsModule
    // DecisionComponent,

  ],
  templateUrl: './decision-wrapper.component.html',
  styleUrl: './decision-wrapper.component.scss'
})
export class DecisionWrapperComponent extends  DecisionComponent {
  coreButtonGroupService = inject(CoreButtonGroupService);
  dataButtonPrints : ICoreButtonDropdownOption[] = []
  appService = inject(AppService)
  alertService = inject(AlertService)
  http = inject(HttpClient)
  router = inject(Router)
  route = inject(ActivatedRoute)

  selectedIds: number[] = [];
  override crud: ICorePageListCRUD = {
    deleteIds: api.HU_DECISION_DELETE_IDS,
    toggleApproveIds: api.HU_DECISION_CHANGESTATUSAPPROVE,
    toggleUnapproveIds:api.HU_DECISION_CHANGESTATUSAPPROVE,
  }
  override onCorePageHeaderButtonClickLocal(e : ICoreButtonVNS){
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        //this.router.navigate([btoa('0')], { relativeTo: this.route })
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        break;
      case EnumCoreButtonVNSCode.HEADER_PRINT:
        let filename = '';

        if (this.selectedIds.length > 1) {
          this.alertService.warn(this.mls.trans('PRINT_ONE_RECORD'), alertOptions);
        }
        else {
          this.http.get(api.HU_WORKING_PROCESS_FILE_NAME + this.selectedIds[0].toString()).subscribe((response: any) => {
            filename = response.innerBody;
          });

          // this.loading = true;

          this.http
            .get(api.HU_WORKING_PROCESS_PRINT, {
              responseType: 'blob',
              params: { id: this.selectedIds[0].toString() }
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
                    this.alertService.success(data.messageCode, alertOptions);
                  }
                  else {
                    // this.alertService.error(data.messageCode, alertOptions);
                  }
                };

                reader.readAsText(response);
              }

              // this.loading = false;
            });
        }

        break;
      case EnumCoreButtonVNSCode.HEADER_COPY:
          if(this.selectedData.length > 1){
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
      case EnumCoreButtonVNSCode.HEADER_DROPDOWN_PRINT:
        if (this.selectedIds.length > 1) {
          this.alertService.warn(this.mls.trans('PRINT_ONE_RECORD'), alertOptions);
          return;
        } else if(this.selectedIds.length == 0){
          this.alertService.warn(this.mls.trans(EnumTranslateKey.REPORT_SELECTED_NOT_NULL), alertOptions);
          return;
        }
        else {
          const fileName = e.childCodeClicked;
          const request = {
            fileName : fileName,
            id : this.selectedIds[0],
            viewName : "DECISION"
          }
          this.appService
            .blobPost(api.EXPORT_WORD_BY_TEMPLATE,request)
            .subscribe((x: any) => {
              let downloadLink = document.createElement("a");
              downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
              downloadLink.setAttribute("download", fileName +'.doc');
              document.body.appendChild(downloadLink);
              downloadLink.click();
            });
        }
        break;
      default:
        break;
    }
  }

  override onRowClickLocal(e: any): void {
    this.id = e;
  }

  override ngAfterViewInit(): void {
    const filter = this.columns.filter(c => c.field === 'avatar');
    if (!!filter.length) filter[0].templateRef = this.avatar;
    const stickerFilter = this.columns.filter(c => c.field === 'statusName');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;

    setTimeout(() => {
      this.subscriptions.push(
        this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "DECISION_INFORMATION_PRINTING_FORM").subscribe(x => {
          let vals = x.body.innerBody
          vals.map(x => {
            x.codeName = x.code + '-'+ x.name
          })
          vals.forEach(element => {
            let dataButtonPrint : ICoreButtonDropdownOption = {
              childCaptionCode : element.codeName,
              childIconWrapperClass : '',
              childCode: element.codeName,
              childIconClass: ''
            }
            this.dataButtonPrints.push(dataButtonPrint)
          });

          this.coreButtonGroupService.headerButtonPrintDropdownOptions$.next(this.dataButtonPrints)
        })
      )
    })
  }



  override onSelectedDataChangeLocal(e: any[]): void {
    this.selectedData = e;
  }

  customizeSelectedIdsChange(e: number[]): void {
    this.selectedIds = e;
  }

}
