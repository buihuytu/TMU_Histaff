import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContractInforService {
    private employeeSelected = new BehaviorSubject<number>(0);
    private listEmployeeSelected = new BehaviorSubject<number[]>([]);
    
    
    currentemployeeSelected = this.employeeSelected.asObservable();
    currentListEmployeeSelected = this.listEmployeeSelected.asObservable();

  
    constructor(
      private commonHttpRequestService: CommonHttpRequestService,
    ){ 
        
    }

    changeEmployeeSelected(id: number){
      this.employeeSelected.next(id);
    }

    changeListEmployeeSelected(id: any[]){
      this.listEmployeeSelected.next(id);
    }
}
