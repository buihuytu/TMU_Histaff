import { Injectable } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CommonHttpRequestService} from 'ngx-histaff-alpha';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrProgramService {
  public trProgramId$ = new BehaviorSubject<number>(0);
  tabActiveIndex!: number;
  tabActiveHeader!: EnumTranslateKey;

  constructor(
    private commonHttpRequestService: CommonHttpRequestService,
  ) {
    
  }

  // TR_PREPARE
  getInfoProgram(id: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getInfoProgram',
      `/api/TrProgram/GetById?id=${id}`
    );
  }

  getALLListPrepareByKey(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getALLListPrepareByKey',
      '/api/SysOrtherList/GetOtherListByType?typeCode=TR_LIST_PREPARE'
    );
  }

  getListProgram(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getListProgram',
      api.TR_PROGRAM_GET_LIST_PROGRAM
    );
  }
}
