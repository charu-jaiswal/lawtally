import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../core/users.service';
import { AuthService } from '../../core/auth.service';
declare let $ : any;
declare let jQuery : any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setPassword',
  templateUrl: './setPassword.component.html',
  styleUrls: ['./setPassword.component.css']
})
export class SetPasswordComponent implements OnInit {
  loginMessage;
  message;
  passToken;
  public loading = false;
  password_reset_token=''
  constructor(
    public usersService: UsersService,
    public router: Router,
    public authService: AuthService,
    private activeRoute: ActivatedRoute,

  ) { 

    this.activeRoute.params.subscribe(
      (routeparams)=>{
       this.password_reset_token=(routeparams['token']);           
      })

  }

  ngOnInit() {
    $('#setPassform').parsley();
    
    this.passToken = sessionStorage.getItem('pass_token')

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

  setPassword(setPassform){
    if (setPassform.valid) {
        this.loading = true;
        setPassform.value.password_reset_token=this.password_reset_token;        
console.log(setPassform.value)
        this.usersService.setPassword(setPassform.value)
        .subscribe (res => {
          this.loginMessage = res['msg'];
          this.loading = false;
          console.log(this.loginMessage)
          if (this.loginMessage == "Password changed successfully."){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Password changed successfully.',
              showConfirmButton: false,
              timer: 1000
          });    
            this.router.navigate(['/lawyer-directory/login']);
          }else{
            this.message = "* Invalid password token";
            console.log("Invalid token");
          }
        })  
      }else {
        this.message = "";
        console.log("Invalid")
      }  
  }

}
