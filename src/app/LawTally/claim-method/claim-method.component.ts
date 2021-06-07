import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/modal.service';
import { UsersService } from 'src/app/core/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-claim-method',
  templateUrl: './claim-method.component.html',
  styleUrls: ['./claim-method.component.css']
})
export class ClaimMethodComponent implements OnInit {

  user;
  req = false;
  error = '';
  otp = '';

  constructor(
    private router: Router,
    private userService: UsersService,
    private modalService: ModalService
  ) {
    let user = localStorage.getItem('claimProfile');
    if (user == null) {
      this.router.navigate(['/lawyer-directory/cliam-profile'])
      return;
    }
    this.user = JSON.parse(user);
  }

  ngOnInit() {
    setTimeout(() => {
      let dd = document.getElementById('claimEmail');
      if (dd) {
        dd.parentNode['classList'].add("sm-modal");
      }
      dd = document.getElementById('claimPhone');
      if (dd) {
        dd.parentNode['classList'].add("sm-modal");
      }

    }, 500);
  }

  openEmail() {
    this.modalService.open('emailForm')
    if (this.req) return
    this.req = true;
    this.userService.claimProfile({
      type: 'email',
      input: this.user.email
    })
      .subscribe((data: any) => {
        this.req = false;
        this.otp = '';
        this.error = '';
        // if (data.status == 'SUCCESS') {
        //   this.modalService.open('emailForm')
        // }
      }, error => {
        this.req = false
      });
  }

  openPhone() {
    this.modalService.open('phoneForm')
    if (this.req) return
    this.req = true
    this.userService.claimProfile({
      type: 'mobile',
      input: this.user.mobile_number
    })
      .subscribe((data: any) => {
        this.otp = '';
        this.error = '';
        // if (data.status == 'SUCCESS') {
        //   this.modalService.open('phoneForm')
        // }
        this.req = false;
      }, error => {
        this.req = false
      });
  }

  chckOTP() {
    if (this.req) return
    this.req = true
    this.userService.checkClaimProfileToken({
      token: '' + this.otp
    }).subscribe((data: any) => {
      if (data.status == 'SUCCESS') {
        this.modalService.close('emailForm')
        this.modalService.close('phoneForm')
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 2500,
        });
        setTimeout(() => {
          this.router.navigate(['/lawyer-directory/cliam-profile'])
        }, 2600);
      } else {
        this.error = data.message;
      }
      this.req = false;
    }, error => {
      this.req = false
    });
  }
}
