import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({providedIn: 'root'})
export class CertificateService{
    certificateId = 0;
    certificateEditId = 0;
    IsApprovePortal!: boolean;
    StatusRecord!: string;
    data$: any = new BehaviorSubject<any>(0);
}