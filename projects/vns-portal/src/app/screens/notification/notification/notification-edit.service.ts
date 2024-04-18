import { Injectable } from "@angular/core";
import { EnumTranslateKey } from 'alpha-global-constants';
import { EnumProfileInfoSector, CommonHttpRequestService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";
import { ICoreAccordionItemExtended } from "./notification.component";

@Injectable({
    providedIn: 'root'
})

export class NotificationEditService{
    listInstance$ =  new BehaviorSubject<number>(0);
    
        sectors: ICoreAccordionItemExtended[] =
        [
          {
            id: EnumProfileInfoSector.EMPLOYEE,
            header: EnumTranslateKey.NOTI_EMPLOYEE_PORTAL,
            open: false,
            svg: 'assets/images/home/noti-staff-info.svg',
            backgroundColor: '#ffffff',
            // required:true
          },
          {
            id: EnumProfileInfoSector.REGISTER,
            header: EnumTranslateKey.NOTI_REGISTER_PORTAL,
            open: false,
            svg: 'assets/images/home/register-off.svg',
            backgroundColor: '#ffffff',
          },
          {
            id: EnumProfileInfoSector.APPROVE,
            header: EnumTranslateKey.NOTI_APPROVE_PORTAL,
            open: false,
            svg: 'assets/images/home/noti-approve.svg',
            backgroundColor: '#ffffff',
          },
        ]
    
        constructor(
        private commonHttpRequestService: CommonHttpRequestService
        ) { }
    }