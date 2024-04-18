import { Component } from '@angular/core';
import { PersonnelCenterService } from '../personnel-center.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-router-distributor',
  standalone: true,
  imports: [],
  templateUrl: './router-distributor.component.html',
  styleUrl: './router-distributor.component.scss'
})
export class RouterDistributorComponent {

  constructor(private pcs: PersonnelCenterService, private router: Router) {
    router.navigateByUrl('/cms/profile/business/staffprofile/' + btoa(pcs.employee$.value.id))
  }

}
