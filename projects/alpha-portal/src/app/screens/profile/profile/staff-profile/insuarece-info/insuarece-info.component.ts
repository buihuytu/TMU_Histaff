import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { api } from 'alpha-global-constants';
import { BaseComponent, IAlertOptions, MultiLanguageService, LayoutService, AppService, AuthService, AlertService, ResponseService, UrlService, IFormatedResponse } from 'ngx-histaff-alpha';
import { Subscription } from 'rxjs';
import { InsuarenceInfoService } from './insuarence-info-edit.service';

@Component({
  selector: 'app-insuarece-info',
  templateUrl: './insuarece-info.component.html',
  styleUrls: ['./insuarece-info.component.scss']
})
export class InsuareceInfoComponent extends BaseComponent {
  listInsuarenceInfo: any;
  listInsuarenceInfoApproving: any;
  listInsuarenceInfoSave!: any[];
  loading: boolean = false;
  
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: false,
    timeClose:5000,
  };
  constructor(public override mls: MultiLanguageService,
    private layoutService: LayoutService,
    private appService: AppService,
    private authService : AuthService,
    private router: Router,
    private insuarenceInfoService: InsuarenceInfoService,
    private alertService: AlertService,
    private responseService: ResponseService,
    private urlService: UrlService
    ){
      super(mls);
      urlService.currentRouteUrl$.next('/profile/staff-profile')
    }
  override subscriptions: Subscription[] = [];
  override ngOnInit(): void {
    this.subscriptions.push(
      this.appService.get(api.HU_EMPLOYEE_CV_EDIT_INSUARENCE_INFO_BY_EMPLOYEE_ID + `?employeeId=${this.authService.data$.value?.employeeId}`)
        .subscribe(x => {
          if(x.ok && x.status === 200){
            const body: IFormatedResponse = x.body;
            if(body.statusCode === 200){
              this.listInsuarenceInfo = body.innerBody
            }
          }
        })
    )
    this.subscriptions.push(
      this.appService.get(api.HU_EMPLOYEE_CV_EDIT_INSUARENCE_INFO_APPROVING + `?employeeId=${this.authService.data$.value?.employeeId}`)
        .subscribe(x => {
          if(x.ok && x.status === 200){
            const body: IFormatedResponse = x.body;
            if(body.statusCode === 200){
              this.listInsuarenceInfoApproving = body.innerBody
            }
          }
        })
    )
    this.subscriptions.push(
      this.appService.get(api.HU_EMPLOYEE_CV_EDIT_INSUARENCE_INFO_GET_ALL_SAVE + `?employeeId=${this.authService.data$.value?.employeeId}`)
        .subscribe(x => {
          if(x.ok && x.status === 200){
            const body: IFormatedResponse = x.body;
            if(body.statusCode === 200){
              this.listInsuarenceInfoSave = body.innerBody
            }
          }
        })
    )
  }

  clickBtnEdit(e: any){
    this.router.navigateByUrl('/profile/staff-profile/ins-info/ins-info-edit')
  }
  
  clickBtnSaveEdit(e: any){
    this.insuarenceInfoService.insurenceId = e.id;
    this.router.navigateByUrl('/profile/staff-profile/ins-info/ins-info-edit')
  }
  clickBtnDelete(id: number){
    const confirm = window.confirm(
      this.mls.trans('common.confirm.delete.prefix') + '?'
    );
    if (confirm) {
      this.loading = true;
      this.subscriptions.push(
        this.appService.post(api.PORTAL_HU_FAMILY_EDIT_DELETE_IDS, {ids:[id]})
          .subscribe((x) => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                this.alertService.info(
                  this.mls.trans('DELETE_SUCCESS'),
                  this.alertOptions,
                );
                this.listInsuarenceInfoSave = this.listInsuarenceInfoSave.filter(x=> x.id !==id);
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
      this.alertService.error(`Select Range Date to Delete!!!`, this.alertOptions);
    }
  }
}
