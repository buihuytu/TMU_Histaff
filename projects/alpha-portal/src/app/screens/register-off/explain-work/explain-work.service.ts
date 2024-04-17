import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiService } from "@vns-portal/services/base-api.service";
import { CommonHttpRequestService } from "@vns-portal/services/common-http-request.service";




@Injectable({providedIn: "root"})
export class ExplainWorkService{
    constructor(
        public override commonHttpRequestService : CommonHttpRequestService
    ){
        
    }

    getAttendantByDay(request: any[]): Observable<any>{
        return this.commonHttpRequestService.makePostRequest('getAttendantByDay', '/api/AtTimeTimesheetDaily/GetAttendatByDay',request )
    }
}