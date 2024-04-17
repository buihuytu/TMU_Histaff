// thêm thư viện
import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';


// khai báo bộ trang trí (decorator)
@Injectable({
  providedIn: 'root',
})


// khai báo lớp "ConfigurationCommonEditService"
// kế thừa lớp "BaseApiService"
export class ConfigurationCommonEditService {
  // đây là hàm khởi tạo
  constructor(private commonHttpRequestService: CommonHttpRequestService) {
    
  }


  // khai báo phương thức
  public CreateNewCode(): Observable<any> {
    // có lẽ sau này phải điều chỉnh lại API
    return this.commonHttpRequestService.makeGetRequest('CreateNewCode', '/api/SeProcess/CreateNewCode');
  }


  // khai báo phương thức
  public GetProcessType(): Observable<any> {
    // có lẽ sau này phải điều chỉnh lại API
    return this.commonHttpRequestService.makeGetRequest('GetProcessType', '/api/SeProcess/GetProcessType');
  }
}
