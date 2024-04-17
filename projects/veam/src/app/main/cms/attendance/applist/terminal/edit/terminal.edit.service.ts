import { Injectable } from '@angular/core';
import { api } from 'alpha-global-constants';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerminalEditService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }

  getCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCode', api.AT_TERMINAL_GET_NEW_CODE);
  }

}
