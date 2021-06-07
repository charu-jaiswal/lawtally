import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../core/users.service';
import { DatePipe } from '@angular/common';
import { BaseChartDirective, Label } from 'ng2-charts';
declare let jQuery: any;
declare let $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public chartOption = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            steps: 10,
            stepValue:2,
            max: 100,
            beginAtZero: true
          }
        }
      ]
    }
  }
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
//**charu Start */
 barChartOptions: any = {
  scaleShowVerticalLines: false,
  responsive: true
};
 barChartLabels: string[];
 barChartType: string = 'bar';
 barChartLegend: boolean = true;

 barChartData: any[] = [
  { data: [], label: 'User Activity' },
  // { data: [], label: 'User Activity' },

]


//**charu End */
  dashboardData: any;
  isNextAvailable = false;
  start_date;
  end_date;
  chartProfileVisitors = {
    lineChartData: [{ data: [] }],
    lineChartLabels: [],
    lineChartOptions: {
      responsive: true,
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        xAxes: [{}],
      }
    },
    lineChartColors: [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // red
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ],
    lineChartLegend: false
  }

  chartCaseDemographics = {
    doughnutChartLabels: [],
    doughnutChartData: [
      [],
    ]
  }

  constructor(
    private datePipe: DatePipe,
    public usersService: UsersService,
  ) {
   
    
 }

  ngOnInit() {
    this.usersService.getBlogCategory();
    this.getDashboard();
   // this.userActivity();
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
    // <!-- back to Top end Here  --> 
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

  menuclose() {
    $("body").removeClass("desktop-left-menu");
  }

  getDashboard(startDate = null, endDate = null) {
    let start_date = startDate;
    let end_date = endDate;
    if (!startDate || !endDate) {
      let date = new Date();
      end_date = this.datePipe.transform(date, "yyyy-MM-dd")
      date.setDate(date.getDate() - 9)
      start_date = this.datePipe.transform(date, "yyyy-MM-dd")
    }
    this.usersService.getDashboard({ start_date, end_date })
      .subscribe((data: any) => {
        if (data.status == 'SUCCESS') {
          console.log(data);

          this.start_date = start_date;
          this.end_date = end_date;


          if (data.response_data.profile_activity_graph) {

            this.chartProfileVisitors.lineChartLabels = [];
            this.chartProfileVisitors.lineChartData[0].data = [];

            data.response_data.profile_activity_graph.forEach(data => {
              this.chartProfileVisitors.lineChartLabels.push(data.date)
              this.chartProfileVisitors.lineChartData[0].data.push(data.count)
            });
          }

          /////////////////charu///////////////////////

          // "description": "\"call_count\",\"website_count\",\"linkedin_count\",\"facebook_count\",\"twitter_count\",\"map_count\"",
           if (data.response_data.tot_click_data) {
          let obj = { 
             "Website": {      
              "UserActivity": data.response_data.tot_click_data.number_of_website
            },
            "Linkedin": {       
              "UserActivity":  data.response_data.tot_click_data.number_of_linkedin
            },
            "Facebook": {      
              "UserActivity": data.response_data.tot_click_data.number_of_facebook
            },
            "Twitter": {      
              "UserActivity":  data.response_data.tot_click_data.number_of_twitter
            },
            "Map": {      
              "UserActivity":  data.response_data.tot_click_data.number_of_map
            },
          }
          console.log("data.response_data.tot_click_data.number_of_facebook",data.response_data.tot_click_data.number_of_facebook);
     console.log("objjjjjjjjjjjjjjj",obj);
     
          this.barChartLabels = Object.keys(obj);
          this.barChartLabels.forEach(label => {
            this.barChartData[0].data.push(obj[label]['UserActivity']);
           // this.barChartData[1].data.push(obj[label]['UserActivity']);
          });
          console.log(  this.barChartLabels[0],"  this.barChartLabels");
           }

          

         
          ///////////////////////////////////////

          if (startDate && endDate) {
            return;
          }
          this.dashboardData = data.response_data;
          if (data.response_data.practice_area_graph) {

            this.chartCaseDemographics.doughnutChartLabels = [];
            this.chartCaseDemographics.doughnutChartData[0] = [];

            data.response_data.practice_area_graph.forEach(data => {
              console.log(data);
              this.chartCaseDemographics.doughnutChartLabels.push(data.practice_area_name)
              this.chartCaseDemographics.doughnutChartData[0].push(data.practice_area_count)
            });
          }
        }
      })
  }

  ProfileViews(type) {
    if (type == 'P') {
      let start_date = this.start_date;
      let end_date = this.start_date;
      let date = new Date(start_date);
      date.setDate(date.getDate() - 9)
      start_date = this.datePipe.transform(date, "yyyy-MM-dd")
      this.getDashboard(start_date, end_date)
      this.isNextAvailable = true;
    } else {
      let start_date = this.end_date;
      let end_date = this.end_date;
      let date = new Date(end_date);
      date.setDate(date.getDate() + 9)
      end_date = this.datePipe.transform(date, "yyyy-MM-dd")
      this.getDashboard(start_date, end_date)
      this.isNextAvailable = end_date != this.datePipe.transform(new Date(), "yyyy-MM-dd");
    }
  }

  // userActivity(){
  //   this.usersService.getSales().subscribe(data => {
  //     this.barChartLabels = Object.keys(data);
  //     this.barChartLabels.forEach(label => {
  //       this.barChartData[0].data.push(data[label]['volumeSales']);
  //       this.barChartData[1].data.push(data[label]['valueSales']);
  //     });
  //   });;
  // }
}
