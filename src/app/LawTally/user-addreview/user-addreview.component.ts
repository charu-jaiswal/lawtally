import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { UsersService } from 'src/app/core/users.service';
import { ModalService } from 'src/app/core/modal.service';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-user-addreview',
  templateUrl: './user-addreview.component.html',
  styleUrls: ['./user-addreview.component.css']
})
export class UserAddreviewComponent implements OnInit {
  reviewForm: FormGroup;
  rating: any = "";
  anonymous: any = "";

  validTitle:string="This is required";
  @Output() reviewSubmitted = new EventEmitter();
  consultation = [
    { _id: 'CONSULT_ONLY', name: 'Consulted' },
    { _id: 'HIRED', name: 'Hired' },
  ];

  recommend = [
    { _id: 'YES', name: 'Yes' },
    { _id: 'NO', name: 'No' },
  ];

  currentRate = 0;
  submitted: boolean = false;
  descLengthMin: boolean = false;
  getrattedval:any; userfullnametxtval:string="";
  getmeuserid:any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) { }

  get userfullname(){ return this.reviewForm.get('userfullname');}
  get useremailtxtval(){ return this.reviewForm.get('useremailtxtval');}

  ngOnInit() {
    this.getrattedval='1';
    this.newForm();
    //alert('GET ID Value : '+this.route.snapshot.paramMap.get('id'));
    this.getmeuserid=this.route.snapshot.paramMap.get('id');
  }

  responseMessage:any;
  formsumbitfunc = function(user1: HTMLInputElement)
  {
    //alert('Ratting Value : '+this.getrattedval);
    /*alert('Ratting Value : '+user1['rating']);
    alert('Fullname : '+user1['userfullname']);
    alert('Email : '+user1['useremailtxtval']);
    alert('review Description : '+user1['review']);
    alert('Review Type : '+user1['review_type']);
    alert('Is Recommended : '+user1['recommended']);*/
    
    if(user1['rating']=='' || user1['rating']==null || user1['rating']==undefined) {
      $('#ratingerror').css("display", "block");
      return false;
    } else {
      $('#ratingerror').css("display", "none");
    } 
    
    if(user1['userfullname']=='' || user1['userfullname']==null || user1['userfullname']==undefined) {
        $('#fullnametxterror').css("display", "block");
        return false;
    } else {
       $('#fullnametxterror').css("display", "none");
    }

    if(user1['useremailtxtval']=='' || user1['useremailtxtval']==null || user1['useremailtxtval']==undefined) {
      $('#emailtxterror').css("display", "block");
      return false;
    } else {
      if(!this.validateEmail(user1['useremailtxtval'])) { 
        $('#emailtxterror').css("display", "block");
        return false;
      } else {
        $('#emailtxterror').css("display", "none");
      }
      $('#emailtxterror').css("display", "none");
    }

    if(user1['review']=='' || user1['review']==null || user1['review']==undefined) {
      $('#reviewtxterror').css("display", "block");
      return false;
    } else {
      $('#reviewtxterror').css("display", "none");
    }

    if(user1['review_type']=='' || user1['review_type']==null || user1['review_type']==undefined) {
      $('#reviewtypeerror').css("display", "block");
      return false;
    } else {
      $('#reviewtypeerror').css("display", "none");
    }

    if(user1['recommended']=='' || user1['recommended']==null || user1['recommended']==undefined) {
      $('#recommendederror').css("display", "block");
      return false;
    } else {
      $('#recommendederror').css("display", "none");
    }

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = new FormData();
    body.append('to_id', this.getmeuserid);
    body.append('review', user1['review']);
    body.append('rating', user1['rating']);
    body.append('review_type', user1['review_type']);
    body.append('recommended', user1['recommended']);
    body.append('full_name', user1['userfullname']);
    body.append('email', user1['useremailtxtval']);

    this.usersService.submitadduserreview(body,headers).subscribe(Response => {

      this.responseMessage = Response['status'];
      //this.loading = false;
      if (this.responseMessage == "SUCCESS") {
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Review submitted Successfully',
              showConfirmButton: false,
              timer: 6000
          });
          
      } else {
          console.log("UnSUCCESS");
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Try again.'
          });
      }

      $('#useraddreviewForm').trigger("reset");
    },
    error => {
      this.logloading = false;
      this._swal2.error({
      title: "Oops...",
      text: "Connection Error",
      type: "info"
      });
      $('#useraddreviewForm').trigger("reset");
    })
  }

  validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
  }

  newForm() {
    this.reviewForm = this.formBuilder.group({
      rating: ['', Validators.required],
      userfullname: ['', Validators.required],
      useremailtxtval: ['', Validators.required],
      review: ['', Validators.required],
      review_type: ['', Validators.required],
      recommended: ['', Validators.required],
      // anonymous: ['', Validators.required]
    })
  }

  hoveringOver(event) {
    debugger
    this.rating = event.target.value;
  }


  onChangeconsultation(event) {
      debugger
      this.consultation = event.target.value;
  }
  onChangerecommend(event) {
      debugger
      this.recommend = event.target.value;
  }

  onChangeanonymous(event) {
      debugger
      this.anonymous = event.target.value;
  }

  rate(rates) {
    console.log(rates);
    this.getrattedval=rates;
  }

}
