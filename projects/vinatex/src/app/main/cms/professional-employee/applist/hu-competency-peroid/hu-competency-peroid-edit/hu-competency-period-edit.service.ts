import { Injectable } from "@angular/core";
import { CommonHttpRequestService } from "ngx-histaff-alpha";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root',
})
export class HuCompetencyPeroidEditService{
    constructor(
        private commonHttpRequestService: CommonHttpRequestService
    ){
        
    }


    getQuarter():Observable<any>{
        return this.commonHttpRequestService.makeGetRequest('getQuarter', '/api/HuCompetencyPeriod/GetQuarter');
    }

    getPeroidYear():Observable<any>{
        return this.commonHttpRequestService.makeGetRequest('getPeroidYear', '/api/HuCompetencyPeriod/GetPeriodYear');
    }
}