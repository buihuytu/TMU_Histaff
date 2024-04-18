import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { api } from 'alpha-global-constants';
import { BaseComponent, IAlertOptions, MultiLanguageService, LayoutService, AuthService, AppService, RandomAvatarService, AlertService, ResponseService, UrlService, IFormatedResponse } from 'ngx-histaff-alpha';
import { CurriculumService } from './curriculum.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent extends BaseComponent implements OnInit {
  defaultAvatar!: any
  data: any;
  dataApproving: any[] = [];
  dataSave: any[] = [];
  id!: number;
  modelChange!: string;
  title!: string;
  dataUnapprove: any[] = [];
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
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private ras: RandomAvatarService,
    private curriculumService: CurriculumService,
    private alertService: AlertService,
    private responseService: ResponseService,
    public urlService: UrlService,

  ) {
    super(mls);
    this.defaultAvatar = ras.get();
    this.instanceNumber = new Date().getTime()
    if (this.router.getCurrentNavigation()?.extras?.state) {


      this.modelChange = this.router.getCurrentNavigation()?.extras?.state!['modelChange']
      this.title = this.router.getCurrentNavigation()?.extras?.state!['title']

      this.id = this.router.getCurrentNavigation()?.extras?.state!['id']
    }
    urlService.currentRouteUrl$.next('/profile/staff-profile')
  }

  override ngOnInit(): void {
    this.urlService.previousRouteUrl$.next('/profile/staff-profile');
  }

  clickBtnEdit(e: any) {
    // this.curriculumService.curriculumId = e.id;
    this.router.navigateByUrl('/profile/staff-profile/curriculum/curriculum-edit')
  }
  clickBtnSaveEdit(e: any) {
    this.curriculumService.curriculumId = e.id;
    this.router.navigateByUrl('/profile/staff-profile/curriculum/curriculum-edit')

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
                this.dataSave = this.dataSave.filter(x => x.id !== e.id);
                this.dataUnapprove = this.dataUnapprove.filter(x => x.id !== e.id);

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

  ngAfterViewInit() {

    setTimeout(() => {



      if (!!this.id) {

          this.appService.get(api.HU_EMPLOYEE_GET_CURRICULUM_BY_ID_CORRECT + `?id=${this.id}`).subscribe((x: any) => {
            if (x.ok && x.status === 200) {
  
              const body: IFormatedResponse = x.body;
              this.data = body.innerBody
              if (!this.modelChange) {
  

                  let labels = document.querySelectorAll('.text-content')
                  let checkboxs = document.querySelectorAll('.checkmark')
                  labels.forEach((label: any) => {
                    label.style.color = '#2C71FF'
                  })
                  checkboxs.forEach((checkbox: any) => {
                    checkbox.style.backgroundColor = '#2C71FF'
                  })

  
              } else if (this.modelChange) {

                  let listChange = this.modelChange.split(';')
                  listChange.forEach((x: any) => {
                    let item = document.querySelector(`.${x}`) as any
                    if (!!item) {
                      item.style.setProperty("color", "#2C71FF", "important");
                    }
                  })
  

              }
            }
  
          })

      } else {
        this.subscriptions.push(
          this.appService.get(api.HU_EMPLOYEE_GET_CURRICULUM + `${this.authService.data$.value?.employeeId!}&time=${this.instanceNumber}`).subscribe(x => {
            const body: IFormatedResponse = x.body
            if (body.statusCode === 200) {
              this.data = body.innerBody
              console.log(this.data);
            }
          })!,
  
          this.mls.lang$.subscribe(x => this.lang = x)!,
  
          this.appService.get(api.HU_EMPLOYEE_GET_CURRICULUM_APPROVING + `${this.authService.data$.value?.employeeId!}&time=${this.instanceNumber}`).subscribe(x => {
            const body: IFormatedResponse = x.body
            if (body.statusCode === 200) {
              this.dataApproving = body.innerBody
              console.log(this.dataApproving);
  
            }
          })!,
  
          this.appService.get(api.HU_EMPLOYEE_GET_CURRICULUM_BY_EMPLOYEE_ID + `?employeeId=${this.authService.data$.value?.employeeId}&time=${this.instanceNumber}`).subscribe(x => {
            const body: IFormatedResponse = x.body
            if (body.statusCode === 200) {
              this.dataSave = body.innerBody
              console.log(this.dataSave);
            }
          })!,
  
          this.appService.get(api.HU_EMPLOYEE_GET_CURRICULUM_UNAPPROVE_BY_ID + `?employeeId=${this.authService.data$.value?.employeeId}&time=${this.instanceNumber}`).subscribe(x => {
            const body: IFormatedResponse = x.body
            if (body.statusCode === 200) {
              this.dataUnapprove = body.innerBody
              console.log(this.dataUnapprove);
            }
          })
        )
      }





    })






  }

}
