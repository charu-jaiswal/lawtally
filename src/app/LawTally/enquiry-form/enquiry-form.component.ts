import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/core/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from 'src/app/core/modal.service';

declare let $: any;

@Component({
  selector: 'app-enquiry-form',
  templateUrl: './enquiry-form.component.html',
  styleUrls: ['./enquiry-form.component.css']
})
export class EnquiryFormComponent implements OnInit {

  enquiryForm: FormGroup;
  @Output() formSubmitted = new EventEmitter();
  Times = [
    { _id: 'morning', name: 'morning' },
    { _id: 'afternoon', name: 'afternoon' },
    { _id: 'evening', name: 'evening' },
  ]
  submitted: boolean = false;

  constructor(
    public usersService: UsersService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.usersService.getPracticeArea();
    this.newForm();
  }

  newForm() {
    this.enquiryForm = this.formBuilder.group({
      practice_area_id: ['', Validators.required],
      inquiry: ['', Validators.required],
      phone_no: ['', Validators.required],
      reply_time: ['', Validators.required]
    })
  }

  onSelectedArea(practiceArea) {
    console.log(practiceArea)
  }

  onSubmit(enquiryForm) {
    if (enquiryForm.valid) {
      console.log(enquiryForm.value);
      this.formSubmitted.emit(enquiryForm.value);
      this.newForm();
    }
    else {
      console.log("Invalid");
      this.submitted = true;
    }
  }

  onDiscard() {
    this.modalService.close('sendEnquiryForm');
    this.newForm();
  }
}
