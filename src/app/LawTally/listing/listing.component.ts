import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UsersService } from 'src/app/core/users.service';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/core/modal.service';
declare let $: any;
declare let jQuery: any;
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  address: any = "";
  lawyer: any = "";
  practiceArea: string = "";
  searchlawyername: any = "";
  searchlocation: any = "";
  searchstate: any = "";
  Terms: boolean;
  profiletypeList: any = [];
  genderList: any = [];
  experienceList: any = ['', ''];
  maxDistance = '';
  languagespoken: any = "";
  clientsatisfaction: any = "";
  cp = 1;
  googleAddress: any;
  latitude: any;
  longitude: any;
  readMore: boolean = true;
  readMoreDes: boolean = true;
  searchcountry: any = "";
  searchcountryname: any = "";
  lawyerid: any;
  isLoggedIn: boolean = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    public usersService: UsersService,
    private modalService: ModalService) { }

  ngOnInit() {      

    
this.isLoggedIn = sessionStorage.getItem('access_token') != null;
    this.address = this.route.snapshot.paramMap.get('address');
    this.lawyer = this.route.snapshot.paramMap.get('lawyer');
    this.searchcountry = this.route.snapshot.paramMap.get('search_country');
    this.practiceArea = this.route.snapshot.paramMap.get('practiceArea');
     console.log(  this.practiceArea," this.practiceArea");
     
    if (this.address == "" || this.address == "undefined" || this.address == null) {
      this.searchlocation = "";
    }
    else {
      this.searchlocation = this.address;
    }
    if (this.lawyer == "" || this.lawyer == "undefined" || this.lawyer == null) {
      this.searchlawyername = "";
    }
    else {
      this.searchlawyername = this.lawyer;
    }

    if (this.searchcountry == "" || this.searchcountry == "undefined" || this.searchcountry == null) {
      this.searchcountryname = "";
    }
    else {
      this.searchcountryname = this.searchcountry;
    }

    if (this.practiceArea === undefined || this.practiceArea === null) {
      this.practiceArea = "";
    }

    if(this.usersService.getstorage("filterListing")){
      if(this.usersService.getstorage("filterListing").practice) {
        console.log("a1");
        this.practiceArea = this.usersService.getstorage("filterListing").practice._id;
      }
       if(this.usersService.getstorage("filterListing").state) {
        console.log("a2");
      this.searchstate = this.usersService.getstorage("filterListing").state.state_name;
      }

       if(this.usersService.getstorage("filterListing").city) {
        console.log("a3");
        this.searchlocation = this.usersService.getstorage("filterListing").city.city_name;
      }
    }

    this.usersService.getLawyerList(this.searchlocation, this.searchlawyername,this.searchcountryname, this.profiletypeList, this.genderList, this.experienceList, this.maxDistance, this.clientsatisfaction, this.languagespoken, this.practiceArea,this.searchstate );
    this.usersService.getprofiletypelist();
    this.usersService.getlanguage();
    this.usersService.getlawtallyAdminDetails();
    // window.scrollTo(0, 0);
    // jQuery(document).ready(function ($) {
    //   var offset = 300,
    //     offset_opacity = 1200,
    //     scroll_top_duration = 700,
    //     $back_to_top = $('.cd-top');
    //   $(window).scroll(function () {
    //     ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
    //     if ($(this).scrollTop() > offset_opacity) {
    //       $back_to_top.addClass('cd-fade-out');
    //     }
    //   });
    //   $back_to_top.on('click', function (event) {
    //     event.preventDefault();
    //     $('body,html').animate({
    //       scrollTop: 0,
    //     }, scroll_top_duration
    //     );
    //   });
    // });

    $(".filter-arrow-icon-section").on("click", function () {
      $("body").toggleClass("filter-open");
    });
this.checkfilters();
    
  }


  checkfilters(){
    console.log( "filterListing",   this.usersService.getstorage("filterListing"));

    if(this.usersService.getstorage("filterListing")){
      if(this.usersService.getstorage("filterListing").practice) {
        console.log("a1");
        
      }
       if(this.usersService.getstorage("filterListing").state) {
        console.log("a2");
      }

       if(this.usersService.getstorage("filterListing").city) {
        console.log("a3");
      }
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  onChangeFilters(isChecked: boolean, profiletype_id) {
    if (isChecked) {
      //this.Terms = true
      this.profiletypeList.push(profiletype_id)
      console.log(' if  profiletypeList', this.profiletypeList);

      this.searchcountryname='';
      // similar_lawyers

      this.usersService.getLawyerList(this.searchlocation, this.searchlawyername,this.searchcountryname, this.profiletypeList, this.genderList, this.experienceList, this.maxDistance, this.clientsatisfaction, this.languagespoken, this.practiceArea,this.searchstate )
    
     
    } else {
      // this.Terms = false
      var index = this.profiletypeList.indexOf(profiletype_id);
      this.profiletypeList.splice(index, 1);
      console.log(' else profiletypeList', this.profiletypeList);
      this.searchcountryname='';
      this.usersService.getLawyerList(this.searchlocation, this.searchlawyername,this.searchcountryname, this.profiletypeList, this.genderList, this.experienceList, this.maxDistance, this.clientsatisfaction, this.languagespoken, this.practiceArea,this.searchstate );
    }
  }
  onChangeGender(event: any) {
    this.genderList = event.target.value;
    this.searchcountryname='';
    this.usersService.getLawyerList(this.searchlocation, this.searchlawyername,this.searchcountryname, this.profiletypeList, this.genderList, this.experienceList, this.maxDistance, this.clientsatisfaction, this.languagespoken, this.practiceArea,this.searchstate );
  }
  onChangeExperience(minExperience, maxExperience) {
    console.log(minExperience, maxExperience);
    this.experienceList = [];
    this.experienceList.push(minExperience);
    this.experienceList.push(maxExperience);
    this.searchcountryname='';
    this.usersService.getLawyerList(this.searchlocation, this.searchlawyername,this.searchcountryname, this.profiletypeList, this.genderList, this.experienceList, this.maxDistance, this.clientsatisfaction, this.languagespoken, this.practiceArea,this.searchstate );
    // if (isChecked) {
    //   // this.Terms = true
    //   this.experienceList.push("" + id + "")
    // this.usersService.getLawyerList(this.searchlocation, this.searchlawyername, this.profiletypeList, this.genderList, this.experienceList, this.maxDistance, this.clientsatisfaction, this.languagespoken, this.practiceArea);
    // } else {
    //   //this.Terms = false
    //   var index = this.experienceList.indexOf(id);
    //   this.experienceList.splice(index, 1);
    //   this.usersService.getLawyerList(this.searchlocation, this.searchlawyername, this.profiletypeList, this.genderList, this.experienceList, this.maxDistance, this.clientsatisfaction, this.languagespoken, this.practiceArea);
    // }
  }
  onChangeDistance(event: any) {

    this.maxDistance = event.target.value;
    this.searchcountryname='';
    this.usersService.getLawyerList(this.searchlocation, this.searchlawyername,this.searchcountryname, this.profiletypeList, this.genderList, this.experienceList, this.maxDistance, this.clientsatisfaction, this.languagespoken, this.practiceArea,this.searchstate );
    // //if (isChecked) {
    //   // this.Terms = true
    //   this.maxDistance = id
    //   this.usersService.getLawyerList(this.searchlocation, this.searchlawyername, this.profiletypeList, this.genderList, this.experienceList, this.maxDistance, this.clientsatisfaction, this.languagespoken, this.practiceArea);
    // } else {
    //   //this.Terms = false
    //   var index = this.maxDistance.indexOf(id);
    //   this.maxDistance.splice(index, 1);
    //   this.usersService.getLawyerList(this.searchlocation, this.searchlawyername, this.profiletypeList, this.genderList, this.experienceList, this.maxDistance, this.clientsatisfaction, this.languagespoken, this.practiceArea);
    // }
  }
  getclientsatisfaction(event: any) {
    this.clientsatisfaction = +event.target.value;

    this.searchcountryname='';

    this.usersService.getLawyerList(this.searchlocation, this.searchlawyername,this.searchcountryname, this.profiletypeList, this.genderList, this.experienceList, this.maxDistance, this.clientsatisfaction, this.languagespoken, this.practiceArea,this.searchstate );
  }
  getselectedlanguage(event: any) {
    this.languagespoken = event.target.value;
  }
  apply_filters() {
    this.searchcountryname='';
    this.usersService.getLawyerList(this.searchlocation, this.searchlawyername,this.searchcountryname, this.profiletypeList, this.genderList, this.experienceList, this.maxDistance, this.clientsatisfaction, this.languagespoken, this.practiceArea,this.searchstate );
  }
  onlawyerclick(id, ismember) {
    var lid = id;
    console.log("Ismember", ismember)
    if (ismember == 'yes') {
      this.router.navigate(['/lawyer-directory/listing-details', { id: lid }]);
    }
    else {
      this.router.navigate(['/lawyer-directory/listing-details-normal-profile', { id: lid }]);
    }
  }

  public handleAddressChange(address: any) {
    this.googleAddress = address.formatted_address
    console.log(address)
    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
  }

  exquiry(lawyer) {
    localStorage.setItem('STACK_TRACE_ACTION', "sendEnquiryModal")
    setTimeout(() => {
      if (lawyer.has_membership == 'yes') {
        this.router.navigate(['/lawyer-directory/listing-details', { id: lawyer._id }]);
      } else {
        this.router.navigate(['/lawyer-directory/listing-details-normal-profile', { id: lawyer._id }]);
      }
    }, 600);
  }

  readmore(id) {
    this.usersService.lawyerList.forEach((lawyer) => {
      if (lawyer._id === id) {
        lawyer.all_reviews.forEach((law) => {
          if (law['readMore'] = true) {
            law['readMore'] = false;
          }
        })
      }
    })
    // this.usersService.getLawyerList(this.searchlocation, this.searchlawyername, this.profiletypeList, this.genderList, this.experienceList, this.maxDistance, this.clientsatisfaction, this.languagespoken, this.practiceArea);
  }

  hidemore(id) {
    this.usersService.lawyerList.forEach((lawyer) => {
      if (lawyer._id === id) {
        lawyer.all_reviews.forEach((law) => {
          law['readMore'] = true;
        })
      }
    })
  }

  readmoreDes(id) {
    this.usersService.lawyerList.forEach((lawyer) => {
      if (lawyer._id === id) {
        if (lawyer['readMoreDes'] = true) {
          lawyer['readMoreDes'] = false;
        }
      }
    })
  }

  hidemoreDes(id) {
    this.usersService.lawyerList.forEach((lawyer) => {
      if (lawyer._id === id) {
        lawyer['readMoreDes'] = true;
      }
    })
  }

  scrollup() {
    window.scrollTo(0, 0);
  }


  sendEnquiryModal(x) {
    this.lawyerid = x;
    if (!this.isLoggedIn) {
        Swal.fire({
            position: 'center',
            title: 'Please login or signup to continue...',
            showConfirmButton: false,
            timer: 3000,
        });
        localStorage.setItem('STACK_TRACE', JSON.stringify({ "Lawyer": this.lawyerid }))
        localStorage.setItem('STACK_TRACE_ACTION', "sendEnquiryModal")
        this.router.navigateByUrl('/lawyer-directory/login')
        return;
    }
    this.modalService.open('sendEnquiryForm')
}

sendEnquiry(EnquiryData) {
 
    this.modalService.close('sendEnquiryForm')
    EnquiryData['to_user_id'] = this.lawyerid;
    EnquiryData['reply_preference'] = 'phone_call';
    console.log(EnquiryData);
    this.usersService.sendEnquiry(EnquiryData).subscribe((data) => {
        console.log(data)
        if (data.status === 'SUCCESS') {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Enquiry Submitted successfully',
                showConfirmButton: false,
                timer: 1000,
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: data.message,
                showConfirmButton: false,
                timer: 1000,
            });
        }
    })
    console.log(this.usersService.lawyerDetailsList)
}

}
