import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../core/users.service';
import { AuthService } from '../../core/auth.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
declare let $: any;
declare let jQuery: any;
@Component({
  selector: 'app-lawyer-enquiry-form',
  templateUrl: './lawyer-enquiry-form.component.html',
  styleUrls: ['./lawyer-enquiry-form.component.css']
})
export class LawyerEnquiryFormComponent implements OnInit {
  selectedwhenattorney: any;
  googleAddress;
  latitude;
  longitude;
  result;
  state;
  city;
  response_address;
  payoptval:any;

  public loading = false;
  dropdownSettings = { 
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };

  constructor( 
    public usersService: UsersService,
    public router: Router,
    private http: HttpClient,
    public authService: AuthService
  ) {}

  whenattorneyvallist = [
    { "name": "Within 24 hours", "id": "Within 24 hours" },
    { "name": "Within 3 days", "id": "Within 3 days" },
    { "name": "Within 7 days", "id": "Within 7 days" },
    { "name": "Within 15 days", "id": "Within 15 days" },
    { "name": "Within 30 days", "id": "Within 30 days" },
    { "name": "More than 30 days from now", "id": "More than 30 days from now" }
  ]; 

  ngOnInit() {
    $('#lawyerInqForm').parsley();

    this.selectedwhenattorney='Within 24 hours';
    this.payoptval='I do not want to pay upfront';

    if (this.selectedwhenattorney) {
      var result = $('ng-select').parent().addClass('active'); 
    }

    this.usersService.getPracticeArea();

  }

  onItemChange(value){
    //console.log(" Value is : ", value );
    //alert('Value is : '+value);
    this.payoptval=value;
 }

  public handleAddressChange(address: any) {
    this.googleAddress    = address.formatted_address
    this.response_address = address;
  }

  onFocus($event) {
    var result = $('ng-select').parent().addClass('active');
  }

  showTransition($event) {
    if (this.selectedwhenattorney) {
        var result = $('ng-select').parent().addClass('active');
    }
    // else {
    //     var result1 = $('ng-select').parent().removeClass('active');
    // }
  }
  //tempvar1:string='';
  onenqformsub(lawyerInqForm){

    //alert("hello");
    //console.log(lawyerInqForm.value);
    //console.log('is valid : '+lawyerInqForm.valid)

    // alert('first_name : '+lawyerInqForm.value.firstName);  alert('last_name : '+lawyerInqForm.value.lastName);
    // alert('mobile_number : '+lawyerInqForm.value.phoneno);  alert('email : '+lawyerInqForm.value.inqemail);
    // alert('location : '+lawyerInqForm.value.inqlocation);  alert('description : '+lawyerInqForm.value.inqdesc);
    // alert('practice_area_id : '+lawyerInqForm.value.practice_area);  
    
    //  alert('pay_attorney_in : '+lawyerInqForm.value.payoption);
    // for (var i = 0; i < lawyerInqForm.value.practice_area.length; i++) {
    //   this.tempvar1+=lawyerInqForm.value.practice_area[i]._id+',';
    // }

    // alert('KKK : '+this.tempvar1);

    //alert('need_attorney_in : '+lawyerInqForm.value.whenattorney); 

    //return false;

    if (lawyerInqForm.valid==true) {

            //alert("validation Success");
            this.loading = true;

            this.usersService.lawtallyInquryFrm(lawyerInqForm.value, this.response_address)
            .subscribe (res => {
                this.loading = false;

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Enquiry Information Submitted Successfully',
                        showConfirmButton: false,
                        timer: 5000
                    });
                   
                    $("#last option:selected").prop("selected", false);
                    $('#lawyerInqForm').trigger("reset");
                    this.selectedwhenattorney='Within 24 hours';

                    //console.log("Successfull");
                    //this.router.navigate(['/lawyer-directory/home']);
        
            });

    } else {  

      //alert("validation failed");      

      console.log("Invalid");

    }
  }

}
