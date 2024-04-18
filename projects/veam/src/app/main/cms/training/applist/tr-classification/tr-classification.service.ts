import { Injectable } from "@angular/core";
import { CommonHttpRequestService } from "ngx-histaff-alpha";
import { Observable } from "rxjs";

@Injectable({
providedIn: 'root'
})

export class TrClassificationService {
    constructor(
        private commonHttpRequestService: CommonHttpRequestService,
    ){ 
    }

    getALLDescClassByKey(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest(
          'getALLDescClassByKey',
          '/api/SysOrtherList/GetOtherListByType?typeCode=DESC_CLASSIFICATION'
        );
    }
}