import { Injectable } from "@angular/core";
import { api } from 'alpha-global-constants';
import { CommonHttpRequestService,} from "ngx-histaff-alpha";
import { Observable } from "rxjs";

@Injectable({
providedIn: 'root'
})

export class InsHealthInsuranceService{
    constructor(
        private commonHttpRequestService: CommonHttpRequestService,
    ){ 
        
    }

    getInsListContract(year: number): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest(
            'getInsListContract',
            api.INS_LIST_CONTRACT_GET_LIST_BY_YEAR + year
          );
    }

    getInfoInsContract(id: number): Observable<any>{
        return this.commonHttpRequestService.makeGetRequest(
            'getInfoInsContract',
            `/api/InsListContract/GetById?id=${id}`
          );
    }

    getListFamilyMember(employeeId: number): Observable<any>{
        return this.commonHttpRequestService.makeGetRequest(
            'getListFamilyMember',
            api.HU_FAMILY_GET_LIST_FAMILY_MEMBER + employeeId
          );
    }

    getInfoFamilyMember(id: number): Observable<any>{
        return this.commonHttpRequestService.makeGetRequest(
            'getInfoFamilyMember',
            `/api/HuFamily/GetById?id=${id}`
          );
    }

    getALLPayeeByKey(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest(
          'getALLPayeeByKey',
          '/api/SysOrtherList/GetOtherListByType?typeCode=PAYEE'
        );
    }
}