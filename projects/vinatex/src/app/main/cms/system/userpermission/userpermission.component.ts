import { AfterViewInit, Component, OnInit } from "@angular/core";
import { api } from 'alpha-global-constants';
import { CorePermissionComponent, BaseComponent, EnumPermissionObjectType, MultiLanguageService, LayoutService, CorePermissionService, DialogService, AppService,} from "ngx-histaff-alpha";
import { Observable, filter } from "rxjs";

@Component({
  selector: "cms-app-userpermission",
  templateUrl: "./userpermission.component.html",
  styleUrls: ["./userpermission.component.scss"],
  providers: [CorePermissionComponent]
})
export class UserPermissionComponent extends BaseComponent implements OnInit, AfterViewInit {

  type: EnumPermissionObjectType = EnumPermissionObjectType.USER;
  height!: number;

  constructor(
    public override mls: MultiLanguageService,
    private corePermissionComponent: CorePermissionComponent,
    private layoutService: LayoutService,
    private corePermissionService: CorePermissionService,
    private dialogService: DialogService,
    private appService: AppService
    ) {
      super(mls);
    }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.layoutService.contentContainerHeight$.subscribe(x => {
          this.height = x - this.layoutService.basicSpacing * 2
        })
      )
    })
  }

  override ngOnInit(): void {
    this.dialogService.dialogConfirmed$.pipe(filter(x => !!x))
    .subscribe(x =>{
      if(!!x?.confirmed){
        if(!!this.corePermissionService.objectId){
          const objectId = {userId : this.corePermissionService.objectId}
          this.appService.post(api.SYS_USER_PERMISSION_DELETE_BY_USER_ID,objectId)
          .subscribe(x => {
            if(x.ok && x.status === 200){
            }
          })
          
        }
      }
    })
  }
  canDeactivate(): Observable<boolean> | boolean {
    return this.corePermissionComponent.canDeactivate();
  }

}
