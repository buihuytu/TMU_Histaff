import { Injectable } from "@angular/core";
import { CommonHttpRequestService } from "ngx-histaff-alpha";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PayrollNoteService{

    constructor(
      private commonHttpRequestService: CommonHttpRequestService
    ) { }
    
    getCurrentPeriodSalary(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest('getCurrentPeriodSalary', '/api/AtWorksign/GetCurrentPeriodSalary');
    }
}