import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQueryListRequest } from '../../../../../interfaces/IQueryListRequest';
import { CommonHttpRequestService } from '../../../../../services/common-http-request.service';
import { api } from 'alpha-global-constants';

@Injectable({
  providedIn: 'root'
})
export class TimeTypeService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { }

  timeTypeList(request: IQueryListRequest): Observable<any> {
    return this.commonHttpRequestService.makePostRequest('timeTypeList', api.AT_TIME_TYPE_QUERY_LIST, request)
  }


}
