import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/users.service';
import { Router } from '@angular/router';
declare var $ : any ; 

@Component({
  selector: 'app-menu-listing-search',
  templateUrl: './menu-listing-search.component.html',
  styleUrls: ['./menu-listing-search.component.css']
})

export class MenuListingSearchComponent implements OnInit {
  practiceAreaList;
  stateList;
  cityList;
  setobjforfilter= {
    "practice":"",
    "state":"",
    "city":""
  };
  constructor(public userService: UsersService,public router:Router) { }

  ngOnInit() {
this.footerjs();
     this.getPracticeArea();
this.getStates();
     this.getCities();

  }
  footerjs(){
    $(".footer-manu-head").on("click", function() {
      $(this).siblings(".footer-manu-links").slideToggle("slow");
      $(this).parent().parent().siblings().find(".footer-manu-links").slideUp("slow");
      $(this).parent().siblings().find(".footer-manu-links").slideUp("slow");
  });
  }

  openNav() {
    document.getElementById("mySidenav").style.transform = "translateX(0px)";
    $("body").css({
        "margin-left": "250px",
        "overflow-x": "hidden",
        "transition": "margin-left .5s",
        "position": "fixed"
    });
    $("#main").addClass("overlay");
}

 closeNav() {
    document.getElementById("mySidenav").style.transform = "translateX(-250px)";
    $("body").css({
        "margin-left": "0px",
        "transition": "margin-left .5s",
        "position": "relative"
    });
    $("#main").removeClass("overlay");
}


getPracticeArea(){
this.userService.practic_area().subscribe(res => {
 console.log("practiceAreaList",res);
 
  this.practiceAreaList = res['response_data'];
  
});
}

getStates(){
  this.userService.get_states().subscribe(res => {
   console.log("stateList",res);
   
    this.stateList = res['response_data'];
    
  });
  }

  getCities(){
  this.userService.get_cities().subscribe(res => {
   console.log("cityList",res);
   
    this.cityList = res['response_data'];
    
  });
  }

  selectPracticArea(x){
    this.setobjforfilter.practice = x;
    this.userService.setstorage("filterListing",this.setobjforfilter)
    this.router.navigate(['/lawyer-directory/home-listing-search']);
  }

selectState(x){
  this.setobjforfilter.state = x;
  this.userService.setstorage("filterListing",this.setobjforfilter)
    this.router.navigate(['/lawyer-directory/listing']);
  }

  selectCity(x){
    this.setobjforfilter.city = x;
    this.userService.setstorage("filterListing",this.setobjforfilter)
    this.router.navigate(['/lawyer-directory/listing']);
  }



}
