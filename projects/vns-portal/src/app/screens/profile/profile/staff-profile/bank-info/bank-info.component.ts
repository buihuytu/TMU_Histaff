import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { api } from 'alpha-global-constants';
import { BaseComponent, IAlertOptions, MultiLanguageService, LayoutService, AppService, AuthService, AlertService, ResponseService, UrlService, IAuthData, IFormatedResponse } from 'ngx-histaff-alpha';
import { Subscription } from 'rxjs';
import { BankInfoService } from './bank-info.service';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss']
})
export class BankInfoComponent extends BaseComponent implements AfterViewInit {
  override subscriptions!: Subscription[];
  listBankInfo: any;
  listBankInfoApproving: any[] = [];
  listBankInfoSave: any[] = [];
  listBankInfoUnapprove: any[] = [];
  employeeId!: number;
  id!: number;
  modelChange!: string;
  title!: string;
  loading: boolean = false;
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: false,
    timeClose: 5000,
  };
  instanceNumber!: number;
  constructor(
    public override mls: MultiLanguageService,
    private layoutService: LayoutService,
    private appService: AppService,
    private router: Router,
    private authService: AuthService,
    private bankInfoService: BankInfoService,
    private alertService: AlertService,
    private responseService: ResponseService,
    private urlService: UrlService) {
    super(mls)
    if (this.router.getCurrentNavigation()?.extras?.state) {

      this.id = this.router.getCurrentNavigation()?.extras?.state!['id']
      this.modelChange = this.router.getCurrentNavigation()?.extras?.state!['modelChange']
      this.title = this.router.getCurrentNavigation()?.extras?.state!['title']

    }
    this.instanceNumber = new Date().getTime();
    urlService.currentRouteUrl$.next('/profile/staff-profile')
  }
  override ngOnInit(): void {
    this.authService.data$.subscribe((x: IAuthData | null) => this.employeeId = x?.employeeId!)
  }

  ngAfterViewInit(): void {
    if (!!this.id) {
      setTimeout(() => {
        this.appService.get(api.HU_EMPLOYEE_CV_EDIT_BANK_INFO_INFO_GET_SAVE_BY_ID_2 + this.id).subscribe((x: any) => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            this.listBankInfo = body.innerBody
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
      }, 100)
    }
    else {
      this.subscriptions.push(
        this.appService.get(api.HU_EMPLOYEE_GET_BANK_INFO_BY_EMPLOYEE_ID + `?employeeId=${this.employeeId}&time=${this.instanceNumber}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              this.listBankInfo = body.innerBody

              console.log(this.listBankInfo);

            }
          })
      )

      this.subscriptions.push(
        this.appService.get(api.HU_EMPLOYEE_GET_BANK_INFO_APPROVING_BY_EMPLOYEE_ID + `?employeeId=${this.employeeId}&time=${this.instanceNumber}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.innerBody.length > 0)
                this.listBankInfoApproving.push(body.innerBody[0]);
              console.log(body.innerBody);

            }
          })
      )

      this.subscriptions.push(
        this.appService.get(api.HU_EMPLOYEE_CV_EDIT_BANK_INFO_GET_ALL_SAVE + `?employeeId=${this.employeeId}&time=${this.instanceNumber}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.innerBody.length > 0)
                this.listBankInfoSave.push(body.innerBody[0]);
              console.log(body.innerBody);

            }
          })
      )
      this.subscriptions.push(
        this.appService.get(api.HU_EMPLOYEE_CV_EDIT_BANK_INFO_GET_UNAPPROVE + `?employeeId=${this.employeeId}&time=${this.instanceNumber}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.innerBody.length > 0)
                this.listBankInfoUnapprove = body.innerBody;
              console.log(body.innerBody);

            }
          })
      )
    }
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
                this.listBankInfoUnapprove = this.listBankInfoUnapprove.filter(x => x.id !== e.id);
                this.listBankInfoSave = this.listBankInfoSave.filter(x => x.id !== e.id);
              } else {
                this.responseService.resolve(body);
              }
            } else {
              this.alertService.error(JSON.stringify(x), this.alertOptions);
            }
            this.loading = false;
          })
      );
    } else {
      // this.alertService.error(`Select Range Date to Delete!!!`, this.alertOptions);
    }
  }
  clickBtnEdit(e: any) {
    this.bankInfoService.bankInfoId = 0;
    this.router.navigateByUrl('/profile/staff-profile/bank-info/bank-info-edit')
  }
  clickBtnSaveEdit(e: any) {
    this.bankInfoService.bankInfoId = e.id;
    this.router.navigateByUrl('/profile/staff-profile/bank-info/bank-info-edit');
  }

}
