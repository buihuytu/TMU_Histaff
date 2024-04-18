import { Injectable } from '@angular/core';
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
    return this.commonHttpRequestService.makeGetRequest('getCode', '/api/AtTerminal/GetNewCode');
  }

}
