import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class CallDataService {
  // hàm khởi tạo
  constructor(
    // khai báo thuộc tính
    private commonHttpRequestService: CommonHttpRequestService
  )
  {
    // truyền tham số cho hàm khởi tạo của lớp kế thừa
    
  }


  // khai báo phương thức layDanhSachTrangThai()
  public layDanhSachTrangThai(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('layDanhSachTrangThai', '/api/HuCertificateEdit/GetListNameOfApprove');
  }
}
