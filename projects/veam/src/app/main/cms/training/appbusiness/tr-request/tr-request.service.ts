import { Injectable } from "@angular/core";
import { api } from 'alpha-global-constants';
import { CommonHttpRequestService,} from "ngx-histaff-alpha";
import { Observable } from "rxjs";

@Injectable({
providedIn: 'root'
})

export class TrRequestService{
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

    getListTrainingCenter(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest(
          'getListTrainingCenter',
          api.TR_CENTER_GET_LIST_TRAINING_CENTER
        );
    }

    getListTeacherByCenter(ids: string): Observable<any> {
      return this.commonHttpRequestService.makePostRequest(
        'getListTeacherByCenter',
        api.TR_LECTURE_GET_LIST_TEACHER_BY_CENTER, ids
      );
  }

    getALLPropertiesNeedByKey(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest(
          'getALLPropertiesNeedByKey',
          '/api/SysOrtherList/GetOtherListByType?typeCode=PROPERTIES_NEED'
        );
    }

    getALLTrainingFormByKey(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest(
          'getALLTrainingFormByKey',
          '/api/SysOrtherList/GetOtherListByType?typeCode=TRAINING_FORM'
        );
    }

    getALLCurrencyByKey(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest(
          'getALLCurrencyByKey',
          '/api/SysOrtherList/GetOtherListByType?typeCode=CURRENCY'
        );
    }

    getALLStatusByKey(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest(
          'getALLStatusByKey',
          '/api/SysOrtherList/GetOtherListByType?typeCode=STATUS'
        );
    }
    
}