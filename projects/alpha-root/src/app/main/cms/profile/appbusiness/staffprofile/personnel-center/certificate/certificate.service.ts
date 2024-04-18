import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CertificateService{

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }
  
  getCertificateByEmployee(employeeId: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCertificateByEmployee', '/api/HuCertificateList/GetCertificateByEmployee?id=' + employeeId);
  }
}
