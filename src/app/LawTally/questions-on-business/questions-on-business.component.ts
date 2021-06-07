import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/users.service';
import { format } from 'url';
import { Router, ActivatedRoute } from '@angular/router';

declare let $: any;


@Component({
  selector: 'app-questions-on-business',
  templateUrl: './questions-on-business.component.html',
  styleUrls: ['./questions-on-business.component.css']
})
export class QuestionsOnBusinessComponent implements OnInit {
  Terms;
  googleAddress;
  response_address;
  keyword;
  city;
  practiceList: any = [];
  cp = 1;
  get_practice;
  saveUsername;
  checkbox;
  constructor(
    public usersService: UsersService,
    public router: Router,
    public activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.response_address = '';
    this.keyword = '';
    this.usersService.getPracticeArea();
    this.get_practice = this.activatedRoute.snapshot.paramMap.get('practice_id');

    if (this.get_practice != '' && this.get_practice != null) {
      this.practiceList.push("" + this.get_practice + "")
      // $("#"+this.get_practice+"").attr('checked','checked');
      this.checkbox = this.get_practice;
    }
    this.usersService.getAllQuestions(this.response_address, this.practiceList, this.keyword);

    $(".filter-arrow-icon-section").on("click", function() {
      $("body").toggleClass("filter-open");
  });

  }

  reset(filterform) {
    this.response_address = '';
    this.keyword = '';
    filterform.reset();
  }

  public handleAddressChange(address: any) {

    for (var i = 0; i < address.address_components.length; i++) {
      if (address.address_components[i].types[0] == 'locality') {
        // console.log(address.address_components[i].long_name);
        this.city = address.address_components[i].long_name;                  //for city name
      }
    }
    this.response_address = this.city;
    this.googleAddress = this.city;
  }

  onChange(isChecked: boolean, practice_area_id) {
    this.cp = 1;
    if (isChecked) {
      this.Terms = true
      this.practiceList.push("" + practice_area_id + "")
      this.allquestionsApi(this.response_address, this.practiceList, this.keyword);
    } else {
      this.Terms = false
      var index = this.practiceList.indexOf(practice_area_id);
      this.practiceList.splice(index, 1);
      this.allquestionsApi(this.response_address, this.practiceList, this.keyword);
    }
  }

  onfilterform(filterform) {
    this.cp = 1;
    this.response_address = filterform.value.address;
    this.keyword = filterform.value.keyword;
    this.allquestionsApi(this.response_address, this.practiceList, this.keyword);
  }

  allquestionsApi(response_address, practiceList, keyword) {
    // console.log(response_address);
    // console.log(practiceList);
    // console.log(keyword);
    this.usersService.getAllQuestions(response_address, practiceList, keyword);
  }

  questionDetail(id) {
    sessionStorage.setItem('question_id', id);
  }

  readmore() {
    $(".read-more-btn").on("click", function () {
      $(this).toggleClass("hide-txt");
      $(this).parent().toggleClass("content-open");
    });
  }

  onsubmit(askquestionform) {
    if (askquestionform.valid) {
      // sessionStorage.setItem('ask_question',askquestionform.value.question);
      this.router.navigate(['/lawyer-directory/ask-free-question', { question: askquestionform.value.question }]);
    }
  }

}
