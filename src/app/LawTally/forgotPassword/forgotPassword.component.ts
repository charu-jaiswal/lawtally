import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../core/users.service';
import { AuthService } from '../../core/auth.service';
import Swal from 'sweetalert2';
declare let $ : any;
declare let jQuery : any;

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    loginMessage;
    message;
    passToken;
    public loading = false;

  constructor(
    public usersService: UsersService,
    public router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    $('#form').parsley();

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

  sendRequest(form){
    if (form.valid) {
        this.loading = true;

        this.usersService.forgotPassword(form.value)
        .subscribe (res => {
          this.loginMessage = res['msg'];
          this.loading = false;
          
          if (this.loginMessage == "Email has been sent."){
            this.passToken = res['data'];
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Token Send to Email Successfully',
                showConfirmButton: false,
                timer: 1000
            });            
            this.router.navigate(['/lawyer-directory/login']);
          }else{
            this.message = "* Invalid Email";
            console.log("Invalid Email");
          }
        })  
      }else {
        this.message = "";
        console.log("Invalid")
      }  
  }
}
