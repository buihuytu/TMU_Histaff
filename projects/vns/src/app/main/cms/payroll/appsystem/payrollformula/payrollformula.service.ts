import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PayrollFormulaService {
    private objSalaryId$ = new BehaviorSubject<number>(0);
    currentObjSalary = this.objSalaryId$.asObservable();

    constructor(
      private commonHttpRequestService: CommonHttpRequestService,
    ){ 
        
    }

    changeObjSalaryId(id: number){
      this.objSalaryId$.next(id);
    }

    
}
