import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListSalariesEditService {

  private objectId = new BehaviorSubject<number>(0);
  private salariesSelected = new BehaviorSubject<number>(0);
  currentsalariesSelected = this.salariesSelected.asObservable();
  currentobjectId = this.objectId.asObservable();
  
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }


  getObjSal(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getObjSal', '/api/PaListsalaries/GetObjSal');
  }
  getGroupType(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getGroupType', '/api/PaListsalaries/GetGroupType');
  }
  getDataType(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getDataType', '/api/PaListsalaries/GetDataType');
  }
  getListSal(idSymbol: any): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getListSal', `/api/PaListsalaries/GetListSal?idSymbol=${idSymbol}`);
  }

  getListSalaries(idObjectSal: any): Observable<any>{
    return this.commonHttpRequestService.makeGetRequest('getListSalaries', `/api/PaListsalaries/GetListSalaries?idObjectSal=${idObjectSal}`);
  }

  choseObjectSal(objectId: number) {
    //objectId = 1519;//id Tong cong ty thep viet nam
    this.objectId.next(objectId);
  }
}
