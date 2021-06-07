import { Component, OnInit } from '@angular/core';
import readXlsxFile from 'read-excel-file';
import { UsersService } from 'src/app/core/users.service';
import Swal from 'sweetalert2';
declare let jQuery: any;
declare let $: any;

@Component({
  selector: 'app-collect-reviews',
  templateUrl: './collect-reviews.component.html',
  styleUrls: ['./collect-reviews.component.css']
})
export class CollectReviewsComponent implements OnInit {

  fieldArray: any = [];
  newAttribute: any = {};
  mainfieldarrobj:any = [];
  public loading = false;

  constructor(private userservice: UsersService) { }

  ngOnInit() {
    // this.loading = true;
    $('#successmsgdesp').css("display", "none");    
    $('.error').css("display", "none");
    $('#finalsubmit').css("display", "none");

    localStorage.removeItem("data");
    $(document).ready(function () {
      $('[data-responsive-tabs]').responsivetabs({});
    });

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

      $('education_fields-block').on('click', function (event) {
        //alert('Button ID : '+this.id)
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

    
            
    // This is the simple bit of jquery to duplicate the hidden field to subfile
    $('#file_upload').change(function(){
        $('#subfile').val($(this).val());
    });

    // This bit of jquery will show the actual file input box
    $('#showHidden').click(function(){
        $('#file_upload').css('visibilty','visible');
    });

    // This is the simple bit of jquery to duplicate the hidden field to subfile
    $('#pdffile1').change(function(){
        $('#subfile1').val($(this).val());
    });

    // This bit of jquery will show the actual file input box
    $('#showHidden1').click(function(){
        $('#pdffile1').css('visibilty','visible');
    });  
    
    
    this.getlawtallyemailtemplates();

  }

  templatevar:any; templatetextpart1:any;templatetextpart2:any;templatetextpart3:any;
  getlawtallyemailtemplates()
  {
    this.userservice.getLawyeremailTempService()
    .subscribe(res => {
      this.loading = false;
        this.responseMessage = res['status'];
        //this.loading = false;
        //alert('responseMessage : '+this.responseMessage);
        if (this.responseMessage == "SUCCESS") {
            
            console.log(res['response_data']['template_html']);
            this.templatevar=res['response_data']['template_html'];

            var templatetxtpart1=this.templatevar.split('.')
            this.templatetextpart1=templatetxtpart1[0];
            this.templatetextpart2=templatetxtpart1[1];
            this.templatetextpart3=templatetxtpart1[2];
            //alert('templatetxtpart1 : '+templatetxtpart1[0]);
            //alert('templatetxtpart2 : '+templatetxtpart1[1]);
            //alert('templatetxtpart3 : '+templatetxtpart1[2]);
        }
    });
  }


  clear_all() {
    this.fieldArray = [];
    this.newAttribute = {};
    $('#emailmain').val('');
    $('#namemain').val('');
  }

  addFieldValue() {
    //index
    //if (this.fieldArray.length <= 2) {
      this.fieldArray.push(this.newAttribute);
      this.newAttribute = {};
    // } else {

    // }
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  responseMessage:any; compactArray:any;
  onEditCloseItems() {
    //alert('Email : '+$('#emailmain').val());
    //alert('Name : '+$('#namemain').val());

   var obj = [
      { email: $('#emailmain').val(), full_name: $('#namemain').val() }
    ];
    //alert('mainfieldarrobj : '+JSON.stringify(obj));
    //alert('fieldArray : '+JSON.stringify(this.fieldArray));
    let combinedArray1 = obj.concat(this.fieldArray);
    this.compactArray = combinedArray1.filter(function(){return true;});
    //alert('combinedArray1 : '+JSON.stringify(compactArray));

    //alert('Cnt : '+compactArray.length);

    for(var ks=0; ks<this.compactArray.length; ks++){
      if(ks!=1){
        //alert('Email : '+compactArray[ks]['email']+' << >> Ks : '+ks);
        if(!this.validateEmail(this.compactArray[ks]['email']) || this.compactArray[ks]['email']=='' || this.compactArray[ks]['email']==null) { 
          /* do stuff here */ 
          //alert('Email is Now Valid >> '+ks);
          if(ks==0){
            $('#mainemailerror').css("display", "block");
          } else {
            var tempvar=ks-2;
            $('#subemailerror'+tempvar).css("display", "block"); 
          }

          return false;

        } else {

          $('#mainemailerror').css("display", "none");
          $('#subemailerror'+tempvar).css("display", "none");
          //alert('Email is Valid');

        }

        //alert('Name : '+compactArray[ks]['full_name']+' << >> Ks : '+ks);

        if(this.compactArray[ks]['full_name']=='' || this.compactArray[ks]['full_name']==undefined || this.compactArray[ks]['full_name']==null) { 
          /* do stuff here */ 
          if(ks==0){
            $('#mainnameerror').css("display", "block");
          } else {
            var tempvar1=ks-2;
            $('#subnameerror'+tempvar1).css("display", "block"); 
          }

          return false;

        } else {

          $('#mainnameerror').css("display", "none");
          $('#subnameerror'+tempvar).css("display", "none");

        }
      }
    }

    $('#teamptab2').addClass('active');
    $('#invittab1').removeClass('active');
    $('#donetab3').removeClass('active');

    $('#one').css("display", "none");
    $('#two').css("display", "block");
    $('#three').css("display", "none");
    $('#finalsubmit').css("display", "block");
    $('.templateerrormsg').css("display", "none");

  }

  menuclose() {
    $("body").removeClass("desktop-left-menu");
  }

  filterFilter(text) {
    if (!text || !text.length) {
      return text;
    }

    return text.replace(/(\\r\\n)|([\r\n])/gmi, '<br/>');
  }

  finalusereditedemailtemp:any;
  finalSubmitcollist()
  {
    //alert('EmailTemplate : '+$('#emailteamplateedittxt').val());
    

    //alert('templatetxtpart1 : '+this.templatetextpart1);
    //alert('templatetxtpart2 : '+this.templatetextpart2);
    //alert('templatetxtpart3 : '+this.templatetextpart3); 

    if(this.templatetextpart2=='' || this.templatetextpart2==null || this.templatetextpart2==undefined)
    {
      this.templatetextpart2="Please click on below link to review the Lawyer";
    }

    this.finalusereditedemailtemp=this.templatetextpart1+". "+this.templatetextpart2+"."+this.templatetextpart3;

    //alert('Finaltemplatetxtpart1 : '+this.finalusereditedemailtemp);
    this.loading = true;
    //alert('combinedArray1 : '+JSON.stringify(this.compactArray));
    this.userservice.submitLawyercollectedreview(this.compactArray,this.finalusereditedemailtemp)
    .subscribe(res => {
      this.loading = false;
        this.responseMessage = res['status'];
        //this.loading = false;
        if (this.responseMessage == "SUCCESS") {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Lawyer collection submitted Successfully',
                showConfirmButton: false,
                timer: 6000
            });

            this.fieldArray = [];
            this.newAttribute = {};
            $('#emailmain').val('');
            $('#namemain').val('');

            $('#teamptab2').removeClass('active');
            $('#invittab1').removeClass('active');
            $('#donetab3').addClass('active');
        
            $('#one').css("display", "none");
            $('#two').css("display", "none");
            $('#three').css("display", "block");
            $('#finalsubmit').css("display", "none");
            $('.templateerrormsg').css("display", "none");
            $('#successmsgdesp').css("display", "block");
           //this.router.navigate(['/lawyer-directory/reviews']);
        } else {
            console.log("UnSUCCESS");
            $('#teamptab2').removeClass('active');
            $('#invittab1').addClass('active');
            $('#donetab3').removeClass('active');
        
            $('#one').css("display", "block");
            $('#two').css("display", "none");
            $('#three').css("display", "none");
            $('#finalsubmit').css("display", "none");
            $('.templateerrormsg').css("display", "block");
            $('#successmsgdesp').css("display", "none");
        }
    });
  }

  backme()
  {
    $('#teamptab2').removeClass('active');
    $('#invittab1').addClass('active');
    $('#donetab3').removeClass('active');

    $('#one').css("display", "block");
    $('#two').css("display", "none");
    $('#three').css("display", "none");
    $('#finalsubmit').css("display", "none");
    $('.templateerrormsg').css("display", "block");
    $('#successmsgdesp').css("display", "none");
  }

  validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
  }

