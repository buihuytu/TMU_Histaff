import { Injectable } from "@angular/core";
import { CommonHttpRequestService } from "ngx-histaff-alpha";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root',
})
export class PhaseAdvanceEditService{
    constructor(
        private commonHttpRequestService: CommonHttpRequestService
    ){
        
    }

    getYearPeriod():Observable<any>{
        return this.commonHttpRequestService.makeGetRequest(
            'getYearPeriod',
            '/api/PaPhaseAdvance/GetYearPeriod'
        );
    }

    getOrg():Observable<any>{
        return this.commonHttpRequestService.makeGetRequest('getOrg', '/api/PaPhaseAdvance/GetOrgId');
    }

    getPeriodBonus(x: number): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest(
          'getPeriodBonus',
          `/api/PaPhaseAdvance/GetMonthPeriodAt?id=${x}`,
        );
    }

    getYearByPeriod(x: number):Observable<any>{
        return this.commonHttpRequestService.makeGetRequest('getYearByPeriod',
        `/api/PaPhaseAdvance/GetYearByPeriod?id=${x}`);
    }

    getAtSymbol():Observable<any>{
        return this.commonHttpRequestService.makeGetRequest('getAtSymbol',
        '/api/PaPhaseAdvance/getAtSymbol');
    }
}