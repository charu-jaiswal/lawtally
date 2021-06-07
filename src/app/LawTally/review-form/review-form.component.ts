import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/users.service';
import { ModalService } from 'src/app/core/modal.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  ratingtype:string= "";
  reviewForm: FormGroup;

  @Output() reviewSubmitted = new EventEmitter();
  consultation = [
    { _id: 'CONSULT_ONLY', name: 'Consulted' },
    { _id: 'HIRED', name: 'Hired' },
  ]
  recommend = [
    { _id: 'YES', name: 'Yes' },
    { _id: 'NO', name: 'No' },
  ]
  // anonymousData = [
  //   { _id: 'YES', name: 'Yes' },
  //   { _id: 'NO', name: 'No' },
  // ]
  currentRate = 0;
  submitted: boolean = false;
  descLengthMin: boolean = false;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.usersService.getPracticeArea();
    this.newForm();
  }

  newForm() {
    this.reviewForm = this.formBuilder.group({
      rating: ['', Validators.required],
      review: ['', Validators.required],
      review_type: ['', Validators.required],
      recommended: ['', Validators.required],
      // anonymous: ['', Validators.required]
    })
  }

  onSelectedArea(practiceArea) {
    console.log(practiceArea)
  }

  onSubmit(reviewForm) {
    console.log(this.reviewForm.get('review').value)
    console.log(this.reviewForm.get('review').value.length)
    if (this.reviewForm.get('review').value.length < 50) {
      this.descLengthMin = true;
    }
    else {
      this.descLengthMin = false;
    }
    if (reviewForm.valid && this.descLengthMin === false) {
      console.log(reviewForm.value);
      this.reviewSubmitted.emit(reviewForm.value);
      this.newForm();
    }
    else {
      console.log("Invalid");
      this.submitted = true;
    }
  }

  onDiscard() {
    this.modalService.close('sendReviewForm');
    this.newForm();
  }

  rate(rates) {
    if(rates == 1){
      this.ratingtype= "terrible";
    }
    if(rates == 2){
      this.ratingtype= "poor";
    }
    if(rates == 3){
      this.ratingtype= "good";
    }
    if(rates == 4){
      this.ratingtype= "very good";
    }
    if(rates == 5){
      this.ratingtype= "exceptional";
    }

    console.log(rates)
  }

}
