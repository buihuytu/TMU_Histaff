import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CoreButtonGroupService, CoreOrgTreeComponent, CorePageListComponent, CoreStatusStickerComponent, EnumCoreButtonVNSCode, EvaluateDialogComponent, FullscreenModalLoaderComponent, ICoreButtonDropdownOption, ICoreButtonVNS, MapAvatarToServerPipe, WageComponent } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-wage-ext',
  standalone: true,
  imports: [
    CommonModule,
    CorePageListComponent,
    CoreOrgTreeComponent,
    FormsModule,
    CoreStatusStickerComponent,
    EvaluateDialogComponent
  ],
  templateUrl: './wage-ext.component.html',
  styleUrl: './wage-ext.component.scss'
})
export class WageExtComponent extends WageComponent {
  coreButtonGroupService = inject(CoreButtonGroupService);
  dataButtonPrints : ICoreButtonDropdownOption[] = []




  override ngAfterViewInit(): void {
    const filter = this.columns.filter(c => c.field === 'avatar');
    if (!!filter.length) filter[0].templateRef = this.avatar;
    const stickerFilter = this.columns.filter(c => c.field === 'statusName');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;

    setTimeout(() => {
      this.subscriptions.push(
        this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "WAGE_INFORMATION_PRINTING_FORM").subscribe(x => {
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


  
   override onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_PRINT:
        let filename= '';
        this.http.get(api.HU_DECISION_FILE_NAME+this.id.toString()).subscribe((response: any) => {
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
            link.setAttribute('download', filename+'.doc');
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
                this.alertService.error(data.messageCode, this.alertOptions);
              }
            };
            reader.readAsText(response);
          }

        });
        break;
      case EnumCoreButtonVNSCode.HEADER_UPDATE:
        this.evaluateDialogService.createNew(EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATE_UPDATE_DATA, undefined, undefined, undefined,
          EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATE_INPUT_REASON, undefined, false, true,)
        break;

      case EnumCoreButtonVNSCode.HEADER_DROPDOWN_PRINT:
        
      if (this.selectedIds.length > 1) {
        this.alertService.warn(this.mls.trans('PRINT_ONE_RECORD'), this.alertOptions);
        return;
      } else if(this.selectedIds.length == 0){
        this.alertService.warn(this.mls.trans(EnumTranslateKey.REPORT_SELECTED_NOT_NULL), this.alertOptions);
        return;
      }
      else {
        const fileName = e.childCodeClicked;
        const request = {
          fileName : fileName,
          id : this.selectedIds[0],
          viewName : "WAGE"
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
    }
  }

}
