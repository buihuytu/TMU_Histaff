import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { api } from 'alpha-global-constants';
import { BaseComponent, IAlertOptions, MultiLanguageService, LayoutService, AppService, AuthService, AlertService, ResponseService, UrlService, IFormatedResponse } from 'ngx-histaff-alpha';
import { Subscription } from 'rxjs';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends BaseComponent {
  override subscriptions: Subscription[] = [];
  listContactInfo: any;
  listContactInfoApproving: any[] =[];
  listContactInfoSave: any[]=[];
  listContactInfoUnapprove: any[]=[];
  id!: number;
  modelChange!: string;
  title!: string;
  loading: boolean = false;
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: false,
    timeClose:5000,
  };
  constructor(public override mls: MultiLanguageService,
    private layoutService: LayoutService,
    private appService: AppService,
    private router: Router,
    private authService: AuthService,
    private contactService: ContactService,
    private alertService : AlertService,
    private responseService: ResponseService,
    private urlService: UrlService) {
    super(mls);
    if (this.router.getCurrentNavigation()?.extras?.state) {
      this.id = this.router.getCurrentNavigation()?.extras?.state!['id']
      this.modelChange = this.router.getCurrentNavigation()?.extras?.state!['modelChange']
      this.title = this.router.getCurrentNavigation()?.extras?.state!['title']
    }
    urlService.currentRouteUrl$.next('/profile/staff-profile')
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.appService.get(api.HU_EMPLOYEE_GET_CONTACT_BY_EMPLOYEE_ID + `?employeeId=${this.authService.data$.value?.employeeId}`)
        .subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            this.listContactInfo = body.innerBody
          }
        })
    )
    this.subscriptions.push(
      this.appService.get(api.HU_EMPLOYEE_GET_CONTACT_APPROVING_BY_EMPLOYEE_ID + `?employeeId=${this.authService.data$.value?.employeeId}`)
        .subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            this.listContactInfoApproving = body.innerBody
            console.log(this.listContactInfoApproving);

          }
        })
    )
    this.subscriptions.push(
      this.appService.get(api.HU_EMPLOYEE_CV_EDIT_CONTACT_INFO_GET_ALL_SAVE + `?employeeId=${this.authService.data$.value?.employeeId}`)
        .subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            this.listContactInfoSave = body.innerBody
            console.log(this.listContactInfoSave);

          }
        })
    )
    this.subscriptions.push(
      this.appService.get(api.HU_EMPLOYEE_CV_EDIT_CV_CONTACT_GET_UNAPPROVE + `?employeeId=${this.authService.data$.value?.employeeId}`)
        .subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            this.listContactInfoUnapprove = body.innerBody
            console.log(this.listContactInfoUnapprove);

          }
        })
    )
  }
  clickBtnEdit(e: any) {
    // console.log(e.id);
    // this.contactService.contactId = e.id;
    this.router.navigateByUrl('/profile/staff-profile/contact/contact-edit')
    // this.contactService.transportData$.next(e);
  }

  clickBtnSaveEdit(e: any) {
    this.contactService.contactId = e.id;
    this.router.navigateByUrl('/profile/staff-profile/contact/contact-edit')
  }
  clickBtnDelete(e: any){
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
                this.listContactInfoUnapprove = []
                
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
  ngAfterViewInit(){
    if(!!this.id){
      setTimeout(() => {
        this.appService.get(api.HU_EMPLOYEE_GET_CONTACT_APPROVING_BY_EMPLOYEE_ID_CORRECT + this.id).subscribe((x : any) => {
          if (x.ok && x.status === 200) {
            
            const body: IFormatedResponse = x.body;
            this.listContactInfo = body.innerBody
            if(!this.modelChange){
                  
              setTimeout(() => {
                let labels = document.querySelectorAll('.text-content')
                let checkboxs = document.querySelectorAll('.checkmark')
                labels.forEach((label : any) => {
                  label.style.color = '#2C71FF'
                })
                checkboxs.forEach((checkbox : any) => {
                  checkbox.style.backgroundColor = '#2C71FF'
                })
              },100)
              
            }else if(this.modelChange){
              setTimeout(() => {
                let listChange = this.modelChange.split(';')
                listChange.forEach((x : any) => {
                  let item = document.querySelector(`.${x}`) as any
                  if(!!item){
                    item.style.setProperty("color", "#2C71FF", "important");
                  }
                })

              },100)
            }
          }

        })
      },100)
    }
  }
}
