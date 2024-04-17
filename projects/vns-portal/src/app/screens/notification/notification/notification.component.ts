import { Component, OnInit } from '@angular/core';
import { NotificationEditService } from './notification-edit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { api } from 'alpha-global-constants';
import { BaseComponent, ICoreAccordionItem, MultiLanguageService, LayoutService, AppService, ResponseService, AlertService, AuthService, UrlService, IAuthData } from 'ngx-histaff-alpha';

export interface ICoreAccordionItemExtended extends ICoreAccordionItem {
  notiCount?: number;
  svg: string;
  backgroundColor: string;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent extends BaseComponent implements OnInit {
  employeeId!: number;
  sectors!: ICoreAccordionItemExtended[];
  notifyStaffInfos! : any[];
  notifyRegister! : any[];
  notifyApprove! : any[];
  listData! : any[];
  heightList : number[] = [];
  rowHeight!: number
  realTime: number;
  constructor(
    public override mls: MultiLanguageService,
    private layoutService: LayoutService,
    private appService: AppService,
    private responseService: ResponseService,
    private alertService: AlertService,
    private authService: AuthService,
    private notificationEditService : NotificationEditService,
    private router: Router,
    private route: ActivatedRoute,
    private urlService: UrlService
  ){
    super(mls);
    this.sectors = this.notificationEditService.sectors;
    urlService.currentRouteUrl$.next('/home');
    this.realTime = new Date().getTime();
  }
  
  

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.authService.data$.subscribe((x: IAuthData | null) => this.employeeId = x?.employeeId!);
    this.getNoti()
  }
  getNoti(){
    this.subscriptions.push(
      this.appService.get(api.GET_ALL_NOTIFY + this.employeeId).subscribe((x :any) =>{
        if(!!x && x.status == 200){
          this.listData = x.body.innerBody;
          console.log(this.listData);
          
          this.notifyStaffInfos = this.listData.filter(x => x.action == 2);
          this.notifyRegister = this.listData.filter(x => x.action == 1)
          this.notifyApprove = this.listData.filter(x => x.action == 3)
          this.sectors[0].notiCount = this.notifyStaffInfos.length;
          this.sectors[1].notiCount = this.notifyRegister.length;
          this.sectors[2].notiCount = this.notifyApprove.length;
          setTimeout(() => {
            let row = document.querySelector('.row') as any
            this.rowHeight = row.offsetHeight
            this.heightList.push(this.rowHeight * this.notifyStaffInfos.length)
            this.heightList.push(this.rowHeight * this.notifyRegister.length)
            this.heightList.push(this.rowHeight * this.notifyApprove.length)
  
          },10)
        }
      })
    )
    
  }
  getCoutNotiUnRead() {
    this.appService.get(api.GET_COUNT_NOTIFY_UNREAD + this.authService.data$.value?.employeeId + `&?time=${this.realTime}`).subscribe((x : any) => {
      if(!!x && x.status === 200){
        this.layoutService.notificationCount$.next(x.body.innerBody)
      }
    })
  }
  navigatingLink(item : any){
    item.isRead = true;
    switch(item.type){
      case 1 :
        if(item.action == 3){
          this.router.navigate(['/approve/leave-approve-edit'],{ relativeTo: this.route, state: { id: item.refId, title : item.title, modelChange : item.modelChange } })
        } else if(item.action == 1){
          this.router.navigate(['/register-off/register-history-edit'],{ relativeTo: this.route, state: { id: item.refId, title : item.title, modelChange : item.modelChange } })
        }
        
        break;
      case 2 :
        if(item.action == 3){
          this.router.navigate(['/approve/overtime-approve-edit'],{ relativeTo: this.route, state: { id: item.refId, title : item.title, modelChange : item.modelChange } })
        }else if(item.action == 1){
          this.router.navigate(['/register-off/register-history-edit'],{ relativeTo: this.route, state: { id: item.refId, title : item.title, modelChange : item.modelChange } })
        }
        break;
      case 3 :
        if(item.action == 3){
          this.router.navigate(['/approve/explain-approve-edit'],{ relativeTo: this.route, state: { id: item.refId, title : item.title, modelChange : item.modelChange } })
        }else if(item.action == 1){
          this.router.navigate(['/register-off/register-history-edit'],{ relativeTo: this.route, state: { id: item.refId, title : item.title, modelChange : item.modelChange } })
        }
        break;
      case 4 ://chỉnh sửa sơ yếu lý lịch
      if(item.action == 2){
        this.router.navigate(['/profile/staff-profile/curriculum'],{ relativeTo: this.route, state: { id: item.refId, title : item.title, modelChange : item.modelChange } })

      }
     
        break;
      case 5 ://chỉnh sửa thông tin người thân
      if(item.action == 2){
        this.router.navigate(['/profile/family-info'],{ relativeTo: this.route, state: { id: item.refId, title : item.title, modelChange : item.modelChange } })
      }
        break;
      case 6 ://chỉnh sửa bằng cấp chứng chỉ
      if(item.action == 2){
        debugger
        this.router.navigate(['/profile/certificate'],{ relativeTo: this.route, state: { id: item.refId, title : item.title, modelChange : item.modelChange } })
      }
        break;
      case 7 ://chỉnh sửa quá trình công tác
      if(item.action == 2){
        this.router.navigate(['/profile/work-present/working-process'],{ relativeTo: this.route, state: { id: item.refId, title : item.title,modelChange : item.modelChange } })
      }
        break;
      case 8 ://chỉnh sửa quá trình công tác trước đây
      if(item.action == 2){
        this.router.navigate(['/profile/work-past'],{ relativeTo: this.route, state: { id: item.refId, title : item.title,modelChange : item.modelChange } })
      }
      break;
      case 9 ://chỉnh sửa thông tin liên hệ
      if(item.action == 2){
        this.router.navigate(['/profile/staff-profile/contact'],{ relativeTo: this.route, state: { id: item.refId, title : item.title,modelChange : item.modelChange } })
      }
        break;
      case 10 ://chỉnh sửa thông tin phụ
      if(item.action == 2){
        this.router.navigate(['/profile/staff-profile/additional-info'],{ relativeTo: this.route, state: { id: item.refId, title : item.title,modelChange : item.modelChange } })
      }
        break;
      case 11 ://chỉnh sửa trình độ học vấn
      if(item.action == 2){
        this.router.navigate(['/profile/staff-profile/education'],{ relativeTo: this.route, state: { id: item.refId, title : item.title,modelChange : item.modelChange } })
      }
        break;
      case 12 ://chỉnh sửa thông tin tài khoản
      if(item.action == 2){
        this.router.navigate(['/profile/staff-profile/bank-info'],{ relativeTo: this.route, state: { id: item.refId, title : item.title, modelChange : item.modelChange } })
      }
        break;
        default:
        break;
    }
    setTimeout(() => {
      this.subscriptions.push(
        this.appService.post(api.POST_NOTIFICATION_UPDATE, item).subscribe(x => {
          if(!!x) {
            this.getCoutNotiUnRead()
          }
        })
      )
    },1000)
  }
}
