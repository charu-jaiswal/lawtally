import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/users.service';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { AuthService } from '../../core/auth.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
declare let $: any;
declare let jQuery: any;

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
    reviewData: any;
    cp = 1;
    sample = 80;
    fiveStarReviews: number;
    fourStarReviews: number;
    threeStarReviews: number;
    twoStarReviews: number;
    oneStarReviews: number;
    public loading = false;
    responseMessage:any;

    public doughnutChartLabels: Label[] = ['5 Star', '4 Star', '3 Star', '2 Star', '1 Star'];
    public doughnutChartData: MultiDataSet = [];
    public doughnutChartType: ChartType = 'doughnut';

    public chartColors: any[] = [{
        backgroundColor: ["#ed7161", "#656d78", "#78a69b", "#48cfad", "#fc6"]
    }];

    constructor(
        public userService: UsersService,
        public router: Router,
        private http: HttpClient,
        public authService: AuthService
    ) { }

    ngOnInit() {
        $('#continuereview').prop('disabled', true);
        // window.scrollTo(0, 0);
        this.getReviews();
        $(".filter-arrow-section").on("click", function () {
            $("body").toggleClass("filter-open");
        });

        // <!-- back to Top Start Here  -->

        jQuery(document).ready(function ($) {
            var offset = 300,
                offset_opacity = 1200,
                scroll_top_duration = 700,
                $back_to_top = $('.cd-top');
            $(window).scroll(function () {
                ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
                if ($(this).scrollTop() > offset_opacity) {
                    $back_to_top.addClass('cd-fade-out');
                }
            });
            $back_to_top.on('click', function (event) {
                event.preventDefault();
                $('body,html').animate({
                    scrollTop: 0,
                }, scroll_top_duration
                );
            });
        });

        // <!-- back to Top end Here  -->    

        $(".menu-icon-section").on("click", function () {
            $(".inner-page-middle-seciton-main").addClass("left-menu-open");
        });

        $(".black-bg-section").on("click", function () {
            //$(".inner-page-middle-seciton-main").removeClass("left-menu-open");
            $("body").removeClass("desktop-left-menu")
        });
        // $(".inner-page-menus").on("click", function () {
        //     $(".inner-page-middle-seciton-main").removeClass("left-menu-open");
        // });

        $(".open-sign-btn").on( "click", function() {
            $('#myModal').modal('hide'); 
            $('#myModal-review2').modal('show');  
//            $("body").addClass("modal-open-class");
        });
        $(".guideline-violations-points-head").on("click", function(){
            $(this).siblings(".guideline-violations-points-contant").slideToggle("slow");
            $(this).parent().toggleClass("active");
            $(this).parent().siblings().removeClass("active");
            $(this).parent().siblings().find(".guideline-violations-points-contant").slideUp("slow");
        });

    }

    chkiagreefunc() {
        if($("#iagreechk").prop('checked') == true){
            //alert('Checked');
            $('#continuereview').prop('disabled', true);
        } else {
            //alert('UnChecked'); 
            $('#continuereview').prop('disabled', false);
        }
    }

    getviewfullname:any; getviewcreateddate:any; getviewreview:any; ratingscnt:any;
    getreviewrecord(param1) {

        $("#iagreechk").prop('checked', false);
        $('#continuereview').prop('disabled', true);
        //alert('full_name : '+this.reviewData.reviews_data[param1].full_name);

        this.getviewfullname = this.reviewData.reviews_data[param1].full_name;
        this.getviewcreateddate = this.reviewData.reviews_data[param1].created_at;
        this.getviewreview = this.reviewData.reviews_data[param1].review;
        this.ratingscnt = this.reviewData.reviews_data[param1].ratings;
        $('#getmeviewid').val(this.reviewData.reviews_data[param1].review_id);
    }

    partreview_value:any; wholeview_value:any; reviewer_value:any;   
    getsubmitreview() {

        if ($("input:radio[name='partreview']").is(":checked")) {
            //alert('Checked');
            this.partreview_value=$("input[name='partreview']:checked").val();
         } else {
            //alert('UnChecked');

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select any one option from "Parts of the review"'
            });

            return false;
        }

        if ($("input:radio[name='wholeview']").is(":checked")) {
            //alert('Checked');
            this.wholeview_value=$("input[name='wholeview']:checked").val();
         } else {
            //alert('UnChecked');

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select any one option from "The review as a whole"'
            });

            return false;
        }

        if ($("input:radio[name='reviewer']").is(":checked")) {
            //alert('Checked');
            this.reviewer_value=$("input[name='reviewer']:checked").val();
         } else {
            //alert('UnChecked');

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select any one option from "The reviewer"'
            });

            return false;
        }

        if ($("input:radio[name='partreview']").is(":checked") && $("input:radio[name='wholeview']").is(":checked") && $("input:radio[name='reviewer']").is(":checked")) {

            // alert('partreview_value : '+this.partreview_value);
            // alert('wholeview_value : '+this.wholeview_value);
            // alert('reviewer_value : '+this.reviewer_value);

            this.loading = true;

            var reviewid = $('#getmeviewid').val(); 
            //'5ec4b2013918c341a437ab63';
            
            this.userService.submitLawyerreview(this.partreview_value,this.wholeview_value,this.reviewer_value,reviewid)
                .subscribe(res => {
                    this.responseMessage = res['status'];
                    this.loading = false;
                    if (this.responseMessage == "SUCCESS") {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Lawyer Review submitted Successfully',
                            showConfirmButton: false,
                            timer: 6000
                        });
                        $('#myModal-review2').modal('toggle');
                        //this.router.navigate(['/lawyer-directory/reviews']);
                    } else {
                        console.log("UnSUCCESS");
                    }
                });

        }

        
    }

    menuclose() {
        $("body").removeClass("desktop-left-menu");
    }

    getReviews() {
        this.userService.getReview().subscribe((data) => {
            console.log(data);
            if (data['status'] === "SUCCESS") {
                this.reviewData = data['response_data'];
                console.log('reviewData : '+JSON.stringify(this.reviewData));
                this.fiveStarReviews = this.reviewData.five_stars * 100 / this.reviewData.total_stars
                this.fourStarReviews = this.reviewData.four_stars * 100 / this.reviewData.total_stars
                this.threeStarReviews = this.reviewData.three_stars * 100 / this.reviewData.total_stars
                this.twoStarReviews = this.reviewData.two_stars * 100 / this.reviewData.total_stars
                this.oneStarReviews = this.reviewData.one_stars * 100 / this.reviewData.total_stars
                // this.reviewData.reviews_data.forEach(element => {
                //     this.userService.getLawyerDetails(element.from_id);
                // });
                // this.doughnutChartData.push([this.reviewData.five_stars, this.reviewData.four_stars, this.reviewData.three_stars, this.reviewData.two_stars, this.reviewData.one_stars]);
                this.doughnutChartData.push(this.reviewData.five_stars, this.reviewData.four_stars, this.reviewData.three_stars, this.reviewData.two_stars, this.reviewData.one_stars);
                console.log(this.doughnutChartData)

            }
        })
    }
}
