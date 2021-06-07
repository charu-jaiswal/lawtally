import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/users.service';
import { ExcelService } from 'src/app/core/excel.service';

declare let $: any;
declare let jQuery : any;

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css'],
})

export class TransactionHistoryComponent implements OnInit {

 public getTranscationHistoryData: any = [];  
 from_date : any = "";
 to_date : any = "";
 paymenttype: any = "";
 cp = 1;

 constructor(public usersService: UsersService,
              private excelService:ExcelService) { }

  ngOnInit() {
    const fromData: FormData =new FormData();
     this.usersService.TranscationHistory(fromData);
    
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
        //$(".inner-page-middle-seciton-main").removeClass("left-menu-open");
        $("body").removeClass("desktop-left-menu")
    });
    // $(".inner-page-menus").on("click", function(){
    //     $(".inner-page-middle-seciton-main").removeClass("left-menu-open");
    // });  
                                    
    $(function() {      
        $( "#fromdatepicker" ).datepicker({
            todayHighlight: true,
            format: 'yyyy-mm-dd',
            autoclose: true,
        });
    });
    $(function() {      
        $( "#todatepicker" ).datepicker({
            todayHighlight: true,
            format: 'yyyy-mm-dd',
            autoclose: true,
        });
    });
    const component = this;
    $("#fromdatepicker").on('changeDate', function(){
      var result1 = $(this).change(function(date) {$(".fromdatepicker").submit(date)});
      component.from_date = result1.val();     
    });

    $("#todatepicker").on('change', function(){
      var result2 = $(this).change(function(date) {$(".todatepicker").submit(date)});
      component.to_date = result2.val();
    })       
  }

  getselecttype(event:any){    
    this.paymenttype = event.target.value;
  }

  apply_filters(){
    const fromData: FormData =new FormData();
    fromData.append('start_date', this.from_date);
    fromData.append('end_date',this.to_date);
    fromData.append('pay_method',this.paymenttype);
    this.usersService.TranscationHistory(fromData);    
  }
  menuclose() {
    $("body").removeClass("desktop-left-menu");
  }
  exportAsXLSX(): void {   
    this.getTranscationHistoryData = this.usersService.getTranscationHistory;
    
    if(this.getTranscationHistoryData!=null){      
      const exportdata = this.getTranscationHistoryData.map(o =>   
       {
        return {
                Sr_No: o.sr_no,
                Created_Date :o.created_at ,
                Package_Name: o.package_name,
                Amount: o.amount,
                Transaction_id : o.transaction_id,
                Payment_Type: o.payment_type,
                Status: o.status};          
      });  
      this.excelService.exportAsExcelFile(exportdata, 'Transcation History Details');      
    }
    }
}
