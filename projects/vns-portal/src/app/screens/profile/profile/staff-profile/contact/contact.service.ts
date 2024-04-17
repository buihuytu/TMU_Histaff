import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable({providedIn: "root"})
export class ContactService{

    contactId = 0;
    transportData$: any = new BehaviorSubject<any>(0);
}