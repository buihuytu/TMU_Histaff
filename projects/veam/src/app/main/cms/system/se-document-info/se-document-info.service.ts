import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeDocumentInfoService {
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }
  
  empId!: BehaviorSubject<number>;
  documentId!: number;
}
