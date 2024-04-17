import { Injectable } from "@angular/core";
import { CommonHttpRequestService } from "ngx-histaff-alpha";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root',
})
export class HuAssetEditService{
    constructor(
        private commonHttpRequestService: CommonHttpRequestService
    ){
        
    }


    getGroupAsset():Observable<any>{
        return this.commonHttpRequestService.makeGetRequest('getGroupAsset', '/api/HuAsset/GetGroupAsset');
    }

}