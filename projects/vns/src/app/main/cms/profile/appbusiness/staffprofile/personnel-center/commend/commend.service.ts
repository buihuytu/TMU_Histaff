import { Injectable } from "@angular/core";
import { CommonHttpRequestService } from "ngx-histaff-alpha";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class CommendService {
    constructor(
        public commonHttpRequestService : CommonHttpRequestService ){
            

        }
    getListComendByEmployee(employeeId: number) : Observable<any> {
        return this.commonHttpRequestService.makeGetRequest("getListComendByEmployee","/api/HuCommend/GetListCommendByEmployee?employeeId=" + employeeId)
    }
}