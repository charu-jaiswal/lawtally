import { Component, OnInit, ElementRef, Renderer } from "@angular/core";
import { HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "src/app/core/users.service";
import Swal from "sweetalert2";
import { ModalService } from "src/app/core/modal.service";
import { ThrowStmt } from "@angular/compiler";
import "chart.piecelabel.js";
declare let $: any;
declare let jQuery: any;
declare var google;

@Component({
  selector: "app-list-details",
  templateUrl: "./list-details.component.html",
  styleUrls: ["./list-details.component.css"],
})
export class ListDetailsComponent implements OnInit {
  //**charu Start */
  isStandard: boolean = false;
  isActive: any = 0;
  // isLaw:boolean=false;
  chartType: string = "pie";
  chartLabels: any = [];
  chartData: any = [];
  chartvalue: any = [];
  newchartdata: any = [];
  chartOptions: any = {
    pieceLabel: {
      render: function (args) {
        const label = args.label,
          value = args.value;
        return label + ": " + value;
      },
    },
  };
  //**charu Start */
  lawyerid: any;
  title: any = "";
  description: any = "";
  reviewMessage: any = "";
  checkErr: any = "";
  message: string = "";
  rating: any = "";
  consultation: any = "";
  recommend: any = "";
  anonymous: any = "";
  isLoggedIn: boolean = false;
  isUserLawyer: boolean = false;
  userId = "";
  lawyerEndorsement = [];
  avgStars;
  nonStars;
  reviewFlag: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public usersService: UsersService,
    private modalService: ModalService,
    private router: Router,
    public el: ElementRef,
    public renderer: Renderer
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);

    this.isLoggedIn = sessionStorage.getItem("access_token") != null;
  //  this.userId = localStorage.getItem("user_id");
    this.userId =localStorage.getItem("userLogged")

    console.log(localStorage.getItem("roles"));
    this.isUserLawyer = localStorage.getItem("roles")
      ? localStorage.getItem("roles").includes("lawyer")
      : false;

    this.lawyerid = this.route.snapshot.paramMap.get("id");
    this.usersService.getlawtallyAdminDetails();

    console.log("lawyerid>>>>>>>>>", this.lawyerid);
    if (this.lawyerid === null) this.lawyerid = localStorage.getItem("user_id");

    setTimeout(() => {
      let action = localStorage.getItem("STACK_TRACE_ACTION");
      if (action) {
        localStorage.setItem("STACK_TRACE_ACTION", null);
        switch (action) {
          case "openReviewModal":
            this.openReviewModal();
            break;
          case "endorse":
            this.endorse();
            break;
          case "sendEnquiryModal":
            this.sendEnquiryModal();
            break;
          default:
            break;
        }
      }
    }, 1000);

    this.getLawyerDetails();
    $("#reviewForm").parsley();

    $(".main-logo").attr("src", "assets/images/logo-white.png");
    // $('.header').css('background-image', 'url(../images/listing-details-banner-bg-patern.jpg)');
    $("#header").addClass("listing-details-banner-section-main");

    window.scrollTo(0, 0);
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
    //         }, scroll_top_duration);
    //     });
    // });

    // <!-- footer menu end Here  -->
    $(document).ready(function () {
      var is_first_time = true;
      $("a.slide-to").on("click", function (event) {
        $(this).addClass("active");
        $(this).parent().siblings().find(".slide-to").removeClass("active");
        event.preventDefault();
        var target = $(this).attr("href");
        var scrollHeight = $(target).offset().top - 110;
        if (is_first_time) {
          is_first_time = false;
          scrollHeight = $(target).offset().top - 99;
        }
        $("html,body").animate(
          {
            scrollTop: scrollHeight,
          },
          2000
        );
      });
    });

    /* Sticky HEad*/
    $(window).scroll(function () {
      if ($(this).scrollTop() > 370) {
        $(
          ".details-tabbing-section-main, .details-tab-content-section,.send-enquiry-section-main"
        ).addClass("menu-sticky");
        $(".send-inq-user-info").slideDown("slow");
      } else {
        $(
          ".details-tabbing-section-main, .details-tab-content-section,.send-enquiry-section-main"
        ).removeClass("menu-sticky");
        $(".send-inq-user-info").slideUp("slow");
      }
    });
    /* Sticky HEad*/
    $(window).scroll(function () {
      if ($(this).scrollTop() > 95) {
        $(".send-enquiry-section-main").addClass("sticky");
      } else {
        $(".send-enquiry-section-main").removeClass("sticky");
      }
    });
    //**tooltip Start */

    $(".tt_large").tooltip({
      template:
        '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner large"></div></div>',
    });
    this.accordian();
    //**tooltip End */
    this.getEndorseDetails();

    $(window).on("scroll", function () {
      if (
        $(window).scrollTop() >=
        $(".rating-count-seciton").offset().top +
          $(".rating-count-seciton").outerHeight() -
          window.innerHeight
      ) {
        $(".send-enquiry-section-main").css("display", "block");
      }
    });

    $(window).on("scroll", function () {
      if (
        $(window).scrollTop() >=
        $(".geeksforgeeks").offset().top +
          $(".geeksforgeeks").outerHeight() -
          window.innerHeight
      ) {
        $(".send-enquiry-section-main").css("display", "none");
      }
    });
  }
  accordian = () => {
    (function ($) {
      $(document).ready(function () {
        $("#cssmenu > ul > li > a").click(function () {
          $("#cssmenu li").removeClass("active");
          $(this).closest("li").addClass("active");
          var checkElement = $(this).next();
          if (checkElement.is("ul") && checkElement.is(":visible")) {
            $(this).closest("li").removeClass("active");
            checkElement.slideUp("normal");
          }
          if (checkElement.is("ul") && !checkElement.is(":visible")) {
            $("#cssmenu ul ul:visible").slideUp("normal");
            checkElement.slideDown("normal");
          }
          if ($(this).closest("li").find("ul").children().length == 0) {
            return true;
          } else {
            return false;
          }
        });
      });
    })(jQuery);

    /*faq accordian start here*/
    (function ($) {
      $(document).ready(function () {
        $("#faq_acc > ul > li > a").click(function () {
          $("#faq_acc li").removeClass("active");
          $(this).closest("li").addClass("active");
          var checkElement = $(this).next();
          if (checkElement.is("ul") && checkElement.is(":visible")) {
            $(this).closest("li").removeClass("active");
            checkElement.slideUp("normal");
          }
          if (checkElement.is("ul") && !checkElement.is(":visible")) {
            $("#faq_acc ul ul:visible").slideUp("normal");
            checkElement.slideDown("normal");
          }
          if ($(this).closest("li").find("ul").children().length == 0) {
            return true;
          } else {
            return false;
          }
        });
      });
    })(jQuery);
    /*faq accordian end here*/
  };
  getReviewFilter(filtertype: any) {}
  expandedIndex = -1;
  Collaps = (i: number) => {
    this.expandedIndex = this.expandedIndex == i ? -1 : i;
  };
  getLawyerDetails(filtertype?: any) {
    //charu
    this.isActive = filtertype || 0;
    this.usersService
      .getLawyerListingDetails(this.lawyerid, filtertype)
      .then((res: any) => {
        console.log(
          this.usersService.lawyerDetailsList[0],
          "this.usersService.lawyerDetailsList[0]"
        );
        console.log(
          this.usersService.lawyerDetailsList[0].full_name,
          " lawyerDetailsList fullname"
        );
        console.log(
          "asked_questions",
          this.usersService.lawyerDetailsList[0].asked_questions
        );

        //*****Review Filter Start */
        this.chartData = this.usersService.lawyerDetailsList[0].practice_area;
        this.chartLabels.length = 0;
        this.chartvalue.length = 0;
        this.chartData.forEach((element) => {
          this.chartLabels.push(element.practice_area_name);
          this.chartvalue.push(element.practice_area_percentage);
        });
        //*****Review Filter End */
        setTimeout(() => {
          this.initMap();
          let starcnt = Math.round(
            this.usersService.lawyerDetailsList[0].average_review
          );
          this.avgStars = Array(starcnt)
            .fill(0)
            .map((x, i) => i);
          this.nonStars = Array(5 - starcnt)
            .fill(0)
            .map((x, i) => i);
          console.log(this.avgStars, this.nonStars, starcnt);
        }, 1000);

        if (this.usersService.lawyerDetailsList[0].reviews) {
          this.usersService.lawyerDetailsList[0].reviews.forEach((rev) => {
            if (
              rev.review_from === this.usersService.AdminDetails[0].full_name
            ) {
              this.reviewFlag = false;
            }
          });
        }
      });
  }
  package: any;
  packagebackground: any;
  getEndorseDetails() {
    this.usersService
      .getEndorseDetails(this.lawyerid)
      .subscribe((data: any) => {
        this.package = data.response_data.package_name.package_name;
        console.log("this.package >>>>>>>>>>>>>>>>>>>>>>>>>", this.package);
        if (this.package == "Elite Package") {
          this.packagebackground = "#09265A";
          this.isStandard = false; //charu
        }
        if (this.package == "Diamond Package") {
          this.packagebackground = "black";
          this.isStandard = false; //charu
        }
        if (this.package == "Standard Package") {
          this.packagebackground = "#f7f7f7";
          this.isStandard = true; //charu
        }
        this.usersService.changeheadercolor(this.packagebackground);
        this.lawyerEndorsement = data["response_data"].lawyer_endorsement
          ? data["response_data"].lawyer_endorsement
          : [];
        console.log(this.lawyerEndorsement);
        if (this.lawyerEndorsement && this.lawyerEndorsement.length > 0) {
          this.lawyerEndorsement.forEach((element) => {
            if (element.user_id === this.userId) {
              this.isUserLawyer = false;
            }
          });
        }
      });
    this.lawyerid = this.route.snapshot.paramMap.get("id");
    this.isLoggedIn = sessionStorage.getItem("access_token") != null;
    this.userId = localStorage.getItem("user_id");
  }

  hoveringOver(event) {
    this.rating = event.target.value;
    console.log("rating on mouse hover", this.rating);
    if (this.rating == 1) {
      alert(" Terrible ");
    } else if (this.rating == 2) {
      alert(" Poor ");
    } else if (this.rating == 3) {
      alert(" Good ");
    } else if (this.rating == 4) {
      alert(" Very Good ");
    } else if (this.rating == 5) {
      alert(" Exceptional ");
    }
  }

  // @HostListener('mouseleave') onMouseLeave( ) {
  //      this.ChangeBgColor('black');
  // }

  // @HostListener('mouseover', ['$event'])
  // keyEvent(event: KeyboardEvent) {

  //   this.hoveringOver(event);
  //    }
  ChangeBgColor(color: string) {
    this.renderer.setElementStyle(this.el.nativeElement, "color", color);
  }
  onChangeconsultation(event) {
    debugger;
    this.consultation = event.target.value;
  }
  onChangerecommend(event) {
    debugger;
    this.recommend = event.target.value;
  }

  onChangeanonymous(event) {
    debugger;
    this.anonymous = event.target.value;
  }

  onSubmit(reviewForm) {
    console.log(reviewForm.value);
    //    console.log(this.Terms)
    if (reviewForm.valid) {
      // this.loading = true;

      this.usersService
        .lawyerreview(
          this.lawyerid,
          this.description,
          this.rating,
          this.consultation,
          this.recommend,
          this.anonymous
        )
        .subscribe((res) => {
          this.message = "";
          this.reviewMessage = res["message"];
          //   this.loading = false;

          if (this.reviewMessage == "Review submitted successfully.") {
            this.message = "";
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Added Review Successfully",
              showConfirmButton: false,
              timer: 1000,
            });
            console.log("Successfull");
            this.router.navigate(["/lawyer-directory/listing-details"]);
          }
        });
    } else {
      console.log("Invalid");
      this.message = "";
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    var scrollDistance = $(window).scrollTop();
    var about_me_top = $("#about-me").position()
      ? $("#about-me").position().top
      : "";
    if (scrollDistance < about_me_top) {
      $(".slide-to.active").removeClass("active");
      $(".slide-to").eq(0).addClass("active");
    } else {
      $(".page-section").each(function (i) {
        if ($(this).position().top <= scrollDistance) {
          $(".slide-to.active").removeClass("active");
          $(".slide-to").eq(i).addClass("active");
        }
      });
    }
  }

  openNav() {
    (document.getElementById("mySidenav").style.transform = "translateX(0px)"),
      $("body").css({
        "margin-left": "250px",
        "overflow-x": "hidden",
        transition: "margin-left .5s",
        position: "fixed",
      }),
      $("#main").addClass("overlay");
  }

  closeNav() {
    (document.getElementById("mySidenav").style.transform =
      "translateX(-250px)"),
      $("body").css({
        "margin-left": "0px",
        transition: "margin-left .5s",
        position: "relative",
      }),
      $("#main").removeClass("overlay");
  }

  sendEnquiryModal() {
    if (!this.isLoggedIn) {
      Swal.fire({
        position: "center",
        title: "Please login or signup to continue...",
        showConfirmButton: false,
        timer: 3000,
      });
      localStorage.setItem(
        "STACK_TRACE",
        JSON.stringify({ Lawyer: this.lawyerid })
      );
      localStorage.setItem("STACK_TRACE_ACTION", "sendEnquiryModal");
      this.router.navigateByUrl("/lawyer-directory/login");
      return;
    }
    this.modalService.open("sendEnquiryForm");
  }

  sendEnquiry(EnquiryData) {
    this.modalService.close("sendEnquiryForm");
    EnquiryData["to_user_id"] = this.lawyerid;
    EnquiryData["reply_preference"] = "phone_call";
    console.log(EnquiryData);
    this.usersService.sendEnquiry(EnquiryData).subscribe((data) => {
      console.log(data);
      if (data.status === "SUCCESS") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Enquiry Submitted successfully",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: data.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
    console.log(this.usersService.lawyerDetailsList);
  }

  openReviewModal() {
    if (!this.isLoggedIn) {
      Swal.fire({
        position: "center",
        title: "Please login or signup to continue...",
        showConfirmButton: false,
        timer: 3000,
      });
      localStorage.setItem(
        "STACK_TRACE",
        JSON.stringify({ Lawyer: this.lawyerid })
      );
      localStorage.setItem("STACK_TRACE_ACTION", "openReviewModal");
      this.router.navigateByUrl("/lawyer-directory/login");
      return;
    }
    this.modalService.open("sendReviewForm");
  }

  sendReview(reviewData) {
    this.modalService.close("sendReviewForm");
    console.log(reviewData);
    reviewData["to_id"] = this.lawyerid;
    this.usersService.sendReview(reviewData).subscribe((data) => {
      console.log(data);

      if (data.status === "SUCCESS") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Review Submitted successfully",
          showConfirmButton: false,
          timer: 500,
        });
        this.getLawyerDetails();
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 500,
        });
      }
    });
  }
  fav(isFav = "no") {
    if (!this.isLoggedIn) {
      Swal.fire({
        position: "center",
        title: "Please login or signup to continue...",
        showConfirmButton: false,
        timer: 3000,
      });
      localStorage.setItem(
        "STACK_TRACE",
        JSON.stringify({ Lawyer: this.lawyerid })
      );
      this.router.navigateByUrl("/lawyer-directory/login");
      return;
    }
    let is_favourite = isFav != "no";
    if (!is_favourite) {
      if (this.lawyerid) {
        this.usersService
          .addFavourites({ lawyer_id: this.lawyerid })
          .then(() => {
            setTimeout(() => {
              this.initMap();
              let starcnt = Math.round(
                this.usersService.lawyerDetailsList[0].average_review
              );
              this.avgStars = Array(starcnt)
                .fill(0)
                .map((x, i) => i);
              this.nonStars = Array(5 - starcnt)
                .fill(0)
                .map((x, i) => i);
              console.log(this.avgStars, this.nonStars, starcnt);
            }, 1000);
          });
      }
    } else {
      if (this.lawyerid) {
        this.usersService
          .removeFavourites({ lawyer_id: this.lawyerid })
          .then(() => {
            setTimeout(() => {
              this.initMap();
              let starcnt = Math.round(
                this.usersService.lawyerDetailsList[0].average_review
              );
              this.avgStars = Array(starcnt)
                .fill(0)
                .map((x, i) => i);
              this.nonStars = Array(5 - starcnt)
                .fill(0)
                .map((x, i) => i);
              console.log(this.avgStars, this.nonStars, starcnt);
            }, 1000);
          });
      }
    }
  }

  endorse() {
    if (!this.isLoggedIn) {
      Swal.fire({
        position: "center",
        title: "Please login or signup to continue...",
        showConfirmButton: false,
        timer: 3000,
      });
      localStorage.setItem(
        "STACK_TRACE",
        JSON.stringify({ Lawyer: this.lawyerid })
      );
      localStorage.setItem("STACK_TRACE_ACTION", "endorse");
      this.router.navigateByUrl("/lawyer-directory/login");
      return;
    }
    if (!this.isUserLawyer) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "You can't endorse as you are not registered as a lawyer.",
        showConfirmButton: false,
        timer: 500,
      });
      return;
    }
    Swal.fire({
      title: "Endorse " + this.usersService.lawyerDetailsList[0].full_name,
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Relationship">' +
        '<textarea rows="4" cols="60" id="swal-input2" class="swal3-input" placeholder="Description">',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Endorse",
      cancelButtonText: "Discard",
      customClass: {
        container: "swal-endorse-container",
      },
      preConfirm: () => {
        let user = this.usersService.lawyerDetailsList;
        let data = {
          value: [
            document.getElementById("swal-input1")["value"],
            document.getElementById("swal-input2")["value"],
          ],
        };
        if (this.lawyerid && data.value && data.value[0] && data.value[1]) {
          this.usersService.endorseLawyer({
            lawyer_id: this.lawyerid,
            relationship: data.value[0],
            description: data.value[1],
          });
        }
        this.getEndorseDetails();
        this.ngOnInit();
      },
    });
  }

  getDirection(latitude, longitude) {
    console.log(latitude, longitude);
    // this.directionData = "http://maps.google.com/?q="+ latitude + ',' + longitude;
    const directionData =
      "https://maps.google.com/maps/?q=" +
      latitude +
      "," +
      longitude +
      "&hl=es;z=14&amp;output=embed";
    // console.log(this.directionData)
    window.open(directionData, "_blank");
  }

  facebook(fbLink) {
    fbLink = fbLink.includes("https") ? fbLink : "https://" + fbLink;
    window.open(fbLink, "_blank");
  }

  twitter(twitterLink) {
    twitterLink = twitterLink.includes("https")
      ? twitterLink
      : "https://" + twitterLink;
    window.open(twitterLink, "_blank");
  }

  linkedin(linkedinLink) {
    linkedinLink = linkedinLink.includes("https")
      ? linkedinLink
      : "https://" + linkedinLink;
    window.open(linkedinLink, "_blank");
  }

  initMap() {
    const firms = this.usersService.lawyerFirm;
    console.log(firms);
    if (firms && firms.length) {
      var map, map2;
      var bounds = new google.maps.LatLngBounds();
      var mapOptions = {
        mapTypeId: "roadmap",
      };
      // Display a map on the page
      map = new google.maps.Map(
        document.getElementById("map_canvas"),
        mapOptions
      );
      map2 = new google.maps.Map(
        document.getElementById("map_canvas2"),
        mapOptions
      );
      map.setTilt(45);
      map2.setTilt(45);

      // Multiple Markers
      var markers = [];
      firms.forEach((firm) => {
        markers.push([firm.firm_address, +firm.latitude, +firm.longitude]);
      });

      // Display multiple markers on a map
      var infoWindow = new google.maps.InfoWindow(),
        marker,
        i;

      // Loop through our array of markers & place each one on the map
      for (i = 0; i < markers.length; i++) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
          position: position,
          map: map,
          title: markers[i][0],
        });
        marker = new google.maps.Marker({
          position: position,
          map: map2,
          title: markers[i][0],
        });
        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
        map2.fitBounds(bounds);
      }

      let zoomChangeBoundsListener = google.maps.event.addListenerOnce(
        map,
        "bounds_changed",
        function (event) {
          if (this.getZoom()) {
            this.setZoom(16);
          }
        }
      );
      setTimeout(function () {
        google.maps.event.removeListener(zoomChangeBoundsListener);
      }, 2000);
      let zoomChangeBoundsListener2 = google.maps.event.addListenerOnce(
        map2,
        "bounds_changed",
        function (event) {
          if (this.getZoom()) {
            this.setZoom(14);
          }
        }
      );
      setTimeout(function () {
        google.maps.event.removeListener(zoomChangeBoundsListener2);
      }, 1000);
    }
  }

  openShareModal() {
    this.modalService.open("shareForm");
  }

  readmore(name) {
    this.usersService.lawyerDetailsList.forEach((lawyer) => {
      lawyer.reviews.forEach((data) => {
        if (data.review_from === name) {
          if ((data["readMore"] = true)) {
            data["readMore"] = false;
          }
        }
      });
    });
  }

  hidemore(name) {
    this.usersService.lawyerDetailsList.forEach((lawyer) => {
      lawyer.reviews.forEach((data) => {
        if (data.review_from === name) {
          data["readMore"] = true;
        }
      });
    });
  }

  openurl(url ,type='') {
      if(type=='WS'){
          this.addUseActivity('WS')
      }
    url = url.includes("https") ? url : "https://" + url;
    window.open(url, "_blank");
  }
  openemail(email) {
    window.location.href =
      "mailto:" + email + "?subject=Subject&body=message%20goes%20here";
    // window.location.href = "mailto:"+ email +"?subject=Subject&body=message%20goes%20here";
  }

  findalawyer() {
    let setobjforfilter = {
      practice: "",
      state: "",
      city: "",
    };
    this.usersService.setstorage("filterListing", setobjforfilter);
    this.router.navigate(["/lawyer-directory/listing"]);
  }

  setpractic(x) {
    let setobjforfilter = {
      practice: x,
      state: "",
      city: "",
    };
    this.usersService.setstorage("filterListing", setobjforfilter);
    this.router.navigate(["/lawyer-directory/listing"]);
  }

  setstate(x) {
    let setobjforfilter = {
      practice: "",
      state: x,
      city: "",
    };
    this.usersService.setstorage("filterListing", setobjforfilter);
    this.router.navigate(["/lawyer-directory/listing"]);
  }

  setcity(x) {
    let setobjforfilter = {
      practice: "",
      state: "",
      city: x,
    };
    this.usersService.setstorage("filterListing", setobjforfilter);
    this.router.navigate(["/lawyer-directory/listing"]);
  }
  getQuestionListing(id) {
    sessionStorage.setItem("question_id", id);
    this.router.navigate(["/lawyer-directory/question-details"]);

    console.log("getQuestionListing >>>>>>>>", id);
  }

  //***charu Start */
  addUseActivity(type: string) {
    let form: any = {};
    form.lawyer_id = this.userId;
    if (type == "FB") {
      form.title = 'facebook_count';
    }
    if (type == "LD") {
        form.title = 'linkedin_count';
     
    }
    if (type == "TW") {
        form.title = 'twitter_count';
      
    }
    if (type == "WS") {
        form.title = 'website_count';
      
      }
    this.usersService.addUseActivity(form).subscribe((res: any) => {
        console.log(res);
    },error=>{
        console.error(error);
    });
  }
  //***charu Start */
}
