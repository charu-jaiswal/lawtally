import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../core/users.service';
import { AuthService } from '../../../core/auth.service';
declare let $: any;
declare let jQuery: any;

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  getToken;
  rolesLength;
  getData;
  roles;
  userProfileData;
  setcolor;
  constructor(
    public usersService: UsersService,
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.getToken = sessionStorage.getItem('access_token')
    console.log(this.getToken)
    this.rolesLength = localStorage.getItem('roles_length')

    this.roles = localStorage.getItem('roles');

    this.usersService.getPracticeArea();

    console.log(this.roles, ((this.rolesLength > 1)) && (this.getToken != null));

    if ((this.roles && this.roles.includes('lawyer')) && (this.getToken != null)) {
      this.getData = 'edit'
    } else if (((this.rolesLength == 1 || 0) || (this.roles == null)) && (this.getToken != null)) {
      this.getData = 'add'
    } else {
      this.getData = 'add'
    }

    this.userProfileData = JSON.parse(localStorage.getItem('user_detail'))
    console.log('userProfileData', this.userProfileData);
    
    var doc_width = $(window).width();
    if (doc_width < 768) {
      $(".menu-section li a, .responsive-show-section,.sub-menu-section-block").on("click", function () {        
        $("body").css({ "margin": "0", "overflow-x": "auto", "position": "relative" });
        $("#mySidenav").css("transform", "translateX(-250px)");        
      });
      $(".sub-menu-section-block").on("click", function () {                    
        $("#mySidenav").css("transform", "translateX(-250px)");        
        $("#main").removeClass("overlay");
        $(this).slideUp("slow");
      });
      $(".menu-section li a.free-q-a-li-a").on("click", function () {
        // $("body").css({ "margin-left": "250px", "overflow-x": "auto", "position": "relative" });
        $("#mySidenav").css("transform", "translateX(0px)");
        $(".sub-menu-section-block").slideToggle("slow");
      });
    }

    this.usersService.headercolor.subscribe(data => {
      this.setcolor = data;
      console.log("===============================================================",data);
    })

  }

  getQuestionListing(practice_id) {
    this.router.navigate(['/lawyer-directory/see-all-questions', { practice_id: practice_id }]);
  }

  openNav() {
    document.getElementById("mySidenav").style.transform = "translateX(0px)", $("body").css({      
      "overflow-x": "hidden",
      transition: "margin-left .5s",
      position: "fixed"
    }), $("#main").addClass("overlay")
  }

  closeNav() {
    document.getElementById("mySidenav").style.transform = "translateX(-250px)", $("body").css({
      "margin-left": "0px",
      transition: "margin-left .5s",
      position: "relative"
    }), $("#main").removeClass("overlay")
  }

  onGetSubscrption() {
    this.router.navigate(['/lawyer-directory/subscription-plan']);
    localStorage.setItem('isSubscription', 'false')
    // if('subscription' == null){
    //   this.router.navigate(['/lawyer-directory/subscription-plan']);
    // }else{
    //   this.router.navigate(['/lawyer-directory/add-lawyer']);
    // }

  }

  getUserProfile() {
    this.getToken = sessionStorage.getItem('access_token')
    console.log("uuauauauauauuaauuauauaua777a7a8a88a8a9a9a89a",this.getToken);

    this.rolesLength = localStorage.getItem('roles_length')
    console.log(this.rolesLength);

    this.roles = localStorage.getItem('roles');
    console.log(this.roles);

  // debugger;
      // let membership = localStorage.getItem('membership')
      // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",membership);
      
      // if(membership == 'yes')
      //   this.router.navigate(['/lawyer-directory/listing-details']);
      // else
      //   this.router.navigate(['/lawyer-directory/listing-details-normal-profile']);
       let membership = localStorage.getItem('has_membership')
       console.log("  main header membership", membership);
       
      if(membership === 'yes')
        this.router.navigate(['/lawyer-directory/listing-details']);
      else
        this.router.navigate(['/lawyer-directory/listing-details-normal-profile']);

   
  }

  findalawyer(){

      let setobjforfilter= {
          "practice":"",
          "state":"",
          "city":""
        };
        this.usersService.setstorage("filterListing",setobjforfilter)
        this.router.navigate(['/lawyer-directory/listing']);
        
     

  }

  logout() {
    this.authService.logout();
  }
}
