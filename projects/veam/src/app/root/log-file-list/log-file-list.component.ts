import { AfterViewInit, Component, inject } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AlertService, AppService, BaseComponent, DialogService, IFormatedResponse, alertOptions } from 'ngx-histaff-alpha';
import { BehaviorSubject, buffer, debounceTime, filter, map } from 'rxjs';

@Component({
  selector: 'app-log-file-list',
  templateUrl: './log-file-list.component.html',
  styleUrl: './log-file-list.component.scss'
})
export class LogFileListComponent extends BaseComponent implements AfterViewInit {
  title: EnumTranslateKey = EnumTranslateKey.UI_LOG_FILE_LIST
  appService = inject(AppService);
  dialogService = inject(DialogService);
  alertService= inject(AlertService);

  files: string[] = [];
  fileClick$ = new BehaviorSubject<{ fileName: string }>({
    fileName: ""
  })

  pendingFileName: string = "";

  ngAfterViewInit(): void {
    setTimeout(() => {

      this.subscriptions.push(
        this.dialogService.dialogConfirmed$.pipe( filter(x => !!x && !!this.pendingFileName ) ).subscribe(_ => {
          this.subscriptions.push(
            this.appService.blobPost(api.FILE_FILE_DOWNLOAD, { parentFolder: 'logs', fileName: this.pendingFileName }).subscribe(x => {

              if (x.ok && x.status === 200) {
                let downloadLink = document.createElement("a");
                downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
                downloadLink.setAttribute("download", this.pendingFileName);
                document.body.appendChild(downloadLink);
                downloadLink.click();
              } else {
                this.alertService.error(x.message || "An error occured", alertOptions);
              }

              console.log("blobPost: ", x)

              this.pendingFileName = "";
            })
          )
        })
      )

      this.subscriptions.push(
        this.appService.get(api.FILE_LOG_FILE_LIST).subscribe(x => {
          if (x.ok && x.status === 200 && x.body?.statusCode === 200) {
            this.files = (x.body as IFormatedResponse).innerBody
          }
        })
      )

      this.subscriptions.push(
        this.fileClick$.pipe(
          buffer(this.fileClick$.pipe(debounceTime(200))),
          map(x => {
            return { fileName: x[0].fileName, length: x.length }
          }),
          filter(x => x.length === 2)
        ).subscribe(x => {
          this.pendingFileName = x.fileName;
          this.dialogService.createNew(undefined, undefined, undefined, undefined,
            EnumTranslateKey.UI_CORE_DIALOG_COMFIRM_DO_YOU_WANT_TO_DOWNLOAD, [
              x.fileName
            ]
          );

        })
      )

    })
  }

  onFileClick(e: any, file: string) {
    this.fileClick$.next({ fileName: file })
  }
}
