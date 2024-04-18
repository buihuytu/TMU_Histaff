import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrPlanEditService {
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }
  getAllOrg(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllOrg',
      '/api/TrPlan/GetAllOrg'
    );
  }
  getAllCourse(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllCourse',
      '/api/TrPlan/GetAllCourse'
    );
  }
  getAllCenter(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllCenter',
      '/api/TrPlan/GetAllCenter'
    );
  }

  getTrainingForm(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getTrainingForm',
      '/api/TrPlan/GetTrainingForm'
    );
  }

  getJobFamily(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getJobFamily',
      '/api/TrPlan/GetJobFamily'
    );
  }

  getJobByJobFamId(x: string[]): Observable<any> {
    return this.commonHttpRequestService.makePostRequest(
      'getJobByJobFamId',
      `/api/TrPlan/GetJobByJobFamId`,{ids:x}
    );
  }

  getALLJobFamilyByCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getALLJobFamilyByCode',
      '/api/SysOrtherList/GetOtherListByType?typeCode=HU_JOB_FAMILY'
    );
}
}
