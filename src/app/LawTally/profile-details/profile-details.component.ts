import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../core/users.service";
import { AuthService } from "../../core/auth.service";
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/core/modal.service';
import Swal from 'sweetalert2';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

declare let $: any;
declare let jQuery: any;
declare var google;

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
    userAge: any = [];
    getToken;
    rolesLength;
    roles;
    getData;
    isLoggedIn: boolean = false;
    isUserLawyer: boolean = false;
    userId = '';
    lawyerEndorsement = [];

    lawyerid;
    directionData: string;
    avgStars;
    nonStars;
    reviewFlag: boolean = true;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public usersService: UsersService,
        public authService: AuthService,
        private modalService: ModalService
    ) { }

    ngOnInit() {
      
        this.isLoggedIn = sessionStorage.getItem('access_token') != null;
        this.userId = localStorage.getItem('user_id');
        this.isUserLawyer = localStorage.getItem('roles') ? localStorage.getItem('roles').includes('lawyer') : false;

        this.lawyerid = this.route.snapshot.paramMap.get('id');
        this.usersService.getlawtallyAdminDetails();
        this.getLawyerDetails();
        this.getToken = sessionStorage.getItem('access_token');

        this.roles = localStorage.getItem('roles');
        if ((this.roles && this.roles.includes('lawyer'))) {
            this.getData = 'edit'
            console.log(this.getData)
        } else {
            this.getData = 'add'
            console.log(this.getData)
        }

        setTimeout(() => {
            let action = localStorage.getItem('STACK_TRACE_ACTION')
            if (action) {
                localStorage.setItem('STACK_TRACE_ACTION', null)
                switch (action) {
                    case 'openReviewModal':
                        this.openReviewModal()
                        break;
                    case 'endorse':
                        this.endorse()
                        break;
                    case 'sendEnquiryModal':
                        this.sendEnquiryModal()
                        break;
                    default:
                        break;
                }
            }
        }, 1000);

        // window.scrollTo(0, 0);
        //  back to Top Start Here  
        // jQuery(document).ready(function ($) {
        //     var offset = 300,
        //         offset_opacity = 1200,
        //         scroll_top_duration = 700,
        //         $back_to_top = $('.cd-top');
        //     $(window).scroll(function () {
        //         ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        //         if ($(this).scrollTop() > offset_opacity) {
        //             $back_to_top.addClass('cd-fade-out');
        //         }
        //     });
        //     $back_to_top.on('click', function (event) {
        //         event.preventDefault();
        //         $('body,html').animate({
        //             scrollTop: 0,
        //         }, scroll_top_duration
        //         );
        //     });
        // });

        // $(document).ready(function(){
        var is_first_time = true;
        $('a.slide-to').on('click', function (event) {
            event.preventDefault();
            var target = $(this).attr("href");
            var scrollHeight = $(target).offset().top - 205;
            if (is_first_time) {
                is_first_time = false;
                scrollHeight = $(target).offset().top - 200;
            }
            $('html,body').animate({
                scrollTop: scrollHeight
            }, 2000);
        });
        //  });			

        $(window).scroll(function () {
            var scrollDistance = $(window).scrollTop();
            if ($("#about-me").position()) {
                var about_me_top = $("#about-me").position().top;
            }
            if (scrollDistance < about_me_top) {
                $('.slide-to.active').removeClass('active');
                $('.slide-to').eq(0).addClass('active');
            } else {
                $('.page-section').each(function (i) {
                    if ($(this).position().top <= scrollDistance) {
                        $('.slide-to.active').removeClass('active');
                        $('.slide-to').eq(i).addClass('active');
                    }
                });
            }
        }).scroll();

        // Sticky Head
        $(window).scroll(function () {
            if ($(this).scrollTop() > 360) {
                $('.details-tabbing-section-main, .details-tab-content-section').addClass("menu-sticky");
            }
            else {
                $('.details-tabbing-section-main, .details-tab-content-section').removeClass("menu-sticky");
            }
        });

        $(".sectoin-menu-head-block").on("click", function () {
            $(this).siblings("ul").slideToggle("slow");
        });
        $(".slide-to").on("click", function () {
            $(this).parent().parent().slideUp("slow");
        });

        var doc_width = $(window).width();
        if (doc_width < 768) {
            $(".menu-section li a, .responsive-show-section").on("click", function () {
                $("body").css({ "margin": "0", "overflow-x": "auto", "position": "relative" });
                $("#mySidenav").css("transform", "translateX(-250px)");
            });
        }
        this.getEndorseDetails();
    }

    openurl(url){
        url = url.includes('https') ? url : "https://" + url;
        window.open(url,  "_blank");
       
    }

    openemail(email){
 window.location.href = "mailto:"+ email +"?subject=Subject&body=message%20goes%20here";
// window.location.href = "mailto:"+ email +"?subject=Subject&body=message%20goes%20here"; 
    }

    openClaimProfile(profile) {
        localStorage.setItem('claimProfile', JSON.stringify(profile));
        setTimeout(() => {
          this.router.navigate(['/lawyer-directory/cliam-profile-details'])
        }, 150);
      }

    getLawyerDetails() {
        this.usersService.getLawyerDetails(this.lawyerid)
            .then(() => {
                setTimeout(() => {
                    // this.initMap();
                }, 1000);
                console.log(this.usersService.lawyerDetailsList[0].reviews)
                let starcnt = Math.round(this.usersService.lawyerDetailsList[0].average_review);
                this.avgStars = Array(starcnt).fill(0).map((x, i) => i);
                this.nonStars = Array(5 - starcnt).fill(0).map((x, i) => i);
                // console.log(this.avgStars, this.nonStars);
                if (this.usersService.lawyerDetailsList[0].reviews) {
                    this.usersService.lawyerDetailsList[0].reviews.forEach((rev) => {
                        if (rev.review_from === this.usersService.AdminDetails[0].full_name) {
                            this.reviewFlag = false;
                        }
                    })
                }

            });
    }

    getEndorseDetails() {
        this.usersService.getEndorseDetails(this.lawyerid).subscribe((data: any) => {
            console.log(data)
            this.lawyerEndorsement = data['response_data'].lawyer_endorsement ? data['response_data'].lawyer_endorsement : [];
            console.log(this.lawyerEndorsement)
            if (this.lawyerEndorsement && this.lawyerEndorsement.length > 0) {
                this.lawyerEndorsement.forEach(element => {
                    if (element.user_id === this.userId) {
                        this.isUserLawyer = false;
                    }
                });
            }
        })
        console.log(this.isUserLawyer)
        this.lawyerid = this.route.snapshot.paramMap.get('id');
        this.isLoggedIn = sessionStorage.getItem('access_token') != null;
        this.userId = localStorage.getItem('user_id');
        console.log(this.lawyerid)
        console.log(this.isLoggedIn)
        console.log(this.userId)

    }

    logout() {
        this.authService.logout();
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
  

    setpractic(x){
        let setobjforfilter= {
            "practice":x,
            "state":"",
            "city":""
          };
          this.usersService.setstorage("filterListing",setobjforfilter)
          this.router.navigate(['/lawyer-directory/listing']);
          
       }

       setstate(x){
        let setobjforfilter= {
            "practice":"",
            "state":x,
            "city":""
          };
          this.usersService.setstorage("filterListing",setobjforfilter)
          this.router.navigate(['/lawyer-directory/listing']);
          
       }

       setcity(x){
        let setobjforfilter= {
            "practice":"",
            "state":"",
            "city":x
          };
          this.usersService.setstorage("filterListing",setobjforfilter)
          this.router.navigate(['/lawyer-directory/listing']);
          
       }

    scroll(to) {
        if (to == "overview") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        let dom = document.getElementById(to).offsetTop;
        if (dom) {
            window.scrollTo({ top: dom + 350, behavior: "smooth" });
        }
    }

    openReviewModal() {
        if (!this.isLoggedIn) {
            Swal.fire({
                position: 'center',
                title: 'Please login or signup to continue...',
                showConfirmButton: false,
                timer: 3000,
            });
            localStorage.setItem('STACK_TRACE', JSON.stringify({ "LawyerNormal": this.lawyerid }))
            localStorage.setItem('STACK_TRACE_ACTION', "openReviewModal")
            this.router.navigateByUrl('/lawyer-directory/login')
            return;
        }
        this.modalService.open('sendReviewForm')
    }

    sendReview(reviewData) {
        this.modalService.close('sendReviewForm')
        console.log(reviewData);
        reviewData['to_id'] = this.lawyerid;
        this.usersService.sendReview(reviewData).subscribe((data) => {
            console.log(data)
            this.usersService.getLawyerListingDetails(this.lawyerid);
            if (data.status === 'SUCCESS') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Review Submitted successfully',
                    showConfirmButton: false,
                    timer: 500,
                });
                this.getLawyerDetails();
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Something went wrong',
                    showConfirmButton: false,
                    timer: 500,
                });
            }
        })
    }

    counter(i: number) {
        return new Array(i);
    }

    endorse() {
        if (!this.isLoggedIn) {
            Swal.fire({
                position: 'center',
                title: 'Please login or signup to continue...',
                showConfirmButton: false,
                timer: 3000,
            });
            localStorage.setItem('STACK_TRACE', JSON.stringify({ "LawyerNormal": this.lawyerid }))
            localStorage.setItem('STACK_TRACE_ACTION', "endorse")
            this.router.navigateByUrl('/lawyer-directory/login')
            return;
        }
        if (!this.isUserLawyer) {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'You can\'t endorse as you are not registered as a lawyer.',
                showConfirmButton: false,
                timer: 500,
            });
            return;
        }
        Swal.fire({
            title: 'Endorse ' + this.usersService.lawyerDetailsList[0].full_name,
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Relationship">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Description">',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Endorse',
            cancelButtonText: 'Discard',
            customClass: {
                container: 'swal-endorse-container'
            },
            preConfirm: () => {
                let user = this.usersService.lawyerDetailsList;
                let data = {
                    value: [
                        document.getElementById('swal-input1')['value'],
                        document.getElementById('swal-input2')['value']
                    ]
                }
                if (user && user[0] && user[0]['_id'] && data.value && data.value[0] && data.value[1]) {
                    this.usersService.endorseLawyer({
                        lawyer_id: user[0]['_id'],
                        relationship: data.value[0],
                        description: data.value[1]
                    })
                }
                this.getEndorseDetails();
                this.ngOnInit();
            }
        })
    }

    fav(isFav = 'no') {
        if (!this.isLoggedIn) {
            Swal.fire({
                position: 'center',
                title: 'Please login or signup to continue...',
                showConfirmButton: false,
                timer: 3000,
            });
            localStorage.setItem('STACK_TRACE', JSON.stringify({ "LawyerNormal": this.lawyerid }))
            this.router.navigateByUrl('/lawyer-directory/login')
            return;
        }

        let is_favourite = isFav != 'no';
        if (!is_favourite) {
            if (this.lawyerid) {
                this.usersService.addFavourites({ lawyer_id: this.lawyerid })
            }
        } else {
            if (this.lawyerid) {
                this.usersService.removeFavourites({ lawyer_id: this.lawyerid })
            }
        }
    }

    getDirection(latitude, longitude) {
        console.log(latitude, longitude)
        // this.directionData = "http://maps.google.com/?q="+ latitude + ',' + longitude;
        this.directionData = "https://maps.google.com/maps/?q=" + latitude + ',' + longitude + "&hl=es;z=14&amp;output=embed";
        console.log(this.directionData)
        window.open(this.directionData, '_blank');
    }

    facebook(fbLink) {
        fbLink = fbLink.includes('https') ? fbLink : "https://" + fbLink;
        window.open(fbLink, '_blank')
    }

    twitter(twitterLink) {
        twitterLink = twitterLink.includes('https') ? twitterLink : "https://" + twitterLink;
        window.open(twitterLink, '_blank')
    }

    linkedin(linkedinLink) {
        linkedinLink = linkedinLink.includes('https') ? linkedinLink : "https://" + linkedinLink;
        window.open(linkedinLink, '_blank')
    }

    sendEnquiryModal() {
        if (!this.isLoggedIn) {
            Swal.fire({
                position: 'center',
                title: 'Please login or signup to continue...',
                showConfirmButton: false,
                timer: 3000,
            });
            localStorage.setItem('STACK_TRACE', JSON.stringify({ "LawyerNormal": this.lawyerid }))
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

    initMap() {
        const firms = this.usersService.lawyerFirm;
        console.log(document.getElementById("map_canvas"));
        if (firms && firms.length) {
            var map, map2;
            var bounds = new google.maps.LatLngBounds();
            var mapOptions = {
                mapTypeId: 'roadmap'
            };

            // Display a map on the page
            map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
            map2 = new google.maps.Map(document.getElementById("map_canvas2"), mapOptions);
            map.setTilt(45);
            map2.setTilt(45);


            // Multiple Markers
            var markers = [];
            firms.forEach(firm => {
                markers.push(
                    [firm.firm_address, +firm.latitude, +firm.longitude]
                )
            });

            // Display multiple markers on a map
            var infoWindow = new google.maps.InfoWindow(), marker, i;

            // Loop through our array of markers & place each one on the map  
            for (i = 0; i < markers.length; i++) {
                var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                bounds.extend(position);
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: markers[i][0]
                });

                marker = new google.maps.Marker({
                    position: position,
                    map: map2,
                    title: markers[i][0]
                });
                // Automatically center the map fitting all markers on the screen
                map.fitBounds(bounds);
                map2.fitBounds(bounds);
            }

            let zoomChangeBoundsListener =
                google.maps.event.addListenerOnce(map, 'bounds_changed', function (event) {
                    if (this.getZoom()) {
                        this.setZoom(16);
                    }
                });
            setTimeout(function () { google.maps.event.removeListener(zoomChangeBoundsListener) }, 1000);
            let zoomChangeBoundsListener2 =
                google.maps.event.addListenerOnce(map2, 'bounds_changed', function (event) {
                    if (this.getZoom()) {
                        this.setZoom(14);
                    }
                });
            setTimeout(function () { google.maps.event.removeListener(zoomChangeBoundsListener2) }, 1000);
        }
    }

    openShareModal() {
        this.modalService.open('shareForm')
    }

    readmore(name) {
        this.usersService.lawyerDetailsList.forEach((lawyer) => {
            lawyer.reviews.forEach((data) => {
                if (data.review_from === name) {
                    if (data['readMore'] = true) {
                        data['readMore'] = false;
                    }
                }
            })
        })
    }

    hidemore(name) {
        this.usersService.lawyerDetailsList.forEach((lawyer) => {
            lawyer.reviews.forEach((data) => {
                if (data.review_from === name) {
                    data['readMore'] = true;
                }
            })
        })
    }


}

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

  
} 
