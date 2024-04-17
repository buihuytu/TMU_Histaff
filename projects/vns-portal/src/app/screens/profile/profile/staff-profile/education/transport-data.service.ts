import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


// khai báo lớp
// vận chuyển dữ liệu
// để mang dữ liệu từ "education" đến "education-edit"
export class TransportDataService {
  // khai báo thuộc tính "vận chuyển dữ liệu"
  public transportData$: any = new BehaviorSubject<any>(0);

  // khởi tạo transportData$ với giá trị ban đầu là 0 cũng được
  // sau này bạn gán cho nó là kiểu dữ liệu đối tượng cũng được

  constructor() { }
}
