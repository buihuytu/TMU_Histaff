import { Injectable } from "@angular/core";
import { api } from 'alpha-global-constants';
import { CommonHttpRequestService,} from "ngx-histaff-alpha";
import { Observable } from "rxjs";

@Injectable({
providedIn: 'root'
})

export class TrSettingCriCourseService {
    constructor(
        private commonHttpRequestService: CommonHttpRequestService,
    ){ 
    }

    getListCourse(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest(
          'getListCourse',
          api.TR_COURSE_GET_LIST_COURSE
        );
    }

    
    getListCriteria(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest(
          'getListCriteria',
          api.TR_CRITERIA_GET_LIST_CRITERIA
        );
    }
}