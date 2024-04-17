import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'alpha-global-constants';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';


@Injectable({
  providedIn: 'root'
})
export class ContractTypeEditService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }

  checkCodeExists(code:string): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('checkCodeExists', api.HU_CONTRACT_TYPE_CHECK_CODE_EXISTS + code);
  }

  
}
