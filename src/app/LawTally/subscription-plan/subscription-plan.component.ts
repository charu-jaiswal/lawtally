import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/users.service';
import { AuthService } from '../../core/auth.service';
declare let $: any;
declare let jQuery: any;
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import { ModalService } from 'src/app/core/modal.service';


@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.css']
})
export class SubscriptionPlanComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

  constructor(
    public usersService: UsersService,
    public router: Router,
    private http: HttpClient,
    public authService: AuthService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.usersService.getSubscription();
    // window.scrollTo(0, 0);
    // jQuery(document).ready(function ($) {
    //   var offset = 300,
    //     offset_opacity = 1200,
    //     scroll_top_duration = 700,
    //     $back_to_top = $('.cd-top');
    //   $(window).scroll(function () {
    //     ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
    //     if ($(this).scrollTop() > offset_opacity) {
    //       $back_to_top.addClass('cd-fade-out');
    //     }
    //   });
    //   $back_to_top.on('click', function (event) {
    //     event.preventDefault();
    //     $('body,html').animate({
    //       scrollTop: 0,
    //     }, scroll_top_duration
    //     );
    //   });
    // });

    //sub plan dropdown
    $(".sub-plan-subhead").on("click", function(){
      $(this).toggleClass("active");
      $(this).siblings(".sub-plan-dropdown").slideToggle("slow");
      $(this).parent().siblings().find(".sub-plan-dropdown").slideUp("slow");
      $(this).parent().siblings().find(".sub-plan-subhead").removeClass("active");
    });
    $(".seo-plan").on("click", function(){
      $(".seo-plan-value-section").slideToggle("slow");
      $(".reviews-plan-value-section").slideUp("slow");
      $(".analytics-plan-value-section").slideUp("slow");
      $(".promotions-plan-value-section").slideUp("slow");
      $(".preferred-law-plan-value-section").slideUp("slow");
      $(".support-plan-value-section").slideUp("slow");
  });
  $(".review-plan").on("click", function(){
      $(".seo-plan-value-section").slideUp("slow");
      $(".reviews-plan-value-section").slideToggle("slow");
      $(".analytics-plan-value-section").slideUp("slow");
      $(".promotions-plan-value-section").slideUp("slow");
      $(".preferred-law-plan-value-section").slideUp("slow");
      $(".support-plan-value-section").slideUp("slow");
  });
  $(".analytics-plan").on("click", function(){
      $(".seo-plan-value-section").slideUp("slow");
      $(".reviews-plan-value-section").slideUp("slow");
      $(".analytics-plan-value-section").slideToggle("slow");
      $(".promotions-plan-value-section").slideUp("slow");
      $(".preferred-law-plan-value-section").slideUp("slow");
      $(".support-plan-value-section").slideUp("slow");
  });
  $(".promotions-plan").on("click", function(){
      $(".seo-plan-value-section").slideUp("slow");
      $(".reviews-plan-value-section").slideUp("slow");
      $(".analytics-plan-value-section").slideUp("slow");
      $(".promotions-plan-value-section").slideToggle("slow");
      $(".preferred-law-plan-value-section").slideUp("slow");
      $(".support-plan-value-section").slideUp("slow");
  });
  $(".preferred-lawyer-plan").on("click", function(){
      $(".seo-plan-value-section").slideUp("slow");
      $(".reviews-plan-value-section").slideUp("slow");
      $(".analytics-plan-value-section").slideUp("slow");
      $(".promotions-plan-value-section").slideUp("slow");
      $(".preferred-law-plan-value-section").slideToggle("slow");
      $(".support-plan-value-section").slideUp("slow");
  });
  $(".support-plan").on("click", function(){
      $(".seo-plan-value-section").slideUp("slow");
      $(".reviews-plan-value-section").slideUp("slow");
      $(".analytics-plan-value-section").slideUp("slow");
      $(".promotions-plan-value-section").slideUp("slow");
      $(".preferred-law-plan-value-section").slideUp("slow");
      $(".support-plan-value-section").slideToggle("slow");
  });

    // <!-- back to Top end Here  --> 
    $(".menu-icon-section").on("click", function () {
      $(".inner-page-middle-seciton-main").addClass("left-menu-open");
    });
    $(".black-bg-section").on("click", function () {
      $(".inner-page-middle-seciton-main").removeClass("left-menu-open");
    });
    $(".inner-page-menus").on("click", function () {
      $(".inner-page-middle-seciton-main").removeClass("left-menu-open");
    });    

    $(".footer-manu-head").on("click", function () {
      $(this).siblings(".footer-manu-links").slideToggle("slow");
      $(this).parent().parent().siblings().find(".footer-manu-links").slideUp("slow");
      $(this).parent().siblings().find(".footer-manu-links").slideUp("slow");
    });

    $(".filter-arrow-icon-section").on("click", function () {
      $("body").toggleClass("filter-open");
    });

    // var doc_width = $(window).width();
    // if (doc_width < 768) {
    //   $(".menu-section li a, .responsive-show-section").on("click", function () {
    //     alert("subscr_compo");
    //     $("body").css({ "margin": "0", "overflow-x": "auto", "position": "relative" });
    //     $("#mySidenav").css("transform", "translateX(-250px)");
    //   });
    // }


    

  }

  counter(i: number) {
    return new Array(i);
  }

  onAddLawyerPage(sub) {
    console.log(sub);
    let subscription = JSON.stringify(sub);
    localStorage.setItem('subscription', subscription);

    setTimeout(() => {
      let selectedpackage =  JSON.parse(localStorage.getItem('subscription'))
      console.log("999999999999999999999999999999999999999",selectedpackage);
    }, 3000);
    var result = sessionStorage.getItem('access_token')
    // if(result == null){
    //     this.router.navigate(['/lawyer-directory/login']);
    // }else{
    console.log(localStorage.getItem('isSubscription'))
    let subs = localStorage.getItem('isSubscription');
    if (subs === 'true') {
      this.openPaymentMode();
    }
    else {
      this.router.navigate(['/lawyer-directory/add-lawyer']);
    }
  }

  openPaymentMode(){
    this.modalService.open('modeSelect')
  }

  openCheckout(mode = 'paypal') {
    this.modalService.close('modeSelect')
    const lawyerId = localStorage.getItem('user_id');
    if (mode == 'paypal') {
      this.initConfig().then(data => {
        this.modalService.open('paypalModal')
      })
    } else {
      var self: any = this;
      let subData = JSON.parse(localStorage.getItem('subscription'))
      console.log(subData);
      var handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_SuuGsbmYE1nPYUTTIYItMQ16',
        locale: 'auto',
        token: function (token: any) {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
          console.log(token);
          let formData = new FormData();
          formData.set('package_id', subData.id);
          formData.set('stripeToken', token['id']);
          formData.set('user_id', lawyerId);

          console.log(formData);
          console.log('token ' + token['id']);



          self.http.post("https://www.lawtally.co/api/v1/stripe_charge", formData).subscribe((res: any) => {
            console.log(res);
            if (res.status == "SUCCESS") {
              self.payment = "Payment is Done"
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Payment is Done',
                showConfirmButton: false,
                timer: 1000
              });
              self.router.navigate(['/lawyer-directory/dashboard']);
            }
          },
            err => {
              self.payment = "Payment is Failed"
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Payment is Failed',
                showConfirmButton: false,
                timer: 1000,
              });
            });
          localStorage.removeItem('subscription')
        }
      });
      let amount = + subData.price
      let price: any = Number(amount).toFixed(2);
      console.log(price)
      handler.open({
        name: 'Demo Site',
        description: '2 widgets',
        amount: price * 100
      });
      console.log(price)
    }
  }

  private initConfig() {
    return new Promise(resolve => {
      this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',
        createOrderOnClient: (data) => <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '9.99'
                }
              }
            },
            items: [{
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }]
          }]
        },
        advanced: {
          commit: 'true'
        },
        style: {
          label: 'paypal',
          layout: 'vertical'
        },
        onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then(details => {
            console.log('onApprove - you can get full order details inside onApprove: ', details);
          });

        },
        onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);

        },
        onError: err => {
          console.log('OnError', err);
        },
        onClick: (data, actions) => {
          console.log('onClick', data, actions);
        },
      };
      resolve();
    });
  }
}