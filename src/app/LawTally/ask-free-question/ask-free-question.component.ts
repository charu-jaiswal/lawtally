import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
declare var $: any;

@Component({
  selector: 'app-ask-free-question',
  templateUrl: './ask-free-question.component.html',
  styleUrls: ['./ask-free-question.component.css']
})
export class AskFreeQuestionComponent implements OnInit {
  googleAddress;
  latitude;
  longitude;
  result;
  state;
  city;
  response_address;
  ask_question;

  formdata :any = [];

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
    public router: ActivatedRoute,
    public authService: AuthService
  ) {  }

  ngOnInit() {
    // this.ask_question = sessionStorage.getItem('ask_question');
    this.ask_question = this.router.snapshot.paramMap.get('question');
    $('#askquestionform').parsley();
    window.scrollTo({
      top:0,
      left: 0,
      behavior: 'smooth'
    });
    this.usersService.getPracticeArea();
  }

  public handleAddressChange(address: any) {
    this.googleAddress    = address.formatted_address
    this.response_address = address;
  }

  onAskquestionform(askquestionform){
    sessionStorage.removeItem('ask_question');

    if(askquestionform.valid){
      this.usersService.submitAskQuestion(askquestionform, this.response_address);
    }
  }

}
