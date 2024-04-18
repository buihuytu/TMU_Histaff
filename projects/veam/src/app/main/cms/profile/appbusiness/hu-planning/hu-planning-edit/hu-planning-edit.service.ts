import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api } from 'alpha-global-constants';
import { CommonHttpRequestService } from "ngx-histaff-alpha";

@Injectable({
    providedIn: 'root'
})
export class HuPlanningEditService {

    constructor(
        private commonHttpRequestService: CommonHttpRequestService
    ) {

    }
    planningId!: number;
    GetAppLevel(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest('getAppLevel', api.HU_PLANNING_GET_JOB_APP_LEVEL);
    }
}