import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claim-profile',
  templateUrl: './claim-profile.component.html',
  styleUrls: ['./claim-profile.component.css']
})
export class ClaimProfileComponent implements OnInit {

  lawyerProfile;
  chked = false;

  constructor(
    private router: Router
  ) {
    let lawyerProfile = localStorage.getItem('claimProfile');
    if (!lawyerProfile) {
      this.router.navigate(['/lawyer-directory/cliam-profile'])
      return;
    }
    this.lawyerProfile = JSON.parse(lawyerProfile);

  }


  ngOnInit() {
  }

  openClaimMethod() {
    if (!this.chked) return;
    this.router.navigate(['/lawyer-directory/cliam-method'])
  }
}
