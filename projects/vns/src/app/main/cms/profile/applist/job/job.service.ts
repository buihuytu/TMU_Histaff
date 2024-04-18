import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'alpha-global-constants';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }

  getCodeByJobFamily(id: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCodeByJobFamily', api.HU_JOB_GET_CODE_BY_JOB_FAMILY + id);
  }

}
