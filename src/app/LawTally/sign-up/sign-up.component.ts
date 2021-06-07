import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../core/users.service';
import { AuthService } from '../../core/auth.service';
import Swal from 'sweetalert2';
declare let $ : any;
declare let jQuery : any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    loginMessage;
    message;
    Terms = false;
    checkErr;
    public loading = false;

  constructor(
    public usersService: UsersService,
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    $('#signupForm').parsley();

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
// <!-- footer menu end Here  -->
    $(".filter-arrow-icon-section").on("click", function() {
        $("body").toggleClass("filter-open");
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

    onChange(isChecked: boolean){
        console.log(isChecked)
        if(isChecked){
            this.Terms = true
        } else {
            this.Terms = false
        }
    }

    islawyer:any = "no";
    onChangelawyer(isChecked: boolean) {
            console.log(isChecked)
            if (isChecked) {
                this.islawyer = "yes"
            } else {
                this.islawyer = "no"
            }
        }

    onsignUp(signupForm){
        signupForm.value.is_lawyer = this.islawyer;
        console.log(signupForm.value);
        console.log(this.Terms)
        if (signupForm.valid && this.Terms == true) {
            this.loading = true;

            this.usersService.lawtallySignup(signupForm.value)
            .subscribe (res => {
                this.message = '';
                this.loginMessage = res['msg'];
                this.loading = false;

                if(this.loginMessage == 'Validation Error, Please fill up the all mandatory fields'){
                    this.checkErr = res['data'].error;
                    console.log(this.checkErr)
                    if(this.checkErr == 'The email has already been taken.'){
                        this.message = "* Email is already Exist"
                        console.log("Email Error")            
                    }else if(this.checkErr == 'The mobile number has already been taken.'){
                        this.message = "* Mobile Number is already Exist"
                        console.log("Contact Error")
                    }
                }else{
                    this.message = '';
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Registration Successfully',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    console.log("Successfull");
                    this.router.navigate(['/lawyer-directory/login']);
                }
            });
        } else if(this.Terms == false){
            this.message = "* Please agree to our Terms and Condition"
        } else {
            console.log("Invalid");
            this.message = '';
        }
    }

}
