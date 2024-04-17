import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverTimeService {
    private selectedYear = new BehaviorSubject<number>((new Date()).getFullYear()); 
    private periodId = new BehaviorSubject<number>(0);
    private employeeSelected = new BehaviorSubject<number>(0);
    private listEmployeeSelected = new BehaviorSubject<any[]>([]);
    private minDate = new BehaviorSubject<string>("");
    private maxDate = new BehaviorSubject<string>("");
    currentSelectedYear = this.selectedYear.asObservable();
    currentemployeeSelected = this.employeeSelected.asObservable();
    currentListEmployeeSelected = this.listEmployeeSelected.asObservable();
    currentperiodId = this.periodId.asObservable();
    currentMinDate = this.minDate.asObservable();
    currentMaxDate = this.maxDate.asObservable();

  
    constructor(
      private commonHttpRequestService: CommonHttpRequestService,
    ){ 
        
    }

    changeSelectedYear(year: number){
      this.selectedYear.next(year);
    }
  
    changeperiodID(id: number) {
      this.periodId.next(id);
    }

    changeEmployeeSelected(id: number){
      this.employeeSelected.next(id);
    }

    changeListEmployeeSelected(id: any[]){
      this.listEmployeeSelected.next(id);
    }

    changeMinDate(minDate: string){
      this.minDate.next(minDate);
    }

    changeMaxDate(maxDate: string){
      this.maxDate.next(maxDate);
    }

    getCurrentPeriodSalary(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest('getCurrentPeriodSalary', '/api/AtWorksign/GetCurrentPeriodSalary');
    }
}
