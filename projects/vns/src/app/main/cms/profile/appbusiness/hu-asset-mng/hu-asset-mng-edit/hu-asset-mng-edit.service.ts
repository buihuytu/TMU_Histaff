import { Injectable } from "@angular/core";
import { CommonHttpRequestService } from "ngx-histaff-alpha";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class HuAssetMngEditService {
    constructor(
        private commonHttpRequestService: CommonHttpRequestService
    ){
        
    }

    getAsset():Observable<any>{
        return this.commonHttpRequestService.makeGetRequest('getAsset', '/api/HuAssetMng/GetAsset');
    }

    getStatusAsset():Observable<any>{
        return this.commonHttpRequestService.makeGetRequest('getStatusAsset', '/api/HuAssetMng/GetStatusAsset');
    }

}