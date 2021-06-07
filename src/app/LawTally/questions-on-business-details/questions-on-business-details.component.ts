import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/users.service';
import { Router } from '@angular/router';
declare let $ : any;
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/core/modal.service';
@Component({
  selector: 'app-questions-on-business-details',
  templateUrl: './questions-on-business-details.component.html',
  styleUrls: ['./questions-on-business-details.component.css']
})
export class QuestionsOnBusinessDetailsComponent implements OnInit {
  question;
  lawyerid: any;
  arr = Array; // declaring arr as Array
  isLoggedIn: boolean = false;
  shownumber: boolean = false;
  constructor(
    public usersService: UsersService,
    public router: Router,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    window.scrollTo({
      top:0,
      left: 0,
      behavior: 'smooth'
    });
    this.usersService.questionDetails();

    $(".filter-arrow-icon-section").on("click", function() {
        $("body").toggleClass("filter-open");
    });
    this.isLoggedIn = sessionStorage.getItem('access_token') != null;
    this.lawyerid = localStorage.getItem('user_id');
    console.log("oosooooosoosososoososoosososoososoo",this.lawyerid );

    // $(".comments-count-main").on("click", function () {
    //     $(this).parent().parent().siblings(".new-reviews-section-main-block").slideToggle("slow");
    // });
    
  }

  counter(i: number) {
    return new Array(i);
  }

  questionDetail(id){
    sessionStorage.setItem('question_id',id);
    this.usersService.questionDetails();

    window.scrollTo({
      top:0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onsubmit(form){
    if(form.valid){
      this.router.navigate(['/lawyer-directory/ask-free-question',{question:form.value.question}]);
    }

  }

  related_questions(){
    $('html, body').animate({
      scrollTop: ($('.lawyer-near-me-btn').first().offset().top)
    },500);
  }


  sendEnquiryModal(x) {
    console.log(x);
    
    this.lawyerid = x
    if (!this.isLoggedIn) {
        Swal.fire({
            position: 'center',
            title: 'Please login or signup to continue...',
            showConfirmButton: false,
            timer: 3000,
        });
        localStorage.setItem('STACK_TRACE', JSON.stringify({ "Lawyer": this.lawyerid }))
        localStorage.setItem('STACK_TRACE_ACTION', "sendEnquiryModal")
        this.router.navigateByUrl('/lawyer-directory/login')
        return;
    }
    this.modalService.open('sendEnquiryForm')
}

sendEnquiry(EnquiryData) {
  this.modalService.close('sendEnquiryForm')
  EnquiryData['to_user_id'] = this.lawyerid;
  EnquiryData['reply_preference'] = 'phone_call';
  console.log(EnquiryData);
  this.usersService.sendEnquiry(EnquiryData).subscribe((data) => {
      console.log(data)
      if (data.status === 'SUCCESS') {
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Enquiry Submitted successfully',
              showConfirmButton: false,
              timer: 1000,
          });
      } else {
          Swal.fire({
              position: 'center',
              icon: 'error',
              title: data.message,
              showConfirmButton: false,
              timer: 1000,
          });
      }
  })
  console.log(this.usersService.lawyerDetailsList)
}




submitansweflagmethod(x,y){

  if (!this.isLoggedIn) {
    Swal.fire({
        position: 'center',
        title: 'Please login or signup to continue...',
        showConfirmButton: false,
        timer: 3000,
    });
    this.router.navigateByUrl('/lawyer-directory/login')
    return;
}

else{
  let obj = {
    "flag":x,
    "answer_id":y,
    "question_id":this.usersService.questionDetailsData.id,
      }
    this.usersService.helpfulUnhelpfull(obj).subscribe((res:any)=>{
      if(res == "SUCCESS"){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    })
}



}
setquestion;
commenttext= "";
opencomment(x){
  if (!this.isLoggedIn) {
    Swal.fire({
        position: 'center',
        title: 'Please login or signup to continue...',
        showConfirmButton: false,
        timer: 3000,
    });
    localStorage.setItem('STACK_TRACE', JSON.stringify({ "LawyerNormal": this.lawyerid }))
    localStorage.setItem('STACK_TRACE_ACTION', "openReviewModal")
    this.router.navigateByUrl('/lawyer-directory/login')
    return;
  }
  else{
    console.log(x);
  
    $('#comment').modal('show');
  this.setquestion = x;
  }

}
testmethod(x){
  this.commenttext = x;
}

submitcommentmethod(){
 console.log("eeeee",this.commenttext);
  let obj = {
    "comment":this.commenttext,
    "answer_id":this.setquestion.id,
    "question_id":this.usersService.questionDetailsData.id,
      }
    this.usersService.submitcomment(obj).subscribe((res:any)=>{
      if(res == "SUCCESS"){
        this.commenttext = "";
        this.usersService.questionDetails();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: res.message,
        showConfirmButton: false,
        timer: 1000,
      });
      $('#comment').modal('hide');
      }

      else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: res.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
     
    })

}

}
