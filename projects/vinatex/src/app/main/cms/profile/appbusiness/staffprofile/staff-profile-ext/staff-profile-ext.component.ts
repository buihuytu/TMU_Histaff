import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AppService, CoreButtonGroupService, CoreOrgTreeComponent, CorePageListComponent, EnumCoreButtonVNSCode, FullscreenModalLoaderComponent, ICoreButtonDropdownOption, ICoreButtonVNS, MapAvatarToServerPipe, StaffProfileComponent, alertOptions } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-staff-profile-ext',
  standalone: true,
  imports: [
    CommonModule,
    CorePageListComponent,
    CoreOrgTreeComponent,
    FormsModule,
    MapAvatarToServerPipe,
    FullscreenModalLoaderComponent
  ],
  templateUrl: './staff-profile-ext.component.html',
  styleUrl: './staff-profile-ext.component.scss'
})
export class StaffProfileExtComponent extends StaffProfileComponent {

  coreButtonGroupService = inject(CoreButtonGroupService);
  appService = inject(AppService)

  dataButtonPrints : ICoreButtonDropdownOption[] = []
  // dataButtonPrint! : ICoreButtonDropdownOption
  override ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'avatar')[0].templateRef =
      this.avatar;

    setTimeout(() => {
      this.subscriptions.push(
        this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "PROFILE_INFORMATION_PRINTING_FORM").subscribe(x => {
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

  override onCorePageHeaderButtonClick(e : ICoreButtonVNS){
    switch(e.code ){
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        this.router.navigate(['app-staff-profile-edit'], {
          relativeTo: this.route,
        });
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        this.router.navigate([btoa(this.id.toString())], {
          relativeTo: this.route,
          
        });
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
        this.loading = true;
        const request = {
          fileName : fileName,
          id : this.selectedIds[0],
          viewName : "EMPLOYEE"
        }
        this.appService
          .blobPost(api.EXPORT_WORD_BY_TEMPLATE,request)
          .subscribe((x: any) => {
            let downloadLink = document.createElement("a");
            downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
            downloadLink.setAttribute("download", fileName +'.doc');
            document.body.appendChild(downloadLink);
            downloadLink.click();
            this.loading = false;
          });
      }
      break;
      default:
      break;
    }
  }

}
