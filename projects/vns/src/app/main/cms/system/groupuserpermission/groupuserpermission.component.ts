import { Component } from "@angular/core";
import { CorePermissionComponent, EnumPermissionObjectType } from "ngx-histaff-alpha";
import { Observable } from "rxjs";
@Component({
  selector: "cms-app-groupuserpermission",
  templateUrl: "./groupuserpermission.component.html",
  styleUrls: ["./groupuserpermission.component.scss"],
  providers: [CorePermissionComponent]
})
export class GroupUserPermissionComponent {

  type: EnumPermissionObjectType = EnumPermissionObjectType.USER_GROUP;

  constructor(private corePermissionComponent: CorePermissionComponent) {}

  canDeactivate(): Observable<boolean> | boolean {
    return this.corePermissionComponent.canDeactivate();
  }

}