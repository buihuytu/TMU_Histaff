import { Injectable } from "@angular/core";
import { api } from 'alpha-global-constants';
import { CommonHttpRequestService } from "ngx-histaff-alpha";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RegisterHistoryService{

    constructor(
      private commonHttpRequestService: CommonHttpRequestService
    ) { }
    RegisterHistory(dateStart: Date, dateEnd: Date): Observable<any> {
      const x = {
        dateStart,
        dateEnd
      }
      return this.commonHttpRequestService.makePostRequest("RegisterHistory", api.PORTAL_REGISTER_OFF_GET_REGISTER_HISTORY, x )
    }

    getRegisterHistoryById(id : number): Observable<any>{
      return this.commonHttpRequestService.makeGetRequest("getRegisterHistoryById", api.PORTAL_REGISTER_OFF_GET_REGISTER_HISTORY_BY_ID + id )

    }

    getRegisterById(id : number): Observable<any>{
      return this.commonHttpRequestService.makeGetRequest("getRegisterById", api.PORTAL_REGISTER_OFF_GET_REGISTER_BY_ID + id )

    }
    
}