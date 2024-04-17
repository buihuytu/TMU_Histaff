import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OrganizationService } from '../services/organization.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationStructComponentResolver implements Resolve<boolean> {

  constructor(private organizationService: OrganizationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return new Observable<boolean>(observer => {

      // set only one orgUnit to be active
      const activeKeys = this.organizationService.status$.value.activeKeys
      const currentActiveItems = this.organizationService.linerData$.value.filter(x => {
        return activeKeys.indexOf(x.tree$Key.toString()) >= 0
      })
      currentActiveItems.sort((a, b) => {
        if (a.tree$Tier > b.tree$Tier) return 1
        if (a.tree$Tier === b.tree$Tier) return 0
        if (a.tree$Tier < b.tree$Tier) return -1
        return 0
      })
      if (!!currentActiveItems.length) {
        this.organizationService.status$.next({
          ...this.organizationService.status$.value,
          activeKeys: [currentActiveItems[0].tree$Key]
        })

        console.error("this.organizationService.status$.value", this.organizationService.status$.value)
      } else {
        const tier1ItemsFilter = this.organizationService.linerData$.value.filter(x => x.tree$Tier === 1)

        console.error("tier1ItemsFilter", tier1ItemsFilter)

        if (!!tier1ItemsFilter.length) {
          this.organizationService.status$.next({
            ...this.organizationService.status$.value,
            activeKeys: [tier1ItemsFilter[0].tree$Key.toString()]
          })
        } else {
          this.organizationService.status$.next({
            ...this.organizationService.status$.value,
            activeKeys: ['0']
          })
        }
      }
      observer.next(true);
    })
  }
}
