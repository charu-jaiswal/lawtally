import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/users.service';
import Swal from 'sweetalert2';

declare let $ : any;
declare let jQuery : any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notificationlist:any =[];
  cp = 1;
  
  constructor(
      public usersService: UsersService
  ) { }

  ngOnInit() {

    this.usersService.getNotification()

    window.scrollTo(0, 0); 
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
    
// <!-- back to Top end Here  -->    

    $(".menu-icon-section").on("click", function(){
        $(".inner-page-middle-seciton-main").addClass("left-menu-open");
    });
    $(".black-bg-section").on("click", function(){
        // $(".inner-page-middle-seciton-main").removeClass("left-menu-open");
        $("body").removeClass("desktop-left-menu")
    });        
                     
    // $(".menu-icon-section").on("click", function(){
    //     $("body").toggleClass("desktop-left-menu");
    // });

    $(".read-more-message").on("click", function(){                    
        $(".message-text-content").toggleClass("active");                      
    });                
    // $(".inner-page-menus").on("click", function(){
    //   $(".inner-page-middle-seciton-main").removeClass("left-menu-open");
    // });
  }
  
  menuclose() {
    $("body").removeClass("desktop-left-menu");
  }

  onDeleteNotification(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.value) {
       Swal.fire({
         position: 'center',
         icon: 'success',
         title: 'Delete successfully',
         showConfirmButton: false,
         timer: 500,
       });
       this.usersService.deleteNotification(id);
      }
    });
     
  }
}
