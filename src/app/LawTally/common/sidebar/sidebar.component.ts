import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
declare let $ : any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  getToken;
  rolesLength;
  getData;
  roles;

  constructor(
    public authService: AuthService,
    public router: Router,
    private permissionsService: NgxPermissionsService,
  ) {
    
   }

  ngOnInit() {
    this.rolesLength = +localStorage.getItem('roles_length');
    console.log('rolesLength', this.rolesLength);
    
    const perm = this.rolesLength === 1 ? ["USER"]: ["LAWYER"]; 
    console.log('perm', perm)
    this.permissionsService.loadPermissions(perm);
    $(".submenu-main-section").on("click", function(){
      $(this).children(".submenu-main-section ul").slideToggle("slow"); 
      $(this).siblings().find("ul").slideUp("slow");
    });


  $(".submenu-main-blog").on("click", function(){
    $(".submenu-main-blog ul").slideToggle("slow"); 
  });


  $(".submenu-main-setting").on("click", function(){
    $(".submenu-main-setting ul").slideToggle("slow"); 
  });

  

  }

  menuclose() {
    $("body").removeClass("desktop-left-menu");
  }
  
  getUserProfile(){
    $("body").removeClass("desktop-left-menu");
    this.getToken = sessionStorage.getItem('access_token')
    console.log(this.getToken);

    this.rolesLength = localStorage.getItem('roles_length')
    console.log(this.rolesLength);

    this.roles = localStorage.getItem('roles');
    console.log(this.roles);
     

    let membership = localStorage.getItem('has_membership')
      if(membership === 'yes')
        this.router.navigate(['/lawyer-directory/listing-details']);
      else
        this.router.navigate(['/lawyer-directory/listing-details-normal-profile']);
  }

  logout(){
    this.authService.logout();
  }

}