  chkvalidemail(event,param1) {
    //alert('Hello : '+$(event.target).val());
    //alert('param1 : '+param1);
    if(!this.validateEmail($(event.target).val())) { 
      /* do stuff here */ 
      //alert('Email is Now Valid');
      if(param1=='mainemail'){
        $('#mainemailerror').css("display", "block");
        $('#mainemailerror').html("Email is invalid");
      } else {
        $('#subemailerror'+param1).css("display", "block"); 
        $('#subemailerror'+param1).html("Email is invalid");
      }

      return false;

    } else if($(event.target).val()=='' || $(event.target).val()==null) {
    
      if(param1=='mainemail'){
        $('#mainemailerror').css("display", "block");
        $('#mainemailerror').html("This Email field is required");
      } else {
        $('#subemailerror'+param1).css("display", "block"); 
        $('#subemailerror'+param1).html("This Email field is required.");
      }

      return false;
    
    } else {

      $('#mainemailerror').css("display", "none");
      $('#subemailerror'+param1).css("display", "none");

    }
  }

  csv_import(event) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to import this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        const fileinput = event.target.files[0];

        const name = event.target.files[0].name;
        const lastDot = name.lastIndexOf('.');

        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);

        if (ext !== 'xls' && ext !== 'xlsx' && ext !== 'XLX' && ext !== 'XLSX') {
          $('#file_upload').val('');
          Swal.fire("Oops", "Please select excel(.xlsx/.xls) file", "error");
          return false;
        }

        readXlsxFile(fileinput).then((rows) => {
          var final_arr = [];
          for (let i = 1; i < rows.length; i++) {
            let fields = rows[i].toString().split(',');
            var obj = {};
            obj['full_name'] = fields[1];
            obj['email'] = fields[0];
            
            final_arr.push(obj);
          }
          this.loading = true;
          $('#file_upload').val('');
          
          //alert(JSON.stringify(final_arr));
          //alert('templatevar : '+this.templatevar);
          this.userservice.sendmails(final_arr,this.templatevar);
          this.loading = false;
        });


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        $('#file_upload').val('');
        Swal.fire(
          'Cancelled',
          'No file to upload',
          'error'
        )
      }
    });
  }
}
