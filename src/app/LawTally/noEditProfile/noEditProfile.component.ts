import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/users.service';
import { AuthService } from '../../core/auth.service';

declare let $ : any;
declare let jQuery: any;

@Component({
  selector: 'app-noEditProfile',
  templateUrl: './noEditProfile.component.html',
  styleUrls: ['./noEditProfile.component.css']
})
export class NoEditProfileComponent implements OnInit {
  userAge:any = [];
  getToken;
  rolesLength;
  roles;
  getData;

constructor(
    public usersService: UsersService,
    public authService: AuthService
) { }

ngOnInit() {

  this.usersService.getlawtallyAdminDetails();
  this.usersService.getLawyerDetailsEdit();

  var dob = localStorage.getItem('birthDate')
  console.log(dob)

  const date = new Date ();
  console.log(date)

  const birthDate = new Date(dob)
  console.log(birthDate)

  this.userAge = date.getFullYear() - birthDate.getFullYear();
  console.log(this.userAge);

//   window.scrollTo(0, 0);
  //  back to Top Start Here  
          jQuery(document).ready(function($){            
              var offset = 300,                
              offset_opacity = 1200,                
              scroll_top_duration = 700,                
              $back_to_top = $('.cd-top');            
              $(window).scroll(function(){
                  ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
                  if( $(this).scrollTop() > offset_opacity ) { 
                      $back_to_top.addClass('cd-fade-out');
                  }
              });            
              $back_to_top.on('click', function(event){
                  event.preventDefault();
                  $('body,html').animate({
                      scrollTop: 0 ,
                      }, scroll_top_duration
                  );
              });
          });       
         
          // $(document).ready(function(){
           var is_first_time = true;			   
           $('a.slide-to').on('click',function(event){                   
              event.preventDefault();
              var target = $(this).attr("href");
              var  scrollHeight = $(target).offset().top-75;
              if(is_first_time){
              is_first_time= false;
              scrollHeight = $(target).offset().top-200;
            }				    
            $('html,body').animate({
               scrollTop: scrollHeight
            },	2000);
          });			   			 
        //  });			
         
         $(window).scroll(function() {
             var scrollDistance = $(window).scrollTop();
             var about_me_top = $("#about-me").position().top;
             if(scrollDistance < about_me_top){
                  $('.slide-to.active').removeClass('active');
                  $('.slide-to').eq(0).addClass('active');
             }else{
                 $('.page-section').each(function(i) {
                     if ($(this).position().top <= scrollDistance) {
                         $('.slide-to.active').removeClass('active');
                         $('.slide-to').eq(i).addClass('active');
                     } 
                 });
             }
         }).scroll();
         
            // Sticky Head
            $(window).scroll(function() {
                if ($(this).scrollTop() > 500){  
                    $('.details-tabbing-section-main, .details-tab-content-section').addClass("menu-sticky");
                }
                else{
                    $('.details-tabbing-section-main, .details-tab-content-section').removeClass("menu-sticky");
                }
            });
  
            $(".sectoin-menu-head-block").on("click", function(){
              $(this).siblings("ul").slideToggle("slow");
          });
          $(".slide-to").on("click", function(){
              $(this).parent().parent().slideUp("slow");
          });
  
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
}

logout(){
  this.authService.logout();
}

}

