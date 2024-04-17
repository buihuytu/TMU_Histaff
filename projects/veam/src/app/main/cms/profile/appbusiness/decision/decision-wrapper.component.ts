import { HttpClient } from '@angular/common/http';
import { Component, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AlertService, AuthService, BaseComponent, CoreButtonGroupVnsComponent, CoreOrgTreeComponent, CorePageListComponent, CorePageListService, CoreStatusStickerComponent, DecisionComponent, EnumCoreButtonVNSCode, EnumSortDirection, FullscreenModalLoaderComponent, ICoreButtonVNS, IImportXlsxToDbRequest, IXlsxImportObject, LongTaskService, MultiLanguageService, OrganizationService, RandomAvatarService, alertOptions, noneAutoClosedAlertOptions } from 'ngx-histaff-alpha';

declare let coreFileUtils: any;
const { blobToBase64 } = coreFileUtils;
@Component({
  selector: 'app-decision-wrapper',
  templateUrl: './decision-wrapper.component.html',
  styleUrl: './decision-wrapper.component.scss'
})
export class DecisionWrapperComponent extends DecisionComponent  {
  longApiRunning!: boolean
  override id: any;
  override selectedData!: any[];
  override corePageListInstanceNumber!: number;
  importPreviewPath!: string;

  selectedIds!: number[];

  loading!: boolean;

  constructor(
    public override mls: MultiLanguageService,
    public override ras: RandomAvatarService,
    private router: Router,
    private route: ActivatedRoute,
    public override organizationService: OrganizationService,
    private http: HttpClient,
    private alertService: AlertService,
    private corePageListService: CorePageListService,
    private longTaskService: LongTaskService,
    private authService: AuthService,


  ) {
    super(mls, ras,organizationService);
    this.corePageListInstanceNumber = new Date().getTime();
  }

   override onCorePageHeaderButtonClickLocal(e: any): void {

    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
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

          this.loading = true;

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
                
                link.setAttribute('download', filename + '.docx');
                
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

              this.loading = false;
            });
        }

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

   override onRowClickLocal(e: any): void {
    this.id = e;
  }

  override onSelectedDataChangeLocal(e: any) {
    this.selectedData = e;
    console.log(this.selectedData)

    this.selectedIds = this.selectedData.map(x => x.id);
  }
   customizeSelectedIdsChange(e: number[]): void {
    this.selectedIds = e;
  }

  onProgressWindowClose(_: any) {
    this.longApiRunning = false;
  }
  inputFile = async (e: any) => {
    const files = e.target.files;
    const file = files[0];
    let fileName = file.name;
      const blob = new Blob([file]);
      this.mls.lang$.subscribe(x => {
        this.lang = x;
        this.generateTemplateRequest = {
          exCode: 'HU_WORKING',
          lang: x
        }
      })
      this.importPreviewPath = 'decision-import'
      blobToBase64(blob).then((base64: any) => {

        // Nếu tham số generateTemplateRequest được truyền vào
        // Import sẽ thực thi theo quy trình Core
        if (this.generateTemplateRequest) {
          const importXlsxToDbRequest: IImportXlsxToDbRequest = {
            fileName,
            exCode: this.generateTemplateRequest.exCode,
            base64String: base64
          }
          this.longApiRunning = true;
          this.subscriptions.push(
            this.corePageListService.importXlsxToDb(importXlsxToDbRequest).subscribe(x => {
              const session = Number(this.longTaskService.data$.value?.outerMessage);
              this.longApiRunning = false;
              if (x.ok && x.status === 200) {
                let downloadLink = document.createElement("a");
                downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
                fileName = fileName.split(".xlsx")[0] + "_processed_" + new Date().getTime() + ".xlsx";
                downloadLink.setAttribute("download", fileName);
                document.body.appendChild(downloadLink);
                downloadLink.click();

                const importPreviewOuterParam: IXlsxImportObject = {
                  xlsxSid: this.authService.data$.value?.id!,
                  xlsxExCode: this.generateTemplateRequest.exCode,
                  xlsxSession: session
                }

                if (!!!this.importPreviewPath) {

                  if (isDevMode()) {
                    this.alertService.error("'importPreviewPath' input property was missing!", noneAutoClosedAlertOptions);
                  }

                } else {


                  this.router.navigate(
                    [
                      {
                        outlets: {
                          corePageListAux: [
                            this.importPreviewPath,
                            { listInstance: this.corePageListInstanceNumber },
                          ],
                        },
                      },
                    ],
                    {
                      relativeTo: this.route, state: {
                        session,
                        importPreviewOuterParam
                      }
                    }
                  );

                }
              }
            })
          )

        }

      });
  };

}
