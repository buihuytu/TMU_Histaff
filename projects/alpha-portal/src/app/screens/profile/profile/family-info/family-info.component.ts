import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICoreButtonVNS, EnumCoreButtonVNSCode, EnumStyleButtonClass, IAlertOptions, MultiLanguageService, LayoutService, AppService, AuthService, AlertService, ResponseService, UrlService, IAuthData, IFormatedResponse } from 'ngx-histaff-alpha';
import { FamilyInfoSerivce } from './family-info.service';

@Component({
  selector: 'app-family-info',
  templateUrl: './family-info.component.html',
  styleUrls: ['./family-info.component.scss']
})
export class FamilyInfoComponent extends BaseComponent implements AfterViewInit, OnDestroy {
  override lang = 'vi';
  button: ICoreButtonVNS[] = [
    {
      code: EnumCoreButtonVNSCode.CREATE,
      styleClass: EnumStyleButtonClass.ADD,
      caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON_ADD,
      isHeader: true
    }
  ]
  noneButton: ICoreButtonVNS[] = []
  buttonItem: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.EDIT
  ]
  hideEditBtn: boolean = false
  employeeId!: number;
  listFamily!: any[];
  listFamilyEdit!: any[];
  listFamilyEditSave!: any[];
  dataChangeOnState!: any[];
  listInstance!: number;
  id!: number; //when click on notification
  modelChange!: string //when edit and SEND APPROVE
  title!: string //when reject
  realTime!: number;
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: false,
    timeClose: 5000,
  };
  loading: boolean = false;

  constructor(
    public override mls: MultiLanguageService,
    private layoutService: LayoutService,
    private appSerive: AppService,
    private authService: AuthService,
    private familyInfoService: FamilyInfoSerivce,
    private router: Router,
    private alertService: AlertService,
    private responseService: ResponseService,
    private urlService: UrlService
  ) {
    super(mls);
    this.layoutService.clickEdit$.next(this.button)
    if (this.router.getCurrentNavigation()?.extras?.state) {
      this.id = this.router.getCurrentNavigation()?.extras?.state!['id']
      this.modelChange = this.router.getCurrentNavigation()?.extras?.state!['modelChange']
      this.title = this.router.getCurrentNavigation()?.extras?.state!['title']
    }
    this.realTime = new Date().getTime();
    urlService.currentRouteUrl$.next('/profile')
  }
  override ngOnInit(): void {
    this.authService.data$.subscribe((x: IAuthData | null) => this.employeeId = x?.employeeId!),
      this.subscriptions.push(
        this.appSerive.get(api.HU_FAMILY_GET_ALL_FAMILY_BY_EMPLOYEE + `?employeeId=${this.employeeId}&?time=${this.realTime}`)
          .subscribe(x => {
            const body: IFormatedResponse = x.body;
            if (x.ok && x.status === 200) {
              this.listFamily = body.innerBody
              console.log(this.listFamily);

            }
          }),

        this.appSerive.get(api.HU_FAMILY_GET_ALL_FAMILY_EDIT_BY_EMPLOYEE + `?employeeId=${this.employeeId}&?time=${this.realTime}`)
          .subscribe(x => {
            const body: IFormatedResponse = x.body;
            if (x.ok && x.body) {
              this.listFamilyEdit = body.innerBody;
            }
          }),

        this.appSerive.get(api.HU_FAMILY_GET_ALL_FAMILY_EDIT_SAVE_BY_EMPLOYEE + `?employeeId=${this.employeeId}&?time=${this.realTime}`)
          .subscribe(x => {
            const body: IFormatedResponse = x.body;
            if (x.ok && x.body) {
              this.listFamilyEditSave = body.innerBody;
            }
          }),

        this.appSerive.get(api.HU_FAMILY_GET_ALL_FAMILY_EDIT_REFUSE_BY_EMPLOYEE + `?employeeId=${this.employeeId}&?time=${this.realTime}`).subscribe((x: any) => {
          if (!!x && x.body.statusCode == 200) {
            this.dataChangeOnState = x.body.innerBody

          }
        })
      )
  }
  override ngOnDestroy(): void {
    this.layoutService.clickEdit$.next([])

  }
  onButtonClick(e: any) {
  }
  clickBtnEdit(e: any) {
    console.log(e);
    this.familyInfoService.familyId = e.id;
    this.router.navigateByUrl('/profile/family-info/family-info-edit')
    this.familyInfoService.transportData$.next(e);
  }

  clickBtnSaveEdit(e: any) {
    this.familyInfoService.familyEditId = e.id
    this.router.navigateByUrl('/profile/family-info/family-info-edit')

  }
  clickBtnDelete(id: number) {
    const confirm = window.confirm(
      this.mls.trans('common.confirm.delete.prefix') + '?'
    );
    if (confirm) {
      this.loading = true;
      this.subscriptions.push(
        this.appSerive.post(api.PORTAL_HU_FAMILY_EDIT_DELETE_IDS, { ids: [id] })
          .subscribe((x) => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                this.alertService.info(
                  this.mls.trans('DELETE_SUCCESS'),
                  this.alertOptions,
                );
                this.listFamilyEditSave = this.listFamilyEditSave.filter(x => x.id !== id);
                this.dataChangeOnState = this.dataChangeOnState.filter(x => x.id !== id);
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

  ngAfterViewInit(): void {
    if (!!this.id) {
      setTimeout(() => {
        this.appSerive.get(api.PORTAL_HU_FAMILY_EDIT_GET_SAVE_BY_ID_CORRECT + this.id).subscribe((x: any) => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            this.listFamily = body.innerBody
            debugger
            if (!this.modelChange) {

              setTimeout(() => {
                let labels = document.querySelectorAll('.text-content')
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
        this.layoutService.clickEdit$.next(this.noneButton)
        this.hideEditBtn = true
      })
    }
  }


}
