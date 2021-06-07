import { Component, OnInit } from '@angular/core';
declare let $ : any;
declare let jQuery: any;

@Component({
  selector: 'app-work-consumer',
  templateUrl: './work-consumer.component.html',
  styleUrls: ['./work-consumer.component.css']
})
export class WorkConsumerComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(function() {
      $('[data-responsive-tabs]').responsivetabs({});
    });

    $(".responsive-show-menu-head").on("click", function(){
      $(".responsive-open-ul").slideToggle("slow");
    });

    // window.scrollTo(0, 0);
    // jQuery(document).ready(function($) {
    //     var offset = 300,
    //         offset_opacity = 1200,
    //         scroll_top_duration = 700,
    //         $back_to_top = $('.cd-top');
    //     $(window).scroll(function() {
    //         ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
    //         if ($(this).scrollTop() > offset_opacity) {
    //             $back_to_top.addClass('cd-fade-out');
    //         }
    //     });
    //     $back_to_top.on('click', function(event) {
    //         event.preventDefault();
    //         $('body,html').animate({
    //             scrollTop: 0,
    //         }, scroll_top_duration);
    //     });
    // });

    function openNav() {
      document.getElementById("mySidenav").style.width = "250px";
      $("body").css({
          "margin-left": "250px",
          "overflow-x": "hidden",
          "transition": "margin-left .5s",
          "position": "fixed"
      });
      $("#main").addClass("overlay");
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        $("body").css({
            "margin-left": "0px",
            "transition": "margin-left .5s",
            "position": "relative"
        });
        $("#main").removeClass("overlay");
    }

    $(".footer-manu-head").on("click", function() {
      $(this).siblings(".footer-manu-links").slideToggle("slow");
      $(this).parent().parent().siblings().find(".footer-manu-links").slideUp("slow");
      $(this).parent().siblings().find(".footer-manu-links").slideUp("slow");
    });

    $(".filter-arrow-icon-section").on("click", function() {
      $("body").toggleClass("filter-open");
   });

  }

}
