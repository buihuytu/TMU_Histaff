import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingCourseEditService {
  constructor(private commonHttpRequestService: CommonHttpRequestService) {
    
  }
  CreateNewCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('CreateNewCode', '/api/TrCourse/CreateNewCode');
  }
  getALLTrainFeildByKey(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getALLTrainFeildByKey',
      '/api/SysOrtherList/GetOtherListByType?typeCode=TRAIN_FEILD'
    );
}
}
