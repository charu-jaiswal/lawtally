import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/users.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  googleAddress;
  cp = 1;
  profiles = [];
  filter = { search_location: '', search_name: '' }

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProfiles();
  }

  public handleAddressChange(address: any) {
    address.address_components.forEach(element => {
      if (element.types.includes("administrative_area_level_2")) {
        this.filter.search_location = element.long_name;
        this.getProfiles(this.filter)
      }
    });
  }

  onfilterform(filterform) {
    this.filter.search_name = filterform.form.value.keyword;
    this.getProfiles(this.filter)
  }

  openClaimProfile(profile) {
    localStorage.setItem('claimProfile', JSON.stringify(profile));
    setTimeout(() => {
      this.router.navigate(['/lawyer-directory/cliam-profile-details'])
    }, 150);
  }

  getProfiles(filter = {}) {
    this.userService.claimProfileListing(filter)
      .subscribe((data: any) => {
        console.log(data);
        if (data.status === "SUCCESS") {
          this.profiles = data.response_data.data;
        } else {
          this.profiles = [];
        }
      })
  }
}
