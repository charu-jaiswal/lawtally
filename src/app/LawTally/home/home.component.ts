import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../core/users.service';
import { AuthService } from '../../core/auth.service';
import { ModalService } from 'src/app/core/modal.service';
declare let $: any;
declare let jQuery: any;
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  getToken;
  rolesLength;
  getData;
  roles;
  googleAddress: any = "";
  searchlawyers: any = "";
  latitude;
  longitude;
  response_address: any;
  city: any;
  state: any;
  country: any;
  location: any;
  LawyersNearMe: any;
  selcountry:string='';

  getcountryList = [
    { "name": "Australia", "id": "Australia" },
    { "name": "Canada", "id": "Canada" },
    { "name": "United Kingdom", "id": "United Kingdom" },
    { "name": "United States", "id": "United States" }
];


  constructor(
    public usersService: UsersService,
    public router: Router,
    public authService: AuthService,
    private modalService: ModalService,
  ) {
    this.usersService.getPracticeArea();
    this.usersService.getlawtallyAdminDetails();
    console.log("Lawyer", this.usersService.AdminDetails);
   localStorage.removeItem('user_id');
  }

  ngOnInit() {
    this.getPracticeArea();
    this.getStates();
         this.getCities();
         this.usersService.setstorage("filterListing",this.setobjforfilter)
    this.selcountry='United States';
    localStorage.removeItem('setsearchbyregionval');
    localStorage.setItem('setsearchbyregionval',this.selcountry);

    let cc = localStorage.getItem('currentCity');
    console.log(cc);
    // if (!cc) {
    //   this.modalService.open('whereareu')
    // } else {
    //   this.get_home_listing(cc);
    // }
    if (cc == null) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log(longitude, latitude);
        new google.maps.Geocoder()
          .geocode({
            'latLng': new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
          }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK && results[0]) {
              results[0].address_components.forEach(element => {
                if (element.types.includes("administrative_area_level_2")) {
                  let city = element.long_name;
                  this.googleAddress = city;
                  localStorage.setItem('currentCity', city);
                  this.get_home_listing(city)
                }
              });
            }
          });
      }, error => {
        this.googleAddress = cc;
        this.get_home_listing(cc);
      });
    } else {
      this.googleAddress = cc;
      this.get_home_listing(cc);
    }
    this.getToken = sessionStorage.getItem('access_token')

    this.rolesLength = localStorage.getItem('roles_length')

    this.roles = localStorage.getItem('roles');

    this.usersService.getPracticeArea();
    this.getData = 'add'
    if ((this.roles && this.roles.includes('lawyer')) && (this.getToken != null)) {
      this.getData = 'edit'
    } else if (((this.rolesLength == 1 || 0) || (this.roles == null)) && (this.getToken != null)) {
      this.getData = 'add'
    } else {
      this.getData = 'add'
    }

    console.log(this.getData);

    // window.scrollTo(0, 0);
    $(".point-choose-what-to-do").on("click", function () {
      $(this).addClass("active");
      $(".point-find-what-you, .point-stay-with, .point-happy-customer").removeClass("active")
      $(".point-choose-what-content").addClass("active");
      $(".point-find-what-you-content, .point-stay-with-content,.point-happy-customer-content").removeClass("active");
    });

    $(".point-find-what-you").on("click", function () {
      $(this).addClass("active");
      $(".point-choose-what-to-do, .point-stay-with, .point-happy-customer").removeClass("active")
      $(".point-find-what-you-content").addClass("active");
      $(".point-choose-what-content, .point-stay-with-content,.point-happy-customer-content").removeClass("active");
    });

    $(".point-stay-with").on("click", function () {
      $(this).addClass("active");
      $(".point-find-what-you, .point-choose-what-to-do, .point-happy-customer").removeClass("active")
      $(".point-stay-with-content").addClass("active");
      $(".point-find-what-you-content, .point-choose-what-content, .point-happy-customer-content").removeClass("active");
    });

    $(".point-happy-customer").on("click", function () {
      $(this).addClass("active");
      $(".point-find-what-you, .point-stay-with, .point-choose-what-to-do").removeClass("active")
      $(".point-happy-customer-content").addClass("active");
      $(".point-find-what-you-content, .point-stay-with-content,.point-choose-what-content").removeClass("active");
    });


    jQuery(document).ready(function () {
      $('[data-responsive-tabs]').responsivetabs({});
    });


    jQuery(document).ready(function ($) {
      var offset = 300,
        offset_opacity = 1200,
        scroll_top_duration = 700,
        $back_to_top = $('.cd-top');
      $(window).scroll(function () {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
          $back_to_top.addClass('cd-fade-out');
        }
      });
      $back_to_top.on('click', function (event) {
        event.preventDefault();
        $('body,html').animate({
          scrollTop: 0,
        }, scroll_top_duration
        );
      });
    });

    $(".footer-manu-head").on("click", function () {
      $(this).siblings(".footer-manu-links").slideToggle("slow");
      $(this).parent().parent().siblings().find(".footer-manu-links").slideUp("slow");
      $(this).parent().siblings().find(".footer-manu-links").slideUp("slow");
    });

    var doc_width = $(window).width();
    if (doc_width < 768) {
      $(".menu-section li a, .responsive-show-section").on("click", function () {        
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
  }
  practiceAreaList;
  stateList;
  cityList;
  setobjforfilter= {
    "practice":"",
    "state":"",
    "city":""
  };
  getPracticeArea(){
    this.usersService.practic_area().subscribe(res => {
     console.log("practiceAreaList",res);
     
      this.practiceAreaList = res['response_data'];
      
    });
    }
    
    getStates(){
      this.usersService.get_states().subscribe(res => {
       console.log("stateList",res);
       
        this.stateList = res['response_data'];
        
      });
      }
    
      getCities(){
      this.usersService.get_cities().subscribe(res => {
       console.log("cityList",res);
       
        this.cityList = res['response_data'];
        
      });
      }

      selectPracticArea(x){
        this.setobjforfilter.practice = x;
        this.usersService.setstorage("filterListing",this.setobjforfilter)
        this.router.navigate(['/lawyer-directory/home-listing-search']);
      }
    
    selectState(x){
      this.setobjforfilter.state = x;
      this.usersService.setstorage("filterListing",this.setobjforfilter)
        this.router.navigate(['/lawyer-directory/listing']);
      }
    
      selectCity(x){
        this.setobjforfilter.city = x;
        this.usersService.setstorage("filterListing",this.setobjforfilter)
        this.router.navigate(['/lawyer-directory/listing']);
      }

      counter(i: number) {
        return new Array(i);
      }

  setcountryvalfunc(param1) {
      localStorage.removeItem('setsearchbyregionval');
      localStorage.setItem('setsearchbyregionval',param1);
  }

  searchbycountryfunc() {
    this.router.navigate(['/lawyer-directory/listing', { address:'undefined', lawyer:'undefined', search_country: localStorage.getItem('setsearchbyregionval')}]);
  }

  onsubmitNewsletter(newsletter) {
    if (newsletter.valid) {
      this.usersService.submitNewsletter(newsletter);
    }
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
    //   console.log("2")
      let membership = localStorage.getItem('has_membership')
      if(membership === 'yes')
        this.router.navigate(['/lawyer-directory/listing-details']);
      else
        this.router.navigate(['/lawyer-directory/listing-details-normal-profile']);
    // }
  }

  getQuestionListing(practice_id) {
    this.router.navigate(['/lawyer-directory/see-all-questions', { practice_id: practice_id }]);
  }

  public handleAddressChange(gaddress: any) {
    // debugger;  
    this.googleAddress = gaddress.formatted_address;
    this.response_address = gaddress;

    for (var i = 0; i < gaddress.address_components.length; i++) {
      if (gaddress.address_components[i].types[0] == 'country') {
        // console.log(address.address_components[i].long_name);
        this.country = gaddress.address_components[i].long_name;                  //for country name
      }
      if (gaddress.address_components[i].types[0] == 'administrative_area_level_1') {
        //  console.log(address.address_components[i].long_name);                
        this.state = gaddress.address_components[i].long_name;                //for state name
      }
      if (gaddress.address_components[i].types[0] == 'locality') {
        // console.log(address.address_components[i].long_name);
        this.city = gaddress.address_components[i].long_name;                  //for city name
      }
    }
    this.googleAddress = this.city;
    console.log(this.latitude)
    console.log(this.longitude)
  }

  SearchButton() {
    if (this.getToken == "" || this.getToken == null || this.getToken != "" || this.getToken != null) {
      this.router.navigate(['/lawyer-directory/listing', { address: this.city, lawyer: this.searchlawyers }]);
    }
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


  logout() {
    window.location.reload();
    this.authService.logout();
  }

  get_home_listing(city) {
    console.log("4444444",city);
    this.usersService.getHomeListing(city ? city.toLowerCase() : null)
      .subscribe((data: any) => {
        console.log(data);
        if (data.status === 'SUCCESS') {
          this.LawyersNearMe = data.response_data;
        console.log("this.LawyersNearMe",this.LawyersNearMe);
        
          
        }
      })
  }

  showMeLawyer(lawyer) {
    this.router.navigate(['/lawyer-directory/listing-details', { id: lawyer.id }]);
    window.scrollTo(0, 0);
  }

  public handleAddressChange2(gaddress: any) {
    for (var i = 0; i < gaddress.address_components.length; i++) {
      if (gaddress.address_components[i].types[0] == 'locality') {
        localStorage.setItem('currentCity', gaddress.address_components[i].long_name)
        this.get_home_listing(gaddress.address_components[i].long_name)
        this.modalService.close('whereareu')
      }
    }
  }

  openClaimProfile() {
    console.log("claim profile")
    this.router.navigate(['/lawyer-directory/cliam-profile'])
  }

  gotoListing(practiceAreaId) {
    this.router.navigate(['/lawyer-directory/listing', { practiceArea: practiceAreaId }])
  }
}
