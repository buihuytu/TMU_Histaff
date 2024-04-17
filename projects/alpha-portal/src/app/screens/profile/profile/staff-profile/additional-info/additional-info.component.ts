import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { api } from 'alpha-global-constants';
import { BaseComponent, IAlertOptions, MultiLanguageService, LayoutService, AppService, AuthService, AlertService, ResponseService, UrlService, IFormatedResponse } from 'ngx-histaff-alpha';
import { Subscription } from 'rxjs';
import { TransportDataService } from './transport-data.service';


@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss']
})
export class AdditionalInfoComponent extends BaseComponent {
  listAdditionalInfo: any;
  listAdditionalInfoApproving: any[] = [];
  listAdditionalInfoSave: any[] = [];
  listAdditionalInfoUnapprove: any[] = []
  override subscriptions: Subscription[] = [];
  override lang = 'vi';
  id!: number;
  modelChange!: string;
  title!: string;
  loading: boolean = false;
  realTime!: number;
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: false,
    timeClose:5000,
  };
  constructor(public override mls: MultiLanguageService,
    private layoutService: LayoutService,
    private appService: AppService,
    private authService: AuthService,
    private router: Router,
    private transportDataService: TransportDataService,
    private alertService : AlertService,
    private responseService: ResponseService,
    private urlService: UrlService
  ) {
    super(mls)
    if (this.router.getCurrentNavigation()?.extras?.state) {
      this.id = this.router.getCurrentNavigation()?.extras?.state!['id']
      this.modelChange = this.router.getCurrentNavigation()?.extras?.state!['modelChange']
      this.title = this.router.getCurrentNavigation()?.extras?.state!['title']
    }
    this.realTime = new Date().getTime();
    urlService.currentRouteUrl$.next('/profile/staff-profile')
  }

  override ngOnInit(): void {

    this.subscriptions.push(
      this.appService.get(api.HU_EMPLOYEE_GET_ADDITIONAL_INFO_BY_EMPLOYEE_ID + `?employeeId=${this.authService.data$.value?.employeeId}&?time=${this.realTime}`)
        .subscribe(x => {
          if (x.ok && x.status === 200 && x.body?.statusCode === 200) {
            const body: IFormatedResponse = x.body;
            this.listAdditionalInfo = body.innerBody;
          }
        })
    )
    this.subscriptions.push(
      this.appService.get(api.HU_EMPLOYEE_GET_ADDITIONAL_INFO_APPROVING_BY_EMPLOYEE_ID + `?employeeId=${this.authService.data$.value?.employeeId}&?time=${this.realTime}`)
        .subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            this.listAdditionalInfoApproving = body.innerBody;
            console.log(this.listAdditionalInfoApproving);

          }
        })
    )
    this.subscriptions.push(
      this.appService.get(api.HU_EMPLOYEE_GET_ADDITIONAL_INFO_SAVE_BY_EMPLOYEE_ID + `?employeeId=${this.authService.data$.value?.employeeId}&?time=${this.realTime}`)
        .subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            this.listAdditionalInfoSave = body.innerBody;

          }
        })
    )
    this.subscriptions.push(
      this.appService.get(api.HU_EMPLOYEE_CV_EDIT_CV_ADDITIONAL_INFO_GET_UNAPPROVE + `?employeeId=${this.authService.data$.value?.employeeId}&?time=${this.realTime}`)
        .subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            this.listAdditionalInfoUnapprove = body.innerBody;
            console.log(this.listAdditionalInfoUnapprove);


          }
        })
    )
  }
  clickBtnEdit(e: any) {
    this.router.navigateByUrl('/profile/staff-profile/additional-info/additional-info-edit')
    // this.transportDataService.transportData$.next(e);
  }
  clickBtnSaveEdit(e: any) {
    this.transportDataService.addtionalInfoId = e.id;
    this.router.navigateByUrl('/profile/staff-profile/additional-info/additional-info-edit')

  }
  clickBtnDelete(e: any) {
    const confirm = window.confirm(
      this.mls.trans('common.confirm.delete.prefix') + '?'
    );
    if (confirm) {
      this.loading = true;
      this.subscriptions.push(
        this.appService.post(api.HU_EMPLOYEE_CV_EDIT_CV_DELETE, e)
          .subscribe((x) => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                this.alertService.info(
                  this.mls.trans('DELETE_SUCCESS'),
                  this.alertOptions,
                );
                this.listAdditionalInfoUnapprove = [],
                this.listAdditionalInfoSave = []

              } else {
                this.responseService.resolve(body);
              }
            } else {
              this.alertService.error(JSON.stringify(x), this.alertOptions);
            }
            this.loading = false;
          })
      );
    }
  }
  ngAfterViewInit() {
    if (!!this.id) {
      setTimeout(() => {
        this.appService.get(api.HU_EMPLOYEE_GET_ADDITIONAL_INFO_SAVE_BY_EMPLOYEE_ID_EDIT + this.id).subscribe((x: any) => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            this.listAdditionalInfo = body.innerBody
            debugger
            if (!this.modelChange) {

              setTimeout(() => {
                let labels = document.querySelectorAll('.label-content')
                let checkboxs = document.querySelectorAll('.checkmark')
                labels.forEach((label: any) => {
                  label.style.color = '#2C71FF'
                })
                checkboxs.forEach((checkbox: any) => {
                  checkbox.style.backgroundColor = '#2C71FF'
                })
              }, 100)

            } else if (this.modelChange) {
              setTimeout(() => {
                let listChange = this.modelChange.split(';')
                listChange.forEach((x: any) => {
                  let item = document.querySelector(`.${x}`) as any
                  if (!!item) {
                    item.style.setProperty("color", "#2C71FF", "important");
                  }
                })

              }, 100)
            }
          }

        })
      })
    }
  }
}
