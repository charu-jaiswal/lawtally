import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/users.service';

declare let $: any;
declare let jQuery: any; 
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
    blogDetailsData: any = [];
    getToken;
    comments;
  constructor(
       public usersService: UsersService
    ) { }
  ngOnInit() {
        window.scrollTo({
            top:0,
            left: 0,
            behavior: 'smooth'
        });

        this.getToken = sessionStorage.getItem('access_token')
    
        this.usersService.blogDetails();
        $(document).ready(function() {
            $('[data-responsive-tabs]').responsivetabs({});
        });
  
        $(".responsive-show-menu-head").on("click", function(){
            $(".responsive-open-ul").slideToggle("slow");
        });
    
        jQuery(document).ready(function($) {
            var offset = 300,
                offset_opacity = 1200,
                scroll_top_duration = 700,
                $back_to_top = $('.cd-top');
            $(window).scroll(function() {
                ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
                if ($(this).scrollTop() > offset_opacity) {
                    $back_to_top.addClass('cd-fade-out');
                }
            });
            $back_to_top.on('click', function(event) {
                event.preventDefault();
                $('body,html').animate({
                    scrollTop: 0,
                }, scroll_top_duration);
            });
        });
        // <!-- Min Top Menu Start Here  -->
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

        var doc_width = $(window).width();
        if(doc_width < 768){
            $(".menu-section li a, .responsive-show-section").on("click", function(){
                $("body").css({"margin":"0","overflow-x": "auto","position":"relative"});
                $("#mySidenav").css("transform","translateX(-250px)");
          });
          $(".menu-section li a.free-q-a-li-a").on("click", function () {
            $("body").css({ "margin-left": "250px", "overflow-x": "auto", "position": "relative" });
            $("#mySidenav").css("transform", "translateX(0px)");
            $(".sub-menu-section-block").slideToggle("slow");
          });
        }
        
    // <!-- Min Top Menu Start End  -->
        $(".filter-arrow-icon-section").on("click", function() {
            $("body").toggleClass("filter-open");
        }); 
  }

  onstoreComments(comments,blog_id){
        
    if(comments.valid){
      this.usersService.storeBlogComments(comments,blog_id);
    }
  }
}
