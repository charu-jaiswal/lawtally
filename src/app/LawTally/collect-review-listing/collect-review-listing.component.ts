import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/users.service';
declare let jQuery: any;
declare let $: any;

@Component({
  selector: 'app-collect-review-listing',
  templateUrl: './collect-review-listing.component.html',
  styleUrls: ['./collect-review-listing.component.css']
})
export class CollectReviewListingComponent implements OnInit {

  constructor(public usersService: UsersService) { }

  cp = 1;

  ngOnInit() {

    
     this.usersService.ReviewListing();

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

  $(".menu-icon-section").on("click", function () {
    $(".inner-page-middle-seciton-main").addClass("left-menu-open");
  });
  // $(".black-bg-section").on("click", function () {
  //   $(".inner-page-middle-seciton-main").removeClass("left-menu-open");
  // });
  // $(".inner-page-menus").on("click", function () {
  //   $(".inner-page-middle-seciton-main").removeClass("left-menu-open");
  // });


  }

}
