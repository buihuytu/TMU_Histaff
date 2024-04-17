import { Injectable } from "@angular/core";
import { api } from 'alpha-global-constants';
import { CommonHttpRequestService } from "ngx-histaff-alpha";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApproveHistoryService{

    constructor(
      private commonHttpRequestService: CommonHttpRequestService
    ) { }
    ApproveHistory(dateStart: Date, dateEnd: Date): Observable<any> {
      const x = {
        dateStart,
        dateEnd
      }
      return this.commonHttpRequestService.makePostRequest("ApproveHistory", api.PORTAL_REGISTER_OFF_GET_APPROVE_HISTORY,x)
    }
    getApproveHistoryById(id : number): Observable<any> {
      return this.commonHttpRequestService.makeGetRequest("getApproveHistoryById", api.PORTAL_REGISTER_OFF_GET_APPROVE_HISTORY_BY_ID + id)
    }
    
}