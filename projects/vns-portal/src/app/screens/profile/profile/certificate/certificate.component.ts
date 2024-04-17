import { AfterViewInit, Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

import { CertificateService } from "./certificate.service";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICoreButtonVNS, EnumCoreButtonVNSCode, EnumStyleButtonClass, IAlertOptions, MultiLanguageService, LayoutService, AppService, AuthService, AlertService, ResponseService, UrlService, IAuthData, IFormatedResponse } from "ngx-histaff-alpha";
import { FamilyInfoSerivce } from "../family-info/family-info.service";
@Component({
  selector: "app-certificate",
  templateUrl: "./certificate.component.html",
  styleUrls: ["./certificate.component.scss"],
})
export class CertificateComponent extends BaseComponent implements AfterViewInit {
  //override lang = 'vi'
  button: ICoreButtonVNS[] = [
    {
      code: EnumCoreButtonVNSCode.CREATE,
      styleClass: EnumStyleButtonClass.ADD,
      caption: EnumTranslateKey.UI_EDIT_FORM_BUTTON_ADD,
      isHeader: true,
    },
  ];
  buttonItem: EnumCoreButtonVNSCode[] = [EnumCoreButtonVNSCode.EDIT];

  override lang!: string;
  checkedContent: boolean = true;
  checkData: boolean = true;
  loading!: boolean;
  employeeId!: number;
  listData!: any[];
  certificate!: any[];
  listCertificateIsApprove: any[] = [];
  listCertificateRefuse: any[] = [];
  listCertificateIsSave: any[] = [];
  listCertificateUnapprove: any[] = [];
  idState!: number;
  dataChangeOnState!: any[]; //data change or added from user

  id!: number; //when click on notification
  modelChange!: string //when edit and SEND APPROVE
  title!: string //when reject
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000,
  };
  constructor(
    public override mls: MultiLanguageService,
    private layoutService: LayoutService,
    private appService: AppService,
    private authService: AuthService,
    private familyInfoService: FamilyInfoSerivce,
    private router: Router,
    private alertService: AlertService,
    private responseService: ResponseService,
    private certificateService: CertificateService,
    private urlService: UrlService
  ) {
    super(mls);
    this.layoutService.clickEdit$.next(this.button);
    urlService.currentRouteUrl$.next('/profile')
    if (this.router.getCurrentNavigation()?.extras?.state) {
      this.id = this.router.getCurrentNavigation()?.extras?.state!['id']
      this.modelChange = this.router.getCurrentNavigation()?.extras?.state!['modelChange']
      this.title = this.router.getCurrentNavigation()?.extras?.state!['title']
    }
  }


  override ngOnInit(): void {
    this.authService.data$.subscribe((x: IAuthData | null) => this.employeeId = x?.employeeId!),
      this.subscriptions.push(
        this.appService.get(api.PORTAL_CERTIFICATE_GET_LIST_CERTIFICATE + `?employeeId=${this.employeeId}`)//list ban ghi goc
          .subscribe(x => {
            const body: IFormatedResponse = x.body;
            if (x.ok && x.status === 200) {
              this.certificate = body.innerBody;
            }
          })
      )

    // this.subscriptions.push(
    //   this.appService.get(api.HU_CERTIFICATE_PORTAL_READ_GET_IS_APPROVE + `?employeeId=${this.employeeId}`)
    //     .subscribe(x => {
    //       const body: IFormatedResponse = x.body;
    //       if (x.ok && x.status === 200) {
    //         this.listCertificateIsApprove = body.innerBody;
    //       }
    //     })
    // )

    this.subscriptions.push(
      this.appService.get(api.HU_CERTIFICATE_PORTAL_READ_GET_IS_SAVE + `?employeeId=${this.employeeId}`)//list save
        .subscribe(x => {
          const body: IFormatedResponse = x.body;
          if (x.ok && x.status === 200) {
            this.listCertificateIsSave = body.innerBody;
          }
        })
    )

    this.subscriptions.push(
      this.appService.get(api.HU_CERTIFICATE_EDIT_QUERY_LIST_REFUSE + `?employeeId=${this.employeeId}`)//list cho duyet
        .subscribe(x => {
          const body: IFormatedResponse = x.body;
          if (x.ok && x.status === 200) {
            this.listCertificateRefuse = body.innerBody;
          }
        })
    )

    this.subscriptions.push(
      this.appService.get(api.HU_CERTIFICATE_EDIT_GET_UNAPPROVE + `?employeeId=${this.employeeId}`)//list tu choi duyet
        .subscribe(x => {
          const body: IFormatedResponse = x.body;
          if (x.ok && x.status === 200) {
            this.listCertificateUnapprove = body.innerBody;
            //console.log(this.listCertificateUnapprove);

          }
        })
    )
  }

  ngAfterViewInit() {
    if (!!this.id) {
      setTimeout(() => {
        if (this.id) {
          this.subscriptions.push(
            this.appService.get(api.HU_CERTIFICATE_PORTAL_GET_BY_ID + this.id).subscribe((x: any) => {
              if (!!x && x.body.statusCode == 200) {
                this.dataChangeOnState = x.body.innerBody
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

          )
        }

      })
    }
  }

  override ngOnDestroy(): void {
    this.layoutService.clickEdit$.next([]);
  }
  onButtonClick(e: any) {
  }

  clickBtnEdit(e: any) {
    this.certificateService.certificateId = e.id;
    this.router.navigateByUrl('/profile/certificate/certificate-edit');
  }
  clickBtnSaveEdit(e: any) {
    this.certificateService.certificateEditId = e.id;
    this.router.navigateByUrl('/profile/certificate/certificate-edit');

  }
  clickBtnDelete(id: number) {
    const confirm = window.confirm(
      this.mls.trans('common.confirm.delete.prefix') + '?'
    );
    if (!!confirm) {
      this.loading = true;
      this.subscriptions.push(
        this.appService.post(api.HU_CERTIFICATE_EDIT_DELETE_BY_ID, { ids: [id] })
          .subscribe((x) => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                this.alertService.info(
                  this.mls.trans('DELETE_SUCCESS'),
                  this.alertOptions,
                );
                //this.router.navigateByUrl('/profile/certificate')
                this.listCertificateIsSave = this.listCertificateIsSave.filter(x => x.id !== id);
                this.listCertificateRefuse = this.listCertificateRefuse.filter(x => x.id !== id);
                this.listCertificateUnapprove = this.listCertificateUnapprove.filter(x => x.id !== id);
                //this.dataChangeOnState = this.dataChangeOnState.filter(x=> x.id !==id);

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

}