import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TransportDataService } from './transport-data.service';
import { Router } from '@angular/router';
import { AlertService, AppService, AuthService, BaseComponent, CommonHttpRequestService, IAlertOptions, IFormatedResponse, LayoutService, MultiLanguageService, UrlService } from 'ngx-histaff-alpha';
import { api } from 'alpha-global-constants';
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})

export class EducationComponent extends BaseComponent implements OnInit, AfterViewInit {
  // thuộc tính fullName
  // để lưu tên người dùng
  public full_name!: any;

  // thuộc tính employeeId
  // để lưu id của nhân viên
  // lấy từ bảng HU_EMPLOYEE
  public employee_id!: any;


  // giúp làm việc
  // quản lý với luồng dữ liệu "data stream"
  // có câu nói: "Everything is a stream"
  public override subscriptions: Subscription[] = [];


  // thuộc tính checkData
  // để thông báo trạng thái
  // nếu không có dữ liệu về trình độ học vấn thì checkData = true
  // nếu có dữ liệu về trình độ học vấn thì checkData = false
  public checkData: boolean = true;


  // tạo thuộc tính list dữ liệu
  // để hứng dữ liệu trả về từ server
  public listData: any[] = [];
  id!: number;
  modelChange!: string;
  title!: string;
  disableEdit!: boolean;
  instanceNumber!: number;
  constructor(
    /*
      khai báo thuộc tính authService
      để đăng ký lấy dữ liệu
      bằng phương thức .subcribe()

      cụ thể:
      .data$.subcribe()

      vì lúc đăng nhập
      thì nó lấy được employee_id
    */
    private authService: AuthService,


    // thuộc tính commonService
    // có thể dùng để get hoặc post
    // vì mọi người dùng appService
    // nên tôi cũng dùng appService như mọi người
    // dùng appService hay commonService
    // thì cũng như nhau thôi
    private commonService: CommonHttpRequestService,

    private appService: AppService,


    // vận chuyển dữ liệu đến trang edit
    // cái này tôi tự tạo class service
    private transportDataService: TransportDataService,
    private router: Router,


    private alertService: AlertService,
    public override mls: MultiLanguageService,
    private layoutService: LayoutService,
    private urlService: UrlService
  ) {
    super(mls);
    urlService.currentRouteUrl$.next('/profile/staff-profile')


    // sử dụng instanceNumber
    // để lấy thời gian hiện tại
    // giúp cho công việc call api trong Angular 17
    this.instanceNumber = new Date().getTime()


    this.subscriptions.push(
      this.authService.data$.subscribe(
        (x) => {
          // lấy tên
          this.full_name = x?.fullName;

          // lấy id của nhân viên
          this.employee_id = x?.employeeId;
        }
      )
    )

    if (this.router.getCurrentNavigation()?.extras?.state) {

      this.id = this.router.getCurrentNavigation()?.extras?.state!['id']
      this.modelChange = this.router.getCurrentNavigation()?.extras?.state!['modelChange']
      this.title = this.router.getCurrentNavigation()?.extras?.state!['title']

    }




  }


  ngAfterViewInit() {
    if (!!this.id) {
      setTimeout(() => {
        this.appService.get(api.HU_EMPLOYEE_GET_PROFILE_EDUCATION_CORRECT + this.id).subscribe((x: any) => {
          if (x.ok && x.status === 200) {

            const body: IFormatedResponse = x.body;
            this.listData = body.innerBody
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
      }, 100)
    }



  }

  // triển khai phương thức ngOnInit()
  public override ngOnInit(): void {
    this.subscriptions.push(
      this.appService.get(api.HU_EMPLOYEE_GET_PROFILE_EDUCATION + `${this.employee_id}&time=${this.instanceNumber}`).subscribe(
        (y) => {
          this.listData = y.body.innerBody;

          // in ra dữ liệu call được
          console.log("robot: in ra dữ liệu call được:\n", this.listData);


          // cái y ở đây
          // là đối tượng được trả về
          // sau khi xử lý ở "back end"
          console.log("robot: in ra y:\n", y);


          var x = this.listData.filter(p => p.isSaveEducation == true || p.isSendPortal == true || p.isUnapprove == true);

          if (x.length > 0) {
            this.disableEdit = true;
          }

          if (this.listData.length > 0) {
            this.checkData = false;
          }
          else this.checkData = true;
        }
      )
    )

  }

  override ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }


  // phương thức xử lý edit
  public handle_edit(thamSo: any): void {
    this.transportDataService.transportData$.next(thamSo);
  }


  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: false,
    timeClose: 5000,
  };

  loading: boolean = false;

  clickBtnDelete(id: number) {
    const confirm = window.confirm(
      this.mls.trans('common.confirm.delete.prefix') + '?'
    );
    if (confirm) {
      this.subscriptions.push(
        this.appService.post("/api/HuEmployeeCvEdit/DeletePortalById", { IdHuEmployeeCvEdit: id }).subscribe(x => {
          this.loading = true;

          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              this.alertService.info(
                this.mls.trans('DELETE_SUCCESS'),
                this.alertOptions,
              );


              // delete item at "User Interface HTML"
              const index = this.listData.indexOf(this.listData.filter(x => x.id == id)[0]);
              if (index !== -1) this.listData.splice(index, 1);
            } else {
              // this.responseService.resolve(body);
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
