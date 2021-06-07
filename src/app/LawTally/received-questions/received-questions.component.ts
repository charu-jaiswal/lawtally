import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/users.service';
import { ModalService } from 'src/app/core/modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

declare let $: any;
declare let jQuery: any;

@Component({
  selector: 'app-received-questions',
  templateUrl: './received-questions.component.html',
  styleUrls: ['./received-questions.component.css']
})
export class ReceivedQuestionsComponent implements OnInit {
  user_type;
  practice_area_id;
  Terms;
  practiceList: any = [];
  cp = 1;
  submitted: boolean = false;
  replyForm: FormGroup;
  questionId: any;

  constructor(
    public usersService: UsersService,
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.user_type = 'lawyer';
    this.practice_area_id = '';
    this.usersService.getPracticeArea();
    this.usersService.getQuestions(this.user_type, this.practice_area_id);
    // window.scrollTo(0, 0);
    this.newForm();
  }

  newForm() {
    this.replyForm = this.formBuilder.group({
      answer: ['', Validators.required]
    })
  }

  menuclose() {
    $("body").removeClass("desktop-left-menu");
  }

  onChange(isChecked: boolean, practice_area_id) {
    if (isChecked) {
      this.Terms = true
      this.practiceList.push("" + practice_area_id + "")
      this.usersService.getQuestions(this.user_type, this.practiceList);
    } else {
      this.Terms = false
      var index = this.practiceList.indexOf(practice_area_id);
      this.practiceList.splice(index, 1);
      this.usersService.getQuestions(this.user_type, this.practiceList);
    }
  }

  questionDetail(id) {
    sessionStorage.setItem('question_id', id);
  }

  replyModal(id) {
    this.questionId = id;
    this.modalService.open('submitReplyForm');
  }

  onSubmit(reviewForm) {
    if (reviewForm.valid) {
      this.modalService.close('submitReplyForm');
      console.log(reviewForm.value);
      let answerData = {
        ...reviewForm.value,
        question_id: this.questionId
      }
      this.usersService.submitAnswer(answerData).subscribe((data: any) => {
        console.log(data)
        if (data.status === 'SUCCESS') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Answer Submitted successfully',
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
      this.newForm();
    }
    else {
      console.log("Invalid");
      this.submitted = true;
    }
  }

  onDiscard() {
    this.modalService.close('submitReplyForm');
    this.newForm();
  }
}
