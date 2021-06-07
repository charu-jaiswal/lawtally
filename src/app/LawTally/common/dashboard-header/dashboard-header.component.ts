import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { UsersService } from '../../../core/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  getToken;
  rolesLength;
  getData;
  roles
  lawyerId: any;

  constructor(
    public authService: AuthService,
    public usersService: UsersService,
    public router: Router
  ) { }

  ngOnInit() {
    this.usersService.getlawtallyAdminDetails();
    this.usersService.getAdminDetails().subscribe((res) => {
      var result = res['response_data'];
      if (result) {
        this.lawyerId = result._id
        this.usersService.getLawyerDetails(this.lawyerId)
      }
    })
    this.usersService.getNotification();
    console.log(this.usersService.getNotificationList)

    this.getToken = sessionStorage.getItem('access_token')
    console.log(this.getToken);

    this.rolesLength = localStorage.getItem('roles_length')
    console.log(this.rolesLength);

    this.roles = localStorage.getItem('roles');
    console.log(this.roles, (this.roles.includes('lawyer')) && (this.getToken != null));

    if ((this.roles.includes('lawyer')) && (this.getToken != null)) {
      this.getData = 'edit'
      console.log(this.getData)
    } else if (((this.rolesLength == 1 || 0) || (this.roles == null)) && (this.getToken != null)) {
      this.getData = 'add'
      console.log(this.getData)
    } else {
      this.getData = 'add'
      console.log(this.getData)
    }
  }

  menuopen() {
    $("body").toggleClass("desktop-left-menu");
  }

  onGetSubscrption() {
    this.router.navigate(['/lawyer-directory/subscription-plan']);
    localStorage.setItem('isSubscription', 'false')
  }

  onGetOpenSubscrption() {
    this.router.navigate(['/lawyer-directory/subscription-plan']);
    localStorage.setItem('isSubscription', 'true')
  }

  getUserProfile() {
    this.getToken = sessionStorage.getItem('access_token')
    console.log(this.getToken);

    this.rolesLength = localStorage.getItem('roles_length')
    console.log(this.rolesLength);

    this.roles = localStorage.getItem('roles');
    console.log(this.roles);

    // if ((this.rolesLength == 1 || 0) || (this.roles == 1 || 0)) {
    //   console.log("1")
    //   this.router.navigate(['/lawyer-directory/user-profile']);
    // } else {
    let membership = localStorage.getItem('has_membership')
    if (membership === 'yes')
      this.router.navigate(['/lawyer-directory/listing-details']);
    else
      this.router.navigate(['/lawyer-directory/listing-details-normal-profile']);

    // }
  }

  logout() {
    this.authService.logout();
  }
}
