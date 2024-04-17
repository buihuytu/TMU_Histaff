import { Injectable } from "@angular/core";
import { api } from 'alpha-global-constants';
import { CommonHttpRequestService } from "ngx-histaff-alpha";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LeaveApproveService{

    constructor(
      private commonHttpRequestService: CommonHttpRequestService
    ) { }
    ApproveLeave(request: any): Observable<any> {
      return this.commonHttpRequestService.makePostRequest("ApproveLeave", api.PORTAL_LEAVE_APPROVE, request)
    }
    GetById(model: any): Observable<any> {
      return this.commonHttpRequestService.makePostRequest("GetByIdVer2", api.PORTAL_LEAVE_APPROVE_GET_BY_ID, model)
    }
    
    GetPortalApproveById(id : number): Observable<any> {
      return this.commonHttpRequestService.makeGetRequest("GetPortalApproveById", api.PORTAL_LEAVE_APPROVE_GET_PORTAL_BY_ID + id)
    }
}