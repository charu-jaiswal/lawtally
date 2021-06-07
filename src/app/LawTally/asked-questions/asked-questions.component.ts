import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/users.service';

declare let $: any;
declare let jQuery: any;

@Component({
  selector: 'app-asked-questions',
  templateUrl: './asked-questions.component.html',
  styleUrls: ['./asked-questions.component.css']
})
export class AskedQuestionsComponent implements OnInit {
  user_type;
  practice_area_id;
  Terms;
  practiceList: any = [];
  cp = 1;

  constructor(
    public usersService: UsersService
  ) { }

  ngOnInit() {
    this.user_type = 'user';
    this.usersService.getPracticeArea();

    this.usersService.getQuestions(this.user_type, this.practice_area_id);
  }

  menuclose() {
    $("body").removeClass("desktop-left-menu");
  }

  onChange(isChecked: boolean, practice_area_id) {
    this.cp = 1;
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

}
