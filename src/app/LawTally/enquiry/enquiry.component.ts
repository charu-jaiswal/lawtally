import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/users.service';
declare let $: any;
declare let jQuery: any;
@Component({
    selector: 'app-enquiry',
    templateUrl: './enquiry.component.html',
    styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
    // public getEnquiryList: any = [];  
    practice_area_id: any;
    practiceList: any = [];
    Terms: boolean;
    cp = 1;

    constructor(public usersService: UsersService) { }

    ngOnInit() {
        this.usersService.EnquiryList(this.practice_area_id);
        this.usersService.getPracticeArea();

        // window.scrollTo(0, 0);
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
    }

    onChange(isChecked: boolean, practice_area_id) {
        this.cp = 1;
        if (isChecked) {
            this.Terms = true
            this.practiceList.push("" + practice_area_id + "")
            this.usersService.EnquiryList(this.practiceList);
        } else {
            this.Terms = false
            var index = this.practiceList.indexOf(practice_area_id);
            this.practiceList.splice(index, 1);
            this.usersService.EnquiryList(this.practiceList);
        }
    }

    menuclose() {
        $("body").removeClass("desktop-left-menu");
    }

    viewEnquiry(enquirydata) {
        console.log(enquirydata)
        sessionStorage.setItem('enquirydata', JSON.stringify(enquirydata));
    }
}
