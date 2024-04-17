import { Injectable } from "@angular/core";
import { CommonHttpRequestService } from "ngx-histaff-alpha";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class FamilyInfoSerivce{
    familyId = 0;
    familyEditId = 0;
    constructor(
        private commonHttpRequestService : CommonHttpRequestService,
    ){
        
    }

    getProvince(url: string): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest('queryList', url);
      }
    transportData$: any = new BehaviorSubject<any>(0);
}