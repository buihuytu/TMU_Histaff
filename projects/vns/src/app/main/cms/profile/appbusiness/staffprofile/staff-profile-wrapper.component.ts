import { Component } from '@angular/core';
import { StaffProfileComponent } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-staff-profile-wrapper',
  standalone: true,
  imports: [
    StaffProfileComponent
  ],
  templateUrl: './staff-profile-wrapper.component.html',
  styleUrl: './staff-profile-wrapper.component.scss'
})
export class StaffProfileWrapperComponent {

}
