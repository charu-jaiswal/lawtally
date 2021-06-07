import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/users.service';
import { AuthService } from '../../core/auth.service';
declare let $ : any;
declare let jQuery : any;

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {

  constructor(
    public usersService: UsersService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    // window.scrollTo(0, 0);
    var slug = "terms-conditions";
    this.usersService.getCMSpages(slug);
  }

}
