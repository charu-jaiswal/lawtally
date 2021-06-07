import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/users.service';
import { AuthService } from '../../core/auth.service';
declare let $ : any;
declare let jQuery : any;

@Component({
  selector: 'app-privacy-and-policy',
  templateUrl: './privacy-and-policy.component.html',
  styleUrls: ['./privacy-and-policy.component.css']
})
export class PrivacyAndPolicyComponent implements OnInit {

  constructor(
    public usersService: UsersService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    // window.scrollTo(0, 0);
    var slug = "privacy-policy";
    this.usersService.getCMSpages(slug);
  }

}
